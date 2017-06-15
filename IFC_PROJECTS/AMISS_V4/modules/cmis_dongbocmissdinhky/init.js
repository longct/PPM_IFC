﻿var Datacmis_chot;
var idramdom_cmis = "";
$(document).ready(function () {
    try {
        loadContent();
        selectlang();
        showhideTree();
        $('.datepicker').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            minViewMode: 'months'

        });
        $('#txtfixgiochot').timepicker({
            showMeridian: false,
            minuteStep: 1,
            secondStep: 1,
            defaultTime: false
        });
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
        f_Historyfilenamexml();
        $('#btnThietlap').click(function () {
            f_thietlapkychot();
        });
        $('#btnKiemsoat').click(function () {
            var length_ks = $("#tbl_cmis tbody tr").length;
            if (length_ks == 0) {
                showToast('Không có dữ liệu. Vui lòng chọn file CMIS', 'error');
                return;
            }
            f_kiemsoatchiso();
        });
        $('#btnNapcmis').click(function () {
            var p = getAllIdMod();
            var checkfile = checkvalidate();
            if (checkfile != "") {
                showToast(checkfile, 'error');
                return;
            }
            if (p.dt_thangnapcmis == null || p.dt_thangnapcmis == "") {
                showToast('Vui lòng chọn tháng để nạp CMIS', 'error');
                return;
            }

            f_napcmiss();
        });

        $("#sokychot").change(function () {
            var ky = $(this).val();
            var fixDay;
            switch (ky) {
                case '1':
                    fixDay = "1"; break;
                case '2':
                    fixDay = "1,2"; break;
                case '3':
                    fixDay = "1,2,3"; break;
                default: fixDay = "1"; break;
            }

            $("#txtFixday").val(fixDay);
        });
        $("#btnXuatXML").on("click", function () {
            var length_ks = $("#tbl_cmis tbody tr").length;
            if (length_ks == 0) {
                showToast('Không có dữ liệu. Vui lòng chọn file CMIS', 'error');
                return;
            }
            fn_XuatXML();
        });
        $("#btnXuatExcel").on("click", function () {
            var length_ks = $("#tbl_cmis tbody tr").length;
            if (length_ks == 0) {
                showToast('Không có dữ liệu.', 'error');
                return;
            }
            fn_XuatExcel_cmis();
        });
        $("#btnLuufile").on("click", function () {
            var file = $("#txt_file").get(0).files.length;
            if (file == 0) { showToast('Vui lòng chọn file CMIS trước khi thực hiện', 'error'); return; };
            $("#txt_file_cmis").val($('#txt_file')[0].files[0].name);
            $("#savefile_tkdn").modal("show");
        });
        $("#btn_dongy_cmis").on("click", function () {
            fn_dongy_file();
        });
        $("#sllichsuluufilecmis").on("change", function () {
            fn_export_historyfilexml();
        });
        $("#btnXoafile").on("click", function () {
            if ($("#sllichsuluufilecmis").val() =="-1") {
                showToast('Vui lòng chọn file cần xóa', 'error');
                return;
            } else {
                f_confimYesNo('Người dùng có chắn xóa không?</p>', "Hủy", "Đồng ý", fn_delete_historyfilexml);
            }
        });
       
    } catch (e) {
        console.log(e);
    }


});

function f_napcmiss() {
    try {
        var p = getAllIdMod();

        var v_tren = p.txtTyletren;
        var v_duoi = p.txtTyleduoi;

        var v_TimeInput = "";
        if (p.date_thang.length > 9) {
            v_TimeInput = "01/" + p.dt_thangnapcmis.substr(3, 7);
        } else {
            v_TimeInput = "01/" + p.dt_thangnapcmis;
        };

        var v_Ky = p.cboSokychot_napcmiss;

        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.CalculateXmlCmiss_TheoKy3", callback: "f_result_NapCMIS" };
        var para = {
            v_tren: v_tren,
            v_duoi: v_duoi,
            v_TimeInput: v_TimeInput,
            v_Ky: v_Ky,
            v_IDRANDOM:idramdom_cmis
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_NapCMIS(config, para, lst) {
    try {
        stopLoad();
        var data = lst.data;
        $("#napCmissResult").attr("style", "display:block");
        var sl_saithongtin = 0;
        var sl_quacao = 0;
        var sl_quathap = 0;
        var sl_kocochiso = 0;
        var sl_am = 0;
        var sl_quanho = 0;
        var sl_khongtang = 0;
        $("#tbl_cmis tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }
     
        $.each(data, function (index, value) {
            var color = "";
            if (parseInt(value.canhbao) == 1) {
                sl_quacao++;
                color = "#dc9c39"
            }
            else if (parseInt(value.canhbao) == 2) {
                sl_quathap++;
                color = "#ffeb3b"
            }
            else if (parseInt(value.canhbao) == 3) {
                sl_am++;
                color = "#ff9800"
            }
            else if (parseInt(value.canhbao) == 4) {
                sl_kocochiso++;
                color = "#e91e63"
            }

            else if (parseInt(value.canhbao) == 5) {
                sl_quanho++;
                color = "#9c27b0"

            }
            else if (parseInt(value.canhbao) == 6) {
                sl_khongtang++;
                color = "#3f51b5"
            }
            else if (parseInt(value.napok) != 1) {
                sl_saithongtin++;
                color = "#ff5722"
            }
            var row = "<tr style='color:" + color + "'>"
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
            + "<td>" + setnull(f_checkcb(value.canhbao)) + "</td>"
            + "</tr>";
            $("#tbl_cmis tbody").append(row);
        });

        $('#saithongtin').html('<b>' + sl_saithongtin + '</b> Khách hàng sai thông tin');
        $('#slquacao').html('<b>' + sl_quacao + '</b> Khách hàng có SL mới lớn hơn sản lượng cũ ' + para.v_tren + '% ');
        $('#slquathap').html('<b>' + sl_quathap + '</b> Khách hàng có SL mới nhỏ hơn sản lượng cũ ' + para.v_duoi + '%');
        $('#khongcochiso').html('<b>' + sl_kocochiso + '</b> Khách hàng Không có chỉ số');
        $('#slam').html('<b>' + sl_am + '</b> Khách hàng có SL âm do thay hoặc hư hỏng công tơ');
        $('#slquanho').html('<b>' + sl_quanho + '</b> Khách hàng có SL quá nhỏ (<0.5)');
        $('#slkhongtang').html('<b>' + sl_khongtang + '</b> Khách hàng có SL không tăng');

    } catch (e) {
        console.log(e);
    }
}
function f_thietlapkychot() {
    try {
        var check = f_checkValidateAll();
        var checkfile = checkvalidate();
        if (checkfile != "") {
            showToast(checkfile, 'error');
            return;
        }
        check == undefined ? true : false;
        if (check) {
            showToast('Vui lòng chọn tháng và ngày chốt', 'error');
            return;
        }

        var p = getAllIdMod();

        var v_fixmonth = "";
        if (p.date_thang.length > 9) {
            v_fixmonth = "01/" + p.date_thang.substr(3, 7);
        } else {
            v_fixmonth = "01/" + p.date_thang;
        };

        var v_fixday = p.txtFixday;
        var v_circle = p.sokychot;
        var v_fixmonth = v_fixmonth
        var v_allYear = 0;
        var v_timeday = p.txtfixgiochot
        var v_userId = 1;

        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.UPDATE_FIX_DAY3", callback: "f_result_UPDATE_FIX_DAY3" };
        var para = {
            v_fixday: v_fixday,
            v_timeday: v_timeday,
            v_circle: v_circle,
            v_fixmonth: v_fixmonth,
            v_allYear: v_allYear,
            v_userId: v_userId,
            v_IDRANDOM:idramdom_cmis
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }

}
function checkvalidate() {
    var p = getAllIdMod();
    var file = $("#txt_file").get(0).files.length;
    if (file == 0) return "Vui lòng chọn file CMIS trước khi thực hiện";
    return "";
}
function f_result_UPDATE_FIX_DAY3(config, para, lst) {
    try {
        if (lst.result == "OK") {
            showToast('Thiết lập kỳ chốt thành công', 'success');
        } else {
            showToast('Thiết lập kỳ chốt không thành công', 'error');
        }
    } catch (e) {
        console.log(e);
    }
}

function f_cleartemp_dbcmis(thiss) {
    try {   
        idramdom_cmis = Math.random().toString(36).substr(2); // gán idrandom khi file được chọn
        f_inportFileXmlToOracle();
    } catch (e) {
        console.log(e);
    }

}
function f_inportFileXmlToOracle() {
    try {
        var fdata = new FormData();
        var files = $('#txt_file')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "ConnectOracle233");
        fdata.append("insertto", "AM_TEMP_DBCMIS_BACKUP");
        fdata.append("idrandom", idramdom_cmis);
        var config = { callback: "f_result_inportFileXmlToOracle" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}

function f_result_inportFileXmlToOracle(config, para, lst) {
    try {
        $("#napCmissResult").hide();
        if (lst.result != "OK") {
            showToast('Vui lòng kiểm tra lại file', 'error');
            return;
        }
        f_loadCMIS();
    } catch (e) {
        console.log(e);
    }
}

function f_loadCMIS() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.GetCMISfromTEMP", callback: "result_loadCMIS" };
        var para = {v_IDRANDOM:idramdom_cmis};
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_loadCMIS(config, para, lst) {
    try {

        var data = lst.data;
        Datacmis_chot = data;
        $("#tbl_cmis tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }   
        $(".sobanghi").html("Tổng số " + data.length + "<span tkey='banghi'></span>");
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
            + "<td>" + setnull(value.canhbao) + "</td>"
            + "</tr>";
            $("#tbl_cmis tbody").append(row);
        });
        selectlang();

    } catch (e) {
        console.log(e);
    }
}
function loaddaydata_kychot() {
    try {
        var lstId = [];
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var data = Datacmis_chot;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id != null) {
                var ID = {
                    cot1: data[i].id,
                    cot2: data[i].xem,
                    cot3: data[i].sua,
                    cot4: data[i].xoa,
                    cot5: data[i].download,
                    cot6: data[i].ins,
                    cot7: data[i].them,
                    cot8: userinfo.userid,
                    cot9: 'APQUYEN',

                };
                lstId.push(ID);
            } else {
                messInfo("messinfoxoa_apquyen", 'Quyền cập nhập không đúng', "error");
                return;
            }
        }
        var config = {
            connstr: "ConnectOracle233",
            insertto: "AM_TEMP_DB",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        if (lst != null) {
            capnhatquyen_taikhoan();
        }
        else {
            messInfo("messinfo_sdquyen_sua", 'Lỗi cập nhật', "error");
        }


    } catch (e) {
        console.log(e);
    }
}


function xuatexcel_cb(type) {
    try {
        // save data in table AM_TEMP_DBCMIS_BACKUP
        var namef_l = 'dongbocmiss' + $("#dt_thangnapcmis").val().replace("/","_");
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.EXPORTFILEEXCELCMISS", namefile: namef_l };
        var para = {
            v_IDRANDOM: idramdom_cmis,
            v_CANHBAO: type
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
                { field: "ngay_pmax", name: "NGAY_PMAX", type: "Text" },
                { field: "canhbao", name: "GHI CHÚ", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
function f_checkcb(cb) {
    try {
        var canhbao = "";
        var p = getAllIdMod();
        var v_tren = p.txtTyletren;
        var v_duoi = p.txtTyletren;
        switch (cb) {
            case "1":
                canhbao = "Sản lượng cao quá " + v_tren + "%";
                break;
            case "2":
                canhbao = "Sản lượng thấp quá " + v_duoi + "%";
                break;
            case "3":
                canhbao = "Sản lượng âm do thay hoặc hư hỏng công tơ";
                break;
            case "4":
                canhbao = "Không có chỉ số";
                break;
            case "5":
                canhbao = "Sản lượng quá nhỏ (< 0.5)";
                break;
            case "6":
                canhbao = "Sản lượng không tăng";
                break;
            default:
                canhbao = "";
                break;
        }
        return canhbao;
    } catch (e) {
        console.log(e);
    }
}

function f_kiemsoatchiso() {
    try {
        var dateNow = gettimenow();
        var tableHeader = "<table style='width:1024px; padding:5px 20px 0 20px;'><tr><td style='width:30%;'></td><td rowspan='2' style='width:40%; text-align:center'><b>KIỂM SOÁT CHỈ SỐ</b></td><td style='width:30%;'>Sổ: <b>" + $('#tbl_cmis tbody tr').eq(0).find("td").eq(5).html() + "</b></td></tr><tr><td style='text-align:center'><b>Tên điện lực cần lấy ra khi đăng nhập</b></td><td><b>" + dateNow + "</b></td><tr></table>";
        var tableContent = "<table class='cssTableReport' style='width:1024px; padding:5px 20px 0 20px;'><tr style='font-weith:bold; text-align:center'><td>Mã GC</td><td>BCS</td><td>Hệ số nhân</td><td>Chỉ số cũ</td><td>Chỉ số mới</td><td>Sản lượng cũ</td><td>Sản lượng mới</td><td>+/-(%)</td></tr>";
        var trContent = "";

        $('#tbl_cmis tbody tr').each(function (i, row) {
            var $row = $(row);
            var LOAI_BCS = $row.find("td").eq(8).html();
            if (LOAI_BCS == 'KT') {
                trContent += "<tr style='border:0; text-align:left; font-size:13px;'><td colspan='8'>" + $row.find("td").eq(11).html() + "<b style='margin-left:90px;'>Địa chỉ: </b>" + $row.find("td").eq(12).html() + "<b style='margin-left:80px;'>Số No: </b>" + $row.find("td").eq(16).html() + "<b style='margin-left:40px;'>Mã KH: </b>" + $row.find("td").eq(1).html() + "</td></tr>";
            }
            if (LOAI_BCS == 'BT') {
                trContent += "<tr style='border:0; text-align:left; font-size:13px;'><td colspan='8'>" + $row.find("td").eq(11).html() + "<b style='margin-left:90px;'>Địa chỉ: </b>" + $row.find("td").eq(12).html() + "<b style='margin-left:80px;'>Số No: </b>" + $row.find("td").eq(16).html() + "<b style='margin-left:40px;'>Mã KH: </b>" + $row.find("td").eq(1).html() + "</td></tr>";
            }
            trContent += "<tr><td>" + $row.find("td").eq(4).html() + "</td><td>" + $row.find("td").eq(8).html() + "</td> <td>" + $row.find("td").eq(16).html() + "</td><td>" + $row.find("td").eq(17).html() + "</td><td>" + $row.find("td").eq(22).html() + "</td><td>" + $row.find("td").eq(19).html() + "</td><td> " + $row.find("td").eq(23).html() + "</td><td>" + Math.round($row.find("td").eq(23).html() - $row.find("td").eq(19).html() * 100 / ($row.find("td").eq(19).html() == 0 ? 1 : $row.find("td").eq(19).html())) + "</td></tr>";
        });

        tableContent += trContent + "</table>";
        var printWindow = window.open('', '', 'height=400,width=1024,scrollbars=1');
        printWindow.document.write('<html><head><title>KIỂM SOÁT CHỈ SỐ</title><link rel="stylesheet" type="text/css" href="/css/TableGenerate.css"></head><body style="overflow-y: scroll; overflow:-moz-scrollbars-vertical">');
        printWindow.document.write(tableHeader);
        printWindow.document.write(tableContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(function () {
            printWindow.print();
        }, 500);

        return false;
    }
    catch (e) {
        //console.log(e.message)
    }
}
function fn_XuatExcel_cmis() {
    try {
        var file = $("#txt_file").get(0).files.length;
        if (file == 0) { showToast('Chưa có dữ liệu', "error"); return; }
        var p = getAllIdMod();

        var v_tren = p.txtTyletren;
        var v_duoi = p.txtTyletren;

        var v_TimeInput = "";
        if (p.date_thang.length > 9) {
            v_TimeInput = "01/" + p.dt_thangnapcmis.substr(3, 7);
        } else {
            v_TimeInput = "01/" + p.dt_thangnapcmis;
        };

        var v_Ky = p.cboSokychot_napcmiss;

        var namef_l = 'dongbocmiss' + v_TimeInput.replace("/", "-");

        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.CalculateXmlCmiss_TheoKy3", namefile: namef_l };
        var para = {
            v_tren: v_tren,
            v_duoi: v_duoi,
            v_TimeInput: v_TimeInput,
            v_Ky: v_Ky,
            v_IDRANDOM:idramdom_cmis
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
                { field: "ngay_pmax", name: "NGAY_PMAX", type: "Text" },
                { field: "canhbao", name: "GHI CHÚ", type: "Text" },
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    } catch (e) {
        console.log(e);
    }
}
function fn_XuatXML() {
    var file = $("#txt_file").get(0).files.length;
    if (file == 0) { showToast('Chưa có dữ liệu', "error"); return; }
    var p = getAllIdMod();

    var v_tren = p.txtTyletren;
    var v_duoi = p.txtTyletren;

    var v_TimeInput = "";
    if (p.date_thang.length > 9) {
        v_TimeInput = "01/" + p.dt_thangnapcmis.substr(3, 7);
    } else {
        v_TimeInput = "01/" + p.dt_thangnapcmis;
    };

    var v_Ky = p.cboSokychot_napcmiss;

    var namef_l = 'dongbocmiss' + v_TimeInput.replace("/", "-");

    var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.CalculateXmlCmiss_TheoKy3", namefile: namef_l };
    var para = {
        v_tren: v_tren,
        v_duoi: v_duoi,
        v_TimeInput: v_TimeInput,
        v_Ky: v_Ky
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
            { field: "ngay_pmax", name: "NGAY_PMAX", type: "Text" },
            { field: "canhbao", name: "GHI CHÚ", type: "Text" },
        ]
    };
    ExecuteExportXmlOracle(config, para, colum);


}

// Tạo file Xml theo định dạng 64 qua URL
function fn_dongy_file() {
    try {
        // save data in table AM_TEMP_DBCMIS_BACKUP
       
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.CHECKFILEXMLTEMPDBCMISBACKUP", callback: "f_result_checkfilexmltemdbcmissbackup_filecmis" };
        var para = {
            v_IDRANDOM: idramdom_cmis
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_checkfilexmltemdbcmissbackup_filecmis(config, para, lst) {
    try{
        if (lst != null) {
            var data = lst.data;
            var row = data[0].count;
            if (row > 0) {  //Nếu file đó đã được lưu vào bảng tạm AM_TEMP_DBCMIS_BACKUP
                f_save_filecmis();
            } else {  //Nếu file đó đã được lưu vào bảng tạm AM_TEMP_DBCMIS_BACKUP thì insert vào bảng tạm
                var fdata = new FormData();
                var files = $('#txt_file')[0].files[0];
                fdata.append("file", files);
                fdata.append("connstr", "ConnectOracle233");
                fdata.append("insertto", "AM_TEMP_DBCMIS_BACKUP");
                fdata.append("idrandom", idramdom_cmis);
                var config = { callback: "f_result_inportFileXmlToOracledbcmissbackup" };
                api_uploadFileXmlAllToOracle(config, fdata);
            }
        }
    } catch (e) { console.log(e);}
}
function f_result_inportFileXmlToOracledbcmissbackup(config, fdata, lst) {
    try {

        if (lst.result != "OK") {
            showToast('Vui lòng kiểm tra lại file', 'error');
            return;
        }
        f_save_filecmis();
    } catch (e) {
        console.log(e);
    }
}
function f_save_filecmis(config, para, lst) {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var v_UserName = userinfo.usercode;
        var v_Code = userinfo.code;
        var v_FileName = $("#txt_file_cmis").val();
        var v_PathFile = idramdom_cmis; // save id của bảng  AM_TEMP_DBCMIS_BACKUP
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.SaveContentXmlCmiss", callback: "f_result_save_filecmis" };
        var para = {
            v_Code: v_Code,
            v_UserName: v_UserName,
            v_FileName: v_FileName,
            v_PathFile: v_PathFile,
            v_Action:"DONGBOCMISS"

        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_save_filecmis(config, para, lst) {
    try{
        if (lst != null) {
            var data = lst.data;
            var row = data[0].count;
            if (row == 0) {
                showToast('File "' + para.v_FileName + '" lưu thành công', 'success');
                $("#savefile_tkdn").modal("hide");
                f_Historyfilenamexml();
            }
            else if (row == 1) {
                showToast('File "' + para.v_FileName + '" đã có trong hệ thống', 'error');
                $("#savefile_tkdn").modal("hide");
            }
            else if (row == 3) {
                showToast('Vui lòng nhập tên file khác', 'error');
            }
            else if (row == 2) {
                showToast('Lưu file thất bại', 'error');
            }

        } else {
            showToast('Lưu file thất bại', 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
// fill data in lich su luu file
function f_Historyfilenamexml() {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var v_UserName = userinfo.usercode;
        var v_Code = userinfo.code;
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.HistoryFileNameXmlCmiss", callback: "f_result_Historyfilenamexml" };
        var para = {
            v_Code: v_Code,
            v_UserName: v_UserName,
            v_Action: "DONGBOCMISS"
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Historyfilenamexml(config, para, lst) {
    try{
        if (lst != null) {
            var data = lst.data;
            $("#sllichsuluufilecmis").empty();
            $('#sllichsuluufilecmis').append($('<option>', {
                value: '-1',
                text: '-- Lịch sử lưu file  --'
            }));
            $.each(data, function (key, val) {
                $('#sllichsuluufilecmis').append($('<option>', {
                    value: val.pathfile,
                    text: val.tenfile
                }));
            });
        }
    } catch (e) {
        console.log(e);
    }
}

// fill data in table dannh sách các điểm đo
function fn_export_historyfilexml() {

    try{
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.EXPORTHISTORYFILEXML", callback: "f_result_exprotfilenamexml" };
        var para = {
            v_PathFile: $("#sllichsuluufilecmis").val()
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_exprotfilenamexml(config, para, lst) {
    try {
        stopLoad();
        var data = lst.data;
        Datacmis_chot = data;

        $("#tbl_cmis tbody").empty();
        $("#napCmissResult").hide();
        $(".sobanghi").html("Tổng số " + data.length + "<span tkey='banghi'></span>");

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
            + "<td>" + setnull(value.canhbao) + "</td>"
            + "</tr>";
            $("#tbl_cmis tbody").append(row);
        });
        selectlang();

    } catch (e) {
        console.log(e);
    }
}
function fn_delete_historyfilexml() {
    try{
        var config = { connstr: "ConnectOracle233", namesql: "amiss_dongbocmissv4.DELETEHISTORYFILEXML", callback: "f_result_deletehistoryfilexml" };
        var para = {
            v_IDRANDOM: $("#sllichsuluufilecmis").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_deletehistoryfilexml(config, para,lst) {
    $("#napCmissResult").hide();
    $(".sobanghi").html("");
    if (lst != null) {
       
        var data = lst.data;
        var row = data[0].count;
        if (row >0) {
           
            f_Historyfilenamexml();
            if (idramdom_cmis == $("#sllichsuluufilecmis").val()) {
                f_loadCMIS();
                $("#txt_file").val('');
            }
            showToast('Xóa file thành công', 'success');
        }
        else{
            showToast('Xóa file không thành công', 'error');
        }
       
    } else {
        showToast('Xóa file không thành công', 'error');
    }
}






























