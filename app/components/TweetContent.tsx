'use client';

import { useState } from 'react';
import Image from 'next/image';
import TwitterEmbedHTML from './TwitterEmbedHTML';

interface TweetContentProps {
  id: number;
  postUrl: string;
  content?: {
    text: string;
    author: string;
    authorHandle: string;
    timestamp: string;
    images?: string[];
    likes?: number;
    retweets?: number;
    replies?: number;
    embedHtml?: string;
  };
}

export default function TweetContent({ id, postUrl, content }: TweetContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // HTML埋め込みがある場合は優先表示
  if (content?.embedHtml) {
    return <TwitterEmbedHTML embedHtml={content.embedHtml} />;
  }

  // コンテンツがない場合はリンクカードを表示
  if (!content) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
            🐦
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">メンバーのつぶやき</h3>
            <p className="text-sm text-gray-600">合宿に関する投稿</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-4 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-blue-600 font-semibold mr-2">🐦 Xで、詳細をチェック！</span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              #{id}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">クリックでXの投稿を開きます</p>
        </div>
        
        <a 
          href={postUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          <span>🐦</span>
          <span>Xで投稿を見る</span>
          <span>→</span>
        </a>
      </div>
    );
  }

  // 時間をフォーマット
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
        {/* ヘッダー */}
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
            🐦
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-gray-900">{content.author}</h3>
              <span className="text-gray-500 text-sm">{content.authorHandle}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{formatTime(content.timestamp)}</span>
            </div>
          </div>
        </div>

        {/* ツイート内容 */}
        <div className="mb-4">
          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">{content.text}</p>
        </div>

        {/* 画像表示 */}
        {content.images && content.images.length > 0 && (
          <div className="mb-4">
            <div className={`grid gap-2 ${content.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {content.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`投稿画像 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 統計情報 */}
        <div className="flex items-center space-x-6 text-gray-500 text-sm border-t pt-3">
          {content.replies && (
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{content.replies}</span>
            </div>
          )}
          {content.retweets && (
            <div className="flex items-center space-x-1">
              <span>🔄</span>
              <span>{content.retweets}</span>
            </div>
          )}
          {content.likes && (
            <div className="flex items-center space-x-1">
              <span>❤️</span>
              <span>{content.likes}</span>
            </div>
          )}
          <div className="flex-1"></div>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Xで見る →
          </a>
        </div>
      </div>

      {/* 画像モーダル */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="拡大画像"
              width={800}
              height={600}
              className="object-contain max-h-[90vh]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 font-bold transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}