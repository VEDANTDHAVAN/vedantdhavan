import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, Suspense } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";
import useInView from "../../../hooks/useInView";

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

    return undefined;
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
  const { ref, isVisible } = useInView();

  return (
    <div ref={ref} className="w-full h-full">
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
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
      )}
    </div>
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
