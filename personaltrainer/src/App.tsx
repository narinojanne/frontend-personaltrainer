import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import "./App.css";
import AppTabs from "./AppTabs";
import AppLinks from "./AppLinks";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}>
            Personal Trainer APP
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ flexGrow: 1 }}></Box>
        <AppTabs />
      </Container>
    </>
  );
}

export default App;
