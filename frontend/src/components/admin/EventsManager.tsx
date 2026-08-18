import React, { useState, useEffect } from 'react';
import { apiFetch, getApiImageUrl } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Plus, Edit2, Trash2, Save, X, Calendar, Clock, MapPin } from 'lucide-react';

interface EventItem {
  _id?: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
  priceBadge?: string;
}

export const EventsManager: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [highlightInput, setHighlightInput] = useState('');

  const [form, setForm] = useState<EventItem>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    highlights: [],
    priceBadge: 'Certified Workshop'
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/events');
      if (data) {
        setEvents(data);
      }
    } catch (err: any) {
      setError('Failed to fetch events: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: EventItem) => {
    setEditingId(event._id || null);
    setForm({
      title: event.title || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      description: event.description || '',
      image: event.image || '',
      highlights: event.highlights || [],
      priceBadge: event.priceBadge || 'Certified Workshop'
    });
    setHighlightInput('');
    setFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setForm({
      title: '',
      date: '',
      time: '',
      location: 'Pheta By Nihar Studio, Girgaon, Mumbai',
      description: '',
      image: '',
      highlights: ['Authorized Certificate', 'Complete Styling Kit Provided', 'Hands-on 1-on-1 Mentorship'],
      priceBadge: 'Certified Workshop'
    });
    setHighlightInput('');
    setFormOpen(true);
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setForm({ ...form, highlights: [...form.highlights, highlightInput.trim()] });
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (editingId) {
        await apiFetch(`/events/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
      } else {
        await apiFetch('/events', {
          method: 'POST',
          body: JSON.stringify(form)
        });
      }
      setFormOpen(false);
      fetchEvents();
    } catch (err: any) {
      setError(err.message || 'Error saving event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await apiFetch(`/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    } catch (err: any) {
      alert('Failed to delete event: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#E8D8C5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4D2D22]">
            Upcoming Events & Masterclasses Manager
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
            Create and manage public events, certified workshops, and exhibitions.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E1E18] text-[#F3D18A] hover:bg-[#52140F] font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Modal / Form Drawer */}
      {formOpen && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border-2 border-[#D4AF37]/40 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#E8D8C5]">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#4D2D22]">
              {editingId ? 'Edit Event' : 'Create New Event'}
            </h3>
            <button
              onClick={() => setFormOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Event Title */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2-Day Professional Pheta Tying Masterclass"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans focus:outline-none focus:border-[#C48B3C]"
                />
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Date / Schedule *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saturday & Sunday, 14–15 March 2026"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans focus:outline-none focus:border-[#C48B3C]"
                />
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Timing
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM – 5:00 PM"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans focus:outline-none focus:border-[#C48B3C]"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pheta By Nihar Studio, Girgaon, Mumbai"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans focus:outline-none focus:border-[#C48B3C]"
                />
              </div>

              {/* Price / Badge */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Badge Tag (e.g. Certified Workshop / Limited Batch)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Certified Workshop"
                  value={form.priceBadge}
                  onChange={(e) => setForm({ ...form, priceBadge: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans focus:outline-none focus:border-[#C48B3C]"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 space-y-1.5">
                <ImageUploadField
                  label="Event Cover Image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what attendees will learn or experience..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans focus:outline-none focus:border-[#C48B3C]"
                />
              </div>

              {/* Highlights */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
                  Highlights & Inclusions
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a key highlight (e.g. Authorized Certificate)"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl text-sm font-sans"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 bg-[#4D2D22] text-[#F3D18A] rounded-xl text-xs font-bold uppercase cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {form.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F3EC] border border-[#E8D8C5] rounded-full text-xs text-[#4D2D22] font-medium"
                    >
                      <span>{h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(i)}
                        className="hover:text-red-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8D8C5]">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6E1E18] text-[#F3D18A] text-xs font-bold uppercase cursor-pointer hover:bg-[#52140F]"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Event'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="p-12 text-center text-[#666666] font-sans text-sm">
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#E8D8C5] shadow-xs">
          <Calendar className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#4D2D22]">No Events Added Yet</h3>
          <p className="text-xs text-[#666666] mt-1 max-w-sm mx-auto">
            Click the "Add New Event" button above to publish your first masterclass or cultural event.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8D8C5] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Event Image */}
                {event.image && (
                  <div className="h-44 w-full overflow-hidden bg-black relative">
                    <img
                      src={getApiImageUrl(event.image)}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {event.priceBadge && (
                      <span className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-[#6E1E18] text-[#F3D18A] text-[10px] font-bold uppercase">
                        {event.priceBadge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-[#4D2D22] leading-snug">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#666666]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C48B3C]" />
                      <span className="font-semibold text-[#4D2D22]">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#C48B3C]" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#6E1E18] shrink-0 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-xs text-[#666666] line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  {event.highlights && event.highlights.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {event.highlights.map((h, i) => (
                        <span key={i} className="text-[10px] bg-[#F8F3EC] px-2 py-0.5 rounded-md text-[#4D2D22] font-medium">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-[#FAF6F0] border-t border-[#E8D8C5] flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 rounded-lg bg-white border border-[#E8D8C5] text-[#4D2D22] hover:bg-[#6E1E18] hover:text-[#F3D18A] transition-colors cursor-pointer"
                  title="Edit Event"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event._id!)}
                  className="p-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
