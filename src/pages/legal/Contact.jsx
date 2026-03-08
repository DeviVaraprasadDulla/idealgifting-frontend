import PageContainer from "../../components/common/PageContainer";

const Contact = () => {
  return (
    <PageContainer title="Contact Us">
      <p>If you have any questions please reach out to us.</p>

      <div className="space-y-4">
        <p>
          <strong>Email:</strong> idealgifting.in@gmail.com
        </p>

        <p>
          <strong>Phone:</strong> +91 63055 40600
        </p>

        <p>
          <strong>Address:</strong> Ideal Gifting, India
        </p>
      </div>
    </PageContainer>
  );
};

export default Contact;
