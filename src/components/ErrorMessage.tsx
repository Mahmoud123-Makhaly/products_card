const ErrorMessage = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    message && <span className={`text-red-500 ${className}`}>{message}</span>
  );
};
export default ErrorMessage;
