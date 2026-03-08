import PageContainer from "../../components/common/PageContainer";

const RefundPolicy = () => {
  return (
    <PageContainer title="Refund & Cancellation Policy">
      <p className="text-sm text-gray-500">Last Updated: March 2026</p>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">
        Cancellation Policy
      </h2>

      <p>
        At Ideal Gifting, every product is thoughtfully customized based on your
        specific requirements.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Orders can be cancelled only before the product is shipped.</li>
        <li>Once the order has been shipped, cancellation is not possible.</li>
        <li>
          If the design process has already started, cancellation requests may
          be subject to review.
        </li>
        <li>
          Approved cancellations will be processed within 5–7 business days.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">Refund Policy</h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Refund requests must be made before the product is shipped.</li>
        <li>
          Once the shipping process has been initiated, refunds will not be
          provided.
        </li>
        <li>
          Customized products are non-returnable and non-refundable once
          dispatched.
        </li>
        <li>
          Refunds will be processed to the original payment method within 5–7
          business days.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">
        Damaged or Incorrect Product
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>You must notify us within 24 hours of delivery.</li>
        <li>Clear unboxing video proof is mandatory.</li>
        <li>Upon verification we will offer replacement or resolution.</li>
      </ul>
    </PageContainer>
  );
};

export default RefundPolicy;
