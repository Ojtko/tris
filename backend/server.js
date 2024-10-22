const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ojtkotris',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

// Funkcja logowania
app.post('/login', (req, res) => {
    console.log('Otrzymano zapytanie login:', req.body);
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ? AND pass = ?';
  
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Błąd przy zapytaniu SQL:', err);
        return res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
      }
      if (results.length > 0) {
        const user = results[0];
        return res.status(200).json({ 
          user: {
            id: user.id,
            email: user.email,
            nick: user.nick,
            exp: user.exp,
            credits: user.credits
          } 
        });
      } else {
        return res.status(401).json({ message: 'Błędny email lub hasło' });
      }
    });
  });

// Funkcja rejestracji
app.post('/register', (req, res) => {
  const { email, nick, password } = req.body;
  const query = 'INSERT INTO user (email, nick, pass) VALUES (?, ?, ?)';
  db.query(query, [email, nick, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'User created', userId: result.insertId });
  });
});

// Funkcja aktualizacji exp i credits
app.post('/updateUserData', (req, res) => {
  const { userId, exp, credits } = req.body;
  
  if (!userId || exp == null || credits == null) {
    return res.status(400).json({ error: 'Brak wymaganych danych (userId, exp, credits)' });
  }

  const query = 'UPDATE user SET exp = ?, credits = ? WHERE id = ?';
  
  db.query(query, [exp, credits, userId], (err, result) => {
    if (err) {
      console.error('Błąd przy aktualizacji danych użytkownika:', err);
      return res.status(500).json({ error: 'Błąd przy aktualizacji danych' });
    }
    
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Dane użytkownika zaktualizowane pomyślnie' });
    } else {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }
  });
});

// Funkcja pobierania danych użytkownika
app.get('/getUserData', (req, res) => {
  const userId = req.query.userId; // Odbierz userId jako parametr zapytania
  
  if (!userId) {
    return res.status(400).json({ error: 'Brak wymaganych danych (userId)' });
  }

  const query = 'SELECT id, email, nick, exp, credits FROM user WHERE id = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Błąd przy zapytaniu SQL:', err);
      return res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
    }
    
    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({ 
        user: {
          id: user.id,
          email: user.email,
          nick: user.nick,
          exp: user.exp,
          credits: user.credits
        }
      });
    } else {
      return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }
  });
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
