// /src/Pages/SignUp.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.userName.trim() || !formData.email.trim() || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const dataToSend = {
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      password: formData.password
    };

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        if (payload?.message?.includes("duplicate key") && payload?.message?.includes("email_1")) {
          toast.error("Email already exists");
        } else if (payload?.message?.includes("duplicate key") && payload?.message?.includes("userName_1")) {
          toast.error("Username already exists");
        } else {
          toast.error(payload?.message || "Signup failed");
        }
        return;
      }

      toast.success("Account created successfully!");
      setFormData({ userName: "", email: "", password: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch {
      toast.error("Network error — check backend/server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8 space-y-6">

        {/* Logo + Heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 11.5L12 4l9 7.5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11.5v7.5a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1v-7.5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">BrickByte</h1>
          </div>

          <h2 className="text-xl font-bold text-slate-900">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="userName"
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={handleChange}
              value={formData.userName}
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={handleChange}
              value={formData.email}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={handleChange}
              value={formData.password}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Orange Button */}
         {/* Create Account Button */}
<button
  type="submit"
  disabled={loading}
  style={{ backgroundColor: "#f97316", color: "white" }} // forces orange + white
  className="w-full px-4 py-2.5 font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Creating..." : "Create Account"}
</button>
<Oauth />

        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-orange-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
