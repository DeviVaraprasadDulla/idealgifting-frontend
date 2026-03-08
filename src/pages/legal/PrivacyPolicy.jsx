import PageContainer from "../../components/common/PageContainer";

const PrivacyPolicy = () => {
  return (
    <PageContainer title="Privacy Policy">
      <p>
        At Ideal Gifting, we value your privacy and are committed to protecting
        your personal information.
      </p>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">
        Information We Collect
      </h2>

      <p>
        We may collect personal information such as name, email, phone number,
        shipping address and payment information.
      </p>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">
        How We Use Your Information
      </h2>

      <p>
        Your information helps us process orders, deliver products and provide
        better customer service.
      </p>

      <h2 className="text-xl font-semibold text-[#0B1C2D]">Data Protection</h2>

      <p>
        We implement industry standard security measures to safeguard your data.
      </p>
    </PageContainer>
  );
};

export default PrivacyPolicy;
