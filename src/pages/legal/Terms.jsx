import LegalLayout from "../../components/legal/LegalLayout";
import ContactInformation from "../../components/common/ContactInformation";

const Terms = () => {
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
            Welcome to Ideal Gifting. These Terms and Conditions govern your use
            of our website www.idealgifting.in and the purchase of products from
            our platform. By accessing this website or placing an order, you
            agree to comply with and be bound by these Terms and Conditions.
          </p>
          <p className="mt-3">
            Ideal Gifting is an e-commerce platform offering customized gifting
            products such as personalized gifts, photo frames, customized
            accessories, and creative gifting solutions prepared based on
            customer provided details.
          </p>
        </>
      ),
    },

    {
      id: "acceptance",
      label: "Acceptance of Terms",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By using this website, browsing products, or placing an order, you
            agree to be legally bound by these Terms and Conditions, our Privacy
            Policy, and other policies available on the website.
          </p>
        </>
      ),
    },

    {
      id: "products",
      label: "Products and Customization",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Products and Customization
          </h2>
          <p>
            Ideal Gifting specializes in customized and personalized products
            such as names, photos, messages, dates and design preferences.
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Names</li>
            <li>Photos</li>
            <li>Messages</li>
            <li>Special Dates</li>
            <li>Design Preferences</li>
          </ul>

          <p className="mt-3">
            Customers are responsible for providing correct customization
            details. Ideal Gifting will not be responsible for errors caused by
            incorrect information submitted by customers.
          </p>
        </>
      ),
    },

    {
      id: "approval",
      label: "Customization Approval",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Customization Approval
          </h2>

          <p>
            Customers may receive a design preview depending on the product.
            Once approved, the order will be considered final and ready for
            production.
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>No changes can be made after approval</li>
            <li>Cancellation may not be accepted</li>
            <li>Production will start based on approved design</li>
          </ul>
        </>
      ),
    },

    {
      id: "payments",
      label: "Pricing and Payments",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Pricing and Payments
          </h2>

          <p>All prices are listed in Indian Rupees (INR).</p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>No Cash on Delivery (COD)</li>
            <li>Orders require 100% advance payment</li>
            <li>Orders confirmed after successful payment</li>
          </ul>
        </>
      ),
    },

    {
      id: "delivery",
      label: "Delivery and Shipping",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Delivery and Shipping
          </h2>

          <p>
            Ideal Gifting delivers through trusted courier partners. Delivery
            time depends on customization, production time, and location.
          </p>

          <p className="mt-3">
            Customers must provide accurate shipping address and contact details
            to ensure successful delivery.
          </p>
        </>
      ),
    },

    {
      id: "returns",
      label: "Returns and Refunds",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Returns and Refunds
          </h2>

          <p>
            Since most products are customized, returns are generally not
            accepted unless the product is damaged, defective, or incorrect.
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Damaged during shipping</li>
            <li>Incorrect product delivered</li>
            <li>Manufacturing defect</li>
          </ul>

          <p className="mt-3">
            Customers must report issues within 24–48 hours with product photos.
          </p>
        </>
      ),
    },

    {
      id: "liability",
      label: "Limitation of Liability",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Limitation of Liability
          </h2>

          <p>Ideal Gifting is not responsible for:</p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Courier delivery delays</li>
            <li>Incorrect customization provided by customers</li>
            <li>Wrong delivery address</li>
            <li>Payment gateway technical issues</li>
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
  ];

  return <LegalLayout title="Terms & Conditions" sections={sections} />;
};

export default Terms;
