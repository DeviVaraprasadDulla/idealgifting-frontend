import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===============================
  // NOT LOGGED IN
  // ===============================
  if (!user) {
    return (
      <a href="/login" className="font-medium hover:text-accent transition">
        Login
      </a>
    );
  }

  // ===============================
  // LOGGED IN
  // ===============================
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-medium hover:text-accent transition"
      >
        👤 {user.username}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden z-50"
          >
            <a
              href="/profile"
              className="block px-4 py-3 text-sm hover:bg-gray-100 transition"
            >
              My Profile
            </a>

            <a
              href="/orders"
              className="block px-4 py-3 text-sm hover:bg-gray-100 transition"
            >
              My Orders
            </a>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 text-red-500 transition"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
