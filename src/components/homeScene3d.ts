// 3D background for the whole homepage: a vertical "calisthenics gym"
// (rings, pull-up bar, parallettes, dip bars, stall bars) that the camera
// travels down through as the page scrolls, with drifting chalk dust.
// Plain three.js (no React renderer) so it can be code-split and loaded
// after first paint.
import * as THREE from "three";

const ORANGE = 0xff6a00;
/** Vertical distance between pieces of equipment (world units) */
const SPACING = 7.5;
/** Side equipment sits further back than the hero rings: smaller, more atmospheric */
const SIDE_DEPTH = -4;

// ─── Materials (shared) ──────────────────────────────────────────────────────
const metal = () =>
  new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.7, roughness: 0.3 });
const darkMetal = () =>
  new THREE.MeshStandardMaterial({ color: 0x242424, metalness: 0.85, roughness: 0.25 });
const accent = () =>
  new THREE.MeshStandardMaterial({
    color: ORANGE,
    emissive: ORANGE,
    emissiveIntensity: 0.35,
    metalness: 0.3,
    roughness: 0.45,
  });

const cylinder = (r: number, len: number, mat: THREE.Material, radial = 24) =>
  new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, radial), mat);

// ─── Equipment builders ─────────────────────────────────────────────────────
/** One gymnastic ring on a strap; the returned pivot sits high above for a long swing */
const buildRing = () => {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.TorusGeometry(1, 0.11, 32, 128), metal()));

  const strap = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 12, 0.03),
    new THREE.MeshStandardMaterial({ color: 0x161616, metalness: 0.2, roughness: 0.7 }),
  );
  strap.position.y = 7;
  group.add(strap);
  const stitch = new THREE.Mesh(new THREE.BoxGeometry(0.025, 12, 0.035), accent());
  stitch.position.y = 7;
  group.add(stitch);

  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.08), darkMetal());
  buckle.position.y = 1.35;
  group.add(buckle);

  const pivot = new THREE.Group();
  group.position.y = -7;
  pivot.add(group);
  pivot.userData.swing = group;
  return pivot;
};

const buildRingsPair = (gap: number) => {
  const pair = new THREE.Group();
  const left = buildRing();
  const right = buildRing();
  left.position.set(-gap, 7, 0);
  right.position.set(gap, 7, 0);
  left.userData.side = -1;
  right.userData.side = 1;
  pair.add(left, right);
  pair.userData.kind = "rings";
  return pair;
};

const buildPullUpBar = () => {
  const g = new THREE.Group();
  const bar = cylinder(0.06, 4.2, metal());
  bar.rotation.z = Math.PI / 2;
  bar.position.y = 2;
  g.add(bar);
  for (const x of [-2, 2]) {
    const post = cylinder(0.11, 5, darkMetal());
    post.position.set(x, -0.5, 0);
    g.add(post);
    const cap = cylinder(0.13, 0.12, accent());
    cap.position.set(x, 2.05, 0);
    g.add(cap);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 1.2), darkMetal());
    foot.position.set(x, -3, 0);
    g.add(foot);
  }
  // Grip tape bands
  for (const x of [-0.7, 0.7]) {
    const grip = cylinder(0.068, 0.5, accent());
    grip.rotation.z = Math.PI / 2;
    grip.position.set(x, 2, 0);
    g.add(grip);
  }
  return g;
};

const buildParallette = () => {
  const g = new THREE.Group();
  const handle = cylinder(0.07, 1.6, metal());
  handle.rotation.z = Math.PI / 2;
  handle.position.y = 0.55;
  g.add(handle);
  for (const x of [-0.65, 0.65]) {
    // A-frame leg
    for (const s of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.75, 0.08), darkMetal());
      leg.position.set(x, 0.22, s * 0.18);
      leg.rotation.x = s * 0.45;
      g.add(leg);
    }
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.8), accent());
    base.position.set(x, -0.14, 0);
    g.add(base);
  }
  return g;
};

const buildParallettesPair = () => {
  const g = new THREE.Group();
  const a = buildParallette();
  const b = buildParallette();
  a.position.set(0, 0.2, -0.6);
  b.position.set(0, 0.2, 0.6);
  g.add(a, b);
  g.scale.setScalar(1.6);
  return g;
};

const buildDipBars = () => {
  const g = new THREE.Group();
  for (const z of [-0.6, 0.6]) {
    const bar = cylinder(0.065, 3, metal());
    bar.rotation.z = Math.PI / 2;
    bar.position.set(0, 1.2, z);
    g.add(bar);
    for (const x of [-1.3, 1.3]) {
      const post = cylinder(0.09, 3, darkMetal());
      post.position.set(x, -0.3, z);
      g.add(post);
    }
  }
  for (const x of [-1.3, 1.3]) {
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.3), accent());
    brace.position.set(x, -1.6, 0);
    g.add(brace);
  }
  return g;
};

const buildStallBars = () => {
  const g = new THREE.Group();
  for (const x of [-1, 1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.16, 6, 0.16), darkMetal());
    rail.position.x = x;
    g.add(rail);
  }
  for (let i = 0; i < 12; i++) {
    const rung = cylinder(0.045, 2, i === 7 ? accent() : metal(), 16);
    rung.rotation.z = Math.PI / 2;
    rung.position.y = -2.7 + i * 0.48;
    g.add(rung);
  }
  return g;
};

const buildDust = (count: number, span: number) => {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = 5 - Math.random() * (span + 10);
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    speeds[i] = 0.08 + Math.random() * 0.18;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffb27a,
    size: 0.035,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { points: new THREE.Points(geo, mat), positions, speeds };
};

// ─── Scene ───────────────────────────────────────────────────────────────────
/** Mounts the scene into `container` (a fixed full-viewport element); returns cleanup. */
export function startHomeScene(
  container: HTMLElement,
  onReady: () => void,
  { animate = true }: { animate?: boolean } = {},
) {
  // Static mode: no idle animation, redraw only on scroll (reduced motion or phones)
  const reducedMotion =
    !animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmall = window.innerWidth < 640;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // Lights travel with the camera so every station is lit the same way
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.PointLight(ORANGE, 60, 30);
  key.position.set(-4, 2, -5);
  camera.add(key);
  const rim = new THREE.PointLight(ORANGE, 80, 30);
  rim.position.set(4, -1, -14);
  camera.add(rim);
  const top = new THREE.DirectionalLight(0xffffff, 0.9);
  top.position.set(0, 6, 4);
  scene.add(top);

  // Stations down the page: [object, side (-1 left / 1 right / 0 centred)]
  const rings = buildRingsPair(3);
  const stations: [THREE.Object3D, number][] = [
    [rings, 0],
    [buildPullUpBar(), 1],
    [buildParallettesPair(), -1],
    [buildDipBars(), 1],
    [buildStallBars(), -1],
    [buildRingsPair(1.2), 1],
  ];
  stations.forEach(([obj], i) => {
    obj.position.y = -i * SPACING;
    scene.add(obj);
  });
  const span = (stations.length - 1) * SPACING;

  const dust = buildDust(isSmall ? 350 : 900, span);
  scene.add(dust.points);

  // Side stations sit in the page gutters; on narrow screens they peek in from the edges
  let narrow = false;
  const layout = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    narrow = camera.aspect < 0.8;

    // Hero rings frame the headline
    const ringX = narrow ? halfW * 0.98 : Math.min(halfW * 0.62, 4.2);
    rings.children.forEach((r) => (r.position.x = (r.userData.side as number) * ringX));
    rings.position.y = narrow ? -0.4 : 0.35;

    // Visible half-width at the side equipment's depth
    const sideHalfW = halfW * ((camera.position.z - SIDE_DEPTH) / camera.position.z);
    stations.forEach(([obj, side], i) => {
      if (i === 0) return;
      const scale = narrow ? 0.45 : 0.6;
      obj.scale.setScalar(scale * (obj.userData.baseScale ?? 1));
      obj.position.z = SIDE_DEPTH;
      obj.position.x = side * (narrow ? sideHalfW * 0.95 : sideHalfW * 0.74);
    });
    if (reducedMotion) frame();
  };
  stations.forEach(([obj]) => (obj.userData.baseScale = obj.scale.x));

  // Scroll progress → camera depth in the gym
  const scrollTarget = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? -(window.scrollY / max) * span : 0;
  };
  let camY = scrollTarget();

  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 0.8;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const clock = new THREE.Clock();
  function frame() {
    const t = reducedMotion ? 0 : clock.getElapsedTime();

    // Idle motion: rings swing, other stations turn slowly
    stations.forEach(([obj, side], i) => {
      if (obj.userData.kind === "rings") {
        obj.children.forEach((pivot, j) => {
          const s = pivot.userData.side as number;
          pivot.rotation.z = Math.sin(t * 0.7 + j * 1.3 + i) * 0.035;
          (pivot.userData.swing as THREE.Object3D).rotation.y = -s * 0.55 + Math.sin(t * 0.5 + j * 2) * 0.12;
        });
      } else {
        obj.rotation.y = -side * 0.6 + Math.sin(t * 0.25 + i) * 0.25;
        obj.rotation.x = 0.12 + Math.sin(t * 0.3 + i) * 0.04;
      }
    });

    if (!reducedMotion) {
      const pos = dust.positions;
      for (let i = 0; i < dust.speeds.length; i++) {
        pos[i * 3 + 1] += dust.speeds[i] * 0.016;
        pos[i * 3] += Math.sin(t * 0.3 + i) * 0.0015;
        if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -(span + 5);
      }
      dust.points.geometry.attributes.position.needsUpdate = true;
    }

    const target = scrollTarget();
    camY = reducedMotion ? target : camY + (target - camY) * 0.08;
    camera.position.x += (pointer.x - camera.position.x) * 0.04;
    camera.position.y = camY - pointer.y * 0.5;
    camera.lookAt(0, camY, 0);

    renderer.render(scene, camera);
  }

  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(container);

  // Reduced motion: only redraw when the page scrolls
  const onScroll = () => frame();
  if (reducedMotion) {
    window.addEventListener("scroll", onScroll, { passive: true });
  } else {
    renderer.setAnimationLoop(() => {
      if (!document.hidden) frame();
    });
  }
  onReady();

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    ro.disconnect();
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
