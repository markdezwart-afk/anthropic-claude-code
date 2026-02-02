"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  destination: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  destination?: string;
  budget?: string;
  message?: string;
}

const destinations = [
  "Santorini, Greece",
  "Kyoto, Japan",
  "Machu Picchu, Peru",
  "Maldives",
  "Bali, Indonesia",
  "Paris, France",
  "Safari, Kenya",
  "Other",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    destination: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.destination) {
      newErrors.destination = "Please select a destination";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your trip";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      destination: "",
      budget: "",
      message: "",
    });
  };

  if (isSubmitted) {
    return (
      <section id="inquiry" className="py-20 lg:py-32 bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-cod-gray mb-4">
              Thank You for Your Inquiry!
            </h3>
            <p className="text-cod-gray/70 text-lg mb-8">
              Our travel experts will review your request and get back to you within 24 hours with personalized recommendations.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-riksja-red hover:bg-riksja-red/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-20 lg:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block text-riksja-red font-semibold text-sm uppercase tracking-wider mb-4">
              Personal Travel Planning
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cod-gray mb-6">
              Let Our Experts
              <br />
              <span className="text-riksja-red">Plan Your Dream Trip</span>
            </h2>
            <p className="text-cod-gray/70 text-lg mb-8 leading-relaxed">
              Prefer a personal touch? Our experienced travel consultants are
              here to craft a bespoke itinerary tailored to your preferences,
              budget, and travel style.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  title: "Quick Response",
                  description: "Get a response within 24 hours",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ),
                  title: "Expert Guidance",
                  description: "Advice from seasoned travelers",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  ),
                  title: "Tailored Experience",
                  description: "Every trip designed just for you",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-riksja-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-riksja-red"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {benefit.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cod-gray">
                      {benefit.title}
                    </h4>
                    <p className="text-cod-gray/60 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-cod-gray mb-2"
                >
                  Full Name <span className="text-riksja-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-riksja-red/50 transition-colors ${
                    errors.name
                      ? "border-riksja-red bg-riksja-red/5"
                      : "border-gray-200 focus:border-riksja-red"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-riksja-red flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-cod-gray mb-2"
                >
                  Email Address <span className="text-riksja-red">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-riksja-red/50 transition-colors ${
                    errors.email
                      ? "border-riksja-red bg-riksja-red/5"
                      : "border-gray-200 focus:border-riksja-red"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-riksja-red flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Destination Field */}
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-cod-gray mb-2"
                >
                  Destination of Interest{" "}
                  <span className="text-riksja-red">*</span>
                </label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-riksja-red/50 transition-colors appearance-none bg-white ${
                    errors.destination
                      ? "border-riksja-red bg-riksja-red/5"
                      : "border-gray-200 focus:border-riksja-red"
                  }`}
                >
                  <option value="">Select a destination</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
                {errors.destination && (
                  <p className="mt-1 text-sm text-riksja-red flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.destination}</span>
                  </p>
                )}
              </div>

              {/* Budget Field */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-cod-gray mb-2"
                >
                  Estimated Budget <span className="text-riksja-red">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-riksja-red/50 transition-colors appearance-none bg-white ${
                    errors.budget
                      ? "border-riksja-red bg-riksja-red/5"
                      : "border-gray-200 focus:border-riksja-red"
                  }`}
                >
                  <option value="">Select your budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-riksja-red flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.budget}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-cod-gray mb-2"
                >
                  Tell Us About Your Dream Trip{" "}
                  <span className="text-riksja-red">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share your travel preferences, must-see places, travel dates, and any special requirements..."
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-riksja-red/50 transition-colors resize-none ${
                    errors.message
                      ? "border-riksja-red bg-riksja-red/5"
                      : "border-gray-200 focus:border-riksja-red"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-riksja-red flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-riksja-red hover:bg-riksja-red/90 disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-center text-sm text-cod-gray/50">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-riksja-red hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
