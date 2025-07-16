'use client';

import { useEffect, useRef, useState } from 'react';

interface SimpleTweetEmbedProps {
  tweetId: string;
}

export default function SimpleTweetEmbed({ tweetId }: SimpleTweetEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Twitter Widget スクリプトを一度だけ読み込み
    if (!(window as any).twttr) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      script.onload = () => {
        setShowEmbed(true);
        // スクリプトロード後に埋め込みを実行
        if ((window as any).twttr?.widgets) {
          (window as any).twttr.widgets.load();
        }
      };
      document.head.appendChild(script);
    } else {
      setShowEmbed(true);
      // 既にスクリプトが読み込まれている場合
      setTimeout(() => {
        if ((window as any).twttr?.widgets) {
          (window as any).twttr.widgets.load();
        }
      }, 100);
    }
  }, []);

  if (!showEmbed) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg border border-blue-100 text-center w-full max-w-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">ツイートを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-4" ref={embedRef}>
      <blockquote 
        className="twitter-tweet" 
        data-theme="light" 
        data-width="550" 
        data-dnt="true"
        data-conversation="none"
      >
        <p lang="ja" dir="ltr">
          <a href={`https://x.com/i/status/${tweetId}`} target="_blank" rel="noopener noreferrer">
            投稿を読み込んでいます...
          </a>
        </p>
      </blockquote>
    </div>
  );
}