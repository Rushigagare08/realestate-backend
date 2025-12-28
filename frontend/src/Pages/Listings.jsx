import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Listings() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}

      {error && (
        <p className="text-center my-7 text-2xl text-red-600">
          Something went wrong!
        </p>
      )}

      {listing && !error && (
        <div>
          {/* Images */}
          <Swiper navigation modules={[Navigation]}>
            {listing.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Details */}
          <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold mb-2">
              {listing.name}
            </h1>

            <p className="text-gray-600 mb-2">
              📍 {listing.address}
            </p>

            <p className="mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
            </p>

            {/* Price */}
            <div className="text-2xl font-bold mb-4">
              {listing.offer ? (
                <>
                  <span className="text-gray-400 mr-3">
                    ₹{listing.regularPrice}
                  </span>
                  <span className="text-green-600">
                    ₹{listing.discountedPrice}
                  </span>
                </>
              ) : (
                <>₹{listing.regularPrice}</>
              )}

              {listing.type === "rent" && (
                <span className="text-lg text-gray-500"> / month</span>
              )}
            </div>

            {/* Description */}
            <p className="mb-5">{listing.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>🛏 Bedrooms: {listing.bedrooms}</p>
              <p>🛁 Bathrooms: {listing.bathrooms}</p>
              <p>🚗 Parking: {listing.parking ? "Yes" : "No"}</p>
              <p>🛋 Furnished: {listing.furnished ? "Yes" : "No"}</p>
            </div>

            {/* Owner section (optional if you store userRef) */}
            {listing.userRef && (
              <p className="mt-6 text-gray-600 text-sm">
                Listed by owner (ID: {listing.userRef})
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
