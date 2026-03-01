import { motion } from "framer-motion";
import phonpayLogo from "../../../assets/logos/phonepayLogo.png";

const PhonePeCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border-2 border-purple-600 bg-purple-50 rounded-2xl p-4 flex items-center space-x-4 cursor-pointer"
    >
      <img src={phonpayLogo} alt="PhonePe" className="w-10 h-10" />
      <div>
        <p className="font-semibold text-purple-700">PhonePe</p>
        <p className="text-sm text-gray-500">Pay securely via UPI</p>
      </div>
    </motion.div>
  );
};

export default PhonePeCard;
