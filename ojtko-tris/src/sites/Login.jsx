import './../styles/Login.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="square-div">
          <div className="title mb-4">Zaloguj się</div>
          <form className="mb-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Wprowadź email" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Hasło</label>
              <input type="password" id="password" className="form-control" placeholder="Wprowadź hasło" required/>
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

export default Home;
