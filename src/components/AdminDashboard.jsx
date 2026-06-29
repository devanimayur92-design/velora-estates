import React, { useState } from "react";
import { 
  Sliders, Inbox, Users, Check, Trash, Star, 
  Mail, MessageSquare, Plus, Folder
} from "lucide-react";
import { CATEGORIES } from "../data/initialData";
import "./AdminDashboard.css"; // Import the custom CSS file

export default function AdminDashboard({
  currentUser,
  properties,
  inquiries,
  users,
  onApproveProperty,
  onDeleteProperty,
  onToggleFeatureProperty,
  onUpdateInquiryStatus,
  onUpdateUserRole,
}) {
  const [activeTab, setActiveTab] = useState("listings");

  // Local Category creation helper
  const [localCategories, setLocalCategories] = useState(CATEGORIES);
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatId, setNewCatId] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatId || !newCatLabel) return;
    setLocalCategories([
      ...localCategories,
      { id: newCatId, label: newCatLabel, count: 0, icon: "Folder" }
    ]);
    newCatId("");
    newCatLabel("");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div id="admin-dashboard-root" className="vd-dashboard-root">
      
      {/* Main Admin Tab System */}
      <section className="vd-main-section">
        <div className="vd-layout-grid">
          
          {/* Admin Navigation Left Bar */}
          <div className="vd-sidebar">
            
            <div className="vd-operator-card">
              <p className="vd-operator-meta text-mono font-semibold">Active Operator</p>
              <p className="vd-operator-name truncate">{currentUser.name}</p>
            </div>

            <button
              onClick={() => setActiveTab("listings")}
              className={`vd-nav-tab ${activeTab === "listings" ? "active" : ""}`}
            >
              <Folder size={14} className="vd-tab-icon" />
              <span>Estates Directory ({properties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`vd-nav-tab ${activeTab === "inquiries" ? "active" : ""}`}
            >
              <Inbox size={14} className="vd-tab-icon" />
              <span>Inquiries Registry ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`vd-nav-tab ${activeTab === "users" ? "active" : ""}`}
            >
              <Users size={14} className="vd-tab-icon" />
              <span>Membership Roll ({users.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`vd-nav-tab ${activeTab === "categories" ? "active" : ""}`}
            >
              <Sliders size={14} className="vd-tab-icon" />
              <span>Aesthetic settings ({localCategories.length})</span>
            </button>

          </div>

          {/* Right Panels */}
          <div className="vd-main-panel">
            
            {/* 1. ESTATES DIRECTORY PANEL */}
            {activeTab === "listings" && (
              <div id="admin-panel-listings" className="vd-panel-space">
                <div>
                  <h3 className="vd-panel-title">
                    Estates <span className="vd-serif-italic">Registry Archive</span>
                  </h3>
                  <p className="vd-panel-subtitle text-mono">
                    Manage active listings, pending approvals, featured selections, and draft records.
                  </p>
                </div>

                <div className="vd-table-responsive-wrapper">
                  <table className="vd-table">
                    <thead className="vd-thead text-mono tracking-wider font-semibold">
                      <tr>
                        <th className="vd-th">Estate Item</th>
                        <th className="vd-th">Category</th>
                        <th className="vd-th">Valuation (USD)</th>
                        <th className="vd-th">Status</th>
                        <th className="vd-th text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="vd-tbody">
                      {properties.map((estate) => (
                        <tr key={estate.id} className="vd-tr-row">
                          <td className="vd-td">
                            <div className="vd-estate-meta-box">
                              <img src={estate.images[0]} alt="" className="vd-estate-thumb" />
                              <div>
                                <p className="vd-estate-title font-semibold">{estate.title}</p>
                                <p className="vd-estate-loc text-mono tracking-wider">{estate.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="vd-td text-mono uppercase font-muted-caps">
                            {estate.category}
                          </td>
                          <td className="vd-td font-medium vd-price-text">
                            {formatCurrency(estate.price)}
                          </td>
                          <td className="vd-td">
                            {estate.status === "Active" ? (
                              <span className="vd-badge badge-active text-mono font-semibold tracking-wider">
                                Active
                              </span>
                            ) : estate.status === "Pending Approval" ? (
                              <span className="vd-badge badge-pending text-mono font-semibold tracking-wider animate-pulse">
                                Pending
                              </span>
                            ) : (
                              <span className="vd-badge badge-draft text-mono font-semibold tracking-wider">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="vd-td text-right whitespace-nowrap actions-gap">
                            
                            {/* Approve trigger if pending */}
                            {estate.status === "Pending Approval" && (
                              <button
                                id={`btn-approve-listing-${estate.id}`}
                                onClick={() => onApproveProperty(estate.id)}
                                className="vd-icon-btn btn-green"
                                title="Approve & Publish"
                              >
                                <Check size={12} />
                              </button>
                            )}

                            {/* Feature trigger */}
                            <button
                              id={`btn-feature-listing-${estate.id}`}
                              onClick={() => onToggleFeatureProperty(estate.id)}
                              className={`vd-icon-btn ${estate.isFeatured ? "btn-amber-active" : "btn-amber-inactive"}`}
                              title={estate.isFeatured ? "Un-feature Listing" : "Feature on Homepage"}
                            >
                              <Star size={12} className={estate.isFeatured ? "fill-amber" : ""} />
                            </button>

                            {/* Delete listing */}
                            <button
                              id={`btn-delete-listing-${estate.id}`}
                              onClick={() => {
                                if (confirm(`Confirm permanent removal of listing: ${estate.title}?`)) {
                                  onDeleteProperty(estate.id);
                                }
                              }}
                              className="vd-icon-btn btn-red"
                              title="Delete Estate"
                            >
                              <Trash size={12} />
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. INQUIRIES REGISTRY PANEL */}
            {activeTab === "inquiries" && (
              <div id="admin-panel-inquiries" className="vd-panel-space">
                <div>
                  <h3 className="vd-panel-title">
                    Confidential <span className="vd-serif-italic">Inquiries Reviewer</span>
                  </h3>
                  <p className="vd-panel-subtitle text-mono">
                    Manage viewing applications, coordination requests, and off-market portfolio queries.
                  </p>
                </div>

                <div className="vd-panel-space">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id} 
                      className={`vd-inquiry-card ${
                        inq.status === "Pending" 
                          ? "status-pending-card" 
                          : inq.status === "Reviewed" 
                            ? "status-reviewed-card" 
                            : "status-archived-card"
                      }`}
                    >
                      <div className="vd-inquiry-card-header">
                        <div>
                          <div className="vd-inquiry-client-row">
                            <h4 className="vd-client-name font-semibold">{inq.clientName}</h4>
                            <span className="vd-badge-pref text-mono font-semibold tracking-wider">
                              Preference: {inq.preferredContactMethod}
                            </span>
                          </div>
                          <p className="vd-inquiry-meta-text text-mono">
                            DATE REGISTERED: {inq.date} • PHONE: {inq.clientPhone} • EMAIL: {inq.clientEmail}
                          </p>
                        </div>

                        <div className="vd-inquiry-status-indicator">
                          {inq.status === "Pending" ? (
                            <span className="vd-badge badge-pending-solid text-mono tracking-wider font-semibold">
                              Pending Review
                            </span>
                          ) : (
                            <span className="vd-badge badge-reviewed-solid text-mono tracking-wider font-semibold">
                              Reviewed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="vd-inquiry-message-box">
                        {inq.propertyTitle && (
                          <p className="vd-target-residence-tag text-mono tracking-widest font-semibold">
                            TARGET RESIDENCE: {inq.propertyTitle.toUpperCase()}
                          </p>
                        )}
                        <p className="vd-message-body-text">{inq.message}</p>
                      </div>

                      {/* Action buttons */}
                      <div className="vd-inquiry-footer text-mono">
                        
                        <div className="vd-comms-links">
                          <a 
                            href={`mailto:${inq.clientEmail}?subject=Velora Estates Stewardship Response`}
                            className="vd-link-mail"
                          >
                            <Mail size={12} />
                            <span>Dispatch Mail</span>
                          </a>

                          <a 
                            href={`https://wa.me/${inq.clientPhone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="vd-link-whatsapp"
                          >
                            <MessageSquare size={12} />
                            <span>WhatsApp Connect</span>
                          </a>
                        </div>

                        <div className="vd-inquiry-action-btns">
                          {inq.status === "Pending" && (
                            <button
                              id={`btn-review-inquiry-${inq.id}`}
                              onClick={() => onUpdateInquiryStatus(inq.id, "Reviewed")}
                              className="vd-btn-endorse text-mono tracking-wider font-semibold"
                            >
                              Endorse Review
                            </button>
                          )}
                          <button
                            id={`btn-archive-inquiry-${inq.id}`}
                            onClick={() => onUpdateInquiryStatus(inq.id, "Archived")}
                            className="vd-btn-archive text-mono tracking-wider"
                          >
                            Archive Inquiry
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. MEMBERSHIP ROLL PANEL */}
            {activeTab === "users" && (
              <div id="admin-panel-users" className="vd-panel-space">
                <div>
                  <h3 className="vd-panel-title">
                    Steward <span className="vd-serif-italic">Roll & Directory</span>
                  </h3>
                  <p className="vd-panel-subtitle text-mono">
                    Manage registered trust members, operator privileges, and system roles.
                  </p>
                </div>

                <div className="vd-table-responsive-wrapper">
                  <table className="vd-table">
                    <thead className="vd-thead text-mono tracking-wider font-semibold">
                      <tr>
                        <th className="vd-th">Steward Member</th>
                        <th className="vd-th">Role Authority</th>
                        <th className="vd-th">Location</th>
                        <th className="vd-th">Secure Line</th>
                        <th className="vd-th text-right">Adjust Privilege</th>
                      </tr>
                    </thead>
                    <tbody className="vd-tbody">
                      {users.map((member) => (
                        <tr key={member.id} className="vd-tr-row">
                          <td className="vd-td font-padding-adjust">
                            <div className="vd-member-meta-box">
                              <img src={member.avatar} alt="" className="vd-member-avatar" />
                              <div>
                                <p className="vd-member-name font-semibold">{member.name}</p>
                                <p className="vd-member-email text-mono">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="vd-td text-mono">
                            <span className={`vd-badge text-mono font-semibold tracking-wider ${
                              member.role === "Admin" 
                                ? "user-badge-admin" 
                                : member.role === "Agent" 
                                  ? "user-badge-agent" 
                                  : "user-badge-client"
                            }`}>
                              {member.role}
                            </span>
                          </td>
                          <td className="vd-td vd-member-loc-text">{member.location}</td>
                          <td className="vd-td text-mono vd-member-phone-text">{member.phone}</td>
                          <td className="vd-td text-right">
                            <select
                              id={`select-role-user-${member.id}`}
                              value={member.role}
                              onChange={(e) => onUpdateUserRole(member.id, e.target.value)}
                              className="vd-role-select text-mono tracking-wider font-semibold"
                            >
                              <option value="Client">Client</option>
                              <option value="Agent">Agent</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. CATEGORIES PANEL */}
            {activeTab === "categories" && (
              <div id="admin-panel-categories" className="vd-panel-space">
                <div>
                  <h3 className="vd-panel-title">
                    Aesthetic <span className="vd-serif-italic">Classification settings</span>
                  </h3>
                  <p className="vd-panel-subtitle text-mono">
                    Manage active category channels and count matching registered sanctuaries.
                  </p>
                </div>

                <div className="vd-categories-grid">
                  
                  {/* Category counts list */}
                  <div className="vd-categories-stack">
                    {localCategories.map((cat) => {
                      const count = properties.filter((p) => p.category === cat.id).length;
                      return (
                        <div key={cat.id} className="vd-category-item-card">
                          <div className="vd-category-card-meta">
                            <div className="vd-category-icon-box">
                              <Folder size={15} />
                            </div>
                            <div>
                              <p className="vd-category-label font-semibold">{cat.label}</p>
                              <p className="vd-category-code-text text-mono">ID CODE: {cat.id.toUpperCase()}</p>
                            </div>
                          </div>
                          <span className="vd-category-count font-semibold">
                            {count} {count === 1 ? "Site" : "Sites"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Create Category Form */}
                  <div className="vd-create-category-box">
                    <h4 className="vd-create-title">Create Aesthetic Category</h4>
                    <form onSubmit={handleAddCategory} className="vd-create-form">
                      
                      <div className="vd-input-group">
                        <label className="vd-form-label text-mono tracking-wider">Unique ID Code</label>
                        <input
                          id="category-id-input"
                          type="text"
                          required
                          value={newCatId}
                          onChange={(e) => setNewCatId(e.target.value)}
                          placeholder="e.g. Floating"
                          className="vd-form-input"
                        />
                      </div>

                      <div className="vd-input-group">
                        <label className="vd-form-label text-mono tracking-wider">Public Display Label</label>
                        <input
                          id="category-label-input"
                          type="text"
                          required
                          value={newCatLabel}
                          onChange={(e) => setNewCatLabel(e.target.value)}
                          placeholder="e.g. Floating Haven"
                          className="vd-form-input"
                        />
                      </div>

                      <button
                        id="btn-add-category"
                        type="submit"
                        className="vd-btn-submit text-mono tracking-widest font-semibold"
                      >
                        <Plus size={12} />
                        <span>Add Category</span>
                      </button>

                    </form>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}