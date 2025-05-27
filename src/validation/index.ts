export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const imageRgx =
    /(https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|gif|bmp|webp|svg)(\?[^\s]*)?)/g;
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  if (
    !product.title.trim() ||
    product.title.length < 5 ||
    product.title.length > 50
  ) {
    errors.title = "Title must be between 10 and 50 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 5 ||
    product.description.length > 150
  ) {
    errors.description = "Description must be between 10 and 90 characters";
  }
  if (!product.title.trim() || !imageRgx.test(product.imageURL)) {
    errors.imageURL = "Image URL is not valid";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price must be a number";
  }
  return errors;
};
