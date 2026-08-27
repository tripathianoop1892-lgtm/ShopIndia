import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./StoreQr.css";

const StoreQr = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const shopId = user?.shopId || localStorage.getItem("shopId");
  const shopLink = shopId ? `${window.location.origin}/register?shopId=${encodeURIComponent(shopId)}` : "";

  return <main className="store-qr-page">
    <button className="store-qr-close" type="button" onClick={() => navigate("/shopkeeper")} aria-label="Close QR page">×</button>
    <section className="store-qr-content">
      <p className="store-qr-eyebrow">Om Sanjeevani Storefront</p>
      <h1>Scan to join this pharmacy</h1>
      <p className="store-qr-description">Customers can scan this code to open registration with your store already selected.</p>
      {shopLink ? <><div className="store-qr-code"><QRCodeCanvas value={shopLink} size={420} level="H" includeMargin /></div><p className="store-qr-id">Store ID: <strong>{shopId}</strong></p></> : <p className="store-qr-error">Your store ID is not available. Please sign in again or contact support.</p>}
    </section>
  </main>;
};

export default StoreQr;
