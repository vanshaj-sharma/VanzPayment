"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(
  () => import("react-chartjs-2").then((module) => module.Line),
  {
    ssr: false,
  }
);

import revenueData from "./revenueData.json";
const GraphComponent = () => {
  return (
    <div className=" h-[70vh] w-[80vw]">
      <Line
        data={{
          labels: revenueData.map((data) => data.label),
          datasets: [
            {
              label: "Transactions Sent",
              data: revenueData.map((data) => data.revenue),
              backgroundColor: "#38a169",
              borderColor: "#38a169",
            },
            {
              label: "Transactions Received",
              data: revenueData.map((data) => data.cost),
              backgroundColor: "#e53e3e",
              borderColor: "#e53e3e",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          elements: {
            line: {
              tension: 0.2,
            },
          },
          plugins: {},
        }}
      />
    </div>
  );
};

export default GraphComponent;
