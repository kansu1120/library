document.addEventListener('DOMContentLoaded', () => {
  // ホームページかどうかを判定
  const isHomePage = window.location.pathname === '/' || 
                     window.location.pathname === '/library/' ||
                     window.location.pathname === '/library/index.html';
  
  const logoMain = document.querySelector('.logo-main');
  const logoSub = document.querySelector('.logo-sub');
  const headerLogo = document.querySelector('.header-logo');
  
  if (!logoMain || !logoSub || !headerLogo) return;
  
  if (isHomePage) {
    // ホームページの場合：初期状態で非表示＆アニメーション
    logoMain.style.opacity = '0';
    logoSub.style.opacity = '0';
    
    // リップルエフェクト終了後に開始（0.7秒遅延）
    setTimeout(() => {
      logoMain.classList.add('logo-animate');
      logoSub.classList.add('logo-animate');
    }, 700);
  } else {
    // ホームページ以外：普通に表示（アニメーションなし）
    logoMain.style.opacity = '1';
    logoSub.style.opacity = '1';
  }
});
