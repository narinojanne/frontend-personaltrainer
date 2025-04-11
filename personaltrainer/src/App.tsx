import "./App.css";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";

function App() {
  return (
    <>
      <h1>Personal Trainer APP</h1>
      <h2>Customers</h2>
      <CustomerList />
      <h2>Trainings</h2>
      <TrainingList />
    </>
  );
}

export default App;
