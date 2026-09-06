import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../../api/taxonomyApi";
import { OCCASION_META, DEFAULT_META } from "../../data/taxonomyMeta";
import Reveal from "../../components/common/Reveal";

// Exact bento size-pattern from the reference's MOSAIC array.
const MOSAIC = ["big", "w3", "w3", "w2", "w2", "w2", "w3", "w3", "w3", "w3"];

function OccasionMosaic() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTaxonomy("occasion").then((res) => setOptions(res.data)).catch(() => setOptions([]));
  }, []);

  if (options.length === 0) return null;

  return (
    <section className="sec" style={{ background: "var(--cream)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <span className="eyebrow">Occasions</span>
            <h2 className="d2" style={{ marginTop: 16 }}>Every occasion has a story.</h2>
            <p className="lede">Real occasions, each with its own real collection.</p>
          </div>
          <Link className="btn btn-ghost" to="/occasions">
            See all occasions <span className="arw">→</span>
          </Link>
        </Reveal>

        <div className="mosaic">
          {options.map((opt, i) => {
            const meta = OCCASION_META[opt.value] || DEFAULT_META;
            const cls = MOSAIC[i] || "";
            return (
              <Reveal
                as={Link}
                key={opt.id}
                index={i}
                className={`occ ${cls}`}
                to={`/occasions/${opt.id}`}
                data-world={meta.world}
              >
                <span className="veil" aria-hidden="true" />
                <span className="glyph" aria-hidden="true">{meta.glyph}</span>
                <div className="occ-top">
                  <span className="icon-chip" aria-hidden="true"><span>{meta.glyph}</span></span>
                  <span className="cnt">{opt.product_count} gift{opt.product_count !== 1 ? "s" : ""}</span>
                </div>
                <span>
                  <b>{opt.value}</b>
                  {i < 2 && meta.line && (
                    <p className="sm" style={{ marginTop: 8, maxWidth: "26ch", position: "relative", zIndex: 2, color: "#54637C" }}>
                      {meta.line}
                    </p>
                  )}
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OccasionMosaic;
