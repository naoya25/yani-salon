import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC<{
  title: string;
  labels: string[];
  dataLabel1: string;
  data1: number[];
  dataLabel2: string;
  data2: number[];
}> = ({ title, labels, dataLabel1, data1, dataLabel2, data2 }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: dataLabel1,
        },
        position: "left",
      },
      y1: {
        min: 0,
        title: {
          display: true,
          text: dataLabel2,
        },
        position: "right",
      },
    } as any,
  };

  const data = {
    labels,
    datasets: [
      {
        label: dataLabel1,
        data: data1,
        borderColor: "rgba(0, 0, 255, 0.5)",
        yAxisID: "y",
      },
      {
        label: dataLabel2,
        data: data2,
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

export default Chart;
