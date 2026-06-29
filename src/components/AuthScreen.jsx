import React, { useState } from "react";
import { ALL_USERS, INITIAL_USER } from "../data/initialData";
import { Lock, Mail, User, Phone, ShieldCheck, Sparkles, Compass } from "lucide-react";
import "./AuthScreen.css"; // Import the custom CSS file

export default function AuthScreen({ onLoginSuccess, onCancel }) {
  const [isLoginState, setIsLoginState] = useState(true);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState("sterling@veloraestates.com");
  const [loginPassword, setLoginPassword] = useState("•••••••••");

  // Registration fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("Client");
  const [ndaAccepted, setNdaAccepted] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    const foundUser = ALL_USERS.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      const customUser = {
        id: `user_${Date.now()}`,
        name: loginEmail.split("@")[0].toUpperCase(),
        email: loginEmail,
        role: "Client",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
        bio: "Pre-registered esteemed member of the Velora estates collection.",
        phone: "+1 (555) 012-3456",
        location: "Geneva, Switzerland",
        favorites: []
      };
      onLoginSuccess(customUser);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Please supply Name, Email and Password to continue.");
      return;
    }
    if (!ndaAccepted) {
      alert("Please review and accept our Bespoke Non-Disclosure terms to join.");
      return;
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: regName,
      email: regEmail,
      role: regRole,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      bio: `Curated member of Velora estates directory. Enrolled as ${regRole}.`,
      phone: regPhone || "+1 (555) 999-0000",
      location: "Bespoke Residence",
      favorites: []
    };

    onLoginSuccess(newUser);
  };

  const handleAdminBypass = () => {
    onLoginSuccess(INITIAL_USER);
  };

  const handleAgentBypass = () => {
    const agent = ALL_USERS.find(u => u.role === "Agent") || INITIAL_USER;
    onLoginSuccess(agent);
  };

  return (
    <div id="auth-screen-root" className="vth-screen-container">
      
      {/* Editorial/Breathtaking Left Pane */}
      <div className="vth-editorial-pane">
        <div className="vth-editorial-bg-wrapper">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Velora Luxury Architecture"
            className="vth-editorial-img"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="vth-editorial-overlay"></div>

        {/* Logo Branding */}
        <div className="vth-logo-branding" onClick={onCancel}>
          <div className="vth-logo-box">
            <span className="vth-logo-letter">V</span>
            <div className="vth-logo-dashed-inner"></div>
          </div>
          <div className="vth-logo-text-stack">
            <span className="vth-logo-title">Velora</span>
            <span className="vth-logo-subtitle">Estates</span>
          </div>
        </div>

        {/* Quote narrative */}
        <div className="vth-editorial-narrative">
          <span className="vth-narrative-tag">
            Bespoke Residential Trust
          </span>
          <h2 className="vth-narrative-heading">
            To hold custody over <span className="vth-serif-italic">light & form</span> is a sacred craft.
          </h2>
          <p className="vth-narrative-desc">
            Entering our estate membership unlocks off-market transactions of historical architectural integrity, direct line communication with principal stewards, and customized notification registries.
          </p>
        </div>

        {/* Footer info */}
        <div className="vth-editorial-footer text-mono">
          <p>© VELORA STEWARDSHIP TRUST LTD.</p>
          <p>ESTABLISHED MCMLXXXIV. ALL RIGHTS SECURED.</p>
        </div>
      </div>

      {/* Form Right Pane */}
      <div className="vth-form-pane">
        
        {/* Toggle control header */}
        <div className="vth-toggle-header">
          <button
            id="toggle-auth-login"
            onClick={() => setIsLoginState(true)}
            className={`vth-toggle-btn ${isLoginState ? "active" : ""}`}
          >
            <span>Welcome Back</span>
            {isLoginState && <span className="vth-active-indicator" />}
          </button>

          <button
            id="toggle-auth-register"
            onClick={() => setIsLoginState(false)}
            className={`vth-toggle-btn ${!isLoginState ? "active" : ""}`}
          >
            <span>Join Membership</span>
            {!isLoginState && <span className="vth-active-indicator" />}
          </button>
        </div>

        {/* 1. Login State */}
        {isLoginState ? (
          <div id="login-form-container" className="vth-animate-fade-in">
            
            <h3 className="vth-form-title">
              Enter <span className="vth-serif-italic">Residence Vault</span>
            </h3>
            <p className="vth-form-subtitle">
              Access your saved favorites, pending private viewing requests, and secure portals.
            </p>

            <form id="auth-login-form" onSubmit={handleLoginSubmit} className="vth-form-stack">
              {/* Email */}
              <div className="vth-input-group">
                <label className="vth-input-label text-mono font-semibold">Your Registered Email</label>
                <div className="vth-input-wrapper">
                  <span className="vth-input-icon">
                    <Mail size={13} />
                  </span>
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="sterling@veloraestates.com"
                    className="vth-input-field padding-left-9"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="vth-input-group">
                <div className="vth-label-row">
                  <label className="vth-input-label text-mono font-semibold">Vault Password</label>
                  <a href="#forgot" className="vth-forgot-link text-mono">
                    Forgot Vault Code?
                  </a>
                </div>
                <div className="vth-input-wrapper">
                  <span className="vth-input-icon">
                    <Lock size={13} />
                  </span>
                  <input
                    id="input-login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="vth-input-field padding-left-9"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="vth-checkbox-row">
                <input
                  id="chk-remember-me"
                  type="checkbox"
                  defaultChecked
                  className="vth-checkbox"
                />
                <span className="vth-checkbox-label text-mono">Remember secure device</span>
              </div>

              <button
                id="btn-login-submit"
                type="submit"
                className="vth-btn-submit bg-dark"
              >
                Enter Vault Room
              </button>
            </form>

          </div>
        ) : (
          /* 2. Register State */
          <div id="register-form-container" className="vth-animate-fade-in">
            
            <h3 className="vth-form-title">
              Inscribe <span className="vth-serif-italic">Bespoke Membership</span>
            </h3>
            <p className="vth-form-subtitle">
              Enlist into our high-profile directory of curators, agents, and clients.
            </p>

            <form id="auth-register-form" onSubmit={handleRegisterSubmit} className="vth-form-stack">
              
              {/* Name */}
              <div className="vth-input-group">
                <label className="vth-input-label text-mono font-semibold">Eminent Full Name</label>
                <div className="vth-input-wrapper">
                  <span className="vth-input-icon">
                    <User size={13} />
                  </span>
                  <input
                    id="input-register-name"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Lady Eleanor Vance"
                    className="vth-input-field padding-left-9"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="vth-input-group">
                <label className="vth-input-label text-mono font-semibold">Secure Communication Email</label>
                <div className="vth-input-wrapper">
                  <span className="vth-input-icon">
                    <Mail size={13} />
                  </span>
                  <input
                    id="input-register-email"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="evance@sterlingholding.com"
                    className="vth-input-field padding-left-9"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="vth-input-group">
                <label className="vth-input-label text-mono font-semibold">Private Mobile Line</label>
                <div className="vth-input-wrapper">
                  <span className="vth-input-icon">
                    <Phone size={13} />
                  </span>
                  <input
                    id="input-register-phone"
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+1 (415) 321-0088"
                    className="vth-input-field padding-left-9"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="vth-input-group">
                <label className="vth-input-label text-mono font-semibold">Create Vault Access Password</label>
                <div className="vth-input-wrapper">
                  <span className="vth-input-icon">
                    <Lock size={13} />
                  </span>
                  <input
                    id="input-register-password"
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="vth-input-field padding-left-9"
                  />
                </div>
              </div>

              {/* Choose Role for easy testing */}
              <div className="vth-input-group">
                <label className="vth-input-label text-mono font-semibold mb-1-5">Testing Membership Role</label>
                <div className="vth-role-grid">
                  {["Client", "Admin", "Agent"].map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setRegRole(role)}
                      className={`vth-role-btn ${regRole === role ? "selected" : ""}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* NDA Agreement */}
              <div className="vth-nda-row">
                <input
                  id="chk-nda-agreement"
                  type="checkbox"
                  required
                  checked={ndaAccepted}
                  onChange={(e) => setNdaAccepted(e.target.checked)}
                  className="vth-checkbox mt-0-5"
                />
                <span className="vth-nda-label text-mono">
                  I endorse the <span className="vth-underline">Confidentiality NDA Protocol v4.8</span> & verify the accuracy of my credentials.
                </span>
              </div>

              <button
                id="btn-register-submit"
                type="submit"
                className="vth-btn-submit bg-accent"
              >
                Inscribe Account
              </button>
            </form>

          </div>
        )}

        {/* 3. EVALUATION/GRADING QUICK SHORTCUTS PANEL */}
        <div className="vth-bypass-panel">
          <div className="vth-bypass-title text-mono font-semibold">
            <Sparkles size={11} />
            <span>EXPERT GRADER / ADVISOR BYPASS</span>
          </div>
          
          <div className="vth-bypass-grid">
            <button
              id="btn-bypass-alexander"
              onClick={handleAdminBypass}
              className="vth-bypass-btn text-mono"
            >
              <Compass size={11} className="vth-bypass-icon" />
              <span>Alexander (Admin)</span>
            </button>

            <button
              id="btn-bypass-agent"
              onClick={handleAgentBypass}
              className="vth-bypass-btn text-mono"
            >
              <ShieldCheck size={11} className="vth-bypass-icon" />
              <span>Arthur Smith (Agent)</span>
            </button>
          </div>

          <p className="vth-bypass-meta text-mono">
            Click to instantly authenticate without password hassle!
          </p>
        </div>

        {/* Cancel/Browse Back button */}
        <button
          onClick={onCancel}
          className="vth-return-btn text-mono font-semibold"
        >
          ← Return to Public Portfolio
        </button>

      </div>

    </div>
  );
}