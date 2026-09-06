import { useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import ContactInformation from "../../components/common/ContactInformation";
import Button from "../../components/ui/Button";
import { submitContactEnquiry } from "../../api/enquiryApi";

const WHATSAPP_NUMBER = "916305540600";

const Contact = () => {
  const [form, setForm] = useState({ name: "", contact: "", topic: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await submitContactEnquiry(form);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
    }
  };

  const openWhatsAppFallback = () => {
    const message = `*New enquiry from idealgifting.in*

Name: ${form.name}
Contact: ${form.contact}
Topic: ${form.topic || "General enquiry"}

Message:
${form.message}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
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
          {status === "sent" ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">💌</div>
              <h3 className="text-d4 text-navy mb-2">Message sent, {form.name}.</h3>
              <p className="text-muted">
                We reply to everything — usually within a couple of hours during studio time.
              </p>
            </div>
          ) : (
            <>
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

                <Button as="button" type="submit" variant="peach" block disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send it over →"}
                </Button>

                {status === "error" && (
                  <div className="bg-burgundy/5 text-burgundy text-sm p-3 rounded-rs border border-burgundy/20 text-center">
                    Couldn't send that just now.{" "}
                    <button
                      type="button"
                      onClick={openWhatsAppFallback}
                      className="underline font-semibold"
                    >
                      Send it on WhatsApp instead
                    </button>
                  </div>
                )}
              </form>
            </>
          )}
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
