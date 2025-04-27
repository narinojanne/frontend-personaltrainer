import { Link } from "react-router";
import { Button, Stack } from "@mui/material";

export default function MyLinkBox() {
  return (
    <Stack direction={"row"} spacing={5} justifyContent={"center"}>
      <Button component={Link} to={"/"}>
        Home
      </Button>
      <Button component={Link} to={"/customerlistaggrid"}>
        Customers
      </Button>
      <Button component={Link} to={"/traininglistaggrid"}>
        Trainings
      </Button>
      <Button component={Link} to={"/trainingscalendar"}>
        Calendar
      </Button>
    </Stack>
  );
}
