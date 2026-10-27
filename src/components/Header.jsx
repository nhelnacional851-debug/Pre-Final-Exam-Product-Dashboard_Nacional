import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, LayoutDashboard, PlusCircle } from "lucide-react";

export default function Header({ cartCount, isCartAnimating }) {
  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-600 p-2.5 text-white shadow-md shadow-indigo-200">
            <ShoppingBag size={23} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
              Stockly
            </h1>
            <p className="text-xs text-slate-500">Product Management</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            <LayoutDashboard size={17} />
            <span className="hidden sm:inline">Products</span>
          </NavLink>

          <NavLink to="/add-product" className={navClass}>
            <PlusCircle size={17} />
            <span className="hidden sm:inline">Add Product</span>
          </NavLink>

          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className={`relative ml-1 rounded-xl bg-indigo-600 p-3 text-white transition hover:bg-indigo-700 ${
              isCartAnimating ? "cart-pop" : ""
            }`}
          >
            <ShoppingBag size={20} />

            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-extrabold text-slate-900">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
