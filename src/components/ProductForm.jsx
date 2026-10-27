import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";

const emptyForm = {
  image: "",
  name: "",
  category: "",
  description: "",
  specification: "",
  rating: "",
  price: "",
  quantity: "",
};

const fields = [
  { name: "name", label: "Product Name", placeholder: "e.g. Gaming Mouse" },
  { name: "category", label: "Category", placeholder: "e.g. Accessories" },
  { name: "description", label: "Description", multiline: true },
  { name: "specification", label: "Specifications", multiline: true },
  { name: "rating", label: "Rating (0–5)", type: "number" },
  { name: "price", label: "Price (PHP)", type: "number" },
  { name: "quantity", label: "Initial Stock", type: "number" },
];

export default function ProductForm({ onAddProduct }) {
  const [form, setForm] = useState(emptyForm);
  const [imageName, setImageName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("The image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        image: reader.result,
      }));

      setImageName(file.name);
      setError("");
    };

    reader.onerror = () => {
      setError("Could not read the image. Please try another file.");
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const missingField = fields.some(
      (field) => !String(form[field.name]).trim(),
    );

    if (missingField || !form.image) {
      setError("Please fill in all fields and select a product image.");
      return;
    }

    const rating = Number(form.rating);
    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5 ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isFinite(quantity) ||
      quantity < 0 ||
      !Number.isInteger(quantity)
    ) {
      setError(
        "Rating must be 0–5, price must be non-negative, and stock must be a whole number of 0 or more.",
      );
      return;
    }

    onAddProduct({
      ...form,
      id: crypto.randomUUID(),
      rating,
      price,
      quantity,
    });

    setForm(emptyForm);
    setImageName("");
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-5 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          Inventory Management
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
          Add New Product
        </h2>
        <p className="mt-2 text-slate-500">
          Enter the product information and choose a photo from your laptop.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Product Feature Image *
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50">
            {form.image ? (
              <img
                src={form.image}
                alt="Selected product preview"
                className="mb-4 h-48 w-full rounded-xl object-contain"
              />
            ) : (
              <ImagePlus size={36} className="mb-3 text-indigo-600" />
            )}

            <span className="font-bold text-slate-800">
              {imageName || "Choose an image from your laptop"}
            </span>
            <span className="mt-1 text-xs text-slate-500">
              JPG, PNG, or WebP · Maximum 5 MB
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.multiline ? "sm:col-span-2" : ""}
            >
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                {field.label} *
              </label>

              {field.multiline ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder={
                    field.name === "description"
                      ? "Describe your product..."
                      : "Materials, color, features..."
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  min={
                    field.name === "rating"
                      ? 0
                      : field.type === "number"
                        ? 0
                        : undefined
                  }
                  max={field.name === "rating" ? 5 : undefined}
                  step={
                    field.name === "rating"
                      ? 0.1
                      : field.name === "price"
                        ? 0.01
                        : field.name === "quantity"
                          ? 1
                          : undefined
                  }
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          <Save size={18} />
          Save Product
        </button>
      </form>
    </div>
  );
}
