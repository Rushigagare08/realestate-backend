import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        }),
        credentials: "include", // <<< REQUIRED: allow cookies from server
      });

      console.log("POST /api/auth/google status:", res.status, res.statusText);

      if (!res.ok) {
        const errText = await res.text().catch(() => "no-body");
        throw new Error(`Google login failed: ${res.status} ${errText}`);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Could not sign in with Google:", error);
      // show user-visible error if you want
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 text-gray-700 font-medium transition"
    >
      Sign in with Google
    </button>
  );
}
