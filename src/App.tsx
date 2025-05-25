import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  return (
    <main>
      <div className="container mt-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
