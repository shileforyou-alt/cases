import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Shared lighting rig so the premium helix reads the same
 * (glossy metal + red glow) in every Canvas across the page.
 */
export function HelixLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 12, 8]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-11, -6, 7]} intensity={2.6} color="#E10600" distance={44} />
      <pointLight position={[11, 9, -6]} intensity={1.3} color="#ff5a3c" distance={44} />
      <spotLight position={[0, 22, 12]} angle={0.4} penumbra={1} intensity={1.6} color="#ffffff" />
    </>
  );
}

/**
 * A large, premium DNA double-helix used as the hero visual in
 * the "What artists say" section. Glossy metal rungs, glowing red
 * nodes, and a slow, expensive motion (rotation + breathing + float
 * + cursor parallax).
 */
export function PremiumDNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  const count = 34; // base pairs
  const radius = 3.2;
  const height = 26;
  const turns = 3.2;

  const points = useMemo(() => {
    const arr: { y: number; angle: number; t: number }[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      arr.push({ y, angle, t });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const et = state.clock.elapsedTime;

    // continuous slow spin
    g.rotation.y = et * 0.32;

    // subtle "breathing" scale for a living, expensive feel
    const s = 1 + Math.sin(et * 0.55) * 0.025;
    g.scale.setScalar(s);

    // smooth cursor parallax
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.22, 0.045);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.14, 0.045);
  });

  return (
    <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={groupRef}>
        {points.map((p, i) => {
          const x1 = Math.cos(p.angle) * radius;
          const z1 = Math.sin(p.angle) * radius;
          const x2 = Math.cos(p.angle + Math.PI) * radius;
          const z2 = Math.sin(p.angle + Math.PI) * radius;

          return (
            <group key={i} position={[0, p.y, 0]}>
              {/* Glowing red node */}
              <mesh position={[x1, 0, z1]} castShadow>
                <sphereGeometry args={[0.85, 48, 48]} />
                <meshStandardMaterial
                  color="#E10600"
                  emissive="#E10600"
                  emissiveIntensity={0.65}
                  roughness={0.12}
                  metalness={0.55}
                />
              </mesh>

              {/* Chrome/white counter-node */}
              <mesh position={[x2, 0, z2]} castShadow>
                <sphereGeometry args={[0.6, 48, 48]} />
                <meshStandardMaterial
                  color="#f5f5f5"
                  emissive="#ff3a24"
                  emissiveIntensity={0.12}
                  roughness={0.08}
                  metalness={0.95}
                />
              </mesh>

              {/* Polished metal rung */}
              <mesh rotation={[0, -p.angle, Math.PI / 2]}>
                <cylinderGeometry args={[0.11, 0.11, radius * 2, 24]} />
                <meshStandardMaterial color="#9a9a9a" roughness={0.22} metalness={0.98} />
              </mesh>
            </group>
          );
        })}
      </group>
    </Float>
  );
}
