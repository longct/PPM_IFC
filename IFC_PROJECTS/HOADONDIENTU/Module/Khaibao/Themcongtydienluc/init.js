$(document).ready(function () {
    try {
        loadchecklog_master();

        messInfo("messinfo_kbttdluc", '', 'error');
        lstngahang();
        loadcoquanthue();
        $("#btn_cty").click(function () {
            var check = check_kbct();
            if (check != "") {
                //showToast(check, 'error');
                messInfo("messinfo_kbttdluc", check, 'error');
                return;
            }
            f_confimYesNo("Thêm mới thông tin doanh nghiệp", "Bỏ qua", "Xác nhận", function () {
                capnhatctydienluc();
            });
         

        });
        $("#bt_thaotdt").click(function () {
            clearnull();
        });

    } catch (e) {
        console.log(e);
    }
});

function check_kbct() {
    try{
        var p = getAllIdMod();
        if (p.txt_masothue_kbct == "") return "Mã số thuế không được bỏ trống";
        if (p.txt_dangkyk_kbct == "") return "Đăng ký giấy phép kinh doanh không được bỏ trống";
        if (p.txt_ctydienluc_kbct == "") return "Công ty điện lực không được bỏ trống";
        if (p.txt_diachi_kbct == "") return "Địa chỉ không được bỏ trống";
        if (p.txt_dienthoai_kbct == "") return "Điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_dienthoai_kbct) == false) return "Số điện thoại phải là số";
        if (p.txt_email_kbct == "" ) return "Email không được để trống";
        if (IsEmail(p.txt_email_kbct) == false) return "Không đúng định dạng email";
        if (p.txt_fax_kbct == "") return "Fax không được bỏ trống";
        if (p.txt_nguoiuyquyen_kbct == "") return "Người ủy quyền không được bỏ trống";
        if (p.txt_nguoipluat_kbct == "") return "Người đại diện pháp luật không được bỏ trống";
        if (p.txt_quyetdinh_kbct == "") return "Quyết đinh số không được bỏ trống";
        if (p.txt_sotainhn_kbct == "") return "Số tài khoản ngân hàng không được bỏ trống";
        if (p.txt_chutaikhoan_kbct == "") return "Chủ tài khoản không được bỏ trống";
        if (p.cb_tenhang_kbct == "-1") return "Vui lòng chọn tên ngân hàng";
        if (p.txt_coquanthue_kbct == "-1") return "Cơ quan thuế không được bỏ trống";
        if (p.txt_sdtcsk_kbct == "") return "Số điện thoại chăm sóc khách hàng không bỏ trống";
        if (p.txt_madonviqly_kbct == "") return "Mã đơn vị không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function lstngahang() {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NGANHANG", callback: "result_lstngahang" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstngahang(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("cb_tenhang_kbct", data, "id", "tenn_hang", "-1", "Chọn ngân hàng ");
    } catch (e) {
        console.log(e);
    }
}
function loadcoquanthue() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_COQTHUE", callback: "result_loadcoquanthue" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadcoquanthue(config, para, lst) {
    try{
        var data = lst.data;
        
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("txt_coquanthue_kbct", data, "ma_cqt", "tencqt", "-1", "Chọn cơ quan thuế");
    } catch (e) {
        console.log(e);
    } 
}
function capnhatctydienluc() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var check = $("#txt_hieuluc_kbct").is(":checked") ? 1 : 0;
  
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCTY.THEM_CTY", callback: "result_capnhatctydienluc" };
        var para = {
            v_MASOTHUE: p.txt_masothue_kbct,
            v_TENCTY: p.txt_ctydienluc_kbct,
            v_TENCTYA: p.txt_ctytienganh_kbct,
            v_DIACHI: p.txt_diachi_kbct,
            v_DIENTHOAI: p.txt_dienthoai_kbct,
            v_EMAIL: p.txt_email_kbct,
            v_NGUOI_LH: p.txt_nguoiuyquyen_kbct,
            v_NGUOI_DPL: p.txt_nguoipluat_kbct,
            v_SOTKN_HANG: p.txt_sotainhn_kbct,
            v_CTKN_HANG: p.txt_chutaikhoan_kbct,
            v_IDN_HANG: p.cb_tenhang_kbct,
            v_GHICHU: p.txt_ghichu_kbct,
            v_MA_CQT: p.txt_coquanthue_kbct,
            v_CHUKYSO: '',
            v_QUETDINHSO: p.txt_quyetdinh_kbct,
            v_DANGKYKD: p.txt_dangkyk_kbct,
            v_CHUV_DPL: p.txt_chuvupl_kbct,
            v_CHUVU_LH: p.txt_cvu_kbct,
            v_SDTCSK: p.txt_sdtcsk_kbct,
            v_FAX: p.txt_fax_kbct,
            v_USERID: userinfo.userid,
            v_HIEULUC: check,
            v_MADONVIQL: p.txt_madonviqly_kbct
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatctydienluc(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kbttdluc", row, 'ok');
            setTimeout(function () {
                loadlstdienluc(1);
                clearnull();
            }, 1000);
        } else {
            messInfo("messinfo_kbttdluc", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clearnull() {
try {
    setValToTxt("txt_masothue_kbct", "");
    setValToTxt("txt_dangkyk_kbct", "");
    setValToTxt("txt_ctydienluc_kbct", "");
    setValToTxt("txt_ctytienganh_kbct", "");
    setValToTxt("txt_diachi_kbct", "");
    setValToTxt("txt_dienthoai_kbct", "");
    setValToTxt("txt_email_kbct", "");
    setValToTxt("txt_fax_kbct", "");
    setValToTxt("txt_nguoipluat_kbct", "");
    setValToTxt("txt_chuvupl_kbct", "");
    setValToTxt("txt_nguoiuyquyen_kbct", "");
    setValToTxt("txt_cvu_kbct", "");
    setValToTxt("txt_sotainhn_kbct", "");
    setValToTxt("txt_chutaikhoan_kbct", "");
    setValToTxt("cb_tenhang_kbct", "-1");
    setValToTxt("txt_ghichu_kbct", "");
    setValToTxt("txt_coquanthue_kbct", "-1");
    setValToTxt("txt_sdtcsk_kbct", "");
    setValToTxt("txt_quyetdinh_kbct", "");
    $("#txt_hieuluc_kbct").prop("checked", false);

    } catch (e) {
      console.log(e);
   }
}

