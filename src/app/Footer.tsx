
// app/footer.tsx
import { FaFacebookF, FaTwitter, FaGithub } from 'react-icons/fa';  // import the icons
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Left Column: About */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">About PortfolioBuilder</h3>
            <p className="text-lg text-gray-300">
              A simple platform to create your online portfolio without any coding skills. Start building
              a professional presence today!
            </p>
          </div>

          {/* Middle Column: Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-500 transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-500 transition">About</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-yellow-500 transition">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-500 transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Social Links */}
         

<div>
  <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
  <div className="flex space-x-6">
    <Link href="https://facebook.com" className="text-gray-300 hover:text-blue-500 transition">
      <FaFacebookF /> {/* Facebook icon */}
    </Link>
    <Link href="https://twitter.com" className="text-gray-300 hover:text-blue-400 transition">
      <FaTwitter /> {/* Twitter icon */}
    </Link>
    <Link href="https://github.com" className="text-gray-300 hover:text-black transition">
      <FaGithub /> {/* GitHub icon */}
    </Link>
  </div>
</div>

        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-lg text-gray-400">
            &copy; {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
          </p>
          <div className="text-sm mt-2">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-yellow-500 transition">Privacy Policy</Link> |
            <Link href="/terms-of-service" className="text-gray-400 hover:text-yellow-500 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
