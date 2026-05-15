"use client";

import { useMemo } from "react";

interface GridSimulationCanvasProps {
  width?: number;
  height?: number;
  cellSize?: number;
}

/**
 * Lightweight grid simulation scaffold for a future Three.js integration.
 */
export function GridSimulationCanvas({ width = 12, height = 8, cellSize = 28 }: GridSimulationCanvasProps) {
  const cells = useMemo(() => {
    const out: Array<{ x: number; y: number; risk: number }> = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const risk = (Math.sin(x * 0.45) + Math.cos(y * 0.45) + 2) / 4;
        out.push({ x, y, risk });
      }
    }
    return out;
  }, [width, height]);

  return (
    <div aria-label="grid-simulation-canvas" style={{ display: "grid", gridTemplateColumns: `repeat(${width}, ${cellSize}px)`, gap: 3 }}>
      {cells.map((cell) => {
        const alpha = 0.25 + cell.risk * 0.65;
        return (
          <div
            key={`${cell.x}-${cell.y}`}
            title={`(${cell.x},${cell.y}) risk=${cell.risk.toFixed(2)}`}
            style={{ width: cellSize, height: cellSize, backgroundColor: `rgba(239,68,68,${alpha})`, borderRadius: 3 }}
          />
        );
      })}
    </div>
  );
}
