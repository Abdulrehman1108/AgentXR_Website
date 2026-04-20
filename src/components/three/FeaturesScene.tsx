import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

export const FeaturesScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const cubes = [
    { pos: [-3, 1, 0], color: "#5EFFC1" },
    { pos: [3, -1, -1], color: "#3AB8FF" },
    { pos: [0, 2, -2], color: "#B57BFF" },
    { pos: [-2, -2, 1], color: "#5EFFC1" },
    { pos: [2.5, 1.5, 1], color: "#3AB8FF" },
  ] as const;

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#5EFFC1" />
      <Stars radius={60} depth={60} count={1500} factor={3} fade />
      <group ref={groupRef}>
        {cubes.map((c, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1.5}>
            <mesh position={c.pos as unknown as [number, number, number]}>
              <boxGeometry args={[0.9, 0.9, 0.9]} />
              <meshStandardMaterial
                color={c.color}
                wireframe
                emissive={c.color}
                emissiveIntensity={0.6}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
};
