import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["SHOP", "B2B", "SUPPORT", "EXPLORE"];

const TABS = [
  "iPhones",
  "Samsung",
  "Honor",
  "Android Phones",
  "Accessories",
];

type Product = {
  name: string;
  badge?: string;
  badgeVariant?: "new" | "best" | "out";
  bullets: string[];
  price: string;
  outOfStock?: boolean;
};

const PRODUCTS: Record<string, Product[]> = {
  "iPhones": [
    {
      name: "iPhone 12 Pro 512GB Black",
      badge: "In Stock",
      badgeVariant: "new",
      bullets: [
        "512GB — ample storage for photos, apps and more",
        "Pro camera system with LiDAR Scanner",
        "Unlocked, works with all carriers",
      ],
      price: "RM 2,999",
    },
  ],
  "Samsung": [
    {
      name: "Samsung Galaxy A35 5G",
      badge: "Bestseller",
      badgeVariant: "best",
      bullets: [
        "8/256GB — spacious storage for all your needs",
        "5G-ready for next-gen connectivity",
        "120Hz Super AMOLED display",
      ],
      price: "RM 999",
    },
    {
      name: "Samsung Galaxy S24 FE",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "8/256GB with Galaxy AI features",
        "50MP rear camera with optical zoom",
        "IP67 water resistance",
      ],
      price: "RM 1,799",
    },
  ],
  "Honor": [
    {
      name: "Honor 200 Lite 8/512GB",
      bullets: [
        "512GB storage at an accessible price",
        "Slim design with vibrant colour options",
        "Long-lasting battery for all-day use",
      ],
      price: "RM 799",
    },
    {
      name: "Honor 200 Pro 512GB",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "512GB flagship-tier storage",
        "50MP triple camera with Portrait Engine",
        "Up to 100W fast charging",
      ],
      price: "RM 1,299",
    },
    {
      name: "Honor 200 Smart 5G",
      bullets: [
        "8/256GB — smooth 5G performance",
        "6.8\" HD+ display with eye comfort",
        "5230mAh battery for extended usage",
      ],
      price: "RM 599",
    },
    {
      name: "Honor 90 Lite 5G",
      bullets: [
        "8/256GB with 5G connectivity",
        "100MP triple camera system",
        "35W fast charging support",
      ],
      price: "RM 699",
    },
    {
      name: "Honor Play 10 4/128GB",
      badge: "Bestseller",
      badgeVariant: "best",
      bullets: [
        "4/128GB — reliable everyday smartphone",
        "Large display for media and gaming",
        "Durable build with long battery life",
      ],
      price: "RM 599",
    },
    {
      name: "Honor X5B Plus 4/128GB",
      bullets: [
        "4/128GB — entry-level powerhouse",
        "Available in Black and Blue",
        "Ideal for students and everyday users",
      ],
      price: "RM 449",
    },
  ],
  "Android Phones": [
    {
      name: "Google Pixel 9 256GB",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "256GB with Google AI-powered camera",
        "Pure Android with 7 years of updates",
        "Titan M2 security chip",
      ],
      price: "RM 1,799",
    },
    {
      name: "Infinix Note 50X 5G",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "8/256GB with 5G connectivity",
        "5G-ready at a budget-friendly price",
        "Large 5000mAh battery",
      ],
      price: "RM 699",
    },
    {
      name: "Vivo Y18S 4/128GB",
      bullets: [
        "4/128GB — compact and capable",
        "44W FlashCharge technology",
        "Slim design with premium finish",
      ],
      price: "RM 499",
    },
    {
      name: "OPPO A60 8/256GB",
      bullets: [
        "8/256GB — generous storage",
        "5000mAh with SUPERVOOC charging",
        "Dynamic RAM Expansion technology",
      ],
      price: "RM 649",
    },
    {
      name: "Realme C67 6/128GB",
      badge: "Bestseller",
      badgeVariant: "best",
      bullets: [
        "6/128GB — value for money",
        "108MP AI camera",
        "5000mAh battery for all-day use",
      ],
      price: "RM 549",
    },
  ],
  "Accessories": [
    {
      name: "Headphone P47",
      bullets: [
        "Wireless over-ear headphone",
        "Deep bass with clear treble",
        "Compatible with all smartphones",
      ],
      price: "—",
    },
    {
      name: "Mini Handheld Portable Fan",
      bullets: [
        "Compact portable design",
        "USB rechargeable battery",
        "Perfect travel companion",
      ],
      price: "RM 19",
    },
  ],
};

const PRODUCT_COLORS: Record<string, string> = {
  "iPhone 12 Pro 512GB Black": "#1c1c1e",
  "Samsung Galaxy A35 5G": "#1a237e",
  "Samsung Galaxy S24 FE": "#0d1b4b",
  "Honor 200 Lite 8/512GB": "#006064",
  "Honor 200 Pro 512GB": "#1a237e",
  "Honor 200 Smart 5G": "#004d40",
  "Honor 90 Lite 5G": "#1b5e20",
  "Honor Play 10 4/128GB": "#212121",
  "Honor X5B Plus 4/128GB": "#263238",
  "Google Pixel 9 256GB": "#1b5e20",
  "Infinix Note 50X 5G": "#1a237e",
  "Vivo Y18S 4/128GB": "#4a148c",
  "OPPO A60 8/256GB": "#b71c1c",
  "Realme C67 6/128GB": "#e65100",
  "Headphone P47": "#1c1c1c",
  "Mini Handheld Portable Fan": "#2a2a2a",
};

function badgeStyle(variant?: string) {
  if (variant === "new") return "bg-black text-white";
  if (variant === "best") return "bg-amber-500 text-white";
  if (variant === "out") return "bg-gray-400 text-white";
  return "";
}

function ProductCard({ product }: { product: Product }) {
  const bg = PRODUCT_COLORS[product.name] ?? "#222";
  return (
    <div className="flex-shrink-0 w-[260px] bg-white border border-gray-100 flex flex-col">
      <div
        className="relative h-[220px] flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide ${badgeStyle(product.badgeVariant)}`}
          >
            {product.badge}
          </span>
        )}
        <div
          className="w-28 h-28 rounded-sm opacity-90 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${bg} 0%, #555 100%)` }}
        >
                  <span className="text-white text-[8px] font-bold tracking-widest opacity-70 text-center px-1 leading-tight">
                    OG
                  </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-sm font-bold text-black tracking-wide">{product.name}</h3>
        <ul className="flex flex-col gap-1 flex-1">
          {product.bullets.map((b) => (
            <li key={b} className="text-[11px] text-gray-600 flex gap-1.5 items-start leading-tight">
              <span className="mt-0.5 text-black shrink-0">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm font-bold text-black mt-1">{product.price}</p>
        <div className="flex gap-2">
          {product.outOfStock ? (
            <button className="flex-1 text-xs font-semibold border border-gray-300 text-gray-400 py-2 cursor-not-allowed">
              Learn more
            </button>
          ) : (
            <>
              <button className="flex-1 text-xs font-semibold bg-black text-white py-2 hover:bg-gray-800 transition-colors">
                Buy
              </button>
              <button className="flex-1 text-xs font-semibold border border-black text-black py-2 hover:bg-gray-50 transition-colors">
                Learn more
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const SERIES = [
  {
    tag: "iPhone",
    title: "iPhone",
    desc: "Apple's most powerful lineup — packed with the A-series chip, ProMotion display, and a camera system that redefines what's possible with a phone.",
    cta: "Shop iPhones",
    features: [
      { label: "Powerful", sub: "A-series chip" },
      { label: "Pro Camera", sub: "LiDAR & Night Mode" },
      { label: "Secure", sub: "Face ID & iOS" },
    ],
    bg: "#0f0f0f",
  },
  {
    tag: "Samsung Galaxy",
    title: "Samsung Galaxy",
    desc: "From the flagship S-series to the accessible A-series, Samsung Galaxy phones deliver cutting-edge performance, stunning displays and long-lasting battery life.",
    cta: "Shop Samsung",
    features: [
      { label: "Vivid", sub: "Super AMOLED display" },
      { label: "Versatile", sub: "5G-ready" },
      { label: "AI-powered", sub: "Galaxy AI features" },
    ],
    bg: "#111827",
  },
  {
    tag: "Honor",
    title: "Honor",
    desc: "Honor phones bring flagship-tier features to every price point — fast charging, multi-lens cameras and 5G connectivity without compromise.",
    cta: "Shop Honor",
    features: [
      { label: "Fast Charge", sub: "Up to 100W" },
      { label: "5G Ready", sub: "All models" },
      { label: "Value", sub: "Flagship features" },
    ],
    bg: "#1a0a00",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Got my Samsung Galaxy S24 FE here and it's been amazing. Great price, fast service, and the phone is exactly as described.",
    author: "Amirul H., Kuala Lumpur",
  },
  {
    quote:
      "Option Gadget is my go-to for phones. Genuine products, competitive pricing, and they really know their stuff.",
    author: "Siti N., Petaling Jaya",
  },
  {
    quote:
      "Bought an Honor 200 Pro for my daughter and she loves it. The camera is incredible at this price point.",
    author: "Razif M., Shah Alam",
  },
  {
    quote:
      "Smooth transaction, phone arrived quickly and in perfect condition. Will definitely be back for my next upgrade.",
    author: "Hafizuddin R., Subang Jaya",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [heroSlide] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Announcement bar */}
      <div className="bg-black text-white text-xs text-center py-2 tracking-wide">
        Free shipping on orders over RM 500
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black italic tracking-tighter select-none">
            Option Gadget
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-semibold tracking-widest text-black hover:text-gray-500 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-black hover:text-gray-500 transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-500 transition-colors" aria-label="Region">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-500 transition-colors" aria-label="Sign in">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-500 transition-colors" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button className="text-black hover:text-gray-500 transition-colors" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "520px" }}>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(160deg, #1a2535 0%, #2c3e50 40%, #4a5568 70%, #718096 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="absolute right-0 bottom-0 w-2/3 h-full flex items-end justify-end opacity-30 pointer-events-none select-none">
          <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMaxYMax meet">
            <ellipse cx="650" cy="340" rx="400" ry="160" fill="rgba(255,255,255,0.05)" />
            <rect x="200" y="180" width="500" height="160" rx="20" fill="rgba(255,255,255,0.07)" />
            <rect x="300" y="140" width="280" height="90" rx="8" fill="rgba(255,255,255,0.05)" />
            <circle cx="310" cy="350" r="40" fill="rgba(255,255,255,0.1)" />
            <circle cx="590" cy="350" r="40" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 gap-3">
          <h1 className="text-5xl font-black tracking-tight leading-none">New Arrivals!</h1>
          <p className="text-sm text-gray-300 max-w-md leading-relaxed">
            The latest smartphones at unbeatable prices:
          </p>
          <p className="text-sm font-semibold text-white">Samsung Galaxy S24 FE · Honor 200 Pro · Google Pixel 9</p>
          <p className="text-2xl font-black mt-1">From RM 999</p>
          <p className="text-xs text-amber-400 font-semibold -mt-1">Limited stock available</p>
          <button className="mt-2 bg-amber-400 hover:bg-amber-300 transition-colors text-black font-bold text-sm px-8 py-3 tracking-wide">
            Shop Now!
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              className={`h-0.5 transition-all ${
                i === heroSlide ? "w-8 bg-white" : "w-6 bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Products section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-xs text-gray-500 mb-1 tracking-wide uppercase">Our recommendations</p>
          <h2 className="text-3xl font-black tracking-tight mb-6">Popular Phones & Gadgets</h2>

          <div className="flex gap-2 flex-wrap mb-8 border-b border-gray-100 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-semibold px-4 py-2 border transition-colors whitespace-nowrap -mb-px ${
                  activeTab === tab
                    ? "border-black text-black bg-white"
                    : "border-gray-200 text-gray-500 hover:text-black hover:border-gray-400 bg-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
            {(PRODUCTS[activeTab] ?? []).map((p) => (
              <div key={p.name} style={{ scrollSnapAlign: "start" }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Series feature sections */}
      {SERIES.map((s, idx) => (
        <section
          key={s.tag}
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(${idx % 2 === 0 ? "135deg" : "225deg"}, ${s.bg} 0%, #1a1a2e 100%)`,
            minHeight: "420px",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
            <div className={`flex-1 text-white ${idx % 2 !== 0 ? "md:order-2" : ""}`}>
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Explore</p>
              <h2 className="text-4xl font-black leading-tight mb-4">{s.title}</h2>
              <p className="text-sm text-gray-300 max-w-sm leading-relaxed mb-6">{s.desc}</p>
              <button className="border border-white text-white text-xs font-semibold px-6 py-2.5 hover:bg-white hover:text-black transition-colors tracking-wide">
                {s.cta}
              </button>

              <div className="flex gap-6 mt-8">
                {s.features.map((f) => (
                  <div key={f.label} className="flex flex-col">
                    <span className="text-white font-bold text-sm">{f.label}</span>
                    <span className="text-gray-400 text-xs">{f.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`flex-1 flex items-center justify-center ${idx % 2 !== 0 ? "md:order-1" : ""}`}>
              <div className="relative w-64 h-64">
                <div
                  className="absolute inset-0 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
                />
                <div
                  className="absolute inset-8 rounded-sm flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${s.bg} 0%, #444 100%)`,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="text-white text-2xl font-black italic tracking-tighter opacity-50">
                    OG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Power every moment */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">Option Gadget</p>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Find your
              <br />
              perfect phone
            </h2>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed mb-8">
              Every smartphone tells a story. Find the device that fits your life — from flagship
              powerhouses to budget-friendly gems, Option Gadget has you covered.
            </p>
            <button className="bg-black text-white text-xs font-semibold px-8 py-3 hover:bg-gray-800 transition-colors tracking-wide">
              Explore
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="border-l-2 border-gray-200 pl-4 py-1">
                <p className="text-xs text-gray-600 italic leading-relaxed mb-1">"{t.quote}"</p>
                <p className="text-xs font-bold text-black">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-sm text-gray-500 mb-1">What are you looking for?</p>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black">Browse by brand</h2>
            <a href="#" className="text-xs font-semibold text-black underline underline-offset-4 hover:no-underline">
              See all categories
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              { label: "Apple", desc: "Explore our range of iPhones — genuine, unlocked and ready to go.", bg: "#1e293b" },
              { label: "Samsung", desc: "From budget A-series to flagship S-series, find your Galaxy here.", bg: "#292524" },
              { label: "Honor", desc: "Feature-packed phones at every price point — fast charging and 5G included.", bg: "#0c4a6e" },
              { label: "Budget Phones", desc: "Great performance without breaking the bank — Vivo, OPPO, Realme and more.", bg: "#14532d" },
            ].map((v) => (
              <div
                key={v.label}
                className="relative flex-shrink-0 w-[280px] h-[200px] overflow-hidden cursor-pointer group"
                style={{ background: `linear-gradient(135deg, ${v.bg} 0%, #1a1a1a 100%)` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-black text-lg mb-1">{v.label}</h3>
                  <p className="text-xs text-gray-300 leading-snug">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by leading brands */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-2xl font-black mb-2">Trusted by leading brands</h2>
          <p className="text-sm text-gray-500 mb-8">Join thousands of satisfied customers worldwide</p>
          <div className="flex gap-12 justify-center items-center flex-wrap opacity-40">
            {["Apple", "Samsung", "Honor", "Vivo", "OPPO", "Realme"].map((brand) => (
              <span key={brand} className="text-lg font-black tracking-widest">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-400">ABOUT US</p>
              <ul className="flex flex-col gap-2">
                {["About Us", "Why Option Gadget", "Trade-In Programme", "Warranty Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-400">SUPPORT</p>
              <ul className="flex flex-col gap-2">
                {["Support", "Phone Buying Guide", "After-Sales Service", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-400">
                TERMS & POLICIES
              </p>
              <ul className="flex flex-col gap-2">
                {["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Accessibility Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-400">
                Payment methods
              </p>
              <div className="flex flex-wrap gap-2">
                {["Visa", "Mastercard", "Klarna", "Swish", "Apple Pay", "Google Pay"].map((pm) => (
                  <span
                    key={pm}
                    className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded-sm"
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="text-2xl font-black italic tracking-tighter">Option Gadget</span>
            <p className="text-xs text-gray-600">
              © 2026 All rights reserved © Option Gadget
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
