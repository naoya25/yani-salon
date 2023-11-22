import React from "react";
import { Line } from "react-chartjs-2";
import Post from "../types/Post";
import { formatTimestamp } from "../types/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PostsChart: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const Scale = {
    y: {
      min: 0,
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "累計ヤニ本数",
      },
    },
    scales: Scale,
  };

  const labels = posts.map((post) => formatTimestamp(post.timestamp.toDate()));
  let cumulativeSum = 0;
  const yanisData = posts.map((post) => {
    cumulativeSum += post.yanis;
    return cumulativeSum;
  });
  const data = {
    labels,
    datasets: [
      {
        label: "累計本数",
        data: yanisData,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <div
      style={{
        width: "80%",
        height: "400px",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default PostsChart;
