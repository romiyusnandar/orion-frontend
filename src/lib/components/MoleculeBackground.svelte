<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationFrame: number;

  interface Molecule {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
  }

  let molecules: Molecule[] = [];

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    resizeCanvas();
    initMolecules();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initMolecules() {
    molecules = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);

    for (let i = 0; i < count; i++) {
      molecules.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw molecules
    molecules.forEach((molecule) => {
      molecule.x += molecule.vx;
      molecule.y += molecule.vy;

      // Bounce off edges
      if (molecule.x <= 0 || molecule.x >= canvas.width) molecule.vx *= -1;
      if (molecule.y <= 0 || molecule.y >= canvas.height) molecule.vy *= -1;

      // Draw molecule
      ctx.beginPath();
      ctx.arc(molecule.x, molecule.y, molecule.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${molecule.opacity})`;
      ctx.fill();
    });

    // Draw connections
    molecules.forEach((mol1, i) => {
      molecules.slice(i + 1).forEach((mol2) => {
        const dx = mol1.x - mol2.x;
        const dy = mol1.y - mol2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(mol1.x, mol1.y);
          ctx.lineTo(mol2.x, mol2.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 150) * 0.2})`;
          ctx.stroke();
        }
      });
    });

    animationFrame = requestAnimationFrame(animate);
  }
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 z-0 pointer-events-none"
></canvas>