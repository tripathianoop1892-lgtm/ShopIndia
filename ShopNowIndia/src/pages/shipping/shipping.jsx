import React from "react";
import { Link } from "react-router-dom";
import LegalPage, { LegalSection } from "../../components/LegalPage/LegalPage";
import { businessDetails } from "../../config/businessDetails";

const Shipping = () => (
  <LegalPage
    badge={`Last updated ${businessDetails.policyUpdatedAt}`}
    title="Shipping & Delivery Policy"
    lead="Orders are fulfilled by the pharmacy or distributor identified in the order confirmation. Delivery availability and timelines depend on the seller and destination."
  >
    <LegalSection title="1. Service area and seller responsibility">
      <p>Delivery is available only to locations served by the selected pharmacy, distributor, or its delivery partner. The order confirmation identifies the seller responsible for invoicing, packing, statutory checks, dispatch, and delivery.</p>
    </LegalSection>

    <LegalSection title="2. Estimated timelines">
      <ul>
        <li>Retail pharmacy orders are normally delivered within 2–7 business days.</li>
        <li>Wholesale distributor orders are normally delivered within 3–10 business days.</li>
        <li>Remote locations, regulated products, prescription review, holidays, weather, and stock verification may extend these estimates.</li>
      </ul>
      <p>These are estimates rather than guaranteed delivery dates. Material delays will be communicated using the contact details provided with the order.</p>
    </LegalSection>

    <LegalSection title="3. Charges and order tracking">
      <p>Applicable product prices, taxes, platform fees, and delivery charges are displayed before payment and recorded in the order summary. Buyers can review the current order status from their account and may contact support when tracking information is unavailable.</p>
    </LegalSection>

    <LegalSection title="4. Prescription and delivery checks">
      <p>Where required by law, fulfilment is subject to a valid prescription and seller verification. The seller may refuse or cancel an order that lacks required documentation, exceeds lawful quantities, or cannot be supplied safely. Any resulting prepaid refund follows our <Link to="/refunds">Cancellation, Return & Refund Policy</Link>.</p>
    </LegalSection>

    <LegalSection title="5. Delivery problems">
      <p>Report a missing, damaged, incorrect, or expired shipment within 48 hours through the <Link to="/contact">Contact and Grievance page</Link>. Do not use a damaged, tampered, incorrectly supplied, or expired medicine.</p>
    </LegalSection>
  </LegalPage>
);

export default Shipping;

