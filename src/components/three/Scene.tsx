import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei'
import { Particles } from './Particles'
import { Suspense } from 'react'

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00E6A8" />
          
          <Particles count={3000} />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[-2, 1, -2]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial
                color="#00E6A8"
                wireframe
                transparent
                opacity={0.15}
              />
            </mesh>
          </Float>

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
            <mesh position={[2, -1, -3]}>
              <octahedronGeometry args={[0.8, 0]} />
              <meshStandardMaterial
                color="#00E6A8"
                wireframe
                transparent
                opacity={0.1}
              />
            </mesh>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}
