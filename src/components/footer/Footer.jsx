import { Link, useNavigate } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/logos/logo-inverse.png";

function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-navy text-cream/70 pt-16 pb-8">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <img src={logo} alt="IdealGifting" className="h-14 mb-4" />

          <p className="text-sm leading-relaxed mb-4">
            At Ideal Gifting, we design emotion-driven personalized gifts
            crafted with love to celebrate your most meaningful moments.
          </p>

          <p className="text-sm">
            <span className="text-ivory font-medium">Business Hours:</span>
            <br />
            Mon – Sat: 9 AM – 9 PM <br />
            Sunday: Holiday
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-peach mb-4">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                onClick={() => handleNavigate("/")}
                className="hover:text-accent transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={() => handleNavigate("/about")}
                className="hover:text-accent transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                onClick={() => handleNavigate("/cart")}
                className="hover:text-accent transition"
              >
                Cart
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                onClick={() => handleNavigate("/orders")}
                className="hover:text-accent transition"
              >
                My Orders
              </Link>
            </li>

            <li>
              <Link
                to="/privacy-policy"
                onClick={() => handleNavigate("/privacy-policy")}
                className="hover:text-accent transition"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/refund-policy"
                onClick={() => handleNavigate("/refund-policy")}
                className="hover:text-accent transition"
              >
                Refund Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms"
                onClick={() => handleNavigate("/terms")}
                className="hover:text-accent transition"
              >
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() => handleNavigate("/contact")}
                className="hover:text-accent transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFORMATION */}
        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-peach mb-4">
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
              <Phone size={16} />
              <a href="tel:6305540600" className="hover:text-accent transition">
                9346325483
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
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:idealgifting.in@gmail.com"
                className="hover:text-accent transition"
              >
                anveshawar.ig@gmail.com
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
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-peach mb-4">Follow Us</h3>

          <div className="flex gap-3">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.instagram.com/idealgifting/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full grid place-items-center shadow-[inset_0_0_0_1.2px_rgba(245,234,219,.22)] hover:bg-peach hover:text-navy transition-colors"
            >
              <Instagram size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.facebook.com/idealgifting.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full grid place-items-center shadow-[inset_0_0_0_1.2px_rgba(245,234,219,.22)] hover:bg-peach hover:text-navy transition-colors"
            >
              <Facebook size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://wa.me/916305540600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full grid place-items-center shadow-[inset_0_0_0_1.2px_rgba(245,234,219,.22)] hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle size={18} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-cream/10 mt-12 pt-6 text-center text-sm text-cream/50">
        © {new Date().getFullYear()} IdealGifting. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
