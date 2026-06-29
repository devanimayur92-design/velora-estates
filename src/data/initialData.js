export const INITIAL_USER = {
  id: "user_sterling",
  name: "Alexander Sterling",
  email: "sterling@veloraestates.com",
  role: "Admin", // Admin can toggle between Client and Admin dashboards
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  bio: "Alexander Sterling is a visionary architectural curator, luxury real estate investor, and principal steward of the Velora Private Collection. He holds properties across four continents and manages transactions of high architectural integrity.",
  phone: "+1 (212) 555-0199",
  location: "Upper East Side, New York",
  company: "Sterling Stewardship Ltd.",
  favorites: ["prop_shoreline", "prop_hanging_gardens"]
};

export const INITIAL_PROPERTIES = [
  {
    id: "prop_shoreline",
    title: "The Shoreline Pavilion",
    type: "Cliffside Villa",
    price: 24500000,
    location: "Malibu, California",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 5,
    baths: 6,
    sqft: 8400,
    description: "An architectural masterpiece of reinforced steel, polished travertine, and massive seamless glass facets resting precariously over the dramatic Pacific surf. Designed by legendary minimalist architect Kengo Miyako, this residence offers an immersive seaside lifestyle characterized by vanishing thresholds, custom lightwells, and a floating 75-foot infinity pool that merges with the ocean horizon. Fully automated thermal management and state-of-the-art secure screening rooms complete this estate of distinction.",
    architect: "Kengo Miyako",
    yearBuilt: 2023,
    features: ["Infinity Pool", "Private Cove Access", "Helipad Landing", "Automated Louvers", "Subterranean Garage", "Travertine Terraces"],
    isFeatured: true,
    status: "Active",
    category: "Coastal",
    publishedBy: "user_sterling",
    viewsCount: 1482
  },
  {
    id: "prop_hanging_gardens",
    title: "The Hanging Gardens Penthouse",
    type: "Triplex Penthouse",
    price: 32000000,
    location: "Upper East Side, New York",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 4,
    baths: 5,
    sqft: 9200,
    description: "Suspended in the Manhattan sky, this triplex penthouse features its own wrap-around botanical terraces designed by landscape visionary Madison Croft. Glass walls elevate panoramic views of Central Park, while the interior is a symphony of calacatta marble, custom brushed-bronze columns, and double-height gallery ceilings. Features include private high-speed elevator access, temperature-controlled gallery lighting, and an indoor brass-lined plunge pool.",
    architect: "Foster + Partners",
    yearBuilt: 2022,
    features: ["Central Park Views", "Wrap-around Garden Terrace", "Private Lift", "Indoor Brass Plunge Pool", "Dual Galley Kitchens", "Smart Air-Filtration"],
    isFeatured: true,
    status: "Active",
    category: "Urban",
    publishedBy: "user_sterling",
    viewsCount: 2341
  },
  {
    id: "prop_obsidian_ridge",
    title: "The Obsidian Ridge",
    type: "Volcanic Estate",
    price: 18900000,
    location: "Reykjavik, Iceland",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 3,
    baths: 4,
    sqft: 6700,
    description: "Built into the rugged basalt hills outside Reykjavik, this brutalist gem utilizes raw, native black concrete, volcanic rock walls, and heated geothermal floors. Designed to withstand northern extremes while welcoming the northern lights through colossal skylight facets, Obsidian Ridge is an off-grid sanctuary of self-sufficient luxury. Complete with a subterranean thermal spa, steam cavern, and astronomical observatory dome.",
    architect: "Olson Kundig",
    yearBuilt: 2024,
    features: ["Thermal Spa", "Steam Cavern", "Geothermal Micro-grid", "Retractable Star-Dome", "Acoustic Listening Lounge", "Aurora Glass Walls"],
    isFeatured: false,
    status: "Active",
    category: "Brutalist",
    publishedBy: "user_agent_smith",
    viewsCount: 912
  },
  {
    id: "prop_villa_solis",
    title: "Villa Solis",
    type: "Cliffside Sanctuary",
    price: 15800000,
    location: "Amalfi, Italy",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 6,
    baths: 7,
    sqft: 7900,
    description: "Embodying the sweet sun-drenched ease of coastal Campania, Villa Solis spans across cascading lemon orchards down to its own private mooring jetty. Historic limestone arches pair with clean contemporary glass partitions to reveal panoramic Tyrrhenian vistas. An underground sensory wellness cave and outdoor olive-wood deck frame this timeless retreat of Italian elegance.",
    architect: "Studio Peregalli",
    yearBuilt: 2021,
    features: ["Private Boat Dock", "Lemon Orchard Cascade", "Underground Sensory Cave", "Limestone Arches", "Outdoor Wood Oven", "Saltwater Pool"],
    isFeatured: true,
    status: "Active",
    category: "Coastal",
    publishedBy: "user_sterling",
    viewsCount: 1675
  },
  {
    id: "prop_kyoto_pavilion",
    title: "The Kyoto Pavilion",
    type: "Zen Retreat",
    price: 12200000,
    location: "Kyoto, Japan",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 3,
    baths: 3,
    sqft: 5200,
    description: "Nestled quietly in a whispering bamboo grove, this estate honors classical Japanese architecture through hand-cut hinoki wood timber frame, washi paper screens, and dark volcanic rock bases. Modern additions include solar active glass partitions and thermal storage floors. Surrounding the pavilion are exquisite dry rock zen gardens, a pristine koi pond, and a historic tea ceremony lodge.",
    architect: "Kengo Kuma & Associates",
    yearBuilt: 2020,
    features: ["Bamboo Forest Buffer", "Koi Pond & Stream", "Tea Ceremony House", "Hinoki Wood Framework", "Washi Glass Partitions", "Dry Rock Zen Garden"],
    isFeatured: false,
    status: "Active",
    category: "Minimalist",
    publishedBy: "user_sterling",
    viewsCount: 812
  },
  {
    id: "prop_chateau_monceau",
    title: "Le Petit Monceau",
    type: "Historic Manor",
    price: 28900000,
    location: "Loire Valley, France",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 8,
    baths: 9,
    sqft: 14500,
    description: "A meticulously restored 18th-century French manor blending rococo moldings and high-ceilinged grand salons with hyper-modern glass-sheathed kitchen pavilions. The surrounding formal gardens are arranged in traditional symmetrical parterres, leading to a private helipad, heated equine facilities, and a secure wine vault designed to house up to five thousand bottles.",
    architect: "Jules Hardouin-Mansart (Original)",
    yearBuilt: 1742,
    features: ["Rococo Moldings", "5000-Bottle Wine Vault", "Traditional Parterre Gardens", "Equine Stables", "Private Helipad", "Glass Kitchen Pavilions"],
    isFeatured: true,
    status: "Active",
    category: "Historic",
    publishedBy: "user_agent_smith",
    viewsCount: 1205
  },
  {
    id: "prop_sierra_monolith",
    title: "The Sierra Monolith",
    type: "Mountain Sanctuary",
    price: 19500000,
    location: "Lake Tahoe, Nevada",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    beds: 5,
    baths: 5,
    sqft: 9800,
    description: "An architectural shield of granite and solid cross-laminated timber resting among ancient pines. The Sierra Monolith uses cantilevered geometries to thrust outward over Lake Tahoe, providing unmatched views of the crystal waters. Built with passive solar techniques, insulated rammed earth, and a high-alpine mudroom featuring automated boot-warmers and board tuning fixtures.",
    architect: "Olson Kundig",
    yearBuilt: 2023,
    features: ["Cantilevered Balconies", "Rammed Earth Thermal Walls", "High-Alpine Mudroom", "Ski-in/Ski-out Access", "Custom Pine Sauna", "Automated Boot-Warmers"],
    isFeatured: false,
    status: "Pending Approval", // For testing approvals
    category: "Mountain",
    publishedBy: "user_sterling",
    viewsCount: 312
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: "inq_1",
    propertyId: "prop_shoreline",
    propertyTitle: "The Shoreline Pavilion",
    clientName: "Eleanor Vance",
    clientEmail: "evance@sterlingholding.com",
    clientPhone: "+1 (415) 321-0088",
    message: "I am writing to request a private viewing of the Shoreline Pavilion on the afternoon of July 12th. My aviation coordinator would require confirmation regarding the coordinates of the helipad, and whether custom fueling options are supported. Please direct further communication to my executive office.",
    preferredContactMethod: "Email",
    date: "2026-06-24",
    status: "Pending"
  },
  {
    id: "inq_2",
    propertyId: "prop_hanging_gardens",
    propertyTitle: "The Hanging Gardens Penthouse",
    clientName: "Lord Julian Hetherington",
    clientEmail: "hetherington.j@parliament.uk",
    clientPhone: "+44 20 7946 0958",
    message: "A quick inquiry regarding the Central Park views. Is the western master balcony directly clear of the high-rise proposal on 58th street? Our family's trust would look to close this transaction in standard off-market USD wire before the autumn recess.",
    preferredContactMethod: "WhatsApp",
    date: "2026-06-25",
    status: "Pending"
  },
  {
    id: "inq_3",
    propertyId: "prop_obsidian_ridge",
    propertyTitle: "The Obsidian Ridge",
    clientName: "Dr. Kenzo Arisaka",
    clientEmail: "kenzo@arisakalabs.io",
    clientPhone: "+81 90 5555 1204",
    message: "We are deeply fascinated by Obsidian Ridge's off-grid micro-grid system and thermal reserves. Could we arrange a digital technical walkthrough with the structural engineer Olson Kundig's office? We intend to host high-compute private nodes on-site and need to understand the thermal discharge capacity of the steam cavern.",
    preferredContactMethod: "Phone",
    date: "2026-06-23",
    status: "Reviewed"
  },
  {
    id: "inq_4",
    clientName: "Elena Rostova",
    clientEmail: "rostova.invest@genevacapital.ch",
    clientPhone: "+41 22 789 0123",
    message: "General inquiry: I would like to schedule a private briefing in Zurich with Velora's Principal Curator. We are allocating portfolio funds toward historical European estates and mid-century modern shelters in California.",
    preferredContactMethod: "Email",
    date: "2026-06-22",
    status: "Pending"
  }
];

export const ALL_USERS = [
  INITIAL_USER,
  {
    id: "user_agent_smith",
    name: "Arthur Smith",
    email: "smith@veloraestates.com",
    role: "Agent",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Senior Portfolio Agent specializing in European heritage properties and volcanic architectural hideaways.",
    phone: "+33 6 1234 5678",
    location: "Paris, France",
    favorites: ["prop_chateau_monceau"]
  },
  {
    id: "user_client_vance",
    name: "Eleanor Vance",
    email: "evance@sterlingholding.com",
    role: "Client",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Principal at Sterling Holding Corporation, focusing on coastal architectural landmarks.",
    phone: "+1 (415) 321-0088",
    location: "San Francisco, California",
    favorites: ["prop_shoreline"]
  }
];

export const CATEGORIES = [
  { id: "Coastal", label: "Coastal Sanctuary", count: 2, icon: "Waves" },
  { id: "Minimalist", label: "Minimalist Pavilion", count: 1, icon: "Layers" },
  { id: "Urban", label: "Urban Penthouse", count: 1, icon: "Building" },
  { id: "Brutalist", label: "Brutalist Ridge", count: 1, icon: "Box" },
  { id: "Historic", label: "Historic Heritage", count: 1, icon: "Shield" },
  { id: "Mountain", label: "Mountain Shelter", count: 1, icon: "Mountain" }
];
