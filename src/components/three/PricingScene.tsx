import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

export const PricingScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.2 - i * 0.1;
      });
    }
  });

  const towers = [
    { x: -3, color: "#3AB8FF", h: 2 },
    { x: 0, color: "#5EFFC1", h: 3 },
    { x: 3, color: "#B57BFF", h: 2.5 },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 5]} intensity={1.5} color="#5EFFC1" />
      <Stars radius={60} depth={60} count={1500} factor={3} fade />
      <group ref={groupRef}>
        {towers.map((t, i) => (
          <mesh key={i} position={[t.x, 0, 0]}>
            <octahedronGeometry args={[t.h * 0.5, 0]} />
            <meshStandardMaterial
              color={t.color}
              wireframe
              emissive={t.color}
              emissiveIntensity={0.7}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};
