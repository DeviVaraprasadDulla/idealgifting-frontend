import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactInformation() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1C2D] mb-6 sm:mb-8">
          Contact Information
        </h2>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-200"
        >
          {/* Phone */}
          <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
              <Phone className="text-[#0B1C2D]" size={18} />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Phone</p>
              <p className="text-[#0B1C2D] text-sm sm:text-base">6305540600</p>
              <p className="text-[#0B1C2D] text-sm sm:text-base">9346325483</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
              <Mail className="text-[#0B1C2D]" size={18} />
            </div>

            <div className="break-all">
              <p className="text-xs sm:text-sm text-gray-500">Email</p>
              <p className="text-[#0B1C2D] text-sm sm:text-base">
                idealgifting.in@gmail.com
              </p>
              <p className="text-[#0B1C2D] text-sm sm:text-base">
                anveshawar.ig@gmail.com
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
              <MapPin className="text-[#0B1C2D]" size={18} />
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500">Address</p>
              <p className="text-[#0B1C2D] text-sm sm:text-base">
                Road No.4C, Kothapet, Hyderabad
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
