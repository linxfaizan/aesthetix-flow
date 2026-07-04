export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Orders", path: "/orders" },
  { label: "Profile", path: "/profile" },
]

export const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Products", path: "/admin/products" },
  { label: "Orders", path: "/admin/orders" },
  { label: "Users", path: "/admin/users" },
  { label: "Analytics", path: "/admin/analytics" },
]

export const categories = ["Outerwear", "Tailoring", "Knitwear", "Dresses", "Accessories", "Footwear"]

export const brandPartners = ["Aesthetx Flow", "Drop Studio", "Urban Luxe", "Flow Club", "Street Edit", "Premium Basics"]

export const products = [
  {
    id: "p-1001",
    name: "Cashmere Wrap Coat",
    category: "Outerwear",
    price: 780,
    originalPrice: 920,
    rating: 4.9,
    reviews: 128,
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=82",
    ],
    description: "Double-faced cashmere blend with a relaxed waist tie and hand-finished seams.",
    colors: ["Camel", "Ivory", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    stock: 12,
    tags: ["featured", "trending"],
  },
  {
    id: "p-1002",
    name: "Silk Column Dress",
    category: "Dresses",
    price: 540,
    rating: 4.8,
    reviews: 92,
    badge: "New",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=82",
    ],
    description: "Fluid silk satin dress cut on the bias with a refined neckline and soft drape.",
    colors: ["Champagne", "Ink", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    tags: ["featured"],
  },
  {
    id: "p-1003",
    name: "Merino Ribbed Set",
    category: "Knitwear",
    price: 360,
    rating: 4.7,
    reviews: 74,
    badge: "Low stock",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=82",
    ],
    description: "Fine merino pairing with a sculpted rib texture for day-to-evening ease.",
    colors: ["Oat", "Black", "Moss"],
    sizes: ["S", "M", "L"],
    stock: 5,
    tags: ["trending"],
  },
  {
    id: "p-1004",
    name: "Tuxedo Blazer",
    category: "Tailoring",
    price: 690,
    rating: 4.9,
    reviews: 111,
    badge: "Best seller",
    image: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=1000&q=82",
    ],
    description: "Structured wool blazer with satin lapels, covered buttons, and a precise shoulder.",
    colors: ["Black", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 22,
    tags: ["featured", "trending"],
  },
  {
    id: "p-1005",
    name: "Leather Mini Tote",
    category: "Accessories",
    price: 430,
    rating: 4.6,
    reviews: 58,
    badge: "Editorial",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=1000&q=82",
    ],
    description: "Italian leather tote with brushed hardware, detachable strap, and suede lining.",
    colors: ["Espresso", "Cream", "Black"],
    sizes: ["One size"],
    stock: 15,
    tags: ["featured"],
  },
  {
    id: "p-1006",
    name: "Sculpted Mule Heel",
    category: "Footwear",
    price: 390,
    rating: 4.5,
    reviews: 49,
    badge: "Runway",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=82",
    gallery: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=82",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1000&q=82",
    ],
    description: "Polished nappa mule with a curved heel, cushioned footbed, and pointed toe.",
    colors: ["Black", "Bone", "Bordeaux"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: 20,
    tags: ["trending"],
  },
]

export const testimonials = [
  {
    name: "Amelia Hart",
    role: "Creative director",
    quote: "The edit feels intentional, tactile, and quietly confident. Everything arrives beautifully.",
  },
  {
    name: "Nora Ellison",
    role: "Stylist",
    quote: "The tailoring is exceptional. These are pieces clients keep reaching for season after season.",
  },
  {
    name: "Claire Monroe",
    role: "Founder",
    quote: "Premium without feeling loud. The shopping flow is calm, fast, and very considered.",
  },
]

export const orders = [
  {
    id: "ORD-9042",
    date: "2026-06-22",
    status: "In transit",
    total: 1170,
    items: ["Cashmere Wrap Coat", "Leather Mini Tote"],
    tracking: ["Confirmed", "Prepared", "In transit", "Delivered"],
  },
  {
    id: "ORD-8977",
    date: "2026-05-11",
    status: "Delivered",
    total: 540,
    items: ["Silk Column Dress"],
    tracking: ["Confirmed", "Prepared", "In transit", "Delivered"],
  },
]

export const users = [
  { id: "u-1", name: "Amelia Hart", email: "amelia@example.com", role: "Customer", status: "Active", spend: 2410 },
  { id: "u-2", name: "Marcus Vale", email: "marcus@example.com", role: "Admin", status: "Active", spend: 0 },
  { id: "u-3", name: "Claire Monroe", email: "claire@example.com", role: "Customer", status: "Blocked", spend: 880 },
]

export const revenueData = [
  { month: "Jan", revenue: 42000, orders: 210 },
  { month: "Feb", revenue: 51000, orders: 248 },
  { month: "Mar", revenue: 47000, orders: 232 },
  { month: "Apr", revenue: 63000, orders: 302 },
  { month: "May", revenue: 76000, orders: 351 },
  { month: "Jun", revenue: 84000, orders: 388 },
]
