'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';

interface Post {
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

interface PostsData {
  posts: Post[];
  useEmbedMethod: string;
}

export default function RelatedPostsSlider() {
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], useEmbedMethod: 'direct' });
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<'card' | 'embed' | 'simple' | 'manual'>('card');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/data/posts-enhanced.json');
        const data = await response.json();
        console.log('Fetched enhanced posts:', data);
        setPostsData(data);
      } catch (error) {
        console.error('関連ポストの読み込みに失敗しました:', error);
        // フォールバック: 基本的なポストデータを読み込み
        try {
          const fallbackResponse = await fetch('/data/posts.json');
          const fallbackData = await fallbackResponse.json();
          setPostsData({
            posts: fallbackData,
            useEmbedMethod: 'direct'
          });
        } catch (fallbackError) {
          console.error('フォールバックデータの読み込みも失敗しました:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Twitter Widget スクリプトの読み込み
  useEffect(() => {
    if (displayMode === 'embed') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      script.onload = () => {
        if ((window as any).twttr?.widgets) {
          (window as any).twttr.widgets.load();
        }
      };
      if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
        document.head.appendChild(script);
      } else if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load();
      }
    }
  }, [displayMode, currentIndex]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (postsData.posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
          <div className="text-4xl mb-4">🐦</div>
          <p className="text-gray-600">投稿がありません</p>
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % postsData.posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + postsData.posts.length) % postsData.posts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPost = postsData.posts[currentIndex];

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* 表示モード切り替え */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-lg p-1 grid grid-cols-2 lg:grid-cols-4 gap-1">
          <button
            onClick={() => setDisplayMode('card')}
            className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
              displayMode === 'card'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📋 カード表示
          </button>
          <button
            onClick={() => setDisplayMode('embed')}
            className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
              displayMode === 'embed'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🐦 埋め込み表示
          </button>
          <button
            onClick={() => setDisplayMode('simple')}
            className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
              displayMode === 'simple'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📝 シンプル表示
          </button>
          <button
            onClick={() => setDisplayMode('manual')}
            className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
              displayMode === 'manual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ✏️ 手動表示
          </button>
        </div>
      </div>

      {/* メインスライダー */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="min-h-[400px] flex items-center justify-center p-4">
          {displayMode === 'card' && (
            <PostCard post={currentPost} />
          )}
          
          {displayMode === 'embed' && (
            <div className="w-full max-w-lg">
              <blockquote 
                className="twitter-tweet" 
                data-theme="light" 
                data-width="550" 
                data-dnt="true"
                data-conversation="none"
              >
                <a href={currentPost.postUrl} target="_blank" rel="noopener noreferrer">
                  投稿を読み込んでいます...
                </a>
              </blockquote>
            </div>
          )}
          
          {displayMode === 'simple' && (
            <div className="w-full max-w-lg bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🐦</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="font-bold text-gray-800">{currentPost.content?.author || 'Unknown User'}</h3>
                    <span className="text-sm text-gray-500">{currentPost.content?.authorHandle}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {currentPost.content?.text || 'ポスト内容が表示できません'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>❤️ {currentPost.content?.likes || 0}</span>
                      <span>🔄 {currentPost.content?.retweets || 0}</span>
                      <span>💬 {currentPost.content?.replies || 0}</span>
                    </div>
                    <a 
                      href={currentPost.postUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      元の投稿を見る
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {displayMode === 'manual' && (
            <div className="w-full max-w-lg">
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">✏️</div>
                  <h3 className="font-bold text-gray-800 mb-2">手動投稿表示</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    現在の投稿: {currentIndex + 1} / {postsData.posts.length}
                  </p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <label className="font-medium text-gray-700">投稿URL:</label>
                    <p className="text-blue-600 break-all">{currentPost.postUrl}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg">
                    <label className="font-medium text-gray-700">投稿者:</label>
                    <p className="text-gray-800">{currentPost.content?.author || 'Unknown'}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg">
                    <label className="font-medium text-gray-700">投稿内容:</label>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {currentPost.content?.text || 'コンテンツが表示できません'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setDisplayMode('card')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      📋 カード表示に切り替え
                    </button>
                    <button
                      onClick={() => setDisplayMode('embed')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      🐦 埋め込み表示に切り替え
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {postsData.posts.length > 1 && (
          <>
            {/* 前へボタン */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="前の投稿"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* 次へボタン */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="次の投稿"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* インジケーター */}
      {postsData.posts.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {postsData.posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`投稿 ${index + 1} に移動`}
            />
          ))}
        </div>
      )}

      {/* スライド情報 */}
      {postsData.posts.length > 1 && (
        <div className="text-center mt-4 text-sm text-gray-600">
          {currentIndex + 1} / {postsData.posts.length}
        </div>
      )}
    </div>
  );
}