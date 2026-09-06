import { useState, useRef } from "react";
import { useCart } from "../../../context/CartContext";
import { savePersonalization } from "../../../api/personalizationApi";
import API from "../../../api/axios";
import toast from "react-hot-toast";
import { Upload, X, Check } from "lucide-react";

const STYLES = ["Classic", "Elegant", "Playful", "Minimal", "Romantic"];
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const STYLE_TEXT_CLASS = {
  Classic: "font-display font-semibold",
  Elegant: "font-display italic font-medium",
  Playful: "font-sans font-extrabold text-peach-deep",
  Minimal: "font-sans font-light tracking-wide",
  Romantic: "font-display italic text-burgundy",
};

/**
 * Real personalisation studio: photo upload with live preview, name/date/
 * message text with a live preview overlay on the product's own real
 * image, and a style choice - persisted through the real personalization
 * API once attached to a real cart line, so it survives Product -> Cart ->
 * Checkout -> Order exactly as the order snapshot is designed to preserve.
 */
function PersonalizationStudio({ product }) {
  const { addToCart, cartItems, loadCart } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [names, setNames] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("Classic");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoFile = (file) => {
    if (!file) return;
    setPhotoError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError("Please upload a JPEG, PNG, or WEBP image.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Photo must be 5MB or smaller.");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setSaved(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handlePhotoFile(e.dataTransfer.files?.[0]);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resolveCartItemId = async () => {
    const existing = cartItems.find(
      (item) => item.product === product.id || item.product_id === product.id,
    );
    if (existing) return existing.id;

    await addToCart(product.id, 1);
    const res = await API.get("cart/items/");
    const fresh = (Array.isArray(res.data) ? res.data : []).find(
      (item) => item.product === product.id || item.product_id === product.id,
    );
    return fresh?.id || null;
  };

  const handleSave = async () => {
    if (!names && !message && !photoFile) {
      toast("Add a name, message, or photo to personalise this gift");
      return;
    }

    setSaving(true);
    try {
      const cartItemId = await resolveCartItemId();
      if (!cartItemId) throw new Error("Could not find cart item");

      await savePersonalization(cartItemId, { names, date, message, style, photo: photoFile });
      await loadCart();
      setSaved(true);
      toast.success("Personalisation saved to your cart ❤️");
    } catch (error) {
      toast.error("Couldn't save your personalisation. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const previewImage = photoPreview || product.images?.[0]?.image;

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full text-left bg-world-soft border border-world/30 rounded-rm p-4 flex items-center justify-between hover:shadow-card transition-shadow"
      >
        <span className="font-display font-semibold text-navy">✨ Add a personal touch</span>
        <span className="text-world-deep text-sm font-semibold">Personalise it →</span>
      </button>
    );
  }

  return (
    <div className="bg-paper rounded-rl shadow-card p-5 sm:p-7 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg text-navy">Personalisation Studio</h3>
        <button onClick={() => setExpanded(false)} aria-label="Close" className="text-muted hover:text-navy">
          <X size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ===== FORM ===== */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gold mb-2 block">
              Photo
            </label>
            {photoPreview ? (
              <div className="relative w-24 h-24 rounded-rs overflow-hidden shadow-card">
                <img src={photoPreview} alt="Your upload" className="w-full h-full object-cover" />
                <button
                  onClick={removePhoto}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-navy/80 text-white grid place-items-center"
                  aria-label="Remove photo"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-world/50 rounded-rm p-6 text-center cursor-pointer hover:bg-world-soft/40 transition-colors"
              >
                <Upload size={20} className="mx-auto mb-2 text-world-deep" />
                <p className="text-sm text-muted">Drag a photo here, or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handlePhotoFile(e.target.files?.[0])}
                />
              </div>
            )}
            {photoError && <p className="text-xs text-burgundy mt-1">{photoError}</p>}
          </div>

          <input
            placeholder="Name(s)"
            value={names}
            onChange={(e) => { setNames(e.target.value); setSaved(false); }}
            className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
          />

          <input
            placeholder="Date (optional)"
            value={date}
            onChange={(e) => { setDate(e.target.value); setSaved(false); }}
            className="w-full border border-navy/15 p-3 rounded-rs bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition"
          />

          <textarea
            placeholder="A short message (max 300 characters)"
            maxLength={300}
            rows={3}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setSaved(false); }}
            className="w-full border border-navy/15 p-3 rounded-rm bg-paper focus:outline-none focus:border-peach-deep focus:ring-4 focus:ring-peach/30 transition resize-none"
          />

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-gold mb-2 block">
              Style
            </label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => { setStyle(s); setSaved(false); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    style === s
                      ? "bg-navy text-ivory"
                      : "bg-paper text-navy shadow-[inset_0_0_0_1.3px_rgba(15,33,64,.13)] hover:-translate-y-0.5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-peach text-navy py-3 rounded-full font-semibold shadow-card hover:-translate-y-0.5 hover:shadow-elevated transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? "Saving…" : saved ? (<><Check size={16} /> Saved to cart</>) : "Save my personalisation"}
          </button>
        </div>

        {/* ===== LIVE PREVIEW ===== */}
        <div className="bg-world-soft rounded-rm p-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-full max-w-[220px] aspect-square rounded-rs overflow-hidden shadow-card mb-4">
            {previewImage && (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            )}
          </div>

          <div className={`${STYLE_TEXT_CLASS[style]} text-navy space-y-1`}>
            {names && <p className="text-lg">{names}</p>}
            {date && <p className="text-sm text-muted">{date}</p>}
            {message && <p className="text-sm italic max-w-[220px]">"{message}"</p>}
            {!names && !date && !message && (
              <p className="text-sm text-muted">Your personalisation preview appears here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalizationStudio;
