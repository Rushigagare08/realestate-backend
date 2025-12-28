// src/pages/PropertyDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";

/* ---------- Small SVG icons ---------- */
function IconBed() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M2 13v6h2v-2h16v2h2v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 10V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconBath() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 16v3H3v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="inline-block">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

/* ---------- Component ---------- */
export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // find property by id
  const prop = properties.find((p) => String(p.id) === String(id));

  // Not found fallback
  if (!prop) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-xl w-full bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Property not found</h2>
          <p className="text-slate-600 mb-6">
            No property matches the ID <span className="font-mono">{id}</span>.
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Go Back</button>
            <button onClick={() => navigate("/")} className="px-4 py-2 bg-orange-500 text-white rounded">Browse Listings</button>
          </div>
        </div>
      </div>
    );
  }

  // Price formatting — INR
  const priceFormatted = "₹ " + Number(prop.price).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-6 md:px-8">
        {/* Back */}
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            <span className="text-xl">←</span>
            <span>Back to Listings</span>
          </button>
        </div>

        {/* Top: Image + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero image (left, spans 2 cols on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow">
              <div className="relative h-96 md:h-[420px]">
                <img
                  src={prop.img}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform hover:scale-105"
                />
                {prop.featured && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    Featured Property
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (right) */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>

              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 rounded px-4 py-3">
                  <div className="text-xs text-slate-500">Phone</div>
                  <div className="font-semibold">{prop.agent?.phone || "—"}</div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded px-4 py-3">
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="font-semibold">{prop.agent?.email || "—"}</div>
                </div>

                <a href={`tel:${prop.agent?.phone || ""}`} className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md">
                  Schedule a Tour
                </a>

                <button
                  onClick={() => alert("Request info clicked — implement form as needed")}
                  className="w-full border rounded-md py-2"
                >
                  Request Info
                </button>

                <div className="text-center text-sm text-slate-500 px-3 py-2 bg-slate-50 rounded">
                  Property ID: <span className="font-mono">{prop.id}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom details */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow">
            {/* Title + Price */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{prop.title}</h1>
                <div className="text-slate-500 mt-2">{prop.city}</div>
              </div>

              <div className="text-right">
                <div className="text-sm text-slate-400 mb-2">Price</div>
                <div className="text-2xl font-extrabold text-orange-500">{priceFormatted}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 border-t pt-6">
              <div className="grid grid-cols-3 text-center text-slate-600">
                <div>
                  <div className="text-orange-500 text-2xl mb-1"><IconBed /></div>
                  <div className="font-semibold">{prop.beds}</div>
                  <div className="text-sm">Bedrooms</div>
                </div>
                <div>
                  <div className="text-orange-500 text-2xl mb-1"><IconBath /></div>
                  <div className="font-semibold">{prop.baths}</div>
                  <div className="text-sm">Bathrooms</div>
                </div>
                <div>
                  <div className="text-orange-500 text-2xl mb-1"><IconArea /></div>
                  <div className="font-semibold">{prop.sqft}</div>
                  <div className="text-sm">Sqft</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed">{prop.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
