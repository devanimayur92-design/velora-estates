import React, { useState } from "react";
import { User, MapPin, Heart, List, Sliders, ArrowUpRight, Save, CheckCircle } from "lucide-react";
import "./ProfileDashboard.css"; // Import the custom CSS file

export default function ProfileDashboard({
  currentUser,
  properties,
  onUpdateUser,
  onSelectProperty,
  onToggleFavorite,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState("favorites");

  // Profile Edit fields
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);
  const [company, setCompany] = useState(currentUser.company || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute stats
  const favoritedProperties = properties.filter((p) => currentUser.favorites.includes(p.id));
  const userListings = properties.filter((p) => p.publishedBy === currentUser.id);

  const handleProfileSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      name,
      bio,
      phone,
      location,
      company
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div id="profile-dashboard-root" className="vpd-dashboard-root">
      
      {/* Visual cover design banner */}
      <div className="vpd-cover-banner">
        <div className="vpd-cover-overlay-img">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
            alt="Velora Architecture Cover"
            className="vpd-cover-img"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="vpd-cover-gradient"></div>
      </div>

      <div className="vpd-main-container">
        
        {/* Profile Card Header */}
        <div className="vpd-profile-card">
          <div className="vpd-card-header-flex">
            
            <div className="vpd-user-info-wrapper">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="vpd-user-avatar"
              />
              <div className="vpd-user-text-stack">
                <div className="vpd-name-role-row">
                  <h1 className="vpd-username">{currentUser.name}</h1>
                  <span className="vpd-role-badge text-mono">
                    {currentUser.role} Steward
                  </span>
                </div>
                <p className="vpd-location-tag text-mono tracking-widest">
                  <MapPin size={11} className="vpd-icon-gold" />
                  <span>{currentUser.location}</span>
                </p>
                <p className="vpd-user-bio">
                  {currentUser.bio}
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="vpd-quick-actions">
              {currentUser.role === "Admin" && (
                <button
                  onClick={() => onNavigate("admin")}
                  className="vpd-btn-dark font-semibold"
                >
                  <Sliders size={13} />
                  <span>Admin Dashboard</span>
                </button>
              )}
              
              <button
                onClick={() => onNavigate("add-property")}
                className="vpd-btn-gold border-gold font-semibold"
              >
                <span>+ List Property</span>
              </button>
            </div>

          </div>
          
          {/* Minimal stats overview banner */}
          <div className="vpd-stats-banner text-mono">
            <div>
              <span className="vpd-stat-number">{favoritedProperties.length}</span>
              <span className="vpd-stat-label tracking-widest">Bookmarks</span>
            </div>
            <div>
              <span className="vpd-stat-number">{userListings.length}</span>
              <span className="vpd-stat-label tracking-widest">My Publications</span>
            </div>
            <div>
              <span className="vpd-stat-number">
                {formatCurrency(userListings.reduce((sum, item) => sum + item.price, 0))}
              </span>
              <span className="vpd-stat-label tracking-widest">Total Asset Valuation</span>
            </div>
          </div>
        </div>

        {/* 3-Tab Selector Layout */}
        <div className="vpd-tab-layout-grid">
          
          {/* Navigation Tab Menu */}
          <div className="vpd-sidebar-tabs">
            <button
              onClick={() => setActiveTab("favorites")}
              className={`vpd-tab-btn ${activeTab === "favorites" ? "active" : ""}`}
            >
              <Heart size={14} className="vpd-tab-icon" />
              <span>Favorites ({favoritedProperties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("listings")}
              className={`vpd-tab-btn ${activeTab === "listings" ? "active" : ""}`}
            >
              <List size={14} className="vpd-tab-icon" />
              <span>My Holdings ({userListings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`vpd-tab-btn ${activeTab === "details" ? "active" : ""}`}
            >
              <User size={14} className="vpd-tab-icon" />
              <span>Edit Contact details</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="vpd-content-panel">
            
            {/* FAVORITES TAB */}
            {activeTab === "favorites" && (
              <div id="profile-tab-favorites" className="vpd-panel-stack">
                <div>
                  <h3 className="vpd-panel-title">
                    Curated <span className="vpd-serif-italic">Bookmarks</span>
                  </h3>
                  <p className="vpd-panel-subtitle text-mono tracking-widest">
                    Your confidential list of architectural properties of high interest.
                  </p>
                </div>

                {favoritedProperties.length === 0 ? (
                  <div className="vpd-empty-state">
                    <Heart className="vpd-empty-icon" size={32} />
                    <p className="vpd-empty-title">No Bookmarked Estates</p>
                    <p className="vpd-empty-desc text-mono tracking-widest">
                      Explore the browse reserve to add listings to your profile
                    </p>
                    <button
                      onClick={() => onNavigate("browse")}
                      className="vpd-empty-action-btn font-semibold tracking-widest"
                    >
                      Browse Portfolio
                    </button>
                  </div>
                ) : (
                  <div className="vpd-cards-grid">
                    {favoritedProperties.map((estate) => (
                      <div key={estate.id} className="vpd-estate-card">
                        <div className="vpd-card-media">
                          <img src={estate.images[0]} alt={estate.title} className="vpd-card-img" />
                          <button
                            onClick={() => onToggleFavorite(estate.id)}
                            className="vpd-card-heart-btn"
                          >
                            <Heart size={13} className="fill-red" />
                          </button>
                          <span className="vpd-card-price-tag font-mono tracking-widest">
                            {formatCurrency(estate.price)}
                          </span>
                        </div>
                        <div className="vpd-card-body">
                          <div>
                            <p className="vpd-card-loc text-mono tracking-widest">{estate.location}</p>
                            <h4 
                              onClick={() => onSelectProperty(estate.id)}
                              className="vpd-card-title"
                            >
                              {estate.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => onSelectProperty(estate.id)}
                            className="vpd-card-link text-mono tracking-widest font-semibold"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MY LISTINGS TAB */}
            {activeTab === "listings" && (
              <div id="profile-tab-listings" className="vpd-panel-stack">
                <div className="vpd-listings-header-row">
                  <div>
                    <h3 className="vpd-panel-title">
                      Published <span className="vpd-serif-italic">Masterpieces</span>
                    </h3>
                    <p className="vpd-panel-subtitle text-mono tracking-widest">
                      Properties you have registered or drafted in the Velora ecosystem.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate("add-property")}
                    className="vpd-add-property-btn font-semibold tracking-widest"
                  >
                    + Add New Property
                  </button>
                </div>

                {userListings.length === 0 ? (
                  <div className="vpd-empty-state">
                    <List className="vpd-empty-icon" size={32} />
                    <p className="vpd-empty-title">No Listed Estates</p>
                    <p className="vpd-empty-desc text-mono tracking-widest">
                      You have not proposed any architectural estates for review yet.
                    </p>
                  </div>
                ) : (
                  <div className="vpd-rows-stack">
                    {userListings.map((estate) => (
                      <div key={estate.id} className="vpd-row-item">
                        <div className="vpd-row-left-content">
                          <img src={estate.images[0]} alt={estate.title} className="vpd-row-thumb" />
                          <div>
                            <h4 className="vpd-row-title">{estate.title}</h4>
                            <p className="vpd-row-meta text-mono tracking-widest">
                              {estate.location} • {formatCurrency(estate.price)} USD
                            </p>
                          </div>
                        </div>

                        <div className="vpd-row-right-content">
                          {estate.status === "Active" ? (
                            <span className="vpd-row-badge badge-active text-mono tracking-wider font-semibold">
                              Active Listing
                            </span>
                          ) : estate.status === "Pending Approval" ? (
                            <span className="vpd-row-badge badge-pending text-mono tracking-wider font-semibold">
                              Pending Approval
                            </span>
                          ) : (
                            <span className="vpd-row-badge badge-draft text-mono tracking-wider font-semibold">
                              Draft Reserve
                            </span>
                          )}

                          <button
                            onClick={() => onSelectProperty(estate.id)}
                            className="vpd-row-action-btn"
                            title="Preview Listing"
                          >
                            <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* EDIT CONTACT DETAILS TAB */}
            {activeTab === "details" && (
              <div id="profile-tab-details" className="vpd-panel-stack">
                <div>
                  <h3 className="vpd-panel-title">
                    Steward <span className="vpd-serif-italic">Registration</span>
                  </h3>
                  <p className="vpd-panel-subtitle text-mono tracking-widest">
                    Manage your identity details, security lines, and biography narrative.
                  </p>
                </div>

                {savedSuccess && (
                  <div id="alert-profile-saved" className="vpd-alert-success text-mono tracking-wider">
                    <CheckCircle size={16} />
                    <span>Your registry credentials have been updated successfully.</span>
                  </div>
                )}

                <form id="edit-profile-form" onSubmit={handleProfileSave} className="vpd-form">
                  <div className="vpd-form-grid">
                    
                    {/* Name */}
                    <div className="vpd-input-group">
                      <label className="vpd-label text-mono font-semibold">Steward Full Name</label>
                      <input
                        id="profile-edit-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="vpd-input"
                      />
                    </div>

                    {/* Email (Read Only) */}
                    <div className="vpd-input-group">
                      <label className="vpd-label text-mono font-semibold">Registered Trust Email</label>
                      <input
                        type="email"
                        disabled
                        value={currentUser.email}
                        className="vpd-input vpd-input-disabled text-mono"
                      />
                    </div>

                    {/* Phone */}
                    <div className="vpd-input-group">
                      <label className="vpd-label text-mono font-semibold">Secure Phone Line</label>
                      <input
                        id="profile-edit-phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="vpd-input"
                      />
                    </div>

                    {/* Location */}
                    <div className="vpd-input-group">
                      <label className="vpd-label text-mono font-semibold">Geographical Area</label>
                      <input
                        id="profile-edit-location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="vpd-input"
                      />
                    </div>

                    {/* Company */}
                    <div className="vpd-input-group vpd-col-span-full">
                      <label className="vpd-label text-mono font-semibold">Corporation / Family Office / Trust</label>
                      <input
                        id="profile-edit-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Sterling Stewardship Ltd."
                        className="vpd-input"
                      />
                    </div>

                    {/* Bio */}
                    <div className="vpd-input-group vpd-col-span-full">
                      <label className="vpd-label text-mono font-semibold">Personal Biography Narrative</label>
                      <textarea
                        id="profile-edit-bio"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="vpd-textarea"
                      />
                    </div>

                  </div>

                  <div className="vpd-form-footer">
                    <button
                      id="btn-save-profile-details"
                      type="submit"
                      className="vpd-submit-btn font-semibold tracking-widest"
                    >
                      <Save size={13} />
                      <span>Save Credentials</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}