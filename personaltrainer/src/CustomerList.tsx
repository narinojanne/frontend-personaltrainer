import { useEffect, useState } from "react";
import { Customer } from "./Types";

const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = () => {
    fetch(`${BASE_URL}/customers`)
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchCustomers(), []);

  return (
    <div>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>
            Name: {customer.firstname} {customer.lastname}, {customer.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
