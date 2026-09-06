import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../../api/taxonomyApi";
import { RECIPIENT_META, DEFAULT_META } from "../../data/taxonomyMeta";
import Button from "../../components/ui/Button";

function GiftFinderTeaser() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    getTaxonomy("recipient")
      .then((res) => setRecipients(res.data.slice(0, 4)))
      .catch(() => setRecipients([]));
  }, []);

  return (
    <section className="py-[clamp(56px,7.5vw,110px)]">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        <div
          data-world="love"
          className="relative overflow-hidden rounded-rxl bg-gradient-to-br from-navy via-navy to-[#132A50] text-cream p-[clamp(26px,4vw,58px)]"
        >
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-peach">
            The Ideal Gift Finder
          </span>
          <h2 className="text-d2 text-ivory mt-3 max-w-lg">Not sure what to gift?</h2>
          <p className="text-ivory/70 mt-3 max-w-md">
            Tell us who you're celebrating, and we'll help you find something unforgettable.
            Four questions, about thirty seconds.
          </p>

          {recipients.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-2xl">
              {recipients.map((opt) => {
                const meta = RECIPIENT_META[opt.value] || DEFAULT_META;
                return (
                  <Link
                    key={opt.id}
                    to={`/recipients/${opt.id}`}
                    className="text-left p-4 rounded-rm bg-ivory/[0.07] shadow-[inset_0_0_0_1.2px_rgba(252,248,241,.15)] hover:bg-peach/[0.16] transition-colors"
                  >
                    <div className="text-xl mb-1">{meta.glyph}</div>
                    <div className="font-display font-semibold text-sm">{opt.value}</div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="mt-8">
            <Button to="/finder" variant="peach" size="lg">
              Help me find the perfect gift →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftFinderTeaser;
