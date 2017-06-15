$(document).ready(function () {
    try{

        $("#cancel_dmk").click(function () {
            $("#doimatkhau").modal("hide");
            clearthaypasss();
        });
        $("#doimatkhau .close").click(function () {
            clearthaypasss();
        });
        $("#btn_thaymatkhau").click(function () {
            try {
                var check = checknull();
                if (check != "") {
                    showToast(check, "error");
                    return;
                }
                thaydoimatkhau();
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e);
    }


});


function checknull() {
    try {
        var p = getAllIdMod();
        if (p.txt_nhapcumk == "") return "Mật khẩu cũ không được bỏ trống";
        if (p.txt_nhapmoimk == "") return "Mật khẩu mới không được bỏ trống";
        if (p.txt_nhapmoimk != p.txt_nhaplaimk) {
            return "Nhập lại mật khẩu mới chưa đúng";
        }
        return "";

    } catch (e) {
        console.log(e);
    }
}
function clearthaypasss() {
    try{
        $("#txt_nhapcumk").val("");
        $("#txt_nhapmoimk").val("");
        $("#txt_nhaplaimk").val("");
    } catch (e) {
        console.log(e);
    }
}

function thaydoimatkhau() {
    try{
        var p = getAllIdMod();
       
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DANGNHAP.THAYMATKHAU", callback: "result_resetpassword" };
        var para = {
            v_TENDANGNHAP: userinfo.usercode,
            v_MATKHAUCU: p.txt_nhapcumk,
            v_MATKHAU: p.txt_nhapmoimk
        };
        ExecuteServiceSyns(config, para);
        console.log(para);
    } catch (e) {
        console.log(e);
    }
}
function result_resetpassword(config, para, lst) {
    try {
        console.log(lst.data);
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            showToast(row, "success");
            setTimeout(function () {
                $('#doimatkhau').modal('hide');
            }, 2000);
        } else {
            showToast(row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}



