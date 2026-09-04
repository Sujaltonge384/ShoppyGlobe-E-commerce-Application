import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import Loader from "./components/Loader";

// Lazy load the page components.
// This allows each page to be loaded only when it is needed,
// which improves the application's performance.
const Home = lazy(() =>
  import("./components/Home")
);

const ProductDetail = lazy(() =>
  import("./components/ProductDetail")
);

const Cart = lazy(() =>
  import("./components/Cart")
);

const Checkout = lazy(() =>
  import("./components/Checkout")
);

const NotFound = lazy(() =>
  import("./components/NotFound")
);

function App() {
  // Create the application routes using React Router.
  const router = createBrowserRouter([
    // Home page route.
    {
      path: "/",
      element: <Home />,
    },

    // Dynamic product route.
    // The :id parameter identifies which product to display.
    // Example: /product/5
    {
      path: "/product/:id",
      element: <ProductDetail />,
    },

    // Shopping cart route.
    {
      path: "/cart",
      element: <Cart />,
    },

    // Checkout route.
    {
      path: "/checkout",
      element: <Checkout />,
    },

    // Catch-all route for unknown URLs.
    // Displays the custom 404 NotFound page.
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    // Suspense displays the Loader while a lazy-loaded
    // component is being downloaded.
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;