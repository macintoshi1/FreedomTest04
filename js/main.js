function smoothScroll(targetElement) {
  const headerOffset = -4;
  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - headerOffset;
  const distance = targetPosition - startPosition;
  
  const speed = 4000; // px/秒
  const maxDuration = 500; // 最大500ミリ秒
  const calculatedDuration = Math.abs(distance) / speed * 1000;
  const duration = Math.min(calculatedDuration, maxDuration); // 計算した時間と最大時間の小さい方を使用
  
  let start = null;

  function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress);

      if (progress < 1) {
          requestAnimationFrame(animation);
      }
  }

  requestAnimationFrame(animation);
}

(function() {
  console.log('Script running');  // 追加
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-pc-menu');
  const body = document.body;

  // 要素チェック
  if (!hamburger || !nav) {
      console.error('Required elements not found');
      return;
  }

  // トランジションの監視（デバッグ用に残す）
  nav.addEventListener('transitionstart', (e) => {
      console.log('Transition start:', e.propertyName);
  });

  nav.addEventListener('transitionend', (e) => {
      console.log('Transition end:', e.propertyName);
  });

  // メニュー開閉の処理をひとつの関数にまとめる
  function toggleMenu(show) {
      const action = show ? 'add' : 'remove';
      hamburger.classList[action]('active');
      nav.classList[action]('active');
      body.classList[action]('menu-open');
  }

  // ハンバーガーメニューのクリックイベント
  hamburger.addEventListener('click', () => {
      const isOpening = !nav.classList.contains('active');
      toggleMenu(isOpening);
  });

  const ticketButton = document.querySelector('.hero-buttons .btn-primary');
  if (ticketButton) {
    ticketButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElement = document.querySelector('#ticket');
        
        smoothScroll(targetElement);
        toggleMenu(false);
    });
}

  // メニューリンクのクリックイベント
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        smoothScroll(targetElement);
        toggleMenu(false);
    });
});

  // ここから追加 ========================
    // スクロールアニメーション用の監視設定
    const scrollElements = document.querySelectorAll(
        '.feature-item,.area-item, .extras-item, .venue-info, .map-wrapper, .transport-card, .ticket-announcement, .lineup-announcement'  // lineup-announcementを追加
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1  // 要素が10%見えたら発火
    });

    scrollElements.forEach(element => {
        element.classList.add('scroll-fade-up');  // 初期クラスを追加
        observer.observe(element);  // 監視開始
    });
    // ここまで追加 ========================
    // スクロールアニメーション用の監視設定の後に追加
    // 背景画像とロゴの制御
    const heroBackground = document.querySelector('.hero-background');
    const heroLogo = document.querySelector('.hero-logo');
    const heroInfo = document.querySelector('.hero-info'); 
    
    // 背景画像のURL取得
    const bgImage = getComputedStyle(heroBackground)
        .backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)[1];
    
    // 新しい Image オブジェクトを作成
    const img = new Image();
    
    // 画像読み込み完了時の処理
    img.onload = () => {
        // ロゴにアニメーション用クラスを追加
        heroLogo.classList.add('reveal');

        setTimeout(() => {
            heroInfo.classList.add('reveal');
        }, 2000);
    };
    
    // 背景画像の読み込みを開始
    img.src = bgImage;
    

})();