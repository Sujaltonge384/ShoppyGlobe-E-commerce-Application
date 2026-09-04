import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
    // Get the search term from Redux state.
  const searchTerm = useSelector(
    (state) => state.cart.searchTerm
  );

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList; 