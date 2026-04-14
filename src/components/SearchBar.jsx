export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search images..."
        className="w-full md:w-1/2 px-5 py-3 rounded-full bg-gray-900 border border-gray-700 text-white"
      />
    </div>
  );
}