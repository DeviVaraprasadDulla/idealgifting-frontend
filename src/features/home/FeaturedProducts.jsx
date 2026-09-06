import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/components/ProductCard";
import { getFeaturedProducts } from "../../api/productApi";
import Reveal from "../../components/common/Reveal";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <span className="eyebrow">Featured</span>
            <h2 className="d2" style={{ marginTop: 16 }}>Crafted for memories. Made for smiles.</h2>
            <p className="lede">The pieces people order again and again — usually for someone entirely different.</p>
          </div>
          <Link className="btn btn-ghost" to="/products">
            Shop all gifts <span className="arw">→</span>
          </Link>
        </Reveal>

        {loading ? (
          <div className="p-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card" style={{ height: 340 }} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="p-grid">
            {products.map((product, i) => (
              <Reveal as="div" key={product.id} index={i}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="lede center">No featured products available yet.</p>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
