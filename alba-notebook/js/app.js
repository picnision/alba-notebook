/* 알바수첩 - 공통 로직 (모든 페이지에서 사용) */
// (관리자 설정은 firebase-config.js의 ADMIN_USERNAMES에서 관리합니다)

// 로그인 안 되어 있으면 로그인 페이지로 보내고,
// 로그인 되어 있으면 콜백에 (user) 을 넘겨줍니다.
function requireLogin(onReady) {
  const username = localStorage.getItem('albaUsername');
  const userId = localStorage.getItem('albaUserId');

  if (!username || !userId) {
    window.location.href = 'index.html';
    return;
  }

  // 현재 사용자 정보를 Firestore에서 조회
  db.collection('users').doc(userId).get().then(snap => {
    if (!snap.exists) {
      localStorage.clear();
      window.location.href = 'index.html';
      return;
    }
    const profile = { uid: userId, ...snap.data() };
    onReady(profile);
  }).catch(() => {
    localStorage.clear();
    window.location.href = 'index.html';
  });
}

function logout() {
  localStorage.removeItem('albaUsername');
  localStorage.removeItem('albaUserId');
  window.location.href = 'index.html';
}

// ---- 날짜/시간 유틸 ----

// "YYYY-MM-DD" -> 그 주(월요일 시작) 의 월요일 날짜 문자열
function getWeekStart(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay(); // 0=일 1=월 ... 6=토
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return toDateStr(d);
}

function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 주 시작일(월) -> "7/14 (월) ~ 7/20 (일)" 형태 문자열
function formatWeekRange(weekStartStr) {
  const start = new Date(weekStartStr + "T00:00:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (d) => `${d.getMonth() + 1}/${d.getDate()}`;
  return `${fmt(start)} ~ ${fmt(end)}`;
}

const WEEKDAY_KR = ["일", "월", "화", "수", "목", "금", "토"];

function formatDateKr(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getMonth() + 1}/${d.getDate()} (${WEEKDAY_KR[d.getDay()]})`;
}

// 출근/퇴근 "HH:MM" -> 근무시간(소수, 자정 넘김 지원, 휴게시간 없음)
function calcHours(startTime, endTime) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let startMin = sh * 60 + sm;
  let endMin = eh * 60 + em;
  if (endMin <= startMin) endMin += 24 * 60; // 자정을 넘기는 근무
  return Math.round(((endMin - startMin) / 60) * 100) / 100;
}

function formatWon(n) {
  return Math.round(n || 0).toLocaleString("ko-KR") + "원";
}

function formatHours(h) {
  return `${h}시간`;
}

// 관리자 확인은 firebase-config.js의 isAdminUsername() 사용
