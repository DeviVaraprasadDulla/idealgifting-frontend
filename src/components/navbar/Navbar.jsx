import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";

import { getMegaMenu } from "../../api/categoryApi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import MiniCartDrawer from "../cart/MiniCartDrawer";
import API from "../../api/axios";

import logoHorizontal from "../../assets/logos/logo-horizontal.png";

const NAVBAR_HEIGHT = 95;

const Navbar = ({ topOffset = 0 }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const userRef = useRef(null);

  /* ================= Scroll Shrink ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Load Categories ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMegaMenu();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /* ================= Close On Route Change ================= */
  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setExpandedMobileCat(null);
    setActiveMenu(null);
    setUserOpen(false);
  }, [location]);

  /* ================= Close User Dropdown ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= Live Search ================= */
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await API.get(`/products/search/?q=${search}`);
        setSearchResults(res.data);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const activeCategory = categories.find((c) => c.id === activeMenu);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ top: topOffset }}
        className={`fixed left-0 right-0 z-[50] transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-white/95 backdrop-blur py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={logoHorizontal}
              alt="Ideal Gifting"
              className={scrolled ? "h-8" : "h-10"}
            />
          </Link>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-12 font-medium">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative group"
                onMouseEnter={() => setActiveMenu(cat.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={`/products/category/${cat.slug}`}
                  className="relative text-gray-800 hover:text-black pb-1"
                >
                  {cat.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-6 relative">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search gifts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm border rounded-full w-64"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              {showSuggestions && searchResults.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl border z-[60]">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.id}`}
                      className="flex gap-3 px-4 py-3 hover:bg-gray-100"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-gray-500">₹{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart size={22} />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative" ref={userRef}>
              {!user ? (
                <Link to="/login">
                  <User size={22} />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm"
                  >
                    {user.username?.charAt(0).toUpperCase()}
                  </button>

                  <AnimatePresence>
                    {userOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 mt-4 w-52 bg-white shadow-xl rounded-xl border"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-3 text-sm hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setMobileSearchOpen(true)}>
              <Search size={22} />
            </button>

            <button onClick={() => setCartOpen(true)}>
              <ShoppingCart size={22} />
            </button>

            <button onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MEGA DROPDOWN ================= */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            onMouseEnter={() => setActiveMenu(activeCategory.id)}
            onMouseLeave={() => setActiveMenu(null)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ top: topOffset + NAVBAR_HEIGHT }}
            className="fixed left-0 w-full bg-white shadow-xl border-t z-[40]"
          >
            <div className="max-w-7xl mx-auto px-16 py-14 grid grid-cols-4 gap-14">
              <div className="col-span-3 grid grid-cols-3 gap-10">
                {activeCategory?.subcategories?.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/products/category/${activeCategory.slug}?subcategory=${sub.slug}`}
                    className="text-gray-700 hover:text-black text-sm"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>

              <div>
                <img
                  src={activeCategory?.image}
                  alt=""
                  className="rounded-xl h-56 w-full object-cover shadow-md"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-white z-[100] p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-10">
              <img src={logoHorizontal} alt="logo" className="h-8" />
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Mobile User */}
            {!user ? (
              <Link to="/login" className="block mb-6 font-medium">
                Login
              </Link>
            ) : (
              <div className="mb-6">
                <p className="font-semibold mb-2">{user.username}</p>
                <Link to="/profile" className="block mb-2">
                  My Profile
                </Link>
                <Link to="/orders" className="block mb-2">
                  My Orders
                </Link>
                <button onClick={logout} className="text-red-500">
                  Logout
                </button>
              </div>
            )}

            <hr className="my-6" />

            {/* Categories Accordion */}
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() =>
                      setExpandedMobileCat(
                        expandedMobileCat === cat.id ? null : cat.id,
                      )
                    }
                    className="w-full flex justify-between items-center text-lg font-medium border-b pb-4"
                  >
                    {cat.name}
                    <span>{expandedMobileCat === cat.id ? "−" : "+"}</span>
                  </button>

                  <AnimatePresence>
                    {expandedMobileCat === cat.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden pl-4 mt-3 space-y-3"
                      >
                        {cat.subcategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/products/category/${cat.slug}?subcategory=${sub.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block text-gray-600 hover:text-black text-sm"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ================= MOBILE SEARCH OVERLAY ================= */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[999] p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Search</h2>
              <button onClick={() => setMobileSearchOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mb-6">
              <input
                autoFocus
                type="text"
                placeholder="Search gifts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border rounded-full"
              />
            </form>

            <div className="space-y-4">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  onClick={() => setMobileSearchOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MiniCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
