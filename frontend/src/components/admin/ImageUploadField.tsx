import React, { useState } from 'react';
import { Upload, ImageIcon, RefreshCw } from 'lucide-react';
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
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
        {label}
      </label>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl">
        {/* Preview Panel */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border border-[#E8D8C5] flex items-center justify-center shrink-0">
          {value ? (
            <img
              src={getApiImageUrl(value)}
              alt="Upload Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-[#999999]" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Upload Control */}
        <div className="flex-1 w-full flex flex-col gap-1 items-start">
          <label className="relative flex items-center gap-2 px-4 py-2 bg-[#6E1E18] text-[#FFFDFB] text-xs font-sans font-semibold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#7D201D] cursor-pointer transition-colors duration-300">
            <Upload className="w-4 h-4 text-[#D7A65B]" />
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
          <p className="text-[10px] text-[#666666] font-sans mt-1">
            PNG, JPG, JPEG, WEBP or GIF (Max 10MB)
          </p>
          {error && <span className="text-[10px] text-red-600 font-sans font-semibold mt-1">{error}</span>}
        </div>
      </div>
    </div>
  );
};
