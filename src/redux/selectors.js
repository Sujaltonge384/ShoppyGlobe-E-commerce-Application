// Select and return all products currently stored in the cart.
export const selectCartItems = (state) =>
  state.cart.items;


// Calculate the total number of products in the cart.
// reduce() adds the quantity of every cart item together.
export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );


// Calculate the total price of all products in the cart.
// For each item, price is multiplied by its quantity
// and then added to the overall cart total.
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );