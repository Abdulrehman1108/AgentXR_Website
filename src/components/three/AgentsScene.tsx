import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import * as THREE from "three";

const AgentOrb = ({
  radius,
  speed,
  color,
  size = 0.18,
  phase = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  size?: number;
  phase?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime * speed + phase;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.7) * 0.8;
      ref.current.rotation.y += 0.02;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
};

const NeuralRing = ({ yOffset = 0, color = "#5EFFC1" }: { yOffset?: number; color?: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, yOffset, 0]}>
      <torusGeometry args={[2.5, 0.015, 8, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.4} />
    </mesh>
  );
};

export const AgentsScene = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = s.clock.elapsedTime * 0.2;
      coreRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.15) * 0.15;
      const scale = 1 + Math.sin(s.clock.elapsedTime * 1.5) * 0.06;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#5EFFC1" />
      <pointLight position={[5, 3, 2]} intensity={1.5} color="#3AB8FF" />
      <pointLight position={[-4, -2, -3]} intensity={1} color="#B57FFF" />
      <Stars radius={70} depth={60} count={1500} factor={3} fade />

      {/* Core AI brain */}
      <mesh ref={coreRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial color="#5EFFC1" emissive="#5EFFC1" emissiveIntensity={1.2} wireframe />
      </mesh>

      {/* Orbiting agents */}
      <AgentOrb radius={2} speed={0.5} color="#5EFFC1" size={0.2} phase={0} />
      <AgentOrb radius={2} speed={0.5} color="#3AB8FF" size={0.15} phase={2.1} />
      <AgentOrb radius={2} speed={0.5} color="#B57FFF" size={0.18} phase={4.2} />
      <AgentOrb radius={3.2} speed={0.3} color="#3AB8FF" size={0.12} phase={1} />
      <AgentOrb radius={3.2} speed={0.3} color="#5EFFC1" size={0.1} phase={3.1} />
      <AgentOrb radius={3.2} speed={0.3} color="#B57FFF" size={0.14} phase={5.2} />
      <AgentOrb radius={1.2} speed={0.9} color="#FFD700" size={0.1} phase={0.5} />

      {/* Orbital rings */}
      <NeuralRing yOffset={0} color="#5EFFC1" />
      <NeuralRing yOffset={0.5} color="#3AB8FF" />
      <NeuralRing yOffset={-0.5} color="#B57FFF" />
    </>
  );
};
