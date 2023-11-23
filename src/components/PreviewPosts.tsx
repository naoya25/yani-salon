import React from "react";
import usePosts from "./usePosts";
import PostsTable from "./PostsTable";
import PostsChart from "./PostsChart";
import Ranking from "./Ranking";

const PreviewPosts: React.FC = () => {
  const { myposts, errorMsg } = usePosts();

  return (
    <div>
      <h3>Preview Posts</h3>
      {myposts.length > 0 ? (
        <div>
          <PostsTable />
          <PostsChart/>
        </div>
      ) : (
        <p>No posts available</p>
      )}

      <p>{errorMsg}</p>
    </div>
  );
};

export default PreviewPosts;
