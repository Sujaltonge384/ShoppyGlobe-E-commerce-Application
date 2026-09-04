import Header from "./Header";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import Loader from "./Loader";
import useFetchProducts from "../hooks/useFetchProducts";

function Home() {
  const {
    products,
    loading,
    error,
  } = useFetchProducts();

  return (
    <>
      <Header />

      <main className="container">
        <section className="hero">
          <h1>Welcome to ShoppyGlobe</h1>
          <p>
            Your one-stop destination for amazing products.
          </p>
        </section>

        <SearchBar />

        {loading && <Loader />}

        {error && (
          <div className="error-message">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <p>Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <ProductList products={products} />
        )}
      </main>
    </>
  );
}

export default Home;