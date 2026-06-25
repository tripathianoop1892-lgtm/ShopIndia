import React from "react";
import "./Contact.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

const Contact = () => {
  return (
    <>
    {/* Navbar */}
    <Navbar/>
    <div className="contact-page">

      {/* Header */}
      <div className="contact-header">
        <div className="contact-us">
        <h1>Contact Us</h1>
        <p>
          Connect with Omsanjeevni and take your medicine business digital.
        </p>
        </div>
        <img src="contactpic.png" alt="" style={{width:"300px", height: "auto", marginLeft:"90px"}} />
        
      </div>

      {/* Contact Section */}
      <div className="contact-container">

        {/* Contact Info */}
        <div className="contact-info">

          <h2>Get In Touch</h2>

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>Delhi, India</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info-box">
            <h3>📧 Email</h3>
            <p>support@omsanjeevni.com</p>
          </div>

          <div className="info-box">
            <h3>🕒 Working Hours</h3>
            <p>Monday - Saturday</p>
            <p>09:00 AM - 06:00 PM</p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="contact-form">

          <h2>Send Message</h2>

          <form>

            <input
              type="text"
              placeholder="Enter Your Name"
            />

            <input
              type="email"
              placeholder="Enter Your Email"
            />

            <input
              type="tel"
              placeholder="Enter Your Phone Number"
            />

            <textarea
              rows="5"
              placeholder="Write Your Message"
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

      {/* FAQ Section */}
      <section className="faq-section">

        <h2>Frequently Asked Questions</h2>

        <div className="faq-container">

          <details>
            <summary>What is Omsanjeevni?</summary>
            <p>
              Omsanjeevni is a smart medicine distribution platform that
              connects Distributors, Shopkeepers, and Customers.
            </p>
          </details>

          <details>
            <summary>
              Can a Shopkeeper order directly from a Distributor?
            </summary>
            <p>
              Yes, Shopkeepers can place orders directly with Distributors
              through the platform.
            </p>
          </details>

          <details>
            <summary>
              Is Inventory Management available?
            </summary>
            <p>
              Yes, the platform provides Inventory Tracking, Low Stock Alerts,
              and Expiry Alerts.
            </p>
          </details>

          <details>
            <summary>
              Can customers search for medicines?
            </summary>
            <p>
              Yes, customers can search and check medicine availability through
              the platform.
            </p>
          </details>

          <details>
            <summary>
              Who can use Omsanjeevni?
            </summary>
            <p>
              Distributors, Pharmacy Owners, Medical Store Owners, and Customers
              can use the platform.
            </p>
          </details>

          <details>
            <summary>
              Will Omsanjeevni be available across India?
            </summary>
            <p>
              Our goal is to build a nationwide medicine distribution network
              across India.
            </p>
          </details>

        </div>

      </section>

    </div>
    <Footer/>
    </>
  );
};

export default Contact;