// 1) Loads a .glb model (GLTF format)
// 2) Adds Basic Lighting
// 3) Applies environment reflections for realism 
// 4) Wraps model into a Floating Animation
// 5) Optionally tweaks the material (like setting a white color on a Specific Mesh)
// 6) Disable Zoom using OrbitControls 

/*import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useCallback } from "react";
import * as THREE from 'three';

// Preload the model
useGLTF.preload('/models/next_react.glb');

const TechIcon = ({model}) => {
  // Memoize the scene to prevent unnecessary re-renders
  const scene = useMemo(() => useGLTF(model.modelPath), [model.modelPath]);

  // Handle material modifications
  const handleMaterialModification = useCallback(() => {
    if (model.name === 'Interactive Developer') {
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === 'Object_5') {
          child.material = new THREE.MeshStandardMaterial({ color: 'white' });
        }
      });
    }
  }, [model.name, scene]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (scene) {
      // Dispose of geometries and materials
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    handleMaterialModification();
    
    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [handleMaterialModification, cleanup]);

  return (
    <Canvas
      dpr={[1, 2]} // Optimize for different pixel ratios
      performance={{ min: 0.5 }} // Allow frame rate to drop to 30fps if needed
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Float 
        speed={5} 
        rotationIntensity={0.5} 
        floatIntensity={0.9}
      >
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>
    </Canvas>
  );
};

export default TechIcon; */

// TechIcon.jsx
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, Suspense } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

// Preload
useGLTF.preload("/models/next_react.glb");

const Model = ({ path, scale, rotation, tweakMaterial }) => {
  const gltf = useGLTF(path);

  // Optional material tweaks
  useEffect(() => {
    if (tweakMaterial) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });
    }

    return () => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [gltf, tweakMaterial]);

  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={scale} rotation={rotation}>
        <primitive object={gltf.scene} />
      </group>
    </Float>
  );
};

const TechIcon = ({ model }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={<Html center>Loading Model...</Html>}>
        <Model
          path={model.modelPath}
          scale={model.scale}
          rotation={model.rotation}
          tweakMaterial={model.name === "Interactive Developer"}
        />
      </Suspense>
    </Canvas>
  );
};

TechIcon.propTypes = {
  model: PropTypes.shape({
    modelPath: PropTypes.string.isRequired,
    scale: PropTypes.array,
    rotation: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
};

export default TechIcon;
