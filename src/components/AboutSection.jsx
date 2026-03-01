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
    <section className="relative py-20 bg-[#F8F9FB] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F172A]/10 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] overflow-hidden shadow-xl"
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
            className="absolute bottom-6 left-6 bg-white shadow-lg px-4 py-2 rounded-xl text-sm font-medium"
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
          className="bg-white p-8 rounded-3xl shadow-sm"
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
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            A Gift Is Not Just Given — It Is Felt.
          </motion.h2>

          {/* Story */}
          <motion.p
            className="text-gray-600 leading-relaxed mb-4"
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
            className="text-gray-600 leading-relaxed mb-6"
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
            <h3 className="font-semibold text-gray-900 mb-3">Our Services</h3>

            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA (CONVERSION OPTIMIZED) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              to="/products"
              className="inline-block bg-[#0F172A] text-white px-7 py-3 rounded-2xl font-medium 
                         hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Explore Our Collection →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
