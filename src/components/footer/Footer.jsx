import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import logo from "../../assets/logos/logo-inverse.png";

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <img src={logo} alt="IdealGifting" className="h-14 mb-4" />

          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            At Ideal Gifting, we design emotion-driven personalized gifts
            crafted with love to celebrate your most meaningful moments.
          </p>

          <p className="text-sm text-gray-400">
            <span className="text-white font-medium">Business Hours:</span>
            <br />
            Mon – Sat: 9 AM – 9 PM <br />
            Sunday: Holiday
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-accent transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-accent transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-accent transition">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/refund-policy">Refund Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFORMATION */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Information
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:6305540600" className="hover:text-accent transition">
                6305540600
              </a>
            </li>

            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:idealgifting.in@gmail.com"
                className="hover:text-accent transition"
              >
                idealgifting.in@gmail.com
              </a>
            </li>

            <li className="flex items-start gap-2">
              <MapPin size={16} />
              <span>
                Road No.4C, Kothapet,
                <br />
                Hyderabad
              </span>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/idealgifting/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E293B] hover:bg-accent transition p-3 rounded-full"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.facebook.com/idealgifting.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E293B] hover:bg-accent transition p-3 rounded-full"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://wa.me/916305540600"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E293B] hover:bg-green-500 transition p-3 rounded-full"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} IdealGifting. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
