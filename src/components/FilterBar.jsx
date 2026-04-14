export default function FilterBar({ categories, selected, setSelected }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}