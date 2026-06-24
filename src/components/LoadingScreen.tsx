"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingScreen({ message = "Loading…", fullScreen = false }: LoadingScreenProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 420);
    return () => clearInterval(t);
  }, []);

  const dotStr = ".".repeat(dots);

  const inner = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
    }}>
      {/* PCJ Logo mark */}
      <div style={{ position: "relative" }}>
        <div style={{
          width: 64, height: 64,
          background: "var(--accent)",
          borderRadius: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 40px rgba(99,102,241,0.45), 0 0 0 1px rgba(99,102,241,0.3)",
          animation: "pcj-pulse 1.8s ease-in-out infinite",
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 8h8a4 4 0 0 1 0 8H8V8z" fill="white" opacity="0.95"/>
            <path d="M8 16h6l5 8H8v-8z" fill="white" opacity="0.6"/>
            <rect x="20" y="16" width="4" height="8" rx="1" fill="white" opacity="0.8"/>
          </svg>
        </div>
        {/* Spinning ring */}
        <div style={{
          position: "absolute",
          inset: -6,
          borderRadius: 24,
          border: "2px solid transparent",
          borderTopColor: "var(--accent)",
          borderRightColor: "rgba(99,102,241,0.3)",
          animation: "pcj-spin 1s linear infinite",
        }} />
      </div>

      {/* Brand name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "1.1rem",
          letterSpacing: "-0.5px",
          color: "var(--text)",
        }}>
          PCJ<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "2px",
          color: "var(--text-dim)",
          textTransform: "uppercase",
          minWidth: 140,
          textAlign: "center",
        }}>
          {message}{dotStr}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 140,
        height: 3,
        background: "var(--surface-2)",
        borderRadius: 99,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "var(--accent)",
          borderRadius: 99,
          animation: "pcj-progress 1.4s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes pcj-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(99,102,241,0.45); }
          50% { transform: scale(1.04); box-shadow: 0 0 56px rgba(99,102,241,0.65); }
        }
        @keyframes pcj-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pcj-progress {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 0; }
          100% { width: 0%; margin-left: 140px; }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}>
        {inner}
      </div>
    );
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: 280, width: "100%",
    }}>
      {inner}
    </div>
  );
}
