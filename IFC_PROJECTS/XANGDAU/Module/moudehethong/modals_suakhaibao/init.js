
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loaddonvi_suakhaibao();
        Listcot_lichsutramkhaibao();
        $("#btn_checkluu_suakhaibao").click(function () {
            var check = checknull_suakhaibao();
            if (check != "") {
                messInfo("messinfo_suakhaibao", check, "error");
                return;
            }
          //  loadsuakhachhang_khaibao();
            f_confimYesNo("Bạn chắc chắn muốn sửa điểm đo", "Bỏ qua", "Xác nhận", function () {
                loadsuakhachhang_khaibao();
            });
           
        });
    } catch (e) {
        console.log(e);
    }

});
function checknull_suakhaibao() {
    try{
        var p = getAllIdMod();
        if (p.txtimei_khaibao == "") {
            return "Không được để imei để trống";
        }
        if (p.cbmacot_khaibao == "-1") {
            return "Bạn chưa chọn cột";
        }
        if (p.datecot_khaibao == "") {
            return "Bạn chưa chọn ngày";
        }
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datecot_khaibao));
        if (ovderday.days > 0) {
            return "Ngày không được chọn quá ngày hiện tại";
        }
        if (p.cbtram_khaibao == "-1") {
            return "Bạn chưa chọn trạm";
        }
        return "";
           
    } catch (e) {
        console.log(e);
    }
}
function loadkhachhang_khaibaoid(val) {
    try {
        var p = getAllIdMod();
        localStorage.setItem('suathongtin_khaibao', val);
        var config = { namesql: "THONGTINTRAM.THONGTINIDTRAM", callback: "reset_loadkhachhang_idkhaibao", connstr: "ConnOracleXangDau" };
        var para = {
            v_iddiemdo: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function reset_loadkhachhang_idkhaibao(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txtimei_khaibao", data[0].imei);
        setValToTxt("datecot_khaibao", data[0].thoidiemkhaibao);
        setValToTxt("cbmacot_khaibao", data[0].macot);
        setValToTxt("cbtram_khaibao", data[0].matram);
    } catch (e) {
        console.log(e);
    }
}
function loaddonvi_suakhaibao() {
    try {
        var config = { namesql: "PKG_USER.LST_DONVI", callback: "f_result_loadlstdonvi_suakhaibao", connstr: "ConnOracleXangDau" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi_suakhaibao(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbtram_khaibao", data, "madonvi", "tendonvi", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function Listcot_lichsutramkhaibao() {
    try {
        var config = { namesql: "THONGTINTRAM.LISTCOTTRAM", callback: "f_result_listcot_khaibao", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = { v_code: infotree.code };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_listcot_khaibao(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbmacot_khaibao", data, "ma_cot", "tencot", "-1", "Chọn cột");
    } catch (e) {
        console.log(e);
    }
}


function loadsuakhachhang_khaibao() {
    try{
        var p = getAllIdMod();
        var idnhavien = localStorage.getItem("suathongtin_khaibao");
        var config = { namesql: "THONGTINTRAM.CAPNHAPKHAIBAOTRAM", callback: "f_result_loadtaikhoan_suakhachhangkhaibao", connstr: "ConnOracleXangDau" };
        var para = {
            v_imei:p.txtimei_khaibao,
            v_iddiemdo:idnhavien,
            v_matram: p.cbtram_khaibao,
            v_ngay: p.datecot_khaibao,
            v_macot: p.cbmacot_khaibao,
            v_type:'UPDATE'
          
        };
        console.log(para);
        
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan_suakhachhangkhaibao(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suakhaibao", row, "ok");
            loaddanhsachtram_khaibao(1);
        } else {
            messInfo("messinfo_suakhaibao", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
//
function checknull_sua() {
    try{
        var p = getAllIdMod();
        if (p.txt_manhanvien == "") {
            return "Mã nhân viên không được để trống";
        }
        if (p.txt_hoten == '') {
            return "Không được để trống tên nhân viên";
        }
        if (p.txt_dienthoai == '') {
            return "Không được để trống diện thoại";
        }
        if ($("#txt_dienthoai").val().replace(/[0-9]*/g, "")) {
            return "Điện thoại phải là số ";
        }
        if (p.txt_diachi == '') {
            return "Không được để trống địa chỉ";
        }
        if (p.cbdonvi == '-1') {
            return "Vui lòng chọn đơn vị ";
        }
        if (p.cbquyen == '-1') {
            return "Vui lòng chọn quyền ";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}