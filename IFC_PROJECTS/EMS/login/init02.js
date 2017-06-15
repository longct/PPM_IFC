
$(document).ready(function () {
  
    login("hangbt", "A123456");//luyendt//hangbt, sonvd
   return;
    try{
        var urlPara = f_getParaFromUrl();
        if (urlPara == null || urlPara == undefined || urlPara.user == null || urlPara.user == undefined)
            return

        var user = Base64.decode(urlPara.user);
        var pass = Base64.decode(urlPara.pass);
        login(user, pass);
    } catch (e) {
        console.log(e);
    }
});

function login(user,pass) {
    try{
       
        var config = { namesql: "TB_Login_DangNhap", callback: "f_result_login", connstr: "ConnectEMS" };
        var para = {
            User:user,
            Pass: pass
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_login(config, para, lst) {
    try {
        console.log(lst);
        var userInfo = lst.data;
        if (userInfo == null || userInfo == "[]" || userInfo == "" || userInfo == 0) {
            return;
        }
        localStorage.setItem("userinfo", JSON.stringify(lst.data[0]));
        $(location).attr('href', 'master.html#modules/home')

    } catch (e) {
        console.log(e);
    }
}

