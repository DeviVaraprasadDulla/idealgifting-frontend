import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo-inverse.png";

const SHOP_LINKS = [
  ["/products", "All gifts"],
  ["/occasions", "Shop by occasion"],
  ["/recipients", "Shop by recipient"],
  ["/corporate", "Corporate gifting"],
];

const HELP_LINKS = [
  ["/how", "How it works"],
  ["/orders", "Track your order"],
  ["/faq", "FAQ"],
  ["/contact", "Contact us"],
];

const EXPLORE_LINKS = [
  ["/finder", "Gift finder"],
  ["/stories", "Customer stories"],
  ["/about", "About the studio"],
  ["/wishlist", "Your saved ideas"],
  ["/privacy-policy", "Privacy Policy"],
  ["/terms", "Terms & Conditions"],
  ["/refund-policy", "Refund Policy"],
];

/**
 * Exact reproduction of the reference's .foot / .foot-cta / .foot-grid /
 * .foot-bottom structure, with real app routes in place of the
 * reference's fictional collection links.
 */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-cta">
          <span className="eyebrow center">Ideal Gifting</span>
          <h2 style={{ marginTop: 18 }}>
            Every gift has a story <em className="wonky">waiting to be told.</em>
          </h2>
          <p className="lede" style={{ color: "rgba(245,234,219,.7)", margin: "18px auto 26px", textAlign: "center" }}>
            Tell us yours — the people, the moment, the reason. We'll handle the rest.
          </p>
          <Link className="btn btn-peach btn-lg" to="/finder">
            Find my ideal gift <span className="arw">→</span>
          </Link>
        </div>

        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logo} alt="Ideal Gifting" />
            <p style={{ color: "rgba(245,234,219,.7)", fontSize: "0.92rem", maxWidth: "34ch" }}>
              At Ideal Gifting, we design emotion-driven personalised gifts crafted with love
              to celebrate your most meaningful moments.
            </p>
            <div className="social" style={{ marginTop: 20 }}>
              <a href="https://www.instagram.com/idealgifting/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.5" />
                  <circle cx="12" cy="12" r="4.1" />
                  <circle cx="17.15" cy="6.85" r="0.2" fill="currentColor" strokeWidth="1.9" />
                </svg>
              </a>
              <a href="https://www.facebook.com/idealgifting.in" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z" />
                </svg>
              </a>
              <a href="https://wa.me/916305540600" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
                  <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.6 1.36 5.1L2 22l5.05-1.32A9.94 9.94 0 0 0 12.02 22c5.52 0 10-4.48 10-10S17.54 2 12.02 2zm0 18.15c-1.61 0-3.19-.43-4.56-1.25l-.33-.19-3.28.86.88-3.2-.21-.33a8.15 8.15 0 0 1-1.25-4.34c0-4.51 3.67-8.18 8.18-8.18a8.13 8.13 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.79c0 4.51-3.67 8.18-8.18 8.18z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>Shop</h4>
            {SHOP_LINKS.map(([href, label]) => <Link key={href} to={href}>{label}</Link>)}
          </div>

          <div>
            <h4>Help</h4>
            {HELP_LINKS.map(([href, label]) => <Link key={href} to={href}>{label}</Link>)}
          </div>

          <div>
            <h4>Explore</h4>
            {EXPLORE_LINKS.map(([href, label]) => <Link key={href} to={href}>{label}</Link>)}
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Ideal Gifting · Designed &amp; made in India</span>
          <span>Personalised gifts, crafted with love.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
