$(document).ready(function () {
    try {
        loadchecklog_master();

        lst_donvi_kbn();
        setValToTxt("txt_ngay_kbkh", gettimenow());
        $("#btn_kbndd").click(function () {
            var check = validate();
            if (check != "") {
                messInfo("messinfo_kbndd", check, 'error');
                return;
            }
           // f_confimYesNo("Bạn chắc chắn muốn thêm", "Bỏ qua", "Xác nhận", function () {
                capnhatnguoidaidien();
            //});

        });


    } catch (e) {
        console.log(e);
    }
});
function lst_donvi_kbn() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvi_kbn" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvi_kbn(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("txt_congtydienluc_kbndd", data, "id", "ten", "-1", "Vui lòng đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function capnhatnguoidaidien() {
    try{
        var p =getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAONGUOIDAIDIEN.THEMNGUOIDAIDIEN", callback: "result_capnhatnguoidaidien" };
        var para = {
            v_NGUOIDD: p.txt_tennguoidaidien_kbndd,
            v_CHUCVUDD: p.txt_chucvudd_kbndd,
            v_THEOVB: p.txt_vanban_kbndd,
            v_NGAY: p.txt_ngay_kbkh,
            v_CODE_DL: p.txt_congtydienluc_kbndd,
            v_TENUQ: p.txt_tennguoiiuy_kbndd,
            v_CHUCVUUQ: p.txt_chucvu_kbndd,
            v_SODIENTHOAI: p.cb_sodienthoai_kbndd,
            v_FAX: p.txt_fax_kbndd,
            v_EMAIL: p.txt_email_kbndd,
            v_TAIKHOAN: p.txt_taikhoan_kbndd,
            v_NGANHANG: p.txt_nganhang_kbndd,
            v_MASOTHUE: p.txt_masothue_kbndd,
            v_SDT_CKH: p.txt_sodienthoai_kbndd,
            v_DIACHI: p.txt_diachi_kbndd,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatnguoidaidien(config, para, lst) {
    try{

        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kbndd", row, 'ok');
            setTimeout(function () { clear(); }, 1000);
        } else {
            messInfo("messinfo_kbndd", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function validate() {
    try{
        var p =getAllIdMod();
        if(p.txt_tennguoidaidien_kbndd=="") return"Tên người đại diện không được bỏ trống";
        if(p.txt_chucvudd_kbndd=="") return"Chức vụ đại diện không được bỏ trống";
        if(p.txt_vanban_kbndd=="") return"Theo văn bản  không được bỏ trống";
        if(p.txt_ngay_kbkh=="") return"Ngày  không được bỏ trống";
        if(p.txt_congtydienluc_kbndd=="-1") return"Tên đơn vị  không được bỏ trống";
        if(p.txt_tennguoiiuy_kbndd=="") return"Người ủy quyền không được bỏ trống";
        if(p.txt_chucvu_kbndd=="") return"Chức vụ người ủy quyền  không được bỏ trống";
        if(p.cb_sodienthoai_kbndd=="") return"Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.cb_sodienthoai_kbndd) == false) return "Số điện thoại phải là số";
        if(p.txt_email_kbndd=="") return"Email không được bỏ trống";
        if (IsEmail(p.txt_email_kbndd) == false) return "Không đúng định dạng email";
        if (p.txt_taikhoan_kbndd == "") return "Tài khoản không được bỏ trống";
        if(p.txt_nganhang_kbndd=="") return"Tên ngân hàng không được bỏ trống";
        if(p.txt_masothue_kbndd=="") return"Mã số thuế  không được bỏ trống";
        if(p.txt_diachi_kbndd=="") return"Địa chỉ không được bỏ trống";
        if (p.txt_sodienthoai_kbndd == "") return "Số điện thoại chăm sóc khách hàng không được bỏ trống";
        if ($.isNumeric(p.txt_sodienthoai_kbndd) == false) return "Số điện thoại chăm sóc khách hàng phải là số";

        return "";
    } catch (e) {
        console.log(e);
    }
}

function clear() {
    try {
    
        $("#txt_tennguoidaidien_kbndd").val('');
        $("#txt_chucvudd_kbndd").val('');
    } catch (e) {
        console.log(e);
    }
}