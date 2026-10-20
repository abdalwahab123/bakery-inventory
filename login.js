
import { auth, db, BAKERY_ID } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const screen = document.getElementById("loginLoading");

function showLogin(message = "") {
  screen.innerHTML = `
    <div style="background:white;padding:25px;border-radius:16px;width:100%;max-width:360px;box-shadow:0 4px 20px #0002">
      <h2>🥖 تسجيل الدخول</h2>
      <input id="loginEmail" type="email" placeholder="البريد الإلكتروني"
        style="width:100%;padding:12px;margin:8px 0;box-sizing:border-box">
      <input id="loginPassword" type="password" placeholder="كلمة المرور"
        style="width:100%;padding:12px;margin:8px 0;box-sizing:border-box">
      <button id="loginButton"
        style="width:100%;padding:13px;background:#2563eb;color:white;border:0;border-radius:8px">
        دخول
      </button>
      <p id="loginError" style="color:#b91c1c"></p>
    </div>
  `;

  document.getElementById("loginError").textContent = message;

  document.getElementById("loginButton").onclick = async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    error.textContent = "جاري تسجيل الدخول...";

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    
error.textContent = "رمز الخطأ: " + e.code;
    }
  };
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    showLogin();
    return;
  }

  try {
    const memberRef = doc(
      db, "bakeries", BAKERY_ID, "members", user.uid
    );
    const memberSnap = await getDoc(memberRef);

    if (!memberSnap.exists() || memberSnap.data().active !== true) {
      await signOut(auth);
      showLogin("هذا الحساب غير مفعّل في المخبز.");
      return;
    }

    const role = memberSnap.data().role;

    if (role !== "admin") {
      await signOut(auth);
      showLogin("حساب المدير فقط متاح في هذه المرحلة.");
      return;
    }

    screen.innerHTML = `
      <div style="background:white;padding:25px;border-radius:16px;max-width:360px">
        <h2>✅ تم تسجيل الدخول</h2>
        <p>تم التحقق من حساب المدير وصلاحياته في Firebase.</p>
        <p>المخزون سيبقى مغلقاً حتى نربطه بـ Firestore.</p>
        <button id="logoutButton" style="padding:12px 24px">
          تسجيل الخروج
        </button>
      </div>
    `;

    document.getElementById("logoutButton").onclick = () => signOut(auth);

  } catch (e) {
    console.error(e);
    screen.textContent = "حدث خطأ أثناء التحقق من الحساب. راجع إعدادات Firebase.";
  }
});

alert("تم تشغيل ملف login.js بنجاح");
