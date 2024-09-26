// Check.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export const Check = () => {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: false,     // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
      {/* Element sliding in from the left */}
      <div data-aos="fade-left">
        Coming from the left
      </div>

      {/* Element sliding in from the right */}
      <h1 data-aos="fade-right">
        Coming from the right
      </h1>

      {/* Paragraph sliding in from the bottom */}
      <p data-aos="fade-up">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quibusdam
        magnam repellat, id corporis temporibus praesentium hic sint ipsam harum
        dolorem eos provident molestiae laborum earum saepe deserunt magni
        soluta recusandae rerum obcaecati. Ipsa accusantium eveniet officiis.
        Voluptatem, cum dignissimos. Error earum id deleniti reiciendis
        aspernatur vitae quod eum laboriosam similique officia ea modi ab
        tenetur aut corporis fugit tempore, alias totam magni! Tempora!
      </p>

      {/* Another element sliding in from the left */}
      <h1 data-aos="fade-left">
        Another element from the left
      </h1>

      {/* Another element sliding in from the right */}
      <h2 data-aos="fade-right">
        Another element from the right
      </h2>

      {/* Another element sliding in from the bottom */}
      <h3 data-aos="fade-up">
        This is another element animating from the bottom.
      </h3>

      {/* Another element sliding in from the left */}
      <h4 data-aos="fade-left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, asperiores.
      </h4>
    </div>
  );
};

export default Check;
