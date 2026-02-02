"use client";

import { useState } from "react";

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    description:
      "Experience breathtaking sunsets over the Aegean Sea from whitewashed villages perched on volcanic cliffs. Perfect for romantic getaways and wine enthusiasts.",
    price: "From $1,299",
    image: "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600",
    tags: ["Romantic", "Beach", "Culture"],
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    description:
      "Immerse yourself in ancient traditions among serene temples, zen gardens, and geisha districts. A perfect blend of history, spirituality, and culinary excellence.",
    price: "From $1,899",
    image: "bg-gradient-to-br from-pink-300 via-rose-400 to-red-500",
    tags: ["Culture", "History", "Food"],
  },
  {
    id: 3,
    name: "Machu Picchu",
    country: "Peru",
    description:
      "Trek through the Andes to discover the legendary Incan citadel shrouded in mist. An unforgettable adventure combining history, nature, and breathtaking views.",
    price: "From $2,199",
    image: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
    tags: ["Adventure", "History", "Nature"],
  },
  {
    id: 4,
    name: "Maldives",
    country: "Indian Ocean",
    description:
      "Escape to crystal-clear waters and pristine beaches in overwater bungalows. The ultimate luxury destination for relaxation and underwater exploration.",
    price: "From $2,899",
    image: "bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-500",
    tags: ["Luxury", "Beach", "Diving"],
  },
];

export default function Destinations() {
  const [activeDestination, setActiveDestination] = useState<number | null>(null);

  return (
    <section id="destinations" className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-riksja-red font-semibold text-sm uppercase tracking-wider mb-4">
            Featured Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cod-gray mb-6">
            Where Will Your Next
            <br />
            <span className="text-riksja-red">Adventure</span> Take You?
          </h2>
          <p className="max-w-2xl mx-auto text-cod-gray/70 text-lg">
            Handpicked destinations that offer unforgettable experiences, from
            serene beaches to ancient wonders.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setActiveDestination(destination.id)}
              onMouseLeave={() => setActiveDestination(null)}
            >
              {/* Image Placeholder */}
              <div
                className={`h-64 ${destination.image} relative overflow-hidden`}
              >
                {/* Placeholder pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cod-gray/80 via-transparent to-transparent" />
                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-action-orange text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {destination.price}
                </div>
                {/* Location */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p className="text-white/80 text-sm flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{destination.country}</span>
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-cod-gray/70 text-sm leading-relaxed mb-4">
                  {destination.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-off-white text-cod-gray/70 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    activeDestination === destination.id
                      ? "bg-riksja-red text-white"
                      : "bg-cod-gray/5 text-cod-gray hover:bg-riksja-red hover:text-white"
                  }`}
                >
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 text-riksja-red hover:text-riksja-red/80 font-semibold transition-colors">
            <span>View All Destinations</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
