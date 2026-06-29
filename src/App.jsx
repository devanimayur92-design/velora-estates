import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { INITIAL_USER, INITIAL_PROPERTIES, INITIAL_INQUIRIES, ALL_USERS } from "./data/initialData";
import Navbar from "./components/Navbar";
import BrowseScreen from "./components/BrowseScreen";
import PropertyDetailsScreen from "./components/PropertyDetailsScreen";
import AddPropertyScreen from "./components/AddPropertyScreen";
import AuthScreen from "./components/AuthScreen";
import ProfileDashboard from "./components/ProfileDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ContactScreen from "./components/ContactScreen";
import LandingPage from "./components/Landingpage";
import "./App.css"; // Import the custom global CSS wrapper file

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Global states
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [users, setUsers] = useState(ALL_USERS);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Auth Operations
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (!users.some((u) => u.id === user.id)) {
      setUsers([...users, user]);
    }
    navigate("/");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  // Compulsory Favorite Toggle Logic
  const handleToggleFavorite = (id) => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }
    
    // Safety check: ensure favorites array exists
    const currentFavorites = currentUser.favorites || [];
    const isFav = currentFavorites.includes(id);
    
    const updatedFavorites = isFav
      ? currentFavorites.filter((fId) => fId !== id)
      : [...currentFavorites, id];
      
    const updatedUser = { ...currentUser, favorites: updatedFavorites };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const handleAddProperty = (newProperty) => {
    setProperties([newProperty, ...properties]);
    if (newProperty.status === "Draft") {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  const handleAddInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: `inq_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };
    setInquiries([newInquiry, ...inquiries]);
  };

  // Admin and Profile Actions...
  const handleApproveProperty = (propertyId) => {
    setProperties(properties.map((p) => (p.id === propertyId ? { ...p, status: "Active" } : p)));
  };

  const handleToggleFeatureProperty = (propertyId) => {
    setProperties(properties.map((p) => (p.id === propertyId ? { ...p, isFeatured: !p.isFeatured } : p)));
  };

  const handleDeleteProperty = (propertyId) => {
    setProperties(properties.filter((p) => p.id !== propertyId));
  };

  const handleUpdateInquiryStatus = (inquiryId, status) => {
    setInquiries(inquiries.map((i) => (i.id === inquiryId ? { ...i, status } : i)));
  };

  const handleUpdateUserRole = (userId, role) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role } : u)));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const notificationsCount = inquiries.filter((i) => i.status === "Pending").length;

  const genericNavigate = (path) => navigate(path === "browse" ? "/" : `/${path}`);

  return (
    <div id="velora-application-container" className="va-root-app">
      {location.pathname !== "/auth" && (
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          notificationsCount={notificationsCount}
        />
      )}

      <main id="app-main-content" className="va-main-viewport">
        <Routes>
          <Route path="/" element={
            <BrowseScreen
              properties={properties}
              currentUser={currentUser}
              onToggleFavorite={handleToggleFavorite}
            />
          } />

          <Route path="/landingpage" element={
            <LandingPage
              properties={properties}
              currentUser={currentUser}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          
          <Route path="/property/:id" element={
            <PropertyDetailsScreen
              properties={properties}
              onSubmitInquiry={handleAddInquiry}
            />
          } />

          <Route path="/add-property" element={
            <AddPropertyScreen
              currentUser={currentUser}
              onAddProperty={handleAddProperty}
              onCancel={() => navigate("/")}
            />
          } />

          <Route path="/auth" element={
            <AuthScreen
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => navigate("/")}
            />
          } />

          <Route path="/profile" element={
            currentUser ? (
              <ProfileDashboard
                currentUser={currentUser}
                properties={properties}
                onUpdateUser={handleUpdateUser}
                onSelectProperty={(id) => navigate(`/property/${id}`)}
                onToggleFavorite={handleToggleFavorite}
                onNavigate={genericNavigate}
              />
            ) : (
              <div className="va-access-denied-notice">Please login to view your profile.</div>
            )
          } />

          <Route path="/admin" element={
            currentUser && currentUser.role === "Admin" ? (
              <AdminDashboard
                currentUser={currentUser}
                properties={properties}
                inquiries={inquiries}
                users={users}
                onApproveProperty={handleApproveProperty}
                onDeleteProperty={handleDeleteProperty}
                onToggleFeatureProperty={handleToggleFeatureProperty}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onUpdateUserRole={handleUpdateUserRole}
                onAddPropertyShortcut={() => navigate("/add-property")}
              />
            ) : (
              <div className="va-access-denied-notice">Access Denied. Administrator privileges required.</div>
            )
          } />

          <Route path="/contact" element={
            <ContactScreen onSubmitInquiry={handleAddInquiry} />
          } />
        </Routes>
      </main>

      {location.pathname !== "/auth" && (
        <footer id="velora-brand-footer" className="va-brand-footer">
          <div className="va-footer-container">
            <div className="va-footer-grid">
              
              <div className="va-footer-brand-summary">
                <div className="va-footer-logo-row">
                  <div className="va-footer-logo-square">
                    <span className="va-logo-letter">V</span>
                  </div>
                  <span className="va-logo-title">Velora</span>
                </div>
                <p className="va-footer-brand-desc font-light">
                  Representing the absolute pinnacle of global architectural heritage, low-profile stewardship, and bespoke residential sanctuaries.
                </p>
              </div>

              <div className="va-footer-nav-stack">
                <h4 className="va-footer-section-heading text-mono font-bold">Reserves</h4>
                <ul className="va-footer-link-list font-light uppercase tracking-wider">
                  <li><button onClick={() => navigate("/")} className="va-footer-nav-btn">Browse Collection</button></li>
                  <li><button onClick={() => navigate("/contact")} className="va-footer-nav-btn">Direct Coordination</button></li>
                  {currentUser && (
                    <li><button onClick={() => navigate("/profile")} className="va-footer-nav-btn">Client Profiling</button></li>
                  )}
                </ul>
              </div>

              <div className="va-footer-coords-stack font-light text-xs">
                <h4 className="va-footer-section-heading text-mono font-bold">Lounge Coordinates</h4>
                <p>Upper East Side, New York, NY</p>
                <p>Quartier d'Antin, Paris, France</p>
                <p>Minami-Aoyama, Tokyo, Japan</p>
              </div>

              <div className="va-footer-disclaimer-stack text-mono uppercase tracking-wider">
                <h4 className="va-footer-section-heading text-mono font-bold">Custody Disclaimer</h4>
                <p>Velora is a secure property trust. Access to off-market portfolios is restricted strictly under Non-Disclosure guidelines.</p>
              </div>

            </div>
            
            <div className="va-footer-bottom-row text-mono tracking-widest">
              <p> &nbsp;VELORA STEWARDSHIP TRUST. ALL REVENUE COMMITTED.</p>
              <div className="va-footer-legal-links">
                <a href="#terms" className="va-footer-legal-anchor">NDA Terms</a>
                <a href="#privacy" className="va-footer-legal-anchor">Privacy Vault</a>
                <a href="#aviation" className="va-footer-legal-anchor">Aviation Coordinates</a>
              </div>
            </div>

          </div>
        </footer>
      )}
    </div>
  );
}