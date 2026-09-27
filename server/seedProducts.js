const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Premium Basmati Rice",
    description:
      "Long-grain basmati rice suitable for everyday meals and special occasions.",
    price: 249,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    category: "Groceries",
    stock: 50,
  },
  {
    name: "Organic Wheat Flour",
    description:
      "Freshly packed whole wheat flour for soft and nutritious homemade rotis.",
    price: 189,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    category: "Groceries",
    stock: 40,
  },
  {
    name: "Fresh Orange Juice",
    description:
      "Refreshing orange juice made from carefully selected oranges.",
    price: 120,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    category: "Beverages",
    stock: 30,
  },
  {
    name: "Classic Potato Chips",
    description: "Crispy and crunchy potato chips perfect for snack time.",
    price: 50,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b",
    category: "Snacks",
    stock: 75,
  },
  {
    name: "Dark Chocolate",
    description:
      "Rich dark chocolate made with carefully selected cocoa for a smooth and indulgent treat.",
    price: 110,
    image: "/products/dark-chocolate.jpg",
    category: "Snacks",
    stock: 35,
  },
  {
    name: "Premium Green Tea",
    description:
      "A refreshing green tea blend for a relaxing cup at any time of day.",
    price: 175,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
    category: "Beverages",
    stock: 25,
  },
  {
    name: "Liquid Dish Wash",
    description:
      "Powerful dish cleaning liquid designed to remove grease and food residue.",
    price: 145,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
    category: "Household",
    stock: 45,
  },
  {
    name: "Cotton Hand Towels",
    description:
      "Soft and absorbent cotton hand towels suitable for everyday household use.",
    price: 199,
    image: "/products/hand-towels.jpg",
    category: "Household",
    stock: 20,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error.message);

    process.exit(1);
  }
};

seedProducts();
