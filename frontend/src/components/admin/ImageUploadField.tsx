import React, { useState } from 'react';
import { Upload, ImageIcon, RefreshCw, Trash2 } from 'lucide-react';
import { apiUpload, getApiImageUrl } from '../../utils/api';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  multiple?: boolean;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  className = '',
  multiple = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      if (multiple) {
        let successCount = 0;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!file.type.startsWith('image/')) continue;
          const data = await apiUpload(file);
          if (data && data.imageUrl) {
            onChange(data.imageUrl);
            successCount++;
          }
        }
        if (successCount === 0) {
          setError('Failed to upload any images.');
        }
      } else {
        const file = files[0];
        if (!file.type.startsWith('image/')) {
          setError('Please select an image file.');
          setUploading(false);
          return;
        }
        const data = await apiUpload(file);
        if (data && data.imageUrl) {
          onChange(data.imageUrl);
        } else {
          setError('Upload failed. No URL returned.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error uploading file.');
    } finally {
      e.target.value = '';
      setUploading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-3 items-center p-3 sm:p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl">
        {/* Preview Panel */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-[#E8D8C5] flex items-center justify-center shrink-0 shadow-xs">
          {value ? (
            <img
              src={getApiImageUrl(value)}
              alt="Upload Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-[#B0A090]" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Upload & Clear Controls */}
        <div className="flex-1 w-full flex flex-col gap-1.5 items-start">
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-semibold uppercase tracking-wider rounded-lg shadow-xs hover:bg-[#7D201D] cursor-pointer transition-colors duration-200">
              <Upload className="w-3.5 h-3.5 text-[#D7A65B]" />
              <span>{value ? 'Change Image' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
                multiple={multiple}
              />
            </label>

            {value && !multiple && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors cursor-pointer"
                title="Remove Image"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>

          <p className="text-[10px] text-[#777777] font-sans">
            JPG, PNG, WEBP (Auto-optimized)
          </p>
          {error && <span className="text-[10px] text-red-600 font-sans font-semibold">{error}</span>}
        </div>
      </div>
    </div>
  );
};
