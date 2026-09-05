import { useState } from "react";
import PageBanner from "../components/common/PageBanner";
import Button from "../components/ui/Button";

const WHATSAPP_NUMBER = "916305540600";

const BENEFITS = [
  { icon: "🎁", title: "Bulk gifting", text: "Employee recognition, festive hampers, or event giveaways at volume." },
  { icon: "🏆", title: "Branded keepsakes", text: "Trophies, frames and photobooks personalised with your company's story." },
  { icon: "📦", title: "One point of contact", text: "A single studio contact manages design, approval and delivery." },
  { icon: "💬", title: "Fast turnaround", text: "Quotes and previews shared quickly so you can plan around your dates." },
];

const Corporate = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    contact: "",
    quantity: "",
    occasion: "",
    budget: "",
    needBy: "",
    idea: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `*New corporate gifting enquiry from idealgifting.in*

Name: ${form.name}
Company: ${form.company}
Contact: ${form.contact}
Quantity: ${form.quantity || "Not specified"}
Occasion: ${form.occasion || "Not specified"}
Budget per gift: ${form.budget || "Not specified"}
Needed by: ${form.needBy || "Not specified"}

Idea:
${form.idea}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div>
      <PageBanner
        eyebrow="Corporate gifting"
        title="Gifts that carry your brand's warmth"
        lede="From employee milestones to client appreciation, we handle personalised gifting at scale."
        world="corporate"
        glyph="💼"
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-paper rounded-rl shadow-card p-6">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-display font-semibold text-navy mb-1">{b.title}</h3>
              <p className="text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-paper rounded-rl shadow-card p-6 sm:p-10 max-w-2xl mx-auto">
          {sent ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-d4 text-navy mb-2">Thanks, {form.name || "there"} — we're on it.</h3>
              <p className="text-muted">
                We opened WhatsApp with your enquiry pre-filled. Send it across and we'll reply within one working day.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-d4 text-navy mb-6">Start a conversation</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" required placeholder="Your name" value={form.name} onChange={handleChange}
                    className="border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition" />
                  <input name="company" required placeholder="Company" value={form.company} onChange={handleChange}
                    className="border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition" />
                </div>

                <input name="contact" required placeholder="Phone or email" value={form.contact} onChange={handleChange}
                  className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="quantity" placeholder="Approx. quantity" value={form.quantity} onChange={handleChange}
                    className="border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition" />

                  <select name="occasion" value={form.occasion} onChange={handleChange}
                    className="border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition">
                    <option value="">Occasion</option>
                    <option>Employee recognition</option>
                    <option>Annual awards</option>
                    <option>Work anniversaries</option>
                    <option>Client gifting</option>
                    <option>Event / conference</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="budget" placeholder="Budget per gift" value={form.budget} onChange={handleChange}
                    className="border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition" />
                  <input name="needBy" placeholder="Needed by (date)" value={form.needBy} onChange={handleChange}
                    className="border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition" />
                </div>

                <textarea name="idea" required rows={4} placeholder="Tell us your idea" value={form.idea} onChange={handleChange}
                  className="w-full border border-navy/15 p-3 rounded-rm bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition resize-none" />

                <Button as="button" type="submit" variant="peach" block>
                  Start a conversation →
                </Button>

                <p className="text-xs text-muted text-center">
                  This opens WhatsApp with your enquiry pre-filled to our studio number.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Corporate;
