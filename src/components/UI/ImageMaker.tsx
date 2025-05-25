interface IImageMakerProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}
const ImageMaker = (props: IImageMakerProps) => {
  const { imageSrc, imageAlt, className } = props;
  return <img src={imageSrc} alt={imageAlt} className={className} />;
};
export default ImageMaker;
