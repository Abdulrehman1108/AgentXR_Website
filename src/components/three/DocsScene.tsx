import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

export const DocsScene = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.2;
      ref.current.rotation.y = s.clock.elapsedTime * 0.1;
    }
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3AB8FF" />
      <Stars radius={60} depth={60} count={1500} factor={3} fade />
      <TorusKnot ref={ref} args={[1.5, 0.4, 128, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3AB8FF" wireframe emissive="#3AB8FF" emissiveIntensity={0.6} />
      </TorusKnot>
    </>
  );
};
