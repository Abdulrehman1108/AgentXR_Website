import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

export const HomeScene = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * Math.PI * 2;
    const r = 3.2;
    return [Math.cos(angle) * r, Math.sin(angle * 2) * 0.4, Math.sin(angle) * r] as [number, number, number];
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#5EFFC1" />
      <pointLight position={[-5, -3, -5]} intensity={1} color="#3AB8FF" />
      <Stars radius={50} depth={50} count={2000} factor={4} fade speed={1} />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={[1.6, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#5EFFC1"
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            emissive="#5EFFC1"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      <group ref={ringRef}>
        {particles.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#5EFFC1" : "#3AB8FF"} />
          </mesh>
        ))}
      </group>
    </>
  );
};
