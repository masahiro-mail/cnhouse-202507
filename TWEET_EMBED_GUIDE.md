# X(Twitter) ポスト埋め込み実装ガイド

## 📋 概要
このドキュメントでは、CNPトレカ合宿LPサイトにX（旧Twitter）のポスト内容を埋め込む3つの方法を説明します。

## 🎯 実装された方法

### 1. **oEmbed API方式**（推奨）
- **ファイル**: `app/components/TweetEmbed.tsx`
- **メリット**: 公式API、自動更新、無料
- **デメリット**: CORS制限、API制限の可能性

```typescript
// oEmbed APIを使用してツイート内容を取得
const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}`;
```

### 2. **手動コンテンツ管理**（最も確実）
- **ファイル**: `app/components/TweetContent.tsx`
- **データ**: `public/data/posts-enhanced.json`
- **メリット**: 完全制御、高速表示、カスタマイズ可能
- **デメリット**: 手動更新が必要

```json
{
  "content": {
    "text": "ツイート内容",
    "author": "投稿者名",
    "authorHandle": "@handle",
    "timestamp": "2025-07-10T14:30:00Z",
    "images": ["image1.jpg"],
    "likes": 42,
    "retweets": 12,
    "replies": 8
  }
}
```

### 3. **リンクカード方式**（フォールバック）
- **ファイル**: `app/components/RelatedPosts.tsx`
- **メリット**: 確実に動作、シンプル
- **デメリット**: ツイート内容が表示されない

## 🔧 使用方法

### 拡張版コンポーネントの使用
```typescript
import RelatedPostsEnhanced from './components/RelatedPostsEnhanced';

// ページ内で使用
<RelatedPostsEnhanced />
```

### 表示方法の切り替え
1. **oEmbed API**: 自動的にツイート内容を取得
2. **手動コンテンツ**: JSONファイルからカスタムコンテンツを表示
3. **リンクカード**: 基本的なリンクボタンを表示

## 📁 ファイル構成

```
app/
├── components/
│   ├── TweetEmbed.tsx          # oEmbed API実装
│   ├── TweetContent.tsx        # 手動コンテンツ表示
│   ├── RelatedPostsEnhanced.tsx # 統合コンポーネント
│   └── RelatedPosts.tsx        # 従来版（リンクカード）
└── page.tsx                    # メインページ

public/
└── data/
    ├── posts.json              # 基本ポストデータ
    └── posts-enhanced.json     # 拡張ポストデータ
```

## 🎨 手動コンテンツ追加方法

### 1. posts-enhanced.jsonの編集
```json
{
  "useEmbedMethod": "manual",
  "posts": [
    {
      "id": 7,
      "postUrl": "https://x.com/username/status/1234567890",
      "content": {
        "text": "新しいツイート内容",
        "author": "投稿者名",
        "authorHandle": "@username",
        "timestamp": "2025-07-15T12:00:00Z",
        "images": ["/images/tweet-image.jpg"],
        "likes": 25,
        "retweets": 5,
        "replies": 3
      }
    }
  ]
}
```

### 2. 画像の追加
1. `public/images/tweets/` フォルダに画像を配置
2. JSONファイルで画像パスを指定

### 3. 表示方法の設定
- `useEmbedMethod`: "oembed" | "manual" | "link"

## 💡 推奨設定

### 本番環境
```json
{
  "useEmbedMethod": "manual"
}
```

### 開発環境
```json
{
  "useEmbedMethod": "oembed"
}
```

## 🔍 トラブルシューティング

### oEmbed APIが動作しない場合
1. CORS制限の確認
2. プロキシサーバーの設定確認
3. 手動コンテンツ方式への切り替え

### 画像が表示されない場合
1. 画像パスの確認
2. ファイル存在確認
3. Next.js画像最適化設定の確認

## 📈 パフォーマンス最適化

### 1. 画像最適化
```typescript
<Image
  src={image}
  alt="画像説明"
  width={400}
  height={300}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 2. 遅延読み込み
```typescript
const [loading, setLoading] = useState(true);
```

### 3. エラーハンドリング
```typescript
try {
  const response = await fetch(url);
  // 処理
} catch (error) {
  console.error('エラー:', error);
  // フォールバック表示
}
```

## 🚀 今後の拡張案

1. **Twitter API v2対応**: 有料プランでより多機能な実装
2. **リアルタイム更新**: WebSocketを使用した自動更新
3. **統計情報拡張**: より詳細なエンゲージメント情報の表示
4. **画像ギャラリー**: ツイート画像のスライドショー表示

## 🔒 セキュリティ考慮事項

1. **XSS対策**: `dangerouslySetInnerHTML`の安全な使用
2. **外部リンク**: `rel="noopener noreferrer"`の設定
3. **API制限**: レート制限の遵守

## 📞 サポート

実装に関する質問や問題がある場合は、開発チームまでお問い合わせください。