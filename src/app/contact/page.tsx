'use client';
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-14 transition-all duration-500">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 text-lg mb-10">
          We'd love to hear from you. Fill out the form and we’ll respond shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-base font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-base font-semibold text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/80"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
