import React, { useState } from "react";

const Recommend: React.FC = () => {
  const [recommend, setRecommend] = useState<string>("");
  const handleRecommendation = async () => {
    const userData = {
      smoked_cigarettes: 10,
      other_user_preference: "some_preference",
    };

    try {
      console.log(`${process.env.REACT_APP_Flask_Domain}/api/recommend`);
      const response = await fetch(
        `${process.env.REACT_APP_Flask_Domain}/api/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_data: userData }),
        }
      );

      const data = await response.json();
      setRecommend(data.recommendation.recommended_brand);
    } catch (error) {
      setRecommend(`Error: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={handleRecommendation}>診断開始</button>
      {recommend && <p>Recommended Brand: {recommend}</p>}
    </div>
  );
};

export default Recommend;
