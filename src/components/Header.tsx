import React from "react";
import usePosts from "../hooks/usePosts";
import "../style/App.css";
import calculateRank from "../utils/calculateRank";

const Header: React.FC = () => {
  const { myposts } = usePosts();
  const exp = myposts.reduce((total, post) => total + post.yanis + post.tar, 0);
  const rankInfo = calculateRank(exp);
  const progress = (rankInfo.exp / rankInfo.requiredExp) * 100;
  return (
    <div>
      <p>
        Rank.{rankInfo.rank}: {`<${rankInfo.rankInitial}>`}
        {rankInfo.rankTitle}
      </p>
      <p>次のランクまでの残りタール: {rankInfo.requiredExp - rankInfo.exp}</p>
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
    </div>
  );
};

export default Header;