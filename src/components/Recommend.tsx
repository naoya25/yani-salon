import React, { useState } from "react";

const Recommend: React.FC = () => {
  const [brand, setBrand] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [postData, setPostData] = useState<string>("");
  const handleRecommendation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_Flask_Domain}/api/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postData: postData }),
        }
      );

      const data = await response.json();
      setBrand(data.recommendation.brand);
      setScore(data.recommendation.score);
    } catch (error) {
      setBrand(`Error: ${error}`);
    }
  };

  return (
    <div>
      <label>
        タバコに対するイメージは？？
        <br />
        <textarea
          style={{
            height: 100,
            width: 300,
          }}
          onChange={(e) => setPostData(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleRecommendation}>診断開始</button>
      {brand && <p>Recommended Brand: {brand}</p>}
      {score != 0 && <p>Score: {(score * 100).toFixed(1)} %</p>}
      {brand && (
        <img
          src={`${process.env.REACT_APP_Flask_Domain}/static/yani-images/${brand}.jpg`}
          alt=""
        />
      )}
    </div>
  );
};

export default Recommend;
