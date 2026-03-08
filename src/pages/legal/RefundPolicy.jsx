import LegalLayout from "../../components/legal/LegalLayout";

const RefundPolicy = () => {
  const sections = [
    {
      id: "cancellation",
      label: "Cancellation Policy",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Cancellation Policy
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            <li>Orders can be cancelled before shipping.</li>
            <li>Once shipped, cancellation is not possible.</li>
            <li>Design work started orders may be reviewed before approval.</li>
          </ul>
        </>
      ),
    },

    {
      id: "refund",
      label: "Refund Policy",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Refund Policy
          </h2>

          <p>
            Refund requests must be submitted before shipping. Approved refunds
            are processed within 5-7 business days.
          </p>
        </>
      ),
    },

    {
      id: "damaged",
      label: "Damaged Products",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Damaged or Incorrect Products
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            <li>Report within 24 hours of delivery.</li>
            <li>Unboxing video proof required.</li>
            <li>Replacement provided after verification.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <LegalLayout title="Refund & Cancellation Policy" sections={sections} />
  );
};

export default RefundPolicy;
