"use cache";

const Contact = async () => {
  return (
    <div className="component-container component-padding">
      <h1 className="text-3xl mb-7">Contact Info</h1>

      <div className="space-y-5">
        <div>
          <h5>Contact us from these method</h5>
          <ul className="list-disc ml-7">
            <li>
              <span className="font-semibold">Email</span> manbot1300@gmail.com
            </li>
            <li>
              <span className="font-semibold">Phone</span> +8801303541806
            </li>
          </ul>
        </div>
        <div>
          <h5>
            <span className="font-semibold">Social Media: </span>Follow us for
            the latest drops and style inspiration:
          </h5>
          <ul className="list-disc ml-7">
            <li>Facebook: @[foxivofashion]</li>
            <li>Instagram: @[foxivofashion]</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
