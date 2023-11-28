import { rankTitles } from "../constants/rankTitles";

interface RankInfo {
  rank: number;
  exp: number;
  requiredExp: number;
  rankTitle: string;
  rankInitial: string;
}

const calculateRank = (
  exp: number,
  rank: number = 1,
  baseExp: number = 30,
  expMultiplier: number = 1.1
): RankInfo => {
  const requiredExp: number = Math.floor(
    baseExp * Math.pow(expMultiplier, rank)
  );

  if (exp >= requiredExp) {
    return calculateRank(exp - requiredExp, rank + 1, baseExp, expMultiplier);
  } else {
    let rankTitle: [string, string] = rankTitles[0];

    if (rank / 10 < rankTitles.length) {
      rankTitle = rankTitles[Math.floor(rank / 10)];
    } else {
      rankTitle = rankTitles[rankTitles.length - 1];
    }

    return {
      rank,
      exp,
      requiredExp,
      rankTitle: rankTitle[0],
      rankInitial: rankTitle[1],
    };
  }
};

export default calculateRank;
