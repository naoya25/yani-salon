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
import usePosts from "./usePosts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PostsChart: React.FC = () => {
  const { myposts } = usePosts();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "累計ヤニ本数",
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "累計本数",
        },
        position: "left",
      },
      y1: {
        min: 0,
        title: {
          display: true,
          text: "累計タール",
        },
        position: "right",
      },
    } as any,
  };

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
  const data = {
    labels,
    datasets: [
      {
        label: "累計本数",
        data: yanisData,
        borderColor: "rgba(0, 0, 255, 0.5)",
        yAxisID: "y",
      },
      {
        label: "累計タール",
        data: tarData,
        borderColor: "rgba(255, 0, 0, 0.5)",
        yAxisID: "y1",
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
