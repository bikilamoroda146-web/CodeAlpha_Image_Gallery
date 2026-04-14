import { useState } from "react";
import imagesData from "../data/images";
import ImageCard from "./ImageCard";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";

export default function Gallery() {
  const [imagesList, setImagesList] = useState(imagesData);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // upload
  const [title, setTitle] = useState("");
  const [imgCategory, setImgCategory] = useState("Nature");

  // edit
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // zoom
  const [zoomImage, setZoomImage] = useState(null);

  const categories = ["All", ...new Set(imagesList.map((i) => i.category))];

  // 📤 Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const newImage = {
        id: Date.now(),
        url: reader.result,
        title: title || "Untitled",
        category: imgCategory,
      };

      setImagesList([newImage, ...imagesList]);
      setTitle("");
    };

    reader.readAsDataURL(file);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    setImagesList(imagesList.filter((img) => img.id !== id));
  };

  // ✏️ Edit start
  const startEdit = (img) => {
    setEditId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
  };

  // 💾 Save edit
  const saveEdit = () => {
    setImagesList(
      imagesList.map((img) =>
        img.id === editId
          ? { ...img, title: editTitle, category: editCategory }
          : img
      )
    );
    setEditId(null);
  };

  // 🔍 Filter
  const filtered = imagesList.filter(
    (img) =>
      (category === "All" || img.category === category) &&
      img.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Image Gallery
      </h1>

      {/* UPLOAD */}
      <div className="bg-gray-900 p-5 rounded-xl mb-6">
        <h2 className="text-xl mb-3">Upload Image</h2>

        <div className="flex flex-col md:flex-row gap-3">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title"
            className="p-2 bg-gray-800 rounded w-full"
          />

          <select
            value={imgCategory}
            onChange={(e) => setImgCategory(e.target.value)}
            className="p-2 bg-gray-800 rounded"
          >
            <option>Nature</option>
            <option>Cars</option>
            <option>Tech</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="text-white"
          />
        </div>
      </div>

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* FILTER */}
      <FilterBar
        categories={categories}
        selected={category}
        setSelected={setCategory}
      />

      {/* EDIT */}
      {editId && (
        <div className="bg-gray-900 p-4 rounded mt-5">
          <h2 className="mb-2">Edit Image</h2>

          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="p-2 w-full mb-2 bg-gray-800 rounded"
          />

          <input
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="p-2 w-full mb-2 bg-gray-800 rounded"
          />

          <button
            onClick={saveEdit}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {filtered.map((img) => (
          <ImageCard
            key={img.id}
            image={img}
            onZoom={setZoomImage}
            onDelete={() => handleDelete(img.id)}
            onEdit={() => startEdit(img)}
          />
        ))}
      </div>

      {/* 🔍 ZOOM MODAL (FIXED) */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage.url}
            alt="zoom"
            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={() => setZoomImage(null)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}