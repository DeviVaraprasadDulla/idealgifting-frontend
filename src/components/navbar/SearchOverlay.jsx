import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

/**
 * Full-screen live-search overlay, styled after the client reference's
 * search experience. The actual search call/debounce lives in Navbar and
 * is passed in as props - this component is presentation-only.
 */
const SearchOverlay = ({ open, onClose, value, onChange, onSubmit, results }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-ivory/97 backdrop-blur-md overflow-y-auto"
        >
          <div className="max-w-wrap-narrow mx-auto px-[clamp(20px,5vw,64px)] pt-10 pb-20">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                aria-label="Close search"
                className="w-11 h-11 rounded-full grid place-items-center hover:bg-navy/5 transition"
              >
                <X size={22} className="text-navy" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-4 border-b-2 border-navy/15 pb-4">
              <input
                autoFocus
                type="search"
                value={value}
                onChange={onChange}
                placeholder="What are you looking for?"
                className="w-full bg-transparent outline-none font-display font-semibold text-navy text-[clamp(1.5rem,3.4vw,2.5rem)] tracking-headline placeholder:text-navy/30"
              />
            </form>

            <div className="mt-8 space-y-3">
              {value.trim() === "" && (
                <p className="text-muted text-sm">
                  Start typing to search the full catalogue.
                </p>
              )}

              {results.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.slug || item.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-rm bg-paper shadow-card p-3 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="w-14 h-14 rounded-rs overflow-hidden bg-world-soft flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-navy">
                      {item.name}
                    </p>
                    <p className="text-sm font-num font-bold text-peach-deep">
                      ₹{item.price}
                    </p>
                  </div>
                </Link>
              ))}

              {value.trim() !== "" && results.length === 0 && (
                <p className="text-muted text-sm">
                  Nothing matched that search yet.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
