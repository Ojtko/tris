import './../styles/Login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  localStorage.clear();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = { email, password };
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        localStorage.setItem('userNickname', data.user.nick);
        
        navigate('/'); 
      } else {
        const errorData = await response.json();
        console.error('Nieudane logowanie:', errorData.message);
        navigate('/login'); 
      }
    } catch (error) {
      console.error('Błąd:', error);
    }
  };
  

  return (
    <>
      <Link to="/">
        <button className="btn btn-outline-light position-fixed powrot">Powrót</button>
      </Link>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="square-div">
          <div className="title mb-4">Zaloguj się</div>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Wprowadź email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Hasło</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Wprowadź hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark">Zaloguj</button>
          </form>
          <Link to="/register">
            <button type="button" className="btn btn-link register">Utwórz konto</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
