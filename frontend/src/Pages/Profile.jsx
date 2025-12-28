import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";

import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading, error } = useSelector(
    (state) => state.user
  );

  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  if (!currentUser) return null;

  const handleFileUpload = () => {
    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      return;
    }

    const storage = getStorage(app);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData((prev) => ({ ...prev, avatar: url }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanFormData = { ...formData };
    if (!cleanFormData.password) delete cleanFormData.password;

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanFormData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Update failed");
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `/api/user/delete/${currentUser._id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Delete failed");
      }

      dispatch(deleteUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `/api/user/listings/${currentUser._id}`
      );
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  // ⭐ Delete Listing
  const handleListingDelete = async (listingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        alert(data.message || "Delete failed");
        return;
      }

      // Remove it from UI
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={
            formData.avatar ||
            currentUser.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="self-center w-24 h-24 rounded-lg cursor-pointer"
        />

        {fileUploadError && (
          <p className="text-red-700">Image upload failed (max 2MB)</p>
        )}
        {filePerc === 100 && (
          <p className="text-green-700">Image uploaded</p>
        )}

        <input
          id="userName"
          defaultValue={currentUser.userName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          placeholder="Username"
        />

        <input
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          placeholder="Email"
        />

        <input
          id="password"
          type="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
          placeholder="New Password"
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {error && <p className="text-red-700 mt-3">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 mt-3">Profile updated</p>
      )}

      <Link
        to="/create-listing"
        className="block mt-6 bg-green-700 text-white p-3 rounded-lg text-center"
      >
        Create Listing
      </Link>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>

        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      <button
        onClick={handleShowListings}
        className="mt-5 bg-green-700 text-white w-full p-3 rounded-lg"
      >
        Show Listings
      </button>

      <p className="text-red-700 mt-3">
        {showListingError ? "Error Showing Listing" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>

          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>

              <Link to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>

                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
