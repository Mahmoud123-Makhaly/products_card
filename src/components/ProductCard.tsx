import type { IProduct } from "../interfaces";
import { formatCurrency, TextSlicer } from "../utils/Functions";
import CircleColor from "./CircleColor";
import ButtonMaker from "./UI/ButtonMaker";
import ImageMaker from "./UI/ImageMaker";

interface IProductCardProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  toggleEditModal: () => void;
  setProductIndex: (val: number) => void;
  productIndex: number;
}
const ProductCard = (props: IProductCardProps) => {
  const {
    product,
    setProductToEdit,
    toggleEditModal,
    setProductIndex,
    productIndex,
  } = props;
  const handleEditProduct = () => {
    setProductToEdit(product);
    setProductIndex(productIndex);
    toggleEditModal();
  };
  return (
    <div className="border rounded-lg p-2 flex flex-col gap-4 max-w-sm md:max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden h-[220px]">
        <ImageMaker
          imageSrc={product.imageURL}
          imageAlt="product-img"
          className="h-full w-full object-bottom"
        />
      </div>
      <h4 className="text-2xl font-medium text-[20px]">{product.title}</h4>
      <p> {TextSlicer(product.description)}</p>
      <div className="flex items-center space-x-2">
        {product.colors.map((color) => (
          <CircleColor key={color} color={color} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-indigo-500">
          ${formatCurrency(product.price)}
        </h3>
        <div className="flex items-center space-x-2">
          <ImageMaker
            imageSrc={product.category.imageURL}
            imageAlt="category-img"
            className="w-8 h-8 rounded-full object-bottom"
          />
          <span>{product.category.name}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <ButtonMaker
          className="  bg-indigo-500"
          width="w-full"
          onClick={handleEditProduct}
        >
          {" "}
          EDIT
        </ButtonMaker>
        <ButtonMaker className="  bg-red-500" width="w-full">
          {" "}
          DELETE
        </ButtonMaker>
      </div>
    </div>
  );
};

export default ProductCard;
