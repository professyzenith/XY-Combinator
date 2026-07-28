"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleUniverse() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Track mouse coordinates for interactive physics
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate particles
  const particleCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Dense central galaxy style distribution
      const r = Math.random() * 15;
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = (Math.random() - 0.5) * 6; 
      const z = r * Math.sin(theta);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Base constant rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Interactive mouse tilt (parallax effect)
      // Interpolate smoothly towards target rotation
      const targetX = mouse.y * 0.5;
      const targetZ = mouse.x * -0.5;
      
      pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.z += (targetZ - pointsRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* Intense neon emerald glow utilizing additive blending to pop against dark background */}
      <pointsMaterial 
        size={0.08} 
        color="#22c55e" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true} 
      />
    </points>
  );
}

export default function Dashboard3DBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "#020617" }}>
      {/* Heavy vignette to make the edges pure black and draw focus to the center */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 50%, transparent 20%, #000000 100%)"
      }} />
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <ParticleUniverse />
      </Canvas>
    </div>
  );
}
