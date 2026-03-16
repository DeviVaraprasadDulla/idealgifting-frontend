import LegalLayout from "../../components/legal/LegalLayout";
import ContactInformation from "../../components/common/ContactInformation";

const RefundPolicy = () => {
  const sections = [
    {
      id: "introduction",
      label: "Introduction",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Introduction
          </h2>

          <p>
            At Ideal Gifting, we strive to provide high-quality customized
            gifting products and a smooth shopping experience. Since many of our
            products are personalized according to customer requirements, this
            Refund, Cancellation, and Replacement Policy explains the conditions
            under which orders may be cancelled, refunded, or replaced.
          </p>

          <p className="mt-3">
            By placing an order on <strong>www.idealgifting.in</strong>,
            customers agree to the terms described in this policy.
          </p>
        </>
      ),
    },

    {
      id: "cancellation",
      label: "Order Cancellation Policy",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Order Cancellation Policy
          </h2>

          <h3 className="font-semibold mt-3">Before Production</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>The order has not yet entered the production stage.</li>
            <li>Customization design work has not started.</li>
          </ul>

          <h3 className="font-semibold mt-4">During Design Stage</h3>
          <p className="mt-2">
            If the design work has started but the design has not yet been
            approved by the customer, the cancellation request may be reviewed
            by our team. Depending on the progress of work, a partial refund may
            be considered.
          </p>

          <h3 className="font-semibold mt-4">After Design Approval</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Orders cannot be cancelled.</li>
            <li>Customization changes cannot be requested.</li>
          </ul>

          <h3 className="font-semibold mt-4">After Shipping</h3>
          <p className="mt-2">
            Once the product has been shipped, order cancellation will not be
            possible. Customers must wait for delivery and report any issues
            according to the damaged product policy.
          </p>
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

          <p>Refunds may be processed under the following conditions:</p>

          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>The order is cancelled before production begins.</li>
            <li>The order is cancelled before shipping.</li>
            <li>
              The product cannot be fulfilled due to stock or technical issues.
            </li>
          </ul>

          <h3 className="font-semibold mt-4">Refund Processing Time</h3>

          <p className="mt-2">
            Approved refunds are processed within{" "}
            <strong>5–7 business days</strong>. However, the time required for
            the amount to reflect in the customer's account may vary depending
            on the bank or payment provider.
          </p>
        </>
      ),
    },

    {
      id: "damaged",
      label: "Damaged or Incorrect Products",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Damaged or Incorrect Products
          </h2>

          <p>
            Customers must report damaged or incorrect products within
            <strong> 24 hours of delivery</strong>.
          </p>

          <h3 className="font-semibold mt-4">Proof Requirement</h3>

          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Clear photos of the damaged or incorrect product</li>
            <li>Photos of the outer packaging</li>
            <li>Unboxing video proof showing the product being opened</li>
          </ul>

          <h3 className="font-semibold mt-4">Replacement Process</h3>

          <p className="mt-2">
            Once the issue is verified, a replacement product will be arranged
            and shipped as soon as possible. Refunds for customized products are
            generally not provided unless replacement is not possible.
          </p>
        </>
      ),
    },

    {
      id: "nonrefundable",
      label: "Non-Refundable Situations",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Non-Refundable Situations
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            <li>Incorrect customization details provided by customers</li>
            <li>
              Customer-approved designs where mistakes were not reported before
              approval
            </li>
            <li>Minor color variations due to screen differences</li>
            <li>Courier or logistics delivery delays</li>
            <li>Damage caused after delivery</li>
          </ul>
        </>
      ),
    },

    {
      id: "contact",
      label: "Contact Information",
      content: (
        <div className="mt-6">
          <ContactInformation />
        </div>
      ),
    },

    {
      id: "updates",
      label: "Policy Updates",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Policy Updates
          </h2>

          <p>
            Ideal Gifting reserves the right to modify or update this Refund,
            Cancellation, and Replacement Policy at any time. Customers are
            encouraged to review this page periodically when placing orders.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalLayout
      title="Refund, Cancellation & Replacement Policy"
      sections={sections}
    />
  );
};

export default RefundPolicy;
