import { Customer, NewCustomer, NewTraining } from "../Types";

// Setting base url
const BASE_URL =
  "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api";

// Function to add new customer
export const addCustomer = async (customer: NewCustomer) => {
  const response = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) throw new Error("Failed to create new customer");
  return await response.json();
};

// Confirm delete
export const handleDelete = (url: string) => {
  if (window.confirm("Are you sure you want to delete customer?")) {
    deleteCustomer(url);
  }
};

// Function to delete customer
export const deleteCustomer = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete customer");
};

// Function to edit customer
export const editCustomer = async (customer: Customer, url: string) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) throw new Error("Failed to create new customer");
  return await response.json();
};

// Function to add new training to customer
export const addTraining = async (training: NewTraining) => {
  const response = await fetch(`${BASE_URL}/trainings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(training),
  });

  if (!response.ok) throw new Error("Failed to create new customer");
  return await response.json();
};

// Confirm delete
export const handleDeleteTraining = (id: number) => {
  if (window.confirm("Are you sure you want to delete training?")) {
    deleteTraining(id);
  }
};

// Function to delete customer
export const deleteTraining = async (id: number) => {
  const response = await fetch(`${BASE_URL}/trainings/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete training");
};
