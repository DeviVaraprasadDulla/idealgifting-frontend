import LegalLayout from "../../components/legal/LegalLayout";

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

          <p>
            At Ideal Gifting, we respect your privacy and are committed to
            protecting your personal data. This policy explains how we collect,
            use and safeguard your information.
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

          <p>
            We may collect personal information including your name, email
            address, phone number, shipping address and payment details when you
            place an order or contact us.
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

          <p>
            Your information helps us process orders, deliver products,
            communicate order updates and improve our services.
          </p>
        </>
      ),
    },

    {
      id: "security",
      label: "Data Protection",
      content: (
        <>
          <h2 className="text-xl font-semibold text-[#0B1C2D] mb-3">
            Data Protection
          </h2>

          <p>
            We implement industry-standard security practices to ensure your
            personal data remains protected and confidential.
          </p>
        </>
      ),
    },
  ];

  return <LegalLayout title="Privacy Policy" sections={sections} />;
};

export default PrivacyPolicy;
