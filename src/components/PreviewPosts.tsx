import React from "react";
import usePosts from "./usePosts";
import PostsTable from "./PostsTable";
import PostsChart from "./PostsChart";
import YaniImage from "./YaniImage";

const PreviewPosts: React.FC = () => {
  const { myposts, errorMsg } = usePosts();

  return (
    <div>
      <YaniImage height={600} width={400} />
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
