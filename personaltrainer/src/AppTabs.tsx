import { Box, Tab } from "@mui/material";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Home from "./Home";
import CustomerListAgGrid from "./CustomerListAgGrid";
import TrainingListAgGrid from "./TrainingListAgGrid";

export default function AppTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Home" value="1" />
            <Tab label="Customers" value="2" />
            <Tab label="Trainings" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Home />
        </TabPanel>
        <TabPanel value="2">
          <CustomerListAgGrid />
        </TabPanel>
        <TabPanel value="3">
          <TrainingListAgGrid />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
