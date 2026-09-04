import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/cartSlice";

function SearchBar() {
  // useDispatch allows the component to send the
  // setSearchTerm action to the Redux store.
  const dispatch = useDispatch();

  // Get the current search term from the Redux store.
  // This keeps the input value synchronized with Redux state.
  const searchTerm = useSelector(
    (state) => state.cart.searchTerm
  );

  // Handle changes made by the user in the search input.
  // The new value is sent to Redux using setSearchTerm.
  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div className="search-container">
      {/* 
        Controlled input:
        - value comes from Redux state
        - onChange updates Redux state
        This allows ProductList to use the same search value
        for filtering products.
      */}
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