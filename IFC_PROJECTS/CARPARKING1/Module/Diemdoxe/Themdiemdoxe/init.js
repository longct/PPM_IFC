$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadlst_txe();
        messInfo("messinfo_themxe", '', "error");
        $("#btn_txe").click(function () {
            var check = check_validate();
            if (check != "") {
                console.log(check);
                messInfo("messinfo_themxe", check, "error");
                return;
            }
        
            messInfo("messinfo_themxe", '', "error");
            f_confimYesNo("Bạn chắc chắn muốn thêm", "Bỏ qua", "Xác nhận", function () {
                Themdiemdoxe();
            });
        });

    } catch (e) {
        console.log(e);
    }

});
function claer_txe() {
    try{
        $("#txt_tendiemdo_txe").val('');
        $("#txt_madiemquanly_txe").val('');
        $("#txt_nguoiquanly_txe").val('');
        $("#txt_tongsocho_txe").val('');
        $("#txt_sodienthoai_txe").val('');
        $("#txt_email_txe").val('');
        $("#txt_kinhdo_txe").val('');
        $("#txt_vido_txe").val('');
        $("#cb_diemdoxe_txe").val('-1');

    } catch (e) {
        console.log(e);
    }
}
function check_validate() {
    try{
        var p = getAllIdMod();
        if (p.txt_tendiemdo_txe == "") return " Tên điểm đỗ không được bỏ trống";
        if (p.txt_madiemquanly_txe == "") return "Mã điểm đỗ không được bỏ trống";
        if (p.txt_nguoiquanly_txe == "") return "Người quản lý không được bỏ trống";
        if (p.txt_tongsocho_txe == "") return " Tổng số chỗ không được bỏ trống";
        if ($.isNumeric(p.txt_sodienthoai_txe) == false) return "Số điện thoại không phải là số";
        if ((p.txt_sodienthoai_txe).length < 10 || (p.txt_sodienthoai_txe).length > 11) return " Số điện thoại phải từ 10 hoặc 11 số";
        if (IsEmail(p.txt_email_txe) == false) return "Email không đúng định dạng";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function loadlst_txe() {
    try{
        var config = { namesql: "CAR_LSTBOX.DIEMDOXE", callback: "f_result_loadlst_txe", connstr: "Oracle_HDDT" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlst_txe(config, para, lst) {
    try{
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
            // messInfo("messinfo_master", "Username hoăc Password của bạn đã sai ", "error");
            return;
        }
        dataToCob("cb_diemdoxe_txe", lst.data, "code", "ten");
        $('select#cb_diemdoxe_txe').find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });

    } catch (e) { console.log(e);}
}

function Themdiemdoxe() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_DANHSACHDIEMDO.CAPNHATDIEMDO", callback: "f_result_Themdiemdoxe", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID: userinfo.userid,
            v_TENDIEMDO:p.txt_tendiemdo_txe,
            v_MADIEMDO:p.txt_madiemquanly_txe,
            v_NGUOIQUANLY:p.txt_nguoiquanly_txe,
            v_TONGSOCHO:p.txt_tongsocho_txe,
            v_SODIENTHOAI:p.txt_sodienthoai_txe,
            v_EMAIL:p.txt_email_txe,
            v_KINHDO:p.txt_kinhdo_txe,
            v_VIDO:p.txt_vido_txe,
            v_CODE: p.cb_diemdoxe_txe,
        };
      
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Themdiemdoxe(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_themxe", row, 'ok');
            setTimeout(function () {
                loaddanhsach_ddxe(1);
                claer_txe();
            });
        } else {
            messInfo("messinfo_themxe", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}





