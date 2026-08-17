import React, { useState, useEffect } from 'react';
import { apiFetch, getApiImageUrl } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Trash2, Edit2, Check, X, Image as ImageIcon, Save, ChevronDown, ChevronUp } from 'lucide-react';

interface OurWorkItem {
  _id?: string;
  title: string;
  description: string;
  images: string[];
}

export const OurWorkManager: React.FC = () => {
  const [works, setWorks] = useState<OurWorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentWork, setCurrentWork] = useState<OurWorkItem>({ title: '', description: '', images: [] });

  // Banner State
  const [bannerForm, setBannerForm] = useState({
    tag: '',
    titleItalic: '',
    titleBold: '',
    titleRegular: '',
    description: '',
    backgroundImage: '',
    primaryButtonText: '',
    secondaryButtonText: ''
  });
  const [bannerSaving, setBannerSaving] = useState(false);
  const [bannerSuccess, setBannerSuccess] = useState(false);
  const [showBannerEditor, setShowBannerEditor] = useState(false);

  const fetchBanner = async () => {
    try {
      const data = await apiFetch('/banner?pageName=our-work');
      if (data) {
        setBannerForm({
          tag: data.tag || 'Portfolio of Pride',
          titleItalic: data.titleItalic || 'A Showcase of',
          titleBold: data.titleBold || 'Royal Celebrations',
          titleRegular: data.titleRegular || '& Memorable Events',
          description: data.description || 'Explore our gallery of royal wedding ceremonies and cultural processions.',
          backgroundImage: data.backgroundImage || '/bannerimgside.png',
          primaryButtonText: data.primaryButtonText || 'Book Us Now',
          secondaryButtonText: data.secondaryButtonText || 'Explore Services'
        });
      }
    } catch (err) {
      console.warn('Failed to load our-work banner:', err);
    }
  };

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/our-work');
      setWorks(data || []);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch works');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
    fetchBanner();
  }, []);

  const handleBannerSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerSaving(true);
    try {
      await apiFetch('/banner', {
        method: 'PUT',
        body: JSON.stringify({ ...bannerForm, pageName: 'our-work' })
      });
      setBannerSuccess(true);
      setTimeout(() => setBannerSuccess(false), 3000);
    } catch (err: any) {
      alert('Failed to save banner: ' + err.message);
    } finally {
      setBannerSaving(false);
    }
  };

  const handleSave = async () => {
    if (!currentWork.title || !currentWork.description) {
      setError('Title and description are required.');
      return;
    }

    try {
      if (currentWork._id) {
        await apiFetch(`/our-work/${currentWork._id}`, {
          method: 'PUT',
          body: JSON.stringify(currentWork)
        });
      } else {
        await apiFetch('/our-work', {
          method: 'POST',
          body: JSON.stringify(currentWork)
        });
      }
      setIsEditing(false);
      setCurrentWork({ title: '', description: '', images: [] });
      fetchWorks();
    } catch (err: any) {
      setError(err.message || 'Failed to save work');
    }
  };

  const handleEdit = (work: OurWorkItem) => {
    setCurrentWork(work);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this work?')) return;
    try {
      await apiFetch(`/our-work/${id}`, { method: 'DELETE' });
      fetchWorks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete work');
    }
  };

  const handleImageUpload = (url: string) => {
    setCurrentWork(prev => ({
      ...prev,
      images: [...prev.images, url]
    }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setCurrentWork(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Our Work Page Banner Editor Card */}
      <div className="bg-[#FFFDFB] rounded-xl border border-[#E8D8C5] p-4 shadow-sm">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowBannerEditor(!showBannerEditor)}>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#4D2D22] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#C48B3C]" />
              Our Work Page Banner Image & Settings
            </h3>
            <p className="text-[#666666] font-sans text-xs mt-0.5">
              Change the hero banner background image, headline, and text for the Our Work page.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-bold text-[#6E1E18] bg-[#F8F3EC] px-3 py-1.5 rounded-lg hover:bg-[#E8D8C5] transition-colors"
          >
            {showBannerEditor ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showBannerEditor ? 'Hide' : 'Edit Banner'}
          </button>
        </div>

        {showBannerEditor && (
          <form onSubmit={handleBannerSave} className="mt-4 pt-4 border-t border-[#E8D8C5] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                  Tag / Badge
                </label>
                <input
                  type="text"
                  value={bannerForm.tag}
                  onChange={(e) => setBannerForm({ ...bannerForm, tag: e.target.value })}
                  placeholder="e.g. Portfolio of Pride"
                  className="w-full p-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                  Italic Title Line
                </label>
                <input
                  type="text"
                  value={bannerForm.titleItalic}
                  onChange={(e) => setBannerForm({ ...bannerForm, titleItalic: e.target.value })}
                  placeholder="e.g. A Showcase of"
                  className="w-full p-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                  Bold Title Line
                </label>
                <input
                  type="text"
                  value={bannerForm.titleBold}
                  onChange={(e) => setBannerForm({ ...bannerForm, titleBold: e.target.value })}
                  placeholder="e.g. Royal Celebrations"
                  className="w-full p-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                  Regular Title Line
                </label>
                <input
                  type="text"
                  value={bannerForm.titleRegular}
                  onChange={(e) => setBannerForm({ ...bannerForm, titleRegular: e.target.value })}
                  placeholder="e.g. & Memorable Events"
                  className="w-full p-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                Banner Description
              </label>
              <textarea
                value={bannerForm.description}
                onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                rows={2}
                placeholder="Brief description for the banner..."
                className="w-full p-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
              />
            </div>

            {/* Banner Background Image Upload Field */}
            <div className="bg-[#F8F3EC] p-3 rounded-xl border border-[#E8D8C5]">
              <ImageUploadField
                label="Our Work Banner Background Image"
                value={bannerForm.backgroundImage}
                onChange={(url) => setBannerForm({ ...bannerForm, backgroundImage: url })}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={bannerSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#7D201D] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {bannerSaving ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : bannerSuccess ? (
                  <Check className="w-4 h-4 text-[#D7A65B]" />
                ) : (
                  <Save className="w-4 h-4 text-[#D7A65B]" />
                )}
                <span>{bannerSaving ? 'Saving Banner...' : bannerSuccess ? 'Banner Saved!' : 'Save Banner Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Main Works Portfolio Manager Card */}
      <div className="bg-[#FFFDFB] rounded-xl border border-[#E8D8C5] p-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#4D2D22]">Showcase Portfolio Items</h3>
            <p className="text-[#666666] font-sans text-sm mt-1">Manage showcased event galleries and client photos.</p>
          </div>
          {!isEditing && (
            <button 
              onClick={() => {
                setCurrentWork({ title: '', description: '', images: [] });
                setIsEditing(true);
              }}
              className="flex items-center gap-2 bg-[#6E1E18] text-white px-3 py-1.5 rounded-lg font-sans font-semibold text-xs hover:bg-[#7D201D] transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Work
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
            {error}
          </div>
        )}

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                Title
              </label>
              <input 
                type="text"
                value={currentWork.title}
                onChange={(e) => setCurrentWork({...currentWork, title: e.target.value})}
                className="w-full p-2 border border-[#E8D8C5] rounded-lg focus:ring-1 focus:ring-[#D7A65B] focus:border-transparent outline-none transition-all font-sans text-sm"
                placeholder="e.g. Royal Wedding in Pune"
              />
            </div>
            
            <div>
              <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea 
                value={currentWork.description}
                onChange={(e) => setCurrentWork({...currentWork, description: e.target.value})}
                rows={3}
                className="w-full p-2 border border-[#E8D8C5] rounded-lg focus:ring-1 focus:ring-[#D7A65B] focus:border-transparent outline-none transition-all font-sans text-sm"
                placeholder="Describe the event..."
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider mb-1">
                Gallery Images
              </label>
              <div className="bg-[#F8F3EC] p-3 rounded-lg border border-[#E8D8C5] mb-3">
                <ImageUploadField 
                  label="Upload New Image(s)" 
                  value="" 
                  onChange={handleImageUpload} 
                  multiple={true}
                />
              </div>

              {currentWork.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {currentWork.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-[#E8D8C5] aspect-square">
                      <img src={getApiImageUrl(imgUrl)} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        title="Remove Image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleSave}
                className="flex items-center gap-1.5 bg-[#D7A65B] text-[#4D2D22] px-4 py-2 rounded-lg font-sans font-bold text-xs hover:bg-[#E8D8C5] transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                {currentWork._id ? 'Update' : 'Save'}
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setCurrentWork({ title: '', description: '', images: [] });
                  setError('');
                }}
                className="flex items-center gap-1.5 bg-[#F5F5F5] text-[#666666] px-4 py-2 rounded-lg font-sans font-semibold text-xs hover:bg-[#E0E0E0] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-6 text-[#666666] text-sm">Loading...</div>
            ) : works.length === 0 ? (
              <div className="text-center py-10 bg-[#F8F3EC] rounded-lg border border-[#E8D8C5] border-dashed">
                <ImageIcon className="w-8 h-8 text-[#D7A65B] mx-auto mb-2 opacity-50" />
                <p className="text-[#666666] font-sans text-xs">No works found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {works.map((work) => (
                  <div key={work._id} className="bg-white border border-[#E8D8C5] rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="aspect-[4/3] bg-[#F8F3EC] relative">
                      {work.images && work.images.length > 0 ? (
                        <img 
                          src={getApiImageUrl(work.images[0])} 
                          alt={work.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-10 h-10 text-[#D7A65B] opacity-30" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                        {work.images?.length || 0} Photos
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg text-[#4D2D22] mb-2 line-clamp-1">{work.title}</h3>
                      <p className="font-sans text-sm text-[#666666] line-clamp-2 mb-4">{work.description}</p>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(work)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-[#F8F3EC] text-[#4D2D22] py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#E8D8C5] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button 
                          onClick={() => work._id && handleDelete(work._id)}
                          className="flex items-center justify-center px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
