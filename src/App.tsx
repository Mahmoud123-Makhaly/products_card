import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import ButtonMaker from "./components/UI/ButtonMaker";
import ModalMaker from "./components/UI/ModalMaker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <div className="container mt-4 ">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-4xl font-bold">
            Latest <span className="text-indigo-500">Products</span>
          </h2>
          <ButtonMaker
            className="  bg-indigo-500"
            width="w-fit"
            onClick={() => setIsOpen(true)}
          >
            Build Now
          </ButtonMaker>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <ModalMaker
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        title="Add Product"
      >
        <h3>efefeff</h3>
        <div className="flex items-center  gap-2">
          <ButtonMaker
            className="  bg-indigo-500 hover:bg-indigo-600"
            width="w-full"
          >
            Submit
          </ButtonMaker>
          <ButtonMaker
            className=" bg-gray-400 hover:bg-gray-400"
            onClick={() => setIsOpen(false)}
            width="w-full"
          >
            Cancel
          </ButtonMaker>
        </div>
      </ModalMaker>
    </main>
  );
}

export default App;
