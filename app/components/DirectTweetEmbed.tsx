'use client';

import { useEffect, useRef, useState } from 'react';

interface DirectTweetEmbedProps {
  tweetId: string;
}

export default function DirectTweetEmbed({ tweetId }: DirectTweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;
    
    const loadTwitterWidget = async () => {
      try {
        // スクリプトが既に読み込まれているかチェック
        if (!(window as any).twttr?.widgets && !scriptLoadedRef.current) {
          scriptLoadedRef.current = true;
          
          // Twitterスクリプトを動的に追加
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://platform.twitter.com/widgets.js';
          script.charset = 'utf-8';
          
          // スクリプト読み込み完了を待機
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Twitter script load failed'));
            document.head.appendChild(script);
          });
        }

        // Twitter API が利用可能になるまで待機
        let attempts = 0;
        while (!(window as any).twttr?.widgets && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!(window as any).twttr?.widgets) {
          throw new Error('Twitter widgets API not available');
        }

        // コンポーネントがアンマウントされていないかチェック
        if (!isMounted || !containerRef.current) return;

        // コンテナをクリア
        containerRef.current.innerHTML = '';
        
        // ツイートを埋め込み
        const tweetElement = await (window as any).twttr.widgets.createTweet(
          tweetId,
          containerRef.current,
          {
            theme: 'light',
            width: 550,
            dnt: true,
            conversation: 'none'
          }
        );
        
        if (tweetElement && isMounted) {
          setIsLoaded(true);
        } else if (isMounted) {
          setError(true);
        }
      } catch (err) {
        console.error('Twitter埋め込みエラー:', err);
        if (isMounted) {
          setError(true);
        }
      }
    };

    // タイムアウトを設定（15秒で失敗とみなす）
    timeoutId = setTimeout(() => {
      if (!isLoaded && isMounted) {
        setError(true);
      }
    }, 15000);

    // 初期状態をリセット
    setIsLoaded(false);
    setError(false);

    loadTwitterWidget();

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [tweetId]);

  if (error) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg border border-blue-100 max-w-md w-full">
          <div className="text-center">
            <div className="text-4xl mb-4">🐦</div>
            <p className="text-gray-600 mb-4">ツイートの読み込みに失敗しました</p>
            <a
              href={`https://x.com/i/status/${tweetId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <span>Xで見る</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4">
      <div ref={containerRef} className="w-full max-w-lg">
        {!isLoaded && (
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg border border-blue-100 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">ツイートを読み込んでいます...</p>
          </div>
        )}
      </div>
    </div>
  );
}