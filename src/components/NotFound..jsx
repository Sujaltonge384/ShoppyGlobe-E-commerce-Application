import { Link, useLocation } from "react-router-dom";
import Header from "./Header";

function NotFound() {
  const location = useLocation();

  return (
    <>
      <Header />

      <main className="not-found">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist.
        </p>

        <p>
          Requested URL:{" "}
          <strong>{location.pathname}</strong>
        </p>

        <Link to="/">
          Return to Home
        </Link>
      </main>
    </>
  );
}

export default NotFound;