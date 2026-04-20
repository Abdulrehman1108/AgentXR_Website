import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export const UseCasesScene = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#5EFFC1" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#3AB8FF" />
      <Stars radius={60} depth={60} count={1500} factor={3} fade />
      <mesh ref={globeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#5EFFC1" wireframe emissive="#5EFFC1" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
};
