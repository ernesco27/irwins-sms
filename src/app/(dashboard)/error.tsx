"use client";

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <div>
      <p>{error.message}</p>
      <button
        className="bg-green-600 w-20 h-8 rounded-md mt-4 text-white"
        onClick={reset}
      >
        Refresh page
      </button>
    </div>
  );
};

export default ErrorBoundary;
