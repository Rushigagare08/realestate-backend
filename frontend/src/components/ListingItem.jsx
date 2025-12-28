import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls?.[0] ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-3">
          <p className="truncate text-lg font-semibold text-orange-700">
            {listing.name}
          </p>

          <div className="flex items-center">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="line-clamp-3 text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>

          <p className="truncate text-sm text-gray-700">
            {listing.description}
          </p>

          <p className="text-orange-500 mt-2 font-semibold">
            ₹
            {(listing.offer
              ? listing.discountPrice
              : listing.regularPrice
            ).toLocaleString("hi-IN")}
            {listing.type === "rent" && " / month"}
          </p>

          <div className="text-orange-700 flex gap-4 mt-2">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>

            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
