import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Package,
  PhilippinePeso,
  AlertTriangle,
  Search,
  PlusCircle,
} from "lucide-react";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { initialProducts } from "./data/products";

const money = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);

function Dashboard({
  products,
  onQuantityChange,
  onAddToCart,
  addedProductId,
}) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Total value of all available inventory.
  const totalInventoryValue = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const lowStockCount = products.filter(
    (product) => product.quantity <= 5,
  ).length;

  const totalUnits = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-9">
        <p className="text-sm font-bold text-indigo-200">
          YOUR INVENTORY AT A GLANCE
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Product Dashboard
            </h2>
            <p className="mt-2 max-w-lg text-indigo-100">
              Manage products, monitor stock, and keep track of inventory value.
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="text-sm text-indigo-100">Total Inventory Value</p>
            <p className="mt-1 text-2xl font-extrabold">
              {money(totalInventoryValue)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Products</p>
            <Package className="text-indigo-600" />
          </div>

          <p className="mt-3 text-3xl font-extrabold text-slate-900">
            {products.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">Different product types</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Available Units</p>
            <PhilippinePeso className="text-emerald-600" />
          </div>

          <p className="mt-3 text-3xl font-extrabold text-slate-900">
            {totalUnits}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Units currently in stock
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Low Stock Alerts</p>
            <AlertTriangle className="text-amber-500" />
          </div>

          <p className="mt-3 text-3xl font-extrabold text-slate-900">
            {lowStockCount}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Products with 5 or fewer units
          </p>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Product Catalog
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Browse products and manage available stock.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-64"
              />
            </div>

            <a
              href="/add-product"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700"
            >
              <PlusCircle size={18} />
              Add Product
            </a>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                category === item
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Package className="mx-auto text-slate-400" size={36} />

            <h3 className="mt-3 font-bold text-slate-800">No products found</h3>

            <p className="mt-1 text-sm text-slate-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuantityChange={onQuantityChange}
                onAddToCart={onAddToCart}
                addedProductId={addedProductId}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AppContent() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);

  // Total number of individual units in the cart.
  const cartCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  // Manually adjust available inventory.
  function handleQuantityChange(id, amount) {
    setProducts((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(0, product.quantity + amount),
            }
          : product,
      ),
    );
  }

  // Add one unit to the cart and deduct it from available stock.
  function handleAddToCart(product) {
    if (product.quantity <= 0) {
      alert("This product is out of stock.");
      return;
    }

    setProducts((previous) =>
      previous.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1,
    }));

    setAddedProductId(product.id);
    setIsCartAnimating(true);

    window.setTimeout(() => {
      setIsCartAnimating(false);
      setAddedProductId(null);
    }, 700);
  }

  // Change the quantity of an item inside the cart.
  function handleCartQuantityChange(id, amount) {
    const product = products.find((item) => String(item.id) === String(id));

    if (!product) return;

    const currentCartQuantity = cart[id] || 0;

    if (amount > 0 && product.quantity < amount) {
      alert("There is not enough stock available.");
      return;
    }

    const nextCartQuantity = currentCartQuantity + amount;

    if (nextCartQuantity < 0) return;

    // Increasing cart quantity decreases stock.
    // Decreasing cart quantity returns stock.
    setProducts((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - amount,
            }
          : item,
      ),
    );

    setCart((previous) => {
      const next = { ...previous };

      if (nextCartQuantity === 0) {
        delete next[id];
      } else {
        next[id] = nextCartQuantity;
      }

      return next;
    });
  }

  // Remove the entire product entry from the cart.
  function handleRemoveFromCart(id) {
    const quantityToReturn = cart[id] || 0;

    if (quantityToReturn === 0) return;

    setProducts((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + quantityToReturn,
            }
          : item,
      ),
    );

    setCart((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  }

  // Add a new product to the catalog.
  function handleAddProduct(newProduct) {
    setProducts((previous) => [...previous, newProduct]);
  }

  return (
    <>
      <Header cartCount={cartCount} isCartAnimating={isCartAnimating} />

      <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                products={products}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                addedProductId={addedProductId}
              />
            }
          />

          <Route
            path="/add-product"
            element={<ProductForm onAddProduct={handleAddProduct} />}
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                addedProductId={addedProductId}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                products={products}
                cart={cart}
                onCartQuantityChange={handleCartQuantityChange}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />

          <Route
            path="*"
            element={
              <div className="py-20 text-center">
                <h2 className="text-3xl font-extrabold">
                  404 — Page Not Found
                </h2>

                <a
                  href="/"
                  className="mt-4 inline-block font-semibold text-indigo-600"
                >
                  Return to Dashboard
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
        Stockly Product Management App · CCDI Pre-Final Project
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
