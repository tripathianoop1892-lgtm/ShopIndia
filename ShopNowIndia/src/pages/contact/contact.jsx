import React, { useState } from "react";
import "./contact.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

// Professional Material UI Icons matching corporate layouts
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { createPublicSupportTicket } from "../../services/api";
import { businessDetails } from "../../config/businessDetails";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [status, setStatus] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await createPublicSupportTicket(form);
      if (!response.success) throw new Error(response.message);
      setStatus("Your message has been sent.");
      setForm({ name: "", email: "", mobile: "", message: "" });
    } catch (error) { setStatus(error.message || "Unable to send your message."); }
  };
  return (
    <>
      <Navbar />
      <div className="contact-page-wrapper">

        {/* Hero Header Section with Vector Lighting Glows */}
        <section className="contact-hero-panel">
          <div className="contact-bg-orb contact-orb-emerald"></div>
          <div className="contact-bg-orb contact-orb-indigo"></div>
          
          <div className="contact-hero-inner">
            <div>
            <span className="contact-badge-pill">Support Center</span>
            <h1>Contact Us</h1>
            <p className="contact-hero-lead">
              Contact OmSanjeevani for account, order, payment, and marketplace support.
            </p>
            </div>
            <img src="contactpic.png" alt="OmSanjeevani customer support" className="contact-hero-illustration" />
          </div>
        </section>

        {/* Core Layout Split Section */}
        <div className="contact-main-grid-container">
          <div className="contact-split-layout">

            {/* Left Side: Structured Contact Cards Information */}
            <div className="contact-info-cards-column">
              <h2>Get In Touch</h2>
              <p className="column-subtitle">Use the contact details below for customer support, legal notices, and grievances.</p>

              <div className="info-glass-card">
                <div className="info-icon-wrapper blue">
                  <LocationOnIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Business Owner & Trading Name</h3>
                  <p>{businessDetails.ownerName}, trading as {businessDetails.brandName}</p>
                  <p className="fine-time">{businessDetails.businessType}</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper blue">
                  <LocationOnIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Business Correspondence Address</h3>
                  <p>{businessDetails.businessAddress}</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper green">
                  <PhoneIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Direct Support Line</h3>
                  <p>{businessDetails.supportPhone}</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper purple">
                  <EmailIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Support Email</h3>
                  <p>{businessDetails.supportEmail}</p>
                </div>
              </div>

              <div className="info-glass-card">
                <div className="info-icon-wrapper gold">
                  <AccessTimeIcon className="mui-contact-icon" />
                </div>
                <div className="info-txt-meta">
                  <h3>Active Working Hours</h3>
                  <p>{businessDetails.businessHours}</p>
                </div>
              </div>
            </div>

            {/* Right Side: Secure Communication Form Sheet */}
            <div className="contact-secure-form-column">
              <h2>Send Message</h2>
              <p className="column-subtitle">Send your query to the OmSanjeevani support contact.</p>
              
              <form onSubmit={submit}>
                <div className="form-input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter Your Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
                </div>

                <div className="form-input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter Your Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
                </div>

                <div className="form-input-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter Your Phone Number" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} />
                </div>

                <div className="form-input-group">
                  <label>Message Content</label>
                  <textarea rows="5" placeholder="Write Your Message Here..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required></textarea>
                </div>

                <button type="submit" className="form-submit-dispatch-btn">
                  <SendIcon className="submit-btn-icon" /> Send Message
                </button>
                {status && <p>{status}</p>}
              </form>
            </div>

          </div>
        </div>

        <section className="grievance-section" id="grievance">
          <div>
            <span>Grievance redressal</span>
            <h2>{businessDetails.grievanceOfficer}</h2>
            <p><strong>{businessDetails.grievanceDesignation}</strong></p>
            <p>Email: <a href={`mailto:${businessDetails.grievanceEmail}`}>{businessDetails.grievanceEmail}</a></p>
            <p>Phone: <a href={`tel:${businessDetails.supportPhone.replace(/\s/g, "")}`}>{businessDetails.supportPhone}</a></p>
          </div>
          <div>
            <h3>Complaint timeline</h3>
            <p>We acknowledge customer complaints within 48 hours and aim to resolve them within 30 days. Include your order number, registered contact details, and a concise description of the issue.</p>
          </div>
        </section>

        {/* Dynamic FAQ Details Toggles Section */}
        <section className="faq-interactive-section">
          <div className="faq-section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick-reference answers about the OmSanjeevani platform.</p>
          </div>
          
          <div className="faq-toggles-wrapper">
            <details>
              <summary>What is OmSanjeevani?</summary>
              <p>
                OmSanjeevani is a smart medicine distribution platform that connects wholesale Distributors, pharmacy Shopkeepers, and retail Customers on a unified digital ecosystem.
              </p>
            </details>

            <details>
              <summary>Can a Shopkeeper order directly from a Distributor?</summary>
              <p>
                Participating Shopkeepers can review distributor inventory catalogues and place B2B order requests through their workspace panel. Each seller remains responsible for maintaining all licences required for its activity.
              </p>
            </details>

            <details>
              <summary>Is Inventory Management available?</summary>
              <p>
                The seller dashboards include inventory counts, low-stock views, and expiry-date alerts based on the listing data entered by each seller.
              </p>
            </details>

            <details>
              <summary>Can customers search for medicines?</summary>
              <p>
                Customers linked to a participating pharmacy can view that pharmacy's current catalogue. Availability and prices are supplied by the seller and may change.
              </p>
            </details>

            <details>
              <summary>Who can use OmSanjeevani?</summary>
              <p>
                Pharmaceutical distributors, retail pharmacy operators, and customers may use the relevant modules. Registration does not itself certify a business or replace any statutory licence.
              </p>
            </details>

            <details>
              <summary>Will OmSanjeevani be available across India?</summary>
              <p>
                OmSanjeevani is currently operated from Delhi. Service availability depends on participating sellers and is not represented as nationwide coverage.
              </p>
            </details>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Contact;
