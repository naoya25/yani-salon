import React from "react";

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      className="progress-bar-container"
      style={{
        width: "80%",
        height: 20,
        margin: "auto",
        backgroundColor: "#eee",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#4caf50",
          transition: "width 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <span
          className="progress-label"
          style={{
            marginRight: 5,
            color: "#fff",
          }}
        >{`${Math.round(progress)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
