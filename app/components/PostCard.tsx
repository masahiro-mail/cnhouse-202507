'use client';

interface PostCardProps {
  post: {
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
  };
}

export default function PostCard({ post }: PostCardProps) {
  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  if (!post.content) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 shadow-lg border border-blue-100 max-w-md w-full mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-4">🐦</div>
          <p className="text-gray-600 mb-4">投稿の詳細を読み込めませんでした</p>
          <a
            href={post.postUrl}
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
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-md w-full mx-auto">
      {/* ヘッダー */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {post.content.author.charAt(0)}
        </div>
        <div className="ml-3 flex-1">
          <div className="font-bold text-gray-900">{post.content.author}</div>
          <div className="text-sm text-gray-500">{post.content.authorHandle}</div>
        </div>
        <div className="text-sm text-gray-500">
          {formatTimestamp(post.content.timestamp)}
        </div>
      </div>

      {/* 投稿内容 */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content.text}
        </p>
      </div>

      {/* 画像（あれば） */}
      {post.content.images && post.content.images.length > 0 && (
        <div className="mb-4">
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
            <span className="text-gray-500">📷 画像付き投稿</span>
          </div>
        </div>
      )}

      {/* エンゲージメント */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          {post.content.replies && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.content.replies}
            </span>
          )}
          {post.content.retweets && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {post.content.retweets}
            </span>
          )}
          {post.content.likes && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.content.likes}
            </span>
          )}
        </div>
      </div>

      {/* Xで見るリンク */}
      <div className="pt-3 border-t border-gray-100">
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>Xで見る</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}