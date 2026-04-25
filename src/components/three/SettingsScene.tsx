import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const Gear = ({
  position,
  radius,
  speed,
  color,
  reverse = false,
}: {
  position: [number, number, number];
  radius: number;
  speed: number;
  color: string;
  reverse?: boolean;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * speed * (reverse ? -1 : 1);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[radius, radius * 0.12, 6, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} />
    </mesh>
  );
};

const Crystal = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.75} wireframe />
      </mesh>
    </Float>
  );
};

export const SettingsScene = () => {
  const gridRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (gridRef.current) {
      const geo = gridRef.current.geometry as THREE.PlaneGeometry;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 0.5 + s.clock.elapsedTime * 0.3) * 0.3 + Math.cos(y * 0.5) * 0.2);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 4, 2]} intensity={2} color="#3AB8FF" />
      <pointLight position={[-3, -2, 1]} intensity={1.5} color="#B57FFF" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#5EFFC1" />
      <Stars radius={75} depth={55} count={1000} factor={3} fade />

      {/* Gear system */}
      <Gear position={[-2, 1, -3]} radius={0.8} speed={0.4} color="#3AB8FF" />
      <Gear position={[-0.9, 1, -3]} radius={0.5} speed={0.64} color="#5EFFC1" reverse />
      <Gear position={[1.5, -1, -4]} radius={1.1} speed={0.25} color="#B57FFF" />
      <Gear position={[3, -0.5, -3]} radius={0.6} speed={0.45} color="#3AB8FF" reverse />

      {/* Crystal clusters */}
      <Crystal position={[-4, 2, -2]} color="#5EFFC1" />
      <Crystal position={[4, -1, -2]} color="#3AB8FF" />
      <Crystal position={[0, 3, -3]} color="#B57FFF" />

      {/* Grid wave */}
      <mesh ref={gridRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -2]}>
        <planeGeometry args={[20, 20, 24, 24]} />
        <meshStandardMaterial color="#3AB8FF" wireframe emissive="#3AB8FF" emissiveIntensity={0.35} />
      </mesh>
    </>
  );
};
