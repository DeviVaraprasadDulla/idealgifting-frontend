import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../../api/taxonomyApi";
import { OCCASION_META, DEFAULT_META } from "../../data/taxonomyMeta";
import Button from "../../components/ui/Button";

function OccasionMosaic() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTaxonomy("occasion")
      .then((res) => setOptions(res.data))
      .catch(() => setOptions([]));
  }, []);

  if (options.length === 0) return null;

  return (
    <section className="py-[clamp(56px,7.5vw,110px)] bg-cream/40">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
              Occasions
            </span>
            <h2 className="text-d2 text-navy mt-3">Every occasion has a story.</h2>
          </div>
          <Button to="/occasions" variant="ghost">
            See all occasions →
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
          {options.slice(0, 8).map((opt) => {
            const meta = OCCASION_META[opt.value] || DEFAULT_META;
            return (
              <Link
                key={opt.id}
                to={`/occasions/${opt.id}`}
                data-world={meta.world}
                className="relative bg-world-soft rounded-rl p-5 overflow-hidden transition-transform hover:-translate-y-1"
              >
                <span className="absolute top-3 right-3 text-[0.62rem] font-bold uppercase tracking-[0.1em] bg-paper/70 px-2 py-1 rounded-full text-world-deep">
                  {opt.product_count} gifts
                </span>
                <div className="w-11 h-11 rounded-[14px] bg-world grid place-items-center text-xl mb-3">
                  {meta.glyph}
                </div>
                <h3 className="font-display font-semibold text-navy">{opt.value}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OccasionMosaic;
