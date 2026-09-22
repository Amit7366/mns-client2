"use client";

import { useMemo } from "react";
import type { SpinWheelSegment } from "@/lib/spin-api";

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RIM = 148;
const BULB_COUNT = 18;

type PrizeIcon = "phone" | "coins" | "trophy" | "bag";

const ICONS: PrizeIcon[] = [
  "phone",
  "coins",
  "coins",
  "trophy",
  "coins",
  "bag",
  "coins",
  "phone",
  "trophy",
  "coins",
];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

function PrizeGlyph({ kind, x, y, angle }: { kind: PrizeIcon; x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      {kind === "phone" ? (
        <>
          <rect x="-6" y="-9" width="12" height="18" rx="2" fill="#2b2b2b" />
          <rect x="-4.5" y="-7" width="9" height="12" rx="0.6" fill="#7ec8ff" />
          <circle cx="0" cy="6.4" r="0.8" fill="#ddd" />
        </>
      ) : null}
      {kind === "coins" ? (
        <>
          <ellipse cx="0" cy="4" rx="7" ry="3.2" fill="#e8a317" />
          <ellipse cx="0" cy="1.2" rx="7" ry="3.2" fill="#f6d365" />
          <ellipse cx="0" cy="-1.6" rx="7" ry="3.2" fill="#ffe08a" stroke="#c4840d" strokeWidth="0.6" />
        </>
      ) : null}
      {kind === "trophy" ? (
        <>
          <path d="M-6 -6h12v4c0 3.4-2.6 6-6 6s-6-2.6-6-6z" fill="#f5c518" stroke="#a16207" strokeWidth="0.6" />
          <path d="M-6 -5h-3.2c0 3 1.4 5 3.2 5.4M6 -5h3.2c0 3-1.4 5-3.2 5.4" stroke="#f5c518" strokeWidth="1.4" fill="none" />
          <rect x="-1.2" y="4" width="2.4" height="3" fill="#d4a017" />
          <rect x="-3.4" y="6.6" width="6.8" height="1.8" rx="0.4" fill="#e8b923" />
        </>
      ) : null}
      {kind === "bag" ? (
        <>
          <path d="M-6 2c0-5 2.4-8 6-8s6 3 6 8v6c0 1.4-1 2.4-2.4 2.4h-7.2C-5 10.4-6 9.4-6 8z" fill="#c45c08" />
          <path d="M-3.2 -4c0-2.4 1.4-4 3.2-4s3.2 1.6 3.2 4" stroke="#f6d365" strokeWidth="1.3" fill="none" />
          <circle cx="0" cy="2" r="1.5" fill="#ffe08a" />
        </>
      ) : null}
    </g>
  );
}

export function computeSpinRotation(
  segmentIndex: number,
  currentRotation: number,
  segmentCount: number,
  extraSpins = 6
): number {
  const segmentAngle = 360 / segmentCount;
  const segmentCenter = segmentIndex * segmentAngle + segmentAngle / 2;
  const targetMod = (360 - segmentCenter + 360) % 360;
  const currentMod = ((currentRotation % 360) + 360) % 360;
  let delta = targetMod - currentMod;
  if (delta <= 0) delta += 360;
  return currentRotation + extraSpins * 360 + delta;
}

type SpinWheelDiscProps = {
  segments: SpinWheelSegment[];
  rotation: number;
  spinning: boolean;
  canSpin: boolean;
  goLabel: string;
  onSpin: () => void;
};

export default function SpinWheelDisc({
  segments,
  rotation,
  spinning,
  canSpin,
  goLabel,
  onSpin,
}: SpinWheelDiscProps) {
  const count = segments.length || 10;
  const segmentAngle = 360 / count;

  const wedges = useMemo(() => {
    return segments.map((seg, i) => {
      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;
      const mid = start + segmentAngle / 2;
      const iconPos = polar(CX, CY, 108, mid);
      const labelPos = polar(CX, CY, 78, mid);
      return {
        ...seg,
        path: describeArc(CX, CY, RIM, start, end),
        iconPos,
        labelPos,
        mid,
        icon: ICONS[i % ICONS.length],
        label: `৳${seg.amount}`,
        fill: i % 2 === 0 ? "#fffdf8" : "#fff4dc",
      };
    });
  }, [segments, segmentAngle]);

  const bulbs = useMemo(() => {
    return Array.from({ length: BULB_COUNT }, (_, i) => {
      const angle = (360 / BULB_COUNT) * i;
      const pos = polar(50, 50, 46.2, angle);
      return { i, left: `${pos.x}%`, top: `${pos.y}%`, dim: i % 2 === 1 };
    });
  }, []);

  const transition =
    spinning ? "transform 4.8s cubic-bezier(0.15, 0.85, 0.2, 1)" : "transform 0.15s ease-out";

  return (
    <div className="spin-prize">
      <div className="spin-prize-fire" aria-hidden />
      <div className="spin-prize-frame">
        {bulbs.map((bulb) => (
          <span
            key={bulb.i}
            className={`spin-prize-bulb ${bulb.dim ? "is-dim" : "is-bright"}`}
            style={{ left: bulb.left, top: bulb.top, animationDelay: `${bulb.i * 0.08}s` }}
          />
        ))}
        <div className="spin-prize-well">
          <div
            className="spin-prize-rotor"
            style={{ transform: `rotate(${rotation}deg)`, transition }}
          >
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" aria-hidden>
              {wedges.map((wedge) => (
                <g key={wedge.index}>
                  <path d={wedge.path} fill={wedge.fill} stroke="#f0c56a" strokeWidth="1.2" />
                  <PrizeGlyph
                    kind={wedge.icon}
                    x={wedge.iconPos.x}
                    y={wedge.iconPos.y}
                    angle={wedge.mid}
                  />
                  <text
                    x={wedge.labelPos.x}
                    y={wedge.labelPos.y}
                    fill="#7c2d12"
                    fontSize="13"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${wedge.mid} ${wedge.labelPos.x} ${wedge.labelPos.y})`}
                  >
                    {wedge.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
        <div className="spin-prize-pointer" aria-hidden />
        <button
          type="button"
          className="spin-prize-go"
          onClick={onSpin}
          disabled={!canSpin || spinning}
          aria-label={goLabel}
        >
          {goLabel}
        </button>
      </div>
    </div>
  );
}
