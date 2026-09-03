import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HelpSupport.css";

const BASE_URL = "http://localhost:5000/api";

const HelpSupport = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [openFaq, setOpenFaq] = useState(null);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("USER LOAD ERROR:", err);
    }

    loadTickets();
  }, []);

  // ==========================================
  // AUTH HEADERS
  // ==========================================

  const getHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // ==========================================
  // GET MY SUPPORT TICKETS
  // GET /api/support
  // ==========================================

  const loadTickets = async () => {
    try {
      setTicketsLoading(true);

      const response = await fetch(
        `${BASE_URL}/support`,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTickets(
          Array.isArray(data.data)
            ? data.data
            : []
        );
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error(
        "LOAD SUPPORT TICKETS ERROR:",
        err
      );

      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  };

  // ==========================================
  // CREATE SUPPORT TICKET
  // POST /api/support
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!subject.trim()) {
      setError("Subject is required.");
      return;
    }

    if (!message.trim()) {
      setError("Message is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/support`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
            subject: subject.trim(),
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Failed to create support ticket."
        );

        return;
      }

      setSuccess(
        "Support ticket created successfully."
      );

      setSubject("");
      setMessage("");

      // Refresh ticket list
      await loadTickets();
    } catch (err) {
      console.error(
        "CREATE SUPPORT TICKET ERROR:",
        err
      );

      setError(
        "Unable to connect with support server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ROLE
  // ==========================================

  const role = String(
    user?.role || "customer"
  ).toLowerCase();

  const getRoleTitle = () => {
    if (role === "shopkeeper") {
      return "Shopkeeper Support";
    }

    if (role === "distributor") {
      return "Distributor Support";
    }

    return "Customer Support";
  };

  // ==========================================
  // HELP TOPICS
  // ==========================================

  const getHelpTopics = () => {
    if (role === "shopkeeper") {
      return [
        {
          icon: "📦",
          title: "Customer Orders",
        },
        {
          icon: "💊",
          title: "Medicine Stock",
        },
        {
          icon: "💰",
          title: "Payment & Earnings",
        },
        {
          icon: "🚚",
          title: "Delivery",
        },
      ];
    }

    if (role === "distributor") {
      return [
        {
          icon: "📦",
          title: "Shopkeeper Orders",
        },
        {
          icon: "💊",
          title: "Medicine & Stock",
        },
        {
          icon: "💰",
          title: "Payments",
        },
        {
          icon: "🚚",
          title: "Supply & Delivery",
        },
      ];
    }

    return [
      {
        icon: "📦",
        title: "Medicine Order",
      },
      {
        icon: "💳",
        title: "Payment Issue",
      },
      {
        icon: "📄",
        title: "Prescription",
      },
      {
        icon: "🚚",
        title: "Delivery",
      },
    ];
  };

  // ==========================================
  // FAQ
  // ==========================================

  const faqs = [
    {
      question:
        "How can I create a support ticket?",

      answer:
        "Enter your problem subject and message in the support form and click Submit Ticket.",
    },

    {
      question:
        "Where can I see my support tickets?",

      answer:
        "Your submitted support tickets will appear in the My Support Tickets section on this page.",
    },

    {
      question:
        "How can I check my ticket status?",

      answer:
        "Every ticket displays its current status such as Pending, In Progress or Resolved.",
    },

    {
      question:
        "Will I receive a reply from Admin?",

      answer:
        "Yes. When Admin replies to your ticket, the latest reply will appear inside your ticket.",
    },

    {
      question:
        "What should I mention in a payment complaint?",

      answer:
        "Mention your order ID, transaction details and explain exactly what happened.",
    },
  ];

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    if (status === "Resolved") {
      return "resolved";
    }

    if (status === "In Progress") {
      return "in-progress";
    }

    return "pending";
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="help-support-page">

      {/* =====================================
          HEADER
      ====================================== */}

      <div className="help-support-header">

        <button
          type="button"
          className="help-back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div>
          <h1>{getRoleTitle()}</h1>

          <p>
            We're here to help you
          </p>
        </div>

      </div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="help-support-container">

        {/* WELCOME */}

        <div className="help-welcome-card">

          <div className="help-welcome-icon">
            🎧
          </div>

          <div>

            <h2>
              Hello {user?.name || "User"} 👋
            </h2>

            <p>
              Need help? Create a support ticket
              and our team will assist you.
            </p>

          </div>

        </div>

        {/* =================================
            QUICK CONTACT
        ================================== */}

        <div className="help-section">

          <div className="help-section-heading">

            <h2>
              Quick Help
            </h2>

            <p>
              Contact our support team directly.
            </p>

          </div>

          <div className="help-contact-grid">

            <a
              href="tel:+916204872422"
              className="help-contact-card"
            >

              <div className="help-contact-icon">
                📞
              </div>

              <div>

                <h3>
                  Call Support
                </h3>

                <p>
                  +91 6204872422
                </p>

              </div>

            </a>

            <a
              href="mailto:support@omsanjeevni.com"
              className="help-contact-card"
            >

              <div className="help-contact-icon">
                ✉️
              </div>

              <div>

                <h3>
                  Email Support
                </h3>

                <p>
                  support@omsanjeevni.com
                </p>

              </div>

            </a>

          </div>

        </div>

        {/* =================================
            HELP TOPICS
        ================================== */}

        <div className="help-section">

          <div className="help-section-heading">

            <h2>
              Help Topics
            </h2>

            <p>
              Common areas where you may need help.
            </p>

          </div>

          <div className="help-topic-grid">

            {getHelpTopics().map(
              (topic, index) => (

                <div
                  className="help-topic-card"
                  key={index}
                >

                  <div className="help-topic-icon">
                    {topic.icon}
                  </div>

                  <h3>
                    {topic.title}
                  </h3>

                </div>

              )
            )}

          </div>

        </div>

        {/* =================================
            CREATE TICKET
        ================================== */}

        <div className="help-section">

          <div className="help-section-heading">

            <h2>
              Create Support Ticket
            </h2>

            <p>
              Explain your problem and our team
              will help you.
            </p>

          </div>

          <form
            className="help-ticket-form"
            onSubmit={handleSubmit}
          >

            <div className="help-form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Enter your problem"
                maxLength={150}
              />

            </div>

            <div className="help-form-group">

              <label>
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Describe your problem..."
                rows={6}
                maxLength={2000}
              />

            </div>

            {/* ERROR */}

            {error && (
              <div className="help-alert help-error">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="help-alert help-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="help-submit-btn"
              disabled={loading}
            >

              {loading
                ? "Submitting..."
                : "Submit Ticket"}

            </button>

          </form>

        </div>

        {/* =================================
            MY SUPPORT TICKETS
        ================================== */}

        <div className="help-section">

          <div className="help-ticket-heading">

            <div>

              <h2>
                My Support Tickets
              </h2>

              <p>
                Track your submitted support requests.
              </p>

            </div>

            <button
              type="button"
              className="help-refresh-btn"
              onClick={loadTickets}
              disabled={ticketsLoading}
            >
              ↻ Refresh
            </button>

          </div>

          {ticketsLoading ? (

            <div className="help-empty-box">
              Loading your tickets...
            </div>

          ) : tickets.length === 0 ? (

            <div className="help-empty-box">
              No support tickets found.
            </div>

          ) : (

            <div className="help-ticket-list">

              {tickets.map((ticket) => (

                <div
                  className="help-ticket-card"
                  key={ticket._id}
                >

                  <div className="help-ticket-top">

                    <div>

                      <h3>
                        {ticket.subject}
                      </h3>

                      <p>
                        {ticket.message}
                      </p>

                    </div>

                    <span
                      className={`help-status ${getStatusClass(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>

                  </div>

                  <div className="help-ticket-meta">

                    <span>
                      Ticket Date:{" "}
                      {formatDate(
                        ticket.createdAt
                      )}
                    </span>

                    <span>
                      Role:{" "}
                      {ticket.role || role}
                    </span>

                  </div>

                  {/* ADMIN REPLY */}

                  {ticket.reply && (

                    <div className="help-admin-reply">

                      <strong>
                        Admin Reply
                      </strong>

                      <p>
                        {ticket.reply}
                      </p>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>

        {/* =================================
            FAQ
        ================================== */}

        <div className="help-section">

          <div className="help-section-heading">

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Quick answers to common questions.
            </p>

          </div>

          <div className="help-faq-list">

            {faqs.map((faq, index) => (

              <div
                className="help-faq-item"
                key={index}
              >

                <button
                  type="button"
                  className="help-faq-question"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index
                        ? null
                        : index
                    )
                  }
                >

                  <span>
                    {faq.question}
                  </span>

                  <span>
                    {openFaq === index
                      ? "−"
                      : "+"}
                  </span>

                </button>

                {openFaq === index && (

                  <div className="help-faq-answer">

                    {faq.answer}

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default HelpSupport;