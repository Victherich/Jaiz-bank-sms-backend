// app/page.tsx

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 min-h-screen flex flex-col justify-center text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-8 space-y-6 md:space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide">
          Build Your Stunning Portfolio in Minutes
        </h1>
        <p className="text-lg md:text-xl">
          No coding experience required! Choose a template, customize it, and get online in no time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white py-3 px-6 rounded-full text-xl transition-all duration-300">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 py-3 px-6 rounded-full text-xl transition-all duration-300">
            Explore Templates
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-800">
        <h2 className="text-3xl text-center text-white font-semibold mb-8">
          Features that Make Your Portfolio Stand Out
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Customizable Templates</h3>
            <p>
              Choose from a variety of stunning templates and personalize them with your information.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Mobile-Friendly</h3>
            <p>
              Your portfolio will look great on any device, from mobile to desktop, without any extra work.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Instant Publishing</h3>
            <p>
              Publish your portfolio instantly, and get noticed by potential clients or employers.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 px-8 text-white">
        <h2 className="text-3xl text-center font-semibold mb-8">What Our Users Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl max-w-xs">
            <p className="text-lg font-semibold mb-4">"Amazing! My portfolio is live in minutes!"</p>
            <p className="italic">– Jane Doe, Web Developer</p>
          </div>
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl max-w-xs">
            <p className="text-lg font-semibold mb-4">"So easy to use, and the templates look professional."</p>
            <p className="italic">– John Smith, Graphic Designer</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center bg-black text-white py-16 px-8">
        <h2 className="text-3xl font-semibold mb-6">Ready to Build Your Portfolio?</h2>
        <p className="mb-6 text-lg md:text-xl">
          Join thousands of professionals who are showcasing their skills and landing their dream jobs.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-400 py-3 px-8 rounded-full text-xl transition-all duration-300">
          Start Building Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-6 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
