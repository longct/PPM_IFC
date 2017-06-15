$(document).ready(function () {
    //localStorage.removeItem("userinfo");
    try {

        $('.form-signin').keypress(function (e) {
            var key = e.which;
            if (key == 13)  // the enter key code
            {
                $('#btnLogIn_login').click();
                return false;
            }
        });

        $("#btnLogIn_login").click(function () {
            cleadlogin();
            var p = getAllIdMod();
            var checknull = checkloginnull(p)
            if (checknull != "") {
                messInfo("messinfo_login", checknull, "error");
                $('#messinfo_login').stop().fadeIn(200).delay(2000).fadeOut(400);
                return;
            }
            else {
                localStorage.removeItem("userinfo");
                login(p);
            }

        });


        $("#txt_uname, #txt_pass").click(function () {
            messInfo("messinfo_login", "", "ok");
        });

        dangnhaplai();
    } catch (e) {
        console.log(e);
    }
});
//

// đăng nhập lại()
function dangnhaplai() {
    try {
        var user = localStorage.getItem("mang");
        if (user == null) {
            $("#txt_pass").val('');
            $("#txt_uname").val('');
            return;
        }

        var usera = JSON.parse(localStorage.getItem("mang"));

        if (usera.save == "1") {
            $("#remember_login").attr("checked", "checked");
            $("#txt_uname").val(usera.name);
            $("#txt_pass").val(usera.pass);
        }

    } catch (e) {
        console.log(e);
    }
}
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
        var config = { "namesql": "PKG_PLUETOOTH_LOGIN.LOADUSER", callback: "f_result_login", connstr: "ConnectOracleBlueTooth" };

        var para = {
            V_TENDANGNHAP: p.txt_uname,
            V_MATKHAU: p.txt_pass
        }
        console.log(para);
        var lst = ExecuteServiceSyns_Login(config, para);
        f_result_login(config, para, lst);
    } catch (e) {
        console.log(e);
    }
}
function ExecuteServiceSyns_Login(config, para) {
    try {
        var lst = null;
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };

        $.ajax({
            url: "http://bluetooth.ifc.com.vn/bluetooth" + "/api/excuteoracle",
            type: "POST",
            data: jsonpara,
            async: false,
            success: function (data, textStatus, jqXHR) {

                lst = (data == null || data == "") ? [] : JSON.parse(data);

            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
        return lst;

    } catch (e) {
        return null;
    }
}
function f_result_login(config, para, lst) {
    try {
        var user = { server: lst.data[0].name_server, port: "5221", tendangnhap: lst.data[0].tendangnhap, userid: lst.data[0].userid };
        console.log(user);
        localStorage.setItem("userinfo", JSON.stringify(user));
        //return;
        if (lst == null || lst == "[]" || lst == "" || lst.data.length == 0) {
            messInfo("messinfo_login", "Tài khoản đăng nhập không đúng", "error");
            return;
        }
        //localStorage.setItem("userinfo", JSON.stringify(lst.data[0]));
        var mang = [];
        var save = $('#remember_login').is(":checked") ? 1 : 0;
        var name = $('#txt_uname').val();
        var pass = $('#txt_pass').val();

        mang = { 'name': name, 'pass': pass, 'save': save };

        localStorage.setItem("mang", JSON.stringify(mang));

        $(location).attr('href', 'master.html');

    } catch (e) {
        console.log(e);
    }
}

function cleadlogin() {
    $("#messinfo_login").empty();
}


function checkConnection() {
    var networkState = navigator.connection.type;
    return networkState;
}
