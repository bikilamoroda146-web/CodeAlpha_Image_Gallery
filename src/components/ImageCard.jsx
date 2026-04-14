import { useState } from "react";

export default function ImageCard({ image, onZoom, onDelete, onEdit }) {
  const [liked, setLiked] = useState(false);

 const handleDownload = async (url, title) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = title || "image";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed", error);
  }
};

  return (
    <div className="relative group rounded-xl overflow-hidden shadow-lg">

      {/* CLICK ZOOM FIXED */}
    <img
  src={image.url}
  alt={image.title}
  onClick={() => onZoom(image)}
  className="h-60 w-full object-cover cursor-pointer"
/>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>

      {/* text */}
      <div className="absolute bottom-2 left-2 text-white">
        <h3 className="font-bold">{image.title}</h3>
        <p className="text-sm">{image.category}</p>
      </div>

      {/* like */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-2 right-2"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* edit */}
      <button
        onClick={onEdit}
        className="absolute top-2 left-2 bg-blue-600 px-2 py-1 text-xs rounded"
      >
        Edit
      </button>

      {/* delete */}
      <button
        onClick={onDelete}
        className="absolute bottom-2 right-2 bg-red-600 px-2 py-1 text-xs rounded"
      >
        Delete
      </button>

      {/* download */}
      <button
        onClick={() => handleDownload(image.url, image.title)}
        className="absolute bottom-2 left-2 bg-green-600 px-2 py-1 text-xs rounded"
      >
        Download
      </button>

    </div>
  );
}