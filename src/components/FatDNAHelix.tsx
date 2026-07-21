import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FatDNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  const count = 25; // Number of base pairs
  const radius = 3.5;
  const height = 20;
  const turns = 2.5;
  
  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      
      points.push({
        y,
        angle
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {helixPoints.map((p, i) => {
        const x1 = Math.cos(p.angle) * radius;
        const z1 = Math.sin(p.angle) * radius;
        const x2 = Math.cos(p.angle + Math.PI) * radius;
        const z2 = Math.sin(p.angle + Math.PI) * radius;

        return (
          <group key={i} position={[0, p.y, 0]}>
            {/* Strand 1 sphere */}
            <mesh position={[x1, 0, z1]}>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="#E10600" roughness={0.2} metalness={0.5} />
            </mesh>
            
            {/* Strand 2 sphere */}
            <mesh position={[x2, 0, z2]}>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshStandardMaterial color="#E10600" roughness={0.2} metalness={0.5} />
            </mesh>
            
            {/* Connecting rung */}
            <mesh rotation={[0, -p.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, radius * 2, 16]} />
              <meshStandardMaterial color="#666666" roughness={0.3} metalness={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
