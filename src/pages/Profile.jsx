import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 min-h-screen py-12 px-4 overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-200"
        >
          {/* Avatar + Title */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-semibold shadow-lg"
            >
              {user.username?.charAt(0).toUpperCase()}
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-semibold mt-6 tracking-wide">
              My Profile
            </h1>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Name */}
            <motion.div whileHover={{ scale: 1.02 }} className="transition">
              <label className="block text-gray-500 text-sm mb-2">Name</label>
              <div className="rounded-xl px-4 py-3 bg-gray-100 border border-gray-200 text-gray-800 shadow-sm">
                {user.username}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div whileHover={{ scale: 1.02 }} className="transition">
              <label className="block text-gray-500 text-sm mb-2">Email</label>
              <div className="rounded-xl px-4 py-3 bg-gray-100 border border-gray-200 text-gray-800 break-all shadow-sm">
                {user.email}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
