import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/cartSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const searchTerm = useSelector(
    (state) => state.cart.searchTerm
  );

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products..."
      />
    </div>
  );
}

export default SearchBar;