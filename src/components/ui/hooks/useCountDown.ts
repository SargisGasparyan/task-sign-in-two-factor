import { useState, useEffect, useCallback } from "react";

export const useCountdown = (initialSeconds: number) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isZero, setIsZero] = useState(false);

  const reset = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsZero(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsZero(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return { secondsLeft, formattedTime: formatTime(secondsLeft), reset, isZero };
};
