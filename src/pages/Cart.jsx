import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  PackageCheck,
} from "lucide-react";

const money = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(value);

export default function Cart({
  products,
  cart,
  onCartQuantityChange,
  onRemoveFromCart,
}) {
  const navigate = useNavigate();

  const items = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((item) => String(item.id) === id);

      return product ? { product, quantity } : null;
    })
    .filter(Boolean);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const grandTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-slide-in">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          YOUR SHOPPING BAG
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
          Shopping Cart
        </h2>
        <p className="mt-2 text-slate-500">
          Review your products and check your total.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShoppingBag size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            Your cart is empty
          </h3>

          <p className="mt-2 text-slate-500">
            Find something you like and add it to your cart.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            <ShoppingBag size={18} />
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-28 w-full rounded-xl bg-slate-100 object-cover sm:w-32"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      "https://placehold.co/600x400?text=Product+Image";
                  }}
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase text-indigo-600">
                    {product.category}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {money(product.price)} each
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onCartQuantityChange(product.id, -1)}
                      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100"
                      aria-label={`Decrease ${product.name} cart quantity`}
                    >
                      <Minus size={15} />
                    </button>

                    <span className="min-w-5 text-center font-bold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => onCartQuantityChange(product.id, 1)}
                      disabled={product.quantity === 0}
                      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100 disabled:opacity-30"
                      aria-label={`Increase ${product.name} cart quantity`}
                    >
                      <Plus size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromCart(product.id)}
                      className="ml-1 flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="sm:min-w-36 sm:text-right">
                  <p className="text-xs text-slate-500">Subtotal</p>
                  <p className="mt-1 text-xl font-extrabold text-indigo-700">
                    {money(product.price * quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <PackageCheck size={24} />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Order Summary
                </h3>
                <p className="text-sm text-slate-500">
                  {totalQuantity} item(s) in your cart
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="text-slate-600">
                    {product.name} × {quantity}
                  </span>

                  <span className="font-semibold text-slate-900">
                    {money(product.price * quantity)}
                  </span>
                </div>
              ))}

              <div className="border-t border-dashed border-slate-200 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-bold text-slate-900">
                    Grand Total
                  </span>

                  <span className="text-2xl font-extrabold text-indigo-700">
                    {money(grandTotal)}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Automatically calculated using price × cart quantity.
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
