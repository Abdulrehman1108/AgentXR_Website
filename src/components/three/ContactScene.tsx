import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export const ContactScene = () => {
  const planeRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (planeRef.current) {
      const geo = planeRef.current.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      const t = s.clock.elapsedTime;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 0.5 + t) * 0.3 + Math.cos(y * 0.5 + t) * 0.3);
      }
      pos.needsUpdate = true;
    }
  });
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 5]} intensity={1.5} color="#5EFFC1" />
      <Stars radius={60} depth={60} count={1500} factor={3} fade />
      <mesh ref={planeRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[16, 16, 40, 40]} />
        <meshStandardMaterial color="#5EFFC1" wireframe emissive="#5EFFC1" emissiveIntensity={0.4} />
      </mesh>
    </>
  );
};
