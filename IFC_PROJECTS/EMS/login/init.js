
$(document).ready(function () {
    $('.form-signin').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#btn_login').click();
            return false;
        }
    });
    try{
        $("#btn_login").click(function () {
            cleadlogin();
            var p = getAllIdMod();
            var checknull = checkloginnull(p)
            if (checknull != "") {
                messInfo("messinfo_login", checknull, "error");
                return;
            }
            login(p);
         
        });
    } catch (e) {
        console.log(e);
    }
});

function checkloginnull(p) {
    try {
      
        if (p.txt_uname == '') {
            return "Không được để Username trống";
        }
        if (p.txt_pass == '') {
            return "Không được để Password trống ";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}

function login() {
    try {
        var p = getAllIdMod();
        //var user = Base64.decode(p.txt_uname);
        //var pass = Base64.decode(p.txt_pass);

        var config = { namesql: "TBDANGNHAP", callback: "f_result_login", connstr: "ConnectEMS" };
        var para = {
            TENDANGNHAP: p.txt_uname,
            MATKHAU: p.txt_pass
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
            $(location).attr('href', 'master.html#modules/home');
        } else {
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
