import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
      />

      <div className="cart-item-info">
        <h2>{item.title}</h2>

        <p>${item.price}</p>

        <div className="quantity-controls">
          <button
            onClick={() =>
              dispatch(decreaseQuantity(item.id))
            }
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              dispatch(increaseQuantity(item.id))
            }
          >
            +
          </button>
        </div>

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

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;