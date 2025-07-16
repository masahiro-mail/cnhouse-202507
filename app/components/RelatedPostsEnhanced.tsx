'use client';

import { useState, useEffect } from 'react';
import TweetEmbed from './TweetEmbed';
import TweetContent from './TweetContent';
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
  };
}

interface PostsData {
  posts: Post[];
  useEmbedMethod: 'oembed' | 'manual' | 'link' | 'direct' | 'html';
}

export default function RelatedPostsEnhanced() {
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], useEmbedMethod: 'oembed' });
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
            useEmbedMethod: 'link'
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

  const getStatusIdFromUrl = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const renderPost = (post: Post) => {
    switch (postsData.useEmbedMethod) {
      case 'html':
        return <TweetContent key={post.id} id={post.id} postUrl={post.postUrl} content={post.content} />;
      case 'oembed':
        return <TweetEmbed key={post.id} tweetUrl={post.postUrl} postId={post.id} />;
      case 'manual':
        // embedHtmlがある場合は除外して手動コンテンツを表示
        const manualContent = post.content ? { ...post.content, embedHtml: undefined } : undefined;
        return <TweetContent key={post.id} id={post.id} postUrl={post.postUrl} content={manualContent} />;
      case 'direct':
        const tweetId = getStatusIdFromUrl(post.postUrl);
        return tweetId ? <DirectTweetEmbed key={post.id} tweetId={tweetId} /> : <TweetContent key={post.id} id={post.id} postUrl={post.postUrl} />;
      case 'link':
      default:
        return <TweetContent key={post.id} id={post.id} postUrl={post.postUrl} />;
    }
  };

  return (
    <div>
      {/* 方法選択UI（開発用） */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">表示方法:</h3>
        <div className="flex space-x-2 flex-wrap">
          <button
            onClick={() => setPostsData(prev => ({ ...prev, useEmbedMethod: 'html' }))}
            className={`px-3 py-1 rounded text-sm font-semibold ${
              postsData.useEmbedMethod === 'html'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎯 HTML埋め込み
          </button>
          <button
            onClick={() => setPostsData(prev => ({ ...prev, useEmbedMethod: 'manual' }))}
            className={`px-3 py-1 rounded text-sm ${
              postsData.useEmbedMethod === 'manual'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            手動コンテンツ
          </button>
          <button
            onClick={() => setPostsData(prev => ({ ...prev, useEmbedMethod: 'direct' }))}
            className={`px-3 py-1 rounded text-sm ${
              postsData.useEmbedMethod === 'direct'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            直接埋め込み
          </button>
          <button
            onClick={() => setPostsData(prev => ({ ...prev, useEmbedMethod: 'oembed' }))}
            className={`px-3 py-1 rounded text-sm ${
              postsData.useEmbedMethod === 'oembed'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            oEmbed API
          </button>
          <button
            onClick={() => setPostsData(prev => ({ ...prev, useEmbedMethod: 'link' }))}
            className={`px-3 py-1 rounded text-sm ${
              postsData.useEmbedMethod === 'link'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            リンクカード
          </button>
        </div>
      </div>

      {/* ポスト表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postsData.posts.map(renderPost)}
      </div>
    </div>
  );
}