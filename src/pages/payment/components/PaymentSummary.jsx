const PaymentSummary = ({ order }) => {
  return (
    <div className="bg-world-soft rounded-rl p-6">
      <h3 className="font-display font-semibold text-navy mb-4">Order Summary</h3>

      <div className="flex justify-between mb-2 text-navy/80">
        <span>Items Total</span>
        <span className="font-num">₹ {order.total_amount}</span>
      </div>

      <div className="flex justify-between font-num font-extrabold text-lg text-navy">
        <span>Total</span>
        <span>₹ {order.total_amount}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
