import headphonesImage from "../assets/headphones.png";
import smartwatchImage from "../assets/smartwatch.png";
import backpackImage from "../assets/backpack.png";

export const initialProducts = [
  {
    id: "product-1",
    name: "Wireless Headphones",
    category: "Accessories",
    price: 1299,
    quantity: 12,
    rating: 4.8,
    image: headphonesImage,
    description:
      "Enjoy your favorite music with these stylish wireless headphones. They are suitable for everyday listening and entertainment.",
    specification:
      "Bluetooth connectivity, rechargeable battery, over-ear design",
  },
  {
    id: "product-2",
    name: "Smart Watch",
    category: "Gadgets",
    price: 1899,
    quantity: 3,
    rating: 4.6,
    image: smartwatchImage,
    description:
      "A modern smartwatch for everyday activities, time management, and personal convenience.",
    specification: "Digital display, activity tracking, rechargeable battery",
  },
  {
    id: "product-3",
    name: "Laptop Backpack",
    category: "Accessories",
    price: 899,
    quantity: 8,
    rating: 4.5,
    image: backpackImage,
    description:
      "A practical backpack for carrying school supplies, personal belongings, and laptops.",
    specification:
      "Multiple compartments, padded laptop section, adjustable straps",
  },
];
