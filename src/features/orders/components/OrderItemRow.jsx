const OrderItemRow = ({ item }) => {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="flex items-center gap-4">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 object-cover rounded-lg"
          />
        )}
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>

      <p className="font-semibold">₹{item.price}</p>
    </div>
  );
};

export default OrderItemRow;
