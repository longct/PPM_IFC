$(document).ready(function () {
    $("#btn_login").click(function () {
        checkLogin();
        localStorage.setItem("tree","show");
    })
});

function checkLogin() {
    var u = $("#txt_uname").val();
    var p = $("#txt_pass").val();

    if (u == null || u == "" || u == undefined) {
        showToast("Tên đăng nhập không được để trống", "error");
        $("#txt_uname").focus();
        return;
    }

    if (p == null || p == "" || p == undefined) {
        showToast("Mật khẩu không được để trống", "error");
        $("#txt_uname").focus();
        return;
    }

    console.log(u + "-------" + p);
    localStorage.setItem("uspe", ["000101001111", "000101002111", "000101003111", "000101004111", "000101005111", "000101006111"]);
    $(location).attr('href', 'index.html');
}

