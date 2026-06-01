export interface DemoWebsite {
  id: string;
  category: "restaurant" | "gym" | "doctor";
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  features: string[];
}

export interface ChooseUsItem {
  title: string;
  description: string;
  iconName: string;
}

export const BRAND_STORY = {
  name: "Haebaragi Studio",
  tagline: "We build websites that grow your business.",
  shortTagline: "Premium websites for doctors, restaurants, and gyms in Hyderabad.",
  founder: {
    name: "Haebaragi Studio",
    role: "Web Studio, Hyderabad",
    bio: "Haebaragi Studio was built to help local businesses in Hyderabad get the professional online presence they deserve. We've built websites for dental clinics, restaurants, and gyms — each one custom-designed, fast, and built to bring in real customers. No templates, no monthly fees, and we're personally reachable on WhatsApp throughout the project.",
    avatar: ""
  },
  directContact: {
    email: "haebaragistudio2@gmail.com",
    phone: "+91 8977831405"
  }
};

export const DEMO_WEBSITES: DemoWebsite[] = [
  {
    id: "restaurant",
    category: "restaurant",
    title: "Aurelia — Fine Gastronomy",
    description: "A sample restaurant website built to show what's possible — online menu, table booking, and gallery. This is the kind of site we'd build for a restaurant client.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    demoUrl: "https://restor-indol.vercel.app",
    features: ["Online table reservations", "Visual menu with photos", "Google Maps & directions"]
  },
  {
    id: "gym",
    category: "gym",
    title: "Gravity — Premium Gym",
    description: "A sample gym website built to demonstrate what a fitness business could look like — class schedule, membership plans, and trainer profiles.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    demoUrl: "https://gravitydemo1.vercel.app",
    features: ["Class schedule & timings", "Membership pricing tiers", "Trainer profiles & bios"]
  },
  {
    id: "doctor",
    category: "doctor",
    title: "Dento — Specialist Care",
    description: "A sample dental clinic website built to show the kind of clean, trustworthy design we create for healthcare clients — appointment booking and credentials included.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    demoUrl: "https://dentalfinal.vercel.app",
    features: ["Appointment request form", "Doctor credentials & bio", "Service & treatment list"]
  }
];

export const WHY_CHOOSE_US: ChooseUsItem[] = [
  {
    title: "Looks Premium, Builds Trust",
    description: "A professional website makes patients and customers feel confident before they even call you. First impressions online are everything.",
    iconName: "Palette"
  },
  {
    title: "Works on Every Phone",
    description: "Most of your customers will visit on mobile. Every page loads fast and looks great on any screen size — Android or iPhone.",
    iconName: "Smartphone"
  },
  {
    title: "Loads in Under 2 Seconds",
    description: "Slow websites lose visitors. Ours load fast, keeping potential customers engaged and improving your ranking on Google.",
    iconName: "Zap"
  },
  {
    title: "Designed to Get You Customers",
    description: "Every element — from the contact button to the booking form — is positioned to turn a visitor into a lead or a walk-in.",
    iconName: "LineChart"
  },
  {
    title: "100% Custom, No Templates",
    description: "Your website is built from scratch, not assembled from a page-builder. It's yours to own, easy to update, and won't break down.",
    iconName: "Code"
  }
];

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹15,000",
    priceNote: "one-time",
    description: "A clean, professional landing page that puts your business on the map.",
    features: [
      "Single-page site (up to 5 sections)",
      "Mobile-friendly design",
      "Contact form with email delivery",
      "Google Maps embed",
      "Basic SEO setup",
      "2 revision rounds",
    ],
    highlight: false,
    cta: "Get started",
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹35,000",
    priceNote: "one-time",
    description: "A full website built to bring in more patients, diners, or members.",
    features: [
      "Multi-page site (up to 8 pages)",
      "Booking or inquiry system",
      "Premium animations & design",
      "Google Analytics setup",
      "Fast-loading, SEO-optimised build",
      "4 revision rounds",
      "1 month post-launch support",
    ],
    highlight: true,
    cta: "Get started",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹50,000",
    priceNote: "one-time",
    description: "A fully custom website — built to stand apart from every competitor.",
    features: [
      "Everything in Professional",
      "Unlimited pages",
      "Fully bespoke design",
      "Advanced animations & interactions",
      "Review at every stage of development",
      "6 revision rounds",
      "Lifetime support",
    ],
    highlight: false,
    cta: "Let's talk",
  },
];
