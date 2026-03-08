import LegalLayout from "../../components/legal/LegalLayout";

const Terms = () => {
  const sections = [
    {
      id: "payments",
      label: "Payments",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Payments
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            <li>We do not offer Cash on Delivery.</li>
            <li>Orders must be paid 100% in advance.</li>
            <li>Orders confirmed after successful payment.</li>
          </ul>
        </>
      ),
    },

    {
      id: "customization",
      label: "Customization",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Customization & Approval
          </h2>

          <p>
            Customers must provide accurate names, photos and details. Once
            design is approved it will be considered final.
          </p>
        </>
      ),
    },

    {
      id: "delivery",
      label: "Delivery",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Delivery & Production
          </h2>

          <p>
            Delivery timelines vary depending on product type, customization and
            courier services.
          </p>
        </>
      ),
    },
  ];

  return <LegalLayout title="Terms & Conditions" sections={sections} />;
};

export default Terms;
