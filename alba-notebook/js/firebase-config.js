/*
  =====================================================================
  Firebase 설정 (자동으로 채워졌습니다 - 수정 불필요!)
  =====================================================================
*/
const firebaseConfig = {
  apiKey: "AIzaSyAw9lmfIG9_EK_UXxm_pPa8M-E38DSMI2E",
  authDomain: "part-timer-s-notebook.firebaseapp.com",
  projectId: "part-timer-s-notebook",
  storageBucket: "part-timer-s-notebook.firebasestorage.app",
  messagingSenderId: "542078971075",
  appId: "1:542078971075:web:b78eb783fb89ec15e0c676"
};

/*
  =====================================================================
  관리자로 지정할 아이디를 아래 배열에 입력하세요.
  (근무 기록 입력/수정/삭제, 근무자 관리, 전체 알바비 확인 권한을 갖습니다)
  예: ["boss", "manager"]
  =====================================================================
*/
const ADMIN_USERNAMES = ["boss"];

// ---- 아래는 수정하지 않아도 됩니다 ----
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function isAdminUsername(username) {
  return ADMIN_USERNAMES.includes(username);
}
