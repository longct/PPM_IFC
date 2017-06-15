
var idramdom_cmis_nxhhu = "";
$(document).ready(function () {
    try {
        showhideTree()
        selectlang();
        initformelement();
        loadContent();
        $("#date_ngay").val(gettimenow());
        $('#cmis_input_cnhhu').change(function () {
           
            var fname = $("#cmis_input_cnhhu").get(0).files[0].name;
            var fileExt = fname.split('.').pop();
            if (fileExt.indexOf("xml") == -1) { // kiem tra chi dc chon file co duoi .xml
                showToast('Vui lòng chọn file xml', "error");
                $("#cmis_input_cnhhu").val("");
                return;
            }
           f_upload_file_xml();
        });

        //Sự kiện cho
        $("input[name=rdtype]").change(function () {

            if ($(this).val() == "xuatdulieu") {
                $("#btnLocdulieu").show();
                $("#btnXuatfilexml").show();

                $("#btnLuuChiSoMoi").hide();

            } else {
                $("#btnLocdulieu").hide();
                $("#btnXuatfilexml").hide();
                $("#btnLuuChiSoMoi").show();
            }
        });

        $("#btnLocdulieu").click(function () {
            var file = $("#cmis_input_cnhhu").get(0).files.length;
            if (file == 0) { showToast('Vui lòng chọn file CMIS trước khi thực hiện', 'error'); return; };
            f_loc_du_lieu_hhu();
        });

        $("#btnLuuChiSoMoi").click(function () {
            var file = $("#cmis_input_cnhhu").get(0).files.length;
            if (file == 0) { showToast('Vui lòng chọn file CMIS trước khi thực hiện', 'error'); return; };
           f_luu_chi_so_hhu_vao_db();
        });
        $("#btnXuatfilexml").click(function () {
            var file = $("#cmis_input_cnhhu").get(0).files.length;
            if (file == 0) { showToast('Vui lòng chọn file CMIS trước khi thực hiện', 'error'); return; };
            f_export_filexml_xnhhu();
        });
    } catch (e) {
        console.log(e);
    }

});

function f_luu_chi_so_hhu_vao_db(){
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));

        var config = {
            connstr: "ConnectOracle233",
            namesql: "ADMISS_XUATNHAPHHU.SaveCSMXmlCmiss_HHU",
            callback: "f_luu_chi_so_hhu_vao_db_callback"
        };
        var para = {
            v_userId: objUser.userid,
            v_Username: objUser.usercode,
            timeInput: $("#date_ngay").val(),
            v_IDRANDOM: idramdom_cmis_nxhhu
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_luu_chi_so_hhu_vao_db_callback(config, para, lst) {
    try {
       
        var data = lst.data;
        //console.log("loc:" +data.length);
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            stopLoad();
            return;
        }
        showToast('Nhập thành công ' + data[0].kq + ' chỉ số mới', "success");
        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

function f_loc_du_lieu_hhu(){
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));
        var v_FileName =$('#cmis_input_cnhhu')[0].files[0].name;
        var config = {
            connstr: "ConnectOracle233",
            namesql: "ADMISS_XUATNHAPHHU.SelectXmlCmiss_HHU",
            callback: "f_loc_du_lieu_hhu_callback"
        };
        var para = {
            v_TimeInput:$("#date_ngay").val(),
            v_Ky:1,
            v_UserId: objUser.userid,
            v_Code: objUser.code,
            v_UserName: objUser.usercode,
            v_FileName:v_FileName,
            v_KeyFile:idramdom_cmis_nxhhu,
            v_Action: "xuatcmishhu"
        };
        callLoad();
        //console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

function f_loc_du_lieu_hhu_callback(config, para, lst) {
    try {
        stopLoad();
        var sub_totalKCCS = 0;
        var sub_totalMDD = 0;
        var sub_totalccs = 0;
        var data = lst.data;
        $("#tbl_nxhhu tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }
        $.each(data[0].kq0, function (index, value) {
            if (parseInt(value.trangthai) == 1) {// diem do khong co so cong to
                sub_totalMDD++;
            }
            else  if (parseInt(value.trangthai) == 0){ // diem do khong co chi so
                sub_totalKCCS++;
            }
         
            var row = "<tr>"
            + "<td>" + setnull(value.ma_nvgcs) + "</td>"
            + "<td>" + setnull(value.ma_khang) + "</td>"
            + "<td>" + setnull(value.ma_ddo) + "</td>"
            + "<td>" + setnull(value.ma_dviqly) + "</td>"
            + "<td>" + setnull(value.ma_gc) + "</td>"
            + "<td>" + setnull(value.ma_quyen) + "</td>"
            + "<td>" + setnull(value.ma_tram) + "</td>"
            + "<td>" + setnull(value.bocso_id) + "</td>"
            + "<td>" + setnull(value.loai_bcs) + "</td>"
            + "<td>" + setnull(value.loai_cs) + "</td>"
            + "<td>" + setnull(value.ten_khang) + "</td>"
            + "<td>" + setnull(value.dia_chi) + "</td>"
            + "<td>" + setnull(value.ma_nn) + "</td>"
            + "<td>" + setnull(value.so_ho) + "</td>"
            + "<td>" + setnull(value.ma_cto) + "</td>"
            + "<td>" + setnull(value.sery_cto) + "</td>"
            + "<td>" + setnull(value.hsn) + "</td>"
            + "<td>" + setnull(value.cs_cu) + "</td>"
            + "<td>" + setnull(value.ttr_cu) + "</td>"
            + "<td>" + setnull(value.sl_cu) + "</td>"
            + "<td>" + setnull(value.sl_ttiep) + "</td>"
            + "<td>" + setnull(value.ngay_cu) + "</td>"
            + "<td>" + setnull(value.cs_moi) + "</td>"
            + "<td>" + setnull(value.sl_moi) + "</td>"
            + "<td>" + setnull(value.chuoi_gia) + "</td>"
            + "<td>" + setnull(value.ky) + "</td>"
            + "<td>" + setnull(value.thang) + "</td>"
            + "<td>" + setnull(value.nam) + "</td>"
            + "<td>" + setnull(value.ngay_moi) + "</td>"
            + "<td>" + setnull(value.nguoi_gcs) + "</td>"
            + "<td>" + setnull(value.sl_thao) + "</td>"
            + "<td>" + setnull(value.kimua_cspk) + "</td>"
            + "<td>" + setnull(value.ma_cot) + "</td>"
            + "<td>" + setnull(value.sluong_1) + "</td>"
            + "<td>" + setnull(value.sluong_2) + "</td>"
            + "<td>" + setnull(value.sluong_3) + "</td>"
            + "<td>" + setnull(value.so_hom) + "</td>"
            + "<td>" + setnull(value.pmax) + "</td>"
            + "<td>" + setnull(value.ngay_pmax) + "</td>"
            + "</tr>";
            $("#tbl_nxhhu tbody").append(row);
        });
        $(".divMessage_nxhhucmis").show();
        $(".kh_ccs").html("<b>" + data[1].kq1.length + "</b> Khách hàng có chỉ số trong ngày " + $("#date_ngay").val() + "<br/>");
        $(".kh_kccs").html("<b>" + (sub_totalMDD + sub_totalKCCS) + "</b> khách hàng không có dữ liệu trong ngày " + $("#date_ngay").val() + " cần xuất ra HHU</span><br/>");
        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

function f_upload_file_xml(){
    try {
        idramdom_cmis_nxhhu = Math.random().toString(36).substr(2); // gán idrandom khi file được chọn
        var fdata = new FormData();
        var files = $('#cmis_input_cnhhu')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "ConnectOracle233");
        fdata.append("insertto", "AM_TEMP_NHAPXUAT_CMIS_HHU");
        fdata.append("idrandom", idramdom_cmis_nxhhu);
        callLoad();
        var config = { callback: "f_select_data_from_temp_table" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}


function f_select_data_from_temp_table(config, para, lst) {
    try {
        $(".kh_ccs").html("");
        $(".kh_kccs").html("");
        $(".divMessage_nxhhucmis").hide();
        stopLoad();
        if (lst.result != "OK") {
            showToast('Vui lòng kiểm tra lại file', 'error');
            return;
        }
        f_loadCMIS_NX();

    } catch (e) {
        console.log(e);
        stopLoad();
    }
}
function f_loadCMIS_NX() {
    var config = { connstr: "ConnectOracle233", namesql: "ADMISS_XUATNHAPHHU.SELECT_TEMP_NHAPXUAT_CMIS_HHU", callback: "f_select_data_from_temp_table_callback" };
    var para = { v_IDRANDOM: idramdom_cmis_nxhhu };
    callLoad();
    ExecuteServiceSyns(config, para);
}

function f_select_data_from_temp_table_callback(config, para, lst) {
    try {
        stopLoad();
        var data = lst.data;
        $(".sobanghi").html("Tổng số <b>" + data.length + "</b> bản ghi");
        $("#tbl_nxhhu tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");       
            return;
        }

        $.each(data, function (index, value) {
            var row = "<tr>"
            + "<td>" + setnull(value.ma_nvgcs) + "</td>"
            + "<td>" + setnull(value.ma_khang) + "</td>"
            + "<td>" + setnull(value.ma_ddo) + "</td>"
            + "<td>" + setnull(value.ma_dviqly) + "</td>"
            + "<td>" + setnull(value.ma_gc) + "</td>"
            + "<td>" + setnull(value.ma_quyen) + "</td>"
            + "<td>" + setnull(value.ma_tram) + "</td>"
            + "<td>" + setnull(value.bocso_id) + "</td>"
            + "<td>" + setnull(value.loai_bcs) + "</td>"
            + "<td>" + setnull(value.loai_cs) + "</td>"
            + "<td>" + setnull(value.ten_khang) + "</td>"
            + "<td>" + setnull(value.dia_chi) + "</td>"
            + "<td>" + setnull(value.ma_nn) + "</td>"
            + "<td>" + setnull(value.so_ho) + "</td>"
            + "<td>" + setnull(value.ma_cto) + "</td>"
            + "<td>" + setnull(value.sery_cto) + "</td>"
            + "<td>" + setnull(value.hsn) + "</td>"
            + "<td>" + setnull(value.cs_cu) + "</td>"
            + "<td>" + setnull(value.ttr_cu) + "</td>"
            + "<td>" + setnull(value.sl_cu) + "</td>"
            + "<td>" + setnull(value.sl_ttiep) + "</td>"
            + "<td>" + setnull(value.ngay_cu) + "</td>"
            + "<td>" + setnull(value.cs_moi) + "</td>"
            + "<td>" + setnull(value.sl_moi) + "</td>"
            + "<td>" + setnull(value.chuoi_gia) + "</td>"
            + "<td>" + setnull(value.ky) + "</td>"
            + "<td>" + setnull(value.thang) + "</td>"
            + "<td>" + setnull(value.nam) + "</td>"
            + "<td>" + setnull(value.ngay_moi) + "</td>"
            + "<td>" + setnull(value.nguoi_gcs) + "</td>"
            + "<td>" + setnull(value.sl_thao) + "</td>"
            + "<td>" + setnull(value.kimua_cspk) + "</td>"
            + "<td>" + setnull(value.ma_cot) + "</td>"
            + "<td>" + setnull(value.sluong_1) + "</td>"
            + "<td>" + setnull(value.sluong_2) + "</td>"
            + "<td>" + setnull(value.sluong_3) + "</td>"
            + "<td>" + setnull(value.so_hom) + "</td>"
            + "<td>" + setnull(value.pmax) + "</td>"
            + "<td>" + setnull(value.ngay_pmax) + "</td>"
            + "</tr>";
            $("#tbl_nxhhu tbody").append(row);
        });
        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}
function f_export_filexml_xnhhu() {
    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var v_FileName = $('#cmis_input_cnhhu')[0].files[0].name;
    var namef_l = 'dongbocmiss' + $("#date_ngay").val().replace("/", "-");
    var config = {
        connstr: "ConnectOracle233",
        namesql: "ADMISS_XUATNHAPHHU.SelectXmlCmiss_HHU",
        namefile: namef_l
    };
    var para = {
        v_TimeInput: $("#date_ngay").val(),
        v_Ky: 1,
        v_UserId: objUser.userid,
        v_Code: objUser.code,
        v_UserName: objUser.usercode,
        v_FileName: v_FileName,
        v_KeyFile: idramdom_cmis_nxhhu,
        v_Action: "xuatcmishhu"
    };

    var colum = {
        kq: [
            { field: "ma_nvgcs", name: "MA_NVGCS", type: "Text" },
            { field: "ma_khang", name: "MA_KHANG", type: "Text" },
            { field: "ma_ddo", name: "MA_DDO", type: "Text" },
            { field: "ma_dviqly", name: "MA_DVIQLY", type: "Text" },
            { field: "ma_gc", name: "MA_GC", type: "Text" },
            { field: "ma_quyen", name: "MA_QUYEN", type: "Text" },
            { field: "ma_tram", name: "MA_TRAM", type: "Text" },
            { field: "bocso_id", name: "BOCSO_ID", type: "Text" },
            { field: "loai_bcs", name: "LOAI_BCS", type: "Text" },
            { field: "loai_cs", name: "LOAI_CS", type: "Text" },
            { field: "ten_khang", name: "TEN_KHANG	", type: "Text" },
            { field: "dia_chi", name: "DIA_CHI", type: "Text" },
            { field: "ma_nn", name: "MA_NN", type: "Text" },
            { field: "so_ho", name: "SO_HO", type: "Text" },
            { field: "ma_cto", name: "MA_CTO", type: "Text" },
            { field: "sery_cto", name: "SERY_CTO", type: "Text" },
            { field: "hsn", name: "HSN", type: "Text" },
            { field: "cs_cu", name: "CS_CU", type: "Text" },
            { field: "ttr_cu", name: "TTR_CU", type: "Text" },
            { field: "sl_cu", name: "SL_CU", type: "Text" },
            { field: "sl_ttiep", name: "SL_TTIEP", type: "Text" },
            { field: "ngay_cu", name: "NGAY_CU", type: "Text" },
            { field: "cs_moi", name: "CS_MOI", type: "Text" },
            { field: "sl_moi", name: "SL_MOI", type: "Text" },
            { field: "chuoi_gia", name: "CHUOI_GIA", type: "Text" },
            { field: "ky", name: "KY", type: "Text" },
            { field: "thang", name: "THANG", type: "Text" },
            { field: "nam", name: "NAM", type: "Text" },
            { field: "ngay_moi", name: "NGAY_MOI", type: "Text" },
            { field: "nguoi_gcs", name: "NGUOI_GCS", type: "Text" },
            { field: "sl_thao", name: "SL_THAO", type: "Text" },
            { field: "kimua_cspk", name: "KIMUA_CSPK", type: "Text" },
            { field: "ma_cot", name: "MA_COT", type: "Text" },
            { field: "sluong_1", name: "SLUONG_1", type: "Text" },
            { field: "sluong_2", name: "SLUONG_2", type: "Text" },
            { field: "sluong_3", name: "SLUONG_3", type: "Text" },
            { field: "so_hom", name: "SO_HOM", type: "Text" },
            { field: "pmax", name: "PMAX", type: "Text" },
            { field: "ngay_pmax", name: "NGAY_PMAX", type: "Text" }
        ]
    };
    ExecuteExportXmlOracle(config, para, colum);
}