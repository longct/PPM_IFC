$(document).ready(function () {
    try {
        loadchecklog_master();
        loadInitDate();
    
        loadbong_suattbong();
        $("#btn_checkluu_suabong").click(function () {
            var check = checkvalidate_suabong();
            if (check != "") {
                messInfo("messinfo_suabong", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn cập nhật ", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtin_suatbong();
            });
        });
    } catch (e) {
        console.log(e);
    }

});
function loadthongtinidbong_suabong(val) {
    try {
        localStorage.setItem("txt_idbong", val);
        var config = { namesql: "PKG_QUANLYBONG.THONGTINIDBONG", callback: "f_result_loadthongtinidbong_suabong", connstr: "ConnectOracleStreetLight" };
        var para = { v_ID:val};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinidbong_suabong(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("cbtu_suattbong", data[0].tentu);
        setValToTxt("txt_idrfbong_suattbong", data[0].idrfbong);
        setValToTxt("txt_ten_suattbong", data[0].tenbong);
        setValToTxt("txt_kinhdo_suattbong", data[0].kinhdo);
        setValToTxt("txt_vido_suattbong", data[0].vido);
        setValToTxt("cb_loaibong_suattbong", data[0].loaibong);
        setValToTxt("txt_ngaylapdat_suattbong", data[0].thoidiem);
        setValToTxt("txt_congsuat_suattbong", data[0].congsuat);
        setValToTxt("txt_dienap_suattbong", data[0].dienap);
        setValToTxt("txt_docaocot_suattbong", data[0].chieucaocotdien);
        setValToTxt("txt_ghichu_suattbong", data[0].ghichu);
      
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate_suabong() {
    try {
        var p = getAllIdMod();
        if (p.txt_idrfbong_suattbong == '') return "ID RF không được để trống";
        if (isNaN(p.txt_idrfbong_suattbong) == true) return "ID RF bóng phải là số";
        if (p.txt_idrfbong_suattbong.length > 20) return "ID RF không được quá 20 ký tự";
        if (p.txt_ten_suattbong == '') return "Tên bóng không được để trống";
        if (p.txt_ten_suattbong.length > 20) return "Tên bóng không được quá 20 ký tự";
        if (p.txt_kinhdo_suattbong == '') return "Kinh độ không được để trống";
        if (p.txt_kinhdo_suattbong.length > 20) return "Vĩ độ không được quá 20 ký tự";
        if (p.txt_vido_suattbong == '') return "Vĩ độ không được để trống";
        if (p.txt_vido_suattbong.length > 20) return "Vĩ độ  không được quá 20 ký tự";
        if (p.cb_loaibong_suattbong == '-1') return "Bạn chưa chọn loại bóng";
        if (p.txt_congsuat_suattbong == '') return "Công suất không được để trống";
        if (p.txt_congsuat_suattbong.length > 20) return "Công suất  không được quá 20 ký tự";
        if (p.txt_dienap_suattbong == '') return "Điện áp không được để trống";
        if (p.txt_dienap_suattbong.length > 20) return "Điện áp không được quá 20 ký tự";
        if (p.txt_docaocot_suattbong == '') return "Độ cao cột không được để trống";
        if (p.txt_docaocot_suattbong.length > 20) return "Độ cao cột không được quá 20 ký tự";
    
        return "";

    } catch (e) {
        console.log(e);
    }
}

function loadbong_suattbong() {
    try {
        var config = { namesql: "PKG_QUANLYBONG.LST_LOAIBONG", callback: "f_result_sualoaibong", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_sualoaibong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cb_loaibong_suattbong", data, "id", "tenloaibong", "-1", "Vui lòng chọn loại bóng");
    } catch (e) {
        console.log(e);
    }
}

function capnhatthongtin_suatbong() {
    try{
        var p=getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var id =localStorage.getItem("txt_idbong");
        var config = { namesql: "PKG_QUANLYBONG.CAPNHATTHONGTINBONG", callback: "f_result_capnhatthongtin_suatbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid:userinfo.idnhanvien,
            v_idtu:p.cbtu_suattbong,
            v_idbong:id,
            v_tenbong:p.txt_ten_suattbong,
            v_idrfbong:p.txt_idrfbong_suattbong,
            v_kinhdo: p.txt_kinhdo_suattbong,
            v_vido: p.txt_vido_suattbong,
            v_loaibong: p.cb_loaibong_suattbong,
            v_thoidiemlap: p.txt_ngaylapdat_suattbong,
            v_dienap: p.txt_dienap_suattbong,
            v_consuat: p.txt_congsuat_suattbong,
            v_chieucaocot: p.txt_docaocot_suattbong,
            v_ghichu: p.txt_ghichu_suattbong
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
            messInfo("messinfo_suabong", row, "ok");
            $('#sua_thongtinbong').modal('hide');

        } else {
            messInfo("messinfo_suabong", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}

// xoa bong

function xoa_ttbong_suatbong(val) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_QUANLYBONG.XOATHONGTINBONG", callback: "f_result_xoa_ttbong_suatbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_idbong: val
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_xoa_ttbong_suatbong(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ttbong", row, "ok");
           
        } else {
            messInfo("messinfo_ttbong", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}



