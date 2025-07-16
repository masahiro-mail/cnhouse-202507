'use client';

import { useState, useEffect } from 'react';

export default function PhotoDebug() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        console.log('PhotoDebug: データ取得開始');
        const response = await fetch(`/data/images.json?debug=${Date.now()}`);
        console.log('PhotoDebug: Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const text = await response.text();
        console.log('PhotoDebug: Response text length:', text.length);
        console.log('PhotoDebug: Response text start:', text.substring(0, 200));
        
        const data = JSON.parse(text);
        console.log('PhotoDebug: Parsed data length:', data.length);
        console.log('PhotoDebug: First 3 items:', data.slice(0, 3));
        console.log('PhotoDebug: Last 3 items:', data.slice(-3));
        
        setPhotos(data);
      } catch (err) {
        console.error('PhotoDebug: Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <div className="p-4 bg-blue-100">🔄 PhotoDebug: Loading...</div>;
  }

  if (error) {
    return <div className="p-4 bg-red-100">❌ PhotoDebug Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-green-100 mb-4">
      <h3 className="font-bold">📊 PhotoDebug Results:</h3>
      <p>✅ Successfully loaded {photos.length} photos</p>
      <p>📁 Files: {photos.slice(0, 5).map(p => p.filename).join(', ')}{photos.length > 5 ? '...' : ''}</p>
      <details className="mt-2">
        <summary className="cursor-pointer">Show all filenames</summary>
        <div className="text-xs mt-2 max-h-40 overflow-y-auto">
          {photos.map((p, i) => (
            <div key={i}>{i + 1}. {p.filename}</div>
          ))}
        </div>
      </details>
    </div>
  );
}