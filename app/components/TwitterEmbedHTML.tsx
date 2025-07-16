'use client';

import { useEffect } from 'react';

interface TwitterEmbedHTMLProps {
  embedHtml: string;
}

export default function TwitterEmbedHTML({ embedHtml }: TwitterEmbedHTMLProps) {
  useEffect(() => {
    // Twitter Widgets scriptを動的に読み込み
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    
    // 既に読み込まれているかチェック
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      document.head.appendChild(script);
    }

    script.onload = () => {
      // Twitter widgets を初期化
      if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load();
      }
    };

    // 既に読み込まれている場合は即座に初期化
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [embedHtml]);

  return (
    <div 
      className="flex justify-center my-4"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
}