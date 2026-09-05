import { Link } from "react-router-dom";
import PageBanner from "../components/common/PageBanner";
import Button from "../components/ui/Button";

const STEPS = [
  {
    n: "01",
    title: "Browse & choose",
    text: "Explore the catalogue and pick the gift that fits your moment.",
  },
  {
    n: "02",
    title: "Add to your gift box",
    text: "Build your cart as a guest or signed in — either way it's saved for checkout.",
  },
  {
    n: "03",
    title: "Checkout securely",
    text: "Add your delivery address and pay via Razorpay (UPI, cards, net banking or wallets).",
  },
  {
    n: "04",
    title: "Track it home",
    text: "Follow your order's status live from confirmation through to delivery.",
  },
];

const HowItWorks = () => {
  return (
    <div>
      <PageBanner
        eyebrow="How it works"
        title="From browsing to delivered — the whole journey"
        lede="A simple, secure path from picking a gift to it arriving at your door."
        world="wedding"
        glyph="🎁"
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <span className="block font-num font-extrabold text-4xl text-peach-deep mb-4">
                {s.n}
              </span>
              <h3 className="font-display font-semibold text-navy text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="bg-paper rounded-rl shadow-card p-6">
            <h4 className="font-display font-semibold text-navy mb-2">Payments</h4>
            <p className="text-sm text-muted leading-relaxed">
              All payments are processed securely through Razorpay. We never see or store your card details.
            </p>
          </div>
          <div className="bg-paper rounded-rl shadow-card p-6">
            <h4 className="font-display font-semibold text-navy mb-2">Order tracking</h4>
            <p className="text-sm text-muted leading-relaxed">
              Every order gets a live status timeline under "My Orders" — no need to ask us for an update.
            </p>
          </div>
          <div className="bg-paper rounded-rl shadow-card p-6">
            <h4 className="font-display font-semibold text-navy mb-2">Need help?</h4>
            <p className="text-sm text-muted leading-relaxed">
              Reach us on WhatsApp any time, or check our <Link to="/faq" className="text-peach-deep font-medium hover:underline">FAQ</Link>.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button to="/products" variant="peach" size="lg">
            Start shopping →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
