import { useEffect, useState } from "react";
import { Training } from "./Types";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const fetchTrainings = () => {
    fetch(`${BASE_URL}/gettrainings`)
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchTrainings(), []);

  return (
    <div>
      <ul>
        {trainings.map((training, id) => (
          <li key={id}>
            Training: {training.activity}, {training.duration} minutes,
            customer: {training.customer.firstname} {training.customer.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}
