interface RankInfo {
  rank: number;
  exp: number;
  requiredExp: number;
}
const calculateRank = (
  exp: number,
  rank = 1,
  baseExp = 30,
  expMultiplier = 1.1
): RankInfo => {
  const requiredExp = Math.floor(baseExp * Math.pow(expMultiplier, rank));

  if (exp >= requiredExp) {
    return calculateRank(exp - requiredExp, rank + 1, baseExp, expMultiplier);
  } else {
    return {
      rank: rank,
      exp: exp,
      requiredExp: requiredExp,
    };
  }
};

export default calculateRank;
