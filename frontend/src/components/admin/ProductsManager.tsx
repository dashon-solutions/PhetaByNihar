import React, { useState, useEffect } from 'react';
import { apiFetch, getApiImageUrl } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Edit2, Trash2, Save, X, Search, Package, Sparkles } from 'lucide-react';

interface ProductItem {
  _id?: string;
  id: string; // e.g. "01", "02"
  name: string;
  marathiName?: string;
  subtitle: string;
  image: string;
  galleryImages?: string[];
  description: string;
  information?: string;
}

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState<ProductItem>({
    id: '',
    name: '',
    marathiName: '',
    subtitle: '',
    image: '',
    galleryImages: [],
    description: '',
    information: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/products');
      if (data) {
        setProducts(data);
      }
    } catch (err: any) {
      setError('Failed to fetch products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    const nextIdx = (products.length + 1).toString().padStart(2, '0');
    setForm({
      id: nextIdx,
      name: '',
      marathiName: '',
      subtitle: '',
      image: '',
      galleryImages: [],
      description: '',
      information: ''
    });
    setEditingId(null);
    setError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item: ProductItem) => {
    setForm({
      id: item.id,
      name: item.name,
      marathiName: item.marathiName || '',
      subtitle: item.subtitle,
      image: item.image,
      galleryImages: item.galleryImages || [],
      description: item.description,
      information: item.information || ''
    });
    setEditingId(item._id || null);
    setError('');
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setError('');

    try {
      await apiFetch(`/products/${id}`, {
        method: 'DELETE'
      });
      setProducts(prev => prev.filter(item => item._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.subtitle || !form.image || !form.description) {
      setError('Please fill in all required fields (ID, Name, Subtitle, Cover Image, Description)');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        const updated = await apiFetch(`/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setProducts(prev => prev.map(item => item._id === editingId ? updated : item).sort((a,b) => a.id.localeCompare(b.id)));
      } else {
        const created = await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setProducts(prev => [...prev, created].sort((a,b) => a.id.localeCompare(b.id)));
      }
      setFormOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      (p.marathiName && p.marathiName.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-[#E8D8C5]">
        <div className="w-8 h-8 border-3 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header card */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8D8C5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#D7A65B]" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4D2D22]">
              Exclusive Collection & Rentals
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#666666] mt-0.5">
            Manage showcase products, miniature phetas, jewelry & royal accessories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-[#7D201D] active:scale-[0.98] transition-all cursor-pointer border border-[#8A2B24]"
        >
          <Plus className="w-4 h-4 text-[#D7A65B]" />
          <span>Add Product</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
          {error}
        </div>
      )}

      {/* Search Bar */}
      {!formOpen && (
        <div className="relative">
          <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name, Marathi name, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8D8C5] rounded-xl text-xs sm:text-sm text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
          />
        </div>
      )}

      {/* Form or Product Cards */}
      {formOpen ? (
        <div className="bg-white border border-[#E8D8C5] rounded-2xl p-4 sm:p-6 shadow-xs">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#E8D8C5]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D7A65B]" />
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#4D2D22]">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="p-1.5 rounded-lg text-[#666666] hover:bg-[#F8F3EC] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* ID Badge */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Order Index (e.g. 01) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.id}
                  onChange={(e) => setForm(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="01"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
                />
              </div>

              {/* Product Name */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Product Name (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Miniature Royal Pheta"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Marathi Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Marathi Name (Optional)
                </label>
                <input
                  type="text"
                  value={form.marathiName}
                  onChange={(e) => setForm(prev => ({ ...prev, marathiName: e.target.value }))}
                  placeholder="e.g. लहान फेटा"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
                />
              </div>

              {/* Subtitle */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Category / Subtitle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.subtitle}
                  onChange={(e) => setForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="e.g. Decorative Heritage Artifact"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Showcase Summary Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Brief summary of the artifact or rental prop..."
                className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
              />
            </div>

            {/* Information */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Detailed Product Page Specifications
              </label>
              <textarea
                value={form.information || ''}
                onChange={(e) => setForm(prev => ({ ...prev, information: e.target.value }))}
                rows={4}
                placeholder="Full specs, dimensions, material, rental terms..."
                className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
              />
            </div>

            {/* Cover Image */}
            <ImageUploadField
              label="Cover Image (Showcase)"
              value={form.image}
              onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
            />

            {/* Gallery Images */}
            <div className="flex flex-col gap-2 border-t border-[#E8D8C5] pt-3">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Additional Gallery Photos (Product Page)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(form.galleryImages || []).map((imgUrl, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#E8D8C5] aspect-square bg-[#F8F3EC]">
                    <img src={getApiImageUrl(imgUrl)} alt="Gallery item" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, galleryImages: (prev.galleryImages || []).filter((_, i) => i !== idx) }))}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-xs hover:bg-red-700 cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <ImageUploadField
                label="Add Another Photo to Gallery"
                value=""
                onChange={(url) => setForm(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), url] }))}
                multiple={true}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#E8D8C5]">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 border border-[#E8D8C5] rounded-full text-xs font-sans font-bold uppercase tracking-wider text-[#666666] hover:bg-[#F8F3EC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-6 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-[#7D201D] cursor-pointer"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <Save className="w-3.5 h-3.5 text-[#D7A65B]" />
                )}
                <span>{editingId ? 'Save Changes' : 'Create Product'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Products List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-[#E8D8C5] rounded-2xl p-3 sm:p-4 hover:border-[#D7A65B] transition-all shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#F8F3EC] border border-[#E8D8C5] shrink-0">
                  {item.image ? (
                    <img src={getApiImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-6 h-6 text-[#999999] m-auto mt-4" />
                  )}
                  <span className="absolute top-0 left-0 bg-[#6E1E18] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg">
                    #{item.id}
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-[#4D2D22] text-sm sm:text-base truncate">
                    {item.name}
                  </h4>
                  {item.marathiName && (
                    <span className="text-xs text-[#6E1E18] font-bold block -mt-0.5">
                      {item.marathiName}
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C48B3C] block truncate">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 bg-[#F8F3EC] hover:bg-[#E8D8C5] text-[#4D2D22] rounded-xl border border-[#E8D8C5] transition-colors cursor-pointer"
                  title="Edit Product"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#C48B3C]" />
                </button>
                <button
                  onClick={() => handleDelete(item._id || '')}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-colors cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-[#E8D8C5]">
              <Package className="w-10 h-10 text-[#D7A65B] opacity-50 mx-auto mb-2" />
              <p className="font-sans text-xs sm:text-sm text-[#666666]">
                {searchQuery ? 'No products match your search query.' : 'No products found. Click "Add Product" above to create one.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
