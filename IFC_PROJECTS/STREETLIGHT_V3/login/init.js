
$(document).ready(function () {
    try {

    localStorage.removeItem("userinfo");    
    $('.login-body').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#btn_dangnhap').click();
            return false;
        }
    });
   
    $("#btn_dangnhap").click(function () {
            var p = getAllIdMod();
            var check = checkloginnull(p)
        if (check != "") {
                showToast(check, "error");
                return;
            }
            else
                login(p);
        });
    } catch (e) {
        console.log(e);
    }

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

        var config = { namesql: "PKG_USERS.DANGNHAPA", callback: "f_result_login", connstr: "ConnectOracleStreetLight" };
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
        var data = lst.data;
        var row = data[0].count;
        if (row == undefined) {
            localStorage.setItem("userinfo", JSON.stringify(data[0]));
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $(location).attr('href', 'index.html');
            } else {
                $(location).attr('href', 'index.html');
            }

        } else {
            showToast(row, "error");
            return;
        }


    } catch (e) {
        console.log(e);
    }
}
