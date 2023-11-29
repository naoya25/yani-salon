import React, { useEffect, useState } from "react";

const YaniImage: React.FC<{ height: number; width: number }> = ({
  height,
  width,
}) => {
  const [offsetY, setOffsetY] = useState<number>(30);
  const [increasing, setIncreasing] = useState<boolean>(true);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setOffsetY((prevOffsetY) => {
        const nextOffsetY = increasing ? prevOffsetY + 1 : prevOffsetY - 1;
        const shouldToggle =
          (increasing && nextOffsetY >= 80) ||
          (!increasing && nextOffsetY <= 30);
        if (shouldToggle) {
          setIncreasing(!increasing);
        }
        return shouldToggle ? prevOffsetY : nextOffsetY;
      });
    }, 50);

    return () => clearInterval(animationInterval);
  }, [increasing]);

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height: 100,
          width: 200,
          position: "absolute",
          top: 80,
          left: -5,
          transform: "rotate(-90deg)",
        }}
      >
        <path
          d={`M0 50 C40 ${offsetY + 20 * Math.sin((offsetY + 10) / 10) - 20},
          60 ${offsetY + 20 * Math.sin((offsetY + 20) / 10) + 20},
          90 ${offsetY + 20 * Math.sin((offsetY + 30) / 10)}
          S140 ${offsetY + 20 * Math.sin((offsetY + 40) / 10) - 20},
          200 ${offsetY + 20 * Math.sin((offsetY + 50) / 10)}`}
          style={{ stroke: "rgba(170, 170, 170, 0.5)", fill: "transparent" }}
        />
      </svg>
      <img
        src="/rankimages/001.png"
        style={{
          height: height,
          width: "auto",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default YaniImage;
