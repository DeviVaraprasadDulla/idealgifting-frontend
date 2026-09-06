import { Link } from "react-router-dom";
import Reveal from "../../components/common/Reveal";

const STEPS = [
  ["Browse & choose 🎁", "Pick the gift that fits the moment from our real, in-stock catalogue."],
  ["Add your details ✨", "Add it to your gift box and fill in your delivery address."],
  ["Pay securely 💳", "Checkout with Razorpay - UPI, cards, netbanking and wallets."],
  ["Delivered with care 📦", "It arrives gift-ready at your door, tracked every step of the way."],
];

function ProcessSteps() {
  return (
    <section className="sec">
      <div className="wrap center">
        <Reveal className="sec-head" style={{ justifyContent: "center" }}>
          <div>
            <span className="eyebrow center">How it works</span>
            <h2 className="d2" style={{ marginTop: 16 }}>From browsing to your doorstep.</h2>
          </div>
        </Reveal>

        <div className="steps" style={{ textAlign: "left" }}>
          {STEPS.map((s, i) => (
            <Reveal as="div" key={s[0]} index={i} className="step">
              <span className="n">0{i + 1}</span>
              <h3>{s[0]}</h3>
              <p>{s[1]}</p>
            </Reveal>
          ))}
        </div>

        <Link className="btn btn-ghost" style={{ marginTop: 34 }} to="/how">
          See the full process
        </Link>
      </div>
    </section>
  );
}

export default ProcessSteps;
