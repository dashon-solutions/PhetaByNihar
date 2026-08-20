import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Save, Check, Plus, Trash2, UserCheck, BookOpen, Clock, Award, Sparkles } from 'lucide-react';

interface OfferedClass {
  title: string;
  description: string;
  image: string;
}

interface JourneyPoint {
  title: string;
  description: string;
  image: string;
}

interface ClassBatch {
  batchName: string;
  startDate: string;
  duration: string;
  status: string;
  image: string;
}

export const AboutManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'story' | 'values' | 'milestones' | 'classes' | 'batches'>('story');

  const [form, setForm] = useState({
    heading: '',
    italicHeading: '',
    text: '',
    portraitImage: '',
    backgroundImage: '',
    journey: '',
    passion: '',
    experience: '',
    brandStory: '',
    quoteText: '',
    quoteAuthor: '',
    journeyPoints: [] as JourneyPoint[],
    offeredClasses: [] as OfferedClass[],
    classBatches: [] as ClassBatch[]
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
            backgroundImage: data.backgroundImage || '',
            journey: data.journey || '',
            passion: data.passion || '',
            experience: data.experience || '',
            brandStory: data.brandStory || '',
            quoteText: data.quoteText || '',
            quoteAuthor: data.quoteAuthor || '',
            journeyPoints: data.journeyPoints || [],
            offeredClasses: data.offeredClasses || [],
            classBatches: data.classBatches || []
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

  const handleAddClass = () => {
    setForm(prev => ({
      ...prev,
      offeredClasses: [...prev.offeredClasses, { title: '', description: '', image: '' }]
    }));
  };

  const handleRemoveClass = (index: number) => {
    setForm(prev => {
      const newClasses = [...prev.offeredClasses];
      newClasses.splice(index, 1);
      return { ...prev, offeredClasses: newClasses };
    });
  };

  const handleClassChange = (index: number, field: keyof OfferedClass, value: string) => {
    setForm(prev => {
      const newClasses = [...prev.offeredClasses];
      newClasses[index] = { ...newClasses[index], [field]: value };
      return { ...prev, offeredClasses: newClasses };
    });
  };

  const handleAddJourneyPoint = () => {
    setForm(prev => ({
      ...prev,
      journeyPoints: [...prev.journeyPoints, { title: '', description: '', image: '' }]
    }));
  };

  const handleRemoveJourneyPoint = (index: number) => {
    setForm(prev => {
      const newPoints = [...prev.journeyPoints];
      newPoints.splice(index, 1);
      return { ...prev, journeyPoints: newPoints };
    });
  };

  const handleJourneyPointChange = (index: number, field: keyof JourneyPoint, value: string) => {
    setForm(prev => {
      const newPoints = [...prev.journeyPoints];
      newPoints[index] = { ...newPoints[index], [field]: value };
      return { ...prev, journeyPoints: newPoints };
    });
  };

  const handleAddBatch = () => {
    setForm(prev => ({
      ...prev,
      classBatches: [...prev.classBatches, { batchName: '', startDate: '', duration: '', status: 'Upcoming', image: '' }]
    }));
  };

  const handleRemoveBatch = (index: number) => {
    setForm(prev => {
      const newBatches = [...prev.classBatches];
      newBatches.splice(index, 1);
      return { ...prev, classBatches: newBatches };
    });
  };

  const handleBatchChange = (index: number, field: keyof ClassBatch, value: string) => {
    setForm(prev => {
      const newBatches = [...prev.classBatches];
      newBatches[index] = { ...newBatches[index], [field]: value };
      return { ...prev, classBatches: newBatches };
    });
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
      <div className="flex justify-center items-center py-20 bg-white rounded-2xl border border-[#E8D8C5]">
        <div className="w-8 h-8 border-3 border-[#6E1E18]/30 border-t-[#6E1E18] rounded-full animate-spin"></div>
      </div>
    );
  }

  const subSections = [
    { id: 'story', label: 'Story & Biography', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'values', label: 'Values & Quotes', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'milestones', label: `Milestones (${form.journeyPoints.length})`, icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'classes', label: `Offered Classes (${form.offeredClasses.length})`, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'batches', label: `Class Batches (${form.classBatches.length})`, icon: <Clock className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E8D8C5] p-4 sm:p-6 shadow-xs max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#D7A65B]" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4D2D22]">
              About Us & Story Manager
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#666666] mt-0.5">
            Manage heritage story, masterclasses, milestone timeline & academy batches
          </p>
        </div>
      </div>

      {/* Sub-section Tabs (Mobile Scrollable) */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-[#E8D8C5] scrollbar-none">
        {subSections.map(sec => (
          <button
            key={sec.id}
            type="button"
            onClick={() => setActiveSection(sec.id as any)}
            className={`flex items-center gap-1.5 px-3.5 py-2 font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 cursor-pointer ${
              activeSection === sec.id
                ? 'bg-[#6E1E18] text-white shadow-sm'
                : 'bg-[#F8F3EC] text-[#4D2D22] hover:bg-[#E8D8C5]'
            }`}
          >
            {sec.icon}
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-sans font-medium border border-red-200">
            {error}
          </div>
        )}

        {/* Section 1: Story & Biography */}
        {activeSection === 'story' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Heading Copy
                </label>
                <input
                  type="text"
                  name="heading"
                  value={form.heading}
                  onChange={handleChange}
                  placeholder="e.g. A Tradition Passed Down with"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                  Highlighted Italic Text
                </label>
                <input
                  type="text"
                  name="italicHeading"
                  value={form.italicHeading}
                  onChange={handleChange}
                  placeholder="e.g. Pride & Precision"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
                About Us Body Biography
              </label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                rows={5}
                placeholder="Enter detailed biography text..."
                className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploadField
                label="Portrait / Artist Photo"
                value={form.portraitImage}
                onChange={(url) => setForm(prev => ({ ...prev, portraitImage: url }))}
              />
              <ImageUploadField
                label="Decorative Mandala (Right corner)"
                value={form.backgroundImage}
                onChange={(url) => setForm(prev => ({ ...prev, backgroundImage: url }))}
              />
            </div>
          </div>
        )}

        {/* Section 2: Values & Quotes */}
        {activeSection === 'values' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Journey</label>
                <textarea
                  name="journey"
                  value={form.journey}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Our journey began..."
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Passion</label>
                <textarea
                  name="passion"
                  value={form.passion}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Our passion is..."
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Experience</label>
                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Over 10 years of experience..."
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Brand Story</label>
                <textarea
                  name="brandStory"
                  value={form.brandStory}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Our brand is built on..."
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
            </div>

            <div className="border-t border-[#E8D8C5] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Featured Quote Text</label>
                <textarea
                  name="quoteText"
                  value={form.quoteText}
                  onChange={handleChange}
                  rows={2}
                  placeholder="For me, it’s not just about tying a pheta..."
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Quote Author</label>
                <input
                  type="text"
                  name="quoteAuthor"
                  value={form.quoteAuthor}
                  onChange={handleChange}
                  placeholder="e.g. Nihar Tambde"
                  className="px-3 py-2 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Milestones */}
        {activeSection === 'milestones' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#4D2D22]">Journey Milestones</h4>
                <p className="font-sans text-xs text-[#666666]">Timeline moments in your heritage journey.</p>
              </div>
              <button
                type="button"
                onClick={handleAddJourneyPoint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#6E1E18] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#D7A65B]" /> Add Milestone
              </button>
            </div>

            <div className="space-y-3">
              {form.journeyPoints.map((point, index) => (
                <div key={index} className="p-3.5 border border-[#E8D8C5] rounded-2xl bg-[#FAF6F0] relative space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#6E1E18]">Milestone #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveJourneyPoint(index)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => handleJourneyPointChange(index, 'title', e.target.value)}
                        placeholder="Milestone Title, e.g. Foundation in Girgaon"
                        className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                      />
                      <textarea
                        value={point.description}
                        onChange={(e) => handleJourneyPointChange(index, 'description', e.target.value)}
                        rows={3}
                        placeholder="Description of the milestone..."
                        className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                      />
                    </div>
                    <ImageUploadField
                      label="Milestone Photo"
                      value={point.image}
                      onChange={(url) => handleJourneyPointChange(index, 'image', url)}
                    />
                  </div>
                </div>
              ))}
              {form.journeyPoints.length === 0 && (
                <div className="text-center py-8 text-xs text-[#888888] bg-[#FAF6F0] rounded-xl border border-dashed border-[#E8D8C5]">
                  No milestones added yet. Click "Add Milestone" above.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: Classes */}
        {activeSection === 'classes' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#4D2D22]">Offered Classes & Syllabi</h4>
                <p className="font-sans text-xs text-[#666666]">Educational courses taught by Nihar Tambde.</p>
              </div>
              <button
                type="button"
                onClick={handleAddClass}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#6E1E18] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#D7A65B]" /> Add Class
              </button>
            </div>

            <div className="space-y-3">
              {form.offeredClasses.map((cls, index) => (
                <div key={index} className="p-3.5 border border-[#E8D8C5] rounded-2xl bg-[#FAF6F0] relative space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#6E1E18]">Class Course #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveClass(index)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={cls.title}
                        onChange={(e) => handleClassChange(index, 'title', e.target.value)}
                        placeholder="Class Name, e.g. Masterclass in Traditional Pheta Tying"
                        className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                      />
                      <textarea
                        value={cls.description}
                        onChange={(e) => handleClassChange(index, 'description', e.target.value)}
                        rows={3}
                        placeholder="Syllabus and training specs..."
                        className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                      />
                    </div>
                    <ImageUploadField
                      label="Class Banner"
                      value={cls.image}
                      onChange={(url) => handleClassChange(index, 'image', url)}
                    />
                  </div>
                </div>
              ))}
              {form.offeredClasses.length === 0 && (
                <div className="text-center py-8 text-xs text-[#888888] bg-[#FAF6F0] rounded-xl border border-dashed border-[#E8D8C5]">
                  No offered classes added yet. Click "Add Class" above.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 5: Batches */}
        {activeSection === 'batches' && (
          <div className="space-y-4 animate-in fade-in-50 duration-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#4D2D22]">Class Batches & Schedules</h4>
                <p className="font-sans text-xs text-[#666666]">Active registration batches and dates.</p>
              </div>
              <button
                type="button"
                onClick={handleAddBatch}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#6E1E18] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#D7A65B]" /> Add Batch
              </button>
            </div>

            <div className="space-y-3">
              {form.classBatches.map((batch, index) => (
                <div key={index} className="p-3.5 border border-[#E8D8C5] rounded-2xl bg-[#FAF6F0] relative space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#6E1E18]">Batch #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBatch(index)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={batch.batchName}
                        onChange={(e) => handleBatchChange(index, 'batchName', e.target.value)}
                        placeholder="Batch Title, e.g. Weekend Batch - Mumbai"
                        className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={batch.startDate}
                          onChange={(e) => handleBatchChange(index, 'startDate', e.target.value)}
                          placeholder="Start Date"
                          className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                        />
                        <input
                          type="text"
                          value={batch.duration}
                          onChange={(e) => handleBatchChange(index, 'duration', e.target.value)}
                          placeholder="Duration (e.g. 2 Days)"
                          className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                        />
                      </div>
                      <select
                        value={batch.status}
                        onChange={(e) => handleBatchChange(index, 'status', e.target.value)}
                        className="px-3 py-2 bg-white border border-[#E8D8C5] rounded-xl font-sans text-xs"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Enrolling Now">Enrolling Now</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <ImageUploadField
                      label="Batch Cover Photo"
                      value={batch.image}
                      onChange={(url) => handleBatchChange(index, 'image', url)}
                    />
                  </div>
                </div>
              ))}
              {form.classBatches.length === 0 && (
                <div className="text-center py-8 text-xs text-[#888888] bg-[#FAF6F0] rounded-xl border border-dashed border-[#E8D8C5]">
                  No class batches scheduled. Click "Add Batch" above.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="flex justify-end gap-3 pt-3 border-t border-[#E8D8C5]">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-[#7D201D] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer border border-[#8A2B24]"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : success ? (
              <Check className="w-4 h-4 text-[#D7A65B]" />
            ) : (
              <Save className="w-4 h-4 text-[#D7A65B]" />
            )}
            <span>{saving ? 'Saving...' : success ? 'Saved Successfully!' : 'Save All About Us Details'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
