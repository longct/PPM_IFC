
var Datacmis_chot = []; // lưu data sau khi choose file cmiss
var Datacmis_chot_kt=[]; //lưu data sau khi check kiem tra
var idram_kh="";
var count_nkhtcmis = 0;
var count_kqtt_nkhtcmis = 0;
$(document).ready(function () {
    try {
        showhideTree();
        selectlang();
        initformelement();
        f_GetData_ComboDL();
        loadContent();
       // $("#downloadfilemaunkhtcmiss").attr('href', urli + '/home/DownloadFileSaveOnServer/ref/filemau/Khaibaokhanghang.xml');
        $("#btnkiemtra_nkhtcmis").on("click", function () {
            Datacmis_chot.length = 0;
            if ($("#sl_tramnkhtcmis").val() == "-1") {
                showToast("Vui lòng chọn trạm", 'error');
                return;
            }
            var lenght_nkhtcmis=$("#txt_file_ckhtcmis").get(0).files.length;
            if (lenght_nkhtcmis > 0) {
                checkDataxml_nkhtcmis();
              
            } else {
                showToast('Vui lòng chọn file trước khi thực hiện', "error");
                return;
            }
        });
        $("#btnthuchien_nkhtcmis").on("click", function () {
            var lenght_nkhtcmis=$("#txt_file_ckhtcmis").get(0).files.length;
            if (lenght_nkhtcmis > 0) {
               count_kqtt_nkhtcmis = 0;
                update_maddo_nkhtcmis();
                import_data_nkhtcmis();
            }
            else {
                showToast('Vui lòng chọn file trước khi thực hiện', "error");
            }
        });
        $("#rdiXml").on("click", function () {
            $("#txt_file_ckhtcmis").attr('accept', '.xml');
            $("#downloadfilemaunexcelkhtcmiss").hide();
            $("#downloadfilemauxmlnkhtcmiss").show();
        });
        $("#rdiExcel").on("click", function () {
            $("#txt_file_ckhtcmis").attr('accept', '.xls,.xlsx');
            $("#downloadfilemaunexcelkhtcmiss").show();
            $("#downloadfilemauxmlnkhtcmiss").hide();
        });
        $("#txt_file_ckhtcmis").click(function () {
            $("#txt_file_ckhtcmis").val("");
        });
    } catch (e) {
        console.log(e);
    }

});

//upload file
function f_cleartemp(thiss) {
    try {
       
        $(".progress-bar-dtt").hide();
        $(".divMessage_cmiskh").hide();
        $(".divMessage_cmiskh").html("");
        $(".panel-nkhtcmis").hide();
        $(".total_khntcmis").hide();
        

    
        Datacmis_chot.length = 0;
        Datacmis_chot_kt.length = 0;
        idram_kh = "";
       
        if ($("#txt_file_ckhtcmis").get(0).files.length > 0) {
            var fname = $("#txt_file_ckhtcmis").get(0).files[0].name;
            var fileExt = fname.split('.').pop();
            var typeradio = $('input[type=radio][name=usingfile]:checked').val();
            if (typeradio.indexOf("xml") > -1) { // neu la chon xml
                if (fileExt.indexOf("xml") == -1) { // kiem tra chi dc chon file co duoi .xml
                    showToast('Vui lòng chọn file xml', "error");
                    $("#txt_file_ckhtcmis").val("");
                    return;
                }
                $(".progress-bar-dtt").show();
                $(".loadtext").text("Đang xử lý...");
                f_inportFileXmlToOracle();
            } else {
              
                if (fileExt.indexOf("xlsx") == -1 || fileExt.indexOf("xls") == -1) {
                    showToast('Vui lòng chọn file excel', "error");
                    $("#txt_file_ckhtcmis").val("");
                    return;
                }
                $(".progress-bar-dtt").show();
                $(".loadtext").text("Đang xử lý...");
                f_UploadFile_xuatexcel();
            }
        }
    } catch (e) {
        console.log(e);
    }

}
//check xml, excel

function checkDataxml_nkhtcmis() {

    try {
        var arraynkhtt = [];
        var isArray = Array.isArray(Datacmis_chot);
        if (isArray == true) {
            $(".divMessage_cmiskh").hide();
            $(".divMessage_cmiskh").html("");
            f_GetDataKHcmiss();
           
        }

    } catch (e) {
        console.log(e);
    }

}
function f_GetDataKHcmiss() {
    try {
        var v_type;
        var type = $('input[type=radio][name=usingfile]:checked').val();
        if (type == "xml") {
            v_type = 1;
        } else {
            v_type = 2;
        }
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_NHAPKHTUCMISS.GETDAT_KHTUFILECMISS", callback: "f_result_getdatakhcmiss" };
        var para = { v_randomId: idram_kh, v_type: v_type }
        $(".progress-bar-dtt").show();
        $(".loadtext").html("Đang xử lý...");
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_getdatakhcmiss(config, para, lst) {
    try {
        ;
        $("#btnthuchien_nkhtcmis").removeAttr("disabled");
        $(".panel-nkhtcmis").show();
        var count_nkhtcmisss = 0;
        var phantram = 0;
        var data = Datacmis_chot_kt = lst.data;
        var sum = data.length;
        $.each(data, function (index, value) {
            count_nkhtcmisss++;
            var key = value.ma_ddo != null ? value.ma_ddo : value.sery_cto
            if (parseInt(setnull(value.trangthai)) == 1) {
                $(".cnth_" + key).html("Cập nhật thông tin điểm đo");
                $(".row_cnttkh_" + key).addClass('row_warning_case1');
            }
            else if (parseInt(setnull(value.trangthai)) == 2) {
                $(".cnth_" + key).html("Cập nhật mã điểm đo");
                $(".row_cnttkh_" + key).addClass('row_warning_case2');
            }
            else if (parseInt(setnull(value.trangthai)) == 3) {
                $(".cnth_" + key).html("Sai Số công tơ. Không xử lý");
                $(".row_cnttkh_" + key).addClass('row_warning_case3');
            }
            else if (parseInt(setnull(value.trangthai)) == 5) {
                $(".cnth_" + key).html("Khai báo KH mới");
                $(".row_cnttkh_" + key).addClass('row_warning_case5');
            }
            else if (parseInt(setnull(value.trangthai)) == 4) {
                var input = '<input type="button" value="Nhập tay" data-madd="' + setnull(value.ma_ddo) + '"  data-makh="' + setnull(value.ma_khang) + '"'
                            + ' data-soct="' + setnull(value.sery_cto) + '" data-mact="' + setnull(value.ma_cto) + '"'
                            + ' data-tenkh="' + setnull(value.ten_khang) + '"  data-macot="' + setnull(value.ma_cot) + '"'
                            + ' data-madc="' + setnull(value.dia_chi) + '" '
                            + ' data-maq="' + setnull(value.ma_quyen) + '" '
                            + ' data-matram="' + setnull(value.ma_tram) + '" '
                            + ' data-chuoi="' + set_null(value.chuoi_gia) + '"'
                            + ' data-soho="' + set_null(value.so_ho) + '"'
                            + ' data-dvquanly="' + set_null(value.ma_dviqly) + '"'
                            + ' data-mann="' + set_null(value.ma_nn) + '"'
                            + ' data-manvgcs="' + set_null(value.ma_nvgcs) + '"'
                            + ' data-imei="' + set_null(value.imei_dcu) + '"'
                            + 'class="btn btn-success" name="btn_nhap_tay"  onclick="nhapkhachhangcmis(this)"/>';
                $(".cnth_" + key).html(input);
                $(".row_cnttkh_" + key).addClass('row_warning_case4');
            }
            if (sum != 0) {
                phantram = roundToTwo((count_nkhtcmisss * 100 / sum) * 0.9 + 10);
           
            }
        });

        if (phantram == 100) $(".progress-bar-dtt").hide();
        var countmdd_sct1 = $(".row_warning_case1").length;
        var countmdd_sct2 = $(".row_warning_case2").length;
        var countmdd_sct3 = $(".row_warning_case3").length;
        var countmdd_sct5 = $(".row_warning_case5").length;
        var countmdd_sct4 = $(".row_warning_case4").length;
        $(".divMessage_cmiskh").show();
        $(".divMessage_cmiskh").html('<b>' + countmdd_sct1 + '</b> khách hàng CÓ mã điểm đo và CÓ số công tơ. => Cập nhật thông tin điểm đo </br>'
              + '<b>' + countmdd_sct2 + '</b> khách hàng KHÔNG CÓ mã điểm đo và CÓ số công tơ => Cập nhật mã điểm đo</br>'
              + '<b>' + countmdd_sct5 + '</b> khách hàng CÓ mã điểm đo và không có số công tơ => Tự động khai báo mới điểm đo</br>'
              + '<b>' + countmdd_sct4 + '</b> khách hàng KHÔNG CÓ mã điểm đo và KHÔNG CÓ số công tơ => Phải khai báo điểm đo bằng tay');
        if(countmdd_sct3 >0) 
            $(".divMessage_cmiskh").html($(".divMessage_cmiskh").html()
                + '</br><b>' + countmdd_sct3 + '</b> bản ghi CÓ mã điểm đo và KHÔNG CÓ số công tơ => Không xử lý')
    } catch (e) {
        //console.log();
    }
}

//import xml
function f_inportFileXmlToOracle() {
    try {
      
        idram_kh = Math.random().toString(36).substr(2);
        var fdata = new FormData();
        var files = $('#txt_file_ckhtcmis')[0].files[0];
        fdata.append("file", files);
        fdata.append("connstr", "ConnectOracle_Amiss4");
        fdata.append("insertto", "TEMP_KHACHHANG_CMISS");
        fdata.append("idrandom", idram_kh);
        var config = { callback: "f_result_inportFileXmlToOracle" };
        api_uploadFileXmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
        showToast("File không hợp lệ, hãy sửa file và load lại", 'error');
    }
}

function f_result_inportFileXmlToOracle(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].idrandom;
        if (row != undefined) {
            if (row.indexOf(idram_kh) > -1) {
                $("#btnkiemtra_nkhtcmis").removeAttr("disabled");
                f_loadCMIS_KH();
            } else {
                showToast('Vui lòng thử lại', 'error');
            }
        } else {
            $(".progress-bar-dtt").hide();
            showToast("File không hợp lệ, hãy sửa file và load lại", 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
//import excel
function f_UploadFile_xuatexcel() {
    try {
       
        idram_kh = Math.random().toString(36).substr(2);
        var fdata = new FormData();
        var file = $('#txt_file_ckhtcmis')[0].files[0];
        fdata.append("file", file);
        fdata.append("select", " select * ");
        fdata.append("where", " ");
        fdata.append("connstr", "ConnectOracle_Amiss4");
        fdata.append("insertto", "TEMP_KHACHHANG_CMISS_EXCEL");
        fdata.append("idrandom", idram_kh);
        if (file == null || file == 'undefined' || file.length == 0) {
            showToast("Vui lòng chọn file excel", 'error');
            return;
        }
        var config = { callback: "f_resultImportExcel_xuatexcel" };
        f_importExcelToOracle(config, fdata);
    } catch (e) {
        showToast("File không hợp lệ, hãy sửa file và load lại", 'error');
        console.log(e);
    }
}
function f_resultImportExcel_xuatexcel(config, fdata, lst) {
    try
    {
        var data = lst.data;
        var row = data[0].idrandom;
        if (row != undefined) {
            if (row.indexOf(idram_kh) > -1) {
                $("#btnkiemtra_nkhtcmis").removeAttr("disabled");
                f_loadCMIS_KH();
            } else {
                showToast('Vui lòng thử lại', 'error');
            }
        } else {
            $(".progress-bar-dtt").hide();
            showToast(data[0].status, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
// append data file xml, excel in table
function f_loadCMIS_KH() {
    try {
        var v_type;
        var type = $('input[type=radio][name=usingfile]:checked').val();
        if (type == "xml") {
            v_type = 1;
        } else {
            v_type = 2;
        }
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_NHAPKHTUCMISS.GetCMISfromTEMP", callback: "f_result_loadCMIS_kh" };
        var para = { v_randomId: idram_kh, v_type: v_type };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_loadCMIS_kh(config, para, lst) {
    try {
        $(".progress-bar-dtt").hide();
        var data = lst.data;
        Datacmis_chot = data;

        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }
        $(".panel-nkhtcmis").show();
        $(".total_khntcmis").show();
        $(".total_khntcmis").html("Tổng số <b>" + data.length + "</b> <span tkey='banghi'></span>");
        $("#tbl_khntcmis tbody").empty();
        $.each(data, function (index, value) {
            var key = value.ma_ddo != null ? value.ma_ddo : value.sery_cto
            var row = "<tr class='row_cnttkh_" + key + "'>"
           + "<td>" + setnull(value.ma_khang) + "</td>"
           + "<td>" + setnull(value.ma_ddo) + "</td>"
           + "<td>" + setnull(value.sery_cto) + "</td>"
           + "<td>" + setnull(value.ma_quyen) + "</td>"
           + "<td>" + setnull(value.ma_tram) + "</td>"
           + "<td class='left'>" + setnull(value.ten_khang) + "</td>"
           + "<td>" + setnull(value.ma_cot) + "</td>"
           + "<td class='cnth_" + key + "'></td>"
           + "<td></td>"
            + "</tr>";
            $("#tbl_khntcmis tbody").append(row);

        });
        selectlang();

    } catch (e) {
        console.log(e);
    }
}

// thực hiện khai bao khach hang
function import_data_nkhtcmis() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var v_donvi = $("#sl_tramnkhtcmis").val();
        if (Datacmis_chot_kt.length > 0) {

            var kbdd = "";
            $.each(Datacmis_chot_kt, function (key, value) {
               
                var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_NHAPKHTUCMISS.UPDATE_DIEMDO_BY_FILE", callback: "f_result_update_diemdo_file" };
                var chuc_nang =value.trangthai !=null ? parseInt(setnull(value.trangthai)) : '1';
                if (chuc_nang == '1' || chuc_nang == '2' || chuc_nang == '5') {
                    var para = {
                        v_MA_KHANG: set_null(value.ma_khang),
                        v_HSN: set_null(value.hsn),
                        v_MA_DDO: set_null(value.ma_ddo),
                        v_MA_DVIQLY: set_null(value.ma_dviqly),
                        v_MA_QUYEN: set_null(value.ma_quyen),
                        v_MA_TRAM: set_null(value.ma_tram),
                        v_TEN_KHANG: set_null(value.ten_khang),
                        v_DIA_CHI: set_null(value.dia_chi),
                        v_MA_CTO: set_null(value.ma_cto),
                        v_SERY_CTO: set_null(value.sery_cto),
                        v_USERCODE: set_null(userinfo.usercode),
                        v_MA_COT: set_null(value.ma_cot),
                        v_SO_HO: set_null(value.so_ho),
                        v_MA_NN: set_null(value.ma_nn),
                        v_MA_NVGCS: set_null(value.ma_nvgcs),
                        v_CHUOI_GIA: set_null(value.chuoi_gia).replace(/%/g, '&__&').replace(/;/g, '&___&'),
                        v_IMEI: set_null(value.imei_dcu),
                        v_CHUC_NANG:set_null(value.trangthai),
                        v_type_file: 'cmiss',
                        v_loaidiemdo: '1',
                        v_Donvi: v_donvi,
                        v_chiso_moi: "",
                        v_PASSWORD:set_null(value.ma_ddo),
                        v_sort: key,
                    }
                    console.log(para);
                    ExecuteServiceSyns(config, para);
                } else {
                    count_nkhtcmis++;
                    if (chuc_nang == 4 && count_nkhtcmis == Datacmis_chot_kt.length) 
                        bdd = chuc_nang;
                }
            });
            if (kbdd == 4) {
                $(".progress-bar-dtt").hide();
                showToast('Vui lòng khai báo điểm đo trước khi thực hiện', "error");
            }
           
        } else {
            showToast('Vui lòng kiểm tra dữ liệu trước khi thực hiện', "error");
            return;
        }



    } catch (e) {
        console.log(e);
    }
}

function f_result_update_diemdo_file(config, para, lst) {
    try {
        $(".progress-bar-dtt").show();
      
        count_nkhtcmis++;
        var key = para.v_MA_DDO != null ? para.v_MA_DDO : para.v_SERY_CTO;
        if (lst == null || lst == undefined || lst == "[]") {
            $('.row_cnttkh_' + key).find('td:last').html("Thất bại");
            $('.row_cnttkh_' + key).find('td:last').addClass("red");
            return;
        }
        var result = lst.data;
        
        if (result != null) {
            if (result[0].kq == '1' || result[0].kq == '2' || result[0].kq == '3') {
                $('.row_cnttkh_' + key).find('td:last').html("Thành công");
                count_kqtt_nkhtcmis++; // đếm số bản ghi thành công
            }
            else {
                $('.row_cnttkh_' + key).find('td:last').html("Thất bại");
                $('.row_cnttkh_' + key).find('td:last').addClass("red");
            }
        }
        else {
            $('.row_cnttkh_' + key).find('td:last').html("Thất bại");
            $('.row_cnttkh_' + key).find('td:last').addClass("red");
        }
        // load phần trăm
        var sum = $('#tbl_khntcmis tbody tr').length;
        if (sum != 0) {
            var phantram = roundToTwo(((count_nkhtcmis * 100) / sum) * 0.9 + 10);
            $(".load").css('width', phantram + '%');
            $(".loadtext").text(phantram + '%');
            if (phantram == 100) {
                $(".progress-bar-dtt").hide();
                fn_delete_AM_TEMP_DBCMIS_NEW();
                $("#txt_file_ckhtcmis").val('');
                count_nkhtcmis = 0;

                Datacmis_chot_kt.length = 0;
                showToast("cập nhật thành công " + count_kqtt_nkhtcmis + " điểm đo", "success");
            }
        }
       

    } catch (e) {
        console.log(e);
        $(".progress-bar-dtt").hide();
    }
}
function update_maddo_nkhtcmis() {
    try {
        var isArray = Array.isArray(Datacmis_chot_kt);
        if (isArray == true) {
            $.each(Datacmis_chot_kt, function (key, value) {
                var chuc_nang = parseInt(setnull(value.trangthai));
                if (chuc_nang == 2) {
                    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_NHAPKHTUCMISS.UPDATE_MADDO_BY_FILEA", callback: "f_result_update_madiemdo_byfileA" };
                    var para = {
                        v_MA_DDO: value.ma_ddo,
                        v_SERY_CTO: value.sery_cto,
                        v_MACOT: value.ma_cot
                    }
                    ExecuteServiceSyns(config, para);
                    console.log(para);
                }
            });
        } else {
            showToast('Vui lòng kiểm tra dữ liệu trước khi thực hiện', "error");
            return;
        }



    } catch (e) {
        console.log(e);
    }
}
function f_result_update_madiemdo_byfileA(config, para, lst) {
    var result = lst.data;
    if (result != null) {
        if (result[0].kq != '0') {
        }
    }

}

function fn_delete_AM_TEMP_DBCMIS_NEW() {
    if (idram_kh != "") {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_NHAPKHTUCMISS.DELETE_TEMP_KHACHHANG", callback: "f_result_update_delete_temp" };
        var para = {
            v_IdRandom: idram_kh
        }
        ExecuteServiceSyns(config, para);
    }
}

// import data khi nhap tay

function nhapkhachhangcmis(obj) {
    try {
        
        $('#jqxDropDL_nhapkh').jqxTree('selectItem', $("#010107")[0]);
        $("#modal_nhaptay_ttkh_cmiss").modal("show");
        $("#txtmadiemdo_nkhcmis").val($(obj).attr("data-madd"));
        $("#txtmadiemdo_nkhcmis").attr("data-madd", $(obj).attr("data-madd"));
        $("#txtmadiemdo_nkhcmis").attr("data-maq", $(obj).attr("data-maq"));
        $("#txtmadiemdo_nkhcmis").attr("data-matram", $(obj).attr("data-matram"));
        $("#txtmakh_nkhcmis").val($(obj).attr("data-makh"));
        $("#txtimei_nkhcmis").val($(obj).attr("data-imei"));
        $("#txtsocongto_nkhcmis").val($(obj).attr("data-soct"));
        $("#txtmacongto_nkhcmis").val($(obj).attr("data-mact"));
        $("#txttenkh_nkhcmis").val($(obj).attr("data-tenkh"));
        $("#txtmacot_nkhcmis").val($(obj).attr("data-macot"));
        $("#txtdiachi_nkhcmis").val($(obj).attr("data-madc"));
        $("#hdchuoigia_nkhcmis").val($(obj).attr("data-chuoi"));
        $("#hdsoho_nkhcmis").val($(obj).attr("data-soho"));
        $("#hddonviquanly_nkhcmis").val($(obj).attr("data-dvquanly"));
        $("#hdmann_nkhcmis").val($(obj).attr("data-mann"));
        $("#hdmanvgcs_nkhcmis").val($(obj).attr("data-manvgcs"));
    } catch (e) {
        console.log(e);
    }
}
function set_null(val) {
    try {
        if (val == "" || val == null || val == "null") {
            return ""
        }
        return val;
    } catch (e) {
        console.log(e);
    }
}
function roundToTwo(value) {
    return (Math.round(value * 100) / 100);
}

//Load Tree điện lực
function f_GetData_ComboDL() {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_NHAPKHTUCMISS.GET_TRAM", callback: "f_result_GetParentNodeAllTree" };
        var para = {
            v_Code:'01'
        };

        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_GetParentNodeAllTree(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined) {
            return;
        }
        $("#sl_tramnkhtcmis").empty();
        $("#sl_tramnkhtcmis").append("<option value='-1'>-- Chọn trạm --</option>")
        $.each(data, function (key, val) {
            $("#sl_tramnkhtcmis").append("<option value='" + val.code + "'>" + val.name+"</option>");
        });
     
        
    }
    catch (e) {
        //console.log(e.message);
    }

}