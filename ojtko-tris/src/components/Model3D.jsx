import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Model3D() {
  const gltf = useLoader(GLTFLoader, '/kolko.glb');

  
  return (
    <>
      <primitive object={gltf.scene} />
      <OrbitControls 
      enableRotate={true}         
      enableZoom={true}           
      enablePan={false}           
      maxPolarAngle={Math.PI * 2} 
      minPolarAngle={0}           
      maxAzimuthAngle={Infinity}  
      minAzimuthAngle={-Infinity}/>
    </>
  );
}

export default Model3D;
