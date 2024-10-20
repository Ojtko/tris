import "./../styles/Home.css";
import "animate.css";
import React from "react";
import { Link } from "react-router-dom";
import { Canvas } from '@react-three/fiber';
import Model3D from "../components/Model3D";

function Home() {
  const nickName = localStorage.getItem("userNickname") || "gość";

  return (
    <>
      <nav className="navbar animate__animated animate__fadeInDown">
        <div className="container-fluid">
          <span className="navbar-text">#{nickName}</span>
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24">
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
                fill="white"
              />
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
          <Model3D />
          </mesh>
        </Canvas>
            </div>
            <div className="skin-selector">
              <div className="skin-thumbnail">Skin 1</div>
              <div className="skin-thumbnail">Skin 2</div>
              <div className="skin-thumbnail">Skin 3</div>
              <div className="skin-thumbnail">Skin 4</div>
              <div className="skin-thumbnail">Skin 5</div>
              <div className="skin-thumbnail">Skin 6</div>
              <div className="skin-thumbnail">Skin 6</div>
              <div className="skin-thumbnail">Skin 6</div>
              <div className="skin-thumbnail">Skin 6</div>
              <div className="skin-thumbnail">Skin 6</div>
              <div className="skin-thumbnail">Skin 6</div>
            </div>
          </div>
          <div className="col-md-6 right-side animate__animated animate__fadeInRight">
            <Link to="/normal">
              {" "}
              <div className="box">Normal</div>
            </Link>
            <Link to="/normal">
              {" "}
              <div className="box">Normal</div>
            </Link>
            <Link to="/normal">
              {" "}
              <div className="box">Normal</div>
            </Link>
            <Link to="/normal">
              {" "}
              <div className="box">Normal</div>
            </Link>
            <Link to="/normal">
              {" "}
              <div className="box">Normal</div>
            </Link>
            <Link to="/normal">
              {" "}
              <div className="box">Normal</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
