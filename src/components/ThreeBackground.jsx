import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP ---
    const scene = new THREE.Scene();
    // Fog lebih dalam untuk kesan 'Endless Space'
    scene.fog = new THREE.FogExp2(0x020617, 0.03);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        powerPreference: "high-performance",
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap pixel ratio agar tidak berat di layar 4K
    
    containerRef.current.innerHTML = ''; 
    containerRef.current.appendChild(renderer.domElement);

    // --- HELPER: GLOW TEXTURE GENERATOR ---
    // Membuat tekstur cahaya lembut tanpa perlu load file gambar
    const getGlowTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    };

    const glowTexture = getGlowTexture();

    // --- OBJECTS ---

    // 1. STARFIELD (Partikel Kecil Bercahaya)
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 1500; // Jumlah partikel
    const posArray = new Float32Array(starsCount * 3);
    // Distribusi partikel lebih menyebar
    for(let i=0; i<starsCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80; 
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({ 
        size: 0.15, 
        map: glowTexture, 
        transparent: true, 
        opacity: 0.8, 
        blending: THREE.AdditiveBlending, // Efek glow
        depthWrite: false 
    });
    const starsMesh = new THREE.Points(starsGeo, starsMat);
    scene.add(starsMesh);

    // 2. UNIVERSE GRID (Bola Kawat Raksasa)
    // Memberikan kesan "Cyber Space" atau "Global Network"
    const gridGeo = new THREE.IcosahedronGeometry(30, 2);
    const gridMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.03 // Sangat tipis agar elegan
    });
    const gridSphere = new THREE.Mesh(gridGeo, gridMat);
    scene.add(gridSphere);

    // 3. CORE (Inti Tengah - Berlapis)
    const coreGroup = new THREE.Group();
    
    // Layer 1: Wireframe Geometris
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.3 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    
    // Layer 2: Inner Glow (Sphere kecil di dalam)
    const innerCoreGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const innerCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    
    coreGroup.add(core);
    coreGroup.add(innerCore);
    scene.add(coreGroup);

    // 4. FLOATING DATA DEBRIS (Partikel geometris melayang)
    const debrisGeo = new THREE.BufferGeometry();
    const debrisCount = 50;
    const debrisPos = new Float32Array(debrisCount * 3);
    for(let i=0; i<debrisCount*3; i++) debrisPos[i] = (Math.random() - 0.5) * 15;
    debrisGeo.setAttribute('position', new THREE.BufferAttribute(debrisPos, 3));
    const debrisMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4
    });
    const debrisMesh = new THREE.Points(debrisGeo, debrisMat);
    scene.add(debrisMesh);

    // 5. ROCKET (Tetap sama, ikonik)
    const rocketGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8 }));
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
    nose.position.y = 1;
    const finGeo = new THREE.BoxGeometry(0.05, 0.4, 0.4);
    const finMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    
    const fin1 = new THREE.Mesh(finGeo, finMat); fin1.position.set(0.2, -0.5, 0);
    const fin2 = new THREE.Mesh(finGeo, finMat); fin2.position.set(-0.2, -0.5, 0);
    
    rocketGroup.add(body, nose, fin1, fin2);
    rocketGroup.position.set(2, -2, 0);
    rocketGroup.rotation.z = Math.PI / 4;
    scene.add(rocketGroup);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let mouseX = 0, mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005; // Diperlambat sedikit responsivitasnya agar smooth
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const animate = () => {
      const time = clock.getElapsedTime();
      
      // Get Color from CSS Variable safely
      let primaryColor = '#22d3ee';
      if (typeof getComputedStyle !== 'undefined') {
          const styleColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
          if (styleColor) primaryColor = styleColor;
      }
      
      // Update Colors
      const colorObj = new THREE.Color(primaryColor);
      starsMat.color.set(colorObj);
      coreMat.color.set(colorObj);
      innerCoreMat.color.set(colorObj);
      body.material.color.set(colorObj);
      gridMat.color.set(colorObj);

      // --- ANIMATIONS ---
      
      // 1. Core complex rotation
      coreGroup.rotation.y += 0.05 * (mouseX - coreGroup.rotation.y);
      coreGroup.rotation.x += 0.05 * (mouseY - coreGroup.rotation.x);
      core.rotation.z -= 0.002;
      core.rotation.y -= 0.002;
      innerCore.rotation.z += 0.005; // Inner core spins faster opposite direction

      // 2. Stars drift
      starsMesh.rotation.y = time * 0.02; // Rotate entire galaxy slowly
      starsMesh.rotation.z = time * 0.01;

      // 3. Grid Sphere rotation (Very slow, grand feel)
      gridSphere.rotation.y = -time * 0.05;

      // 4. Debris floating
      debrisMesh.rotation.x = time * 0.1;
      debrisMesh.rotation.y = time * 0.1;

      // 5. Rocket Scroll Logic
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProg = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);
      
      const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
      
      let tx = 2.5, ty = -2.5, rz = Math.PI/4;

      if (scrollProg < 0.25) {
        const p = scrollProg / 0.25; ty = lerp(-2.5, 2.5, p);
      } else if (scrollProg < 0.5) {
        const p = (scrollProg - 0.25) / 0.25; tx = lerp(2.5, -2.5, p); ty = 2.5; rz = Math.PI / 2;
      } else if (scrollProg < 0.75) {
        const p = (scrollProg - 0.5) / 0.25; tx = -2.5; ty = lerp(2.5, -2.5, p); rz = Math.PI;
      } else {
        const p = (scrollProg - 0.75) / 0.25; tx = lerp(-2.5, 0, p); ty = lerp(-2.5, 0, p); rz = -Math.PI / 4;
      }

      rocketGroup.position.x += (tx - rocketGroup.position.x) * 0.05;
      rocketGroup.position.y += (ty - rocketGroup.position.y) * 0.05;
      rocketGroup.rotation.z += (rz - rocketGroup.rotation.z) * 0.05;
      rocketGroup.rotation.y += 0.02; // Spin rocket slightly

      // Add slight floating hover to rocket
      rocketGroup.position.y += Math.sin(time * 2) * 0.02;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (containerRef.current) containerRef.current.innerHTML = '';
      renderer.dispose();
      
      // Dispose materials/geometries to prevent memory leaks
      starsGeo.dispose(); starsMat.dispose(); glowTexture.dispose();
      gridGeo.dispose(); gridMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

export default ThreeBackground;