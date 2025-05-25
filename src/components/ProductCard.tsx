import type { IProduct } from "../interfaces";
import { TextSlicer } from "../utils/Functions";
import ButtonMaker from "./UI/ButtonMaker";
import ImageMaker from "./UI/ImageMaker";

interface IProductCardProps {
  product: IProduct;
}
const ProductCard = (props: IProductCardProps) => {
  const {
    product: { title, description, imageURL, price, category },
  } = props;

  return (
    <div className="border rounded-lg p-2 flex flex-col gap-4 max-w-sm md:max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden h-[220px]">
        <ImageMaker
          imageSrc={imageURL}
          imageAlt="product-img"
          className="h-full w-full object-bottom"
        />
      </div>
      <h4 className="text-2xl font-medium text-[20px]">{title}</h4>
      <p> {TextSlicer(description)}</p>
      <div className="flex items-center space-x-2">
        <span className="w-4 h-4 bg-indigo-500 rounded-full cursor-pointer"></span>
        <span className="w-4 h-4 bg-yellow-500 rounded-full cursor-pointer"></span>
        <span className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"></span>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-indigo-500">${price}</h3>
        <div className="flex items-center space-x-2">
          <ImageMaker
            imageSrc={category.imageURL}
            imageAlt="category-img"
            className="w-8 h-8 rounded-full object-bottom"
          />
          <span>{category.name}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <ButtonMaker className="  bg-indigo-500" width="w-full">
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
