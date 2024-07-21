function otpStage() {
  loginBtn.style.display = "none";
  phoneInp.style.display = "none";
  verifyBtn.style.display = "block";
  otpInp.style.display = "block";
  recaptcha.style.display = "none";
}
function phoneStage() {
  loginBtn.style.display = "none";
  phoneInp.style.display = "none";
  verifyBtn.style.display = "none";
  otpInp.style.display = "none";
  recaptcha.style.display = "none";
}
function login() {
  let phoneNum = phoneInp.value;
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  auth
    .signInWithPhoneNumber(phoneNum, window.recaptchaVerifier)
    .then((result) => {
      window.confirmationResult = result;
      otpStage();
    })
    .catch((e) => {
      window.recaptchaVerifier?.clear(); // clear before printing the error msg to fix ..
      alert("error happended " + e.message);
    });
}
function profileStage() {
  document.getElementById("profile-section").style.display = "flex";
}
function verify() {
  let code = otpInp.value;
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      if (result.user) {
        console.log(result.user);
        console.log(result.user.uid);
        window.user = result.user;
        profileStage();
        phoneStage();
        // window.location.href = "book.html";
      }
    })
    .catch((e) => {
      alert("error happended " + e.message);
    });
}
function showLoginAction() {
  document.getElementById("goToLogin").style.display = "block";
}
function goToLogin() {
  window.location.href = "login.html";
}
function signup() {
  const phone = window.user.phoneNumber;
  const uid = window.user.uid;
  const fullName = document.getElementById("fullname").value;
  const age = document.getElementById("age").value;
  const docRef = usersCollections.doc(uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      alert("user already existed");
      showLoginAction();
    } else {
      docRef
        .set({
          fullName: fullName,
          age: age,
          phone: phone,
        })
        .then((result) => {
          window.location.href = "book.html";
        });
    }
  });
}
