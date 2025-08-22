import { useEffect, useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export default function PhotoUploader({ userDetails }) {
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
      const formData = new FormData();

      formData.append("photo", file);
     
      axiosInstance
        .post("/profile/photos/upload/", formData)
        .then((_) => toast.success("Image uploaded successfully"))
        .catch((e) =>
          toast.error("Error occurred while uploading profile, retry.")
        );
    }
  };
  useEffect(
    function () {
      userDetails && setImages([...userDetails?.photos?.map?.((v) => v.photo),null,null,null,null].slice(0,4));
    },
    [userDetails]
  );
  const handleDelete = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    axiosInstance
      .delete("/profile/photos/delete/" + index + "/")
      .then((_) => toast.success("Image deleted successfully"))
      .catch((error) => toast.error("Error occurred retry"));
  };

  return (
    <div className="space-y-4 lg:px-12 px-4 py-12">
      <h3 className="text-sm font-semibold text-gray-700">Photos</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images?.map((image, index) => (
          <div
            key={index}
            className="relative border-2 border-dashed border-purple-300 rounded-lg w-full h-48 flex justify-center items-center bg-white overflow-hidden"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-red-500"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer text-center text-sm text-gray-400">
                <FiUpload className="w-6 h-6 mb-2" />
                <span>Choose a file or drag & drop it here</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
