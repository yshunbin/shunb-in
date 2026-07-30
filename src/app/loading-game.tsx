"use client";

import React, { useEffect, useRef, useState } from "react";

interface LoadingGameProps {
  onComplete: () => void;
}

export default function LoadingGame({ onComplete }: LoadingGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const requiredScore = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const targetPos = { x: width / 2 };
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    const updatePosition = (clientX: number) => {
      targetPos.x = clientX;
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 150);
    };

    // Pointer event for desktop
    const handlePointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX);
    };

    // Touch events with preventDefault to block mobile swipe-navigation & pull-to-refresh
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    const boy = { x: width / 2, y: height - 80, size: 36 };
    const cat = { x: width / 2 - 45, y: height - 70, size: 24 };
    const sourdoughs: Array<{ x: number; y: number; speed: number; size: number }> = [];
    const poops: Array<{ x: number; y: number; size: number }> = [];

    const spawnInterval = setInterval(() => {
      sourdoughs.push({
        x: Math.random() * (width - 40) + 20,
        y: -30,
        speed: 2.5 + Math.random() * 3,
        size: 28,
      });
    }, 1000);

    // Render Boy
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

    // Render Cat Poop
    function drawPoop(x: number, y: number) {
      if (!ctx) return;
      ctx.fillStyle = "#5c3a21";
      ctx.fillRect(x - 4, y + 2, 8, 4);
      ctx.fillRect(x - 2, y - 1, 4, 3);
      ctx.fillRect(x - 1, y - 3, 2, 2);
    }

    // Render Tabby American Curl Cat
    let tailAngle = 0;
    function drawAmericanCurlCat(x: number, y: number, deltaX: number, moving: boolean) {
      if (!ctx) return;

      const speedMagnitude = Math.abs(deltaX);
      const isActuallyMoving = moving && speedMagnitude > 0.1;

      if (isActuallyMoving && Math.random() < 0.008 && poops.length < 15) {
        poops.push({ x: x, y: y + 8, size: 6 });
      }

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
      }

      ctx.fillStyle = "#ffffff"; 
      ctx.fillRect(x - 10, y - 8, 20, 16);
      ctx.fillRect(x - 8, y - 18, 16, 10);

      if (!isActuallyMoving) {
        ctx.fillStyle = "#78350f";
        ctx.fillRect(x - 2, y - 12, 4, 5); 
      }

      ctx.fillStyle = "#78350f"; 
      ctx.fillRect(x - 4, y - 6, 8, 10);
      ctx.fillRect(x - 6, y - 18, 5, 5); 

      ctx.fillStyle = "#1c1917"; 
      ctx.fillRect(x - 2, y - 4, 4, 6);
      ctx.fillRect(x + 3, y - 8, 4, 8);

      ctx.fillStyle = "#fecdd3"; 
      ctx.fillRect(x - 10, y - 22, 4, 6);
      ctx.fillRect(x + 6, y - 22, 4, 6);
      ctx.fillStyle = "#78350f"; 
      ctx.fillRect(x - 12, y - 24, 3, 4);
      ctx.fillRect(x + 9, y - 24, 3, 4);

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
      
      const catTargetX = boy.x - 45;
      cat.x += (catTargetX - cat.x) * 0.08;

      const deltaCatX = cat.x - prevCatX;
      prevCatX = cat.x;

      ctx.clearRect(0, 0, width, height);

      for (const p of poops) {
        drawPoop(p.x, p.y);
      }

      drawAmericanCurlCat(cat.x, cat.y, deltaCatX, speed > 0.5 || isMoving);
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
            setTimeout(onComplete, 800);
            return;
          }
        } else if (s.y > height + 20) {
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
    className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col items-center select-none overflow-hidden touch-none overscroll-none"
    style={{ touchAction: "none", position: "fixed", width: "100vw", height: "100vh" }}
    >
      <div className="absolute top-8 text-center space-y-2 z-10 pointer-events-none">
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-400">
          Catch the Sourdough! 🥖
        </h1>
        <p className="text-xs md:text-sm text-slate-400">
          Move your finger or cursor to catch 5 loaves to enter!
        </p>
        <div className="inline-block bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-base md:text-lg">
          Caught: <span className="text-amber-400 font-bold">{score}</span> / {requiredScore}
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 cursor-none touch-none" 
        style={{ touchAction: "none" }}
      />
    </div>
  );
}