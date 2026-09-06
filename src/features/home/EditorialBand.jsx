import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../api/productApi";
import Reveal from "../../components/common/Reveal";

/**
 * Exact reproduction of the reference's dark "signature gifts" editorial
 * band (.editorial / .ed-row, alternating direction). Quotes are generic,
 * evocative marketing copy built from each real product's own name/
 * category - never a fabricated factual claim (page counts, specific
 * material details, etc. that don't apply to our real catalog).
 */
function EditorialBand() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts().then((res) => setProducts(res.data.slice(0, 4))).catch(() => setProducts([]));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="editorial sec">
      <div className="wrap">
        <span className="eyebrow">Signature gifts</span>
        <h2 className="d2" style={{ margin: "18px 0 34px", maxWidth: "16ch", color: "var(--ivory)" }}>
          The pieces we're quietly proud of.
        </h2>

        {products.map((p, i) => (
          <Reveal as="div" key={p.id} index={i} className="ed-row" data-world="love">
            <div className="ed-media">
              <div className="art">
                {p.images?.[0]?.image && <img src={p.images[0].image} alt={p.name} />}
              </div>
            </div>
            <div>
              <p className="ed-quote">"{p.name} — made to be felt, not just unwrapped."</p>
              <p className="lede" style={{ marginTop: 18 }}>{p.description}</p>
              <div className="ed-meta">
                <span>{p.category_name}</span>
                <span>·</span>
                <span>₹{p.discounted_price}</span>
              </div>
              <Link className="btn btn-peach" style={{ marginTop: 22 }} to={`/products/${p.slug}`}>
                Personalise it →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default EditorialBand;
