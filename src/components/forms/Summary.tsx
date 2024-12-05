import { useForm } from "react-hook-form";

export default function Summary({
  initialData,
  onPrevious,
  onSubmit,
  relatedData,
}: any) {
  return (
    <form onSubmit={() => {}}>
      <h2 className="text-lg font-semibold mb-4">Step 6: Review and Submit</h2>
      <pre>{JSON.stringify(initialData, null, 2)}</pre>

      <div className="flex gap-4 mt-10 justify-center">
        <button
          type="button"
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-8 text-lg hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-8 text-lg hover:bg-blue-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
