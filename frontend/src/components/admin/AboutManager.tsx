import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { ImageUploadField } from './ImageUploadField';
import { Save, Check, Plus, Trash2 } from 'lucide-react';

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

        <div className="border-t border-[#E8D8C5] pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Journey</label>
            <textarea
              name="journey"
              value={form.journey}
              onChange={handleChange}
              rows={4}
              placeholder="Our journey began..."
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Passion</label>
            <textarea
              name="passion"
              value={form.passion}
              onChange={handleChange}
              rows={4}
              placeholder="Our passion is..."
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Experience</label>
            <textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              rows={4}
              placeholder="Over 10 years of experience..."
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Brand Story</label>
            <textarea
              name="brandStory"
              value={form.brandStory}
              onChange={handleChange}
              rows={4}
              placeholder="Our brand is built on..."
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>
        </div>

        <div className="border-t border-[#E8D8C5] pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Quote Text</label>
            <textarea
              name="quoteText"
              value={form.quoteText}
              onChange={handleChange}
              rows={3}
              placeholder="For me, it’s not just about tying a pheta..."
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray"
            />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Quote Author</label>
            <input
              type="text"
              name="quoteAuthor"
              value={form.quoteAuthor}
              onChange={handleChange}
              placeholder="e.g. Nihar Tambde"
              className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] text-text-gray w-1/2"
            />
          </div>
        </div>

        {/* Journey Points Section */}
        <div className="pt-6 border-t border-[#E8D8C5]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-serif text-xl font-bold text-[#4D2D22]">Journey Milestones</h4>
              <p className="font-sans text-xs text-[#666666] mt-1">Add key moments in your journey.</p>
            </div>
            <button
              type="button"
              onClick={handleAddJourneyPoint}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F8F3EC] text-[#4D2D22] border border-[#E8D8C5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#E8D8C5] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Milestone
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {form.journeyPoints.map((point, index) => (
              <div key={index} className="p-4 border border-[#E8D8C5] rounded-xl bg-white relative">
                <button
                  type="button"
                  onClick={() => handleRemoveJourneyPoint(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Milestone Title</label>
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => handleJourneyPointChange(index, 'title', e.target.value)}
                        placeholder="e.g. The Beginning"
                        className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Milestone Description</label>
                      <textarea
                        value={point.description}
                        onChange={(e) => handleJourneyPointChange(index, 'description', e.target.value)}
                        rows={3}
                        placeholder="Description of the milestone..."
                        className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                      />
                    </div>
                  </div>
                  <div>
                    <ImageUploadField
                      label="Milestone Image"
                      value={point.image}
                      onChange={(url) => handleJourneyPointChange(index, 'image', url)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {form.journeyPoints.length === 0 && (
              <div className="text-center py-6 text-sm text-[#666666] bg-[#F8F3EC] rounded-xl border border-dashed border-[#E8D8C5]">
                No journey milestones added yet. Click "Add Milestone" to start.
              </div>
            )}
          </div>
        </div>

        {/* Classes Section */}
        <div className="pt-6 border-t border-[#E8D8C5]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-serif text-xl font-bold text-[#4D2D22]">Offered Classes</h4>
              <p className="font-sans text-xs text-[#666666] mt-1">Add classes to showcase on the About Us page.</p>
            </div>
            <button
              type="button"
              onClick={handleAddClass}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F8F3EC] text-[#4D2D22] border border-[#E8D8C5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#E8D8C5] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Class
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {form.offeredClasses.map((cls, index) => (
              <div key={index} className="p-4 border border-[#E8D8C5] rounded-xl bg-white relative">
                <button
                  type="button"
                  onClick={() => handleRemoveClass(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Class Title</label>
                      <input
                        type="text"
                        value={cls.title}
                        onChange={(e) => handleClassChange(index, 'title', e.target.value)}
                        placeholder="e.g. Masterclass in Pheta Tying"
                        className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Class Description</label>
                      <textarea
                        value={cls.description}
                        onChange={(e) => handleClassChange(index, 'description', e.target.value)}
                        rows={3}
                        placeholder="Description of the class..."
                        className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                      />
                    </div>
                  </div>
                  <div>
                    <ImageUploadField
                      label="Class Image"
                      value={cls.image}
                      onChange={(url) => handleClassChange(index, 'image', url)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {form.offeredClasses.length === 0 && (
              <div className="text-center py-6 text-sm text-[#666666] bg-[#F8F3EC] rounded-xl border border-dashed border-[#E8D8C5]">
                No classes added yet. Click "Add Class" to start.
              </div>
            )}
          </div>
        </div>
        
        {/* Class Batches Section */}
        <div className="pt-6 border-t border-[#E8D8C5]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-serif text-xl font-bold text-[#4D2D22]">Class Batches</h4>
              <p className="font-sans text-xs text-[#666666] mt-1">Manage active or upcoming class batches.</p>
            </div>
            <button
              type="button"
              onClick={handleAddBatch}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F8F3EC] text-[#4D2D22] border border-[#E8D8C5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#E8D8C5] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Batch
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {form.classBatches.map((batch, index) => (
              <div key={index} className="p-4 border border-[#E8D8C5] rounded-xl bg-white relative">
                <button
                  type="button"
                  onClick={() => handleRemoveBatch(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-lg transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Batch Name</label>
                      <input
                        type="text"
                        value={batch.batchName}
                        onChange={(e) => handleBatchChange(index, 'batchName', e.target.value)}
                        placeholder="e.g. Summer Special Batch"
                        className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Start Date</label>
                        <input
                          type="text"
                          value={batch.startDate}
                          onChange={(e) => handleBatchChange(index, 'startDate', e.target.value)}
                          placeholder="e.g. 15th August 2024"
                          className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Duration</label>
                        <input
                          type="text"
                          value={batch.duration}
                          onChange={(e) => handleBatchChange(index, 'duration', e.target.value)}
                          placeholder="e.g. 4 Weeks"
                          className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">Status</label>
                      <select
                        value={batch.status}
                        onChange={(e) => handleBatchChange(index, 'status', e.target.value)}
                        className="px-4 py-2.5 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B]"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Enrolling Now">Enrolling Now</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <ImageUploadField
                      label="Batch Image"
                      value={batch.image}
                      onChange={(url) => handleBatchChange(index, 'image', url)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {form.classBatches.length === 0 && (
              <div className="text-center py-6 text-sm text-[#666666] bg-[#F8F3EC] rounded-xl border border-dashed border-[#E8D8C5]">
                No class batches added yet. Click "Add Batch" to start.
              </div>
            )}
          </div>
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
