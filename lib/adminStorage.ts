export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  mrp: number;
  description: string;
  images: string[];
  tag: string | null;
};

const STORAGE_KEYS = {
  products: "sangvita-products",
  marquee: "sangvita-marquee",
  auth: "sangvita-admin-auth",
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vita-C Forte",
    category: "Immunity Support",
    price: 899,
    mrp: 1200,
    description: "Advanced vitamin C formula to boost immunity and support overall wellness.",
    images: [],
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Gud-Sleep",
    category: "Sleep Aid System",
    price: 749,
    mrp: 999,
    description: "Natural sleep support supplement for better rest and relaxation.",
    images: [],
    tag: "Amazon Choice",
  },
  {
    id: 3,
    name: "Sangvita Ortho",
    category: "Joint Pain Relief",
    price: 650,
    mrp: 850,
    description: "Specially formulated to support joint health and mobility.",
    images: [],
    tag: null,
  },
  {
    id: 4,
    name: "Neuro-Plus",
    category: "Brain Function Support",
    price: 599,
    mrp: 799,
    description: "Cognitive support supplement for enhanced mental clarity and focus.",
    images: [],
    tag: "New Launch",
  },
];

const DEFAULT_MARQUEE = [
  "🚀 New Distribution Hub Open in West Champaran",
  "💊 Sangvita Ortho now WHO-GMP Certified",
  "🔬 Innovations in Molecular Research 2026",
  "📞 Contact support: 9204665654",
];

const ADMIN_EMAIL = "admin@sangvita.com";
const ADMIN_PASSWORD = "Admin@1234";

const safeLocalStorage = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage;
};

export function getStoredProducts(): Product[] {
  const storage = safeLocalStorage();
  if (!storage) return DEFAULT_PRODUCTS;
  const saved = storage.getItem(STORAGE_KEYS.products);
  if (!saved) {
    storage.setItem(STORAGE_KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return DEFAULT_PRODUCTS;
    return parsed;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]) {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}

export function getStoredMarqueeItems(): string[] {
  const storage = safeLocalStorage();
  if (!storage) return DEFAULT_MARQUEE;
  const saved = storage.getItem(STORAGE_KEYS.marquee);
  if (!saved) {
    storage.setItem(STORAGE_KEYS.marquee, JSON.stringify(DEFAULT_MARQUEE));
    return DEFAULT_MARQUEE;
  }
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return DEFAULT_MARQUEE;
    return parsed;
  } catch {
    return DEFAULT_MARQUEE;
  }
}

export function saveStoredMarqueeItems(items: string[]) {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.marquee, JSON.stringify(items));
}

export function isAuthenticated(): boolean {
  const storage = safeLocalStorage();
  if (!storage) return false;
  return storage.getItem(STORAGE_KEYS.auth) === "true";
}

export function login(email: string, password: string): boolean {
  const storage = safeLocalStorage();
  if (!storage) return false;
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    storage.setItem(STORAGE_KEYS.auth, "true");
    return true;
  }
  return false;
}

export function logout() {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.auth);
}

export function getDefaultProducts(): Product[] {
  return DEFAULT_PRODUCTS;
}

export function getDefaultMarqueeItems(): string[] {
  return DEFAULT_MARQUEE;
}
