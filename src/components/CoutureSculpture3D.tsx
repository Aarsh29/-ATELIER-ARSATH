import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CoutureSculpture3DProps {
  className?: string;
}

export const CoutureSculpture3D: React.FC<CoutureSculpture3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 7.5);

    // 2. Renderer with High-End Tone Mapping & Alpha Transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup (Cinematic 3-Point Lighting)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    // Interactive Key Light (moves with mouse)
    const keyLight = new THREE.PointLight(0xffe8ba, 55, 25);
    keyLight.position.set(2, 3, 5);
    scene.add(keyLight);

    // Crimson Zari Rim Light (adds moody warmth from behind/side)
    const rimLight = new THREE.PointLight(0x9b1b30, 45, 20);
    rimLight.position.set(-3, -1.5, -2);
    scene.add(rimLight);

    // Top Gold Accent Light
    const topLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // 4. Materials
    // A) 24K Burnished Gold Zari
    const goldZariMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E5B842'),
      emissive: new THREE.Color('#382806'),
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });

    // B) Obsidian Matte Silk Torso
    const obsidianTorsoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#141110'),
      metalness: 0.2,
      roughness: 0.45,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
    });

    // C) Faceted Heirloom Crystal Core
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFF5E4'),
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.85,
      ior: 1.55,
      thickness: 1.2,
    });

    // 5. Parametric Couture Mannequin Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // A) Sculpted Mannequin Bust via Lathe Spline
    const points: THREE.Vector2[] = [];
    const curveHeights = [
      { y: -2.0, r: 0.05 }, // Base pedestal mount
      { y: -1.7, r: 0.25 },
      { y: -1.3, r: 0.58 }, // Hip taper
      { y: -0.7, r: 0.48 }, // Waist cinch
      { y: 0.0, r: 0.68 },  // Bust volume
      { y: 0.6, r: 0.82 },  // Shoulder flare
      { y: 0.85, r: 0.32 }, // Neck taper
      { y: 1.15, r: 0.28 }, // Throat
      { y: 1.28, r: 0.0 },  // Neck apex
    ];

    curveHeights.forEach((pt) => {
      points.push(new THREE.Vector2(pt.r, pt.y));
    });

    const torsoGeo = new THREE.LatheGeometry(points, 64);
    const torsoMesh = new THREE.Mesh(torsoGeo, obsidianTorsoMaterial);
    torsoMesh.scale.set(1.0, 1.05, 0.72); // Flatten depth slightly for human silhouette
    sculptureGroup.add(torsoMesh);

    // B) Flowing Spiraling Gold Zari Ribbon Bands (Architectural Saree Pallu Motif)
    const ribbonGroup = new THREE.Group();
    sculptureGroup.add(ribbonGroup);

    const ribbonCount = 5;
    for (let i = 0; i < ribbonCount; i++) {
      const angleOffset = (i * Math.PI * 2) / ribbonCount;
      const curvePoints: THREE.Vector3[] = [];
      const steps = 60;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const y = -1.6 + t * 2.7;
        const radius = (0.55 + Math.sin(t * Math.PI) * 0.45) * (1 + 0.15 * Math.sin(t * 8));
        const theta = t * Math.PI * 3.2 + angleOffset;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * (radius * 0.75);
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const ribbonCurve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(ribbonCurve, 70, 0.038, 12, false);
      const ribbonMesh = new THREE.Mesh(tubeGeo, goldZariMaterial);
      ribbonGroup.add(ribbonMesh);
    }

    // C) Ornamental Gold Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(1.05, 0.022, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geo, goldZariMaterial);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    ring1.position.y = 0.2;
    sculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.85, 0.018, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geo, goldZariMaterial);
    ring2.rotation.x = -Math.PI * 0.28;
    ring2.rotation.z = Math.PI * 0.2;
    ring2.position.y = -0.4;
    sculptureGroup.add(ring2);

    // D) Faceted Heirloom Crystal Core
    const crystalGeo = new THREE.OctahedronGeometry(0.24, 0);
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMaterial);
    crystalMesh.position.set(0, 0.42, 0.52);
    crystalMesh.rotation.z = Math.PI / 4;
    sculptureGroup.add(crystalMesh);

    // E) Floating Gold Micro-Particles
    const particleCount = 160;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAngles = new Float32Array(particleCount);
    const particleRadii = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    for (let p = 0; p < particleCount; p++) {
      const radius = 1.0 + Math.random() * 1.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;
      particlePositions[p * 3] = Math.cos(angle) * radius;
      particlePositions[p * 3 + 1] = y;
      particlePositions[p * 3 + 2] = Math.sin(angle) * radius;
      particleAngles[p] = angle;
      particleRadii[p] = radius;
      particleSpeeds[p] = 0.2 + Math.random() * 0.4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#FFDF85'),
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interaction: Mouse Parallax & Drag-to-Orbit
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotStartY = 0;
    let dragRotStartX = 0;
    let velocityY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = (e.clientX - dragStartX) * 0.008;
        const deltaY = (e.clientY - dragStartY) * 0.008;
        targetRotationY = dragRotStartY + deltaX;
        targetRotationX = Math.max(-0.4, Math.min(0.4, dragRotStartX + deltaY));
        velocityY = deltaX * 0.5;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragRotStartY = targetRotationY;
      dragRotStartX = targetRotationX;
      velocityY = 0;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Inertial spin & subtle auto drift
      if (!isDragging) {
        targetRotationY += velocityY + 0.003;
        velocityY *= 0.94; // damping
      }

      // Parallax mouse tilt
      const targetParallaxX = -mouseY * 0.18 + targetRotationX;
      const targetParallaxY = targetRotationY + mouseX * 0.25;

      sculptureGroup.rotation.y += (targetParallaxY - sculptureGroup.rotation.y) * 0.06;
      sculptureGroup.rotation.x += (targetParallaxX - sculptureGroup.rotation.x) * 0.06;

      // Gentle vertical floating motion
      sculptureGroup.position.y = -0.1 + Math.sin(elapsedTime * 1.2) * 0.08;

      // Dynamic light tracking
      keyLight.position.x = mouseX * 5 + 1;
      keyLight.position.y = mouseY * 4 + 2;

      // Orbital rings animation
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.3;

      // Crystal gentle spin
      crystalMesh.rotation.y = elapsedTime * 0.8;
      crystalMesh.rotation.x = Math.sin(elapsedTime) * 0.4;

      // Particles orbit animation
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let p = 0; p < particleCount; p++) {
        particleAngles[p] += particleSpeeds[p] * 0.015;
        const px = Math.cos(particleAngles[p]) * particleRadii[p];
        const pz = Math.sin(particleAngles[p]) * particleRadii[p];
        posAttr.setX(p, px);
        posAttr.setZ(p, pz);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      data-cursor="ORBIT"
    />
  );
};
