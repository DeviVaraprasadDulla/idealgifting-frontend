import { useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import ContactInformation from "../../components/common/ContactInformation";
import Button from "../../components/ui/Button";

const WHATSAPP_NUMBER = "916305540600";

const Contact = () => {
  const [form, setForm] = useState({ name: "", contact: "", topic: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `*New enquiry from idealgifting.in*

Name: ${form.name}
Contact: ${form.contact}
Topic: ${form.topic || "General enquiry"}

Message:
${form.message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <PageBanner
        eyebrow="We're here to help"
        title="Let's talk about your gift"
        lede="Send us a message and we'll reply as soon as we can - usually within a couple of hours during studio time."
        world="friendship"
        glyph="💬"
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)] grid lg:grid-cols-2 gap-10">
        {/* FORM */}
        <div className="bg-paper rounded-rl shadow-card p-6 sm:p-8">
          <h2 className="text-d4 text-navy mb-6">Send a message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
            />

            <input
              name="contact"
              required
              placeholder="Phone or email"
              value={form.contact}
              onChange={handleChange}
              className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
            />

            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
            >
              <option value="">What are we celebrating?</option>
              <option>A gift idea</option>
              <option>An existing order</option>
              <option>Corporate gifting</option>
              <option>Something custom</option>
              <option>Just saying hello</option>
            </select>

            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us a little more..."
              value={form.message}
              onChange={handleChange}
              className="w-full border border-navy/15 p-3 rounded-rm bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition resize-none"
            />

            <Button as="button" type="submit" variant="peach" block>
              Send it over →
            </Button>

            <p className="text-xs text-muted text-center">
              This opens WhatsApp with your message pre-filled to our studio number.
            </p>
          </form>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <ContactInformation />
        </div>
      </div>
    </div>
  );
};

export default Contact;
