import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Header from "./Header";

import {
  selectCartItems,
  selectCartTotal,
} from "../redux/selectors";

function Cart() {
  // Get all cart items from the Redux store.
  const cartItems = useSelector(selectCartItems);

  // Calculate the total price of all products in the cart.
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
      {/* Display the common navigation header. */}
      <Header />

      <main className="container">
        <h1>Your Shopping Cart</h1>

        {/* 
          Check whether the cart contains any products.
          If the cart is empty, show a message and provide
          a link to continue shopping.
        */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <Link to="/">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* 
              Render every product added to the cart.
              The product ID is used as a unique key for
              efficient rendering of the React list.
            */}
            <div className="cart-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            {/* 
              Display the total cart value and provide
              navigation to the checkout page.
            */}
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