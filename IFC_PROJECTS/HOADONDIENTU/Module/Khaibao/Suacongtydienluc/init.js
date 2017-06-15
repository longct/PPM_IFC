var idcty = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        messInfo("messinfo_skbttdluc", '', 'error');
        lstngahangsua();
        loadcoquanthuesua();
        $("#btn_suaty").click(function () {
          
            var check = check_skbct();
            if (check != "") {
             
                messInfo("messinfo_skbttdluc", check, 'error');
                return;
            }
         
            f_confimYesNo("Cập nhật thông tin doanh nghiệp", "Bỏ qua", "Xác nhận", function () {
            capnhatctydienluc_sua();
               
            });
         

        });

        $("#txt_tencoquan_skbct").change(function () {
            loadcoquanthuesua();
        });

    } catch (e) {
        console.log(e);
    }
});

function check_skbct() {
    try{
        var p = getAllIdMod();
        if (p.txt_masothue_skbct == "") return "Mã số thuế không được bỏ trống";
        if (p.txt_dangkyk_skbct == "") return "Đăng ký giấy phép kinh doanh không được bỏ trống";
        if (p.txt_ctydienluc_skbct == "") return "Công ty điện lực không được bỏ trống";
        if (p.txt_diachi_skbct == "") return "Địa chỉ không được bỏ trống";
        if (p.txt_dienthoai_skbct == "") return "Điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_dienthoai_skbct) == false) return "Số điện thoại phải là số";
        if (p.txt_email_skbct == "") return "Email không được để trống";
        if (IsEmail(p.txt_email_skbct) == false) return "Không đúng định dạng email";
        if (p.txt_fax_skbct == "") return "Fax không được bỏ trống";
        if (p.txt_nguoiuyquyen_skbct == "") return "Người ủy quyền không được bỏ trống";
        if (p.txt_nguoipluat_skbct == "") return "Người đại diện pháp luật không được bỏ trống";
        if (p.txt_quyetdinh_skbct == "") return "Quyết đinh số không được bỏ trống";
        if (p.txt_sotainhn_skbct == "") return "Số tài khoản ngân hàng không được bỏ trống";
        if (p.txt_chutaikhoan_skbct == "") return "Chủ tài khoản không được bỏ trống";
        if (p.cb_tenhang_skbct == "-1") return "Vui lòng chọn tên ngân hàng";
        if (p.txt_coquanthue_skbct == "-1") return "Cơ quan thuế không được bỏ trống";
        if (p.txt_sdtcsk_skbct == "") return "Số điện thoại chăm sóc khách hàng không bỏ trống";
        if (p.txt_madonviqly_skbct == "") return "Mã đơn vị quản lý không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function lstngahangsua() {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NGANHANG", callback: "result_lstngahangsua" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstngahangsua(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("cb_tenhang_skbct", data, "id", "tenn_hang", "-1", "Chọn ngân hàng ");
    } catch (e) {
        console.log(e);
    }
}
function loadcoquanthuesua() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_COQTHUE", callback: "result_loadcoquanthuesua" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadcoquanthuesua(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("txt_coquanthue_skbct", data, "ma_cqt", "tencqt", "-1", "Chọn cơ quan thuế");

    } catch (e) {
        console.log(e);
    } 
}
function capnhatctydienluc_sua() {
    try {
        var check = $("#txt_hieuluc_skbct").is(':checked') ? 1 : 0;
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCTY.CAPNHATCTY", callback: "result_capnhatctydienluc_sua" };
        var para = {
            v_MASOTHUE: p.txt_masothue_skbct,
            v_TENCTY: p.txt_ctydienluc_skbct,
            v_TENCTYA: p.txt_ctytienganh_skbct,
            v_DIACHI: p.txt_diachi_skbct,
            v_DIENTHOAI: p.txt_dienthoai_skbct,
            v_EMAIL: p.txt_email_skbct,
            v_NGUOI_LH: p.txt_nguoiuyquyen_skbct,
            v_NGUOI_DPL: p.txt_nguoipluat_skbct,
            v_SOTKN_HANG: p.txt_sotainhn_skbct,
            v_CTKN_HANG: p.txt_chutaikhoan_skbct,
            v_IDN_HANG: p.cb_tenhang_skbct,
            v_GHICHU: p.txt_ghichu_skbct,
            v_MA_CQT: p.txt_coquanthue_skbct,
            v_CHUKYSO: '',
            v_QUETDINHSO: p.txt_quyetdinh_skbct,
            v_DANGKYKD: p.txt_dangkyk_skbct,
            v_CHUV_DPL: p.txt_chuvupl_skbct,
            v_CHUVU_LH: p.txt_cvu_skbct,
            v_SDTCSK: p.txt_sdtcsk_skbct,
            v_FAX: p.txt_fax_skbct,
            v_USERID:userinfo.userid,
            v_ID: idcty,
            v_HIEULUC: check,
            v_MADONVIQL: p.txt_madonviqly_skbct
        };
  
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatctydienluc_sua(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            //showToast(row, 'success');
            messInfo("messinfo_skbttdluc", row, 'ok');
            setTimeout(function () { loadlstdienluc(1); }, 1000);
        } else {
            //showToast(row, 'error');
            messInfo("messinfo_skbttdluc", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}

function loathongtinidcty(id) {
    try {
        idcty = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCTY.LAYID", callback: "result_loathongtinidcty" };
        var para = { v_ID:id  };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loathongtinidcty(config, para, lst) {
    try {
        var data = lst.data;
        $("#txt_masothue_skbct").val(data[0].masothue_cty);
        $("#txt_dangkyk_skbct").val(data[0].dangkykd);
        $("#txt_ctydienluc_skbct").val(data[0].tencty);
        $("#txt_ctytienganh_skbct").val(data[0].tenctyanh);
        $("#txt_diachi_skbct").val(data[0].diachi_cty);
        $("#txt_dienthoai_skbct").val(data[0].dienthoai_cty);
        $("#txt_email_skbct").val(data[0].email);
        $("#txt_fax_skbct").val(data[0].fax);
        $("#txt_nguoipluat_skbct").val(data[0].nguoi_ddpl);
        $("#txt_chuvupl_skbct").val(data[0].chuvu_ddpl);
        $("#txt_nguoiuyquyen_skbct").val(data[0].nguoi_uyq);
        $("#txt_cvu_skbct").val(data[0].chucvu_uyq);
        $("#txt_sotainhn_skbct").val(data[0].sotkn_hang);
        $("#txt_chutaikhoan_skbct").val(data[0].tentkn_hang);
        $("#cb_tenhang_skbct").val(data[0].idngan_hang);
        $("#txt_ghichu_skbct").val(data[0].ghichu);
        $("#txt_sdtcsk_skbct").val(data[0].dienthoai_kdoanh);
        $("#txt_quyetdinh_skbct").val(data[0].quyetdinhso);
        $("#txt_coquanthue_skbct").val(data[0].ma_cqt);
        $("#txt_tencoquan_skbct").val(data[0].tencqt);
        $("#txt_madonviqly_skbct").val(data[0].madonviqly);
        if (data[0].hieuluc == '1') {
            $("#txt_hieuluc_skbct").prop("checked", true);
        } else {
            $("#txt_hieuluc_skbct").prop("checked", false);
        }

    } catch (e) { console.log(e);}
}










