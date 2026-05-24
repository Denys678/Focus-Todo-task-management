import { useEffect, useState } from "react";

export function useTimer(initialTime = 60) {
  const [count, setCount] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (count === 0) {
      setIsRunning(false);
    }
  }, [count]);

  useEffect(() => {
    let id;

    if (isRunning) {
      id = setInterval(() => {
        setCount((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCount(initialTime);
  };

  const selectTimer = (seconds) => {
    setIsRunning(false);
    setCount(seconds);
  };

  return {count, isRunning, startTimer, stopTimer, resetTimer, selectTimer,};
}