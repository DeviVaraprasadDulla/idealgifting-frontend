import { motion } from "framer-motion";
import PageBanner from "../components/common/PageBanner";
import Button from "../components/ui/Button";
import aboutImage from "../assets/about/about-gifting.webp";

const VALUES = [
  { world: "love", glyph: "💛", title: "Personalised", text: "Every gift is built around your people, your moments, your story - never a generic template." },
  { world: "birthday", glyph: "🎨", title: "Creative", text: "From frames to hampers, we bring craft and care into everyday gifting." },
  { world: "friendship", glyph: "🤍", title: "Thoughtful", text: "We listen first, then design - so the gift feels like it was made for exactly one person." },
  { world: "achievement", glyph: "✨", title: "Memorable", text: "The goal isn't just a nice gift. It's the moment they open it." },
];

const About = () => (
  <div>
    <PageBanner
      eyebrow="About the studio"
      title="A gift is not just given — it is felt."
      world="wedding"
      glyph="🤍"
    />

    {/* Intro */}
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)] grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-rl overflow-hidden shadow-lift"
      >
        <img src={aboutImage} alt="Ideal Gifting" className="w-full h-full object-cover" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-muted leading-relaxed mb-4">
          At Ideal Gifting, we believe a gift is not just something you give — it's something
          you feel. Born from creativity and storytelling, we bring personalisation, emotion,
          and thoughtful design into everyday gifting.
        </p>
        <p className="text-muted leading-relaxed mb-6">
          We listen, understand your story, and turn it into something meaningful — a gift
          that speaks even when words fall short.
        </p>
        <Button to="/products" variant="primary">
          Explore our creations →
        </Button>
      </motion.div>
    </div>

    {/* Values */}
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(32px,5vw,56px)]">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {VALUES.map((v) => (
          <div
            key={v.title}
            data-world={v.world}
            className="bg-world-soft rounded-rl p-6 text-left"
          >
            <div className="text-3xl mb-3">{v.glyph}</div>
            <h3 className="font-display font-semibold text-navy mb-1">{v.title}</h3>
            <p className="text-sm text-muted">{v.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Closing pull-quote - unattributed, no invented founder/stats */}
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7.5vw,110px)]">
      <div className="bg-navy text-cream rounded-rxl p-[clamp(26px,4vw,58px)] text-center">
        <p className="font-display italic text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug max-w-2xl mx-auto mb-6">
          "The best gifts make someone say: you remembered."
        </p>
        <Button to="/products" variant="peach">
          Shop all gifts →
        </Button>
      </div>
    </div>
  </div>
);

export default About;
