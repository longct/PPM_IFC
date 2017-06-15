
$(document).ready(function () {
    try {
     
        loadInitDate();
        loaddonvi_sua();
        chungloaicongto_suact();
        loadchecklog_master();
        $("#btn_checkluu_ct").click(function () {
            var check = checknull_suatc();
            if (check != "") {
                messInfo("messinfo_sua_tc", check, "error");
                return;
            }
            messInfo("messinfo_sua_tc", '', "ok");
            f_confimYesNo("Bạn chắc chắn muốn cập nhật ", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtin_ct();
            });
        });


    } catch (e) {
        console.log(e);
    }

});
// load ra thong tin trạm
function loaddonvi_sua() {
    try {
        var config = { namesql: "PKG_USERS.LSTDONVI", callback: "f_result_loadlstdonvi_sua", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi_sua(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data== undefined) {
            return;
        }
        dataToCob("cbdonvi_tc", data, "madonvi", "tendonvi", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function thongtincongto_ct(val) {
    try {
        localStorage.setItem("txt_idthongct", val);
        var config = { namesql: "PKG_CAPNHAPDCU.IDTHONGTIN", callback: "f_result_loadthongtincongto_ct", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_ID:val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtincongto_ct(config,para,lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_socongto_tc", data[0].socongto);
        setValToTxt("txt_imei_tc", data[0].imei);
        setValToTxt("txt_diachi_tc", data[0].diachikhachhang);
        setValToTxt("cbdonvi_tc", data[0].madonvi);
        setValToTxt("txt_tenkhachhang_tc", data[0].tenkhachhang);
        setValToTxt("txt_ngaylapdat_tc", data[0].ngaylap);
        setValToTxt("txt_ghichu_tc", data[0].ghichu);
        setValToTxt("cbloaicongto_tc", data[0].id_cl);
        setValToTxt("txt_kinhdo_tc", data[0].kinhdo);
        setValToTxt("txt_vido_tc", data[0].vido);
    } catch (e) {
        console.log(e);
    }
}
function capnhatthongtin_ct() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var id = localStorage.getItem("txt_idthongct");
        var config = { namesql: "PKG_CAPNHAPDCU.CAPTHONGTINTU", callback: "f_result_capnhatthongtin_ct", connstr: "ConnectOracleStreetLight" };
        var para = {
                v_Userid:userinfo.idnhanvien,
                v_ID:id,
                v_Code:p.cbdonvi_tc,
                v_Imei:p.txt_imei_tc,
                v_Ngaylap:p.txt_ngaylapdat_tc,
                v_Ghichu:p.txt_ghichu_tc, 
                v_Socongto:p.txt_socongto_tc,
                v_Diachikhachhang: p.txt_diachi_tc,
                v_Tenkhachhang:p.txt_tenkhachhang_tc,
                v_Kinhdo:p.txt_kinhdo_tc,
                v_Vido:p.txt_vido_tc,
                v_Loaicongto:p.cbloaicongto_tc,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatthongtin_ct(config, para, lst) {
    try { 
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sua_tc", row, "ok");
            try{
                loadthongtincongto(1);
                $('#sua_ttcongto').modal('hide');
            }catch(e){

            }
            
        } else {
            messInfo("messinfo_sua_tc", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function checknull_suatc() {
    try {
        var p = getAllIdMod();
        if (p.txt_imei_tc == '') return "Imei không được để trống"
        if (isNaN(p.txt_imei_tc) == true) return "Imei phải là số";
        if (p.txt_imei_tc.length > 20) return "Imei không được quá 20 ký tự";
        if (p.txt_socongto_tc == '') return "Số công tơ không được để trống";
        if (isNaN(p.txt_socongto_tc) == true) return "Số công tơ phải là số";
        if (p.txt_socongto_tc.length > 20) return "Số công tơ không được quá 20 ký tự"
        if (p.txt_tenkhachhang_tc == '') return "Tên tủ không được để trống";
        if (p.txt_tenkhachhang_tc.length > 50) return "Tên tủ không được quá 50 ký tự";
        if (p.txt_diachi_tc == '') return "Không được để trống địa chỉ";
        if (p.txt_diachi_tc.length > 50) return "Địa chỉ không được quá 50 ký tự"
        if (p.txt_kinhdo_tc == '') return "Kinh độ  không được để trống";
        if (p.txt_kinhdo_tc.length > 20) return "Kinh độ không được quá 20 ký tự"
        if (p.txt_vido_tc == '') return "Vĩ độ không được để trống";
        if (p.txt_vido_tc.length > 20) return "Vĩ độ không được quá 20 ký tự";
        if (p.cbdonvi_tc == '-1') return "Vui lòng chọn đơn vị ";
        if (p.cbloaicongto_tc == '-1') return "Loại công tơ không được để trống";
        if (p.txt_ngaylapdat_tc == '') return "Ngày lắp đặt không được để trống";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.txt_ngaylapdat_tc));
        if (ovderday.days > 0) return "Ngày lắp đặt được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function chungloaicongto_suact() {
    try {
        var config = { namesql: "PKG_CAPNHAPDCU.LST_LOAICONGTO", callback: "f_result_chungloaicongto_suact", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_chungloaicongto_suact(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]'|| data==null) {
            return;
        }
        dataToCob("cbloaicongto_tc", data, "id_cl", "name_cl", "-1", "Chọn chủng loại");

    } catch (e) {
        console.log(e);
    }
}