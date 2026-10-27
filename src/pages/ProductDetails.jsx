import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  AlertTriangle,
  Plus,
  Minus,
} from "lucide-react";

const money = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);

export default function ProductDetails({
  products,
  onQuantityChange,
  onAddToCart,
  addedProductId,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-extrabold">Product Not Found</h2>
        <p className="my-3 text-slate-500">This product does not exist.</p>
        <Link to="/" className="font-semibold text-indigo-600">
          Return to Products
        </Link>
      </div>
    );
  }

  const lowStock = product.quantity <= 5;

  return (
    <div className="animate-slide-in">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft size={18} />
        Go Back
      </button>

      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">
        {/* Product Image */}
        <div className="flex min-h-72 items-center justify-center bg-slate-50 p-6 md:min-h-[520px]">
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-contain object-center md:h-[440px]"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src =
                "https://placehold.co/600x400?text=Product+Image";
            }}
          />
        </div>

        {/* Product Information */}
        <div className="space-y-5 p-6 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            {product.category}
          </p>

          <h2 className="text-3xl font-extrabold text-slate-900">
            {product.name}
          </h2>

          <p className="flex items-center gap-2 text-amber-500">
            <Star size={18} fill="currentColor" />
            {product.rating} / 5
          </p>

          <p className="text-3xl font-extrabold text-indigo-700">
            {money(product.price)}
          </p>

          <div>
            <h3 className="font-bold text-slate-900">Product Description</h3>
            <p className="mt-2 leading-7 text-slate-600">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900">Specifications</h3>
            <p className="mt-2 leading-7 text-slate-600">
              {product.specification}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 rounded-xl p-3 text-sm font-semibold ${
              product.quantity === 0
                ? "bg-rose-50 text-rose-700"
                : lowStock
                  ? "bg-amber-50 text-amber-800"
                  : "bg-emerald-50 text-emerald-800"
            }`}
          >
            {lowStock && <AlertTriangle size={17} />}
            Available stock: {product.quantity}
            {product.quantity === 0
              ? " — Out of Stock"
              : lowStock
                ? " — Low Stock"
                : " — In Stock"}
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total value of available stock
            </p>
            <p className="text-xl font-extrabold text-slate-900">
              {money(product.price * product.quantity)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onQuantityChange(product.id, -1)}
              disabled={product.quantity === 0}
              className="rounded-xl border p-3 transition hover:bg-slate-100 disabled:opacity-30"
              aria-label="Decrease available stock"
            >
              <Minus size={17} />
            </button>

            <span className="font-extrabold">{product.quantity}</span>

            <button
              type="button"
              onClick={() => onQuantityChange(product.id, 1)}
              className="rounded-xl border p-3 transition hover:bg-slate-100"
              aria-label="Increase available stock"
            >
              <Plus size={17} />
            </button>

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              disabled={product.quantity === 0}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition disabled:bg-slate-300 ${
                addedProductId === product.id
                  ? "bg-emerald-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <ShoppingCart size={18} />
              {addedProductId === product.id ? "Added to Cart!" : "Add to Cart"}
            </button>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
