
$(document).ready(function () {
    try {
     
        loadInitDate();
        loaddonvi_suas();
        chungloaicongto_suacta();
        loadchecklog_master();
        $("#btn_checkluu_cta").click(function () {
            var check = checknull_suatca();
            if (check != "") {
                messInfo("messinfo_sua_tca", check, "error");
                return;
            }
            messInfo("messinfo_sua_tca", "", "ok");
            f_confimYesNo("Bạn chắc chắn muốn cập nhật thông tin tủ ", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtin_cta();
            });
        });


    } catch (e) {
        console.log(e);
    }

});
// load ra thong tin trạm
function loaddonvi_suas() {
    try {
        var config = { namesql: "PKG_USERS.LSTDONVI", callback: "f_result_loaddonvi_suas", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddonvi_suas(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data== undefined) {
            return;
        }
        dataToCob("cbdonvi_tca", data, "madonvi", "tendonvi", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function thongtincongto_cta(val) {
    try {
        localStorage.setItem("txt_idthongct", val);
        var config = { namesql: "PKG_CAPNHAPDCU.IDTHONGTIN", callback: "f_result_loadthongtincongto_cta", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_ID:val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtincongto_cta(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_socongto_tca", data[0].socongto);
        setValToTxt("txt_imei_tca", data[0].imei);
        setValToTxt("txt_diachi_tca", data[0].diachikhachhang);
        setValToTxt("cbdonvi_tca", data[0].madonvi);
        setValToTxt("txt_tenkhachhang_tca", data[0].tenkhachhang);
        setValToTxt("txt_ngaylapdat_tca", data[0].ngaylap);
        setValToTxt("txt_ghichu_tca", data[0].ghichu);
        setValToTxt("cbloaicongto_tca", data[0].id_cl);
        setValToTxt("txt_kinhdo_tca", data[0].kinhdo);
        setValToTxt("txt_vido_tca", data[0].vido);
    } catch (e) {
        console.log(e);
    }
}
function capnhatthongtin_cta() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var id = localStorage.getItem("txt_idthongct");
        var config = { namesql: "PKG_CAPNHAPDCU.CAPTHONGTINTU", callback: "f_result_capnhatthongtin_cta", connstr: "ConnectOracleStreetLight" };
        var para = {
                v_Userid:userinfo.idnhanvien,
                v_ID:id,
                v_Code:p.cbdonvi_tca,
                v_Imei:p.txt_imei_tca,
                v_Ngaylap:p.txt_ngaylapdat_tca,
                v_Ghichu:p.txt_ghichu_tca, 
                v_Socongto:p.txt_socongto_tca,
                v_Diachikhachhang: p.txt_diachi_tca,
                v_Tenkhachhang:p.txt_tenkhachhang_tca,
                v_Kinhdo:p.txt_kinhdo_tca,
                v_Vido:p.txt_vido_tca,
                v_Loaicongto:p.cbloaicongto_tca,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatthongtin_cta(config, para, lst) {
    try { 
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sua_tca", row, "ok");
            var id = JSON.parse(localStorage.getItem("chitiettu")).id;    
            setTimeout(function () {
                f_loadTongQuanTu(id);
                $('#sua_ttcongtoa').modal('hide');
            }, 2000);
        } else {
            messInfo("messinfo_sua_tca", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function checknull_suatca() {
    try {
        var p = getAllIdMod();
        if (p.txt_imei_tca == '') return "Imei không được để trống";
        if (isNaN(p.txt_imei_tca) == true) return "Số công tơ phải là số";
        if (p.txt_imei_tca.length > 20) return "Số công tơ không được quá 20 ký tự";
        if (p.txt_socongto_tca == '') return "Số công tơ không được để trống";
        if (isNaN(p.txt_socongto_tca) == true) return "Số công tơ phải là số";
        if (p.txt_socongto_tca.length > 20) return "Số công tơ không được quá 20 ký tự";
        if (p.txt_tenkhachhang_tca == '') return "Tên tủ không được để trống";
        if (p.txt_tenkhachhang_tca.length > 50) return "Tên tủ không được quá 50 ký tự";
        if (p.txt_diachi_tca == '') return "Không được để trống địa chỉ";
        if (p.txt_diachi_tca.length > 50) return "Địa chỉ không được quá 50 ký tự";

        if (p.txt_kinhdo_tca == '') return "Kinh độ  không được để trống";
        if (p.txt_kinhdo_tca.length > 20) return "Kinh độ không được quá 20 ký tự";

        if (p.txt_vido_tca == '') return "Vĩ độ không được để trống";
        if (p.txt_vido_tca.length > 20) return "Vĩ độ không được quá 20 ký tự";

        if (p.cbdonvi_tca == '-1') return "Vui lòng chọn đơn vị ";
        if (p.cbloaicongto_tca == '-1') return "Loại công tơ không được để trống";
        if (p.txt_ngaylapdat_tca == '') return "Ngày lắp đặt không được để trống";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.txt_ngaylapdat_tc));
        if (ovderday.days > 0) return "Ngày lắp đặt được chọn quá ngày hiện tại";
    
        return "";
    } catch (e) {
        console.log(e);
    }
}
function chungloaicongto_suacta() {
    try {
        var config = { namesql: "PKG_CAPNHAPDCU.LST_LOAICONGTO", callback: "f_result_chungloaicongto_suacta", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_chungloaicongto_suacta(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]'|| data==null) {
            return;
        }
        dataToCob("cbloaicongto_tca", data, "id_cl", "name_cl", "-1", "Chọn chủng loại");

    } catch (e) {
        console.log(e);
    }
}