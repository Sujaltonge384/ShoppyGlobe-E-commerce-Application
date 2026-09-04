import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function CartItem({ item }) {
  // useDispatch allows this component to send actions
  // to the Redux store when the user interacts with the cart.
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      {/* 
        Display the product image.
        loading="lazy" improves performance by loading
        the image only when it is needed.
      */}
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
      />

      <div className="cart-item-info">
        {/* Display the product name and price. */}
        <h2>{item.title}</h2>

        <p>${item.price}</p>

        <div className="quantity-controls">
          {/* 
            Decrease the product quantity by dispatching
            the decreaseQuantity Redux action.
            The minimum quantity is controlled inside the reducer.
          */}
          <button
            onClick={() =>
              dispatch(decreaseQuantity(item.id))
            }
          >
            -
          </button>

          {/* Display the current quantity of the product. */}
          <span>{item.quantity}</span>

          {/* 
            Increase the product quantity by dispatching
            the increaseQuantity Redux action.
          */}
          <button
            onClick={() =>
              dispatch(increaseQuantity(item.id))
            }
          >
            +
          </button>
        </div>

        {/* 
          Remove the complete product from the cart
          by dispatching the removeFromCart action.
        */}
        <button
          className="remove-button"
          onClick={() =>
            dispatch(removeFromCart(item.id))
          }
        >
          Remove
        </button>
      </div>
    </article>
  );
}

// PropTypes ensures that CartItem receives the required
// product item data from its parent Cart component.
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;