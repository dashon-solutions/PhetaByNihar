const API_HOST = import.meta.env.VITE_API_URL || '';
export const API_BASE_URL = API_HOST ? `${API_HOST}/api` : '/api';

export const getApiImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/uploads') || path.startsWith('uploads')) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_HOST}${cleanPath}`;
  }
  return path; // Fallback to public assets like /footerimg.png
};

export const getHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
};

export const apiUpload = async (file: File) => {
  const url = `${API_BASE_URL}/upload`;
  const token = localStorage.getItem('adminToken');

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed: ${response.status}`);
  }

  return response.json();
};
