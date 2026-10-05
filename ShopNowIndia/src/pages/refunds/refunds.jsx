import React from "react";
import { Link } from "react-router-dom";
import LegalPage, { LegalSection } from "../../components/LegalPage/LegalPage";
import { businessDetails } from "../../config/businessDetails";

const Refunds = () => (
  <LegalPage
    badge={`Last updated ${businessDetails.policyUpdatedAt}`}
    title="Cancellation, Return & Refund Policy"
    lead="This policy explains when an OmSanjeevani order may be cancelled, returned, or refunded and the timelines that apply."
  >
    <LegalSection title="1. Order cancellation">
      <p>A buyer may request cancellation through the support form before the seller has packed or dispatched the order. Cancellation is not guaranteed after fulfilment has begun.</p>
      <p>If a prepaid order is rejected by the seller or cannot be fulfilled, OmSanjeevani will initiate a full refund to the original payment method within 5–7 business days.</p>
    </LegalSection>

    <LegalSection title="2. Medicine return restrictions">
      <p>For patient safety, medicines generally cannot be returned after delivery when the seal has been opened, the product has been used, or storage conditions can no longer be verified. Prescription medicines, temperature-sensitive products, and products with tampered packaging are non-returnable except where the seller supplied an incorrect, damaged, expired, counterfeit, or otherwise defective item.</p>
    </LegalSection>

    <LegalSection title="3. Incorrect, damaged, or expired items">
      <p>Report the issue within 48 hours of delivery. Include the order number, invoice, product name, batch and expiry details, and clear photographs of the package and item. The seller may request collection or inspection before approving replacement or refund.</p>
    </LegalSection>

    <LegalSection title="4. Refund processing timeline">
      <ul>
        <li>Approved refunds are initiated to the original payment method within 5–7 business days.</li>
        <li>Banks and payment providers may require an additional 5–10 business days to reflect the credit.</li>
        <li>Duplicate or failed-payment claims are investigated within 7 business days.</li>
        <li>Delivery charges are refunded when the entire order is cancelled before dispatch or when the complete shipment is incorrect, damaged, expired, or undeliverable.</li>
      </ul>
    </LegalSection>

    <LegalSection title="5. Requesting assistance">
      <p>Submit a request through the <Link to="/contact">Contact and Grievance page</Link>, email <a href={`mailto:${businessDetails.supportEmail}`}>{businessDetails.supportEmail}</a>, or call <a href={`tel:${businessDetails.supportPhone.replace(/\s/g, "")}`}>{businessDetails.supportPhone}</a> during business hours. We acknowledge grievances within 48 hours and aim to resolve them within 30 days.</p>
    </LegalSection>
  </LegalPage>
);

export default Refunds;

