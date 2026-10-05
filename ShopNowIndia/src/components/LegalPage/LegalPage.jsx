import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import "./LegalPage.css";

const LegalPage = ({ badge, title, lead, children }) => (
  <>
    <Navbar />
    <main className="legal-page">
      <header className="legal-hero">
        <span>{badge}</span>
        <h1>{title}</h1>
        <p>{lead}</p>
      </header>
      <div className="legal-content">{children}</div>
    </main>
    <Footer />
  </>
);

export const LegalSection = ({ title, children }) => (
  <section className="legal-section">
    <h2>{title}</h2>
    {children}
  </section>
);

export default LegalPage;

