import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface ProductItem {
  _id?: string;
  id: string; // e.g. "01", "02"
  name: string;
  subtitle: string;
  image: string;
  description: string;
}

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<ProductItem>({
    id: '',
    name: '',
    subtitle: '',
    image: '',
    description: ''
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
    // Generate default index id string
    const nextIdx = (products.length + 1).toString().padStart(2, '0');
    setForm({
      id: nextIdx,
      name: '',
      subtitle: '',
      image: '',
      description: ''
    });
    setEditingId(null);
    setError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item: ProductItem) => {
    setForm({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      image: item.image,
      description: item.description
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
      setError('Please fill in all fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        // Edit Mode
        const updated = await apiFetch(`/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setProducts(prev => prev.map(item => item._id === editingId ? updated : item).sort((a,b) => a.id.localeCompare(b.id)));
      } else {
        // Add Mode
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

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-8 h-8 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFB] rounded-2xl border border-[#E8D8C5] p-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#4D2D22]">Manage Exclusive Collection</h3>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Add or edit product listings displayed in the Showcase carousel sections.
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 text-[#D7A65B]" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
          {error}
        </div>
      )}

      {/* Form or List */}
      {formOpen ? (
        <form onSubmit={handleSubmit} className="border border-[#E8D8C5] rounded-xl p-5 bg-[#F8F3EC]/40 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#E8D8C5]">
            <h4 className="font-serif text-lg font-bold text-[#4D2D22]">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h4>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="text-[#666666] hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ID Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Index / Order ID (e.g. 01)
              </label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => setForm(prev => ({ ...prev, id: e.target.value }))}
                placeholder="01"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Product Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Miniature Pheta"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Subtitle / Category
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="e.g. Decorative Heritage Artifact"
              className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Showcase Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Describe details of the prop, history, rental specs..."
              className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>

          {/* Image */}
          <ImageUploadField
            label="Product Showcase Image"
            value={form.image}
            onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-[#E8D8C5]">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2 border border-[#E8D8C5] rounded-lg text-xs font-sans font-bold uppercase tracking-wider text-[#666666] hover:bg-[#F8F3EC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-6 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D]"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <Save className="w-4 h-4 text-[#D7A65B]" />
              )}
              <span>{editingId ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl group hover:border-[#D7A65B] transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-sm font-bold bg-[#6E1E18] text-[#FFFDFB] border border-[#D4AF37]/35 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  {item.id}
                </span>
                
                <div>
                  <h4 className="font-serif font-bold text-[#4D2D22] text-base">
                    {item.name} <span className="font-sans text-[10px] uppercase font-bold text-[#C48B3C] ml-2">({item.subtitle})</span>
                  </h4>
                  <p className="font-sans text-xs text-[#666666] line-clamp-1 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-[#E8D8C5] text-[10px] font-sans font-bold uppercase tracking-wider text-[#4D2D22] hover:bg-[#E8D8C5] rounded"
                >
                  <Edit2 className="w-3 h-3 text-[#C48B3C]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item._id || '')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-red-200 text-[10px] font-sans font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-center py-10 font-sans text-sm text-[#999999]">
              No items found. Click Add Product to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
