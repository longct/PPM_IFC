var Datacmis_chot=[];
var idramdom_cmis = "";
var ngaychotcmis = "";
var giochotcmis = "";
$(document).ready(function () {
    showhideTree();
   
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $('#txtfixgiochot').timepicker({
        showMeridian: false,
        minuteStep: 1,
        secondStep: 1
    });
  
    f_Historyfilenamexml();
    $("#btntieptuc_step1").click(function () {
        var checkfile = checkvalidatefiledongbo();
        if (checkfile != "") {
            showToast(checkfile, 'error'); return;
        }
        step(2);
    });
    $("#btnTieptuccmis_2").click(function () {
        var timeaddday1 = timeaddday1($("#dt_thangnapcmis").val());
        var timesubday1 = timeaddday1($("#dt_thangnapcmis").val());
        if (ngaychotcmis)
        step(3);
    });
    $("#btnbackcmis_step2").click(function () {
        clearcmis();
        step(1);
    });
    $("#btnbackcmis_step3").click(function () {
        step(2);
    });
    $("#btnNapcmis").click(function () {
        var p = getAllIdMod();
        var checkfile = checkvalidatefiledongbo();
        if (checkfile != "") {
            showToast(checkfile, 'error');
            return;
        }
        if (p.dt_thangnapcmis == null || p.dt_thangnapcmis == "") {
            showToast('Vui lòng chọn tháng để nạp CMIS', 'error');
            return;
        }
        if (p.txtfixgiochot == null || p.txtfixgiochot == "") {
            showToast('Vui lòng chọn giờ để nạp CMIS', 'error');
            return;
        }
        f_napcmiss();
    });
    $("#btnXuatExcel").click(function () {
        var length_ks = $("#tbl_cmis tbody tr").length;
        if (length_ks == 0) {
            showToast('Không có dữ liệu.', 'error');
            return;
        }
        fn_XuatExcel_cmis();
    });
    $("#btnXuatXML").click(function () {
        var length_ks = $("#tbl_cmis tbody tr").length;
        if (length_ks == 0) {
            showToast('Không có dữ liệu.', 'error');
            return;
        }
        fn_XuatXML();
    });
    $("#btnKiemsoat").click(function () {
        var length_ks = $("#tbl_cmis tbody tr").length;
        if (length_ks == 0) {
            showToast('Không có dữ liệu. Vui lòng chọn file CMIS', 'error');
            return;
        }
        f_kiemsoatchiso();
    });
    $("#btnXoafile").click(function () {
        if ($("#sllichsuluufilecmis").val() == "-1") {
            showToast('Vui lòng chọn file cần xóa', 'error');
            return;
        } else {
            f_confimYesNo('Người dùng có chắn xóa không?</p>', "Hủy", "Đồng ý", fn_delete_historyfilexml);
        }
    });
    $("#btnLuufile").click(function () {
        $("#txt_file_cmis").val($('#txt_file_cmisdb')[0].files[0].name);
        $("#savefile_tkdn").modal("show");
    });
    $("#btn_dongy_cmis").on("click", function () {
        fn_dongy_file();
    });
});
function checkvalidatefiledongbo() {
    var file = $("#txt_file_cmisdb").get(0).files.length;
   
    if (file == 0) return 'Vui lòng chọn file CMIS trước khi thực hiện';
    if (file > 0) {
        var fname = $("#txt_file_cmisdb").get(0).files[0].name;
        var fileExt = fname.split('.').pop();
        if (fileExt.indexOf("xml") == -1) return 'Vui lòng chọn file xml';
    }
  
    return "";
}
function step(s) {
  
    switch (s) {
         case 1:
             $("#step_exec_1").show();
             $("#step_exec_2").hide();
             $("#step_exec_3").hide();
             $("#step_" + s).addClass("step-active");
             $("#step_" + s + " .step_stt div").removeClass("step_deactive");
             $("#step_" + s + " .step_stt div").addClass("step_done");
            break;
        case 2:
            $("#step_exec_1").hide();
            $("#step_exec_2").show();
            $("#step_exec_3").hide();
            $("#step_" + s).addClass("step-active");
            $("#step_" + s + " .step_stt div").removeClass("step_deactive");
            $("#step_" + s + " .step_stt div").addClass("step_done");
            break;
        case 3:
            $("#step_exec_1").hide();
            $("#step_exec_2").hide();
            $("#step_exec_3").show();
            $("#step_" + s).addClass("step-active");
            $("#step_" + s + " .step_stt div").removeClass("step_deactive");
            $("#step_" + s + " .step_stt div").addClass("step_done");
            break;

    }
}
//step1
function f_cleartemp_dbcmis(thiss) {
    try {
        $("#btntieptuc_step1").attr("disabled", "disabled");
        idramdom_cmis = Math.random().toString(36).substr(2); // gán idrandom khi file được chọn
        f_inportFileXmlToOracle();
    } catch (e) {
        console.log(e);
    }

}
function f_inportFileXmlToOracle() {
    try {
        var fdata = new FormData();
        var files = $('#txt_file_cmisdb')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "ConnectOracle_Amiss4");
        fdata.append("insertto", "TEMP_DBCMIS_BACKUP");
        fdata.append("idrandom", idramdom_cmis);
        var config = { callback: "f_result_inportFileXmlToOracle" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}

function f_result_inportFileXmlToOracle(config, para, lst) {
    try {
        console.log(lst);
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
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.GetCMISfromTEMP", callback: "result_loadCMIS" };
        var para = { v_IDRANDOM: idramdom_cmis };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_loadCMIS(config, para, lst) {
    try {
      
        var data = lst.data;
        Datacmis_chot = data;
        $(".panel-tkdn").show();
        $("#tbl_cmis tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }
        $("#btntieptuc_step1").removeAttr("disabled");
        $("#msg_info_cmis").show();
        ngaychotcmis = data[0].ngaychot;
        giochotcmis = data[0].giochot;
        if ($(".datepicker").val() == "") $(".datepicker").val(ngaychotcmis);
        $('#txtfixgiochot').val(giochotcmis);
        $("#msg_info_cmis").html("Có <b>" + data.length + "</b> khách hàng - Ngày chốt: <b>" + ngaychotcmis + "</b>");
        $.each(data, function (index, value) {
            var row = "<tr>"
            + "<td class='c'><input type='checkbox' class='from-control' class='chkchoncmis' checked></td>"
            + "<td class='c'>" + setnull(value.ma_nvgcs) + "</td>"
            + "<td class='c'>" + setnull(value.ma_khang) + "</td>"
            + "<td class='c'>" + setnull(value.ma_ddo) + "</td>"
            + "<td class='c'>" + setnull(value.ma_dviqly) + "</td>"
            + "<td class='c'>" + setnull(value.ma_gc) + "</td>"
            + "<td class='c'>" + setnull(value.ma_quyen) + "</td>"
            + "<td class='c'>" + setnull(value.ma_tram) + "</td>"
            + "<td class='c'>" + setnull(value.bocso_id) + "</td>"
            + "<td class='c'>" + setnull(value.loai_bcs) + "</td>"
            + "<td class='c'>" + setnull(value.loai_cs) + "</td>"
            + "<td>" + setnull(value.ten_khang) + "</td>"
            + "<td>" + setnull(value.dia_chi) + "</td>"
            + "<td class='c'>" + setnull(value.ma_nn) + "</td>"
            + "<td class='c'>" + setnull(value.so_ho) + "</td>"
            + "<td class='c'>" + setnull(value.ma_cto) + "</td>"
            + "<td class='c'>" + setnull(value.sery_cto) + "</td>"
            + "<td class='c'>" + setnull(value.hsn) + "</td>"
            + "<td class='c'>" + setnull(value.cs_cu) + "</td>"
            + "<td class='c'>" + setnull(value.ttr_cu) + "</td>"
            + "<td class='c'>" + setnull(value.sl_cu) + "</td>"
            + "<td class='c'>" + setnull(value.sl_ttiep) + "</td>"
            + "<td class='c'>" + setnull(value.ngay_cu) + "</td>"
            + "<td class='c'>" + setnull(value.cs_moi) + "</td>"
            + "<td class='c'>" + setnull(value.sl_moi) + "</td>"
            + "<td class='c'>" + setnull(value.chuoi_gia) + "</td>"
            + "<td class='c'>" + setnull(value.ky) + "</td>"
            + "<td class='c'>" + setnull(value.thang) + "</td>"
            + "<td class='c'>" + setnull(value.nam) + "</td>"
            + "<td class='c'>" + setnull(value.ngay_moi) + "</td>"
            + "<td class='c'>" + setnull(value.nguoi_gcs) + "</td>"
            + "<td class='c'>" + setnull(value.sl_thao) + "</td>"
            + "<td class='c'>" + setnull(value.kimua_cspk) + "</td>"
            + "<td class='c'>" + setnull(value.ma_cot) + "</td>"
            + "<td class='c'>" + setnull(value.sluong_1) + "</td>"
            + "<td class='c'>" + setnull(value.sluong_2) + "</td>"
            + "<td class='c'>" + setnull(value.sluong_3) + "</td>"
            + "<td class='c'>" + setnull(value.so_hom) + "</td>"
            + "<td class='c'>" + setnull(value.pmax) + "</td>"
            + "<td class='c'>" + setnull(value.ngay_pmax) + "</td>"
            + "<td class='c'>" + setnull(value.canhbao) + "</td>"
            + "</tr>";
            $("#tbl_cmis tbody").append(row);
        });
       
    } catch (e) {
        console.log(e);
    }
}
//step2
function f_napcmiss() {
    try {
        var p = getAllIdMod();

        var v_tren = p.txtTyletren;
        var v_duoi = p.txtTyleduoi;

        var v_TimeInput = "";
        if (p.dt_thangnapcmis.length > 9) {
            v_TimeInput = "01/" + p.dt_thangnapcmis.substr(3, 7);
        } else {
            v_TimeInput = "01/" + p.dt_thangnapcmis;
        };

        var v_Ky = p.cboSokychot_napcmiss;

        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.CalculateXmlCmiss_TheoKy", callback: "f_result_NapCMIS" };
        var para = {
            v_tren: v_tren,
            v_duoi: v_duoi,
            v_TimeInput: v_TimeInput,
            v_Hour: p.txtfixgiochot,
            v_Ky: v_Ky,
            v_IDRANDOM: idramdom_cmis
        };
        console.log(para);
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_NapCMIS(config, para, lst) {
    try {
        console.log(lst);
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
            + "<td class='text-right'>" + rederCellCsm(value.cs_moi, value.sery_cto, value.loai_bcs, value.hsn, value.cs_cu, value.istype) + "</td>"
            + "<td  id='slm_" + value.sery_cto + "_" + value.loai_bcs + "'>" + setnull(value.sl_moi) + "</td>"
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

        // Event người dùng nhập tay ô chỉ số mới
        $(".txt-csm").focusout(function () {
            if ($(this).val() == "0") return;

            var socongto = $(this).data('socongto');
            var loai_bcs = $(this).data('loai_bcs');
            var csc = $(this).data('csc');
            var csm = $(this).val();
            var hsn = $(this).data('hsn');
            var istype = $(this).data('istype');
            try {
                // Với KH ko có trong db thì xác định istype dựa vào loai bcs
                if (istype == null || istype == "null") {
                    if (loai_bcs == "KT") istype = 1;
                    else istype = 3;
                }
                var slm = (parseFloat(csm) - parseFloat(csc)) * hsn;
                if (istype == 1)
                    slm = slm.toFixed(0);
                else slm = slm.toFixed(3);

                $(this).val(parseFloat($(this).val())); // Khử số 0 ở đầu
                $("#slm_" + socongto + "_" + loai_bcs).text(slm);

                f_update_csm_nhaptay(parseFloat(csm), slm, socongto, loai_bcs);
            } catch (e) {
                console.log(e);
            }
        });

        var i_download = '<i class="glyphicon glyphicon-download-alt" title="Xuất Excel" onclick="xuatexcel_cb(this)"></i>';
        $('#saithongtin').html('<b>' + sl_saithongtin + '</b> Khách hàng sai thông tin' + (sl_saithongtin == 0 ? "" : i_download));
        $('#slquacao').html('<b>' + sl_quacao + '</b> Khách hàng có SL mới lớn hơn sản lượng cũ ' + para.v_tren + '% ' + (sl_quacao == 0 ? "" : i_download));
        $('#slquathap').html('<b>' + sl_quathap + '</b> Khách hàng có SL mới nhỏ hơn sản lượng cũ ' + para.v_duoi + '%' + (sl_quathap == 0 ? "" : i_download));
        $('#khongcochiso').html('<b>' + sl_kocochiso + '</b> Khách hàng Không có chỉ số' + (sl_kocochiso == 0 ? "" : i_download));
        $('#slam').html('<b>' + sl_am + '</b> Khách hàng có SL âm do thay hoặc hư hỏng công tơ' + (sl_am == 0 ? "" : i_download));
        $('#slquanho').html('<b>' + sl_quanho + '</b> Khách hàng có SL quá nhỏ (<0.5)' + (sl_quanho == 0 ? "" : i_download));
        $('#slkhongtang').html('<b>' + sl_khongtang + '</b> Khách hàng có SL không tăng' + (sl_khongtang == 0 ? "" : i_download));


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

function rederCellCsm(csm, socongto, loai_bcs, hsn, cs_cu, istype) {
    var cell = csm;
    try {
        if (csm == "0") {
            cell = '<input type="number" class="txt-csm" value="0" data-hsn="' + hsn + '" data-csc="' + cs_cu + '"data-socongto="' + socongto + '" data-loai_bcs="' + loai_bcs + '" data-istype="' + istype + '" />'
        }
    } catch (e) {
        console.log(e);
    }
    return cell;
}

function f_update_csm_nhaptay(csm, slm, socongto, loai_bcs) {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.Update_CSM_Nhaptay", callback: "f_result_update_csm_nhaptay" };
        var para = {
            v_socongto: socongto,
            v_loai_bcs: loai_bcs,
            v_csm: csm,
            v_slm: slm,
            v_IDRANDOM: idramdom_cmis
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_update_csm_nhaptay(config, para, result) { }
function fn_XuatExcel_cmis() {
    try {
        var p = getAllIdMod();
        var namef_l = 'dongbocmiss' + $("#dt_thangnapcmis").val().replace("/", "-");
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.ExportFileCmis", namefile: namef_l };
        var para = {
            v_random_id: idramdom_cmis
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
  
    var p = getAllIdMod();

    var v_tren = p.txtTyletren;
    var v_duoi = p.txtTyletren;
    var v_Ky = p.cboSokychot_napcmiss;

    var namef_l = 'dongbocmiss' + $("#dt_thangnapcmis").val().replace("/", "-");

    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.ExportFileCmis", namefile: namef_l };
    var para = {
        v_random_id: idramdom_cmis
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
//kiem soat chi so
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
//xóa file
function fn_delete_historyfilexml() {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.DELETEHISTORYFILEXML", callback: "f_result_deletehistoryfilexml" };
        var para = {
            v_IDRANDOM: $("#sllichsuluufilecmis").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_deletehistoryfilexml(config, para, lst) {
    $("#napCmissResult").hide();
    if (lst != null) {

        var data = lst.data;
        var row = data[0].count;
        if (row > 0) {
            f_Historyfilenamexml();
            if (idramdom_cmis == $("#sllichsuluufilecmis").val()) {
                f_loadCMIS();
            }
            showToast('Xóa file thành công', 'success');
        }
        else {
            showToast('Xóa file không thành công', 'error');
        }

    } else {
        showToast('Xóa file không thành công', 'error');
    }
}

// fill data in lich su luu file
function f_Historyfilenamexml() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var v_UserName = userinfo.usercode;
        var v_Code = userinfo.code;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.HistoryFileNameXmlCmiss", callback: "f_result_Historyfilenamexml" };
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
    try {
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
// Tạo file Xml theo định dạng 64 qua URL
function fn_dongy_file() {
    try {
        // save data in table AM_TEMP_DBCMIS_BACKUP

        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.CHECKFILEXMLTEMPDBCMISBACKUP", callback: "f_result_checkfilexmltemdbcmissbackup_filecmis" };
        var para = {
            v_IDRANDOM: idramdom_cmis
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_checkfilexmltemdbcmissbackup_filecmis(config, para, lst) {
    try {
        if (lst != null) {
            var data = lst.data;
            var row = data[0].count;
            if (row > 0) {  //Nếu file đó đã được lưu vào bảng tạm AM_TEMP_DBCMIS_BACKUP
                f_save_filecmis();
            } else {  //Nếu file đó đã được lưu vào bảng tạm AM_TEMP_DBCMIS_BACKUP thì insert vào bảng tạm
                var fdata = new FormData();
                var files = $('#txt_file_cmisdb')[0].files[0];
                fdata.append("file", files);
                fdata.append("connstr", "ConnectOracle_Amiss4");
                fdata.append("insertto", "TEMP_DBCMIS_BACKUP");
                fdata.append("idrandom", idramdom_cmis);
                var config = { callback: "f_result_inportFileXmlToOracledbcmissbackup" };
                api_uploadFileXmlAllToOracle(config, fdata);
            }
        }
    } catch (e) { console.log(e); }
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
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var v_UserName = userinfo.usercode;
        var v_Code = userinfo.code;
        var v_FileName = $("#txt_file_cmis").val();
        var v_PathFile = idramdom_cmis; // save id của bảng  AM_TEMP_DBCMIS_BACKUP
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_DONGBOCMIS.SaveContentXmlCmiss", callback: "f_result_save_filecmis" };
        var para = {
            v_Code: v_Code,
            v_UserName: v_UserName,
            v_FileName: v_FileName,
            v_PathFile: v_PathFile,
            v_Action: "DONGBOCMISS"

        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_save_filecmis(config, para, lst) {
    try {
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
function clearcmis() {
    Datacmis_chot = [];
    $("#msg_info_cmis").html("");
    $("#msg_info_cmis").hide();
    $("#txt_file_cmisdb").val('');
    $(".panel-tkdn").hide();
    $("#tbl_cmis tbody").empty();
}