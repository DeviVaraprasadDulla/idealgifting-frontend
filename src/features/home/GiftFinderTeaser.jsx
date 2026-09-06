import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../../api/taxonomyApi";
import { RECIPIENT_META, DEFAULT_META } from "../../data/taxonomyMeta";
import Reveal from "../../components/common/Reveal";

function GiftFinderTeaser() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    getTaxonomy("recipient").then((res) => setRecipients(res.data.slice(0, 4))).catch(() => setRecipients([]));
  }, []);

  return (
    <section className="sec">
      <div className="wrap">
        <Reveal className="finder" data-world="love">
          <span className="eyebrow" style={{ color: "var(--peach)" }}>The Ideal gift finder</span>
          <h2 className="d2" style={{ margin: "18px 0 12px", maxWidth: "20ch" }}>Not sure what to gift?</h2>
          <p className="lede">
            Tell us who you're celebrating, and we'll help you find something unforgettable.
            Four questions, about thirty seconds.
          </p>

          {recipients.length > 0 && (
            <div className="opt-grid">
              {recipients.map((r) => {
                const meta = RECIPIENT_META[r.value] || DEFAULT_META;
                return (
                  <Link key={r.id} className="opt" to={`/finder?rec=${r.id}`}>
                    <span className="big">{meta.glyph}</span>
                    <b>{r.value}</b>
                    <small>{meta.line}</small>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="finder-foot">
            <p className="sm" style={{ color: "rgba(245,234,219,.7)" }}>
              Or start from scratch — we'll ask about the occasion, budget and mood.
            </p>
            <Link className="btn btn-peach" to="/finder">
              Help me find the perfect gift <span className="arw">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default GiftFinderTeaser;
