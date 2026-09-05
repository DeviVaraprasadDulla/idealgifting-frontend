import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactInformation() {
  return (
    <section className="w-full py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-d4 text-navy mb-6 sm:mb-8">
          Contact Information
        </h2>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-paper rounded-rl p-5 sm:p-6 shadow-card"
        >
          {/* Phone */}
          <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="bg-world-soft p-2 sm:p-3 rounded-rs">
              <Phone className="text-world-deep" size={18} />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-muted">Phone</p>
              <p className="text-navy text-sm sm:text-base">6305540600</p>
              <p className="text-navy text-sm sm:text-base">9346325483</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="bg-world-soft p-2 sm:p-3 rounded-rs">
              <Mail className="text-world-deep" size={18} />
            </div>

            <div className="break-all">
              <p className="text-xs sm:text-sm text-muted">Email</p>
              <p className="text-navy text-sm sm:text-base">
                idealgifting.in@gmail.com
              </p>
              <p className="text-navy text-sm sm:text-base">
                anveshawar.ig@gmail.com
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-world-soft p-2 sm:p-3 rounded-rs">
              <MapPin className="text-world-deep" size={18} />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-muted">Address</p>
              <p className="text-navy text-sm sm:text-base">
                Road No.4C, Kothapet, Hyderabad
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
