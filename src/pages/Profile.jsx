import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted font-display">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12 px-4 overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-peach/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-navy/10 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-paper/90 backdrop-blur-md rounded-rxl shadow-lift p-8 sm:p-10 border border-navy/10"
        >
          {/* Avatar + Title */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full bg-navy text-ivory flex items-center justify-center text-4xl font-display font-semibold shadow-card"
            >
              {user.username?.charAt(0).toUpperCase()}
            </motion.div>

            <h1 className="text-d3 text-navy mt-6">
              My Profile
            </h1>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Name */}
            <motion.div whileHover={{ scale: 1.02 }} className="transition">
              <label className="block text-muted text-sm mb-2">Name</label>
              <div className="rounded-rm px-4 py-3 bg-world-soft border border-navy/10 text-navy shadow-card">
                {user.username}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div whileHover={{ scale: 1.02 }} className="transition">
              <label className="block text-muted text-sm mb-2">Email</label>
              <div className="rounded-rm px-4 py-3 bg-world-soft border border-navy/10 text-navy break-all shadow-card">
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
