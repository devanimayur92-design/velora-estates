import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Inbox, ArrowUpRight } from "lucide-react";
import "./BrowseScreen.css"; // Import the custom CSS file

export default function BrowseScreen({ properties, currentUser, onToggleFavorite }) {
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
      <section id="collection-grid" className="vb-collection-section">
        <div className="vb-collection-header">
          <div>
            <h2 className="vb-collection-title">Available <span className="vb-serif-italic">Sanctuaries</span></h2>
            <p className="vb-collection-subtitle text-mono">Showing {filteredProperties.length} architectural reserves</p>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="vb-empty-state">
            <Inbox className="vb-empty-icon" size={40} />
            <h3 className="vb-empty-title">No Matching Reservoirs</h3>
            <p className="vb-empty-desc">Our curated portfolio is highly exclusive.</p>
          </div>
        ) : (
          <div className="vb-card-grid">
            {filteredProperties.map((estate) => {
              const isFavorited = currentUser?.favorites?.includes(estate.id) || false;
              return (
                <article key={estate.id} className="vb-estate-card group">
                  <div className="vb-card-media-box">
                    <img src={estate.images[0]} alt={estate.title} className="vb-card-img" />
                    <div className="vb-media-gradient"></div>
                    <span className="vb-category-tag text-mono">
                      {estate.category} Sanctuary
                    </span>
                    
                    {/* The Compulsory Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(estate.id);
                      }}
                      className="vb-favorite-btn"
                    >
                      <Heart size={15} className={isFavorited ? "favorited" : "not-favorited"} />
                    </button>
                    
                    {/* Hover Overlay Button */}
                    <div className="vb-hover-action-overlay">
                      <button onClick={() => navigate(`/property/${estate.id}`)} className="vb-explore-overlay-btn">
                        <span>Explore Narrative</span><ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="vb-card-content">
                    <div className="vb-card-top-content">
                      <div className="vb-location-row text-mono">
                        <MapPin size={12} className="vb-icon-accent" />
                        <span>{estate.location}</span>
                      </div>
                      <h3 onClick={() => navigate(`/property/${estate.id}`)} className="vb-card-title">
                        {estate.title}
                      </h3>
                      <p className="vb-card-desc line-clamp-2">{estate.description}</p>
                    </div>
                    
                    <div className="vb-card-footer">
                      <div className="vb-footer-action-row text-mono">
                        <button onClick={() => navigate(`/property/${estate.id}`)} className="vb-details-link">
                          <span>Explore Details</span><span>&rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}