import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Edit2, Trash2, Save, X, Crown, Tent, Briefcase, GraduationCap, Star, Shield, Heart, Award } from 'lucide-react';

interface ServiceItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const AVAILABLE_ICONS = [
  { name: 'Crown', icon: <Crown className="w-4 h-4" /> },
  { name: 'Tent', icon: <Tent className="w-4 h-4" /> },
  { name: 'Briefcase', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'GraduationCap', icon: <GraduationCap className="w-4 h-4" /> },
  { name: 'Star', icon: <Star className="w-4 h-4" /> },
  { name: 'Shield', icon: <Shield className="w-4 h-4" /> },
  { name: 'Heart', icon: <Heart className="w-4 h-4" /> },
  { name: 'Award', icon: <Award className="w-4 h-4" /> }
];

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<ServiceItem>({
    title: '',
    description: '',
    image: '',
    icon: 'Crown'
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/services');
      if (data) {
        setServices(data);
      }
    } catch (err: any) {
      setError('Failed to fetch services: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setForm({
      title: '',
      description: '',
      image: '',
      icon: 'Crown'
    });
    setEditingId(null);
    setError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item: ServiceItem) => {
    setForm({
      title: item.title,
      description: item.description,
      image: item.image,
      icon: item.icon
    });
    setEditingId(item._id || null);
    setError('');
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    setError('');

    try {
      await apiFetch(`/services/${id}`, {
        method: 'DELETE'
      });
      setServices(prev => prev.filter(item => item._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete service');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image) {
      setError('Please fill in all fields (Title, Description, Image)');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        // Edit Mode
        const updated = await apiFetch(`/services/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setServices(prev => prev.map(item => item._id === editingId ? updated : item));
      } else {
        // Add Mode
        const created = await apiFetch('/services', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setServices(prev => [...prev, created]);
      }
      setFormOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  if (loading && services.length === 0) {
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
          <h3 className="font-serif text-2xl font-bold text-[#4D2D22]">Manage Services</h3>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Add, update, or remove the professional services listed in the Services grid.
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 text-[#D7A65B]" />
            <span>Add Service</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
          {error}
        </div>
      )}

      {/* Service list or form */}
      {formOpen ? (
        <form onSubmit={handleSubmit} className="border border-[#E8D8C5] rounded-xl p-5 bg-[#F8F3EC]/40 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#E8D8C5]">
            <h4 className="font-serif text-lg font-bold text-[#4D2D22]">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h4>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="text-[#666666] hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Service Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Traditional Wedding Pheta"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Icon */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Display Icon
              </label>
              <select
                value={form.icon}
                onChange={(e) => setForm(prev => ({ ...prev, icon: e.target.value }))}
                className="px-4 py-2.5 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              >
                {AVAILABLE_ICONS.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Short Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Provide a brief summary of this service offering..."
              className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>

          {/* Image */}
          <ImageUploadField
            label="Service Cover Image"
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
              <span>{editingId ? 'Save Changes' : 'Create Service'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl group hover:border-[#D7A65B] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8D8C5] flex items-center justify-center text-[#C48B3C]">
                    {AVAILABLE_ICONS.find(i => i.name === item.icon)?.icon || <Crown className="w-4 h-4" />}
                  </div>
                  <h4 className="font-serif font-bold text-[#4D2D22] text-base">{item.title}</h4>
                </div>
                <p className="font-sans text-xs text-[#666666] line-clamp-2 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="flex gap-2 justify-end border-t border-[#E8D8C5]/60 pt-3">
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
          {services.length === 0 && (
            <div className="col-span-2 text-center py-10 font-sans text-sm text-[#999999]">
              No services found. Click Add Service to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
