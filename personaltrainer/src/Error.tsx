import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div>
      <h1>Page not found</h1>
      <p>{errorMessage}</p>
      <Link to={"/"}>Back to Home Page</Link>
    </div>
  );
}
