import React, { useMemo } from 'react';

interface FloatingPetalsProps {
  isBloomed: boolean;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ isBloomed }) => {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8) % 96 + 2}%`,
      delay: `${(i * 1.3) % 12}s`,
      duration: `${14 + (i % 7) * 2}s`,
      size: `${14 + (i % 5) * 4}px`,
      color: i % 3 === 0 ? '#FFB7C5' : i % 3 === 1 ? '#FFD1DC' : '#FFE4E1',
      rotate: (i * 45) % 360,
    }));
  }, []);

  if (!isBloomed) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-0"
          style={{
            left: petal.left,
            top: '-30px',
            animation: `gentleDrift ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 30 30"
            fill="none"
            style={{ transform: `rotate(${petal.rotate}deg)` }}
          >
            <path
              d="M15 0C15 0 25 8 25 18C25 24 20 30 15 30C10 30 5 24 5 18C5 8 15 0 15 0Z"
              fill={petal.color}
              fillOpacity="0.65"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
