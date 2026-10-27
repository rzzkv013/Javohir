"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Cube3D {
  x: number;
  y: number;
  size: number;
  rx: number;
  ry: number;
  rz: number;
  vx: number;
  vy: number;
  vrx: number;
  vry: number;
  vrz: number;
  color: string;
}

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  headChar: string;
  changeRate: number;
  lastChange: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140, // Repulsion influence radius
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize Particles
    const particleColors = ["#38bdf8", "#818cf8", "#34d399", "#60a5fa", "#c084fc"];
    let particles: Particle[] = [];

    // Initialize 3D Rotating Cubes
    let cubes: Cube3D[] = [];

    // Initialize Matrix Drops
    const matrixChars = "01010101<>/{}$_#λ0x7F";
    let drops: MatrixDrop[] = [];

    const initElements = () => {
      // Particles count based on screen area
      const particleCount = Math.min(Math.floor((width * height) / 12000), 85);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          baseX: x,
          baseY: y,
          radius: Math.random() * 2.2 + 1.0,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          alpha: Math.random() * 0.6 + 0.25,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // 3D Cubes (3-5 floating wireframe cubes)
      cubes = [
        {
          x: width * 0.15,
          y: height * 0.25,
          size: 44,
          rx: 0.3,
          ry: 0.5,
          rz: 0,
          vx: 0.12,
          vy: 0.08,
          vrx: 0.007,
          vry: 0.009,
          vrz: 0.004,
          color: "rgba(56, 189, 248, 0.45)",
        },
        {
          x: width * 0.85,
          y: height * 0.35,
          size: 65,
          rx: 0.6,
          ry: 0.2,
          rz: 0.4,
          vx: -0.15,
          vy: 0.06,
          vrx: 0.005,
          vry: 0.008,
          vrz: 0.006,
          color: "rgba(129, 140, 248, 0.4)",
        },
        {
          x: width * 0.5,
          y: height * 0.8,
          size: 50,
          rx: 0.1,
          ry: 0.7,
          rz: 0.3,
          vx: 0.08,
          vy: -0.1,
          vrx: 0.006,
          vry: 0.005,
          vrz: 0.008,
          color: "rgba(52, 211, 153, 0.35)",
        },
      ];

      // Matrix drops
      const colCount = Math.floor(width / 50);
      drops = [];
      for (let i = 0; i < colCount; i++) {
        drops.push({
          x: i * 50 + Math.random() * 20,
          y: Math.random() * -height,
          speed: Math.random() * 1.8 + 1.2,
          chars: [
            matrixChars[Math.floor(Math.random() * matrixChars.length)],
            matrixChars[Math.floor(Math.random() * matrixChars.length)],
            matrixChars[Math.floor(Math.random() * matrixChars.length)],
          ],
          headChar: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          changeRate: 8,
          lastChange: 0,
        });
      }
    };

    initElements();

    // 3D Cube vertices model (-1 to 1)
    const baseCubeVertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    // Edges connecting vertices
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];

    // Main animation loop
    let tick = 0;
    const render = () => {
      tick++;

      // Clear with dark cyber tone #090d16
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw subtle cyber grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.028)";
      ctx.lineWidth = 1;
      const gridSize = 64;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw falling matrix streams
      ctx.font = "11px monospace";
      drops.forEach((drop) => {
        drop.y += drop.speed;
        if (drop.y > height + 80) {
          drop.y = Math.random() * -120;
          drop.x = Math.random() * width;
        }

        // Randomly mutate characters
        if (tick % drop.changeRate === 0) {
          drop.headChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }

        // Draw glowing head
        ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
        ctx.fillText(drop.headChar, drop.x, drop.y);

        // Draw trail chars
        drop.chars.forEach((c, idx) => {
          const trailY = drop.y - (idx + 1) * 14;
          if (trailY > 0) {
            ctx.fillStyle = `rgba(56, 189, 248, ${0.16 / (idx + 1)})`;
            ctx.fillText(c, drop.x, trailY);
          }
        });
      });

      // 3. Draw 3D Rotating Cubes
      cubes.forEach((cube) => {
        // Update cube position & rotation
        cube.x += cube.vx;
        cube.y += cube.vy;
        cube.rx += cube.vrx;
        cube.ry += cube.vry;
        cube.rz += cube.vrz;

        // Bounce within bounds
        if (cube.x < cube.size || cube.x > width - cube.size) cube.vx *= -1;
        if (cube.y < cube.size || cube.y > height - cube.size) cube.vy *= -1;

        // Precompute sines and cosines
        const cosX = Math.cos(cube.rx), sinX = Math.sin(cube.rx);
        const cosY = Math.cos(cube.ry), sinY = Math.sin(cube.ry);
        const cosZ = Math.cos(cube.rz), sinZ = Math.sin(cube.rz);

        // Transform vertices
        const projected = baseCubeVertices.map(([vx, vy, vz]) => {
          // Rotate X
          let y1 = vy * cosX - vz * sinX;
          let z1 = vy * sinX + vz * cosX;
          // Rotate Y
          let x2 = vx * cosY + z1 * sinY;
          let z2 = -vx * sinY + z1 * cosY;
          // Rotate Z
          let x3 = x2 * cosZ - y1 * sinZ;
          let y3 = x2 * sinZ + y1 * cosZ;

          // Weak perspective projection
          const distance = 4;
          const factor = (cube.size * 1.5) / (distance + z2 * 0.4);

          return {
            x: cube.x + x3 * factor,
            y: cube.y + y3 * factor,
            z: z2,
          };
        });

        // Draw edges
        ctx.strokeStyle = cube.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        cubeEdges.forEach(([i, j]) => {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
        });
        ctx.stroke();

        // Draw glowing vertex nodes
        projected.forEach((p) => {
          ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // 4. Update and Draw Particles with Magnetic Mouse Repulsion
      const maxDistance = 115;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // Screen boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Magnetic mouse repulsion
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            const repelStrength = 4.0;
            p.x += Math.cos(angle) * force * repelStrength;
            p.y += Math.sin(angle) * force * repelStrength;
          }
        }

        // Pulse alpha
        const currentAlpha = p.alpha + Math.sin(tick * p.pulseSpeed + p.pulsePhase) * 0.18;
        const clampedAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));

        // Draw particle node
        ctx.fillStyle = p.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = clampedAlpha * 0.18;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw connecting cyber lines between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.26;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ background: "#090d16" }}
      />
      {/* High-tech glassmorphism overlay gradients */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#090d16] to-transparent pointer-events-none" />
    </div>
  );
}
