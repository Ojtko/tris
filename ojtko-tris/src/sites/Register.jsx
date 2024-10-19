import React, { useState } from "react";
import "./../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { nick, email, password };
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/");
      } else {
        console.error("Failed to register");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Link to="https://www.ala-ma-igora.pl/">
        <button className="btn btn-outline-light position-fixed powrot">
          Powrót
        </button>
      </Link>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="square-div">
          <div className="title mb-4">Utwórz konto</div>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nick" className="form-label">
                Nick
              </label>
              <input
                type="text"
                id="nick"
                className="form-control"
                placeholder="Wprowadź nick"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="password" className="form-label">
                Hasło
              </label>
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
            <button type="submit" className="btn btn-dark">
              Zarejestruj
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
