import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";
import AppTabs from "./AppTabs";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <CssBaseline />
        <AppBar position="static" sx={{ mb: 1, alignItems: "center" }}>
          <Toolbar>
            <Typography variant="h4">Personal Trainer APP</Typography>
          </Toolbar>
        </AppBar>
        <AppTabs />
      </Container>
      {/* <h1>Personal Trainer APP</h1>
      <h2>Customers</h2>
      <CustomerList />
      <h2>Trainings</h2>
      <TrainingList /> */}
    </>
  );
}

export default App;
