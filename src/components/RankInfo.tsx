import React from "react";

import calculateRank from "../types/rankCalculator";

const RankPreview: React.FC<{ exp: number }> = ({ exp }) => {
  const rankInfo = calculateRank(exp);
  return (
    <div>
      <p>現在のランク: {rankInfo.rank}</p>
      <p>現在の経験値: {rankInfo.nowExp}</p>
      <p>次のランクまでの必要経験値: {rankInfo.nextExp}</p>
    </div>
  );
};

export default RankPreview;
