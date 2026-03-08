import PageContainer from "../../components/common/PageContainer";

const Terms = () => {
  return (
    <PageContainer title="Terms & Conditions">
      <h2 className="text-xl font-semibold text-[#0B1C2D]">Payments</h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>We do not offer Cash on Delivery.</li>
        <li>All orders must be paid 100% in advance.</li>
        <li>Orders confirmed only after successful payment.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">Customization</h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Customers must provide correct names, dates and photos.</li>
        <li>Once design is approved it will be considered final.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">Delivery</h2>

      <p>Delivery timelines vary depending on product type and location.</p>
    </PageContainer>
  );
};

export default Terms;
