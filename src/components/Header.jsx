import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/selectors";

function Header() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🌍 ShoppyGlobe
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>

          <Link to="/Cart" className="cart-link">
            🛒 Cart
            <span className="cart-count">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;