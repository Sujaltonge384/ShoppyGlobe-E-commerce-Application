import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import Loader from "./components/Loader";

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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <ProductDetail />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;