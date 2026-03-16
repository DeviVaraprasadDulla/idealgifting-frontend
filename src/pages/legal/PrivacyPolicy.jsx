import LegalLayout from "../../components/legal/LegalLayout";
import ContactInformation from "../../components/common/ContactInformation";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "introduction",
      label: "Introduction",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Introduction
          </h2>

          <p className="text-gray-700 leading-relaxed">
            At Ideal Gifting, we value the trust our customers place in us.
            Protecting your personal information and maintaining your privacy is
            very important to us. This Privacy Policy explains how we collect,
            use, store and safeguard your personal data when you use our website
            <strong> www.idealgifting.in </strong> or purchase products from our
            platform.
          </p>

          <p className="text-gray-700 leading-relaxed mt-3">
            By accessing our website or using our services, you agree to the
            practices described in this Privacy Policy.
          </p>
        </>
      ),
    },

    {
      id: "information",
      label: "Information We Collect",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Information We Collect
          </h2>

          <p className="text-gray-700 leading-relaxed">
            When you use our website or place an order, we may collect personal
            information necessary to process your request and provide our
            services effectively.
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Order details and customization information</li>
            <li>Payment transaction details processed via secure gateways</li>
          </ul>

          <p className="text-gray-700 mt-3">
            We may also collect non-personal information such as browser type,
            device information and website usage data to improve our services
            and user experience.
          </p>
        </>
      ),
    },

    {
      id: "usage",
      label: "How We Use Your Data",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            How We Use Your Data
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Processing and confirming orders</li>
            <li>Delivering customized products</li>
            <li>Sending order confirmations and delivery updates</li>
            <li>Responding to customer support requests</li>
            <li>Improving website functionality and experience</li>
            <li>Preventing fraudulent transactions</li>
          </ul>

          <p className="text-gray-700 mt-3">
            We do not sell, rent or trade personal information to third parties
            for marketing purposes.
          </p>
        </>
      ),
    },

    {
      id: "payments",
      label: "Payment Information",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Payment Information
          </h2>

          <p className="text-gray-700">
            All payments made on our website are processed through secure and
            trusted payment gateways. Ideal Gifting does not store sensitive
            payment information such as debit card numbers, credit card details
            or CVV numbers on our servers.
          </p>

          <p className="text-gray-700 mt-3">
            Payment gateways follow strict security standards to ensure safe
            transactions.
          </p>
        </>
      ),
    },

    {
      id: "security",
      label: "Data Protection and Security",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Data Protection and Security
          </h2>

          <p className="text-gray-700">
            We implement appropriate technical and organizational security
            measures to protect your personal information from unauthorized
            access, misuse, loss or disclosure.
          </p>

          <p className="text-gray-700 mt-3">
            These measures include secure servers, encrypted data transmission
            and restricted access to personal information.
          </p>
        </>
      ),
    },

    {
      id: "sharing",
      label: "Sharing of Information",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Sharing of Information
          </h2>

          <p className="text-gray-700">
            Personal information may be shared only when necessary for order
            fulfillment or legal compliance.
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-3 text-gray-700">
            <li>Courier and logistics partners for delivery</li>
            <li>Payment gateway providers for transaction processing</li>
            <li>Government authorities when required by law</li>
          </ul>
        </>
      ),
    },

    {
      id: "cookies",
      label: "Cookies and Website Usage",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Cookies and Website Usage
          </h2>

          <p className="text-gray-700">
            Our website may use cookies to enhance browsing experience and help
            us understand how users interact with our platform.
          </p>

          <p className="text-gray-700 mt-3">
            Users can disable cookies through browser settings if preferred.
          </p>
        </>
      ),
    },

    {
      id: "rights",
      label: "Customer Rights",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Customer Rights
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Request access to personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Contact us regarding privacy concerns</li>
          </ul>
        </>
      ),
    },

    {
      id: "updates",
      label: "Policy Updates",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Changes to This Privacy Policy
          </h2>

          <p className="text-gray-700">
            Ideal Gifting reserves the right to update or modify this Privacy
            Policy at any time. Customers are encouraged to review this page
            periodically.
          </p>
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

  return <LegalLayout title="Privacy Policy" sections={sections} />;
};

export default PrivacyPolicy;
