// Fallback data used if the backend API is unreachable, so the UI
// still renders something sensible during local development.

export const fallbackProducts = [
  { id: 1, name: "Woven Storage Basket", category: "Home & Living", subcategory: "Storage", price: 28.0, rating: 4.7, topSeller: true, image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=500", description: "Hand-woven seagrass basket, great for blankets or plants." },
  { id: 2, name: "Ceramic Pour-Over Set", category: "Kitchen", subcategory: "Tableware", price: 42.5, rating: 4.8, topSeller: true, image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=500", description: "Matte glaze ceramic dripper and carafe for slow coffee mornings." },
  { id: 3, name: "Organic Cotton Throw", category: "Home & Living", subcategory: "Textiles", price: 55.0, rating: 4.6, topSeller: true, image: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=500", description: "Undyed cotton throw, woven on low-impact looms." },
  { id: 4, name: "Bamboo Desk Organizer", category: "Office", subcategory: "Desk Accessories", price: 33.0, rating: 4.5, topSeller: true, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500", description: "Modular bamboo trays that keep a desk clear without clutter." },
  { id: 5, name: "Recycled Glass Vase", category: "Home & Living", subcategory: "Decor", price: 24.0, rating: 4.4, topSeller: false, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500", description: "Hand-blown from recycled glass, no two pieces are identical." },
  { id: 6, name: "Linen Apron", category: "Kitchen", subcategory: "Linens", price: 38.0, rating: 4.9, topSeller: false, image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500", description: "Heavyweight linen apron with a cross-back strap." },
  { id: 7, name: "Wooden Desk Lamp", category: "Office", subcategory: "Lighting", price: 64.0, rating: 4.6, topSeller: false, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500", description: "Ash wood base with a warm dimmable LED head." },
  { id: 8, name: "Terracotta Planter Trio", category: "Garden", subcategory: "Planters", price: 30.0, rating: 4.7, topSeller: false, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500", description: "Three nesting terracotta pots with drainage holes." },
  { id: 9, name: "Rattan Wall Mirror", category: "Home & Living", subcategory: "Decor", price: 46.0, rating: 4.5, topSeller: false, image: "https://picsum.photos/seed/rattan-mirror/500/500", description: "Round rattan-framed mirror that adds warmth to any wall." },
  { id: 10, name: "Linen Cushion Cover", category: "Home & Living", subcategory: "Textiles", price: 19.0, rating: 4.3, topSeller: false, image: "https://picsum.photos/seed/cushion-cover/500/500", description: "Stonewashed linen cushion cover with a hidden zip." },
  { id: 11, name: "Bamboo Cutting Board", category: "Kitchen", subcategory: "Cookware", price: 27.0, rating: 4.8, topSeller: false, image: "https://picsum.photos/seed/cutting-board/500/500", description: "End-grain bamboo board, gentle on knife edges." },
  { id: 12, name: "Stoneware Mixing Bowl Set", category: "Kitchen", subcategory: "Cookware", price: 48.0, rating: 4.6, topSeller: false, image: "https://picsum.photos/seed/mixing-bowls/500/500", description: "Set of three nesting stoneware bowls in matte glaze." },
  { id: 13, name: "Cork Notice Board", category: "Office", subcategory: "Desk Accessories", price: 22.0, rating: 4.2, topSeller: false, image: "https://picsum.photos/seed/notice-board/500/500", description: "Natural cork board with an oak frame for pinning notes." },
  { id: 14, name: "Hand Trowel Set", category: "Garden", subcategory: "Tools", price: 18.0, rating: 4.4, topSeller: false, image: "https://picsum.photos/seed/trowel-set/500/500", description: "Stainless steel trowel and fork with beech handles." },
  { id: 15, name: "Rattan Plant Stand", category: "Garden", subcategory: "Planters", price: 35.0, rating: 4.5, topSeller: false, image: "https://picsum.photos/seed/plant-stand/500/500", description: "Three-tier rattan stand for showing off a plant collection." }
];

export const fallbackCategories = [
  { id: "home-living", name: "Home & Living", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500" },
  { id: "kitchen", name: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500" },
  { id: "office", name: "Office", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500" },
  { id: "garden", name: "Garden", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500" }
];

export const fallbackComments = [
  { id: 1, name: "Priya S.", rating: 5, text: "The pour-over set is even nicer in person. Packaging was plastic-free too.", product: "Ceramic Pour-Over Set" },
  { id: 2, name: "Marcus L.", rating: 4, text: "Storage basket is sturdy and holds shape well even when full.", product: "Woven Storage Basket" },
  { id: 3, name: "Aisha K.", rating: 5, text: "Ordered the desk organizer for my home office, fits everything I need.", product: "Bamboo Desk Organizer" },
  { id: 4, name: "Tom R.", rating: 5, text: "Delivery was fast and the throw blanket is genuinely soft, not scratchy.", product: "Organic Cotton Throw" }
];
