import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  // Get the search term from the Redux store.
  // This value is updated whenever the user searches for a product.
  const searchTerm = useSelector(
    (state) => state.cart.searchTerm
  );

  // Filter the products based on the search term.
  // toLowerCase() makes the search case-insensitive.
  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Display a message when no product matches
  // the user's search term.
  if (filteredProducts.length === 0) {
    return (
      <div className="error-message">
        <h2>No products found</h2>
        <p>Try another search term.</p>
      </div>
    );
  }

  return (
    <section className="product-section">
      <div className="product-grid">
        {/* 
          Render each filtered product using the reusable
          ProductItem component.
          
          product.id is used as a unique key so React can
          efficiently identify each item in the list.
        */}
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

// Validate that the products prop is an array
// and that it is required.
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;