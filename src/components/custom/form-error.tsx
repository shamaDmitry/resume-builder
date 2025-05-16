const FormError = ({ message }: { message: string }) => {
  return <p className="text-destructive text-sm">{message}</p>;
};

export default FormError;
