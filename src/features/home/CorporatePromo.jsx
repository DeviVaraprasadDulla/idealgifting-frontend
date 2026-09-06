import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";

const SERVICES = ["Custom trophies", "Employee recognition", "Event awards", "Bulk orders", "Logo integration", "Client gifting"];

function CorporatePromo() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal
          className="panel"
          data-world="corporate"
          style={{ background: "var(--w-soft)", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 38, alignItems: "center" }}
        >
          <div>
            <span className="eyebrow">Corporate gifting</span>
            <h2 className="d2" style={{ margin: "16px 0 12px" }}>Recognition, made personal.</h2>
            <p className="lede">
              From milestone celebrations to awards and employee recognition, we turn your
              brand and your appreciation into keepsakes people keep on the desk.
            </p>
            <div className="chips" style={{ marginTop: 20 }}>
              {SERVICES.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
            <Link className="btn btn-world" style={{ marginTop: 24 }} to="/corporate">
              Plan your corporate gifting <span className="arw">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CorporatePromo;
