import { useNavigate } from "react-router-dom";

const EmptyOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">📦</div>
      <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
      <p className="text-gray-500 mb-6">
        Looks like you haven't placed any orders.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-[#0B1C2D] text-white px-6 py-3 rounded-xl"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyOrders;
