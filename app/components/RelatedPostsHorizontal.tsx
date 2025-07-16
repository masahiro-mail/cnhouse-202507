'use client';

import { useState, useEffect } from 'react';
import DirectTweetEmbed from './DirectTweetEmbed';

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

// CSS アニメーションを動的に追加
const addScrollAnimation = () => {
  const styleId = 'posts-scroll-animation';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes scroll-posts {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .animate-scroll-posts {
        animation: scroll-posts 30s linear infinite;
      }
      .animate-scroll-posts:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
  }
};

export default function RelatedPostsHorizontal() {
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], useEmbedMethod: 'direct' });
  const [loading, setLoading] = useState(true);

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
    addScrollAnimation();
  }, []);

  const getStatusIdFromUrl = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

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

  return (
    <div className="relative overflow-hidden">
      {/* 横スクロールアニメーション */}
      <div className="flex animate-scroll-posts">
        {/* ポストを2回繰り返してシームレスなループを作成 */}
        {[...postsData.posts, ...postsData.posts].map((post, index) => {
          const tweetId = getStatusIdFromUrl(post.postUrl);
          return (
            <div
              key={`${post.id}-${index}`}
              className="flex-shrink-0 w-80 mx-4"
            >
              {tweetId ? (
                <DirectTweetEmbed tweetId={tweetId} />
              ) : (
                <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg border border-blue-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🐦</div>
                    <p className="text-gray-600 mb-4">投稿を読み込んでいます...</p>
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Xで見る →
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* グラデーション効果（左右の境界をぼかす） */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white via-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white via-white to-transparent pointer-events-none z-10"></div>
    </div>
  );
}