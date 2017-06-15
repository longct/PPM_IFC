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

        $("#txt_pass").keypress(function (e) {
            if (e.which == 13) {
                var p = getAllIdMod();
                login(p);
            }
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

        var config = { namesql: "CAR_DANGNHAP.DANGNHAP", callback: "f_result_login", connstr: "Oracle_HDDT" };
        var para = {
            v_TENDANGNHAP: p.txt_uname,
            v_MATKHAU: p.txt_pass
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_login(config, para, lst) {
    try {
        var data = lst.data;
      
        var row = data[0].count;
        if (row == undefined) {
            localStorage.setItem("userinfo", JSON.stringify(data[0]));
            $(location).attr('href', 'master.html');

        } else {
            console.log(row);
            messInfo("messinfo_login", row, 'error')
            return;
        }


    } catch (e) {
        console.log(e);
    }
}

function cleadlogin() {
    $("#messinfo_login").empty();
}
