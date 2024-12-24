"use client";

import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearBuffer() {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}
