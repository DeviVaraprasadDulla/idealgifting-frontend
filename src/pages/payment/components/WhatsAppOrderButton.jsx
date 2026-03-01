import { motion } from "framer-motion";

const WhatsAppOrderButton = ({ order }) => {
  if (!order) return null;

  const ownerNumber = "916305540600"; // Your WhatsApp Business number

  // ===== Format Order ID =====
  const formattedOrderId = `IG-${String(order.id).padStart(6, "0")}`;

  // ===== Format Date & Time =====
  const orderDate = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // ===== Format Items =====
  const formattedItems =
    order.items?.length > 0
      ? order.items
          .map((item, index) => {
            const productName =
              item.product?.name || item.product_name || "Gift Item";

            const price = Number(item.price || 0).toLocaleString("en-IN");

            return `${index + 1}. ${productName}
   ₹${price} × ${item.quantity}`;
          })
          .join("\n\n")
      : "No items found";

  // ===== Format Address =====
  const addressParts = [
    order.address?.street,
    order.address?.city,
    order.address?.state,
    order.address?.pincode,
  ].filter(Boolean);

  const formattedAddress =
    addressParts.length > 0 ? addressParts.join(", ") : "Address not provided";

  // ===== Customer Info =====
  const customerName = order.user?.name || order.user_name || "Valued Customer";

  const customerEmail = order.user?.email || order.user_email || "Not provided";

  // ===== Payment Info =====
  const paymentMethod = order.payment_method || "Manual Confirmation";

  const paymentStatus = (order.payment_status || "Pending").toUpperCase();

  const totalAmount = Number(order.total_amount || 0).toLocaleString("en-IN");

  const handleWhatsAppOrder = () => {
    const message = `
*NEW ORDER RECEIVED*
────────────────────────

Order ID: ${formattedOrderId}
Order Date: ${orderDate}

ORDER DETAILS
${formattedItems}

────────────────────────
Total Amount: ₹${totalAmount}
Payment Method: ${paymentMethod}
Payment Status: ${paymentStatus}

CUSTOMER INFORMATION
Name: ${customerName}
Email: ${customerEmail}

DELIVERY ADDRESS
${formattedAddress}

────────────────────────
Please confirm and process this order manually.

Thank you.
`;

    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleWhatsAppOrder}
      className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md transition"
    >
      Confirm Order via WhatsApp
    </motion.button>
  );
};

export default WhatsAppOrderButton;
