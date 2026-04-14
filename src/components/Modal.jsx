import { useEffect } from "react";

export default function Modal({ images, index, setIndex, onClose }) {
  const img = images[index];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <button onClick={onClose} className="absolute top-5 right-5 text-white text-3xl">
        ✕
      </button>

      <button onClick={prev} className="absolute left-5 text-white text-5xl">‹</button>

      <img src={img.url} className="max-h-[80%] rounded-xl" />

      <button onClick={next} className="absolute right-5 text-white text-5xl">›</button>

    </div>
  );
}