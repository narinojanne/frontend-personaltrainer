import { Container } from "@mui/material";
import React, { PureComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    pv: 240,
  },
  {
    name: "Page B",
    pv: 2400,
  },
  {
    name: "Page C",
    pv: 2400,
  },
  {
    name: "Page D",
    pv: 2400,
  },
];

export default function CustomerChart() {
  return (
    <Container
      style={{ maxWidth: "100%", height: "65vh", margin: "auto", padding: 0 }}>
      Customer Training Chart
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis name="Duration (min)" />
          <Tooltip />
          <Bar dataKey="pv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
