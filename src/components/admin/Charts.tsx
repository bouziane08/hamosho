"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {api} from "@/lib/api";

export default function Charts() {
  const [data, setData] = useState<number[]>([]);
  useEffect(() => {
    api.get("/analytics").then(res => setData(res.data.sales));
  }, []);

  return (
    <div className="my-4">
      <Bar
        data={{
          labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
          datasets: [{ label: "المبيعات", data, backgroundColor: "rgba(34,197,94,0.7)" }],
        }}
      />
    </div>
  );
}
