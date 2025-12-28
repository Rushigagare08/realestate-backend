import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate ,useParams} from "react-router-dom";
import { useEffect } from "react";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
const params=useParams();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 5,
    offer: false,
    parking: false,
    furnished: false,
  });

    
useEffect(()=>{
    const fetchListing=async()=>{
        const listingId=params.listingId;
        const res=await fetch(`/api/listing/get/${listingId}`);
        const data=await res.json();
        if(data.success===false){
            console.log(data.message);
            return;
        }
        setFormData(data);

    }
    fetchListing();

},[])
  console.log(formData);

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
        }
      );
    });
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) return;

    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can upload maximum 6 images");
      return;
    }

    setUploading(true);
    setImageUploadError("");

    try {
      const urls = await Promise.all(files.map((file) => storeImage(file)));
      setFormData((prev) => ({
        ...prev,
        imageUrls: prev.imageUrls.concat(urls),
      }));
    } catch {
      setImageUploadError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, checked, type, tagName } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({ ...prev, type: id }));
      return;
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
      return;
    }

    if (type === "number" || type === "text" || tagName === "TEXTAREA") {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1) {
      return setError("You must upload at least one image");
    }

    if (+formData.discountPrice >= +formData.regularPrice) {
      return setError("Discount price must be lower than regular price");
    }

    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`,{
        method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                 body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,


      
       
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">
        Update Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-8"
      >
        <input
          id="name"
          placeholder="Property Name"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <input
          id="address"
          placeholder="Address"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          value={formData.address}
          required
        />

        <textarea
          id="description"
          placeholder="Description"
          className="border p-3 rounded-xl"
          onChange={handleChange}
          value={formData.description}
          required
        />

        <div className="flex gap-6 flex-wrap">
          <label className="flex gap-2">
            <input
              type="checkbox"
              id="sale"
              onChange={handleChange}
              checked={formData.type === "sale"}
            />
            Sell
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              id="rent"
              onChange={handleChange}
              checked={formData.type === "rent"}
            />
            Rent
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              id="parking"
              onChange={handleChange}
              checked={formData.parking}
            />
            Parking
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              id="furnished"
              onChange={handleChange}
              checked={formData.furnished}
            />
            Furnished
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              id="offer"
              onChange={handleChange}
              checked={formData.offer}
            />
            Offer
          </label>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            id="bedrooms"
            min="1"
            className="border p-2"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <input
            type="number"
            id="bathrooms"
            min="1"
            className="border p-2"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>

        <input
          type="number"
          id="regularPrice"
          min="50"
          max="1000000"
          placeholder="Regular Price"
          className="border p-3"
          onChange={handleChange}
          value={formData.regularPrice}
          required
        />

        {formData.offer && (
          <input
            type="number"
            id="discountPrice"
            min="1"
            placeholder="Discount Price"
            className="border p-3"
            onChange={handleChange}
            value={formData.discountPrice}
            required
          />
        )}

        <div className="flex gap-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles([...e.target.files])}
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            disabled={loading || uploading}
            className="bg-green-600 text-white px-4 rounded"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {imageUploadError && (
          <p className="text-red-600">{imageUploadError}</p>
        )}

        {formData.imageUrls.map((url, index) => (
          <div
            key={url}
            className="flex justify-between items-center border p-3"
          >
            <img src={url} className="w-20 h-20 object-cover rounded" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="submit"
          className="bg-slate-800 text-white p-4 rounded-xl"
        >
          {loading ? "Updating..." : "Update listing"}
        </button>

        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
};

export default UpdateListing;
