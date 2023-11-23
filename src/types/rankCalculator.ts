interface RankInfo {
  rank: number;
  nowExp: number;
  nextExp: number;
}
const calculateRank = (
  exp: number,
  rank = 1,
  baseExp = 100,
  expMultiplier = 1.2
): RankInfo => {
  const requiredExp = Math.floor(baseExp * Math.pow(expMultiplier, rank));

  if (exp >= requiredExp) {
    return calculateRank(exp - requiredExp, rank + 1, baseExp, expMultiplier);
  } else {
    return { rank: rank, nowExp: exp, nextExp: requiredExp - exp };
  }
};

export default calculateRank;
