import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, X, ChevronDown, Heart } from "lucide-react";

import { getMegaMenu } from "../../api/categoryApi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import MiniCartDrawer from "../cart/MiniCartDrawer";
import SearchOverlay from "./SearchOverlay";
import API from "../../api/axios";

import logoHorizontal from "../../assets/logos/logo-horizontal.png";

export const NAVBAR_HEIGHT = 88;

const Navbar = ({ topOffset = 0 }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const userRef = useRef(null);

  /* ================= Scroll Shrink ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Load Categories (real mega-menu API) ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMegaMenu();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /* ================= Close On Route Change ================= */
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
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

  /* ================= Live Search (real API, unchanged) ================= */
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await API.get(`/products/search/?q=${search}`);
        setSearchResults(res.data);
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
    setSearchOpen(false);
  };

  const totalCartCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const activeCategory = Array.isArray(categories)
    ? categories.find((c) => c.id === activeMenu)
    : null;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        style={{ top: topOffset, height: NAVBAR_HEIGHT }}
        className={`fixed left-0 right-0 z-[55] transition-all duration-300 bg-ivory/90 backdrop-blur-lg border-b border-navy/[0.07] ${
          scrolled ? "shadow-[0_1px_0_rgba(15,33,64,.13),0_12px_30px_-26px_rgba(15,33,64,.5)]" : ""
        }`}
      >
        <div
          style={{ height: NAVBAR_HEIGHT }}
          className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] flex items-center gap-[18px]"
        >
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-1">
            <img
              src={logoHorizontal}
              alt="Ideal Gifting"
              className={`transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
            />
          </Link>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-1 font-medium flex-1">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(cat.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={`/products/category/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-[15px] py-[10px] rounded-full text-[0.9rem] text-navy hover:bg-navy/[0.04] transition-colors"
                >
                  {cat.name}
                  {cat.subcategories?.length > 0 && (
                    <ChevronDown size={14} className="opacity-60" />
                  )}
                </Link>
              </div>
            ))}

            <Link
              to="/occasions"
              className="px-[15px] py-[10px] rounded-full text-[0.9rem] text-navy hover:bg-navy/[0.04] transition-colors"
            >
              Occasions
            </Link>

            <Link
              to="/finder"
              className="px-[15px] py-[10px] rounded-full text-[0.9rem] text-navy hover:bg-navy/[0.04] transition-colors"
            >
              Gift Finder
            </Link>

            <Link
              to="/how"
              className="px-[15px] py-[10px] rounded-full text-[0.9rem] text-navy hover:bg-navy/[0.04] transition-colors"
            >
              How It Works
            </Link>

            <Link
              to="/corporate"
              className="px-[15px] py-[10px] rounded-full text-[0.9rem] text-navy hover:bg-navy/[0.04] transition-colors"
            >
              Corporate Gifting
            </Link>

            <Link
              to="/stories"
              className="px-[15px] py-[10px] rounded-full text-[0.9rem] text-navy hover:bg-navy/[0.04] transition-colors"
            >
              Our Stories
            </Link>
          </div>

          {/* Right controls (desktop + mobile) */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-[42px] h-[42px] rounded-full grid place-items-center hover:bg-navy/[0.05] transition text-navy"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden md:grid w-[42px] h-[42px] rounded-full place-items-center hover:bg-navy/[0.05] transition text-navy"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-[4px] right-[3px] min-w-[18px] h-[18px] px-[5px] rounded-full bg-peach-deep text-white text-[0.68rem] font-num font-extrabold grid place-items-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative w-[42px] h-[42px] rounded-full grid place-items-center hover:bg-navy/[0.05] transition text-navy"
            >
              <ShoppingCart size={20} />
              {totalCartCount > 0 && (
                <span className="absolute top-[4px] right-[3px] min-w-[18px] h-[18px] px-[5px] rounded-full bg-peach-deep text-white text-[0.68rem] font-num font-extrabold grid place-items-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User (desktop) */}
            <div className="relative hidden md:block" ref={userRef}>
              {!user ? (
                <Link
                  to="/login"
                  aria-label="Account"
                  className="w-[42px] h-[42px] rounded-full grid place-items-center hover:bg-navy/[0.05] transition text-navy"
                >
                  <User size={20} />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    className="w-[42px] h-[42px] rounded-full bg-navy text-ivory flex items-center justify-center text-sm font-display font-semibold"
                  >
                    {user.username?.charAt(0).toUpperCase()}
                  </button>

                  <AnimatePresence>
                    {userOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 mt-3 w-52 bg-paper shadow-elevated rounded-rm overflow-hidden py-2"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm text-navy hover:bg-navy/[0.04]"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-3 text-sm text-navy hover:bg-navy/[0.04]"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-3 text-sm text-burgundy hover:bg-burgundy/5"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="md:hidden w-[42px] h-[42px] rounded-full grid place-items-center hover:bg-navy/[0.05] transition text-navy"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MEGA DROPDOWN (desktop) ================= */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            onMouseEnter={() => setActiveMenu(activeCategory.id)}
            onMouseLeave={() => setActiveMenu(null)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ top: topOffset + NAVBAR_HEIGHT }}
            className="fixed left-0 w-full bg-paper shadow-[0_40px_60px_-40px_rgba(15,33,64,.4)] border-t border-navy/[0.07] z-[54] hidden md:block"
          >
            <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-12 grid grid-cols-4 gap-12">
              <div className="col-span-3 grid grid-cols-3 gap-8">
                {activeCategory?.subcategories?.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/products/category/${activeCategory.slug}?subcategory=${sub.slug}`}
                    className="block rounded-rm bg-world-soft px-4 py-4 text-navy text-sm font-medium hover:-translate-y-1 hover:shadow-card transition-all"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>

              <div>
                <img
                  src={activeCategory?.image}
                  alt=""
                  className="rounded-rl h-56 w-full object-cover shadow-card"
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
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 bg-ivory z-[130] p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <img src={logoHorizontal} alt="logo" className="h-8" />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full grid place-items-center hover:bg-navy/5"
              >
                <X size={22} className="text-navy" />
              </button>
            </div>

            {/* Mobile User */}
            {!user ? (
              <Link
                to="/login"
                className="block mb-6 font-display font-semibold text-navy text-lg"
              >
                Login / Sign up
              </Link>
            ) : (
              <div className="mb-6">
                <p className="font-display font-semibold text-navy mb-2">
                  {user.username}
                </p>
                <Link to="/profile" className="block mb-2 text-navy/80">
                  My Profile
                </Link>
                <Link to="/orders" className="block mb-2 text-navy/80">
                  My Orders
                </Link>
                <button onClick={logout} className="text-burgundy">
                  Logout
                </button>
              </div>
            )}

            <hr className="my-6 border-navy/10" />

            <div className="space-y-1 mb-4">
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 font-medium text-navy/80"
              >
                Wishlist
                {wishlistItems.length > 0 && (
                  <span className="bg-peach-deep text-white text-xs font-num font-bold px-2 py-0.5 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                to="/how"
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-medium text-navy/80"
              >
                How It Works
              </Link>
              <Link
                to="/corporate"
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-medium text-navy/80"
              >
                Corporate Gifting
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-medium text-navy/80"
              >
                FAQ
              </Link>
            </div>

            <hr className="my-2 border-navy/10" />

            {/* Categories Accordion */}
            <div className="space-y-1">
              {categories.map((cat) => (
                <div key={cat.id} className="border-b border-navy/10">
                  <button
                    onClick={() =>
                      setExpandedMobileCat(
                        expandedMobileCat === cat.id ? null : cat.id,
                      )
                    }
                    className="w-full flex justify-between items-center py-4 font-display font-semibold text-navy"
                  >
                    {cat.name}
                    <span className="text-xl leading-none">
                      {expandedMobileCat === cat.id ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedMobileCat === cat.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden pl-2 pb-4 space-y-3"
                      >
                        {cat.subcategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/products/category/${cat.slug}?subcategory=${sub.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block text-navy/70 text-sm"
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

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSearchSubmit}
        results={searchResults}
      />

      <MiniCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
