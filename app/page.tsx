'use client';

import React, { useEffect } from 'react';
import PhotoGallery from './components/PhotoGallery';

// Twitter型定義
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export default function Home() {
  useEffect(() => {
    // 既存のスクリプトをチェック
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
    if (!existingScript) {
      // Twitter Widgets APIを動的に読み込み
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      script.charset = 'utf-8';
      document.body.appendChild(script);
    } else {
      // 既存のスクリプトがある場合はTwitter Widgetsを再初期化
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }

    // カルーセル機能の実装
    let currentSlide = 0;
    const totalSlides = 6;
    let autoSlideInterval: NodeJS.Timeout;

    const carousel = document.getElementById('tweets-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');

    // スライドを移動する関数
    const goToSlide = (slideIndex: number) => {
      if (!carousel) return;
      
      currentSlide = slideIndex;
      const translateX = -slideIndex * 100;
      carousel.style.transform = `translateX(${translateX}%)`;
      
      // インジケーターを更新
      indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
          indicator.classList.add('active');
          indicator.classList.remove('bg-white/30');
          indicator.classList.add('bg-white/50');
        } else {
          indicator.classList.remove('active');
          indicator.classList.remove('bg-white/50');
          indicator.classList.add('bg-white/30');
        }
      });
    };

    // 次のスライドに移動
    const nextSlide = () => {
      const next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    };

    // 前のスライドに移動
    const prevSlide = () => {
      const prev = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(prev);
    };

    // 自動スライドを開始
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 3000); // 3秒間隔
    };

    // 自動スライドを停止
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    };

    // イベントリスナーの設定
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide(); // 手動操作後に自動スライドを再開
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide(); // 手動操作後に自動スライドを再開
      });
    }

    // インジケーターのクリックイベント
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(index);
        startAutoSlide(); // 手動操作後に自動スライドを再開
      });
    });

    // マウスホバーで自動スライドを一時停止
    const carouselContainer = carousel?.parentElement;
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // 自動スライドを開始
    startAutoSlide();

    // クリーンアップ関数
    return () => {
      stopAutoSlide();
      if (nextBtn) nextBtn.removeEventListener('click', nextSlide);
      if (prevBtn) prevBtn.removeEventListener('click', prevSlide);
      indicators.forEach((indicator, index) => {
        indicator.removeEventListener('click', () => goToSlide(index));
      });
      if (carouselContainer) {
        carouselContainer.removeEventListener('mouseenter', stopAutoSlide);
        carouselContainer.removeEventListener('mouseleave', startAutoSlide);
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-green-50">
      {/* Header Section / First View */}
      <section className="relative bg-gradient-to-r from-sky-300 to-blue-400 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-30 animate-float"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white rounded-full opacity-15 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">
              最高の夏は、すぐそこに！<br />
              <span className="text-orange-300">ワイガヤ😊CNPトレカ合宿 2025</span><br />
              <span className="text-xl sm:text-2xl md:text-4xl">in 高知・CNハウス 無事終了しました！</span><br />
              <span className="text-xl sm:text-2xl md:text-4xl">素晴らしい思い出をありがとうございました！</span>
            </h1>

            <div className="bg-white/90 text-gray-800 rounded-2xl p-8 shadow-lg backdrop-blur-sm mb-8">
              <p className="text-lg mb-6">
                2025年7月12日～13日の、2日間にわたって開催された「CNPトレカ合宿」が無事終了しました。<br />
                参加者の皆さん、本当にありがとうございました！
              </p>
              
              <p className="text-xl mb-6 font-medium">
                素晴らしい仲間たちとの出会い、美しい自然、美味しい料理、そして熱いトレカバトル…<br />
                この経験は、きっとみんなの心に永遠に残ることでしょう。
              </p>
              
              <p className="text-lg font-medium text-green-700">
                また次回の企画でお会いできることを楽しみにしています！
              </p>
            </div>

            {/* Photo Gallery Section */}
            <div className="mt-12">
              <PhotoGallery />
            </div>

            {/* Related Posts Section */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">📝 みんなのつぶやきをチェック</h2>
              
              {/* カルーセルコンテナ */}
              <div className="relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  id="tweets-carousel"
                  style={{transform: 'translateX(0%)'}}
                >
                  {/* Tweet 1 - 図解師★ウルフ */}
                  <div className="w-full flex-shrink-0 flex justify-center px-4">
                    <div dangerouslySetInnerHTML={{
                      __html: `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">CNPトレカ合宿＠クリプトニンジャハウスin高知‼️<br><br>全てのスケジュールを終えて先ほど無事に終了いたしました🎊<br><br>遠方からご参加の皆様…現地でご対応頂いた皆様…本当に本当にありがとうございました！心よりお礼申し上げます🙇<br><br>本山町…自然もおいしいものもたくさんあり、超絶魅力的な場所でした😊… <a href="https://t.co/VGEAgxsG8W">pic.twitter.com/VGEAgxsG8W</a></p>&mdash; 図解師★ウルフ🐺/DiagramMaster_Wolf (@Diagram_Wolf) <a href="https://twitter.com/Diagram_Wolf/status/1944299924977594763?ref_src=twsrc%5Etfw">July 13, 2025</a></blockquote>`
                    }} />
                  </div>

                  {/* Tweet 2 - Beard-Bear */}
                  <div className="w-full flex-shrink-0 flex justify-center px-4">
                    <div dangerouslySetInnerHTML={{
                      __html: `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">リツトシェフの絶品 <a href="https://twitter.com/hashtag/%E3%83%AA%E3%83%84%E3%83%88%E9%A3%AF?src=hash&amp;ref_src=twsrc%5Etfw">#リツト飯</a> を囲んで飲んで眠たい目擦りながら朝釣りして <a href="https://twitter.com/hashtag/CNP%E3%83%88%E3%83%AC%E3%82%AB?src=hash&amp;ref_src=twsrc%5Etfw">#CNPトレカ</a> みんなでプレイして土佐あかうしのランチしてめっちゃ楽しい週末でした！<br><br>トレカ合宿の割にメシ成分多めなのは気にしない🤣<br><br>みなさんお越し頂きありがとうございました✨またきてねー！！<a href="https://twitter.com/hashtag/%E3%83%8B%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%8F%E3%82%A6%E3%82%B9%E6%97%A5%E8%A8%98?src=hash&amp;ref_src=twsrc%5Etfw">#ニンジャハウス日記</a> <a href="https://t.co/vGxOpeO5VB">pic.twitter.com/vGxOpeO5VB</a></p>&mdash; 𝘽𝙚𝙖𝙧𝙙-𝘽𝙚𝙖𝙧 🐻高知県本山町ニンジャハウス (@VoxelMotors) <a href="https://twitter.com/VoxelMotors/status/1944350458715226207?ref_src=twsrc%5Etfw">July 13, 2025</a></blockquote>`
                    }} />
                  </div>

                  {/* Tweet 3 - 林さん (ハガツオ) */}
                  <div className="w-full flex-shrink-0 flex justify-center px-4">
                    <div dangerouslySetInnerHTML={{
                      __html: `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ハガツオ、頂きます！幸せすぎる🥰<a href="https://twitter.com/hashtag/%E3%83%8B%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%8F%E3%82%A6%E3%82%B9?src=hash&amp;ref_src=twsrc%5Etfw">#ニンジャハウス</a> <a href="https://t.co/x2W5lZPwSn">pic.twitter.com/x2W5lZPwSn</a></p>&mdash; 林｜CNPトレカアンバサダー (@kabuco_h) <a href="https://twitter.com/kabuco_h/status/1943960900815249766?ref_src=twsrc%5Etfw">July 12, 2025</a></blockquote>`
                    }} />
                  </div>

                  {/* Tweet 4 - 林さん (朝釣り) */}
                  <div className="w-full flex-shrink-0 flex justify-center px-4">
                    <div dangerouslySetInnerHTML={{
                      __html: `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">高知の山奥で朝釣り！最高に気持ちよくて楽しかったです🥰 <a href="https://t.co/NvusyJfzeQ">pic.twitter.com/NvusyJfzeQ</a></p>&mdash; 林｜CNPトレカアンバサダー (@kabuco_h) <a href="https://twitter.com/kabuco_h/status/1944164324131713502?ref_src=twsrc%5Etfw">July 12, 2025</a></blockquote>`
                    }} />
                  </div>

                  {/* Tweet 5 - 林さん (リツトさんの料理) */}
                  <div className="w-full flex-shrink-0 flex justify-center px-4">
                    <div dangerouslySetInnerHTML={{
                      __html: `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ヤバい。リツトさんの料理が美味しすぎます！バイブコーディング合宿でこれが食べられるかも！？ <a href="https://t.co/u3Hj4XexWw">https://t.co/u3Hj4XexWw</a> <a href="https://t.co/I9Fhb2LqWC">pic.twitter.com/I9Fhb2LqWC</a></p>&mdash; 林｜CNPトレカアンバサダー (@kabuco_h) <a href="https://twitter.com/kabuco_h/status/1943988130329375032?ref_src=twsrc%5Etfw">July 12, 2025</a></blockquote>`
                    }} />
                  </div>

                  {/* Tweet 6 - もかやもさん */}
                  <div className="w-full flex-shrink-0 flex justify-center px-4">
                    <div dangerouslySetInnerHTML={{
                      __html: `<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">CNPトレカ合宿 in 高知・CNハウスめちゃくちゃ楽しかった！<br>本当いい場所、いいメンバーでした✨<br>また遊びに行きます🥳 <a href="https://t.co/R676BiYgY7">pic.twitter.com/R676BiYgY7</a></p>&mdash; もかやも (@mokayamo) <a href="https://twitter.com/mokayamo/status/1944309819785252866?ref_src=twsrc%5Etfw">July 13, 2025</a></blockquote>`
                    }} />
                  </div>
                </div>
                
                {/* ナビゲーション矢印 */}
                <button 
                  id="prev-btn"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 z-10"
                >
                  ←
                </button>
                <button 
                  id="next-btn"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 z-10"
                >
                  →
                </button>
                
                {/* インジケーター */}
                <div className="flex justify-center mt-6 space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white/50 indicator active cursor-pointer hover:bg-white/70 transition-all duration-200" data-slide="0"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30 indicator cursor-pointer hover:bg-white/50 transition-all duration-200" data-slide="1"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30 indicator cursor-pointer hover:bg-white/50 transition-all duration-200" data-slide="2"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30 indicator cursor-pointer hover:bg-white/50 transition-all duration-200" data-slide="3"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30 indicator cursor-pointer hover:bg-white/50 transition-all duration-200" data-slide="4"></div>
                  <div className="w-2 h-2 rounded-full bg-white/30 indicator cursor-pointer hover:bg-white/50 transition-all duration-200" data-slide="5"></div>
                </div>
              </div>
            </div>

            {/* Next Year Announcement */}
            <div className="mt-16 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  【そして伝説へ⋯】<br />
                  「ワイガヤCNPトレカ合宿 in 高知 2026」開催決定🎉
                </h2>
                <p className="text-lg mb-4">
                  CNPトレカ合宿⋯来年も開催します！スケジュールは決まり次第、早めに告知いたします。<br />
                  多数のご参加、お待ちしています✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 Event Details Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            【2025年の企画概要】
          </h2>
          
          <div className="bg-white/90 text-gray-800 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm mb-12">
            <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 font-medium">
              「今年の夏に、CNPトレカの思い出を作りたい！」<br />
              「大好きなCNPトレカに没頭したい！」<br />
              「7月の大会に向けて、たくさん練習したい！」
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6">
              そんなあなたに、とっておきのお知らせです！
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6">
              高知の豊かな自然に囲まれた「クリプトニンジャハウス」を拠点に、CNPトレカをとことん楽しむ1泊2日の合宿を企画しました！
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6">
              初心者さんからベテランさんまで、とにかく「楽しい！」を共有したい仲間を大募集！<br />
              みんなでカードで遊んで、美味しいごはんを食べて、語り合って…<br />
              まるで家族や親戚と過ごす夏休みのような、心温まる2日間にしませんか？
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">
              最高の夏の1ページを、私たちと一緒に作りましょう！
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            ✨この合宿の魅力ポイント！✨
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-200">
              <div className="text-4xl mb-4 text-center animate-bounce">🌳</div>
              <h3 className="text-xl font-bold mb-3 text-center text-green-700">自然の中でトレカ三昧！</h3>
              <p className="text-gray-700">
                広々とした快適な空間で、心ゆくまでCNPトレカを楽しめます。仲間との対戦やデッキ相談で、盛り上がること間違いなし！
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <div className="text-4xl mb-4 text-center animate-pulse">🏠</div>
              <h3 className="text-xl font-bold mb-3 text-center text-orange-700">宿泊は、憧れの「CNハウス」！</h3>
              <p className="text-gray-700">
                なんと、あのクリプトニンジャハウスに無料で宿泊できます！木のぬくもりに包まれて過ごす夜は、きっと忘れられない思い出になりますよ。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-red-200">
              <div className="text-4xl mb-4 text-center animate-bounce">🍖</div>
              <h3 className="text-xl font-bold mb-3 text-center text-red-700">夜はみんなでBBQ！</h3>
              <p className="text-gray-700">
                1日目の夜は、イケハヤさんとBBQの予定🥩（イケハヤさん！お世話になります！🙇‍♂️）満点の星空の下で、美味しいお肉と楽しいおしゃべりを満喫しましょう！
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-200">
              <div className="text-4xl mb-4 text-center animate-pulse">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-center text-blue-700">新しい仲間との出会い！</h3>
              <p className="text-gray-700">
                現地組、東京組、大阪組…各地からCNPを愛する素敵な仲間が集まります！この合宿が、新しい繋がりのきっかけになるかも？
              </p>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              🗓️イベント詳細
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">イベント名</h3>
                <p className="text-lg mb-6">【7/12-13 ワイガヤ😊CNPトレカ合宿@CNハウス】</p>
                
                <h3 className="text-xl font-bold text-green-600 mb-4">日程</h3>
                <p className="text-lg mb-6">2025年7月12日(土) ～ 13日(日)</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-4">場所</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">宿泊先：</p>
                    <p>クリプトニンジャハウス (高知県長岡郡本山町)</p>
                    <p className="text-sm text-gray-600">※宿泊費無料！ただしレンタル布団代が別途必要かも</p>
                  </div>
                  <div>
                    <p className="font-semibold">プレイ場所：</p>
                    <p>本山町プラチナセンター (7/13終日予約済み)</p>
                    <p className="text-sm text-gray-600">〒781-3601 高知県長岡郡本山町本山569-1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              ⏰タイムスケジュール（案）
            </h2>
            
            <div className="space-y-8">
              {/* Day 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-6">◯ 1日目：7月12日(土)</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">9:00頃</span>
                    <span>大阪組 出発🚗 → 途中でのんびりランチ♪</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">14:00頃</span>
                    <span>CNハウスに到着！</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">夕方まで</span>
                    <span>早速トレカで遊ぶもよし！のどかな町を散策するもよし！</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">夜ごはん</span>
                    <span>☀️晴れたらみんなでBBQ！ / ☔️雨ならCNハウスでワイワイごはん会！</span>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-6">◯ 2日目：7月13日(日)</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">午前</span>
                    <span>朝ごはんを食べたら、本山町プラチナセンターへ移動！</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">9:00～</span>
                    <span>思う存分トレカタイム！🔥</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">～</span>
                    <span>自由解散（最大17:00まで遊べます！）</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="font-bold text-orange-600 min-w-[80px]">14:00頃</span>
                    <span>大阪組は出発予定。また会う日まで！</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            🙋‍♂️参加メンバー
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg mb-8 text-gray-700">多くのご参加ありがとうございました🙇‍♂️</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-green-600 mb-4 text-center">現地組</h3>
                <ul className="space-y-2 text-center">
                  <li>イケハヤさん</li>
                  <li>リツトさん</li>
                  <li>おおみきりんさん</li>
                  <li>Parabellさん</li>
                  <li>BEARD-BEARさん&Kirinさんご家族</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">現地合流組</h3>
                <ul className="space-y-2 text-center">
                  <li>ryujiさん</li>
                  <li>もかやもさん</li>
                  <li>かまさん</li>
                  <li>まつりかさんご家族</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-4 text-center">大阪組</h3>
                <ul className="space-y-2 text-center">
                  <li>ヒヨコロさん</li>
                  <li>まつこーにさん</li>
                  <li>林さん</li>
                  <li>図解師★ウルフ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">CNPトレカ合宿 2025 in 高知・CNハウス</p>
          <p className="text-sm text-gray-400 mt-2">最高の夏の思い出をありがとうございました！</p>
        </div>
      </footer>
    </div>
  );
}