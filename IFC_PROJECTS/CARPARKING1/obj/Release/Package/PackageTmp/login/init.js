$(document).ready(function () {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("infotree");
    localStorage.setItem("action", "Trang chủ");
    

    $('.form-signin').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#btnLogIn_login').click();
            return false;
        }
    });
    try {
        $("#btnLogIn_login").click(function () {
            cleadlogin();
            var p = getAllIdMod();
            var checknull = checkloginnull(p)
            if (checknull != "") {
                messInfo("messinfo_login", checknull, "error");
                $('#messinfo_login').stop().fadeIn(200).delay(2000).fadeOut(400);
                return;
            }
            else
                login(p);

        });
    } catch (e) {
        console.log(e);
    }

    $("#txt_uname, #txt_pass").click(function () {
        messInfo("messinfo_login", "", "ok");
    });
    
});

function checkloginnull(p) {
    try {

        if (p.txt_uname == '') {
            return "Tên đăng nhập không được để trống";
        }
        if (p.txt_pass == '') {
            return "Mật khẩu không được để trống ";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}
function login(p) {
    try {

        var config = { namesql: "PKG_USER.LOGIN", callback: "f_result_login", connstr: "ConnOracleXangDau" };
        var para = {
            v_MANHANVIEN: p.txt_uname,
            v_PASSWORDOLD: p.txt_pass
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_login(config, para, lst) {
    try {
        var userInfo = lst.data;

        if (userInfo == null || userInfo == "[]" || userInfo == "" || userInfo == 0) {
            messInfo("messinfo_login", "Username hoăc Password của bạn đã sai ", "error");
            return;
        }
        localStorage.setItem("userinfo", JSON.stringify(userInfo[0]));
        $(location).attr('href', 'master.html');

    } catch (e) {
        console.log(e);
    }
}

function cleadlogin() {
    $("#messinfo_login").empty();
}
