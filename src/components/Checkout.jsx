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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [orderMessage, setOrderMessage] =
    useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setOrderMessage("Order placed");

    dispatch(clearCart());

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

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
      <Header />

      <main className="container">
        <h1>Checkout</h1>

        {orderMessage && (
          <div className="success-message">
            {orderMessage}
          </div>
        )}

        {!orderMessage && (
          <div className="checkout-grid">
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

              <button type="submit">
                Place Order
              </button>
            </form>

            <div className="order-summary">
              <h2>Order Summary</h2>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="summary-item"
                >
                  <span>
                    {item.title} x {item.quantity}
                  </span>

                  <span>
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}

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