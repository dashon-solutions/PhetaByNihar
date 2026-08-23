import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react';

interface MediaItem {
  _id?: string;
  name: string;
  image?: string;
  color?: string;
  link?: string;
}

export const MediaManager: React.FC = () => {
  const [logos, setLogos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<MediaItem>({
    name: '',
    image: '',
    color: '#6E1E18',
    link: ''
  });

  const fetchLogos = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/media');
      if (data) {
        setLogos(data);
      }
    } catch (err: any) {
      setError('Failed to fetch media logos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleOpenAdd = () => {
    setForm({
      name: '',
      image: '',
      color: '#6E1E18',
      link: ''
    });
    setEditingId(null);
    setError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item: MediaItem) => {
    setForm({
      name: item.name,
      image: item.image || '',
      color: item.color || '#6E1E18',
      link: item.link || ''
    });
    setEditingId(item._id || null);
    setError('');
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this media brand?')) return;
    setError('');

    try {
      await apiFetch(`/media/${id}`, {
        method: 'DELETE'
      });
      setLogos(prev => prev.filter(item => item._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete media logo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      setError('Media Name is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        const updated = await apiFetch(`/media/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setLogos(prev => prev.map(item => item._id === editingId ? updated : item));
      } else {
        const created = await apiFetch('/media', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setLogos(prev => [...prev, created]);
      }
      setFormOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save media logo');
    } finally {
      setSaving(false);
    }
  };

  if (loading && logos.length === 0) {
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
          <h3 className="font-serif text-2xl font-bold text-[#4D2D22]">Manage Media Recognition</h3>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Configure newspaper/channel logos or brand text labels featured under "Featured In Leading Media".
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 text-[#D7A65B]" />
            <span>Add Brand</span>
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
              {editingId ? 'Edit Media Brand' : 'Add New Media Brand'}
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
            {/* Brand Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Media Brand Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Sakal or Zee News"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Custom Text Color */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Text Color (Hex Code - only if no logo image uploaded)
              </label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm(prev => ({ ...prev, color: e.target.value }))}
                placeholder="#6E1E18 or blue"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Redirect Link */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider flex items-center justify-between">
                <span>Redirect Link / Article URL (Optional)</span>
                <span className="text-[11px] text-[#888888] font-normal normal-case">Opens in new tab when clicked</span>
              </label>
              <input
                type="url"
                value={form.link || ''}
                onChange={(e) => setForm(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://example.com/news-article-or-coverage"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>
          </div>

          {/* Logo Image */}
          <ImageUploadField
            label="Logo Image (Optional - text label fallback is used if blank)"
            value={form.image || ''}
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
              <span>{editingId ? 'Save Changes' : 'Create Brand'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {logos.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl group hover:border-[#D7A65B] transition-colors"
            >
              <div className="flex flex-col items-center justify-center p-4 bg-white border border-[#E8D8C5] rounded-lg h-24 mb-4 select-none relative">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="max-h-12 max-w-full object-contain" />
                ) : (
                  <span className="font-serif font-bold text-lg" style={{ color: item.color || '#6E1E18' }}>
                    {item.name}
                  </span>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1 text-[#C48B3C] hover:text-[#6E1E18] bg-[#F8F3EC] rounded-md border border-[#E8D8C5]"
                    title="Open link"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex gap-2 justify-end border-t border-[#E8D8C5]/60 pt-3">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex items-center gap-1 px-2 py-1 bg-white border border-[#E8D8C5] text-[10px] font-sans font-bold uppercase tracking-wider text-[#4D2D22] hover:bg-[#E8D8C5] rounded"
                >
                  <Edit2 className="w-2.5 h-2.5 text-[#C48B3C]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item._id || '')}
                  className="flex items-center gap-1 px-2 py-1 bg-white border border-red-200 text-[10px] font-sans font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-2.5 h-2.5 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          {logos.length === 0 && (
            <div className="col-span-3 text-center py-10 font-sans text-sm text-[#999999]">
              No media brands found. Click Add Brand to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
