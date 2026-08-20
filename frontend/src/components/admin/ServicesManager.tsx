import React, { useState, useEffect } from 'react';
import { apiFetch, getApiImageUrl } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import {
  Plus, Edit2, Trash2, Save, X, Crown,
  Tent, Briefcase, GraduationCap, Star, Shield,
  Heart, Award, Palette, Users, Landmark,
  Flag, Presentation, Mic, Video, Ticket,
  Sparkles, Plane, MapPin, LayoutGrid
} from 'lucide-react';

interface ServiceItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  moreInfo?: string;
  features?: { icon: string; label: string }[];
}

const AVAILABLE_ICONS = [
  { name: 'Crown', icon: <Crown className="w-4 h-4" /> },
  { name: 'Tent', icon: <Tent className="w-4 h-4" /> },
  { name: 'Briefcase', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'GraduationCap', icon: <GraduationCap className="w-4 h-4" /> },
  { name: 'Star', icon: <Star className="w-4 h-4" /> },
  { name: 'Shield', icon: <Shield className="w-4 h-4" /> },
  { name: 'Heart', icon: <Heart className="w-4 h-4" /> },
  { name: 'Award', icon: <Award className="w-4 h-4" /> },
  { name: 'Palette', icon: <Palette className="w-4 h-4" /> },
  { name: 'Users', icon: <Users className="w-4 h-4" /> },
  { name: 'Landmark', icon: <Landmark className="w-4 h-4" /> },
  { name: 'Flag', icon: <Flag className="w-4 h-4" /> },
  { name: 'Presentation', icon: <Presentation className="w-4 h-4" /> },
  { name: 'Mic', icon: <Mic className="w-4 h-4" /> },
  { name: 'Video', icon: <Video className="w-4 h-4" /> },
  { name: 'Ticket', icon: <Ticket className="w-4 h-4" /> },
  { name: 'Sparkles', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Plane', icon: <Plane className="w-4 h-4" /> },
  { name: 'MapPin', icon: <MapPin className="w-4 h-4" /> }
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
    icon: 'Crown',
    moreInfo: '',
    features: []
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
      icon: 'Crown',
      moreInfo: '',
      features: []
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
      icon: item.icon,
      moreInfo: item.moreInfo || '',
      features: item.features || []
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
      setError('Please fill in all required fields (Title, Description, Cover Image)');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        const updated = await apiFetch(`/services/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setServices(prev => prev.map(item => item._id === editingId ? updated : item));
      } else {
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
      <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-[#E8D8C5]">
        <div className="w-8 h-8 border-3 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E8D8C5] p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-[#D7A65B]" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4D2D22]">
              Manage Services Offered
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#666666] mt-0.5">
            Groom pheta tying, baraat guest styling, corporate events & masterclasses
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-[#7D201D] active:scale-[0.98] transition-all cursor-pointer border border-[#8A2B24]"
        >
          <Plus className="w-4 h-4 text-[#D7A65B]" />
          <span>Add Service</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
          {error}
        </div>
      )}

      {/* Form or Service List */}
      {formOpen ? (
        <div className="bg-white border border-[#E8D8C5] rounded-2xl p-4 sm:p-6 shadow-xs">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#E8D8C5]">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#D7A65B]" />
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#4D2D22]">
                  {editingId ? 'Edit Service' : 'Add New Service'}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Traditional Royal Groom Pheta"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
                />
              </div>

              {/* Icon */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Display Icon
                </label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm(prev => ({ ...prev, icon: e.target.value }))}
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
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
            <div className="flex flex-col gap-1">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Summary Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Brief summary of what this service offers..."
                className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
              />
            </div>

            {/* More Info */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Extended Information / Scope
              </label>
              <textarea
                value={form.moreInfo || ''}
                onChange={(e) => setForm(prev => ({ ...prev, moreInfo: e.target.value }))}
                rows={4}
                placeholder="Details of materials, on-site artist count, booking advance..."
                className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] text-[#4D2D22] focus:bg-white"
              />
            </div>

            {/* Features Array */}
            <div className="flex flex-col gap-2 border-t border-[#E8D8C5] pt-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Service Highlights / Key Features (Max 4)
                </label>
                {(form.features?.length || 0) < 4 && (
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, features: [...(prev.features || []), { icon: 'Star', label: '' }] }))}
                    className="text-xs text-[#6E1E18] font-bold uppercase hover:text-[#4A0D0D] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D7A65B]" />
                    <span>Add Highlight</span>
                  </button>
                )}
              </div>

              {form.features?.map((feat, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <select
                    value={feat.icon}
                    onChange={(e) => {
                      const newFeat = [...(form.features || [])];
                      newFeat[idx].icon = e.target.value;
                      setForm(prev => ({ ...prev, features: newFeat }));
                    }}
                    className="px-2.5 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs w-1/3"
                  >
                    {AVAILABLE_ICONS.map((i) => (
                      <option key={i.name} value={i.name}>{i.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={feat.label}
                    onChange={(e) => {
                      const newFeat = [...(form.features || [])];
                      newFeat[idx].label = e.target.value;
                      setForm(prev => ({ ...prev, features: newFeat }));
                    }}
                    placeholder="Feature title, e.g. Premium Silk & Brocade"
                    className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs flex-1 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newFeat = [...(form.features || [])];
                      newFeat.splice(idx, 1);
                      setForm(prev => ({ ...prev, features: newFeat }));
                    }}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Image */}
            <ImageUploadField
              label="Service Cover Image"
              value={form.image}
              onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
            />

            {/* Actions */}
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
                <span>{editingId ? 'Save Changes' : 'Create Service'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Service Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {services.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-[#E8D8C5] rounded-2xl p-4 hover:border-[#D7A65B] transition-all shadow-xs flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E8D8C5] shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img src={getApiImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[#C48B3C]">
                        {AVAILABLE_ICONS.find(i => i.name === item.icon)?.icon || <Crown className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-[#4D2D22] text-base truncate">{item.title}</h4>
                    {item.features && item.features.length > 0 && (
                      <span className="text-[10px] text-[#888888]">
                        {item.features.length} Key Highlights
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-sans text-xs text-[#666666] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex gap-2 justify-end border-t border-[#E8D8C5]/60 pt-3">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#F8F3EC] hover:bg-[#E8D8C5] border border-[#E8D8C5] text-xs font-sans font-bold text-[#4D2D22] rounded-xl transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#C48B3C]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item._id || '')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-sans font-bold text-red-600 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-[#E8D8C5]">
              <LayoutGrid className="w-10 h-10 text-[#D7A65B] opacity-50 mx-auto mb-2" />
              <p className="font-sans text-xs sm:text-sm text-[#666666]">
                No services found. Click "Add Service" above to create one.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
