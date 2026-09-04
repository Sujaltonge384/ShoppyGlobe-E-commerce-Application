import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

import {
  selectCartItems,
  selectCartTotal,
} from "../redux/selectors";

import { clearCart } from "../redux/cartSlice";

function Checkout() {
  // useNavigate is used to redirect the user to another route
  // after successfully placing the order.
  const navigate = useNavigate();

  // useDispatch allows the component to send Redux actions
  // such as clearing the cart.
  const dispatch = useDispatch();

  // Get cart items and total amount from the Redux store.
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Store the values entered by the user in the checkout form.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Stores the order confirmation message after
  // the user successfully places the order.
  const [orderMessage, setOrderMessage] =
    useState("");

  // Update the corresponding form field whenever
  // the user enters or changes information.
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle checkout form submission.
  const handleSubmit = (event) => {
    // Prevent the browser from refreshing the page
    // when the form is submitted.
    event.preventDefault();

    // Display the required order confirmation message.
    setOrderMessage("Order placed");

    // Clear all products from the Redux cart after
    // the order has been successfully placed.
    dispatch(clearCart());

    // Redirect the user back to the Home page
    // after displaying the confirmation message.
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // If the cart is empty and an order has not just been placed,
  // prevent checkout and provide an option to return Home.
  if (cartItems.length === 0 && !orderMessage) {
    return (
      <>
        <Header />

        <main className="container">
          <h1>Your cart is empty</h1>

          <button onClick={() => navigate("/")}>
            Go Home
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      {/* Display the common navigation header. */}
      <Header />

      <main className="container">
        <h1>Checkout</h1>

        {/* 
          Display the confirmation message after
          the order has been successfully placed.
        */}
        {orderMessage && (
          <div className="success-message">
            {orderMessage}
          </div>
        )}

        {/* 
          Show the checkout form and order summary only
          before the order has been placed.
        */}
        {!orderMessage && (
          <div className="checkout-grid">

            {/* 
              Checkout form collects the customer's
              name, email, and delivery address.
            */}
            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >
              <label>
                Full Name

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Address

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </label>

              {/* Submit the checkout form and place the order. */}
              <button type="submit">
                Place Order
              </button>
            </form>

            {/* 
              Display a summary of all products currently
              stored in the Redux cart.
            */}
            <div className="order-summary">
              <h2>Order Summary</h2>

              {/* 
                Render each cart product using map().
                item.id provides a unique key for each list item.
              */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="summary-item"
                >
                  <span>
                    {item.title} x {item.quantity}
                  </span>

                  {/* Calculate the price based on
                      product price and quantity. */}
                  <span>
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}

              {/* Display the total value of the order. */}
              <h3>
                Total: ${cartTotal.toFixed(2)}
              </h3>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Checkout;