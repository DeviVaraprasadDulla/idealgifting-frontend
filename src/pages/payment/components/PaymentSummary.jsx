const PaymentSummary = ({ order }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="flex justify-between mb-2">
        <span>Items Total</span>
        <span>₹ {order.total_amount}</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹ {order.total_amount}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
