import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addToCart } from "../redux/cartSlice";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-image"
        />

        <h2>{product.title}</h2>
      </Link>

      <p className="product-price">
        ${product.price}
      </p>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </article>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;