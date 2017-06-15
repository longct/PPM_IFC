$(document).ready(function () {
    try {
        loadchecklog_master();
        loadInitDate();
        loadtu_suattden();
        $("#btn_checkluu_suattden").click(function () {
            var check = checkvalidate_suattden();
            if (check != "") {
                messInfo("messinfo_suattden", check, "error");
                return;
            }
            messInfo("messinfo_suattden", "", "ok");
            f_confimYesNo("Bạn chắc chắn muốn cập nhật ", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtin_suattden();
            });
        });
    } catch (e) {
        console.log(e);
    }

});
function loadthongtinidbong_suattden(val) {
    try {
        localStorage.setItem("txt_idden", val);
        var config = { namesql: "PKG_QUANLYDENTT.IDTHONGDEN", callback: "f_result_loadthongtinidbong_suattden", connstr: "ConnectOracleStreetLight" };
        var para = { v_ID: val };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinidbong_suattden(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("cbdonvi_suattden", data[0].code);
        setValToTxt("txt_ten_suattden", data[0].tenden);
        setValToTxt("txt_kinhdo_suattden", data[0].kinhdo);
        setValToTxt("txt_vido_suattden", data[0].vido);
        setValToTxt("txt_imei_suattden", data[0].imei);
        setValToTxt("txt_ngaylapdat_suattden", data[0].ngaytaoa);
        setValToTxt("txt_nguoiql_suattden", data[0].nguoiquanly);
        setValToTxt("txt_simgprs_suattden", data[0].simgprs);
        setValToTxt("txt_dienthoai_suattden", data[0].dienthoai);
        setValToTxt("txt_ghichu_suattden", data[0].chieucaocotdien);
        setValToTxt("txt_diachi_suattden", data[0].diachi);
   

    } catch (e) {
        console.log(e);
    }
}
function checkvalidate_suattden() {
    try {
        var p = getAllIdMod();
       
        if (p.txt_imei_suattden == '') return "Imei đèn không được để trống";
        if (isNaN(p.txt_imei_suattden) == true) return "Imei phải là số";
        if (p.txt_imei_suattden.length > 20) return "Imei không được quá 20 ký tự";
        if (p.txt_ten_suattden == '') return "Tên đèn không được để trống";
        if (p.txt_ten_suattden.length > 50) return "Tên đèn không được quá 50 ký tự";
        if (p.txt_diachi_suattden == '') return "Địa chỉ không được để trống";
        if (p.txt_diachi_suattden.length > 50) return "Địa chỉ không được quá 50 ký tự";
        if (p.txt_kinhdo_suattden == '') return "Kinh độ không được dể trống";
        if (p.txt_kinhdo_suattden.length > 20) return "Kinh độ không được quá 20 ký tự";
        if (p.txt_vido_suattden == '') return "Vĩ độ không được dể trống";
        if (p.txt_vido_suattden.length > 20) return "Vĩ độ không được quá 20 ký tự";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function loadtu_suattden() {
    try {
        var config = { namesql: "PKG_QUANLYDENTT.LST_DONVIDEN", callback: "f_result_loadtu_suattden", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_suattden(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbdonvi_suattden", data, "code", "tendonvi", "-1", "Vui lòng chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}

function capnhatthongtin_suattden() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var id = localStorage.getItem("txt_idden");
        var config = { namesql: "PKG_QUANLYDENTT.CAPNHATTHONGTINDEN", callback: "f_result_capnhatthongtin_suatbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid:userinfo.idnhanvien,
            v_ID:id,
            v_Code:p.cbdonvi_suattden,
            v_Tenden: p.txt_ten_suattden,
            v_Imei: p.txt_imei_suattden,
            v_Diachi: p.txt_diachi_suattden,
            v_Simgprs: p.txt_simgprs_suattden,
            v_Quanly: p.txt_nguoiql_suattden,
            v_Dienthoai: p.txt_dienthoai_suattden,
            v_Vido: p.txt_vido_suattden,
            v_Kinhdo: p.txt_kinhdo_suattden,
            v_Ghichu: p.txt_ghichu_suattden,
            v_Ngaylap: p.txt_ngaylapdat_suattden
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatthongtin_suatbong(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suattden", row, "ok");
           
            setTimeout(function () {
                loadthongtin_ttden(1);
                $('#sua_thongtinden').modal('hide');

            }, 2000);
           
        } else {
            messInfo("messinfo_suattden", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}




