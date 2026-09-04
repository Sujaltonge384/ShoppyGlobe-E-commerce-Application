import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  const searchTerm = useSelector(
    (state) => state.cart.searchTerm
  );

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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