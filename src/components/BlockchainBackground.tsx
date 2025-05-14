import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// Define interface for animated block properties
interface AnimatedBlock extends THREE.Mesh {
  basePosition: THREE.Vector3;
  floatSpeed: number;
  rotationSpeed: number;
  floatOffset: number;
}

const BlockchainBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const blocksRef = useRef<AnimatedBlock[]>([]);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const targetCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 50));

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x000428, 20, 100); // Darker blue fog
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;
      cameraRef.current = camera;

      // Check if WebGL is supported
      if (!WebGL.isWebGLAvailable()) {
        console.warn('WebGL not available');
        return;
      }

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Lights setup
      const ambientLight = new THREE.AmbientLight(0x101010);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0x4a9eff, 2);
      mainLight.position.set(10, 10, 10);
      scene.add(mainLight);

      // Create multiple point lights for a city-like effect
      const colors = [0x4a9eff, 0x0044ff, 0x00ff88, 0x0088ff];
      for (let i = 0; i < 8; i++) {
        const light = new THREE.PointLight(
          colors[i % colors.length],
          2,
          20
        );
        light.position.set(
          Math.random() * 60 - 30,
          Math.random() * 60 - 30,
          Math.random() * 60 - 30
        );
        scene.add(light);
      }

      const createBlock = (x: number, y: number, z: number, scale: number = 1) => {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          transparent: true,
          opacity: 0.8,
          shininess: 100,
          specular: 0x4a9eff,
        });

        const block = new THREE.Mesh(geometry, material) as unknown as AnimatedBlock;
        block.position.set(x, y, z);
        block.scale.set(scale, scale, scale);
        block.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        block.basePosition = new THREE.Vector3(x, y, z);
        block.floatSpeed = Math.random() * 0.002 + 0.001;
        block.rotationSpeed = Math.random() * 0.002 + 0.001;
        block.floatOffset = Math.random() * Math.PI * 2;
        
        scene.add(block);
        return block;
      };

      // Create blocks in a city-like formation
      const blocks: AnimatedBlock[] = [];
      const citySize = 5;
      const spacing = 8;

      // Create main city structure
      for (let x = -citySize; x <= citySize; x++) {
        for (let y = -citySize; y <= citySize; y++) {
          for (let z = -2; z <= 2; z++) {
            if (Math.random() > 0.3) { // 70% chance to create a block
              const posX = x * spacing + (Math.random() * 2 - 1);
              const posY = y * spacing + (Math.random() * 2 - 1);
              const posZ = z * spacing + (Math.random() * 2 - 1);
              const scale = Math.random() * 1.5 + 0.5;
              
              blocks.push(createBlock(posX, posY, posZ, scale));
            }
          }
        }
      }

      // Add some floating blocks above and below
      for (let i = 0; i < 50; i++) {
        const x = (Math.random() - 0.5) * citySize * spacing * 2;
        const y = (Math.random() - 0.5) * citySize * spacing * 2;
        const z = (Math.random() - 0.5) * citySize * spacing * 2;
        blocks.push(createBlock(x, y, z, Math.random() * 0.8 + 0.3));
      }

      blocksRef.current = blocks;

      // Mouse move handler for camera movement
      const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update target camera position based on mouse
        const targetX = mouseRef.current.x * 30;
        const targetY = mouseRef.current.y * 30;
        targetCameraPositionRef.current.set(targetX, targetY, 50);
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Animation loop
      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const deltaTime = clock.getDelta();

        // Smooth camera movement
        if (cameraRef.current) {
          cameraRef.current.position.lerp(targetCameraPositionRef.current, deltaTime);
          cameraRef.current.lookAt(0, 0, 0);
        }

        // Animate blocks
        blocks.forEach((block) => {
          const basePosition = block.basePosition;
          const floatSpeed = block.floatSpeed;
          const rotationSpeed = block.rotationSpeed;
          const floatOffset = block.floatOffset;

          // Floating animation
          const time = Date.now() * 0.001;
          block.position.y = basePosition.y + Math.sin(time * floatSpeed + floatOffset) * 1.5;
          
          // Rotation animation
          block.rotation.x += rotationSpeed;
          block.rotation.y += rotationSpeed * 0.8;

          // Subtle position sway
          block.position.x = basePosition.x + Math.sin(time * floatSpeed * 0.5) * 0.3;
          block.position.z = basePosition.z + Math.cos(time * floatSpeed * 0.5) * 0.3;
        });

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error('Error initializing WebGL:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div class="text-center p-4">Unable to initialize 3D background</div>';
      }
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
    />
  );
};

// Helper function to create animated gradient
// function createGradientCanvas() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 512;
//   canvas.height = 512;
//   const ctx = canvas.getContext('2d');
//   if (!ctx) return canvas;

//   // Create gradient
//   const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//   gradient.addColorStop(0, '#000428');
//   gradient.addColorStop(1, '#004e92');

//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   return canvas;
// }

export default BlockchainBackground;