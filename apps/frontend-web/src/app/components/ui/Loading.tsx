interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  if (!isLoading) return null;

  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="text-gray-600">Finding delicious recipes...</p>
    </div>
  );
};

export default Loading;
