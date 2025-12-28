// src/Pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";


const featuredProperties = [
  {
    id: 1,
    title: "Urban Loft Space",
    price: "₹ 2,35,00,000",
    image: "/images/Urban Loft Space.jpg",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    title: "Luxury Suburban Villa",
    price: "₹ 1,85,00,000",
    image: "/images/Luxury Suburban Villa.jpg",
    location: "Pune, Maharashtra",
  },
  {
    id: 3,
    title: "Coastal Beach House",
    price: "₹ 3,50,00,000",
    image: "/images/Coastal Beach House.jpg",
    location: "Goa",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section
        aria-label="Hero"
        className="relative min-h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,9,12,0.55), rgba(8,9,12,0.55)), url('/images/home.jpg')",
        }}
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center text-white py-32 md:py-40">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Find Your Dream Home with <span className="text-orange-400">BrickByte</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-200">
              Discover the perfect property that matches your lifestyle.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

  {/* BROWSE PROPERTIES — Always White Text, Orange BG */}
  <Link
    to="/search"
    className="inline-flex items-center gap-3 font-semibold px-6 py-3 rounded-md shadow-lg transition 
               bg-orange-500 hover:bg-orange-600 
               !text-white visited:!text-white hover:!text-white active:!text-white focus:!text-white 
               no-underline"
  >
    Browse Properties
  </Link>

  {/* SELL PROPERTY — Always Black Text, White BG */}
  <Link
    to="/create-listing"
    className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-md shadow transition
               bg-white hover:bg-slate-100
               !text-black visited:!text-black hover:!text-black active:!text-black focus:!text-black 
               no-underline"
  >
    Sell Your Property
  </Link>

</div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full bg-white py-20 px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Why Choose BrickByte?</h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We provide exceptional service and expertise to help you find your perfect property.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          <FeatureCard icon="🎖️" title="Expert Guidance" desc="Experienced agents dedicated to helping you." />
          <FeatureCard icon="🛡️" title="Secure Deals" desc="Every transaction is safe and transparent." />
          <FeatureCard icon="📈" title="Market Insights" desc="Get accurate property valuations." />
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Featured Properties</h2>
            <p className="mt-2 text-slate-500 text-lg">Explore some of the most popular and premium listings.</p>
          </div>

          {/* View All button — change route here if you want */}
          <Link
            to="/search"
            className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-md text-slate-700 hover:shadow no-underline bg-white"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((fp) => (
            <FeaturedCard
              key={fp.id}
              image={fp.image}
              title={fp.title}
              price={fp.price}
              location={fp.location}
            />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl text-center font-bold text-slate-900 mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <Feature title="Search" desc="Browse thousands of listings." icon={<CheckIcon />} />
            <Feature title="Visit" desc="Schedule in-person property tours." icon={<PersonIcon />} />
            <Feature title="Buy" desc="Close your deal securely." icon={<ShieldIcon />} />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-14">Get In Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------- SUPPORTING COMPONENTS ------------------------- */

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-10 bg-white rounded-xl shadow-md text-center">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl text-orange-500 mx-auto mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function FeaturedCard({ image, title, price, location }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={image}
        alt={title}
        className="rounded-lg h-52 w-full object-cover mb-4"
        onError={(e) => {
          e.currentTarget.src = "/images/placeholder.png";
        }}
      />

      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-orange-500 font-bold mt-1">{price}</p>

      <div className="flex items-center gap-2 mt-2 text-gray-600">
        <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center">
          <User className="w-4 h-4 text-orange-500" />
        </div>
        <span>{location}</span>
      </div>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className="px-6">
      <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4 shadow text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500">{desc}</p>
    </div>
  );
}

/* CONTACT INFO */
function ContactInfo() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-slate-800">Contact Information</h3>

      <InfoItem icon="📞" title="Phone" value="+91 98765 43210" />
      <InfoItem icon="✉️" title="Email" value="support@brickbyte.com" />
      <InfoItem icon="📍" title="Address" value="Pune, Maharashtra, India" />
    </div>
  );
}

function InfoItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-slate-600">{value}</p>
      </div>
    </div>
  );
}

/* CONTACT FORM */
function ContactForm() {
  return (
    <form className="bg-white shadow-md rounded-xl p-8 space-y-6">
      <Input label="Name" placeholder="Your Name" />
      <Input label="Email" placeholder="Your Email" type="email" />

      <div>
        <label className="block text-sm font-medium text-slate-700">Message</label>
        <textarea
          rows="4"
          className="w-full mt-2 px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-orange-400"
          placeholder="Write your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow"
      >
        Send Message
      </button>
    </form>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

/* ICONS / SMALL SVGS (kept simple) */
function CheckIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
      <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
      <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* renamed local icon to avoid collision with lucide-react's User component */
function PersonIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
