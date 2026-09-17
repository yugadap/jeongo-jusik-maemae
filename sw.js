// 정오의 주식매매 PWA 서비스 워커.
// 2026-09-17 신설(아이폰/갤럭시 홈 화면 설치형 앱 요청). 이 사이트는 매일 정오 자동
// 갱신되는 실데이터가 핵심이라, 캐시가 실데이터를 낡은 값으로 덮어쓰면 안 된다 -- 그래서
// 캐시는 앱 셸(정적 자원)만 미리 담아두고, 모든 요청은 항상 네트워크를 먼저 시도한 뒤
// 오프라인일 때만 캐시로 대체하는 network-first 전략을 쓴다(실거래 참고 자료라 "최신"이
// "빠름"보다 우선).
var CACHE_NAME = "jeongo-shell-v1";
var SHELL_ASSETS = [
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names
          .filter(function (n) { return n !== CACHE_NAME; })
          .map(function (n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  event.respondWith(
    fetch(req)
      .then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (cached) { return cached || caches.match("./index.html"); });
      })
  );
});
