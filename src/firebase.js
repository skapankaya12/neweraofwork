import { useState, useEffect } from "react";

// ─── Fake live presence — time-aware, EU-timezone weighted ────────────────────
//
// Uses rough CET (UTC+1). Drifts ±1 every 20–45 s to feel alive.
// Goes to 0 after 22:00 EU. Weekends are quieter.

function getRange() {
  const now    = new Date();
  const euHour = (now.getUTCHours() + 1) % 24; // approximate CET
  const isWeekend = [0, 6].includes(now.getUTCDay());

  if (euHour >= 0  && euHour < 6)  return [0, 0];  // dead of night
  if (euHour >= 6  && euHour < 8)  return [0, 1];  // very early
  if (euHour >= 8  && euHour < 10) return isWeekend ? [1, 2] : [2, 4];
  if (euHour >= 10 && euHour < 12) return isWeekend ? [1, 3] : [4, 8];
  if (euHour >= 12 && euHour < 14) return isWeekend ? [1, 3] : [3, 6];  // lunch dip
  if (euHour >= 14 && euHour < 17) return isWeekend ? [2, 4] : [5, 11]; // peak
  if (euHour >= 17 && euHour < 19) return isWeekend ? [1, 3] : [3, 7];
  if (euHour >= 19 && euHour < 21) return [1, 4];
  if (euHour >= 21 && euHour < 22) return [0, 2];
  return [0, 1]; // 22:00–23:59 — mostly 0, occasionally 1
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

export function usePresence() {
  const [count, setCount] = useState(() => {
    const [min, max] = getRange();
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  useEffect(() => {
    let timer;

    const tick = () => {
      setCount(prev => {
        const [min, max] = getRange();
        // Snap back into range if the hour changed while we were idle
        if (prev < min) return min;
        if (prev > max) return max;
        // Otherwise drift ±1 with equal probability
        const delta = Math.random() < 0.5 ? 1 : -1;
        return clamp(prev + delta, min, max);
      });
      // Next drift in 20–45 seconds — irregular feels more human
      timer = setTimeout(tick, 20000 + Math.random() * 25000);
    };

    timer = setTimeout(tick, 20000 + Math.random() * 25000);
    return () => clearTimeout(timer);
  }, []);

  return count;
}
