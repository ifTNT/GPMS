function login() {
  window.location.href = "/login";
  /*window.open(
    "login",
    "登入",
    "height=50",
    "width=50",
    "top=200",
    "left=300",
    "toolbar=no",
    "menubar=no",
    "scrollbars=no",
    "resizable=no",
    "location=no",
    "status=no"
  );*/
}
function logout() {
  var x = document.getElementById("logout");
  alert("登出成功");
}

(() => {
  document.querySelector(".focuse").scrollIntoView();
  window.scrollTo(0, 0);
})();
