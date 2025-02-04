import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStopwatchStore from "../store/store";

const Stopwatch = () => {
  const { time, isRunning, stop, increment, reset, start } =
    useStopwatchStore();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      timer = setInterval(increment, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, increment]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4">Stopwatch</h1>
      <motion.p
        className="text-4xl font-mono mb-4"
        animate={{ scale: isRunning ? 1.1 : 1 }}
      >
        {formatTime(time)}
      </motion.p>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Stop
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
};

export default Stopwatch;
