import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { Training } from "./Types";
import dayjs from "dayjs";

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

export default function TrainingsCalendar() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get trainings data
  const fetchTrainings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/gettrainings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrainings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Events info for calendar
  const events = trainings.map((training) => ({
    title: `${training.activity} / ${training.customer?.firstname} ${training.customer?.lastname}`,
    // date: training.date,
    start: training.date,
    end: dayjs(training.date)
      .add(Number(training.duration), "minute")
      .toISOString(),
  }));

  return (
    <div style={{ margin: 20 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        height="auto"
        events={events}
      />
    </div>
  );
}
