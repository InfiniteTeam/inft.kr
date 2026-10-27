// 'use client' 파일에서 내보낸 문자열은 서버 레이아웃에서 클라이언트 참조로 바뀌므로 따로 둡니다.
/**
 * <head>에서 먼저 실행됩니다. 모션 줄이기가 아니고 IntersectionObserver가 있을 때만 숨김 상태를 켜고,
 * 3초 안에 아래 관찰자가 시작하지 못하면(스크립트 오류 등) 숨김을 풀어 내용이 사라지지 않게 합니다.
 */
export const REVEAL_SCRIPT = `(function(){try{var d=document.documentElement;if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.setAttribute('data-reveal','on');setTimeout(function(){if(!window.__reveal)d.removeAttribute('data-reveal')},3000)}catch(e){}})();`;
