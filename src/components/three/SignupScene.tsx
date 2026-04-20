import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const SignupScene = () => {
  const groupRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 20;
      const r = 0.5 + (i / count) * 4;
      positions[i * 3] = Math.cos(t) * r;
      positions[i * 3 + 1] = (i / count - 0.5) * 10;
      positions[i * 3 + 2] = Math.sin(t) * r;
      const mix = i / count;
      colors[i * 3] = 0.37 * (1 - mix);
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 0.76 + 0.24 * mix;
    }
    return { positions, colors };
  }, []);

  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = s.clock.elapsedTime * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <points ref={groupRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.9} />
      </points>
    </>
  );
};
