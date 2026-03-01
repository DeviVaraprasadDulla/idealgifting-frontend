import { useState } from "react";

function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images?.[0]?.image);

  return (
    <div>
      <div className="h-80 md:h-96 bg-gray-100 rounded-2xl overflow-hidden">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex gap-3 mt-4">
        {images?.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img.image)}
            className="w-20 h-20 rounded-lg overflow-hidden cursor-pointer border hover:border-black"
          >
            <img
              src={img.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
