export default function ErrorMessage({ message }) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
        <span className="text-lg"></span>
        <p className="text-sm">{message}</p>
      </div>
    );
  }