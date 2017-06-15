var idtak = "";
$(document).ready(function () {
    try {
        loadchecklog_master();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        loadthongtinid_cttkh(userinfo.userid);
        $("#btn_sua_cttkh").click(function () {
     
            var check = validate_suatk();
            if (check != "") {
                messInfo("messinfo_suatk", check, 'error');
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn sửa tài khoản", "Bỏ qua", "Xác nhận", function () {
                capnhattaikhoan_sua_cttkh();
            });

        });

    } catch (e) {
        console.log(e);
    }
});
function loadthongtinid_cttkh(id) {
    try {
     
        messInfo("messinfo_suatk", '', 'error');
        idtak = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LSTTHONGTINTAIKHOAN", callback: "resut_loadthongtinid_cttkh" };
        var para = {
            v_ID:idtak
        };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_loadthongtinid_cttkh(config, para, lst) {
    try{
        var data = lst.data;
   
        setValToTxt("txt_tens_stkl_cttkh", data[0].ten);
        setValToTxt("txt_sodt_stkl_cttkh", data[0].sodienthoai);
        setValToTxt("txt_email_stkl_cttkh", data[0].mail);
        setValToTxt("txt_diachi_stkl_cttkh", data[0].diachi);
        setValToTxt("txt_ghichus_stkl_cttkh", data[0].ghichu);
    } catch (e) {
        console.log(e);
    }
}
function capnhattaikhoan_sua_cttkh() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.CAPNHATXOA", callback: "resut_capnhattaikhoan_sua_cttkh" };
        var para = {
            v_ID: idtak,
            v_TENNGUOIDUNG: p.txt_tens_stkl_cttkh,
            v_SODIENTHOAI: p.txt_sodt_stkl_cttkh,
            v_EMAIL: p.txt_email_stkl_cttkh,
            v_DIACHI: p.txt_diachi_stkl_cttkh,
            v_GHICHU: p.txt_ghichus_stkl_cttkh,
            v_CODE: "",
            v_USERID:userinfo.userid,
            v_TYPE:'UPDATE'
        };
  
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function resut_capnhattaikhoan_sua_cttkh(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suatk", row, 'ok');
          
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
        if (p.txt_tens_stkl_cttkh == "") return "Tên tài khoản không được bỏ trống";
        if (p.txt_sodt_stkl_cttkh == "") return "Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_sodt_stkl_cttkh) == false) return "Số điện thoại phải là số";
        if (p.txt_email_stkl_cttkh == "") return "Email không được bỏ trống";
        if (IsEmail(p.txt_email_stkl_cttkh) == false) return "Không đúng định dạng email";
        if (p.txt_diachi_stkl_cttkh == "") return "Địa chỉ không được bỏ trống";
        if (p.txt_scapdtluc_tkl_cttkh == "-1") return "Cấp điện lực không được bỏ trống";
        return "";
    } catch (e) {
        console.log(e);
    }
}





