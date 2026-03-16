import PageContainer from "../../components/common/PageContainer";

const Contact = () => {
  return (
    <PageContainer title="Contact Us">
      <p className="mb-6 text-gray-700">
        If you have any questions or need assistance, please feel free to reach
        out to us using the contact details below.
      </p>

      <div className="space-y-4 text-gray-800">
        <p>
          <strong>Email:</strong> idealgifting.in@gmail.com
        </p>

        <p>
          <strong>Alternate Email:</strong> anveshawar.ig@gmail.com
        </p>

        <p>
          <strong>Phone:</strong> +91 63055 40600
        </p>

        <p>
          <strong>Alternate Phone:</strong> +91 93463 25483
        </p>

        <p>
          <strong>Address:</strong> Road No.4C, Kothapet, Hyderabad, Ideal
          Gifting, India
        </p>
      </div>
    </PageContainer>
  );
};

export default Contact;
