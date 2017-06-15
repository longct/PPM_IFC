var idtak = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        capdlsua_tk();
        $("#btn_suatkaa").click(function (){
     
            var check = validate_suatk();
            if (check != "") {
                messInfo("messinfo_suatk", check, 'error');
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn sửa tài khoản", "Bỏ qua", "Xác nhận", function () {
                capnhattaikhoan_sua();
            });

        });

    } catch (e) {
        console.log(e);
    }
});
function loadthongtinid(id) {
    try {
     
        messInfo("messinfo_suatk", '', 'error');
        idtak = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LSTTHONGTINTAIKHOAN", callback: "resut_loadthongtinid" };
        var para = {
            v_ID:idtak
        };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_loadthongtinid(config, para, lst) {
    try{
        var data = lst.data;
   
        setValToTxt("txt_tens_stkl", data[0].ten);
        setValToTxt("txt_sodt_stkl", data[0].sodienthoai);
        setValToTxt("txt_email_stkl", data[0].mail);
        setValToTxt("txt_diachi_stkl", data[0].diachi);
        setValToTxt("txt_ghichus_stkl", data[0].ghichu);
        setValToTxt("txt_scapdtluc_tkl", data[0].code);
    } catch (e) {
        console.log(e);
    }
}
function capnhattaikhoan_sua() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.CAPNHATXOA", callback: "resut_capnhattaikhoan_sua" };
        var para = {
            v_ID: idtak,
            v_TENNGUOIDUNG: p.txt_tens_stkl,
            v_SODIENTHOAI: p.txt_sodt_stkl,
            v_EMAIL: p.txt_email_stkl,
            v_DIACHI: p.txt_diachi_stkl,
            v_GHICHU: p.txt_ghichus_stkl,
            v_CODE: p.txt_scapdtluc_tkl,
            v_USERID:userinfo.userid,
            v_TYPE:'UPDATE'
        };
  
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function resut_capnhattaikhoan_sua(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suatk", row, 'ok');
            setTimeout(function () {
                loaddstaikhoan($("#pagenumber").val());
            }, 200);
        } else {
            messInfo("messinfo_suatk", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function validate_suatk() {
    try {
        var p = getAllIdMod();
        if (p.txt_tens_stkl == "") return "Tên tài khoản không được bỏ trống";
        if (p.txt_sodt_stkl == "") return "Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_sodt_stkl) == false) return "Số điện thoại phải là số";
        if (p.txt_email_stkl == "") return "Email không được bỏ trống";
        if (IsEmail(p.txt_email_stkl) == false) return "Không đúng định dạng email";
        if (p.txt_diachi_stkl == "") return "Địa chỉ không được bỏ trống";
        if (p.txt_scapdtluc_tkl == "-1") return "Cấp điện lực không được bỏ trống";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function capdlsua_tk() {
    try {

        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LSTCAPDIENLUC", callback: "result_capdlsua_tk" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capdlsua_tk(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("txt_scapdtluc_tkl", data, "id", "ten", "-1", "Chọn cấp điện lực");
    } catch (e) {
        console.log(e);
    }
}




