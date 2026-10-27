import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const money = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);

export default function ProductCard({
  product,
  onQuantityChange,
  onAddToCart,
  addedProductId,
}) {
  const lowStock = product.quantity <= 5;
  const justAdded = addedProductId === product.id;

  return (
    <article className="animate-slide-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-slate-50 p-3 sm:h-72">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain object-center"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://placehold.co/600x400?text=Product+Image";
            }}
          />

          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              lowStock
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {product.quantity === 0
              ? "Out of Stock"
              : lowStock
                ? "Low Stock"
                : "In Stock"}
          </span>
        </div>
      </Link>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {product.category}
          </p>

          <Link to={`/product/${product.id}`}>
            <h3 className="mt-1 text-lg font-extrabold text-slate-900 hover:text-indigo-600">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 flex items-center gap-1 text-sm text-amber-500">
            <Star size={15} fill="currentColor" />
            {product.rating} / 5
          </p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-slate-500">Unit Price</p>
            <p className="text-lg font-extrabold text-slate-900">
              {money(product.price)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Stock Value</p>
            <p className="font-bold text-indigo-700">
              {money(product.price * product.quantity)}
            </p>
          </div>
        </div>

        {lowStock && (
          <p
            className={`flex items-center gap-2 rounded-lg p-2 text-xs font-semibold ${
              product.quantity === 0
                ? "bg-rose-50 text-rose-700"
                : "bg-amber-50 text-amber-800"
            }`}
          >
            <AlertTriangle size={15} />
            {product.quantity === 0
              ? "This product is out of stock."
              : `Only ${product.quantity} left in stock!`}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs text-slate-500">Available Stock</p>

            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onQuantityChange(product.id, -1)}
                disabled={product.quantity === 0}
                className="rounded-lg border border-slate-200 p-1.5 transition hover:bg-slate-100 disabled:opacity-30"
                aria-label={`Decrease ${product.name} stock`}
              >
                <Minus size={15} />
              </button>

              <span className="min-w-5 text-center font-bold">
                {product.quantity}
              </span>

              <button
                type="button"
                onClick={() => onQuantityChange(product.id, 1)}
                className="rounded-lg border border-slate-200 p-1.5 transition hover:bg-slate-100"
                aria-label={`Increase ${product.name} stock`}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
              justAdded
                ? "scale-105 bg-emerald-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {justAdded ? <CheckCircle size={16} /> : <ShoppingCart size={16} />}
            <span>{justAdded ? "Added!" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
