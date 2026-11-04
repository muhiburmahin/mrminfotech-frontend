"use client";

import React, { useEffect, useRef, useState } from "react";

interface FunnyCharactersProps {
  isFocusedEmail: boolean;
  isFocusedPassword: boolean;
  showPassword: boolean;
  hasError?: boolean;
}

export function FunnyLoginCharacters({
  isFocusedEmail,
  isFocusedPassword,
  showPassword,
  hasError = false,
}: FunnyCharactersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize movement between -1 and 1
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

      setMouseOffset({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Determine where the characters should look
  // 1. If password is hidden & focused -> look far left (away from the form)
  // 2. If showPassword is true -> peek toward the right (form side)
  // 3. If email is focused -> lean and look toward the right (form side)
  // 4. Otherwise -> follow mouse cursor smoothly
  const isLookingAway = isFocusedPassword && !showPassword;
  const isPeeking = showPassword;

  const eyeX = isLookingAway
    ? -10
    : isPeeking
    ? 8
    : isFocusedEmail
    ? 9
    : mouseOffset.x * 10;

  const eyeY = isLookingAway
    ? -4
    : isPeeking
    ? 2
    : isFocusedEmail
    ? -2
    : mouseOffset.y * 8;

  const bodyTilt = isLookingAway
    ? -6
    : isFocusedEmail || isPeeking
    ? 5
    : mouseOffset.x * 5;

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[420px] w-full items-end justify-center overflow-hidden rounded-3xl bg-[#0D0D11] p-6 shadow-2xl select-none border border-white/10"
    >
      {/* Subtle Top Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#087FC4]/15 blur-[90px]"
      />

      {/* Status Speech Pill */}
      <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
        <span
          className={`h-2 w-2 rounded-full ${
            hasError
              ? "bg-rose-500 animate-ping"
              : isLookingAway
              ? "bg-amber-400"
              : "bg-[#20B8D5]"
          }`}
        />
        <span>
          {hasError
            ? "Oops! Wrong credentials!"
            : isLookingAway
            ? "We aren't looking at your password!"
            : isPeeking
            ? "Hehe, peeking at your password..."
            : isFocusedEmail
            ? "Checking your admin email..."
            : "Waiting for Admin Sign In"}
        </span>
      </div>

      {/* Animated SVG Characters Group */}
      <svg
        viewBox="0 0 420 380"
        className="w-full max-w-[390px] h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ============================================================
            1. TALL BLUE RECTANGLE CHARACTER (Back Left)
           ============================================================ */}
        <g
          style={{
            transform: `translateX(${bodyTilt * 1.2}px) rotate(${bodyTilt * 0.5}deg)`,
            transformOrigin: "145px 360px",
            transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect
            x="90"
            y="70"
            width="115"
            height="290"
            rx="14"
            fill="#2B36D9"
          />
          {/* Eyes & Mouth */}
          <g
            style={{
              transform: `translate(${eyeX * 1.1}px, ${eyeY * 1.1}px)`,
              transition: "transform 120ms ease-out",
            }}
          >
            {/* Left Eye */}
            <circle cx="132" cy="128" r="8" fill="#FFFFFF" />
            <circle
              cx={132 + (isLookingAway ? -3 : 2)}
              cy={128 + (isLookingAway ? -2 : 1)}
              r="4"
              fill="#0D0D11"
            />
            {/* Right Eye */}
            <circle cx="168" cy="128" r="8" fill="#FFFFFF" />
            <circle
              cx={168 + (isLookingAway ? -3 : 2)}
              cy={128 + (isLookingAway ? -2 : 1)}
              r="4"
              fill="#0D0D11"
            />
            {/* Mouth */}
            {hasError ? (
              <path
                d="M142 152 Q150 144 158 152"
                stroke="#0D0D11"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : (
              <rect x="143" y="146" width="14" height="5" rx="2.5" fill="#0D0D11" />
            )}
          </g>
        </g>

        {/* ============================================================
            2. RED TALL CHARACTER (Middle Center-Right)
           ============================================================ */}
        <g
          style={{
            transform: `translateX(${bodyTilt * 1.6}px) rotate(${bodyTilt * 0.7}deg)`,
            transformOrigin: "235px 360px",
            transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect
            x="190"
            y="145"
            width="86"
            height="215"
            rx="12"
            fill="#F04438"
          />
          <g
            style={{
              transform: `translate(${eyeX * 1.25}px, ${eyeY * 1.2}px)`,
              transition: "transform 120ms ease-out",
            }}
          >
            <circle cx="220" cy="190" r="6.5" fill="#FFFFFF" />
            <circle
              cx={220 + (isLookingAway ? -2.5 : 2)}
              cy={190}
              r="3.2"
              fill="#0D0D11"
            />

            <circle cx="246" cy="190" r="6.5" fill="#FFFFFF" />
            <circle
              cx={246 + (isLookingAway ? -2.5 : 2)}
              cy={190}
              r="3.2"
              fill="#0D0D11"
            />

            {/* Cute Small Mouth */}
            <circle
              cx="233"
              cy="208"
              r={isPeeking ? 4.5 : 3}
              fill="#0D0D11"
            />
          </g>
        </g>

        {/* ============================================================
            3. ORANGE DOME CHARACTER (Front Left)
           ============================================================ */}
        <g
          style={{
            transform: `translateX(${bodyTilt * 0.9}px)`,
            transformOrigin: "120px 360px",
            transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <path
            d="M45 280 C45 215, 195 215, 195 280 L195 360 L45 360 Z"
            fill="#F4886A"
          />
          <g
            style={{
              transform: `translate(${eyeX * 0.9}px, ${eyeY * 0.9}px)`,
              transition: "transform 120ms ease-out",
            }}
          >
            {/* Blinking / Closed eyes when password is hidden */}
            {isLookingAway ? (
              <>
                <path
                  d="M95 275 Q102 282 109 275"
                  stroke="#0D0D11"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M135 275 Q142 282 149 275"
                  stroke="#0D0D11"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <circle cx="102" cy="274" r="5" fill="#0D0D11" />
                <circle cx="142" cy="274" r="5" fill="#0D0D11" />
              </>
            )}
            <path
              d="M116 292 Q122 298 128 292"
              stroke="#0D0D11"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ============================================================
            4. WHITE ROUNDED GHOST/BLOB CHARACTER (Front Right)
           ============================================================ */}
        <g
          style={{
            transform: `translateX(${bodyTilt * 1.4}px) rotate(${bodyTilt * 0.6}deg)`,
            transformOrigin: "295px 360px",
            transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <path
            d="M245 235 C245 185, 345 185, 345 235 L345 360 L245 360 Z"
            fill="#F4F5F7"
          />
          <g
            style={{
              transform: `translate(${eyeX * 1.15}px, ${eyeY * 1.15}px)`,
              transition: "transform 120ms ease-out",
            }}
          >
            <circle cx="282" cy="242" r="5" fill="#0D0D11" />
            <circle cx="314" cy="242" r="5" fill="#0D0D11" />
            {/* Straight Line Nose/Mouth like in the video */}
            <rect
              x="292"
              y="256"
              width="22"
              height="4.5"
              rx="2.25"
              fill="#0D0D11"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

