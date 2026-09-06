import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../../api/taxonomyApi";
import { FEELING_META, DEFAULT_META } from "../../data/taxonomyMeta";

function FeelingsSection() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTaxonomy("feeling")
      .then((res) => setOptions(res.data))
      .catch(() => setOptions([]));
  }, []);

  if (options.length === 0) return null;

  return (
    <section className="py-[clamp(56px,7.5vw,110px)] bg-gradient-to-b from-transparent to-cream/40">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Start with the feeling
          </span>
          <h2 className="text-d2 text-navy mt-3">What do you want them to feel?</h2>
          <p className="text-muted mt-2">Pick the reaction you're after. We'll show you the gifts that get it.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-[clamp(14px,1.7vw,24px)]">
          {options.map((opt) => {
            const meta = FEELING_META[opt.value] || DEFAULT_META;
            return (
              <Link
                key={opt.id}
                to={`/feelings/${opt.id}`}
                data-world={meta.world}
                className="bg-world-soft rounded-rl p-6 text-left transition-transform hover:-translate-y-1"
              >
                <div className="text-2xl mb-3">{meta.glyph}</div>
                <h3 className="font-display font-semibold text-navy mb-1">{opt.value}</h3>
                <p className="text-sm text-muted">{meta.line}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeelingsSection;
