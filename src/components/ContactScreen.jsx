import React, { useState } from "react";
import { Mail, Phone, MapPin, Compass, Check, Clock } from "lucide-react";
import "./ContactScreen.css"; // Import the custom CSS file

export default function ContactScreen({ onSubmitInquiry }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [preferredContact, setPreferredContact] = useState("Email");
  const [formDispatched, setFormDispatched] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please supply Name, Email and Message to dispatch inquiry.");
      return;
    }

    onSubmitInquiry({
      clientName: name,
      clientEmail: email,
      clientPhone: phone || "+1 (555) 000-0000",
      message: message,
      preferredContactMethod: preferredContact
    });
    
    setFormDispatched(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div id="contact-screen-root" className="vcs-screen-root">
      
      {/* Title Banner */}
      <section className="vcs-banner-section">
        <div className="vcs-banner-container">
          <span className="vcs-meta-tag text-mono font-semibold">
            PRIVATE CHANNELS
          </span>
          <h1 className="vcs-banner-title">
            Direct <span className="vcs-serif-italic text-accent">Inquiry Registry</span>
          </h1>
          <p className="vcs-banner-desc font-light">
            All correspondence is protected under legal confidentiality protocols. Establish coordinates with our principal stewardship coordinators.
          </p>
        </div>
      </section>

      {/* Main Form and Coordinate Columns */}
      <section className="vcs-main-section">
        <div className="vcs-layout-grid">
          
          {/* Coordinates Details Column (Left) */}
          <div className="vcs-sidebar-col">
            
            <div className="vcs-sidebar-header">
              <span className="vcs-meta-tag text-mono font-semibold">
                GLOBAL REGISTRIES
              </span>
              <h2 className="vcs-sidebar-title">
                Private Lounge <span className="vcs-serif-italic text-accent">Locations</span>
              </h2>
              <p className="vcs-sidebar-desc font-light">
                Physical consultations are available strictly by private pre-arranged coordination at our secure office lounges.
              </p>
            </div>

            {/* List of lounges */}
            <div className="vcs-lounges-list">
              
              {/* New York HQ */}
              <div className="vcs-lounge-card transition-colors">
                <div className="vcs-lounge-icon-box text-accent">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="vcs-lounge-name font-semibold">Upper East Side HQ</h4>
                  <p className="vcs-lounge-address font-light">740 Park Avenue, Suite 12A</p>
                  <p className="vcs-lounge-city text-mono">New York, NY 10021</p>
                </div>
              </div>

              {/* Paris Mooring */}
              <div className="vcs-lounge-card transition-colors">
                <div className="vcs-lounge-icon-box text-accent">
                  <Compass size={16} />
                </div>
                <div>
                  <h4 className="vcs-lounge-name font-semibold">European Mooring Lounge</h4>
                  <p className="vcs-lounge-address font-light">14 Avenue de Montaigne, Quartier d'Antin</p>
                  <p className="vcs-lounge-city text-mono">75008 Paris, France</p>
                </div>
              </div>

              {/* Tokyo Sanctum */}
              <div className="vcs-lounge-card transition-colors">
                <div className="vcs-lounge-icon-box text-accent">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="vcs-lounge-name font-semibold">East Asian Sanctuary Desk</h4>
                  <p className="vcs-lounge-address font-light">3-1-1 Minami-Aoyama, Minato-ku</p>
                  <p className="vcs-lounge-city text-mono">Tokyo 107-0062, Japan</p>
                </div>
              </div>

            </div>

            {/* Direct Digital lines */}
            <div className="vcs-digital-lines">
              <h3 className="vcs-lines-title text-mono font-semibold">Confidential Lines</h3>
              <div className="vcs-lines-content text-mono">
                <div className="vcs-line-row">
                  <Phone size={13} className="text-accent" />
                  <span>TEL: +1 (212) 555-0199</span>
                </div>
                <div className="vcs-line-row">
                  <Mail size={13} className="text-accent" />
                  <span>SECURE DESK: sterling@veloraestates.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Inquiry Form (Right) */}
          <div className="vcs-form-col">
            
            <h3 className="vcs-form-header-title">
              Establish <span className="vcs-serif-italic text-accent">Correspondence</span>
            </h3>

            {formDispatched ? (
              <div id="contact-success-panel" className="vcs-success-panel vcs-animate-fade-in">
                <div className="vcs-success-icon-box">
                  <Check size={20} className="text-accent" />
                </div>
                <h4 className="vcs-success-title font-light">Inquiry Registry Completed</h4>
                <p className="vcs-success-desc font-light">
                  Your communication has been encrypted and securely registered. A senior administrator will contact you regarding private coordinates within 24 business hours.
                </p>
                <button
                  onClick={() => setFormDispatched(false)}
                  className="vcs-success-reset-btn text-mono font-bold"
                >
                  Send Secondary Inscription
                </button>
              </div>
            ) : (
              <form id="contact-direct-form" onSubmit={handleInquirySubmit} className="vcs-form">
                
                <div className="vcs-grid-two-col">
                  {/* Name */}
                  <div className="vcs-input-group">
                    <label className="vcs-label text-mono font-semibold">Your Full Name *</label>
                    <input
                      id="input-contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Eleanor Vance"
                      className="vcs-input"
                    />
                  </div>
                  {/* Email */}
                  <div className="vcs-input-group">
                    <label className="vcs-label text-mono font-semibold">Secure Return Email *</label>
                    <input
                      id="input-contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="evance@sterlingholding.com"
                      className="vcs-input"
                    />
                  </div>
                </div>

                <div className="vcs-grid-two-col">
                  {/* Phone */}
                  <div className="vcs-input-group">
                    <label className="vcs-label text-mono font-semibold">Secure Phone Line</label>
                    <input
                      id="input-contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (415) 321-0088"
                      className="vcs-input"
                    />
                  </div>
                  {/* Preferred Channel */}
                  <div className="vcs-input-group">
                    <label className="vcs-label text-mono font-semibold">Preferred Channel</label>
                    <div className="vcs-channel-grid">
                      {["Email", "Phone", "WhatsApp"].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setPreferredContact(method)}
                          className={`vcs-channel-btn font-semibold transition-all ${
                            preferredContact === method ? "selected" : ""
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Inquiry message */}
                <div className="vcs-input-group">
                  <label className="vcs-label text-mono font-semibold">Confidential Inquiry Narrative *</label>
                  <textarea
                    id="textarea-contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your asset allocation criteria, preferred architectural lineages, or scheduling requirements..."
                    className="vcs-textarea font-light"
                  />
                </div>

                <div className="vcs-checkbox-row">
                  <input
                    id="chk-contact-terms"
                    type="checkbox"
                    required
                    className="vcs-checkbox"
                  />
                  <span className="vcs-checkbox-text text-mono">
                    I authorize the encryptions of my details and endorse the standard Non-Disclosure guidelines.
                  </span>
                </div>

                <button
                  id="btn-submit-contact-inquiry"
                  type="submit"
                  className="vcs-btn-submit font-semibold transition-colors"
                >
                  Dispatch Confidential Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}