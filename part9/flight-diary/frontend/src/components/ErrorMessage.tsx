const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <p style={{ color: "red", marginBottom: 4, fontWeight: "bold" }}>
      {errorMessage}
    </p>
  );
};

export default ErrorMessage;
