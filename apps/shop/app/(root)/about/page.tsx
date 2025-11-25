import React from "react";

const About = () => {
  return (
    <section className="component-container component-padding">
      <h1 className="text-3xl mb-7">About Us</h1>

      <div className="space-y-5">
        <h3>
          Welcome to Foxivo, where style meets comfort. We believe that looking
          good shouldn't mean sacrificing how you feel.
        </h3>

        <h5>
          Founded in 2025, we started with a simple mission: to provide
          high-quality, versatile clothing for men and women that fits every
          aspect of your life. Whether you are looking for the perfect t-shirt
          for a casual weekend, a crisp shirt for the office, or comfortable
          shorts for a summer getaway, we have you covered.
        </h5>

        <span>Why Choose Us?</span>
        <ol>
          <li>
            Quality Fabrics: We hand-pick materials that are breathable,
            durable, and soft against the skin.
          </li>
          <li>
            Modern Cuts: Our designs are tailored to flatter all body types.
          </li>
          <li>
            Commitment to Detail: From the stitching to the buttons, every
            detail matters.
          </li>
        </ol>
        <span>
          Thank you for choosing Foxivo. We are excited to be a part of your
          wardrobe.
        </span>
      </div>
    </section>
  );
};

export default About;
