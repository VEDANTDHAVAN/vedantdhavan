import * as THREE from "three";

const HeroLights = () => {
  return (
    <>
    <spotLight position={[2,5,6]} angle={0.15} penumbra={0.25} color="white" intensity={100} />
    <spotLight position={[4,5,4]} angle={0.3} penumbra={0.5} color="#18FFC9" intensity={40} />
    <spotLight position={[-3,5,5]} angle={0.4} penumbra={1} color="#FF88A6" intensity={60} />
    <primitive object={new THREE.RectAreaLight('#C8F002', 8, 3, 2)} position={[1,3,4]} 
    intensity={15} rotation={[-Math.PI/4, Math.PI/4, 0]} />
    <pointLight position={[0,1,0]} intensity={10} color="#C61818"/>
    <pointLight position={[1,2,-2]} intensity={10} color="#0F0FCF"/>
    </>
  )
}

export default HeroLights