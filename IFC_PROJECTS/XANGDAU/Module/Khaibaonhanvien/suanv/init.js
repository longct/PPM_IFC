
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadnv_lsttram();
        loadnv_lstcapbac();
      
        $("#btn_sua_manv").click(function () {
            var check = checkvailidate_suama();
            if (check != "") {
                messInfo("messinfo_manvsua", check, "error");
              
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                capnhatmanv();
            });
        });

    } catch (e) {
        console.log(e);
    }

});
function loadma_masua(val) {
    try {
        localStorage.setItem("txtmanv", val);
        var config = { namesql: "PKG_KHAIBAONHANVIEN.IDLOAD", callback: "f_result_loadma_manvsua", connstr: "ConnOracleXangDau" };
        var para = {
            v_ID: val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadma_manvsua(config, para, lst) {
    try{
        var data = lst.data;
        if(data==null || data==undefined|| data.lenght==0 || data ==''){
            messInfo("messinfo_manvsua", "Không có dữ liệu hiển thị ", "error");
            return;
        }
        setValToTxt("txt_tennv_ma", data[0].tennhanvien);
        setValToTxt("txt_sodienthoai", data[0].sodienthoai);
        setValToTxt("txt_ngay_mnv", data[0].ngaysinh);
        setValToTxt("txt_email_manv", data[0].email);
        setValToTxt("cb_trams_manv", data[0].matram);
        setValToTxt("txt_diachi_manv", data[0].diachi);
        setValToTxt("cb_capbac_manv", data[0].capbac);

    } catch (e) {
        console.log(e);
    }
}
function checkvailidate_suama() {
    try{
        var p = getAllIdMod();
        if (p.txt_tennv_ma == "") return "Tên nhân viên không được trống";
        if (p.txt_tennv_ma.length >100) return "Tên nhân viên không được quá 100 ký tự";
        if ($.isNumeric(p.txt_sodienthoai) == false) return "Số điện thoại phải là số";
        if (IsEmail(p.txt_email_manv) == false) return "Tên email của bạn không đúng định dạng";
        if (p.cb_capbac_manv == "-1" || p.cb_capbac_manv == "") return "Vui lòng chọn cấp bạc";
        if (p.cb_trams_manv == '-1' || p.cb_trams_manv == "") return " Vui lòng chọn trạm"

        return "";

    } catch (e) {
        console.log(e);
    }
}
function loadnv_lsttram() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTTRAM", callback: "f_result_loadnv_lsttram", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnv_lsttram(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_trams_manv", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}

function loadnv_lstcapbac() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LST_CAPBAC", callback: "f_result_loadnv_lstcapbac", connstr: "ConnOracleXangDau" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnv_lstcapbac(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_capbac_manv", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}
// cap nhật cột
function capnhatmanv() {
    try{
        var p = getAllIdMod();
        var id= localStorage.getItem("txtmanv");
        var config = { namesql: "PKG_KHAIBAONHANVIEN.CAPNHATTHONGTIN", callback: "f_result_capnhatcot", connstr: "ConnOracleXangDau" };
        var para = {
            v_ID:id,
            v_TENNHANVIEN:p.txt_tennv_ma,
            v_MATRAM: p.cb_trams_manv,
            v_SODIENTHOAI: p.txt_sodienthoai,
            v_EMAIL: p.txt_email_manv,
            v_CAPBAC: p.cb_capbac_manv,
            v_DIACHIIN: p.txt_diachi_manv,
            v_NGAYSINH: p.txt_ngay_mnv,
            v_Userid:''
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatcot(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf('thành công') > 0) {
            messInfo("messinfo_manvsua", row, "ok");
            loaddanhsach_nv(1);
        } else {
            messInfo("messinfo_manvsua", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
