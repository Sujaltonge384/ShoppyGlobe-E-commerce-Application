import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Header from "./Header";
import {
  selectCartItems,
  selectCartTotal,
} from "../redux/selectors";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
      <Header />

      <main className="container">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <Link to="/">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            <div className="cart-summary">
              <h2>
                Total: ${cartTotal.toFixed(2)}
              </h2>

              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Cart;