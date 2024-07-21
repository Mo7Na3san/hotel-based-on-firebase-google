function otpStage() {
  loginBtn.style.display = "none";
  phoneInp.style.display = "none";
  verifyBtn.style.display = "block";
  otpInp.style.display = "block";
  recaptcha.style.display = "none";
}
function phoneStage() {
  loginBtn.style.display = "block";
  phoneInp.style.display = "block";
  verifyBtn.style.display = "none";
  otpInp.style.display = "none";
  recaptcha.style.display = "block";
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
      alert("error happened " + e.message);
    });
}
function verify() {
  let code = otpInp.value;
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      if (result.user) {
        window.location.href = "/book.html";
      }
    })
    .catch((e) => {
      alert("error happended " + e.message);
    });
}
