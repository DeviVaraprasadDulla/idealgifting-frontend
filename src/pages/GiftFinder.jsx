import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../api/taxonomyApi";
import { getProducts } from "../api/productApi";
import ProductCard from "../features/products/components/ProductCard";
import { RECIPIENT_META, OCCASION_META, DEFAULT_META } from "../data/taxonomyMeta";

const FEELING_META = {
  Emotional: { glyph: "🥹" },
  Surprised: { glyph: "😍" },
  Loved: { glyph: "❤️" },
  Proud: { glyph: "🏆" },
  Special: { glyph: "✨" },
};

const PRICE_META = {}; // price bands are self-explanatory, no glyph needed

const STEPS = [
  { key: "recipient", heading: "Who are we making smile?", taxonomy: "recipient", meta: RECIPIENT_META },
  { key: "occasion", heading: "And what's the beautiful reason?", taxonomy: "occasion", meta: OCCASION_META },
  { key: "band", heading: "What are we spending?", taxonomy: "price band", meta: PRICE_META },
  { key: "feeling", heading: "How do you want them to feel?", taxonomy: "feeling", meta: FEELING_META },
];

function GiftFinder() {
  const [optionsByStep, setOptionsByStep] = useState({});
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    Promise.all(STEPS.map((s) => getTaxonomy(s.taxonomy)))
      .then((responses) => {
        const map = {};
        STEPS.forEach((s, i) => {
          map[s.key] = responses[i].data;
        });
        setOptionsByStep(map);
      })
      .finally(() => setLoadingOptions(false));
  }, []);

  const choose = (stepKey, option) => {
    const nextAnswers = { ...answers, [stepKey]: option };
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (step < STEPS.length - 1) {
        setStep(step + 1);
      } else {
        runSearch(nextAnswers);
      }
    }, 220);
  };

  const runSearch = async (finalAnswers) => {
    setLoadingResults(true);
    setStep(STEPS.length);

    const selectedIds = Object.values(finalAnswers).map((o) => o.id);

    try {
      const res = await getProducts({ filters: selectedIds });

      // Real scoring: rank by how many of the selected real criteria each
      // real product actually matches (via the product's own tagged
      // filters), never a fabricated result set.
      const ranked = res.data
        .map((product) => {
          const productOptionIds = (product.filters || []).map((f) => f.filter_option);
          const matchCount = selectedIds.filter((id) => productOptionIds.includes(id)).length;
          return { product, matchCount };
        })
        .sort((a, b) => b.matchCount - a.matchCount || b.product.average_rating - a.product.average_rating)
        .slice(0, 8)
        .map((r) => r.product);

      setResults(ranked);
    } catch {
      setResults([]);
    } finally {
      setLoadingResults(false);
    }
  };

  const restart = () => {
    setAnswers({});
    setResults(null);
    setStep(0);
  };

  const currentWorld =
    step < STEPS.length && answers.occasion
      ? OCCASION_META[answers.occasion.value]?.world
      : answers.recipient
        ? RECIPIENT_META[answers.recipient.value]?.world
        : "love";

  return (
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(40px,6vw,72px)]">
      <div
        data-world={currentWorld}
        className="relative overflow-hidden rounded-rxl bg-gradient-to-br from-navy via-navy to-[#132A50] text-cream p-[clamp(26px,4vw,58px)]"
      >
        <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-peach">
          The Ideal Gift Finder
        </span>

        {loadingOptions ? (
          <p className="mt-8 text-ivory/70">Loading questions…</p>
        ) : step < STEPS.length ? (
          <>
            {/* progress */}
            <div className="flex gap-2 mt-6 mb-8">
              {STEPS.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-ivory/20 overflow-hidden">
                  <div
                    className="h-full bg-peach rounded-full transition-all duration-500"
                    style={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                  />
                </div>
              ))}
            </div>

            <h2 className="text-d3 text-ivory mb-6">{STEPS[step].heading}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(optionsByStep[STEPS[step].key] || []).map((opt) => {
                const meta = STEPS[step].meta[opt.value] || DEFAULT_META;
                const selected = answers[STEPS[step].key]?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => choose(STEPS[step].key, opt)}
                    className={`text-left p-5 rounded-rm transition-all ${
                      selected
                        ? "bg-peach text-navy"
                        : "bg-ivory/[0.07] shadow-[inset_0_0_0_1.2px_rgba(252,248,241,.15)] hover:bg-peach/[0.16] hover:-translate-y-1"
                    }`}
                  >
                    {meta.glyph && <div className="text-2xl mb-2">{meta.glyph}</div>}
                    <div className="font-display font-semibold">{opt.value}</div>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-8 text-sm text-ivory/70 hover:text-ivory"
              >
                ← Back
              </button>
            )}
          </>
        ) : (
          <div className="mt-4">
            <h2 className="text-d3 text-ivory mb-2">
              {loadingResults ? "Finding your ideal gifts…" : "Here's what we found for you"}
            </h2>
            <p className="text-ivory/70 mb-8">
              {Object.values(answers).map((a) => a.value).join(" · ")}
            </p>
          </div>
        )}
      </div>

      {step >= STEPS.length && !loadingResults && (
        <div className="mt-10">
          {results && results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-paper rounded-rl shadow-card">
              <p className="text-navy font-display font-semibold text-lg mb-2">
                We don't have an exact match yet.
              </p>
              <p className="text-muted text-sm mb-6">
                Tell us what you're after and the studio will help you find it.
              </p>
              <Link to="/contact" className="text-peach-deep font-semibold text-sm">
                Talk to the studio →
              </Link>
            </div>
          )}

          <div className="text-center mt-8">
            <button onClick={restart} className="text-sm text-muted hover:text-navy underline">
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiftFinder;
