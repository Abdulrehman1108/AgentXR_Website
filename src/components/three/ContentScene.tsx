import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const DocNode = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4 * speed) * 0.2;
    }
  });
  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[0.6, 0.8, 0.08]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

export const ContentScene = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = s.clock.elapsedTime * 0.15;
      ringRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.1;
    }
  });
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 5, 3]} intensity={2} color="#5EFFC1" />
      <pointLight position={[-4, -3, 2]} intensity={1.2} color="#3AB8FF" />
      <spotLight position={[0, 8, 0]} intensity={1} color="#B57FFF" angle={0.4} />
      <Stars radius={80} depth={50} count={1200} factor={3} fade />
      
      <DocNode position={[-3, 1, -2]} color="#5EFFC1" speed={0.9} />
      <DocNode position={[3, -1, -3]} color="#3AB8FF" speed={1.2} />
      <DocNode position={[0, 2, -4]} color="#B57FFF" speed={0.7} />
      <DocNode position={[-2, -2, -1]} color="#5EFFC1" speed={1.1} />
      <DocNode position={[2, 2.5, -2]} color="#3AB8FF" speed={0.8} />
      <DocNode position={[4, 0, -1]} color="#B57FFF" speed={1.3} />

      <mesh ref={ringRef} position={[0, 0, -5]}>
        <torusGeometry args={[4, 0.03, 8, 80]} />
        <meshStandardMaterial color="#5EFFC1" emissive="#5EFFC1" emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, -5]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3, 0.02, 8, 80]} />
        <meshStandardMaterial color="#3AB8FF" emissive="#3AB8FF" emissiveIntensity={1} transparent opacity={0.2} />
      </mesh>
    </>
  );
};
