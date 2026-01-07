export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Amber Glow Table Lamp",
    description: "Warm pleated shade lamp with rich wooden base. Creates a cozy ambiance perfect for intimate settings.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
    category: "Classic",
    features: ["Pleated fabric shade", "Solid wood base", "Warm LED bulb", "Touch dimmer"],
    inStock: true
  },
  {
    id: "2",
    name: "Edison Vintage Desk Light",
    description: "Industrial-inspired desk lamp with exposed Edison bulb. Adds character to any workspace.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop",
    category: "Vintage",
    features: ["Edison bulb included", "Adjustable arm", "Brass finish", "Wooden base"],
    inStock: true
  },
  {
    id: "3",
    name: "Crystal Elegance Lamp",
    description: "Luxurious crystal table lamp that adds sophistication to bedrooms and living rooms.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=600&fit=crop",
    category: "Luxury",
    features: ["Crystal body", "Silk shade", "Chrome accents", "3-way switch"],
    inStock: true
  },
  {
    id: "4",
    name: "Bamboo Natural Light",
    description: "Eco-friendly bamboo lamp bringing natural warmth to your space. Sustainable and stylish.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&h=600&fit=crop",
    category: "Natural",
    features: ["Sustainable bamboo", "Linen shade", "Warm glow", "Eco-friendly"],
    inStock: true
  },
  {
    id: "5",
    name: "Smart Touch Lamp",
    description: "Modern smart lamp with touch controls and adjustable color temperature.",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&h=600&fit=crop",
    category: "Modern",
    features: ["Touch control", "Color temperature adjustment", "USB charging port", "Memory function"],
    inStock: true
  },
  {
    id: "6",
    name: "Art Deco Golden Lamp",
    description: "Stunning Art Deco inspired lamp with geometric patterns and golden finish.",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop",
    category: "Luxury",
    features: ["Gold finish", "Geometric design", "Glass shade", "Premium quality"],
    inStock: false
  },
  {
    id: "7",
    name: "Ceramic Artisan Lamp",
    description: "Handcrafted ceramic table lamp with unique glaze patterns. Each piece is one-of-a-kind.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop",
    category: "Artisan",
    features: ["Handcrafted", "Unique glaze", "Cotton shade", "Artisan quality"],
    inStock: true
  },
  {
    id: "8",
    name: "Industrial Pipe Lamp",
    description: "Rugged industrial design using authentic iron pipes. Perfect for loft-style interiors.",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1505051508008-923feaf90180?w=600&h=600&fit=crop",
    category: "Industrial",
    features: ["Iron pipes", "Vintage bulb", "Dimmer included", "Heavy duty base"],
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const categories = [...new Set(products.map(p => p.category))];
