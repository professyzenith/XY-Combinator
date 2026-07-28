import * as THREE from "three";

/**
 * Premium WebGL Scene (Vanilla Three.js)
 * High-performance, mobile-optimized, responds to system motion preferences.
 */
export function initThreeScene(canvas) {
  // Respect user motion preferences
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return () => {};

  const isMobile = window.innerWidth < 768;

  // Scene setup
  const scene = new THREE.Scene();
  // Optional: add a very subtle fog to blend objects into the background distance
  scene.fog = new THREE.FogExp2(0xe4e4e9, 0.0015);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = isMobile ? 30 : 20;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2x for perf

  // Abstract Geometric Shapes (Glass/Metallic aesthetic)
  const group = new THREE.Group();
  scene.add(group);

  // Base Material Properties for a "frosted colored glass" look
  const baseMaterialProps = {
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.9, 
    ior: 1.5,
    thickness: 0.5,
    envMapIntensity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  };

  const materials = [
    new THREE.MeshPhysicalMaterial({ ...baseMaterialProps, color: 0x4ade80 }), // Vibrant Green
    new THREE.MeshPhysicalMaterial({ ...baseMaterialProps, color: 0xa855f7 }), // Purple
    new THREE.MeshPhysicalMaterial({ ...baseMaterialProps, color: 0x3b82f6 }), // Blue
    new THREE.MeshPhysicalMaterial({ ...baseMaterialProps, color: 0xec4899 }), // Pink
    new THREE.MeshPhysicalMaterial({ ...baseMaterialProps, color: 0xf59e0b }), // Amber/Orange
    new THREE.MeshPhysicalMaterial({ ...baseMaterialProps, color: 0x06b6d4 }), // Cyan
  ];

  // Create multiple abstract shapes
  const geometries = [
    new THREE.TorusGeometry(3, 0.8, 16, 100),
    new THREE.IcosahedronGeometry(2.5, 0),
    new THREE.OctahedronGeometry(2, 0),
    new THREE.TorusKnotGeometry(2, 0.6, 100, 16),
    new THREE.SphereGeometry(2, 32, 32),
  ];

  // Increased number of objects
  const numShapes = isMobile ? 8 : 18;
  const meshes = [];

  for (let i = 0; i < numShapes; i++) {
    const geo = geometries[i % geometries.length];
    const mat = materials[i % materials.length];
    const mesh = new THREE.Mesh(geo, mat);
    
    // Wider spread to fill the screen
    mesh.position.x = (Math.random() - 0.5) * 35;
    mesh.position.y = (Math.random() - 0.5) * 25;
    mesh.position.z = (Math.random() - 0.5) * 20 - 10;
    
    // Random initial rotation
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    // Faster custom animation speeds
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.02,
      ry: (Math.random() - 0.5) * 0.02,
      floatSpeed: 0.002 + Math.random() * 0.003,
      floatOffset: Math.random() * Math.PI * 2,
      initialY: mesh.position.y
    };

    group.add(mesh);
    meshes.push(mesh);
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x7fa898, 3); // Sage accent
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x4a78a8, 2); // Steel blue accent
  dirLight2.position.set(-5, -5, 5);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0x7a5ea8, 2, 50); // Violet accent
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  }
  
  if (!isMobile) {
    document.addEventListener("mousemove", onDocumentMouseMove);
  }

  // Resize handler
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize);

  // Animation Loop
  let raf;
  const clock = new THREE.Clock();

  function animate() {
    raf = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Smooth mouse follow for the whole group
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    group.rotation.y += 0.05 * (targetX - group.rotation.y);
    group.rotation.x += 0.05 * (targetY - group.rotation.x);

    // Individual shape animation
    meshes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rx;
      mesh.rotation.y += mesh.userData.ry;
      // Gentle floating up and down
      mesh.position.y = mesh.userData.initialY + Math.sin(time * mesh.userData.floatSpeed * 1000 + mesh.userData.floatOffset) * 1.5;
    });

    // Move the point light in a circle
    pointLight.position.x = Math.sin(time * 0.5) * 10;
    pointLight.position.z = Math.cos(time * 0.5) * 10;

    renderer.render(scene, camera);
  }

  animate();

  // Cleanup function
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onWindowResize);
    document.removeEventListener("mousemove", onDocumentMouseMove);
    
    // Dispose Three.js resources to prevent memory leaks
    geometries.forEach(g => g.dispose());
    material.dispose();
    renderer.dispose();
  };
}
