// 정오의 주식매매 공통 UI (2026-09-24): 공유 버튼, 맨 위로 버튼, 히어로 영상 일시정지.
// 5개 src 페이지와 deploy 번들이 같은 파일을 쓴다(build_deploy.py가 deploy/로 복사).
(function () {
  var SITE_URL = "https://yugadap.github.io/jeongo-jusik-maemae/";

  function setupShare() {
    var btn = document.getElementById("share-site");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var data = {
        title: "정오의 주식매매",
        text: "매일 정오 자동 갱신되는 미국 섹터 → 한국 종목 리서치. 선정 이유와 결과를 전부 공개합니다.",
        url: SITE_URL,
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
        return;
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(SITE_URL).then(function () {
          btn.textContent = "링크를 복사했습니다";
          setTimeout(function () { btn.textContent = "이 사이트 공유하기"; }, 2000);
        });
      }
    });
  }

  function setupBackToTop() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "맨 위로");
    btn.textContent = "↑";
    btn.hidden = true;
    document.body.appendChild(btn);
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () { btn.hidden = window.scrollY < 800; }, { passive: true });
  }

  function setupVideoToggle() {
    var video = document.getElementById("hero-video");
    var btn = document.getElementById("hero-video-toggle");
    if (!video || !btn) return;
    function sync() {
      btn.textContent = video.paused ? "재생" : "일시정지";
      btn.setAttribute("aria-pressed", video.paused ? "true" : "false");
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
    btn.addEventListener("click", function () {
      if (video.paused) video.play(); else video.pause();
    });
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
  }

  setupShare();
  setupBackToTop();
  setupVideoToggle();
})();
