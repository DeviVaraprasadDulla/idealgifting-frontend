import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonomy } from "../../api/taxonomyApi";
import { FEELING_META, DEFAULT_META } from "../../data/taxonomyMeta";
import Reveal from "../../components/common/Reveal";

function FeelingsSection() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTaxonomy("feeling").then((res) => setOptions(res.data)).catch(() => setOptions([]));
  }, []);

  if (options.length === 0) return null;

  return (
    <section className="sec" style={{ background: "linear-gradient(180deg,#FDF6ED 0%,#FBF0EF 45%,#FAF3F7 100%)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <span className="eyebrow">Start with the feeling</span>
            <h2 className="d2" style={{ marginTop: 16 }}>What do you want them to feel?</h2>
            <p className="lede">Pick the reaction you're after. We'll show you the gifts that get it.</p>
          </div>
        </Reveal>

        <div className="feelings">
          {options.map((opt, i) => {
            const meta = FEELING_META[opt.value] || DEFAULT_META;
            return (
              <Reveal as={Link} key={opt.id} index={i} className="feel" to={`/feelings/${opt.id}`} data-world={meta.world}>
                <span className="icon-chip" aria-hidden="true"><span>{meta.glyph}</span></span>
                <b>{opt.value}</b>
                <p>{meta.line}</p>
                <span className="go">See the gifts →</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeelingsSection;
