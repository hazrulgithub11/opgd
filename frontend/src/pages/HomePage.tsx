import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["SHOP", "B2B", "SUPPORT", "EXPLORE"];

const TABS = [
  "12V Battery Chargers",
  "Boosters",
  "EV Chargers",
  "Accessories",
  "New Products",
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
  "12V Battery Chargers": [
    {
      name: "CS ONE (Gen 2)",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Clamps work both ways — always secure",
        "Intelligent charging for virtually all 12V batteries",
        "Wi-Fi and app features for extra functionality",
      ],
      price: "2,495 SEK",
    },
    {
      name: "NXT 5",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "One charger for all 12V battery types, including lithium",
        "Built with durable cables that stay flexible in winter",
        "Perfect for mid-range cars, motorcycles and boats",
      ],
      price: "1,295 SEK",
    },
    {
      name: "MXS 3.8 POWER KIT",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "All-in-one kit in limited edition",
        "CS STORAGE CASE for easy organization and transport",
        "5000 mAh power bank",
      ],
      price: "999 SEK",
    },
    {
      name: "MXS 5.0",
      badge: "Bestseller",
      badgeVariant: "best",
      bullets: [
        "Our bestseller for its practical simplicity",
        "Adapts in all weather conditions",
        "Perfect for mid-range cars and motorcycles",
      ],
      price: "1,095 SEK",
    },
    {
      name: "CT5 POWERSPORT",
      bullets: [
        "Special charging for lead-acid and lithium powersport batteries",
        "Eyelet connectors included",
        "Ideal for motorcycles, ATVs and jet skis",
      ],
      price: "929 SEK",
    },
    {
      name: "NXT 15",
      badge: "New",
      badgeVariant: "new",
      bullets: ["Faster 15A charging for larger batteries — including lithium"],
      price: "2,795 SEK",
    },
    {
      name: "CS FREE",
      badge: "Out of stock",
      badgeVariant: "out",
      outOfStock: true,
      bullets: [
        "Portable and solar-powered with power bank function",
        "Starts any 12V battery in 15 minutes",
        "For cars, motorcycles, vans, recreational vehicles, boats and more",
      ],
      price: "2,295 SEK",
    },
    {
      name: "MXS 5.0 POLAR",
      bullets: ["The reliable performance of MXS 5.0 adapted for cold climates"],
      price: "1,195 SEK",
    },
  ],
  Boosters: [
    {
      name: "RB 3000",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Up to 30 starts on one charge",
        "Use as a portable power bank and LED flashlight",
        "Premium design and market-leading torque",
      ],
      price: "3,395 SEK",
    },
    {
      name: "RB 4000",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Up to 45 starts on one charge",
        "Practical portable power bank with USB outputs plus flashlight",
        "Premium design and market-leading torque",
      ],
      price: "4,495 SEK",
    },
    {
      name: "CS FREE",
      badge: "Out of stock",
      badgeVariant: "out",
      outOfStock: true,
      bullets: [
        "Portable and solar-powered with power bank function",
        "Starts any 12V battery in 15 minutes",
        "For cars, motorcycles, vans, recreational vehicles, boats and more",
      ],
      price: "2,295 SEK",
    },
  ],
  "EV Chargers": [
    {
      name: "NJORD® GO",
      bullets: [
        "Up to 11 kW fast, flexible charging with a Type 2 connector",
        "Portable and ready to use straight out of the box",
        "A personal and convenient EV charging station for home, travel or workshop",
      ],
      price: "9,495 SEK",
    },
    {
      name: "NANOGRID™ AIR",
      bullets: [
        "Dynamic load balancing for your portable EV charger NJORD® GO",
        "Wi-Fi communication",
        "Easy installation without needing an electrician",
      ],
      price: "1,095 SEK",
    },
  ],
  Accessories: [
    {
      name: "ACCESSORIES KIT",
      badge: "New",
      badgeVariant: "new",
      bullets: ["Exclusive kit to enhance your charging experience"],
      price: "699 SEK",
    },
    {
      name: "CS STORAGE CASE",
      bullets: [
        "Practical storage: handy pockets and dividers",
        "Safe and durable: tough 600D water-resistant nylon",
        "Portable: lightweight bag with carry handle",
      ],
      price: "299 SEK",
    },
    {
      name: "CS CONNECT U TERMINAL",
      bullets: [
        "A permanent connection for hard-to-reach batteries",
        "Secure connection to batteries that are difficult to access",
        "High quality and durability",
      ],
      price: "179 SEK",
    },
    {
      name: "CS CONNECT ADAPTER CABLE",
      badge: "Bestseller",
      badgeVariant: "best",
      bullets: [
        "Designed for use with your CS ONE charger",
        "Enables compatibility with all CTEK CONNECT & INDICATOR accessories",
        "High quality and durability",
      ],
      price: "119 SEK",
    },
    {
      name: "CONNECT 2.5M EXTENSION CABLE",
      bullets: [
        "Allows you to place your CTEK charger further away",
        "Safe",
        "Durable",
      ],
      price: "199 SEK",
    },
    {
      name: "CS ONE BUMPER",
      bullets: [
        "Provides strong protection for your CTEK CS ONE",
        "Easy to install",
        "Tough and durable",
      ],
      price: "249 SEK",
    },
  ],
  "New Products": [
    {
      name: "CS ONE CONNECT & PROTECT KIT",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Adapter cable and our easiest to install battery connector",
        "Bumper and storage case for optimal protection",
      ],
      price: "645 SEK",
    },
    {
      name: "CS ONE ULTIMATE KIT",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Adapter cable and our easiest to install battery connector",
        "Bumper and storage case for optimal protection",
        "Wall mount for keeping the charger away from the floor and car",
      ],
      price: "795 SEK",
    },
    {
      name: "CS ONE ESSENTIALS KIT",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Adapter cable for connecting accessories to your CS ONE",
        "Includes our easiest to install battery connector",
      ],
      price: "265 SEK",
    },
    {
      name: "ACCESSORIES KIT",
      badge: "New",
      badgeVariant: "new",
      bullets: ["Exclusive kit to enhance your charging experience"],
      price: "699 SEK",
    },
    {
      name: "NXT 5",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "One charger for all 12V battery types, including lithium",
        "Built with durable cables that stay flexible in winter",
        "Perfect for mid-range cars, motorcycles and boats",
      ],
      price: "1,295 SEK",
    },
    {
      name: "NXT 15",
      badge: "New",
      badgeVariant: "new",
      bullets: ["Faster 15A charging for larger batteries — including lithium"],
      price: "2,795 SEK",
    },
    {
      name: "CS ONE (Gen 2)",
      badge: "New",
      badgeVariant: "new",
      bullets: [
        "Clamps work both ways — always secure",
        "Intelligent charging for virtually all 12V batteries",
        "Wi-Fi and app features for extra functionality",
      ],
      price: "2,495 SEK",
    },
  ],
};

const PRODUCT_COLORS: Record<string, string> = {
  "CS ONE (Gen 2)": "#2a2a2a",
  "NXT 5": "#1e3a5f",
  "MXS 3.8 POWER KIT": "#1a1a2e",
  "MXS 5.0": "#222222",
  "CT5 POWERSPORT": "#1c2b3a",
  "NXT 15": "#16213e",
  "CS FREE": "#0f3460",
  "MXS 5.0 POLAR": "#1a2a3a",
  "RB 3000": "#2d1b00",
  "RB 4000": "#3d2700",
  "NJORD® GO": "#0d2137",
  "NANOGRID™ AIR": "#1a2c3f",
  "ACCESSORIES KIT": "#1f1f1f",
  "CS STORAGE CASE": "#2c2c2c",
  "CS CONNECT U TERMINAL": "#1e1e1e",
  "CS CONNECT ADAPTER CABLE": "#252525",
  "CONNECT 2.5M EXTENSION CABLE": "#2a2a2a",
  "CS ONE BUMPER": "#333333",
  "CS ONE CONNECT & PROTECT KIT": "#1a1a1a",
  "CS ONE ULTIMATE KIT": "#222222",
  "CS ONE ESSENTIALS KIT": "#2c2c2c",
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
            CTEK
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
    tag: "CS Series",
    title: "CS Series",
    desc: "The CS Series is CTEK's most advanced battery charger, with adaptive charging and premium design that delivers optimal battery care — at home and on the road.",
    cta: "Shop CS Series",
    features: [
      { label: "Smart", sub: "Adaptive charging" },
      { label: "Innovative", sub: "Portable power source" },
      { label: "Connected", sub: "App features" },
    ],
    bg: "#0f0f0f",
  },
  {
    tag: "NXT Series",
    title: "NXT Series",
    desc: "The NXT Series is CTEK's latest innovation, built for drivers and enthusiasts who demand high performance, reliability and ease of use.",
    cta: "Shop NXT Series",
    features: [
      { label: "Durable", sub: "Daily use" },
      { label: "Versatile", sub: "All 12V batteries" },
      { label: "Effortless", sub: "Connect & forget" },
    ],
    bg: "#111827",
  },
  {
    tag: "RB Boosters",
    title: "RB Boosters",
    desc: "The RB Booster series keeps drivers moving with instant jump-start power when the battery fails. Compact, reliable and easy to use.",
    cta: "Shop RB Boosters",
    features: [
      { label: "Instant", sub: "Jump-start power" },
      { label: "Multiple", sub: "Starts per charge" },
      { label: "Boosts", sub: "& charges devices" },
    ],
    bg: "#1a0a00",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "With lots of different cars going out, it's always very important to me that they're good to go on the button, that they're ready. And of course the cars all live on CTEK chargers.",
    author: "Shmee150 (Tim Burton)",
  },
  {
    quote:
      "We've been using the MXS 5.0 for a long time now, but we can't wait to try the NXT 5, which can do both lead acid and lithium.",
    author: "Chris Zöllner, ChromeCars",
  },
  {
    quote:
      "I love the simplicity of it. Everything about what CTEK represents to me just makes my life a lot easier, and better.",
    author: "Shawn Davis, Autotopia LA",
  },
  {
    quote:
      "Our cars are meant to be driven, and anything that gets in the way of that, I need to solve. So CTEK kind of takes care of that.",
    author: "Chris Ashton, Ruffian Cars",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [heroSlide] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Announcement bar */}
      <div className="bg-black text-white text-xs text-center py-2 tracking-wide">
        Free shipping on orders over 595 SEK
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black italic tracking-tighter select-none">
            CTEK
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
          <h1 className="text-5xl font-black tracking-tight leading-none">Campervan Deal!</h1>
          <p className="text-sm text-gray-300 max-w-md leading-relaxed">
            The perfect combination of premium charging and portable power for the road:
          </p>
          <p className="text-sm font-semibold text-white">NXT 15 battery charger + RB 3000 jump starter</p>
          <p className="text-2xl font-black mt-1">4,995 SEK</p>
          <p className="text-xs text-amber-400 font-semibold -mt-1">Save 1,195 SEK</p>
          <button className="mt-2 bg-amber-400 hover:bg-amber-300 transition-colors text-black font-bold text-sm px-8 py-3 tracking-wide">
            Get it now!
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
          <h2 className="text-3xl font-black tracking-tight mb-6">Popular CTEK Products</h2>

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
                    CTEK
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
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">CTEK</p>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Power every
              <br />
              moment
            </h2>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed mb-8">
              Every journey is a story waiting to be written. Hit the road with confidence. With
              CTEK chargers and accessories, you are always ready for every adventure.
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
          <p className="text-sm text-gray-500 mb-1">Which vehicle do you need help charging?</p>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black">Choose vehicle type</h2>
            <a href="#" className="text-xs font-semibold text-black underline underline-offset-4 hover:no-underline">
              See all categories
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[
              { label: "Car", desc: "Extend your car battery life by up to three times.", bg: "#1e293b" },
              { label: "Motorcycle", desc: "Battery chargers for motorcycles are essential, especially for bikes used seasonally.", bg: "#292524" },
              { label: "Boat", desc: "Enjoy every moment on the water, knowing your marine batteries are charged and ready.", bg: "#0c4a6e" },
              { label: "Electric vehicle", desc: "Smart charging for all EV models — installed and supported by certified experts.", bg: "#14532d" },
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
            {["BMW", "Volvo", "Audi", "Porsche", "Mercedes", "Toyota"].map((brand) => (
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
                {["About Us", "Careers", "Investors", "ISO Certificate"].map((item) => (
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
                {["Support", "12V & 24V Guides", "EV Charging Guides", "Support at ctek.com"].map((item) => (
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
            <span className="text-2xl font-black italic tracking-tighter">CTEK</span>
            <p className="text-xs text-gray-600">
              © 2026 All rights reserved © CTEK Sweden AB 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
