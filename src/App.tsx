import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import ButtonMaker from "./components/UI/ButtonMaker";
import ModalMaker from "./components/UI/ModalMaker";
import InputMaker from "./components/UI/InputMaker";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import DropdownMaker from "./components/UI/DropdownMaker";
import type { ProductNameType } from "./types";

function App() {
  const defaultProductObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);
  const [productIndex, setProductIndex] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };
  const toggleEditModal = () => setIsEdit(!isEdit);
  /*******  9e3a24c5-c606-4b6f-bf75-f7c4357b0860  *******/
  const handleCancel = () => {
    setIsOpen(false);
    setProduct(defaultProductObject);
    setTempColors([]);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
  };
  const handleEditCancel = () => {
    toggleEditModal();
    setProductToEdit(defaultProductObject);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = productValidation(product);
    setErrors(validationErrors);
    const NoErrors =
      Object.values(validationErrors).some((val) => val === "") &&
      Object.values(validationErrors).every((val) => val === "");

    if (NoErrors) {
      const newProduct = {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      };
      setProducts((prev) => [newProduct, ...prev]);

      setIsOpen(false);
      setProduct(defaultProductObject);
      setTempColors([]);
    }

    setErrors(productValidation(product));
  };
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = productValidation(productToEdit);
    setErrors(validationErrors);
    const NoErrors =
      Object.values(validationErrors).some((val) => val === "") &&
      Object.values(validationErrors).every((val) => val === "");

    if (NoErrors) {
      // .....................
      const updatedProducts = [...products];
      updatedProducts[productIndex] = {
        ...productToEdit,
        colors: tempColors.concat(productToEdit.colors),
      };
      setProducts(updatedProducts);
      toggleEditModal();
    }

    setErrors(productValidation(productToEdit));
  };
  // generate edit modal fields
  const generateEditModalFields = (label: string, name: ProductNameType) => {
    return (
      <div className="mb-3">
        <div>
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
          <InputMaker
            id={name}
            type="text"
            name={name}
            value={productToEdit[name]}
            onChange={handleEditChange}
          />
        </div>
        <ErrorMessage message={errors[name]} />
      </div>
    );
  };
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
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              setProductToEdit={setProductToEdit}
              toggleEditModal={toggleEditModal}
              setProductIndex={setProductIndex}
              productIndex={index}
            />
          ))}
        </div>
      </div>
      {/* Add Product Modal */}
      <ModalMaker
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        title="Add Product"
      >
        <form onSubmit={handleSubmit}>
          {formInputsList.map((input) => (
            <div className="mb-3" key={input.id}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {input.label}
                </label>
                <InputMaker
                  id={input.id}
                  type={input.type}
                  name={input.name}
                  value={product[input.name]}
                  onChange={handleChange}
                />
              </div>
              <ErrorMessage message={errors[input.name]} />
            </div>
          ))}
          <div>
            {" "}
            <div className="mb-3">
              <DropdownMaker
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              {tempColors.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="px-2 rounded text-white"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-3 flex items-center justify-start gap-2 flex-wrap">
            {colors.map((color) => (
              <CircleColor
                key={color}
                color={color}
                onClick={() => {
                  setTempColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  );
                }}
              />
            ))}
          </div>
          <div className="flex items-center  gap-2">
            <ButtonMaker
              className="  bg-indigo-500 hover:bg-indigo-600"
              width="w-full"
            >
              Submit
            </ButtonMaker>
            <ButtonMaker
              className=" bg-gray-400 hover:bg-gray-500"
              onClick={handleCancel}
              width="w-full"
            >
              Cancel
            </ButtonMaker>
          </div>
        </form>
      </ModalMaker>
      {/* Edit Product Modal */}

      <ModalMaker
        isOpen={isEdit}
        toggle={() => setIsEdit(!isEdit)}
        title="Edit Product"
      >
        <form onSubmit={handleEditSubmit}>
          {/* edit modal inputs */}
          {generateEditModalFields("Title", "title")}
          {generateEditModalFields("Description", "description")}
          {generateEditModalFields("Image URL", "imageURL")}
          {generateEditModalFields("Price", "price")}
          <div className="mb-3">
            <DropdownMaker
              categories={categories}
              selectedCategory={productToEdit.category}
              setSelectedCategory={(value) =>
                setProductToEdit({ ...productToEdit, category: value })
              }
            />
          </div>
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="px-2 rounded text-white"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="mb-3 flex items-center justify-start gap-2 flex-wrap">
            {colors.map((color) => (
              <CircleColor
                key={color}
                color={color}
                onClick={() => {
                  if (
                    tempColors.includes(color) ||
                    productToEdit.colors.includes(color)
                  ) {
                    setTempColors((prev) => prev.filter((c) => c !== color));
                    return;
                  }

                  setTempColors((prev) => [...prev, color]);
                }}
              />
            ))}
          </div>
          {/* edit modal inputs */}
          <div className="flex items-center  gap-2">
            <ButtonMaker
              className="  bg-indigo-500 hover:bg-indigo-600"
              width="w-full"
            >
              Submit
            </ButtonMaker>
            <ButtonMaker
              onClick={handleEditCancel}
              className=" bg-gray-400 hover:bg-gray-500"
              width="w-full"
            >
              Cancel
            </ButtonMaker>
          </div>
        </form>
      </ModalMaker>
    </main>
  );
}

export default App;
