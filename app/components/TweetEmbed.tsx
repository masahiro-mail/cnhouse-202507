'use client';

import { useState, useEffect } from 'react';

interface TweetEmbedProps {
  tweetUrl: string;
  postId: number;
}

interface OEmbedResponse {
  html: string;
  author_name: string;
  author_url: string;
  cache_age: number;
  height: number;
  width: number;
  type: string;
  version: string;
}

export default function TweetEmbed({ tweetUrl, postId }: TweetEmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTweetEmbed = async () => {
      try {
        // oEmbed APIを使用してツイート内容を取得
        const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&theme=light&hide_thread=true&omit_script=true&maxwidth=550`;
        
        console.log('Fetching oEmbed for:', tweetUrl);
        console.log('oEmbed URL:', oembedUrl);
        
        // 複数のプロキシサーバーを試行
        const proxyUrls = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(oembedUrl)}`,
          `https://cors-anywhere.herokuapp.com/${oembedUrl}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(oembedUrl)}`
        ];
        
        let response;
        let data: OEmbedResponse | null = null;
        
        for (const proxyUrl of proxyUrls) {
          try {
            console.log('Trying proxy:', proxyUrl);
            response = await fetch(proxyUrl);
            if (response.ok) {
              data = await response.json();
              console.log('oEmbed response:', data);
              break;
            }
          } catch (proxyError) {
            console.warn('Proxy failed:', proxyUrl, proxyError);
            continue;
          }
        }
        
        if (!data) {
          throw new Error('All proxy servers failed');
        }
        
        if (data.html) {
          setEmbedHtml(data.html);
        } else {
          throw new Error('埋め込みHTMLが取得できませんでした');
        }
      } catch (err) {
        console.error('oEmbed fetch error:', err);
        setError('ツイートの埋め込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchTweetEmbed();
  }, [tweetUrl]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-200 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-blue-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-blue-200 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
        <div className="mt-4 h-20 bg-blue-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error || !embedHtml) {
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
              #{postId}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">クリックでXの投稿を開きます</p>
        </div>
        
        <a 
          href={tweetUrl} 
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

  return (
    <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
      <div 
        className="twitter-embed-container"
        dangerouslySetInnerHTML={{ __html: embedHtml }}
      />
    </div>
  );
}