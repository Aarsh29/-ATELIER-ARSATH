import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export type TextileType = 'crimson' | 'champagne' | 'emerald';

interface HeroScene3DProps {
  activeTextile: TextileType;
  onInteract?: () => void;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ activeTextile, onInteract }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeTextileRef = useRef<TextileType>(activeTextile);
  activeTextileRef.current = activeTextile;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // Master Group for 3D silk and particle elements
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- PARAMETRIC HIGH-FASHION SILK DRAPE GEOMETRY ---
    // A high-resolution undulating ribbon / ceremonial pallu cloth mesh
    const width = 3.6;
    const height = 4.2;
    const segX = 84;
    const segY = 96;
    const clothGeometry = new THREE.PlaneGeometry(width, height, segX, segY);

    // Save base vertex positions for mathematical wave animation
    const basePositions = new Float32Array(clothGeometry.attributes.position.array);
    const count = clothGeometry.attributes.position.count;

    // --- BESPOKE LUXURY TEXTILE MATERIAL PALETTES ---
    const TEXTILE_PALETTES = {
      crimson: {
        color: new THREE.Color(0x8a1b29), // Rich Sacred Madder Crimson
        emissive: new THREE.Color(0x1a0206),
        sheenColor: new THREE.Color(0xd4af37), // 24k Gold Zari micro-sheen
        roughness: 0.42,
        metalness: 0.22,
        clearcoat: 0.55,
      },
      champagne: {
        color: new THREE.Color(0xd6c7a7), // Starlight Gilded Tissue Organza
        emissive: new THREE.Color(0x1f1910),
        sheenColor: new THREE.Color(0xfff4db),
        roughness: 0.28,
        metalness: 0.45,
        clearcoat: 0.85,
      },
      emerald: {
        color: new THREE.Color(0x134638), // Temple Peacock Emerald Silk
        emissive: new THREE.Color(0x03120c),
        sheenColor: new THREE.Color(0xc5a880),
        roughness: 0.38,
        metalness: 0.25,
        clearcoat: 0.65,
      },
    };

    const initialPalette = TEXTILE_PALETTES[activeTextileRef.current];

    const clothMaterial = new THREE.MeshPhysicalMaterial({
      color: initialPalette.color.clone(),
      emissive: initialPalette.emissive.clone(),
      roughness: initialPalette.roughness,
      metalness: initialPalette.metalness,
      clearcoat: initialPalette.clearcoat,
      clearcoatRoughness: 0.3,
      sheen: 1.0,
      sheenRoughness: 0.4,
      sheenColor: initialPalette.sheenColor.clone(),
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
    clothMesh.position.set(0.6, 0.1, 0); // Positioned elegantly on center-right
    clothMesh.rotation.set(-0.25, 0.4, 0.15); // Dynamic 3D diagonal sweep
    masterGroup.add(clothMesh);

    // Subtle Gold Zari Grid Accent Layer
    const zariGridMaterial = new THREE.MeshBasicMaterial({
      color: 0xc5a880,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const zariGridMesh = new THREE.Mesh(clothGeometry, zariGridMaterial);
    zariGridMesh.position.copy(clothMesh.position);
    zariGridMesh.rotation.copy(clothMesh.rotation);
    zariGridMesh.scale.set(1.002, 1.002, 1.002);
    masterGroup.add(zariGridMesh);

    // --- FLOATING GOLD KARDANA & ZARI MICRO-PARTICLES ---
    const particleCount = 220;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 6;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 4;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: Math.random() * 0.005 + 0.002, // Gentle upward golden dust drift
        z: (Math.random() - 0.5) * 0.003,
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particleSystem);

    // --- LIGHTING RIG (HAUTE COUTURE DRAMA) ---
    // Key Light
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Warm Gold Zari Rim Light
    const goldRimLight = new THREE.DirectionalLight(0xc5a880, 2.8);
    goldRimLight.position.set(-4, 3, -2);
    scene.add(goldRimLight);

    // Ambient Silk Shadow Fill
    const ambientLight = new THREE.AmbientLight(0x221a18, 1.6);
    scene.add(ambientLight);

    // Top Down Spotlight for Sheen Highlights
    const spotLight = new THREE.SpotLight(0xffffff, 2.5, 12, Math.PI / 4, 0.4);
    spotLight.position.set(0, 6, 3);
    scene.add(spotLight);

    // --- INTERACTION & CURSOR TRACKING ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      velocity: 0,
      lastX: 0,
      lastY: 0,
    };

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = -0.25;
    let targetRotationY = 0.4;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
      onInteract?.();
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = nx;
      mouse.targetY = ny;

      // Calculate instantaneous mouse velocity for silk wave ripple intensity
      const dx = clientX - mouse.lastX;
      const dy = clientY - mouse.lastY;
      mouse.velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.04, 2.5);
      mouse.lastX = clientX;
      mouse.lastY = clientY;

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;
        // Clamp rotation
        targetRotationX = Math.max(-0.6, Math.min(0.2, targetRotationX));
        prevMousePos = { x: clientX, y: clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // --- ANIMATION RENDER LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      mouse.velocity *= 0.94; // Velocity damping

      // Smooth rotation lerping
      clothMesh.rotation.y += (targetRotationY - clothMesh.rotation.y) * 0.06;
      clothMesh.rotation.x += (targetRotationX - clothMesh.rotation.x) * 0.06;
      zariGridMesh.rotation.copy(clothMesh.rotation);

      // Subtle atmospheric hovering sway
      masterGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08;
      masterGroup.position.x = Math.cos(elapsedTime * 0.6) * 0.04;

      // Color/Material smooth interpolation toward active textile preset
      const currentTarget = TEXTILE_PALETTES[activeTextileRef.current];
      clothMaterial.color.lerp(currentTarget.color, 0.06);
      clothMaterial.emissive.lerp(currentTarget.emissive, 0.06);
      clothMaterial.sheenColor.lerp(currentTarget.sheenColor, 0.06);
      clothMaterial.roughness += (currentTarget.roughness - clothMaterial.roughness) * 0.06;
      clothMaterial.metalness += (currentTarget.metalness - clothMaterial.metalness) * 0.06;
      clothMaterial.clearcoat += (currentTarget.clearcoat - clothMaterial.clearcoat) * 0.06;

      // --- PROCEDURAL PHYSICS SILK WAVE DISPLACEMENT ---
      const positionAttr = clothGeometry.attributes.position;
      const positions = positionAttr.array as Float32Array;

      // Wave parameters
      const waveSpeed = 1.8;
      const mouseInfluenceRadius = 1.4;
      const ripplePower = mouse.velocity * 0.35;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];

        // 1. Organic harmonic natural silk folds (primary and secondary undulations)
        const primaryWave = Math.sin(bx * 2.2 + elapsedTime * waveSpeed) * 0.22;
        const diagonalWave = Math.cos(by * 1.8 + bx * 1.4 + elapsedTime * 1.3) * 0.16;
        const microFluter = Math.sin(by * 5.0 - elapsedTime * 3.0) * 0.04;

        // 2. Interactive cursor ripple interaction
        // Calculate distance from vertex to projected cursor pos
        const distX = bx - mouse.x * 2.0;
        const distY = by - mouse.y * 2.0;
        const dist = Math.sqrt(distX * distX + distY * distY);

        let cursorWave = 0;
        if (dist < mouseInfluenceRadius) {
          const factor = 1.0 - dist / mouseInfluenceRadius;
          cursorWave = Math.sin(dist * 8.0 - elapsedTime * 6.0) * factor * (0.2 + ripplePower);
        }

        // Apply Z-displacement
        positions[i3 + 2] = primaryWave + diagonalWave + microFluter + cursorWave;
      }

      positionAttr.needsUpdate = true;
      clothGeometry.computeVertexNormals();

      // --- ANIMATE GOLD PARTICLES ---
      const particlePosAttr = particleGeom.attributes.position;
      const pPositions = particlePosAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const vel = particleVelocities[i];

        pPositions[i3] += vel.x * vel.speed;
        pPositions[i3 + 1] += vel.y * vel.speed;
        pPositions[i3 + 2] += vel.z * vel.speed;

        // Wrap around boundary
        if (pPositions[i3 + 1] > 2.8) {
          pPositions[i3 + 1] = -2.8;
          pPositions[i3] = (Math.random() - 0.5) * 6;
        }
      }
      particlePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      clothGeometry.dispose();
      clothMaterial.dispose();
      zariGridMaterial.dispose();
      particleGeom.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      data-cursor="TOUCH 3D"
      title="Drag to orbit 3D silk • Move cursor to ripple"
    />
  );
};
