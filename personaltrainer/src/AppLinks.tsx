import { Link } from "react-router";
import { Stack } from "@mui/material";

export default function MyLinkBox() {
  return (
    <Stack direction={"row"} spacing={5} justifyContent={"center"}>
      <Link to={"/"}>Home</Link>
      <Link to={"/customerlistaggrid"}>Customers</Link>
      <Link to={"/traininglistaggrid"}>Trainings</Link>
    </Stack>
  );
}
