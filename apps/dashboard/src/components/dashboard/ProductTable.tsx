"use client";

import { useEffect, useState, memo, useCallback } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  subscribeToProducts,
  subscribeToCategories,
  updateProduct,
} from "@wafflella/firebase";
import type { Product, Category } from "@wafflella/types";
import { motion } from "framer-motion";
import { Search, X, Pencil, Eye, EyeOff, Package } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Edit Product Modal ────────────────────────────────────────────────────────

function EditProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(product.name);
  const [nameAr, setNameAr] = useState(product.nameAr || "");
  const [price, setPrice] = useState(String(product.price));
  const [description, setDescription] = useState(product.description || "");
  const [descriptionAr, setDescriptionAr] = useState(product.descriptionAr || "");

  const mutation = useMutation({
    mutationFn: (data: Partial<Product>) => updateProduct(product.id, data),
    onMutate: async (data) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["products"] });
      // Snapshot previous value
      const previous = queryClient.getQueryData<Product[]>(["products"]);
      // Optimistically update the cache immediately
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) => (p.id === product.id ? { ...p, ...data } : p))
      );
      return { previous };
    },
    onSuccess: () => {
      toast.success(`"${product.name}" updated successfully`);
      onClose();
    },
    onError: (_err, _data, context) => {
      // Roll back on error
      if (context?.previous) {
        queryClient.setQueryData(["products"], context.previous);
      }
      toast.error("Failed to update product details");
    },
  });

  const save = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!name.trim()) { toast.error("English name is required"); return; }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) { toast.error("Valid price is required"); return; }
    const data: Partial<Product> = {
      name: name.trim(),
      price: parsedPrice,
      description: description.trim(),
    };
    if (nameAr.trim()) data.nameAr = nameAr.trim();
    if (descriptionAr.trim()) data.descriptionAr = descriptionAr.trim();
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">Edit Product Details</h3>
            <p className="text-xs text-gray-400 mt-0.5">Changes appear on the website instantly</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={save} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name (English)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                placeholder="e.g. Waffle Chocolate"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name (Arabic)</label>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-right"
                placeholder="e.g. وافل شوكليت"
                dir="rtl"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description (English)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                placeholder="e.g. 24 waffle pieces with chocolate sauce"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description (Arabic)
              </label>
              <textarea
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none text-right"
                placeholder="e.g. 24 قطعة وافل بصوص شوكولاتة"
                dir="rtl"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (EGP)</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              placeholder="e.g. 35"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl transition-colors shadow-soft"
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Memoized Product Row ──────────────────────────────────────────────────────

const ProductRow = memo(({ 
  product, 
  onEdit, 
  onToggle 
}: { 
  product: Product; 
  onEdit: (product: Product) => void; 
  onToggle: (id: string, available: boolean) => void;
}) => {
  return (
    <tr
      className={cn(
        "hover:bg-gray-50/60 transition-colors duration-100",
        !product.available && "opacity-50"
      )}
    >
      {/* Name EN */}
      <td className="pl-5 pr-2 py-3.5">
        <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">{product.name}</span>
      </td>

      {/* Name AR */}
      <td className="px-2 py-3.5 text-left" dir="rtl">
        <span className="text-gray-500 text-sm whitespace-nowrap">{product.nameAr || "—"}</span>
      </td>

      {/* Desc EN */}
      <td className="px-2 py-3.5 hidden xl:table-cell max-w-[200px]">
        {product.description
          ? <span className="text-gray-600 text-sm leading-relaxed line-clamp-2 block">{product.description}</span>
          : <span className="italic text-gray-300 text-xs">No description</span>
        }
      </td>

      {/* Desc AR */}
      <td className="px-2 py-3.5 hidden xl:table-cell max-w-[200px]" dir="rtl">
        {product.descriptionAr
          ? <span className="text-gray-600 text-sm leading-relaxed line-clamp-2 block">{product.descriptionAr}</span>
          : <span className="italic text-gray-300 text-xs">لا يوجد وصف</span>
        }
      </td>

      {/* Price */}
      <td className="px-5 py-3.5">
        <span className="font-bold text-gray-900 text-sm">{product.price}</span>
        <span className="text-xs text-gray-400 ml-1">EGP</span>
      </td>

      {/* Toggle available */}
      <td className="px-5 py-3.5 hidden sm:table-cell">
        <button
          onClick={() => onToggle(product.id, !product.available)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200",
            product.available
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          )}
          aria-label={`Toggle availability for ${product.name}`}
        >
          {product.available ? <Eye size={12} /> : <EyeOff size={12} />}
          {product.available ? "On Menu" : "Hidden"}
        </button>
      </td>

      {/* Edit Actions */}
      <td className="px-5 py-3.5 text-right">
        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-brand-primary hover:text-white transition-colors duration-200"
          aria-label={`Edit ${product.name} details`}
        >
          <Pencil size={12} />
          Edit
        </button>
      </td>
    </tr>
  );
});
ProductRow.displayName = "ProductRow";

// ─── Products Price Table ──────────────────────────────────────────────────────

export function ProductTable() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Real-time Firestore subscriptions
  useEffect(() => {
    const unsub1 = subscribeToProducts((products) => {
      queryClient.setQueryData<Product[]>(["products"], products);
    });
    const unsub2 = subscribeToCategories((cats) => {
      queryClient.setQueryData<Category[]>(["categories"], cats);
    });
    return () => { unsub1(); unsub2(); };
  }, [queryClient]);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => [],
    staleTime: Infinity,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => [],
    staleTime: Infinity,
  });

  // Toggle availability mutation
  const toggleMutation = useMutation({
    mutationFn: ({ id, available }: { id: string; available: boolean }) =>
      updateProduct(id, { available }),
    onSuccess: () => toast.success("Availability updated"),
    onError: () => toast.error("Update failed"),
  });

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? id;

  const handleToggle = useCallback((id: string, available: boolean) => {
    toggleMutation.mutate({ id, available });
  }, [toggleMutation]);

  const filtered = products
    .filter((p) => {
      const matchSearch =
        !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !filterCategory || p.categoryId === filterCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => a.categoryId.localeCompare(b.categoryId) || a.name.localeCompare(b.name));

  // Group by category
  const grouped = categories.reduce<Record<string, Product[]>>((acc, cat) => {
    const items = filtered.filter((p) => p.categoryId === cat.id);
    if (items.length > 0) acc[cat.id] = items;
    return acc;
  }, {});

  // Handle uncategorised
  const categorisedIds = new Set(categories.map((c) => c.id));
  const uncategorised = filtered.filter((p) => !categorisedIds.has(p.categoryId));
  if (uncategorised.length > 0) grouped["other"] = uncategorised;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Price Manager</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Click any price to edit it. Changes appear on the website instantly.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-brand-primary-light text-brand-primary px-4 py-2 rounded-xl text-sm font-semibold">
          <span>{products.length} products</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="products-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            aria-label="Search products"
          />
        </div>
        <div className="relative min-w-[160px]">
          <select
            id="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white cursor-pointer"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <Package size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No products found</p>
          <p className="text-gray-400 text-sm mt-1">Run the seed script to add products</p>
        </div>
      )}

      {/* Grouped tables */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([catId, items], gi) => (
          <motion.div
            key={catId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: gi * 0.07 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card"
          >
            {/* Category header */}
            <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800 text-sm">
                {getCategoryName(catId)}
              </h2>
              <span className="text-xs text-gray-400">{items.length} items</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full" role="table" aria-label={`${getCategoryName(catId)} products`}>
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left pl-5 pr-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name (EN)</th>
                    <th className="text-left px-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name (AR)</th>
                    <th className="text-left px-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden xl:table-cell">Desc (EN)</th>
                    <th className="text-left px-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden xl:table-cell">Desc (AR)</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      onEdit={setEditingProduct}
                      onToggle={handleToggle}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-gray-400 text-center mt-6">
          💡 Click the Edit button to update product names and prices.
        </p>
      )}

      {/* Modals */}
      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
        />
      )}
    </>
  );
}
