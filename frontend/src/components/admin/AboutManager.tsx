import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Save, Check } from 'lucide-react';

export const AboutManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    heading: '',
    italicHeading: '',
    text: '',
    portraitImage: '',
    backgroundImage: ''
  });

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      try {
        const data = await apiFetch('/about');
        if (data) {
          setForm({
            heading: data.heading || '',
            italicHeading: data.italicHeading || '',
            text: data.text || '',
            portraitImage: data.portraitImage || '',
            backgroundImage: data.backgroundImage || ''
          });
        }
      } catch (err: any) {
        setError('Failed to fetch about us details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await apiFetch('/about', {
        method: 'PUT',
        body: JSON.stringify(form)
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save about details');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-8 h-8 border-4 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFB] rounded-2xl border border-[#E8D8C5] p-6 max-w-4xl">
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold text-[#4D2D22]">Manage About Us</h3>
        <p className="font-sans text-xs text-[#666666] mt-1">
          Edit About Us paragraph content, portrait image, and the decorative mandala overlay.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Heading Copy
            </label>
            <input
              type="text"
              name="heading"
              value={form.heading}
              onChange={handleChange}
              placeholder="e.g. A Tradition Passed Down with"
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>

          {/* Italic Heading */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Highlighted Italic Text
            </label>
            <input
              type="text"
              name="italicHeading"
              value={form.italicHeading}
              onChange={handleChange}
              placeholder="e.g. Pride"
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
            About Us Body Copy
          </label>
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            rows={5}
            placeholder="Enter About Us detailed biography text..."
            className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
          />
        </div>

        {/* Image uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploadField
            label="Portrait Photo"
            value={form.portraitImage}
            onChange={(url) => setForm(prev => ({ ...prev, portraitImage: url }))}
          />
          <ImageUploadField
            label="Decorative Mandala (Right corner)"
            value={form.backgroundImage}
            onChange={(url) => setForm(prev => ({ ...prev, backgroundImage: url }))}
          />
        </div>

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
    </div>
  );
};
