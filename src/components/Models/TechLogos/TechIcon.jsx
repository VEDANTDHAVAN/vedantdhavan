// 1) Loads a .glb model (GLTF format)
// 2) Adds Basic Lighting
// 3) Applies environment reflections for realism 
// 4) Wraps model into a Floating Animation
// 5) Optionally tweaks the material (like setting a white color on a Specific Mesh)
// 6) Disable Zoom using OrbitControls 

import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from 'three';

const TechIcon = ({model}) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
   if(model.name === 'Interactive Developer'){
     scene.scene.traverse((child) => {
      if(child.isMesh && child.name === 'Object_5') {
        child.material = new THREE.MeshStandardMaterial({color: 'white'}) 
      }
     })
   }
  }, [scene])

  return (
    <Canvas>
     <ambientLight intensity={1}/>
     <directionalLight position={[5,5,5]} intensity={1} />
     <Environment preset="city" />
     <OrbitControls enableZoom={false} />
     <Float speed={5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation}>
       <primitive object={scene.scene} />  
      </group>  
     </Float>
    </Canvas>
  )
}

export default TechIcon