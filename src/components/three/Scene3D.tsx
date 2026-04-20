import { Canvas } from "@react-three/fiber";
import { Suspense, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  fixed?: boolean;
}

export const Scene3D = ({ children, className, camera, fixed }: Scene3DProps) => {
  return (
    <div
      className={cn(
        fixed ? "fixed inset-0 -z-10 pointer-events-none" : "absolute inset-0 pointer-events-none",
        className,
      )}
    >
      <Canvas
        camera={{ position: camera?.position ?? [0, 0, 6], fov: camera?.fov ?? 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
};
