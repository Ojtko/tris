import './../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Model3D from "../components/Model3D";

function Home() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "0");
  const [userNick, setUserNick] = useState(localStorage.getItem('userNick') || "gość");
  const [userExp, setUserExp] = useState(localStorage.getItem('userExp') || "0");
  const [userCredits, setUserCredits] = useState(localStorage.getItem('userCredits') || "0");

  const [modelPath, setModelPath] = useState('/pet.glb'); 
  const navigate = useNavigate();
  
  const maxExpForCurrentLevel = 100; 

  const handleClick = (e) => {
    if (userId !== "0") {
      e.preventDefault(); 
      navigate('/user');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getUserData?userId=${userId}`, {
        method: 'GET', // Używamy metody GET
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userNick', data.user.nick);
        localStorage.setItem('userExp', data.user.exp);
        localStorage.setItem('userCredits', data.user.credits);

        setUserId(data.user.id);
        setUserNick(data.user.nick);
        setUserExp(data.user.exp);
        setUserCredits(data.user.credits);
      } else {
        console.error('Nie udało się pobrać danych użytkownika');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  useEffect(() => {
    if (userId === "0") {
        localStorage.setItem('userId', 0);
        localStorage.setItem('userNick', "gość");
        localStorage.setItem('userExp', 0);
        localStorage.setItem('userCredits', 0);
    } else {
      fetchUserData();
    }
  }, [userId]); // Dodaj userId jako zależność

  const handleSkinChange = (model) => {
    setModelPath(model);
  };

  // if (!userId || !userNick || !userExp || !userCredits) {
  //   return <div>Ładowanie danych...</div>;
  // }

  const progressPercentage = Math.min((userExp / maxExpForCurrentLevel) * 100, 100);

  return (
    <>
      <nav className="navbar animate__animated animate__fadeInDown">
        <div className="container-fluid">
          <span className="navbar-text">#{userNick}</span>
          <Link to="/login" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" fill="white" />
            </svg>
          </Link>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 left-side animate__animated animate__fadeInLeft">
            <div className="character-square">
              <Canvas style={{ height: '400px', width: '100%' }}>
                <ambientLight intensity={2} />
                <directionalLight position={[0, 0, 5]} castShadow={true} intensity={2}/>
                <directionalLight position={[0, 0, -5]} castShadow={true} intensity={1}/>
                <directionalLight position={[0, 5, 1]} castShadow={true} intensity={2}/>
                <mesh receiveShadow castShadow>
                  <Model3D modelPath={modelPath} />
                </mesh>
              </Canvas>
            </div>

            <div className="skin-selector">
              <div className="skin-thumbnail" style={{ backgroundImage: "url('/kolko2.png')" }} onClick={() => handleSkinChange('/kolko.glb')}>&nbsp;</div>
              <div className="skin-thumbnail" style={{ backgroundImage: "url('/krzyzyk.png')" }} onClick={() => handleSkinChange('/krzyzyk.glb')}>&nbsp;</div>
              <div className="skin-thumbnail" style={{ backgroundImage: "url('/pet.png')" }} onClick={() => handleSkinChange('/pet.glb')}>&nbsp;</div>
            </div>
          </div>

          <div className="col-md-6 right-side animate__animated animate__fadeInRight">
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progressPercentage}%` }}
              >
                {userExp} XP
              </div>
            </div>

            {/* Linki do innych stron */}
            <Link to="/normal"><div className="box">Normal</div></Link>
            <Link to="/timer"><div className="box">Timer</div></Link>
            <Link to="/mega"><div className="box">Mega</div></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
