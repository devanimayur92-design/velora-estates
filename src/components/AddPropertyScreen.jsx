import React, { useState } from "react";
import { ArrowLeft, Upload, Sparkles, Check, FileText, Settings } from "lucide-react";
import "./AddPropertyScreen.css"; // Import the custom CSS file

export default function AddPropertyScreen({
  currentUser,
  onAddProperty,
  onCancel
}) {
  // Form states
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Minimalist Villa");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Minimalist");
  const [beds, setBeds] = useState("4");
  const [baths, setBaths] = useState("4");
  const [sqft, setSqft] = useState("7200");
  const [description, setDescription] = useState("");
  const [architect, setArchitect] = useState("");
  const [yearBuilt, setYearBuilt] = useState("2025");
  
  // Features checkbox state
  const [selectedFeatures, setSelectedFeatures] = useState([
    "Infinity Pool", "Wine Cellar"
  ]);

  // Image Upload zone state
  const [imageUrls, setImageUrls] = useState([
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
  ]);
  const [dragActive, setDragActive] = useState(false);

  const availableFeatures = [
    "Infinity Pool", "Private Cove Access", "Helipad Landing", "Automated Louvers",
    "Subterranean Garage", "Travertine Terraces", "Central Park Views", "Wine Cellar",
    "Private Boat Dock", "Thermal Spa", "Steam Cavern", "Geothermal Micro-grid",
    "Dry Rock Zen Garden", "Tea Ceremony House"
  ];

  const handleFeatureToggle = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Drag and drop uploader handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const mockImagePool = [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
    ];

    const randomImg = mockImagePool[Math.floor(Math.random() * mockImagePool.length)];
    if (!imageUrls.includes(randomImg)) {
      setImageUrls([...imageUrls, randomImg]);
    }
  };

  const triggerManualUpload = () => {
    const mockImagePool = [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
    ];
    const unusedImages = mockImagePool.filter(url => !imageUrls.includes(url));
    const randomImg = unusedImages.length > 0 ? unusedImages[0] : mockImagePool[0];
    setImageUrls([...imageUrls, randomImg]);
  };

  const handlePrefillTemplate = () => {
    setTitle("The Cobalt Canopy");
    setType("Coastal Pavilion");
    setPrice("22000000");
    setLocation("Atherton, California");
    setCategory("Minimalist");
    setBeds("5");
    setBaths("5");
    setSqft("8900");
    setArchitect("Olson Kundig");
    setYearBuilt("2025");
    setDescription("Commanding a panoramic vista over the valley, The Cobalt Canopy features an expansive architectural cantilever spanning sixty feet, balanced over raw board-formed concrete. Its design integrates a private olive grove cascade, floor-to-ceiling glass facets, and a soundproof meditation tea room.");
    setSelectedFeatures(["Infinity Pool", "Travertine Terraces", "Wine Cellar", "Dry Rock Zen Garden"]);
    setImageUrls([
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ]);
  };

  const handleSubmit = (e, isDraft) => {
    e.preventDefault();
    if (!title || !price || !location) {
      alert("Please complete the required Title, Valuation, and Location fields.");
      return;
    }

    const newProperty = {
      id: `prop_${Date.now()}`,
      title,
      type,
      price: parseFloat(price),
      location,
      images: imageUrls.length > 0 ? imageUrls : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"],
      beds: parseInt(beds, 10),
      baths: parseInt(baths, 10),
      sqft: parseInt(sqft, 10),
      description: description || "A property of singular architectural integrity, curated into the Velora Collection. Detailed spec lists are available upon private request.",
      architect: architect || "Bespoke Architect",
      yearBuilt: yearBuilt ? parseInt(yearBuilt, 10) : 2025,
      features: selectedFeatures,
      isFeatured: false,
      status: isDraft ? "Draft" : (currentUser?.role === "Admin" ? "Active" : "Pending Approval"),
      category,
      publishedBy: currentUser?.id || "anonymous"
    };

    onAddProperty(newProperty);
  };

  return (
    <div id="add-property-root" className="vp-screen-root">
      
      {/* Back Button */}
      <div className="vp-top-bar">
        <button onClick={onCancel} className="vp-back-btn group">
          <ArrowLeft size={14} className="vp-back-icon" />
          <span>Discard Registration</span>
        </button>
      </div>

      <div className="vp-content-container">
        
        {/* Form Container */}
        <div className="vp-form-card">
          
          {/* Quick Prefill Mock Button */}
          <div className="vp-prefill-wrapper">
            <button type="button" onClick={handlePrefillTemplate} className="vp-prefill-btn">
              <Sparkles size={11} />
              <span>PREFILL RESIDENCE DATA</span>
            </button>
          </div>

          <div className="vp-form-header">
            <h1 className="vp-title">
              Inscribe <span className="vp-title-italic">New Estate</span>
            </h1>
            <p className="vp-subtitle text-mono">
              Register a curated masterpiece into the Velora Private Collection
            </p>
          </div>

          <form onSubmit={(e) => handleSubmit(e, false)} className="vp-main-form">
            
            {/* Core Architectural Registry Details */}
            <div className="vp-form-section">
              <h3 className="vp-section-heading">
                <FileText size={16} className="vp-icon-accent" />
                <span>Identity & Location</span>
              </h3>

              <div className="vp-grid-two-col">
                
                {/* Title */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Listing Title *</label>
                  <input
                    id="input-listing-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="The Shoreline Pavilion"
                    className="vp-input"
                  />
                </div>

                {/* Sub-type */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Architectural Type</label>
                  <input
                    id="input-listing-type"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Minimalist Glass Villa"
                    className="vp-input"
                  />
                </div>

                {/* Guide Price */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Guide Valuation (USD) *</label>
                  <div className="vp-price-input-wrapper">
                    <span className="vp-price-currency text-mono">$</span>
                    <input
                      id="input-listing-price"
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="24500000"
                      className="vp-input vp-input-price"
                    />
                  </div>
                </div>

                {/* Geography */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Geographic Coordinates / Address *</label>
                  <input
                    id="input-listing-location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Malibu, California"
                    className="vp-input"
                  />
                </div>

              </div>
            </div>

            {/* Categorization & Capacity Specifications */}
            <div className="vp-form-section">
              <h3 className="vp-section-heading">
                <Settings size={16} className="vp-icon-accent" />
                <span>Curated Classifications</span>
              </h3>

              <div className="vp-grid-four-col">
                
                {/* Category Selection */}
                <div className="vp-col-span-2">
                  <label className="vp-label text-mono font-semibold">Aesthetic Classification</label>
                  <select
                    id="select-listing-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="vp-select"
                  >
                    <option value="Minimalist">Minimalist Pavilion</option>
                    <option value="Coastal">Coastal Sanctuary</option>
                    <option value="Urban">Urban Penthouse</option>
                    <option value="Brutalist">Brutalist Ridge</option>
                    <option value="Historic">Historic Heritage</option>
                    <option value="Mountain">Mountain Shelter</option>
                  </select>
                </div>

                {/* Beds */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Beds (Double Suites)</label>
                  <input
                    id="input-listing-beds"
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className="vp-input"
                  />
                </div>

                {/* Baths */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Baths</label>
                  <input
                    id="input-listing-baths"
                    type="number"
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    className="vp-input"
                  />
                </div>

              </div>

              <div className="vp-grid-three-col">
                {/* Built Area */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Built Area (Sq Ft)</label>
                  <input
                    id="input-listing-sqft"
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    className="vp-input"
                  />
                </div>

                {/* Architect */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Principal Architect</label>
                  <input
                    id="input-listing-architect"
                    type="text"
                    value={architect}
                    onChange={(e) => setArchitect(e.target.value)}
                    placeholder="e.g. Olson Kundig"
                    className="vp-input"
                  />
                </div>

                {/* Year built */}
                <div className="vp-input-group">
                  <label className="vp-label text-mono font-semibold">Year of Commission</label>
                  <input
                    id="input-listing-yearbuilt"
                    type="number"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    className="vp-input"
                  />
                </div>
              </div>
            </div>

            {/* Drag-and-Drop Image Uploader */}
            <div className="vp-upload-section">
              <h3 className="vp-section-sub-heading">Architectural Photography</h3>

              <div
                id="image-drag-drop-zone"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerManualUpload}
                className={`vp-dropzone ${dragActive ? "drag-active" : ""}`}
              >
                <Upload className="vp-upload-icon" size={36} />
                <h4 className="vp-dropzone-title">
                  Drag and drop listing photography here, or <span className="vp-underline">browse local files</span>
                </h4>
                <p className="vp-dropzone-meta text-mono">
                  Accepts high-definition TIFF, RAW, or JPEG formats. Drag multiple files.
                </p>
              </div>

              {/* Photo Previews Pool */}
              <div className="vp-preview-scroll-container">
                {imageUrls.map((url, index) => (
                  <div key={index} className="vp-preview-frame">
                    <img src={url} alt={`Preview ${index}`} className="vp-preview-img" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageUrls(imageUrls.filter((_, i) => i !== index));
                      }}
                      className="vp-delete-preview-btn"
                    >
                      &times;
                    </button>
                    {index === 0 && (
                      <span className="vp-spotlight-tag text-mono">
                        Spotlight
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative text area */}
            <div className="vp-narrative-group">
              <label className="vp-label text-mono font-semibold">Architectural Narrative / Philosophy Overview</label>
              <textarea
                id="textarea-listing-description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the interplay of raw materials, lightwell installations, seamless thresholds, and context within the wider geography..."
                className="vp-textarea"
              />
            </div>

            {/* Bespoke Amenities Selectors */}
            <div className="vp-amenities-section">
              <h3 className="vp-section-sub-heading">Bespoke Amenities</h3>
              <div className="vp-amenities-grid">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => handleFeatureToggle(feat)}
                      className={`vp-amenity-card ${isChecked ? "checked" : ""}`}
                    >
                      <div className={`vp-checkbox ${isChecked ? "checked" : ""}`}>
                        {isChecked && <Check size={10} className="vp-check-icon" />}
                      </div>
                      <span className="vp-amenity-text">{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Form Buttons */}
            <div className="vp-form-actions">
              <button type="button" onClick={onCancel} className="vp-btn-discard">
                Discard Registry
              </button>

              <button
                id="btn-listing-save-draft"
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="vp-btn-draft"
              >
                Save as Draft
              </button>

              <button id="btn-listing-publish" type="submit" className="vp-btn-publish">
                Publish Estate
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}