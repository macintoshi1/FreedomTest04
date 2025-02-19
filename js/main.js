function smoothScroll(targetElement) {
  const startPosition = window.pageYOffset;
  const headerOffset = -4;  // 追加
  // スマホ幅（768px以下）の場合は80px、それ以外は0pxのオフセット
  const offset = window.innerWidth <= 768 ?  40 : 0;
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - headerOffset - offset;
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
    // ここから追加 ========================
    // スクロールアニメーション用の監視設定
    const scrollElements = document.querySelectorAll(
        '.feature-item, .news-item, .area-item, .artist-card, .extras-item, .venue-info, .map-wrapper, .transport-card, .ticket-announcement, .lineup-announcement, .contact-message, .contact-mail, .contact-instagram, .contact-x, .artist-page-photo, .artist-profile, .artist-social, .artist, .artist-name, .artist-media, .artwork, .back-button, .news-topic, .artist-reveal-photo, .news-contents, .news-detail, .lineup-button'  // lineup-announcementを追加
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2  // 要素が20%見えたら発火
    });

    scrollElements.forEach(element => {
        element.classList.add('scroll-fade-up');  // 初期クラスを追加
        observer.observe(element);  // 監視開始

         // 初期化時に要素がすでにビューポート内にある場合
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
    }
    });
    // ここまで追加 ========================

   // メニュー関連の処理（これらは条件付きで実行）
  const hamburger = document.querySelector('.hamburger');
  const menuContainer = document.querySelector('.nav-menu-container');
  const nav = document.querySelector('.nav-pc-menu');
  const body = document.body;

  // 要素チェック
  if (hamburger && menuContainer && nav) {  // 要素が存在する場合のみ実行
    // トランジションの監視（デバッグ用に残す）
    // nav.addEventListener('transitionstart', (e) => {
    //     console.log('Transition start:', e.propertyName);
    // });

    // nav.addEventListener('transitionend', (e) => {
    //     console.log('Transition end:', e.propertyName);
    // });

    menuContainer.addEventListener('transitionstart', (e) => {
        console.log('Transition start:', e.propertyName);
    });

    menuContainer.addEventListener('transitionend', (e) => {
        console.log('Transition end:', e.propertyName);
    });
  }

  // メニュー開閉の処理をひとつの関数にまとめる
  function toggleMenu(show) {
      const action = show ? 'add' : 'remove';
      hamburger.classList[action]('active');
      menuContainer.classList[action]('active'); // containerのクラス制御
      nav.classList[action]('active');          // navのクラス制御も必要
      body.classList[action]('menu-open');
  }

  // ハンバーガーメニューのクリックイベント
//   hamburger.addEventListener('click', () => {
//       const isOpening = !nav.classList.contains('active');
//       toggleMenu(isOpening);
//   });

    hamburger.addEventListener('click', () => {
        const isOpening = !menuContainer.classList.contains('active');
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
//   nav.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         const targetId = link.getAttribute('href');
//         const targetElement = document.querySelector(targetId);

//         console.log('Link clicked:', targetId);
//         console.log('Target element:', targetElement);

//         if (targetElement) {
//             smoothScroll(targetElement);
//             toggleMenu(false);
//         } else {
//             console.error('Target element not found:', targetId);
//         }
        
//         smoothScroll(targetElement);
//         toggleMenu(false);
//     });
// });

// メニューリンクのクリックイベント
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // 外部リンクや相対パスの場合はそのままリンクを開く
        if (targetId.startsWith('http') || targetId.startsWith('../')) {
            return; // デフォルトのリンク動作を許可
        }

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        console.log('Link clicked:', targetId);
        console.log('Target element:', targetElement);

        if (targetElement) {
            smoothScroll(targetElement);
            toggleMenu(false);
        } else {
            console.error('Target element not found:', targetId);
        }
    });
});

// ここに追加 ========================
// フッターリンクのクリックイベント
document.querySelector('footer').querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        smoothScroll(targetElement);  // 同じsmoothScroll関数を使用
    });
});
// ここまで追加 =====================
    // スクロールアニメーション用の監視設定の後に追加

    // MOREボタンの制御部分を以下のように書き換え
const newsMoreBtn = document.querySelector('.news-more-btn');
const newsArchive = document.querySelector('.news-archive');

if (newsMoreBtn && newsArchive) {
    const moreSpan = newsMoreBtn.querySelector('span');  // spanを取得

    newsMoreBtn.addEventListener('click', () => {
        newsArchive.classList.toggle('show');  // visibleではなくshowに変更
        newsMoreBtn.classList.toggle('active');
        
        // テキストの切り替え
        if (newsArchive.classList.contains('show')) {
            moreSpan.textContent = 'CLOSE';
        } else {
            moreSpan.textContent = 'MORE';
        }
    });
}
    // MOREボタンの制御ここまで ========================

    // 背景画像とロゴの制御
    const heroBackground = document.querySelector('.hero-background');
    const heroLogo = document.querySelector('.hero-logo');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroInfo = document.querySelector('.hero-info'); 
    const heroButtons = document.querySelector('.hero-buttons');
    
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
            heroSubtitle.classList.add('reveal');  // サブタイトルのreveal
        }, 470);  // ロゴの後、1秒後に表示
        
        setTimeout(() => {
            heroButtons.classList.add('reveal');
        }, 500);

        setTimeout(() => {
            heroInfo.classList.add('reveal');
        }, 500);
    };
    
    // 背景画像の読み込みを開始
    img.src = bgImage;
    

})();