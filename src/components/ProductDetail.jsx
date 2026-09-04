import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addToCart } from "../redux/cartSlice";
import Header from "./Header";
import Loader from "./Loader";

function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="container">
          <div className="error-message">
            <h1>Unable to load product</h1>
            <p>{error}</p>
            <Link to="/">Return to Home</Link>
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
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
          />

          <div>
            <h1>{product.title}</h1>

            <p>{product.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {product.rating}
            </p>

            <p className="detail-price">
              ${product.price}
            </p>

            <button onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

ProductDetail.propTypes = {};

export default ProductDetail;