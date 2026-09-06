import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductDetail } from "../../api/productApi";
import { worldFor } from "../../data/taxonomyMeta";

// The reference's own suggested-search phrases (its renderSearch empty
// state) - generic UI copy, not business data, reproduced verbatim.
const QUICK_SEARCHES = [
  "Looking for something emotional?",
  "A gift under ₹1,000",
  "Something for my sister",
  "Baby milestone",
  "Corporate awards",
  "Netflix frame",
];

// The reference's own "People keep coming back to" picks - real products
// in this business's actual catalogue (seeded verbatim from the
// reference's own PRODUCTS array), fetched by their real slugs.
const RECOMMENDED_SLUGS = ["magazine", "photobook", "netflix-frame"];

const SearchHit = ({ id, slug, name, price, image, category_name, filters, onClose }) => (
  <Link className="s-hit" to={`/products/${slug || id}`} data-world={worldFor({ filters })} onClick={onClose}>
    <span className="mini">
      {image && <img src={image} alt="" style={{ width: "100%", borderRadius: 8 }} />}
    </span>
    <span>
      <b style={{ fontFamily: "var(--f-d)", fontSize: "0.98rem", display: "block", lineHeight: 1.2 }}>
        {name}
      </b>
      <span className="xs muted">₹{price}{category_name ? ` · ${category_name}` : ""}</span>
    </span>
  </Link>
);

/**
 * Exact reproduction of the reference's .search-ov fullscreen overlay
 * (backdrop, .search-field giant input, .s-res results grid, .s-hit
 * cards) - including its empty-query "Try something like" quick chips +
 * "People keep coming back to" picks, and its no-results copy pointing
 * to the gift finder. The actual search call/debounce lives in Navbar
 * and is passed in as props; this component is wired to the real
 * product search API throughout.
 */
const SearchOverlay = ({ open, onClose, value, onChange, onQuickSearch, onSubmit, results }) => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!open || recommended.length > 0) return;
    Promise.all(RECOMMENDED_SLUGS.map((slug) => getProductDetail(slug).then((res) => res.data).catch(() => null)))
      .then((data) => setRecommended(data.filter(Boolean)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const trimmed = value.trim();

  return (
    <div className={`search-ov${open ? " on" : ""}`} role="dialog" aria-label="Search">
      <div className="search-in">
        <form className="search-field" onSubmit={onSubmit}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            id="search-input"
            type="search"
            value={value}
            onChange={onChange}
            placeholder="Who or what are we celebrating today?"
            aria-label="Search gifts"
            autoFocus={open}
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </form>

        {trimmed === "" && (
          <div style={{ marginTop: 34 }}>
            <span className="eyebrow">Try something like</span>
            <div className="chips" style={{ marginTop: 14 }}>
              {QUICK_SEARCHES.map((s) => (
                <button key={s} type="button" className="chip" onClick={() => onQuickSearch(s)}>
                  {s}
                </button>
              ))}
            </div>

            {recommended.length > 0 && (
              <div style={{ marginTop: 34 }}>
                <span className="eyebrow">People keep coming back to</span>
                <div className="s-res" style={{ marginTop: 14 }}>
                  {recommended.map((p) => (
                    <SearchHit
                      key={p.id}
                      id={p.id}
                      slug={p.slug}
                      name={p.name}
                      price={p.discounted_price}
                      image={p.images?.[0]?.image}
                      category_name={p.category_name}
                      filters={p.filters}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {trimmed !== "" && results.length > 0 && (
          <>
            <p className="sm muted" style={{ marginTop: 22 }}>
              {results.length} gift{results.length > 1 ? "s" : ""} match "{trimmed}"
            </p>
            <div className="s-res" style={{ marginTop: 14 }}>
              {results.map((item) => (
                <SearchHit key={item.id} {...item} onClose={onClose} />
              ))}
            </div>
          </>
        )}

        {trimmed !== "" && results.length === 0 && (
          <div style={{ marginTop: 30 }}>
            <h3 className="d3">No match for "{trimmed}" — yet.</h3>
            <p className="lede" style={{ marginTop: 10 }}>
              Try an occasion (birthday, rakhi, wedding), a person (mom, sister, colleague) or a feeling
              (emotional, proud).
            </p>
            <Link className="btn btn-peach" style={{ marginTop: 18 }} to="/finder" onClick={onClose}>
              Let the gift finder help <span className="arw">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
