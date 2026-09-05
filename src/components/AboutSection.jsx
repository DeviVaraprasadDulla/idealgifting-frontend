import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo-horizontal.png";
import aboutImage from "../assets/about/about-gifting.webp";

function AboutSection() {
  const services = [
    "Personalized Gifting",
    "Photo Books & Memory Albums",
    "Customized Frames",
    "Love Trophies & Keepsakes",
    "Baby & Family Gifting",
    "Corporate & Bulk Gifting",
    "Occasion-based Gifting",
  ];

  return (
    <section className="relative py-[clamp(56px,7.5vw,110px)] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-peach/15 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy/10 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-rl overflow-hidden shadow-lift"
        >
          <motion.img
            src={aboutImage}
            alt="About Ideal Gifting"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute bottom-6 left-6 bg-paper shadow-elevated px-4 py-2 rounded-rm text-sm font-medium text-navy"
          >
            💛 Crafted With Emotion & Care
          </motion.div>
        </motion.div>

        {/* CONTENT SIDE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="bg-paper p-8 rounded-rl shadow-card"
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Ideal Gifting Logo"
            className="h-10 mb-6 opacity-80"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          />

          {/* Heading */}
          <motion.h2
            className="text-d3 text-navy mb-5"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            A Gift Is Not Just Given — <em className="text-peach-deep not-italic">It Is Felt.</em>
          </motion.h2>

          {/* Story */}
          <motion.p
            className="text-muted leading-relaxed mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            At Ideal Gifting, we believe a gift is not just something you give —
            it’s something you feel. Born from creativity and storytelling, we
            bring personalization, emotion, and thoughtful design into everyday
            gifting.
          </motion.p>

          <motion.p
            className="text-muted leading-relaxed mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            We listen, understand your story, and turn it into something
            meaningful — a gift that speaks even when words fall short.
          </motion.p>

          {/* SERVICES */}
          <motion.div
            className="mb-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Our Services
            </h3>

            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <span
                  key={index}
                  className="bg-world-soft text-world-deep px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-navy text-ivory px-7 py-3.5 rounded-full font-semibold shadow-card
                         hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-300"
            >
              Explore Our Collection <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
