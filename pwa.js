// 홈 화면 설치형 앱(PWA) 등록. 2026-09-17 신설 (사용자 요청 "아이폰과 갤럭시에 돌아가게
// 앱으로 만들어줘"). 서비스워커 등록만 하고, 캐시 전략은 sw.js에서 처리한다.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}
