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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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

    const boy = { x: width / 2, y: height - 80, size: 36 };
    const cat = { x: width / 2 - 45, y: height - 70, size: 24 };
    const sourdoughs: Array<{ x: number; y: number; speed: number; size: number }> = [];

    const spawnInterval = setInterval(() => {
      sourdoughs.push({
        x: Math.random() * (width - 40) + 20,
        y: -30,
        speed: 2.5 + Math.random() * 3,
        size: 28,
      });
    }, 1000);

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

    function drawAmericanCurlCat(x: number, y: number) {
      if (!ctx) return;
      ctx.fillStyle = "#ffffff"; 
      ctx.fillRect(x - 10, y - 8, 20, 16);
      ctx.fillRect(x - 8, y - 18, 16, 10);
      ctx.fillStyle = "#78350f"; 
      ctx.fillRect(x - 4, y - 6, 8, 10);
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

    function update() {
      if (!ctx) return;
      
      boy.x += (targetPos.x - boy.x) * 0.15;
      cat.x += (boy.x - 45 - cat.x) * 0.08;

      ctx.clearRect(0, 0, width, height);

      drawAmericanCurlCat(cat.x, cat.y);
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
      className="fixed inset-0 z-[9999] bg-slate-950 text-slate-100 flex flex-col items-center overflow-hidden font-mono select-none touch-none h-[100dvh] w-screen"
      style={{ touchAction: "none" }}
    >
      {/* Absolute Header Layout for Centered Text & Right-aligned Skip Button */}
      <div className="absolute top-6 inset-x-0 px-6 flex items-center justify-between z-20 pointer-events-auto">
        {/* Empty left placeholder to perfectly balance the right button */}
        <div className="w-24 hidden sm:block"></div>

        {/* Centered Game Title & Score */}
        <div className="text-center space-y-1 mx-auto">
          <h1 className="text-xl md:text-2xl font-extrabold text-amber-400 tracking-wide font-mono">
            Catch the Sourdough! 🥖
          </h1>
          <div className="text-xs text-slate-300 font-bold font-mono">
            Caught: {score} / {requiredScore}
          </div>
        </div>

        {/* Right-Aligned Skip Button */}
        <button
          onClick={onComplete}
          className="flex items-center space-x-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-sans font-semibold backdrop-blur-md transition shadow-lg active:scale-95 shrink-0"
        >
          <span>Skip Game</span>
          <FastForward className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 cursor-none touch-none" 
      />
    </div>
  );
}