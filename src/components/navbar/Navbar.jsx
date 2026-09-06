import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getTaxonomy } from "../../api/taxonomyApi";
import { getFeaturedProducts } from "../../api/productApi";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import MiniCartDrawer from "../cart/MiniCartDrawer";
import SearchOverlay from "./SearchOverlay";
import API from "../../api/axios";
import {
  SearchIcon,
  HeartIcon,
  AccountIcon,
  GiftBoxIcon,
  BurgerIcon,
  CloseIcon,
  ChevronIcon,
  FramesIcon,
  TrophiesIcon,
  PhotobooksIcon,
  InvitationsIcon,
} from "./navIcons";

import logoHorizontal from "../../assets/logos/logo-horizontal.png";

export const NAVBAR_HEIGHT = 76;

// Exact reproduction of the reference's 4 mega-menu "Collections" cards -
// icon, world, and description copied from its own megaCats array -
// mapped onto the real Category rows seeded alongside the reference
// catalog (same slugs: frames/trophies/photobooks/invitations).
const REFERENCE_COLLECTIONS = {
  frames: { label: "Frames", desc: "Love, family, baby, birthdays", world: "love", Icon: FramesIcon, href: "/frames" },
  trophies: { label: "Trophies", desc: "Awards for people, not offices", world: "achievement", Icon: TrophiesIcon, href: "/trophies" },
  photobooks: { label: "Photobooks", desc: "16 pages of your camera roll", world: "family", Icon: PhotobooksIcon, href: "/photobooks" },
  invitations: { label: "Invitations", desc: "Digital and printed, illustrated", world: "wedding", Icon: InvitationsIcon, href: "/invitations" },
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [featured, setFeatured] = useState(null);

  const [megaOpen, setMegaOpen] = useState(false); // mobile click-toggle only
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  /* ================= Live search (debounced) ================= */
  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }
    const debounce = setTimeout(async () => {
      try {
        const res = await API.get(`/products/search/?q=${encodeURIComponent(searchValue)}`);
        setSearchResults(res.data);
      } catch {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchValue)}`);
    setSearchOpen(false);
  };

  const totalCartCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  /* ================= Scroll shadow ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Load mega-menu data ================= */
  useEffect(() => {
    getTaxonomy("occasion").then((res) => setOccasions(res.data)).catch(() => {});
    getTaxonomy("recipient").then((res) => setRecipients(res.data)).catch(() => {});
    getFeaturedProducts()
      .then((res) => setFeatured(res.data?.[0] || null))
      .catch(() => {});
  }, []);

  /* ================= Close on route change ================= */
  useEffect(() => {
    setMegaOpen(false);
    setSearchOpen(false);
    setUserOpen(false);
  }, [location]);

  /* ================= Close user dropdown on outside click ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="nav-in">
          <Link className="brand" to="/">
            <img src={logoHorizontal} alt="Ideal Gifting" />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <div className="nav-item has-mega">
              <Link className="nav-link" to="/products">
                Shop Gifts
                <ChevronIcon className="chev" />
              </Link>

              <div className={`mega${megaOpen ? " open" : ""}`}>
                <div className="mega-in">
                  <div>
                    {/* Repurposed as the mobile menu below 900px - same panel, no separate drawer */}
                    <div className="only-mobile" style={{ marginBottom: 24 }}>
                      <span className="eyebrow">Menu</span>
                      <div className="mega-list">
                        {[
                          ["/products", "Shop gifts"],
                          ["/occasions", "Occasions"],
                          ["/finder", "Gift finder"],
                          ["/corporate", "Corporate gifting"],
                          ["/stories", "Our stories"],
                          ["/how", "How it works"],
                          ["/about", "About the studio"],
                        ].map(([href, label]) => (
                          <Link key={href} to={href}>{label}</Link>
                        ))}
                      </div>
                    </div>

                    <span className="eyebrow">Collections</span>
                    <div className="mega-cats" style={{ marginTop: 16 }}>
                      {Object.values(REFERENCE_COLLECTIONS).map(({ label, desc, world, Icon, href }) => (
                        <Link key={href} className="mega-cat" to={href} data-world={world}>
                          <span className="ico">
                            <Icon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </span>
                          <b>{label}</b>
                          <span>{desc}</span>
                        </Link>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 26, flexWrap: "wrap", marginTop: 26 }}>
                      <div>
                        <span className="eyebrow">By occasion</span>
                        <div className="mega-list">
                          {occasions.slice(0, 5).map((o) => (
                            <Link key={o.id} to={`/occasions/${o.id}`}>{o.value}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="eyebrow" style={{ visibility: "hidden" }}>.</span>
                        <div className="mega-list" style={{ marginTop: 0 }}>
                          {occasions.slice(5).map((o) => (
                            <Link key={o.id} to={`/occasions/${o.id}`}>{o.value}</Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="eyebrow">By recipient</span>
                        <div className="mega-list">
                          {recipients.slice(0, 5).map((r) => (
                            <Link key={r.id} to={`/recipients/${r.id}`}>{r.value}</Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mega-side" data-world="love">
                    <span className="eyebrow">Not sure yet?</span>
                    <h3 className="d3" style={{ margin: "14px 0 10px" }}>
                      Answer four questions. We'll do the thinking.
                    </h3>
                    <p className="sm muted" style={{ marginBottom: 18 }}>
                      Tell us who you're celebrating and how you want them to feel — we'll
                      shortlist the gifts worth considering.
                    </p>
                    <Link className="btn btn-peach" to="/finder">
                      Start the gift hunt <span className="arw">→</span>
                    </Link>

                    {featured && (
                      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--line-soft)" }}>
                        <span className="eyebrow">Featured gift</span>
                        <Link
                          to={`/products/${featured.slug}`}
                          style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 12 }}
                        >
                          <span className="art sq" style={{ width: 74, flex: "0 0 auto" }}>
                            {featured.images?.[0]?.image && (
                              <img src={featured.images[0].image} alt={featured.name} />
                            )}
                          </span>
                          <span>
                            <b style={{ fontFamily: "var(--f-d)", fontSize: "1.02rem" }}>
                              {featured.name}
                            </b>
                            <span className="sm muted" style={{ display: "block" }}>
                              ₹{featured.discounted_price}
                            </span>
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link className="nav-link" to="/occasions">Occasions</Link>
            <Link className="nav-link" to="/finder">Gift Finder</Link>
            <Link className="nav-link" to="/corporate">Corporate Gifting</Link>
            <Link className="nav-link" to="/stories">Our Stories</Link>
          </nav>

          <div className="nav-tools">
            <button className="icon-btn" aria-label="Search gifts" onClick={() => setSearchOpen(true)}>
              <SearchIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </button>

            <Link className="icon-btn" to="/wishlist" aria-label="Wishlist">
              <HeartIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <span className={`pip${wishlistItems.length > 0 ? " on" : ""}`}>{wishlistItems.length}</span>
            </Link>

            <div style={{ position: "relative" }} ref={userRef}>
              {!user ? (
                <Link className="icon-btn" to="/login" aria-label="Your account">
                  <AccountIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </Link>
              ) : (
                <>
                  <button className="icon-btn" aria-label="Your account" onClick={() => setUserOpen(!userOpen)}>
                    <AccountIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </button>
                  {userOpen && (
                    <div
                      className="card"
                      style={{ position: "absolute", right: 0, marginTop: 8, width: 200, padding: 8, zIndex: 60 }}
                    >
                      <Link to="/profile" className="nav-link" style={{ display: "block", borderRadius: 10 }}>My Profile</Link>
                      <Link to="/orders" className="nav-link" style={{ display: "block", borderRadius: 10 }}>My Orders</Link>
                      <button onClick={logout} className="nav-link" style={{ display: "block", width: "100%", textAlign: "left", color: "var(--burgundy, #7C2B3E)", borderRadius: 10 }}>
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <button className="icon-btn" id="btn-cart" aria-label="Your gift box" onClick={() => setCartOpen(true)}>
              <GiftBoxIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <span className={`pip${totalCartCount > 0 ? " on" : ""}`}>{totalCartCount}</span>
            </button>

            <button
              className="icon-btn burger"
              aria-label="Menu"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen(!megaOpen)}
            >
              {megaOpen ? (
                <CloseIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <BurgerIcon fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onQuickSearch={setSearchValue}
        onSubmit={handleSearchSubmit}
        results={searchResults}
      />
      <MiniCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
