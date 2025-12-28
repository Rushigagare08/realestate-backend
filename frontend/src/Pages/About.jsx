// AboutSection.jsx
import React from "react";

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-center justify-center min-w-[220px]">
    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-6">
      {icon}
    </div>
    <div className="text-3xl font-extrabold text-gray-900">{value}</div>
    <div className="mt-2 text-sm text-gray-500">{label}</div>
  </div>
);

const ValueCard = ({ title, desc }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
    <h4 className="text-xl font-semibold text-gray-900 mb-3">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-20">
      

      {/* About heading */}
      <div className="text-center max-w-5xl mx-auto px-6 mt-20">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About BrickByte</h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          We're revolutionizing the real estate industry by connecting buyers and sellers through innovative technology and personalized service.
        </p>
      </div>

      {/* Mission card */}
      <div className="max-w-4xl mx-auto mt-12 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            At BrickByte, our mission is to make the home buying and selling process seamless, transparent, and accessible to everyone. We leverage cutting-edge technology and market expertise to help you make informed decisions and find your perfect property.
          </p>
        </div>
      </div>

<div className="max-w-7xl mx-auto px-6 pt-8 md:pt-16 lg:pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-stretch">
          <StatCard
            icon={
              <svg className="w-6 h-6 stroke-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM8 13c-2.33 0-7 1.17-7 3.5V19h22v-2.5C23 14.17 18.33 13 16 13H8z"/>
              </svg>
            }
            value={"10,000+"}
            label={"Happy Clients"}
          />
          <StatCard
            icon={
              <svg className="w-6 h-6 stroke-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2l2 4 4 .5-3 2 1 4-4-2-4 2 1-4-3-2 4-.5z"/>
              </svg>
            }
            value={"500+"}
            label={"Properties Sold"}
          />
          <StatCard
            icon={
              <svg className="w-6 h-6 stroke-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2 4 4 8-8 4 4"/>
              </svg>
            }
            value={"15+"}
            label={"Years Experience"}
          />
          <StatCard
            icon={
              <svg className="w-6 h-6 stroke-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-4.35-9-7.5C-1 9 4 4 7 4c1.9 0 3.4 1.2 5 3.1C13.6 5.2 15.1 4 17 4c3 0 8 5 4 9.5C18 16.65 12 21 12 21z"/>
              </svg>
            }
            value={"98%"}
            label={"Satisfaction Rate"}
          />
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Values</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ValueCard
            title="Transparency"
            desc="We believe in honest, clear communication at every step of your real estate journey."
          />
          <ValueCard
            title="Excellence"
            desc="We strive to exceed expectations and deliver exceptional results for every client."
          />
          <ValueCard
            title="Innovation"
            desc="We continuously adopt new technologies to improve the real estate experience."
          />
          <ValueCard
            title="Integrity"
            desc="We conduct business with the highest ethical standards and a client-first mindset."
          />
        </div>
      </div>
    </section>
  );
}
