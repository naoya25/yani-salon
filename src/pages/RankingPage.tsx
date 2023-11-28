import React, { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";

const RankingPage: React.FC = () => {
  const { allposts, errorMsg } = usePosts();
  const userRanking: { [key: string]: number } = {};
  const [ranking, setRanking] = useState<
    { useremail: string; total: number }[]
  >([]);

  useEffect(() => {
    if (errorMsg) return;

    allposts.forEach((post) => {
      const product = post.tar * post.yanis;
      if (userRanking[post.useremail]) {
        userRanking[post.useremail] += product;
      } else {
        userRanking[post.useremail] = product;
      }
    });

    const rankingArray = Object.keys(userRanking)
      .map((useremail) => ({
        useremail,
        total: userRanking[useremail],
      }))
      .sort((a, b) => b.total - a.total);

    setRanking(rankingArray);
  }, [allposts, errorMsg]);

  console.log(ranking);

  return (
    <div>
      <h3>Yani Ranking</h3>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {!errorMsg && (
        <ul>
          {ranking.map((entry, index) => (
            <li key={index}>
              {`${index + 1}: ${entry.useremail} - スコア: ${entry.total}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RankingPage;
