import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import Reveal from "../../components/common/Reveal";

/**
 * Exact .stories / .story card treatment. Since the real Review model
 * has no text field, each "story" card shows real per-product rating
 * data rather than an invented customer quote.
 */
function StoriesPreview() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getProducts({ sort: "best_selling" })
      .then((res) => {
        const rated = res.data
          .filter((p) => (p.rating_count || 0) > 0)
          .sort((a, b) => b.average_rating - a.average_rating)
          .slice(0, 3);
        setTopRated(rated);
      })
      .catch(() => setTopRated([]));
  }, []);

  if (topRated.length === 0) return null;

  return (
    <section className="sec" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <span className="eyebrow">Customer stories</span>
            <h2 className="d2" style={{ marginTop: 16 }}>Loved, one gift at a time ❤️</h2>
            <p className="lede">Real ratings from real orders.</p>
          </div>
          <Link className="btn btn-ghost" to="/stories">
            Read all stories <span className="arw">→</span>
          </Link>
        </Reveal>

        <div className="stories">
          {topRated.map((p, i) => (
            <Reveal as={Link} key={p.id} index={i} className="story" to={`/products/${p.slug}`}>
              <q>{p.name} — {p.average_rating}★ from {p.rating_count} real review{p.rating_count !== 1 ? "s" : ""}.</q>
              <div className="who">
                <span className="avatar">{p.category_name?.charAt(0) || "★"}</span>
                <div>
                  <b style={{ display: "block", fontFamily: "var(--f-d)", fontSize: "0.95rem" }}>{p.category_name}</b>
                  <span className="stars">{"★".repeat(Math.round(p.average_rating))}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoriesPreview;
