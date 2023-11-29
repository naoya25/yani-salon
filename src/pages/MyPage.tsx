import React from "react";
import Chart from "../components/UI/Chart";
import PostsTable from "../components/UI/PostsTable";
import usePosts from "../hooks/usePosts";
import { formatTimestamp } from "../utils/formatTimestamp";

const MyPage: React.FC = () => {
  const { myposts, errorMsg } = usePosts();
  const labels = myposts.map((post) =>
    formatTimestamp(post.timestamp.toDate())
  );
  let cumulativeSum = 0;
  const yanisData = myposts.map((post) => {
    cumulativeSum += post.yanis;
    return cumulativeSum;
  });
  let tarTmp = 0;
  const tarData = myposts.map((post) => {
    tarTmp += post.yanis * post.tar;
    return tarTmp;
  });

  return (
    <div>
      <h3>Preview Posts</h3>
      {myposts.length > 0 ? (
        <div>
          <PostsTable posts={myposts} />
          <Chart
            title="累計ヤニ本数"
            labels={labels}
            dataLabel1="累計本数"
            data1={yanisData}
            dataLabel2="累計タール"
            data2={tarData}
          />
        </div>
      ) : (
        <p>No posts available</p>
      )}

      <p>{errorMsg}</p>
    </div>
  );
};

export default MyPage;
