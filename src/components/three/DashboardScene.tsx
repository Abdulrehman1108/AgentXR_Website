import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export const DashboardScene = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      const geo = ref.current.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 0.4 + s.clock.elapsedTime * 0.5) * 0.5 + Math.cos(y * 0.4) * 0.3);
      }
      pos.needsUpdate = true;
    }
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 0]} intensity={1.5} color="#5EFFC1" />
      <Stars radius={60} depth={60} count={1000} factor={3} fade />
      <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20, 30, 30]} />
        <meshStandardMaterial color="#3AB8FF" wireframe emissive="#3AB8FF" emissiveIntensity={0.4} />
      </mesh>
    </>
  );
};
