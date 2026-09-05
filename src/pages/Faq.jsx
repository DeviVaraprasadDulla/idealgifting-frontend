import { useState } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../components/common/PageBanner";

const FAQ_DATA = [
  {
    q: "Do I need an account to place an order?",
    a: "No — you can browse and add items to your cart as a guest. You'll only need to sign in (or create an account) at checkout, and anything already in your guest cart carries over automatically once you do.",
  },
  {
    q: "How do I pay?",
    a: "Checkout is powered by Razorpay, supporting UPI, cards, net banking and wallets. You can also reach out to us on WhatsApp if you'd prefer to confirm an order that way.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Once your order is confirmed, you'll find a live status timeline under \"My Orders\" — from placed through to delivered.",
  },
  {
    q: "Can I cancel an order after placing it?",
    a: "Orders can be cancelled from \"My Orders\" while they're still Placed, Confirmed, or Packed. Once an order has shipped, it can no longer be cancelled from the site directly.",
  },
  {
    q: "What's your return/refund policy?",
    a: (
      <>
        Please see our{" "}
        <Link to="/refund-policy" className="text-peach-deep font-medium hover:underline">
          Refund Policy
        </Link>{" "}
        page for the full details.
      </>
    ),
  },
  {
    q: "I forgot my password — what now?",
    a: "Use \"Forgot password\" on the login page. We'll email you a one-time code to reset it.",
  },
  {
    q: "How do I get in touch?",
    a: (
      <>
        The fastest way is WhatsApp via the floating button on any page, or through our{" "}
        <Link to="/contact" className="text-peach-deep font-medium hover:underline">
          Contact page
        </Link>
        .
      </>
    ),
  },
];

const AccordionItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-navy/10">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full text-left py-5 flex items-center justify-between gap-4"
    >
      <span className="font-display font-semibold text-navy text-lg">{item.q}</span>
      <span className="text-2xl text-peach-deep leading-none flex-shrink-0">
        {isOpen ? "−" : "+"}
      </span>
    </button>

    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? "300px" : "0px" }}
    >
      <p className="pb-5 text-muted leading-relaxed pr-8">{item.a}</p>
    </div>
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <PageBanner
        eyebrow="Support"
        title="Frequently asked questions"
        lede="Everything you need to know about ordering, paying, and tracking your gift."
        world="corporate"
        glyph="❔"
      />

      <div className="max-w-wrap-narrow mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        {FAQ_DATA.map((item, i) => (
          <AccordionItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}

        <div className="mt-10 bg-world-soft rounded-rl p-6 text-center">
          <p className="text-navy font-medium mb-3">Still have a question?</p>
          <Link to="/contact" className="text-peach-deep font-semibold hover:underline">
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Faq;
