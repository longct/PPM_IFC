
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
                messInfo("messinfo_1phalogin", checknull, "error");
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
function login(p) {
    try{
       
        var config = { namesql: "USERLOGIN", callback: "f_result_login", connstr: "Sql1Pha3Pha" };
        var para = {
            Username:p.txt_uname,
            Passname: p.txt_pass
        };
        ExecuteServiceSyns(config, para, false);
        console.log(para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_login(config, para, lst) {
    try{
        var userInfo = lst.data;
        console.log(lst.data);
        if (userInfo == null || userInfo == "[]" || userInfo == "" || userInfo == 0) {
            messInfo("messinfo_1phalogin", "Username hoăc Password của bạn đã sai ", "error");
            return;
        }
        //var userInfo = { userid: 4, usercode: "ifc123321", madiemdo: "0", code: "0101", ten: "IFC" };
        
        localStorage.setItem("userinfo", JSON.stringify(userInfo[0]));
        $(location).attr('href', 'master3pha.html')

    } catch (e) {
        console.log(e);
    }
}

function cleadlogin() {
    $("#messinfo_1phalogin").empty();
}
