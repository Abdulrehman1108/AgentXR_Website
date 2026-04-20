import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

export const LoginScene = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.3;
      ref.current.rotation.x = s.clock.elapsedTime * 0.15;
    }
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#5EFFC1" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#3AB8FF" />
      <Stars radius={60} depth={60} count={2000} factor={4} fade />
      <Icosahedron ref={ref} args={[1.8, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#5EFFC1" wireframe emissive="#5EFFC1" emissiveIntensity={0.8} />
      </Icosahedron>
    </>
  );
};
