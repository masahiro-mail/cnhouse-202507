'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// CSSアニメーションを動的に追加（写真数に応じて速度調整）
const addScrollAnimation = (photoCount: number) => {
  const styleId = 'scroll-animation';
  // 既存のスタイルを削除
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // 写真数に応じて速度を調整（1/2速度に変更）
  const animationDuration = Math.max(16, photoCount * 1.6);
  
  // 1枚の写真カードの幅 = 320px + margin-left 16px + margin-right 16px = 352px
  const cardWidth = 352;
  const totalWidth = photoCount * cardWidth;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes scroll-x {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(-${totalWidth}px);
      }
    }
    .animate-scroll-x {
      animation: scroll-x ${animationDuration}s linear infinite;
      width: ${totalWidth * 2}px;
    }
    .animate-scroll-x:hover {
      animation-play-state: paused;
    }
  `;
  document.head.appendChild(style);
};

// 日付フォーマット関数
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

interface Photo {
  id: number;
  filename: string;
  alt: string;
  caption: string;
  uploadedAt: string;
}

// Fisher-Yates シャッフルアルゴリズムでランダム化
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // キャッシュを回避してデータを取得
        const response = await fetch(`/data/images.json?t=${Date.now()}`);
        const data = await response.json();
        console.log(`PhotoGallery: レスポンス詳細:`, {
          status: response.status,
          url: response.url,
          dataLength: data.length,
          firstFile: data[0]?.filename,
          lastFile: data[data.length - 1]?.filename
        });
        
        // データの妥当性をチェック
        if (!Array.isArray(data)) {
          console.error('PhotoGallery: 受信データが配列ではありません:', data);
          return;
        }
        
        // 写真をランダムにシャッフル
        const shuffledPhotos = shuffleArray(data);
        setPhotos(shuffledPhotos);
      } catch (error) {
        console.error('写真の読み込みに失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // 写真データが読み込まれたらアニメーションを設定
  useEffect(() => {
    if (photos.length > 0) {
      addScrollAnimation(photos.length);
    }
  }, [photos]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* 写真数表示 */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-white mb-2">
          📷 合宿の思い出ギャラリー
        </p>
      </div>
      
      <div className="relative overflow-hidden">
        {/* 横スクロールアニメーション */}
        <div className="flex animate-scroll-x">
          {/* 写真を2回繰り返してシームレスなループを作成 */}
          {[...photos, ...photos].map((photo, index) => (
            <div
              key={`${photo.id}-${index >= photos.length ? 'copy' : 'orig'}`}
              className="flex-shrink-0 w-80 h-80 mx-4 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedPhoto(photo)}
              data-photo-index={index}
              data-photo-filename={photo.filename}
            >
              <div className="h-full relative">
                <Image
                  src={`/images/posts/${photo.filename}`}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                  onError={(e) => {
                    console.error(`Failed to load image: ${photo.filename}`);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
          
          {/* アップロード用のプレースホルダー */}
          <div className="flex-shrink-0 w-80 h-80 mx-4 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-orange-400 transition-colors duration-300">
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-2">📷</div>
              <p className="text-gray-500 text-sm">写真をアップロード</p>
              <p className="text-gray-400 text-xs mt-1">（管理者のみ）</p>
            </div>
          </div>
        </div>
        
        {/* グラデーション効果（左右の境界をぼかす）- 透明度を調整して白化を防ぐ */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-sky-300/50 via-transparent to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-sky-300/50 via-transparent to-transparent pointer-events-none z-10"></div>
      </div>

      {/* モーダル */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="relative bg-gray-100">
              <Image
                src={`/images/posts/${selectedPhoto.filename}`}
                alt={selectedPhoto.alt}
                width={800}
                height={600}
                className="object-contain max-h-[70vh] w-full h-auto"
                onError={(e) => {
                  console.error(`Failed to load modal image: ${selectedPhoto.filename}`);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                onLoad={(e) => {
                  console.log(`Modal image loaded successfully: ${selectedPhoto.filename}`);
                }}
                quality={95}
                priority
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 font-bold transition-all duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedPhoto.alt}</h3>
              <p className="text-gray-700 mb-2">{selectedPhoto.caption}</p>
              <p className="text-sm text-gray-500">{formatDate(selectedPhoto.uploadedAt)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}