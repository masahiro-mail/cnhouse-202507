export default function Home() {
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
              <span className="text-orange-300">ワイガヤ😊CNPトレカ合宿</span><br />
              <span className="text-xl sm:text-2xl md:text-4xl">in 高知・CNハウス 参加者大募集！</span>
            </h1>
            
            <div className="bg-white/90 text-gray-800 rounded-2xl p-6 md:p-8 shadow-lg backdrop-blur-sm">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
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
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            🗓️イベント詳細
          </h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-2">イベント名</h3>
                <p className="text-lg text-gray-700">【7/12-13 ワイガヤ😊CNPトレカ合宿@CNハウス】</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-2">日程</h3>
                <p className="text-lg font-bold text-gray-700">2025年7月12日(土) ～ 13日(日)</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-orange-600 mb-2">場所</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>宿泊先：</strong> クリプトニンジャハウス (高知県長岡郡本山町) ※宿泊費無料！ただしレンタル布団代が別途必要かも</p>
                  <p><strong>プレイ場所：</strong> 本山町プラチナセンター (7/13終日予約済み)</p>
                  <p className="text-sm text-gray-600">〒781-3601 高知県長岡郡本山町本山569-1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            ⏰タイムスケジュール（案）
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Day 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-6">◯ 1日目：7月12日(土)</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">9:00頃</span>
                  <span className="text-gray-700">大阪組 出発🚗 → 途中でのんびりランチ♪</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">14:00頃</span>
                  <span className="font-bold text-gray-700">CNハウスに到着！</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">夕方まで</span>
                  <span className="font-bold text-gray-700">早速トレカで遊ぶもよし！のどかな町を散策するもよし！</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">夜ごはん</span>
                  <span className="font-bold text-gray-700">☀️晴れたらみんなでBBQ！ / ☔️雨ならCNハウスでワイワイごはん会！</span>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">◯ 2日目：7月13日(日)</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">午前</span>
                  <span className="font-bold text-gray-700">朝ごはんを食べたら、本山町プラチナセンターへ移動！</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">9:00～</span>
                  <span className="font-bold text-gray-700">思う存分トレカタイム！🔥</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">～</span>
                  <span className="font-bold text-gray-700">自由解散（最大17:00まで遊べます！）</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="font-bold text-orange-600 min-w-[80px]">14:00頃</span>
                  <span className="font-bold text-gray-700">大阪組は出発予定。また会う日まで！</span>
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
            🙋‍♂️参加予定メンバー (7/4時点)
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg mb-8 text-gray-700">すでにこんなに楽しい仲間が集まっています！</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">現地組</h3>
                <ul className="space-y-2 text-center text-gray-700">
                  <li>イケハヤさん</li>
                  <li>リツトさん</li>
                  <li>おおみきりんさん</li>
                  <li>Parabellさん</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">現地合流組</h3>
                <ul className="space-y-2 text-gray-700 text-center">
                  <li>ryujiさん</li>
                  <li>もかやもさん</li>
                  <li>かまさん</li>
                  <li>まつりかさん(7/13のみ）</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-4 text-center">大阪組</h3>
                <ul className="space-y-2  text-gray-700 text-center">
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

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-orange-400 to-red-400 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              【宿泊参加表明は7/5（土）まで】あと数名参加可能！気になる方はDMを✉️
            </h2>
            
            <div className="bg-white/90 text-gray-800 rounded-2xl p-8 shadow-lg backdrop-blur-sm mb-8">
              <p className="text-lg mb-6">
                お布団は人数に合わせて不足分レンタル予定です。<br />
                大阪からの参加者が多ければ、レンタカーなどの交通手段も検討します🚗<br />
                その他、必要なものなど詳細は参加希望の方へ個別にご連絡します！
              </p>
              
              <p className="text-xl mb-6 font-medium">
                「楽しそう！」「参加してみたい！」「ちょっと質問が…」<br />
                どんな内容でも大歓迎です！
              </p>
              
              <p className="text-lg mb-8">
                参加希望やご質問は、私、図解師★ウルフのX（旧Twitter）アカウントまで、お気軽にDM（ダイレクトメッセージ）を送ってください！
              </p>
              
              <p className="text-lg font-medium text-orange-600 mb-8">
                「LP見ました！」と一言いただけると、とっても嬉しいです😊
              </p>
            </div>
            
            <div className="space-y-4">
              <a
                href="https://x.com/Diagram_Wolf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse-slow"
              >
                ✉️ DMはこちらまで！
              </a>
              
              <p className="text-white">
                ▼DMはこちらまで！<br />
                <a
                  href="https://x.com/Diagram_Wolf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-200 hover:text-white underline transition-colors duration-300"
                >
                  https://x.com/Diagram_Wolf
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">CNPトレカ合宿 2025 in 高知・CNハウス</p>
          <p className="text-sm text-gray-400 mt-2">最高の夏の思い出を一緒に作りましょう！</p>
        </div>
      </footer>
    </div>
  );
}
