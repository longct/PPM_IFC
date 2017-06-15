$(document).ready(function () {
    showhideTree();
    initformelement();
    loadlstdonvi();
    loadlstquyen();
    $("#btn_checkluu_tk").click(function () {
        var check = check_tk();
        if (check != "") {
            showToast(check, "error");
            clearmatkhau();
            return;
        }

        f_confimYesNo("Bạn chắc chắn thêm ", "Bỏ qua", "Xác nhận", function () {
            capnhatkhachhang();
        });
        

    });

});
function loadlstdonvi() {
    try{
       // var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));

        var config = { connstr: "ConnectOracle233", namesql: "PKG_DANGNHAP.LST_DONVI", callback: "result_loadlstdonvi" };
        var para = {
            v_CODE: userinfo.code
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadlstdonvi(config,para, lst) {
    try {
  
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbdonvi_tk", data, "code", "tendonvi", "-1", "Vui lòng chọn đơn vị");

    } catch (e) {
        console.log(e);
    }
}
function loadlstquyen() {
    try {
        // var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));

        var config = { connstr: "ConnectOracle233", namesql: "PKG_DANGNHAP.LST_QUYEN", callback: "result_loadlstquyen" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadlstquyen(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbquyen_tk", data, "id", "name", "-1", "Vui chọn quyền");

    } catch (e) {
        console.log(e);
    }
}

function check_tk() {
    try {
        var p = getAllIdMod();
        if (p.cbdonvi_tk == "-1") return "Vui lòng chọn đơn vị";
        if (p.txt_tendangnhap_tk == "") return "Tên đăng nhập không được bỏ trống";
        if (p.txt_tendangnhap_tk.length > 50) return "Tên đăng nhập không được quá 50 ký tự";
        if (p.txt_pasword_tk == "") return "Mật khẩu không được bỏ trống";
        if (p.txt_pasword_tk.length > 50) return "Mật khẩu không được quá 50 ký tự";
        if (p.txt_paswordnhaplai_tk == "") return "Mật khẩu nhập lại không được bỏ trống";
        if (p.txt_pasword_tk != p.txt_paswordnhaplai_tk) return "Hai mật khẩu không trùng nhau";
        if (p.txt_tennguoidung_tk == "") return "Tên người dùng không được bỏ trống";
        if (p.txt_tennguoidung_tk.length > 250) return "Tên người dùng không được quá 250 ký tự";
        if (p.txt_sodienthoai_tk == "") return "Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_sodienthoai_tk) == false) return "Số điện thoại phải là số";
        if (p.txt_email_tk == "") return "Email không được để trống";
        if (IsEmail(p.txt_email_tk) == false) return "Không đúng định dạng email";
        if (p.txt_tennguoidung_tk.length > 250) return "Email không được quá 250 ký tự";
        if (p.cbquyen_tk == "-1") return "Vui lòng chọn quyền";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function clearmatkhau() {
    try{
    
        setValToTxt("txt_pasword_tk", "");
        setValToTxt("txt_paswordnhaplai_tk", "");
       
    } catch (e) {
        console.log(e);
    }
}
function clear_tk() {
    try{

        setValToTxt("cbquyen_tk", "-1");
        setValToTxt("cbdonvi_tk", "-1");
        setValToTxt("txt_tendangnhap_tk", "");
        setValToTxt("txt_paswordnhaplai_tk", "");
        setValToTxt("txt_pasword_tk", "");
        setValToTxt("txt_tennguoidung_tk", "");
        setValToTxt("txt_sodienthoai_tk", "");
        setValToTxt("txt_email_tk", "");
        setValToTxt("txt_diachi_tk", "");
        setValToTxt("txt_ghichu_tk", "");

    } catch (e) {
        console.log(e);
    }
}
function capnhatkhachhang() {
    try{
        var p = getAllIdMod();
        var config = { connstr: "ConnectOracle233", namesql: "PKG_DANGNHAP.TAOTAIKHOANA", callback: "result_taotaikhoan1" };
        var para = {
            v_TENDANGNHAP:p.txt_tendangnhap_tk,
            v_MATKHAU:p.txt_pasword_tk,
            v_TENNGUOIDUNG: p.txt_tennguoidung_tk,
            v_SODIENTHOAI:p.txt_sodienthoai_tk,
            v_EMAIL:p.txt_email_tk,
            v_DIACHI:p.txt_diachi_tk,
            v_GHICHU:p.txt_ghichu_tk,
            v_CODE:p.cbdonvi_tk,
            v_QUYEN:p.cbquyen_tk,
            v_TYPE:''
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_taotaikhoan1(config, para, lst) {
    try {

        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            showToast(row, "success");
            clear_tk();
        } else {
            showToast(row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}