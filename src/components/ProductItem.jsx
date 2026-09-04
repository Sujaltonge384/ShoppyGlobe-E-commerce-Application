import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { addToCart } from "../redux/cartSlice";

function ProductItem({ product }) {
  // useDispatch allows this component to send actions
  // to the Redux store.
  const dispatch = useDispatch();

  // Dispatch the addToCart action when the user
  // clicks the "Add to Cart" button.
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      {/* 
        Link navigates to the dynamic product detail page.
        The product ID is used as the route parameter.
        Example: /product/5
      */}
      <Link to={`/product/${product.id}`}>
        {/* 
          Display the product image.
          loading="lazy" delays image loading until
          the image is needed, improving performance.
        */}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-image"
        />

        {/* Display the product name received through props. */}
        <h2>{product.title}</h2>
      </Link>

      {/* Display the product price. */}
      <p className="product-price">
        ${product.price}
      </p>

      {/* 
        Trigger the handleAddToCart function when clicked,
        which sends the product to the Redux cart.
      */}
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </article>
  );
}

// PropTypes verifies that the product prop is provided
// by the parent ProductList component.
ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;