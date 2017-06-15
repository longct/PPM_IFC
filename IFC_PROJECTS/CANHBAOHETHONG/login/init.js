$(document).ready(function () {
    localStorage.removeItem("userinfo");    
    //$('.form-signin').keypress(function (e) {
    //    var key = e.which;
    //    if (key == 13)  // the enter key code
    //    {
    //        $('#btn_login').click();
    //        return false;
    //    }
    //});
    try {
        $("#btn_login").click(function () {
            $(location).attr('href', 'master.html');
            // checkLogin();
           
        })
    } catch (e) {
        console.log(e);
    }
});





function checkLogin() {
    try {
        var p = getAllIdMod();
        var txt_uname = p.txt_uname;
        var txt_pass = p.txt_pass;
        if (txt_uname == null || txt_uname == "" || txt_uname == undefined) {
            messInfo("messinfo_login", 'Tên đăng nhập không được để trống', 'error')
            $("#txt_uname").focus();
            return;
        }

        if (txt_pass == null || txt_pass == "" || txt_pass == undefined) {
            messInfo("messinfo_login", 'Mật khẩu không được để trống', 'error')
            $("#txt_uname").focus();
            return;
        }

        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.DANGNHAP", callback: "result_dangnhap" };
        var para = {
            v_TENDANGNHAP: txt_uname,
            v_MATKHAU: txt_pass
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
        var row = data[0].count;
        if (row == undefined) {
            localStorage.setItem("userinfo", JSON.stringify(data[0]));
            if (data[0].isadmin == 1) {
                $(location).attr('href', 'master.html#Module/Home');
            } else {
                $(location).attr('href', 'master_kh.html#Module/Home');
            }
          
        } else {
            messInfo("messinfo_login",row, 'error')
            return;
        }
    } catch (e) {
        console.log(e);
    }
}
