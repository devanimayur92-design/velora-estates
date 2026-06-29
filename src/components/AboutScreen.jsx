import React from "react";
import { Award, Compass, Heart, Shield, ArrowRight } from "lucide-react";
import "./AboutScreen.css"; // Import the custom CSS file

export default function AboutScreen({ onNavigate }) {
  return (
    <div id="about-screen-root" className="va-about-root">
      
      {/* 1. Sprawling Panoramic Coastal Hero */}
      <section className="va-hero-section">
        <div className="va-hero-bg-wrapper">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
            alt="Velora Scenic Coastal Cliffs"
            className="va-hero-img"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="va-hero-overlay"></div>

        <div className="va-hero-content">
          <span className="va-meta-tag mb-4">
            VELORA CORE ETHOS
          </span>
          <h1 className="va-hero-title">
            Preserving <span className="va-serif-italic">Architectural Integrity</span>
          </h1>
          <p className="va-hero-desc">
            We operate beyond standard agency. Velora serves as a private trust representing the singular custody of physical light, structural form, and timeless heritage.
          </p>
        </div>
      </section>

      {/* 2. Our Philosophy Narrative */}
      <section className="va-narrative-section">
        <div className="va-narrative-grid">
          
          <div className="va-narrative-aside">
            <span className="va-mono-badge">
              OUR MISSION
            </span>
            <h2 className="va-narrative-heading">
              Quiet Stewardship. <span className="va-serif-italic">Bespoke Living.</span>
            </h2>
            <div className="va-accent-divider"></div>
          </div>

          <div className="va-narrative-body">
            <p>
              In an era characterized by transient digital noise and rapid suburban homogenization, Velora Estates remains a steadfast defender of architectural merit. We believe that a true residence is not merely a transaction—it is a physical container of human aspiration, sculpted in steel, raw stone, and travertine.
            </p>
            <p>
              Founded in 1984 under the guidance of Alexander Sterling, Velora has served as a low-profile repository representing off-market transfers of historically significant residences, modern mid-century sanctuaries, and raw brutalist shelters of high integrity. We curate each property in our private reserve based on strict structural criteria, ensuring our stewards acquire only environments of authentic distinction.
            </p>
          </div>

        </div>
      </section>

      {/* 3. The Pillars of Integrity & Invisible Service */}
      <section className="va-pillars-section">
        <div className="va-container">
          
          <div className="va-section-header">
            <h3 className="va-section-title">
              The Core <span className="va-serif-italic">Pillars of Custody</span>
            </h3>
            <p className="va-section-subtitle">
              Establishing a standard of absolute distinction in luxury real estate.
            </p>
          </div>

          <div className="va-pillars-grid">
            
            {/* Pillar 1 */}
            <div className="va-pillar-card">
              <div className="va-pillar-icon-box">
                <Shield className="va-pillar-icon" size={20} />
              </div>
              <h4 className="va-pillar-title">Absolute Confidentiality</h4>
              <p className="va-pillar-desc">
                All portfolios, client directories, and transactional coordinates remain protected under legal Non-Disclosure Agreements. We never list in public generic portals or engage in programmatic bidding.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="va-pillar-card">
              <div className="va-pillar-icon-box">
                <Compass className="va-pillar-icon" size={20} />
              </div>
              <h4 className="va-pillar-title">Architectural Curation</h4>
              <p className="va-pillar-desc">
                Our team evaluates each estate based on its response to geography, materiality, and structural lineage. From Kengo Miyako glass pavilions to Olson Kundig concrete monoliths, integrity is non-negotiable.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="va-pillar-card">
              <div className="va-pillar-icon-box">
                <Award className="va-pillar-icon" size={20} />
              </div>
              <h4 className="va-pillar-title">Invisible Stewardship</h4>
              <p className="va-pillar-desc">
                We handle land coordination, local zoning exceptions, private aviation access, and historical commission oversight quietly behind the scenes, allowing our clients to step seamlessly into their new sanctuary.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Le Corbusier Quote Section */}
      <section className="va-quote-section">
        <div className="va-quote-grid-pattern"></div>
        <div className="va-quote-content">
          <span className="va-quote-mark">“</span>
          <p className="va-quote-text">
            To create architecture is to put in order. To put in order what? Function and objects. But above all, to put in order the dreams of light.
          </p>
          <span className="va-quote-author">
            — Le Corbusier, Urbanisme, 1925
          </span>
        </div>
      </section>

      {/* 5. Meditative Final Spaces Gallery */}
      <section className="va-gallery-section">
        <div className="va-section-header margin-b-12">
          <h3 className="va-section-title">
            Meditative <span className="va-serif-italic">Spatial Harmony</span>
          </h3>
          <p className="va-section-subtitle">
            Visual glimpses into the structural quietude of our private portfolio.
          </p>
        </div>

        <div className="va-gallery-grid">
          <div className="va-gallery-frame group">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
              alt="Minimalist Living Space"
              className="va-gallery-img"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="va-gallery-frame group">
            <img
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
              alt="Polished Concrete Pool"
              className="va-gallery-img"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="va-gallery-frame group">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
              alt="Zen Bamboo Forest Path"
              className="va-gallery-img"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="va-cta-section">
        <div className="va-cta-container">
          <h3 className="va-cta-title">
            Begin Your <span className="va-serif-italic">Stewardship Journey</span>
          </h3>
          <p className="va-cta-desc">
            Review our active sanctuaries of distinction, or join membership to receive confidential notifications regarding new properties.
          </p>
          <div className="va-cta-actions">
            <button
              onClick={() => onNavigate("browse")}
              className="va-btn-primary"
            >
              <span>Explore Collection</span>
              <ArrowRight size={12} />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="va-btn-secondary"
            >
              Contact Private Registry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}