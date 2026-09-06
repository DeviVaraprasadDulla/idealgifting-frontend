import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts, getProducts } from "../api/productApi";
import { getTaxonomy } from "../api/taxonomyApi";
import { OCCASION_META, DEFAULT_META } from "../data/taxonomyMeta";

const QUICK_OCCASIONS = ["Birthday", "Anniversary", "Baby & Kids", "Raksha Bandhan", "Wedding", "Corporate"];

/**
 * Exact reproduction of the reference's hero: a copy column (eyebrow,
 * headline with an italic emphasis word, lede, CTAs, quick occasion
 * chips, proof stats) beside a "showcase" product-deck carousel that
 * auto-advances, fans real products by data-off offset, and shifts the
 * section's color world to the active product - all real product data,
 * no fabricated business statistics.
 */
function HeroSection() {
  const [showcase, setShowcase] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [stats, setStats] = useState(null);
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    getFeaturedProducts().then((res) => setShowcase(res.data.slice(0, 5))).catch(() => {});
    getTaxonomy("occasion").then((res) => setOccasions(res.data)).catch(() => {});
    getProducts().then((res) => {
      const products = res.data;
      const totalReviews = products.reduce((s, p) => s + (p.rating_count || 0), 0);
      const avg = totalReviews
        ? (products.reduce((s, p) => s + p.average_rating * (p.rating_count || 0), 0) / totalReviews).toFixed(1)
        : null;
      setStats({ count: products.length, avg, totalReviews });
    }).catch(() => {});
  }, []);

  const n = showcase.length;

  const play = () => {
    clearInterval(timerRef.current);
    if (hoveringRef.current || n === 0) return;
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % n), 5000);
  };

  useEffect(() => {
    play();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  if (n === 0) return null;

  const activeProduct = showcase[active];
  const quickChips = occasions.filter((o) => QUICK_OCCASIONS.includes(o.value));

  const offsetFor = (k) => {
    let off = k - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return Math.abs(off) > 2 ? 3 : off;
  };

  return (
    <section className="hero" data-world={OCCASION_META[activeProduct.category_name]?.world || "love"}>
      <div className="hero-in">
        <div>
          <span className="eyebrow">Personalised gifting studio · India</span>
          <h1 style={{ marginTop: 20 }}>
            Your <em>story</em> deserves more than a gift.
          </h1>
          <p className="lede">
            Frames, hampers and keepsakes built around your people, your moments and your
            photographs — designed one at a time, previewed before they're printed.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-lg" to="/finder">
              Find the perfect gift <span className="arw">→</span>
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/products">
              Explore our creations
            </Link>
          </div>

          {quickChips.length > 0 && (
            <div className="hero-quick">
              <span className="lbl">So… what are we celebrating?</span>
              <div className="chips">
                {quickChips.map((o) => {
                  const meta = OCCASION_META[o.value] || DEFAULT_META;
                  return (
                    <Link key={o.id} className="chip" to={`/occasions/${o.id}`}>
                      {meta.glyph} {o.value}
                    </Link>
                  );
                })}
              </div>

              {stats && (
                <div className="hero-proof">
                  <div><b>{stats.count}</b><span>Handpicked gifts</span></div>
                  {stats.avg && (
                    <div><b>{stats.avg}★</b><span>From {stats.totalReviews}+ reviews</span></div>
                  )}
                  <div><b>Pan-India</b><span>Doorstep delivery</span></div>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="showcase"
          onMouseEnter={() => { hoveringRef.current = true; clearInterval(timerRef.current); }}
          onMouseLeave={() => { hoveringRef.current = false; play(); }}
        >
          <div className="stage">
            <span className="stage-tag">{activeProduct.category_name}</span>
            {showcase.map((p, i) => (
              <Link
                key={p.id}
                className="slide"
                to={`/products/${p.slug}`}
                data-off={offsetFor(i)}
                aria-label={p.name}
                onMouseEnter={() => { if (offsetFor(i) !== 0) setActive(i); }}
              >
                <div className="art">
                  {p.images?.[0]?.image && <img src={p.images[0].image} alt={p.name} />}
                </div>
              </Link>
            ))}
          </div>

          <div className="showcase-foot">
            <div className="fade-cap" key={activeProduct.id}>
              <h3>{activeProduct.name}</h3>
              <p>{activeProduct.description?.slice(0, 90)}</p>
              <div className="meta">
                <b className="price">₹{activeProduct.discounted_price}</b>
                <span className="muted">·</span>
                <Link className="p-cta" to={`/products/${activeProduct.slug}`}>
                  Personalise it <span>→</span>
                </Link>
              </div>
            </div>

            <div className="dots" role="tablist" aria-label="Featured keepsakes">
              {showcase.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-current={i === active}
                  aria-label={p.name}
                  onClick={() => { setActive(i); play(); }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
