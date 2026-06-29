import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Inbox, ArrowUpRight } from "lucide-react";
import "./BrowseScreen.css"; // Import the custom CSS file
// import "./BrowseScreen.css"; // Import the custom CSS file

export default function LandingPage({ properties, currentUser, onToggleFavorite }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => prop.status === "Active");
  }, [properties]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setNewsletterSubscribed(true); setEmail(""); }
  };


  return (
    <div id="browse-screen-root" className="vb-screen-root">
      
      {/* Editorial Hero Banner */}
      <section id="hero-section" className="vb-hero-section">
        <div className="vb-hero-bg-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
            alt="Velora Hero Background" 
            className="vb-hero-img" 
          />
        </div>
        <div className="vb-hero-overlay"></div>
        <div className="vb-hero-container">
          <div className="vb-badge-wrapper">
            <span className="vb-pulse-dot"></span>
            <span className="vb-badge-text text-mono">The Private Reserve</span>
          </div>
          <h1 className="vb-hero-title">
            Curation of <span className="vb-serif-italic">Distinction</span>
          </h1>
          <p className="vb-hero-desc">
            Velora Estates represents the absolute pinnacle of global architectural heritage, low-profile stewardship, and bespoke residential sanctuaries crafted for generations.
          </p>
        </div>
      </section>

      {/* Main Collection Display */}
     

    </div>
  );
}