import * as React from "react";
import { cn } from "@/lib/utils";

export type FlagCode =
  | "ru"
  | "tj"
  | "gb"
  | "us"
  | "kz"
  | "uz"
  | "kg"
  | "ua";

const flagNames: Record<FlagCode, string> = {
  ru: "Russia",
  tj: "Tajikistan",
  gb: "United Kingdom",
  us: "United States",
  kz: "Kazakhstan",
  uz: "Uzbekistan",
  kg: "Kyrgyzstan",
  ua: "Ukraine",
};

// All paintings draw inside a 60×40 viewbox (3:2 aspect)
const flagPaintings: Record<
  FlagCode,
  (clipId: string) => React.ReactElement
> = {
  ru: () => (
    <>
      <rect width="60" height="13.33" y="0" fill="#FFFFFF" />
      <rect width="60" height="13.33" y="13.33" fill="#0039A6" />
      <rect width="60" height="13.34" y="26.66" fill="#D52B1E" />
    </>
  ),
  tj: () => (
    <>
      <rect width="60" height="9" y="0" fill="#CC0000" />
      <rect width="60" height="22" y="9" fill="#FFFFFF" />
      <rect width="60" height="9" y="31" fill="#006600" />
      {/* simplified gold crown emblem on the white band */}
      <g transform="translate(30 20)" fill="none" stroke="#F8C300" strokeWidth="0.6">
        <path d="M-3.5,2 L-3.5,-1 L-2,-2 L-1,0 L0,-3 L1,0 L2,-2 L3.5,-1 L3.5,2 Z" fill="#F8C300" />
      </g>
    </>
  ),
  gb: (clipId) => (
    <>
      <defs>
        <clipPath id={clipId}>
          <path d="M30,20 L60,0 L60,20 L30,20 L60,40 L60,40 L30,20 L0,40 L0,40 L30,20 L0,0 L0,0 Z" />
        </clipPath>
      </defs>
      <rect width="60" height="40" fill="#012169" />
      {/* white diagonals */}
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
      {/* red diagonals (clipped) */}
      <path
        d="M0,0 L60,40 M60,0 L0,40"
        clipPath={`url(#${clipId})`}
        stroke="#C8102E"
        strokeWidth="5"
      />
      {/* white cross */}
      <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="13" />
      {/* red cross */}
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
    </>
  ),
  us: () => (
    <>
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          y={(i * 40) / 13}
          width="60"
          height={40 / 13}
          fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect width="24" height={(7 * 40) / 13} fill="#3C3B6E" />
      {/* simplified star pattern */}
      {Array.from({ length: 5 }).flatMap((_, row) =>
        Array.from({ length: 6 - (row % 2) }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={2 + col * 4 + (row % 2) * 2}
            cy={2 + row * 4}
            r="0.8"
            fill="#FFFFFF"
          />
        ))
      )}
    </>
  ),
  kz: () => (
    <>
      <rect width="60" height="40" fill="#00ABC9" />
      <circle cx="30" cy="20" r="6" fill="#FFCD00" />
      {/* simplified rays */}
      <g stroke="#FFCD00" strokeWidth="0.8">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          const x1 = 30 + Math.cos(a) * 7;
          const y1 = 20 + Math.sin(a) * 7;
          const x2 = 30 + Math.cos(a) * 9.5;
          const y2 = 20 + Math.sin(a) * 9.5;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </>
  ),
  uz: () => (
    <>
      <rect width="60" height="13.33" y="0" fill="#0099B5" />
      <rect width="60" height="13.34" y="13.33" fill="#FFFFFF" />
      <rect width="60" height="13.33" y="26.67" fill="#1EB53A" />
      <rect width="60" height="0.7" y="12.7" fill="#CE1126" />
      <rect width="60" height="0.7" y="26.6" fill="#CE1126" />
    </>
  ),
  kg: () => (
    <>
      <rect width="60" height="40" fill="#E8112D" />
      <circle cx="30" cy="20" r="6.5" fill="#FFEF00" />
      <circle cx="30" cy="20" r="3" fill="none" stroke="#E8112D" strokeWidth="0.6" />
      <g stroke="#FFEF00" strokeWidth="0.6">
        {Array.from({ length: 20 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 20;
          const x1 = 30 + Math.cos(a) * 7;
          const y1 = 20 + Math.sin(a) * 7;
          const x2 = 30 + Math.cos(a) * 9;
          const y2 = 20 + Math.sin(a) * 9;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </>
  ),
  ua: () => (
    <>
      <rect width="60" height="20" y="0" fill="#005BBB" />
      <rect width="60" height="20" y="20" fill="#FFD500" />
    </>
  ),
};

export interface FlagProps extends React.SVGAttributes<SVGSVGElement> {
  code: FlagCode;
}

export const Flag = React.forwardRef<SVGSVGElement, FlagProps>(
  ({ code, className, ...props }, ref) => {
    const reactId = React.useId();
    const clipId = `flag-${code}-${reactId.replace(/:/g, "")}`;
    const paint = flagPaintings[code];
    return (
      <svg
        ref={ref}
        viewBox="0 0 60 40"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${flagNames[code]} flag`}
        className={cn(
          "inline-block shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10",
          className
        )}
        {...props}
      >
        {paint(clipId)}
      </svg>
    );
  }
);
Flag.displayName = "Flag";
