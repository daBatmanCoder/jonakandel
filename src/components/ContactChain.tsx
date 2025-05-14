import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const ContactChain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for WebGL support
    if (!WebGL.isWebGLAvailable()) {
      const warning = WebGL.getWebGLErrorMessage();
      containerRef.current.appendChild(warning);
      return;
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 2000);
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "default", // Changed from high-performance
      });

      renderer.setSize(window.innerWidth, 400);
      renderer.setClearColor(0x000000, 0);
      containerRef.current.appendChild(renderer.domElement);

      // Create base box (much larger)
      const baseGeometry = new THREE.BoxGeometry(400, 160, 240);
      const edges = new THREE.EdgesGeometry(baseGeometry);
      const baseMaterial = new THREE.LineBasicMaterial({
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.8,
      });
      const baseWireframe = new THREE.LineSegments(edges, baseMaterial);
      baseWireframe.position.set(0, -40, 0);
      scene.add(baseWireframe);

      // Create plunger (much larger)
      const plungerGeometry = new THREE.CylinderGeometry(80, 80, 40, 32);
      const plungerEdges = new THREE.EdgesGeometry(plungerGeometry);
      const plungerMaterial = new THREE.LineBasicMaterial({
        color: 0xff3333,
        transparent: true,
        opacity: 0.8,
      });
      const plungerWireframe = new THREE.LineSegments(plungerEdges, plungerMaterial);
      plungerWireframe.position.set(0, 240, 0);
      scene.add(plungerWireframe);

      // Create rod (much larger)
      const rodGeometry = new THREE.CylinderGeometry(16, 16, 320, 16);
      const rodEdges = new THREE.EdgesGeometry(rodGeometry);
      const rodMaterial = new THREE.LineBasicMaterial({
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.8,
      });
      const rodWireframe = new THREE.LineSegments(rodEdges, rodMaterial);
      rodWireframe.position.set(0, 80, 0);
      scene.add(rodWireframe);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(0, 10, 20);
      scene.add(pointLight);

      // Adjust camera for larger view
      camera.position.set(0, 200, 800);
      camera.lookAt(0, 100, 0);

      let animationFrameId: number;

      // Animation with larger movement
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        // Pulsing neon effect
        const pulseIntensity = (Math.sin(time * 2) + 1) / 2;
        [baseMaterial, plungerMaterial, rodMaterial].forEach(material => {
          material.opacity = 0.5 + pulseIntensity * 0.5;
        });

        // Larger plunger animation
        plungerWireframe.position.y = 240 + Math.sin(time * 2) * 12;
        rodWireframe.position.y = 80 + Math.sin(time * 2) * 12;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current) return;
        renderer.setSize(window.innerWidth, 400);
        camera.aspect = window.innerWidth / 400;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
        // Clean up geometries and materials
        [baseGeometry, plungerGeometry, rodGeometry].forEach(geometry => geometry.dispose());
        [baseMaterial, plungerMaterial, rodMaterial].forEach(material => material.dispose());
      };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
    }
  }, []);

  return (
    <div className="relative h-[400px] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
};

export default ContactChain; 