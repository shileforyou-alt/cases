import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DNAHelix() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400; // 200 per strand
  
  // Create a memoized geometry to avoid recreating it
  const { positions, colors } = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const radius = 2.5;
    const height = 15;
    const turns = 2.5;
    
    // Base emissive color: #D4500A (Red-Orange)
    const colorObj = new THREE.Color('#D4500A');
    
    for (let i = 0; i < count / 2; i++) {
      const t = i / (count / 2);
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      
      // Strand 1
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Strand 2
      const i2 = i + (count / 2);
      pos[i2 * 3] = Math.cos(angle + Math.PI) * radius;
      pos[i2 * 3 + 1] = y;
      pos[i2 * 3 + 2] = Math.sin(angle + Math.PI) * radius;
      
      // Add subtle variation in color for depth
      col[i * 3] = colorObj.r; col[i * 3 + 1] = colorObj.g; col[i * 3 + 2] = colorObj.b;
      col[i2 * 3] = colorObj.r; col[i2 * 3 + 1] = colorObj.g; col[i2 * 3 + 2] = colorObj.b;
    }
    
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation over time
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Gentle floating up and down
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      
      // Parallax effect on cursor
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        (state.pointer.y * Math.PI) * 0.05,
        0.05
      );
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        -(state.pointer.x * Math.PI) * 0.05,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

import React from 'react';
