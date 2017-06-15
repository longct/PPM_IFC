$(document).ready(function () {
    initformelement();
    localStorage.setItem("lang", "VI");
    $("#btn_login").click(function () {
        checkLogin();
        // localStorage.setItem("tree","show");        
    });

    $("input[name$='lang']").click(function () {
        if ($('#r_vi').is(':checked')) {
            localStorage.setItem("lang", "vi");
            selectlang();
        } else {
            localStorage.setItem("lang", "en");
            selectlang();
        }
    });
    $("body").keypress(function (e) {
        if (e.which == 13) {
            checkLogin();
        }
    });

});

function checkLogin() {
    try {
        var e = getAllIdMod();
        var u = e.txt_uname;
        var p = e.txt_pass;
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

        var config = { connstr: "ConnectOracle233", namesql: "PKG_DANGNHAP.DANGNHAP", callback: "result_dangnhap" };
        var para = {
            v_TENDANGNHAP: u,
            v_MATKHAU: p
        };
        ExecuteServiceSyns(config, para);

        //  

    } catch (e) {
        console.log(e);
    }
}

function result_dangnhap(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        var mod = [];
        var row = data[0].count;
        if (row == undefined) {
            localStorage.setItem("userinfo", JSON.stringify(data[0]));
            localStorage.setItem("breadcumb", "");
            localStorage.setItem("mod", JSON.stringify(mod));
            localStorage.setItem("DL", "");
            localStorage.setItem("dateF", "");
            localStorage.setItem("dateT", "");
            $(location).attr('href', 'home.html');
        } else {
            showToast(row, "error");
            return;
        }
    } catch (e) {
        console.log(e);
    }
}
