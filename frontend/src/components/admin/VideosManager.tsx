import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { Plus, Edit2, Trash2, Save, X, Video } from 'lucide-react';

interface VideoItem {
  _id?: string;
  title: string;
  channel: string;
  url: string;
}

export const VideosManager: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<VideoItem>({
    title: '',
    channel: '',
    url: ''
  });

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/videos');
      if (data) {
        setVideos(data);
      }
    } catch (err: any) {
      setError('Failed to fetch videos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleOpenAdd = () => {
    setForm({
      title: '',
      channel: '',
      url: 'https://www.youtube.com/embed/'
    });
    setEditingId(null);
    setError('');
    setFormOpen(true);
  };

  const handleOpenEdit = (item: VideoItem) => {
    setForm({
      title: item.title,
      channel: item.channel,
      url: item.url
    });
    setEditingId(item._id || null);
    setError('');
    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this video?')) return;
    setError('');

    try {
      await apiFetch(`/videos/${id}`, {
        method: 'DELETE'
      });
      setVideos(prev => prev.filter(item => item._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete video');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.channel || !form.url) {
      setError('Please fill in all fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (editingId) {
        // Edit Mode
        const updated = await apiFetch(`/videos/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setVideos(prev => prev.map(item => item._id === editingId ? updated : item));
      } else {
        // Add Mode
        const created = await apiFetch('/videos', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setVideos(prev => [...prev, created]);
      }
      setFormOpen(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save video');
    } finally {
      setSaving(false);
    }
  };

  if (loading && videos.length === 0) {
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
          <h3 className="font-serif text-2xl font-bold text-[#4D2D22]">Manage YouTube Videos</h3>
          <p className="font-sans text-xs text-[#666666] mt-1">
            Add or update YouTube embed links and description titles for the Conversations grids.
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 text-[#D7A65B]" />
            <span>Add Video</span>
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
              {editingId ? 'Edit Video Link' : 'Add New Video Link'}
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
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Video Title / Topic
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="अधीपतीचा राजेशाही फेटा बांधतानाची खास झलक..."
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Channel */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                Media Channel / Creator
              </label>
              <input
                type="text"
                value={form.channel}
                onChange={(e) => setForm(prev => ({ ...prev, channel: e.target.value }))}
                placeholder="e.g. Zee Marathi"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
            </div>

            {/* Embed URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                YouTube Embed URL
              </label>
              <input
                type="text"
                value={form.url}
                onChange={(e) => setForm(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://www.youtube.com/embed/OkjwpA-MdNc"
                className="px-4 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
              />
              <p className="text-[9px] text-[#666666] font-sans mt-0.5">
                Note: Use YouTube embed syntax `https://www.youtube.com/embed/VIDEO_ID` to make sure it plays inline.
              </p>
            </div>
          </div>

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
              <span>{editingId ? 'Save Changes' : 'Create Video'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl group hover:border-[#D7A65B] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-5 h-5 text-[#C48B3C]" />
                  <span className="font-sans text-[10px] uppercase font-bold text-[#6E1E18] bg-white px-2 py-0.5 border border-[#E8D8C5] rounded">
                    {item.channel}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-[#4D2D22] text-sm line-clamp-2 leading-relaxed mb-3">
                  {item.title}
                </h4>
                
                {/* Micro Video Preview Indicator */}
                <span className="text-[10px] text-text-light font-sans block mb-3 font-semibold select-none truncate">
                  URL: {item.url}
                </span>
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
          {videos.length === 0 && (
            <div className="col-span-2 text-center py-10 font-sans text-sm text-[#999999]">
              No videos found. Click Add Video to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
