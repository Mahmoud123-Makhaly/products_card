import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div>
      <div className="container mt-4 ">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

export default App;
