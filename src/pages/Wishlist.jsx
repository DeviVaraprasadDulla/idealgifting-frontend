import PageBanner from "../components/common/PageBanner";
import Button from "../components/ui/Button";
import ProductCard from "../features/products/components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div>
      <PageBanner
        eyebrow="Saved for later"
        title="Your Wishlist"
        world="love"
        glyph="❤️"
      />

      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,5vw,56px)]">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🤍</div>
            <h2 className="text-d4 text-navy mb-3">Nothing saved yet</h2>
            <p className="text-muted mb-6">
              Tap the heart on any gift to save it here for later.
            </p>
            <Button to="/products" variant="peach">
              Browse Gifts
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[clamp(14px,1.7vw,24px)]">
            {wishlistItems.map((item) => (
              <ProductCard key={item.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
