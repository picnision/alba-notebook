// 알바수첩 - 서비스 워커 (캐시 없음, 항상 최신 버전)
// 모든 파일을 네트워크에서 새로 불러옵니다.
// 이렇게 하면 업데이트 후 즉시 최신 버전이 반영됩니다.

self.addEventListener("install", (event) => {
  // 설치할 때 아무것도 캐시하지 않음
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // 기존 캐시 모두 삭제
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // 모든 요청을 네트워크에서 가져옴 (캐시 없음)
  event.respondWith(fetch(event.request));
});
