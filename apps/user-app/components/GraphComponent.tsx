"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";

//special way to import Line from react chart.js 2
const Line = dynamic(
  () => import("react-chartjs-2").then((module) => module.Line),
  {
    ssr: false,
  }
);

const GraphComponent = ({
  transactions,
}: {
  transactions: {
    id: number;
    time: Date;
    amount: number;
    senderId?: number | null;
    receiverId?: number | null;
  }[];
}) => {
  return (
    <div className=" h-[70vh] w-[80vw] pr-4">
      <Line
        data={{
          //transactions.filter.map what you want!
          labels: transactions
            .filter((data) => data.senderId === null)
            .map((data) => data.time.toLocaleTimeString()),
          datasets: [
            {
              label: "Transactions Sent",
              data: transactions
                .filter((data) => data.senderId === null)
                .map((data) => data.amount / 100),
              backgroundColor: "#e53e3e",
              borderColor: "#e53e3e",
              yAxisID: "yAxis",
            },

            {
              label: "Transactions Received",
              data: transactions
                .filter((data) => data.receiverId === null)
                .map((data) => data.amount / 100),
              backgroundColor: "#38a169",
              borderColor: "#38a169",
            },
          ],
        }}
        options={{
          scales: {
            yAxis: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          elements: {
            line: {
              tension: 0.2,
            },
          },
          plugins: {
            title: {
              display: true,
              align: "start",
              text: "All Transactions Done",
              color: "#6a51a6",
              font: {
                size: 20,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default GraphComponent;
