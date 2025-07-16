'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

interface Post {
  id: number;
  postUrl: string;
}

export default function RelatedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/data/posts.json');
        const data = await response.json();
        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (error) {
        console.error('関連ポストの読み込みに失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getStatusIdFromUrl = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const loadTwitterEmbed = () => {
    if (typeof window !== 'undefined' && (window as any).twttr?.widgets) {
      console.log('Loading Twitter widgets...');
      (window as any).twttr.widgets.load();
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      const timer = setTimeout(() => {
        loadTwitterEmbed();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [posts]);

  const handleTwitterScriptLoad = () => {
    console.log('Twitter script loaded');
    // スクリプト読み込み後にTwitterウィジェットを初期化
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).twttr) {
        (window as any).twttr.ready((twttr: any) => {
          console.log('Twitter widgets ready');
          twttr.widgets.load();
        });
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
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
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="beforeInteractive"
        onLoad={handleTwitterScriptLoad}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const statusId = getStatusIdFromUrl(post.postUrl);
          
          return (
            <div key={post.id} className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100">
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
                    #{statusId?.slice(-6)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">クリックでXの投稿を開きます</p>
              </div>
              
              <a 
                href={post.postUrl} 
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
        })}
      </div>
    </>
  );
}