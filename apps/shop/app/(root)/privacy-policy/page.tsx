const PrivacyPolicy = () => {
  return (
    <div className="component-container component-padding">
      <span className="text-mute text-xs font-light">
        Last updated: 25/11/2025
      </span>
      <div className="space-y-5">
        <h1 className="text-3xl">Privacy Policy</h1>
        <h3>
          At Foxivo, we respect your privacy and are committed to protecting
          your personal information.
        </h3>

        <h5>
          <span className="font-semibold">Information We Collect: </span>
          When you make a purchase, we collect personal information such as your
          name, billing address, shipping address, payment information, email
          address, and phone number.
        </h5>

        <h5>
          <span className="font-semibold">How We Use Your Information:</span>
          <ul className="list-disc ml-7">
            <li>To fulfill your order and arrange for shipping.</li>
            <li>To communicate with you regarding your order.</li>
            <li>To screen our orders for potential risk or fraud.</li>
          </ul>
        </h5>

        <h5>
          <span className="font-semibold">
            Sharing Your Personal Information:{" "}
          </span>
          We do not sell your personal information. We share your information
          with third parties only to help us use your personal information as
          described above
        </h5>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
