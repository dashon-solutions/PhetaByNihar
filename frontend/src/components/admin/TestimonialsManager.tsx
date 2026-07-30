import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';

interface TestimonialItem {
  _id?: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
  image: string;
}

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<TestimonialItem>({
    quote: '',
    name: '',
    location: '',
    rating: 5,
    image: ''
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/testimonials');
      if (data) {
        setTestimonials(data);
      }
    } catch (err: any) {
      setError('Failed to fetch testimonials: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setForm({
      quote: '',
      name: '',
      location: '',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=Guest&background=4D1217&color=D4AF37'
    });
    setEditingId(null);
    setError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setForm({
      quote: item.quote,
      name: item.name,
      location: item.location,
      rating: item.rating,
      image: item.image
    });
    setEditingId(item._id || null);
    setError('');
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    setError('');

    try {
      await apiFetch(`/testimonials/${id}`, {
        method: 'DELETE'
      });
      setTestimonials(prev => prev.filter(item => item._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete testimonial');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.quote || !form.name || !form.location || !form.image) {
      setError('Please fill in all fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        const updated = await apiFetch(`/testimonials/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setTestimonials(prev => prev.map(item => item._id === editingId ? updated : item));
      } else {
        const created = await apiFetch('/testimonials', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setTestimonials(prev => [...prev, created]);
      }
      setFormOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  if (loading && testimonials.length === 0) {
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
          <h3 className="font-serif text-2xl font-bold text-[#4D2D22]">Manage Testimonials</h3>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Add or update royal appreciation client reviews showcased on the landing page.
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 text-[#D7A65B]" />
            <span>Add Testimonial</span>
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
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
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
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Client Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(prev => {
                  const val = e.target.value;
                  // Auto generate avatar if profile pic is blank
                  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(val || 'Guest')}&background=4D1217&color=D4AF37`;
                  return {
                    ...prev,
                    name: val,
                    image: prev.image.includes('ui-avatars.com') ? avatarUrl : prev.image
                  };
                })}
                placeholder="e.g. Radhika Deshmukh"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Pune, India"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Appreciation Rating
              </label>
              <select
                value={form.rating}
                onChange={(e) => setForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="px-4 py-2.5 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quote */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Patron Words / Review Quote
            </label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm(prev => ({ ...prev, quote: e.target.value }))}
              rows={4}
              placeholder="Enter client review paragraph..."
              className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>

          {/* Image */}
          <ImageUploadField
            label="Client Avatar Photo (Automatically generated if left blank)"
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
              <span>{editingId ? 'Save Changes' : 'Create Testimonial'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between md:items-center p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl group hover:border-[#D7A65B] gap-4 transition-colors"
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E8D8C5] shrink-0 bg-white"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-[#4D2D22] text-sm">{item.name}</h4>
                    <span className="text-[10px] text-text-light font-sans">({item.location})</span>
                  </div>
                  
                  {/* Stars list */}
                  <div className="flex items-center gap-0.5 my-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C48B3C] text-[#C48B3C]" />
                    ))}
                  </div>

                  <p className="font-sans italic text-xs text-[#666666] line-clamp-2 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              <div className="flex gap-2 shrink-0 md:self-center justify-end border-t md:border-t-0 border-[#E8D8C5]/60 pt-3 md:pt-0">
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
          {testimonials.length === 0 && (
            <div className="text-center py-10 font-sans text-sm text-[#999999]">
              No testimonials found. Click Add Testimonial to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
