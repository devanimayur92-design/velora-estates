import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Compass, BookOpen, Mail, Bell, Sliders } from "lucide-react";
import "./Navbar.css"; // Import the custom CSS file

export default function Navbar({
  currentUser,
  onLogout,
  notificationsCount
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Browse Collection", icon: Compass },
    { path: "/add-property", label: "List Property", icon: BookOpen },
    { path: "/contact", label: "Direct Inquiry", icon: Mail }
  ];

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="vn-navbar-header">
      <div className="vn-container">
        <div className="vn-navbar-inner">
          
          {/* Logo Section */}
          <Link to="/" onClick={closeMenus} className="vn-logo-link group">
            <div className="vn-logo-box">
              <span className="vn-logo-letter">V</span>
              <div className="vn-logo-dash-border"></div>
            </div>
            <div className="vn-logo-text-wrapper">
              <span className="vn-logo-title">Velora</span>
              <span className="vn-logo-subtitle">Estates</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="vn-desktop-nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/' && location.pathname.startsWith('/property/'));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`vn-nav-item ${isActive ? "active" : ""}`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="vn-active-indicator" />}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side Panel */}
          <div className="vn-desktop-actions">
            {currentUser && currentUser.role === "Admin" && (
              <Link to="/admin" className="vn-icon-notification-btn">
                <Bell size={18} className="vn-stroke-light" />
                {notificationsCount > 0 && <span className="vn-notification-badge"></span>}
              </Link>
            )}

            {currentUser ? (
              <div className="vn-profile-dropdown-wrapper">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="vn-profile-trigger group"
                >
                  <img src={currentUser.avatar} alt={currentUser.name} className="vn-profile-avatar" />
                  <div className="vn-profile-info">
                    <span className="vn-profile-name">{currentUser.name.split(" ")[1] || currentUser.name}</span>
                    <span className="vn-profile-role">{currentUser.role}</span>
                  </div>
                </button>
                
                {profileDropdownOpen && (
                  <div className="vn-dropdown-menu">
                    <div className="vn-dropdown-header">
                      <p className="vn-dropdown-meta text-mono">Signed in as</p>
                      <p className="vn-dropdown-email">{currentUser.email}</p>
                    </div>
                    <Link to="/profile" onClick={closeMenus} className="vn-dropdown-item">
                      <User size={14} className="vn-icon-accent" />
                      <span>My Client Profile</span>
                    </Link>
                    {currentUser.role === "Admin" && (
                      <Link to="/admin" onClick={closeMenus} className="vn-dropdown-item special-border">
                        <Sliders size={14} className="vn-icon-accent" />
                        <span>Estate Management</span>
                      </Link>
                    )}
                    <button onClick={() => { onLogout(); closeMenus(); }} className="vn-dropdown-item vn-logout-btn">
                      <LogOut size={14} />
                      <span>Depart Membership</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="vn-auth-btn">
                Join Membership
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="vn-mobile-toggle-wrapper">
            {currentUser && currentUser.role === "Admin" && (
              <Link to="/admin" className="vn-icon-notification-btn mobile-badge-adjust">
                <Bell size={18} />
                {notificationsCount > 0 && <span className="vn-notification-badge no-ring"></span>}
              </Link>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="vn-mobile-burger-btn">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="vn-mobile-menu">
          <div className="vn-mobile-menu-inner">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={closeMenus} 
                className={`vn-mobile-nav-item ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            
            {currentUser ? (
              <div className="vn-mobile-profile-section">
                <div className="vn-mobile-profile-header">
                  <img src={currentUser.avatar} alt={currentUser.name} className="vn-mobile-avatar" />
                  <div>
                    <p className="vn-mobile-name">{currentUser.name}</p>
                    <p className="vn-mobile-role text-mono">{currentUser.role}</p>
                  </div>
                </div>
                <div className="vn-mobile-profile-actions">
                  <Link to="/profile" onClick={closeMenus} className="vn-mobile-action-link">My Client Profile</Link>
                  {currentUser.role === "Admin" && <Link to="/admin" onClick={closeMenus} className="vn-mobile-action-link">Estate Management</Link>}
                  <button onClick={() => { onLogout(); closeMenus(); }} className="vn-mobile-action-link vn-logout-text">Depart Membership</button>
                </div>
              </div>
            ) : (
              <div className="vn-mobile-auth-section">
                <Link to="/auth" onClick={closeMenus} className="vn-mobile-auth-btn">Join Membership</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}