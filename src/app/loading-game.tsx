"use client";

import React, { useEffect, useRef, useState } from "react";
import { FastForward } from "lucide-react";

interface LoadingGameProps {
  onComplete: () => void;
}

export default function LoadingGame({ onComplete }: LoadingGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const requiredScore = 5;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = "auto";
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let grassTop = height - Math.max(110, height * 0.18);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      grassTop = height - Math.max(110, height * 0.18);
      boy.y = grassTop - 18;
      cat.y = grassTop - 8;
    };
    window.addEventListener("resize", handleResize);

    const targetPos = { x: width / 2 };

    const updatePosition = (clientX: number) => {
      targetPos.x = clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);

    const boy = { x: width / 2, y: grassTop - 18, size: 36 };
    const cat = { x: width / 2 - 45, y: grassTop - 8, size: 24 };
    const sourdoughs: Array<{ x: number; y: number; speed: number; size: number }> = [];

    const clouds = Array.from({ length: 6 }, (_, i) => ({
      x: (width / 6) * i + Math.random() * 80,
      y: 40 + Math.random() * Math.min(160, height * 0.22),
      speed: 0.15 + Math.random() * 0.25,
      scale: 0.7 + Math.random() * 0.8,
    }));

    const spawnInterval = setInterval(() => {
      sourdoughs.push({
        x: Math.random() * (width - 40) + 20,
        y: -30,
        speed: 2.5 + Math.random() * 3,
        size: 28,
      });
    }, 1000);

    function drawBackground() {
      if (!ctx) return;

      const sky = ctx.createLinearGradient(0, 0, 0, grassTop);
      sky.addColorStop(0, "#7ec8f5");
      sky.addColorStop(0.55, "#b8e0f8");
      sky.addColorStop(1, "#dff3c8");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, grassTop);

      for (const cloud of clouds) {
        drawCloud(cloud.x, cloud.y, cloud.scale);
        cloud.x += cloud.speed;
        if (cloud.x - 80 * cloud.scale > width) {
          cloud.x = -100 * cloud.scale;
          cloud.y = 40 + Math.random() * Math.min(160, height * 0.22);
        }
      }

      const grass = ctx.createLinearGradient(0, grassTop, 0, height);
      grass.addColorStop(0, "#7cbc3d");
      grass.addColorStop(0.45, "#5fa32f");
      grass.addColorStop(1, "#3f7a22");
      ctx.fillStyle = grass;
      ctx.fillRect(0, grassTop, width, height - grassTop);

      ctx.fillStyle = "#8fd14a";
      ctx.fillRect(0, grassTop, width, 10);

      ctx.fillStyle = "#4f8f28";
      for (let x = 0; x < width; x += 14) {
        const bladeH = 8 + ((x * 17) % 10);
        const offset = (x * 13) % 5;
        ctx.fillRect(x + offset, grassTop - bladeH + 4, 3, bladeH);
      }
    }

    function drawCloud(x: number, y: number, scale: number) {
      if (!ctx) return;
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      const r = 18 * scale;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.arc(x + r * 1.2, y - r * 0.35, r * 1.15, 0, Math.PI * 2);
      ctx.arc(x + r * 2.4, y, r * 0.95, 0, Math.PI * 2);
      ctx.arc(x + r * 1.1, y + r * 0.35, r * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPixelBoy(x: number, y: number) {
      if (!ctx) return;
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(x - 12, y - 10, 24, 20);

      ctx.fillStyle = "#f5c6aa";
      ctx.fillRect(x - 10, y - 18, 20, 10);

      ctx.fillStyle = "#291d18";
      ctx.fillRect(x - 12, y - 28, 24, 8);
      ctx.fillRect(x - 12, y - 22, 13, 6);
      ctx.fillRect(x + 3, y - 22, 9, 5);

      ctx.fillStyle = "#0284c7";
      ctx.fillRect(x - 10, y + 10, 20, 12);
    }

    let tailAngle = 0;
    function drawAmericanCurlCat(x: number, y: number, deltaX: number, moving: boolean) {
      if (!ctx) return;

      const speedMagnitude = Math.abs(deltaX);
      const isActuallyMoving = moving && speedMagnitude > 0.1;

      // Wiggly / drag tail (drawn behind body)
      if (isActuallyMoving) {
        tailAngle += 0.25;
        const tailWiggle = Math.sin(tailAngle) * 6;
        const tailStretch = Math.min(speedMagnitude * 4, 35);
        const dragDirection = deltaX > 0 ? -1 : 1;

        const tailBaseX = x;
        const tailBaseY = y + 2;
        const controlX = tailBaseX + dragDirection * (12 + tailStretch * 0.6);
        const controlY = tailBaseY - 10 + tailWiggle;
        const tipX = tailBaseX + dragDirection * (18 + tailStretch) + tailWiggle;
        const tipY = tailBaseY - 18;

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(tailBaseX, tailBaseY);
        ctx.quadraticCurveTo(controlX, controlY, tipX, tipY);
        ctx.stroke();

        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(controlX, controlY);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
      } else {
        // Gentle idle wiggle when standing still
        tailAngle += 0.06;
        const idleWiggle = Math.sin(tailAngle) * 4;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x - 8, y + 2);
        ctx.quadraticCurveTo(x - 16, y - 4 + idleWiggle, x - 20 + idleWiggle, y - 12);
        ctx.stroke();
        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x - 16, y - 4 + idleWiggle);
        ctx.lineTo(x - 20 + idleWiggle, y - 12);
        ctx.stroke();
      }

      // White body + head
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 10, y - 8, 20, 16);
      ctx.fillRect(x - 8, y - 18, 16, 10);

      // Brown patches
      ctx.fillStyle = "#78350f";
      ctx.fillRect(x - 4, y - 6, 8, 10);
      ctx.fillRect(x - 6, y - 18, 5, 5);

      // Grey patches
      ctx.fillStyle = "#78716c";
      ctx.fillRect(x - 2, y - 4, 4, 6);
      ctx.fillRect(x + 3, y - 8, 4, 8);
      ctx.fillRect(x + 2, y - 16, 4, 4);

      // American Curl ears
      ctx.fillStyle = "#fecdd3";
      ctx.fillRect(x - 10, y - 22, 4, 6);
      ctx.fillRect(x + 6, y - 22, 4, 6);
      ctx.fillStyle = "#78350f";
      ctx.fillRect(x - 12, y - 24, 3, 4);
      ctx.fillRect(x + 9, y - 24, 3, 4);

      // Eyes
      ctx.fillStyle = "#eab308";
      ctx.fillRect(x - 5, y - 14, 3, 3);
      ctx.fillRect(x + 2, y - 14, 3, 3);
    }

    function drawSourdough(x: number, y: number, size: number) {
      if (!ctx) return;
      ctx.fillStyle = "#d97706";
      ctx.beginPath();
      ctx.ellipse(x, y, size / 1.5, size / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#fef3c7";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 6, y - 2);
      ctx.lineTo(x + 6, y + 2);
      ctx.stroke();
    }

    let animationId: number;
    let currentScore = 0;
    let prevCatX = cat.x;

    function update() {
      if (!ctx) return;

      const speed = Math.abs(targetPos.x - boy.x);
      boy.x += (targetPos.x - boy.x) * 0.15;
      cat.x += (boy.x - 45 - cat.x) * 0.08;

      const deltaCatX = cat.x - prevCatX;
      prevCatX = cat.x;

      drawBackground();

      drawAmericanCurlCat(cat.x, cat.y, deltaCatX, speed > 0.5);
      drawPixelBoy(boy.x, boy.y);

      for (let i = sourdoughs.length - 1; i >= 0; i--) {
        const s = sourdoughs[i];
        s.y += s.speed;
        drawSourdough(s.x, s.y, s.size);

        const dist = Math.hypot(boy.x - s.x, boy.y - s.y);
        if (dist < boy.size) {
          sourdoughs.splice(i, 1);
          currentScore += 1;
          setScore(currentScore);

          if (currentScore >= requiredScore) {
            setTimeout(onComplete, 400);
            return;
          }
        } else if (s.y > grassTop + 20) {
          sourdoughs.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(update);
    }

    update();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (canvas) {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchmove", handleTouchMove);
      }
      clearInterval(spawnInterval);
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-sky-300 text-stone-800 flex flex-col items-center overflow-hidden font-mono select-none touch-none h-[100dvh] w-screen"
      style={{ touchAction: "none" }}
    >
      <div className="absolute top-6 inset-x-0 px-6 flex items-center justify-between z-20 pointer-events-auto">
        <div className="w-24 hidden sm:block"></div>

        <div className="text-center space-y-1 mx-auto">
          <h1 className="text-xl md:text-2xl font-extrabold text-amber-700 tracking-wide font-mono drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
            Catch the Sourdough! 🥖
          </h1>
          <div className="text-xs text-stone-700 font-bold font-mono">
            Caught: {score} / {requiredScore}
          </div>
        </div>

        <button
          onClick={onComplete}
          className="flex items-center space-x-1.5 bg-white/85 hover:bg-white text-stone-700 border border-stone-300/80 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold backdrop-blur-md transition shadow-lg active:scale-95 shrink-0"
        >
          <span>Skip Game</span>
          <FastForward className="w-3.5 h-3.5 text-amber-900" />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 cursor-none touch-none"
      />
    </div>
  );
}
