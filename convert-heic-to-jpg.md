# HEIC to JPG Conversion Guide

## 📋 現状分析
現在、`/public/images/posts/`フォルダには以下のファイルがあります：

### ✅ JPGファイル（既に使用可能）
- IMG_4369.JPG
- IMG_4370.JPG
- IMG_4371.JPG
- IMG_4372.JPG
- IMG_4373.JPG
- IMG_4376.JPG

### 🔄 HEICファイル（変換が必要）
- IMG_4269.HEIC
- IMG_4271.HEIC
- IMG_4275.HEIC
- IMG_4281.heic
- IMG_4286.HEIC
- IMG_4291.HEIC
- IMG_4293.HEIC
- IMG_4296.HEIC
- IMG_4297.HEIC
- IMG_4301.HEIC
- IMG_4303.HEIC
- IMG_4305.HEIC
- IMG_4307.HEIC
- IMG_4314.HEIC
- IMG_4318.HEIC
- IMG_4319.HEIC
- IMG_4320.HEIC
- IMG_4321.HEIC
- IMG_4325.HEIC
- IMG_4326.HEIC
- IMG_4328.HEIC
- IMG_4330.HEIC
- IMG_4331.HEIC
- IMG_4334.HEIC
- IMG_4335.HEIC
- IMG_4336.HEIC
- IMG_4340.HEIC
- IMG_4346.HEIC
- IMG_4347.HEIC
- IMG_4354.HEIC
- IMG_4365.HEIC

## 🛠️ 変換方法

### Method 1: ImageMagick使用
```bash
# ImageMagickインストール（Ubuntu/WSL）
sudo apt update
sudo apt install imagemagick

# 単一ファイル変換
magick IMG_4269.HEIC IMG_4269.JPG

# 一括変換
cd /home/masahiro54/20250608_ClaudeCode/20250626_CNHouseLp/cnp-summer-camp-lp/public/images/posts/
for file in *.HEIC *.heic; do
  magick "$file" "${file%.*}.JPG"
done
```

### Method 2: FFmpeg使用
```bash
# FFmpegインストール
sudo apt install ffmpeg

# 単一ファイル変換
ffmpeg -i IMG_4269.HEIC IMG_4269.JPG

# 一括変換
for file in *.HEIC *.heic; do
  ffmpeg -i "$file" "${file%.*}.JPG"
done
```

### Method 3: オンライン変換ツール
1. https://convertio.co/heic-jpg/
2. https://heictojpg.com/
3. ファイルを選択してアップロード
4. 変換後にダウンロード

## 📝 実装済み対応

### 現在の状況
- **JSONファイル**: 既にJPG拡張子を使用
- **画像ギャラリー**: JPGファイルのみを表示
- **エラー回避**: HEICファイルは表示に使用していない

### 推奨アクション
1. **既存のJPGファイル**: そのまま使用（6ファイル）
2. **HEICファイル**: 必要に応じて手動またはバッチ変換
3. **JSONファイル**: 追加の画像が必要な場合のみ更新

## 🚀 追加画像を使用する場合

### 新しいJPGファイルを追加
```json
{
  "id": 7,
  "filename": "IMG_4269.JPG",
  "alt": "合宿の思い出",
  "caption": "楽しかった瞬間",
  "uploadedAt": "2025-07-12T18:00:00Z"
}
```

### 変換後のファイル管理
- 元のHEICファイル: 削除または別フォルダに移動
- 新しいJPGファイル: `/public/images/posts/`に配置
- JSONファイル: 新しいエントリを追加

## ✅ 完了状況
- ✅ JSONファイルでJPG拡張子使用
- ✅ 既存の6つのJPGファイルが正常動作
- ✅ 写真ギャラリーの横スクロール実装
- ⏳ HEICファイルの変換は必要に応じて実行