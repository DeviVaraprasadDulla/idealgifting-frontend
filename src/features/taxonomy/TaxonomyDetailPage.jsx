import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageBanner from "../../components/common/PageBanner";
import ProductCard from "../products/components/ProductCard";
import { getTaxonomy } from "../../api/taxonomyApi";
import { getProducts } from "../../api/productApi";

/**
 * Shared detail page for a single taxonomy option (one Occasion or one
 * Recipient). Product results always come from the real
 * /api/products/?filters=<id> endpoint - never a hardcoded list.
 */
function TaxonomyDetailPage({ taxonomyName, backPath, backLabel, metaMap, defaultMeta }) {
  const { id } = useParams();
  const [option, setOption] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    getTaxonomy(taxonomyName)
      .then(async (res) => {
        const match = res.data.find((o) => String(o.id) === String(id));
        if (!match) {
          if (active) {
            setNotFound(true);
            setLoading(false);
          }
          return;
        }
        if (active) setOption(match);

        const productsRes = await getProducts({ filters: [id] });
        if (active) {
          setProducts(productsRes.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [taxonomyName, id]);

  if (notFound) {
    return (
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-24 text-center">
        <h2 className="text-d3 text-navy mb-3">We couldn't find that one.</h2>
        <a href={backPath} className="text-peach-deep font-semibold">
          ← {backLabel}
        </a>
      </div>
    );
  }

  const meta = option ? metaMap[option.value] || defaultMeta : defaultMeta;

  return (
    <div>
      <PageBanner
        eyebrow={loading ? "Loading" : `${taxonomyName.charAt(0).toUpperCase() + taxonomyName.slice(1)} · ${option?.value}`}
        title={meta.line || option?.value || ""}
        world={meta.world}
        glyph={meta.glyph}
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,1.7vw,24px)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-paper rounded-rl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-paper rounded-rl shadow-card">
            <p className="text-navy font-display font-semibold text-lg mb-2">
              Nothing here yet — we're still growing this collection.
            </p>
            <a href={backPath} className="text-peach-deep font-semibold text-sm">
              ← {backLabel}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(14px,1.7vw,24px)]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaxonomyDetailPage;
