import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Training } from "../types/Types";

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to create and show customers trainings chart
export default function CustomerChart() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const { id } = useParams();

  // Get customers training data
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customers/${id}/trainings`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        setTrainings(data._embedded.trainings);
      } catch (err) {
        console.error("Failed to fetch trainings", err);
      }
    };

    fetchTrainings();
  }, [id]);

  // Loop and collect trainings data
  const activityDurations = trainings.reduce((acc, training) => {
    const { activity, duration } = training;
    acc[activity] = (acc[activity] || 0) + duration;
    return acc;
  }, {} as Record<string, number>);

  // Create chart data
  const chartData = Object.entries(activityDurations).map(
    ([activity, duration]) => ({
      name: activity,
      value: duration,
    })
  );

  // Display chart
  return (
    <Container
      style={{
        maxWidth: "100%",
        height: "65vh",
        margin: "auto",
        padding: 0,
      }}>
      Customers {id} Training Chart
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          barGap={5}
          width={500}
          height={600}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="12 12" />
          <XAxis dataKey="name" />
          <YAxis>
            <Label
              dx={-30}
              style={{ fontSize: "150%", fontWeight: 600 }}
              angle={270}
              value={"Duration (min)"}
            />
          </YAxis>
          <Tooltip cursor={{ fill: "rgba(206,206,206,0.3)" }} />
          <Bar dataKey="value" fill="#8884d8" maxBarSize={100} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
