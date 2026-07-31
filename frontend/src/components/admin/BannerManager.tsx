import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Save, Check } from 'lucide-react';

export const BannerManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState('home');
  
  const [form, setForm] = useState({
    pageName: 'home',
    tag: '',
    titleItalic: '',
    titleBold: '',
    titleRegular: '',
    description: '',
    backgroundImage: '',
    primaryButtonText: '',
    secondaryButtonText: ''
  });

  const fetchBanner = async (pageName: string) => {
    setLoading(true);
    try {
      const data = await apiFetch(`/banner?pageName=${pageName}`);
      if (data) {
        setForm({
          pageName: data.pageName || pageName,
          tag: data.tag || '',
          titleItalic: data.titleItalic || '',
          titleBold: data.titleBold || '',
          titleRegular: data.titleRegular || '',
          description: data.description || '',
          backgroundImage: data.backgroundImage || '',
          primaryButtonText: data.primaryButtonText || '',
          secondaryButtonText: data.secondaryButtonText || ''
        });
      }
    } catch (err: any) {
      setError(`Failed to fetch banner data for ${pageName}: ` + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner(activePage);
  }, [activePage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url: string) => {
    setForm(prev => ({ ...prev, backgroundImage: url }));
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await apiFetch('/banner', {
        method: 'PUT',
        body: JSON.stringify({ ...form, pageName: activePage })
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save banner');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#FFFDFB] rounded-xl border border-[#E8D8C5] p-4 max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#4D2D22]">Hero Banner Configuration</h3>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Select a page to edit its banner text, buttons and background images.
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-4 border-b border-[#E8D8C5] pb-2">
        <button
          onClick={() => handlePageChange('home')}
          className={`px-4 py-2 font-sans text-sm font-bold uppercase tracking-wider rounded-t-xl transition-colors ${
            activePage === 'home' ? 'bg-[#F8F3EC] text-[#6E1E18] border-t border-l border-r border-[#E8D8C5]' : 'text-[#666666] hover:text-[#4D2D22]'
          }`}
        >
          Home Page
        </button>
        <button
          onClick={() => handlePageChange('about')}
          className={`px-4 py-2 font-sans text-sm font-bold uppercase tracking-wider rounded-t-xl transition-colors ${
            activePage === 'about' ? 'bg-[#F8F3EC] text-[#6E1E18] border-t border-l border-r border-[#E8D8C5]' : 'text-[#666666] hover:text-[#4D2D22]'
          }`}
        >
          About Us Page
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Tag */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Badge / Tag Text
              </label>
              <input
                type="text"
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="e.g. Preserving Heritage"
                className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Italic Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Italic Heading Line (Top)
              </label>
              <input
                type="text"
                name="titleItalic"
                value={form.titleItalic}
                onChange={handleChange}
                placeholder="e.g. The Art of"
                className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Bold Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Bold Heading Line (Middle)
              </label>
              <input
                type="text"
                name="titleBold"
                value={form.titleBold}
                onChange={handleChange}
                placeholder="e.g. Maharashtrian"
                className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Regular Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Regular Heading Line (Bottom)
              </label>
              <input
                type="text"
                name="titleRegular"
                value={form.titleRegular}
                onChange={handleChange}
                placeholder="e.g. Pheta Ceremony"
                className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Banner Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter banner introductory paragraphs..."
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Button 1 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Primary Button Text
              </label>
              <input
                type="text"
                name="primaryButtonText"
                value={form.primaryButtonText}
                onChange={handleChange}
                placeholder="e.g. Book Now"
                className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Button 2 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Secondary Button Text
              </label>
              <input
                type="text"
                name="secondaryButtonText"
                value={form.secondaryButtonText}
                onChange={handleChange}
                placeholder="e.g. Explore Work"
                className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>
          </div>

          {/* Image Upload */}
          <ImageUploadField
            label="Banner Background Image"
            value={form.backgroundImage}
            onChange={handleImageChange}
          />

          {/* Save Button */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#7D201D] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : success ? (
                <Check className="w-4 h-4 text-[#D7A65B]" />
              ) : (
                <Save className="w-4 h-4 text-[#D7A65B]" />
              )}
              <span>{saving ? 'Saving...' : success ? 'Saved Successfully!' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
