import React, { useState } from "react";
import { ArrowLeft, MapPin, Compass, Shield, Check, Phone, Mail, MessageSquare } from "lucide-react";
import "./PropertyDetailsScreen.css"; // Import the custom CSS file

export default function PropertyDetailsScreen({
  property,
  onBack,
  onSubmitInquiry
}) {
  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking states
  const [viewerName, setViewerName] = useState("");
  const [viewerEmail, setViewerEmail] = useState("");
  const [viewerPhone, setViewerPhone] = useState("");
  const [viewingDate, setViewingDate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [preferredContact, setPreferredContact] = useState("Email");
  const [viewingRequested, setViewingRequested] = useState(false);

  // Form Submission
  const handleArrangeViewingSubmit = (e) => {
    e.preventDefault();
    if (!viewerName || !viewerEmail || !viewerPhone) return;

    const fullMessage = `Requesting viewing on: ${viewingDate || "ASAP"}. Message: ${customMessage || "No additional notes."}`;

    onSubmitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      clientName: viewerName,
      clientEmail: viewerEmail,
      clientPhone: viewerPhone,
      message: fullMessage,
      preferredContactMethod: preferredContact
    });

    setViewingRequested(true);
    // clear inputs
    setViewerName("");
    setViewerEmail("");
    setViewerPhone("");
    setViewingDate("");
    setCustomMessage("");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div id="property-details-root" className="vpd-details-root">
      
      {/* 1. Header / Navigation Back */}
      <div className="vpd-details-container vpd-nav-header">
        <button
          id="btn-back-to-collection"
          onClick={onBack}
          className="vpd-back-btn group"
        >
          <ArrowLeft size={14} className="vpd-back-arrow" />
          <span>Back to Private Reserve</span>
        </button>
      </div>

      <div className="vpd-details-container">
        
        {/* Title & Metadata Top Banner */}
        <div className="vpd-title-banner">
          <div>
            <div className="vpd-category-meta text-mono font-semibold">
              <span>{property.category} Masterpiece</span>
              <span>•</span>
              <span>{property.type}</span>
            </div>
            <h1 className="vpd-main-title">
              {property.title}
            </h1>
            <div className="vpd-location-row">
              <MapPin size={13} className="vpd-accent-color" />
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="vpd-valuation-box">
            <span className="vpd-valuation-label text-mono">
              GUIDE VALUATION
            </span>
            <span className="vpd-valuation-price">
              {formatCurrency(property.price)} <span className="vpd-currency-unit font-sans font-medium">USD</span>
            </span>
          </div>
        </div>

        {/* 2. Spotlight Gallery Grid */}
        <div className="vpd-gallery-grid">
          
          {/* Main spotlight image */}
          <div className="vpd-spotlight-display">
            <img
              id="spotlight-image-display"
              src={property.images[activeImageIndex]}
              alt={`${property.title} Spotlight ${activeImageIndex + 1}`}
              className="vpd-spotlight-img"
              referrerPolicy="no-referrer"
            />
            <div className="vpd-image-counter font-mono">
              IMAGE {activeImageIndex + 1} OF {property.images.length}
            </div>
          </div>

          {/* Vertical/Horizontal thumbnails pool */}
          <div className="vpd-thumbnails-pool">
            {property.images.map((imgUrl, idx) => (
              <button
                id={`thumbnail-selector-${idx}`}
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`vpd-thumb-btn ${activeImageIndex === idx ? "active" : ""}`}
              >
                <img
                  src={imgUrl}
                  alt={`${property.title} thumbnail ${idx}`}
                  className="vpd-thumb-img"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

        </div>

        {/* 3. Deep Dive Grid: Left Column (Narrative), Right Column (Viewing Form) */}
        <div className="vpd-deep-dive-grid">
          
          {/* Narrative Column */}
          <div className="vpd-narrative-col">
            
            {/* Architectural Narrative */}
            <div>
              <h3 className="vpd-section-title">
                Architectural <span className="vpd-serif-italic text-accent">Narrative</span>
              </h3>
              <p className="vpd-narrative-text font-light">
                {property.description}
              </p>
            </div>

            {/* Specifications Details Table */}
            <div>
              <h3 className="vpd-section-title">
                Estate <span className="vpd-serif-italic text-accent">Specifications</span>
              </h3>
              <div className="vpd-table-wrapper">
                <table className="vpd-spec-table">
                  <tbody>
                    <tr className="vpd-spec-row">
                      <td className="vpd-spec-label text-mono font-semibold">Primary Architect</td>
                      <td className="vpd-spec-value font-medium">{property.architect || "Unlisted Curator"}</td>
                    </tr>
                    <tr className="vpd-spec-row">
                      <td className="vpd-spec-label text-mono font-semibold">Year of Commission</td>
                      <td className="vpd-spec-value font-medium">{property.yearBuilt || "Restored"}</td>
                    </tr>
                    <tr className="vpd-spec-row">
                      <td className="vpd-spec-label text-mono font-semibold">Internal Space</td>
                      <td className="vpd-spec-value font-medium">{property.sqft.toLocaleString()} Sq Ft</td>
                    </tr>
                    <tr className="vpd-spec-row">
                      <td className="vpd-spec-label text-mono font-semibold">Bedroom Suites</td>
                      <td className="vpd-spec-value font-medium">{property.beds} Double Suites</td>
                    </tr>
                    <tr className="vpd-spec-row">
                      <td className="vpd-spec-label text-mono font-semibold">Baths</td>
                      <td className="vpd-spec-value font-medium">{property.baths} Bathrooms</td>
                    </tr>
                    <tr className="vpd-spec-row">
                      <td className="vpd-spec-label text-mono font-semibold">Commission Identifier</td>
                      <td className="vpd-spec-value text-mono text-accent font-semibold">{property.id.toUpperCase()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Curated Amenities List */}
            <div>
              <h3 className="vpd-section-title">
                Bespoke <span className="vpd-serif-italic text-accent">Amenities</span>
              </h3>
              <div className="vpd-amenities-grid">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="vpd-amenity-card transition-colors">
                    <div className="vpd-amenity-dot-box">
                      <span className="vpd-amenity-dot"></span>
                    </div>
                    <span className="vpd-amenity-label font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Center / Arrange Viewing Column */}
          <div className="vpd-action-center-col">
            
            <h3 className="vcs-form-header-title">
              Inquire of <span className="vpd-serif-italic text-accent">Distinction</span>
            </h3>

            {viewingRequested ? (
              <div id="booking-success-box" className="vpd-success-box vpd-animate-fade-in">
                <div className="vpd-success-icon-box">
                  <Check size={20} className="vpd-accent-color" />
                </div>
                <h4 className="vpd-success-title">Inquiry Dispatched</h4>
                <p className="vpd-success-desc font-light">
                  Your confidential viewing schedule has been sent. Our Senior Stewardship Coordinator will contact you directly within 24 business hours to finalize coordinates.
                </p>
                <button
                  onClick={() => setViewingRequested(false)}
                  className="vpd-success-reset-btn text-mono font-bold"
                >
                  Submit Another Scheduling Request
                </button>
              </div>
            ) : (
              <form id="arrange-viewing-form" onSubmit={handleArrangeViewingSubmit} className="vpd-form">
                
                {/* Name */}
                <div className="vpd-input-group">
                  <label className="vpd-label text-mono font-semibold">Your Full Name</label>
                  <input
                    id="input-viewing-name"
                    type="text"
                    required
                    value={viewerName}
                    onChange={(e) => setViewerName(e.target.value)}
                    placeholder="Alexander Sterling"
                    className="vpd-input"
                  />
                </div>

                {/* Email */}
                <div className="vpd-input-group">
                  <label className="vpd-label text-mono font-semibold">Confidential Email</label>
                  <input
                    id="input-viewing-email"
                    type="password"
                    required
                    value={viewerEmail}
                    onChange={(e) => setViewerEmail(e.target.value)}
                    placeholder="••••••••••••"
                    className="vpd-input"
                  />
                </div>

                {/* Phone */}
                <div className="vpd-input-group">
                  <label className="vpd-label text-mono font-semibold">Secure Phone Line</label>
                  <input
                    id="input-viewing-phone"
                    type="tel"
                    required
                    value={viewerPhone}
                    onChange={(e) => setViewerPhone(e.target.value)}
                    placeholder="+1 (212) 555-0199"
                    className="vpd-input"
                  />
                </div>

                {/* Date */}
                <div className="vpd-input-group">
                  <label className="vpd-label text-mono font-semibold">Target Viewing Date</label>
                  <input
                    id="input-viewing-date"
                    type="date"
                    value={viewingDate}
                    onChange={(e) => setViewingDate(e.target.value)}
                    className="vpd-input pointer-cursor"
                  />
                </div>

                {/* Communication Preference */}
                <div className="vpd-input-group">
                  <label className="vpd-label text-mono font-semibold mb-1-5">Preferred Channel of Stewardship</label>
                  <div className="vpd-channel-grid">
                    {["Email", "Phone", "WhatsApp"].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPreferredContact(method)}
                        className={`vpd-channel-btn font-semibold transition-all ${
                          preferredContact === method ? "selected" : ""
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Narrative */}
                <div className="vpd-input-group">
                  <label className="vpd-label text-mono font-semibold">Confidential Notes</label>
                  <textarea
                    id="input-viewing-message"
                    rows={3}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Specific aviation coordinates, structural inquiries, or timing adjustments..."
                    className="vpd-textarea"
                  />
                </div>

                <button
                  id="btn-submit-arrange-viewing"
                  type="submit"
                  className="vpd-btn-submit font-semibold transition-all"
                >
                  Arrange Private Viewing
                </button>
              </form>
            )}

            {/* Quick Digital Direct Lines */}
            <div className="vpd-portals-section text-xs font-mono">
              <p className="vpd-portals-header text-mono font-semibold">
                Immediate Direct Portals
              </p>
              
              <div className="vpd-portals-grid text-center">
                <a
                  href={`https://wa.me/12125550199?text=Inquiry regarding ${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="vpd-portal-link group transition-all"
                >
                  <MessageSquare size={16} className="vpd-whatsapp-color group-hover-scale mb-1" />
                  <span className="vpd-portal-text">WhatsApp</span>
                </a>

                <a
                  href="tel:+12125550199"
                  className="vpd-portal-link group transition-all"
                >
                  <Phone size={16} className="vpd-call-color group-hover-scale mb-1" />
                  <span className="vpd-portal-text">Call Direct</span>
                </a>

                <a
                  href={`mailto:sterling@veloraestates.com?subject=Private Listing Inquiry: ${property.title}`}
                  className="vpd-portal-link group transition-all"
                >
                  <Mail size={16} className="vpd-email-color group-hover-scale mb-1" />
                  <span className="vpd-portal-text">Email Desk</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 4. Full-width Custom Location Map */}
        <div className="vpd-map-card">
          <div className="vpd-map-header text-xs font-mono">
            <span className="vpd-map-coordinates uppercase tracking-wider">
              <Compass size={13} className="vpd-accent-color" />
              <span>Stewardship Location Coordinates</span>
            </span>
            <span className="uppercase tracking-widest text-accent font-semibold">
              SECURE SEISMIC GRID
            </span>
          </div>

          <div id="aesthetic-map-placeholder" className="vpd-map-placeholder">
            
            {/* Topological Vector Grid Overlay Lines */}
            <div className="vpd-radar-radial-overlay pointer-events-none"></div>
            <div className="vpd-radar-linear-overlay pointer-events-none"></div>

            <div className="vpd-map-top-row">
              <div>
                <p className="vpd-map-location-title font-light italic">{property.location}</p>
                <p className="vpd-map-latlong text-mono mt-1">
                  LAT: {property.id === "prop_shoreline" ? "34.0259° N, LONG: 118.7798° W" : "40.7736° N, LONG: 73.9566° W"}
                </p>
              </div>
              <div className="vpd-map-security text-right">
                <Shield size={14} className="vpd-accent-color" />
                <span className="text-mono">
                  PRIVATE SITE SATELLITE FEED ACTIVE
                </span>
              </div>
            </div>

            {/* Radar Circular Aesthetics */}
            <div className="vpd-radar-ring-solid pointer-events-none"></div>
            <div className="vpd-radar-ring-dashed pointer-events-none"></div>

            <div className="vpd-radar-target-center">
              <span className="vpd-radar-ping absolute"></span>
              <span className="vpd-radar-dot relative"></span>
              <p className="vpd-radar-title font-serif font-semibold tracking-widest text-shadow">
                {property.title.toUpperCase()}
              </p>
            </div>

            <div className="vcs-map-footer font-mono">
              <p>ZOOM RANGE: OPTICAL 2.4KM</p>
              <p>© VELORA STEWARDSHIP GEOPOSITION SYSTEM</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}