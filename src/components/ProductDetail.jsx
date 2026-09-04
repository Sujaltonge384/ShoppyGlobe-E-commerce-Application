import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addToCart } from "../redux/cartSlice";
import Header from "./Header";
import Loader from "./Loader";

function ProductDetail() {
  // Get the product ID from the dynamic URL parameter.
  // Example: /product/5 gives us id = "5".
  const { id } = useParams();

  // useDispatch allows this component to send
  // cart actions to the Redux store.
  const dispatch = useDispatch();

  // Store the fetched product details in component state.
  const [product, setProduct] = useState(null);

  // Track whether the product data is currently being fetched.
  const [loading, setLoading] = useState(true);

  // Store an error message if the product request fails.
  const [error, setError] = useState("");

  // Fetch the selected product whenever the URL product ID changes.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Show the loading state and clear any previous error.
        setLoading(true);
        setError("");

        // Fetch product details using the ID from the route.
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        // Handle unsuccessful API responses.
        if (!response.ok) {
          throw new Error("Product not found");
        }

        // Convert the API response into JavaScript data.
        const data = await response.json();

        // Store the fetched product in component state.
        setProduct(data);
      } catch (err) {
        // Log the technical error for debugging.
        console.error("Product detail error:", err);

        // Display a user-friendly error message on the UI.
        setError(
          "Unable to load this product. The product may not exist."
        );
      } finally {
        // Stop the loading state whether the request
        // succeeds or fails.
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add the currently displayed product to the Redux cart.
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // Display the loader while product information is being fetched.
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  // Display an error message if the API request fails.
  if (error) {
    return (
      <>
        <Header />

        <main className="container">
          <div className="error-message">
            <h1>Unable to load product</h1>

            <p>{error}</p>

            <Link to="/">
              Return to Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="container">
        <section className="product-detail">
          {/* 
            Display the product image.
            loading="lazy" improves performance by delaying
            image loading until it is needed.
          */}
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />

          <div>
            <h1>{product.title}</h1>

            <p>{product.description}</p>

            {/* Display additional information received from the API. */}
            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {product.rating}
            </p>

            <p>
              <strong>Brand:</strong>{" "}
              {product.brand || "N/A"}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </p>

            <p>
              <strong>Discount:</strong>{" "}
              {product.discountPercentage}%
            </p>

            <p className="detail-price">
              ${product.price}
            </p>

            {/* Dispatch the addToCart action when the user clicks the button. */}
            <button onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

// ProductDetail currently does not receive props,
// so no prop validation is required for this component.
ProductDetail.propTypes = {};

export default ProductDetail;