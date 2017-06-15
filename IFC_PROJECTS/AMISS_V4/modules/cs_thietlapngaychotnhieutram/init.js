var count_diemdo = 0;
var countTram = 0;
var countpage = 10;
var meterIDTram = "";
$(document).ready(function () {
    try {
        $("#tendiemdo_span").html("");
        showtreetab();
        loadContent();
        selectlang();
        $('.datepicker').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            minViewMode: 'months'

        });
        $('#txtgiochot_nt').timepicker({
            showMeridian: false,
            minuteStep: 1,
            secondStep: 1,
            defaultTime: false
        });
        $("#ngaychot").on("change", function () {
            var t = $("#ngaychot").val();
            var test = t.split(',');
            var NgayChot_l = test.length;
            for (var i = 0; i < NgayChot_l; i++) {
                var NgayChot_v = test[i];
                if (NgayChot_v > 28) {
                    showToast("Ngày chốt không được lớn hơn 28 ngày","error");
                    $("#ngaychot").focus();
                    return;
                }
            }
        });
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
        get_danhsachdonvi();
        get_danhsachtram("0101");
        $("#cb_dsdv_tlnc").on("change", function () {
            get_danhsachtram($('#cb_dsdv_tlnc option:selected').val());
        });
       
        $('#btnThietlap').click(function () {
            var checknull = validate();
            if (checknull != "") {
                
                showToast(checknull, 'error');
                return;
            }
            var thangchot = $('#dt_thang').val().split("/");
            f_confimYesNo('<p>Danh sách khách hàng đã được thiết lập ngày chốt. Nếu người dùng thiết lập lại'
                      + " thì tất cả dữ liệu của tháng " + thangchot[0]
                      + ' sẽ bị thay đổi so với thiết lập mới. Người dùng đồng ý thiết lập hay không?</p>', "Hủy", "Đồng ý", f_thietlapnt);

        });
        nhapvaoky_chot();
    } catch (e) {
        console.log(e.message);
    }
});
function showtreetab() {
    $(".content").removeClass("showtree");
    $(".content").addClass("hidetree");
    $(".content-tree").addClass("showtree");
    $(".content-tree").removeClass("hidetree");
    $(".colslape_tree").addClass("hidetree");
    $(".colslape_tree").removeClass("showtree");
    $(".filter_main").hide();
    $(".colslape_tree").hide();

}
function get_danhsachdonvi() {
    try{
        var config = { connstr: "ConnectOracle233", namesql: "AMDISS_THIETLAPNGAYCHOTNT.DANHSACHTRAM", callback: "f_result_dsdv_tlnt" };
        var para = {
            v_code: "01",
        };
        ExecuteServiceSyns(config, para); 
    } catch (e) { console.log(e);}
}
function f_result_dsdv_tlnt(config, para, lst) {
    try{
        if (lst != null && lst != undefined) {
            var data = lst.data;
            $('#cb_dsdv_tlnc').empty();
            $.each(data, function (key, val) {
                $('#cb_dsdv_tlnc').append($('<option>', { value: val.code, text: val.tram }));
            });
            $("#cb_dstram_tlnc").show();
           
        }
    } catch (e) {
        console.log(e);
    }
}
function get_danhsachtram(code) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMDISS_THIETLAPNGAYCHOTNT.DANHSACHTRAM", callback: "f_result_dstram_tlnt" };
        var para = {
            v_code: code,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}
function f_result_dstram_tlnt(config, para,lst) {
    try {
        if (lst != null && lst != undefined) {
            var data = lst.data;
            $('#cb_dstram_tlnc').empty();
            $.each(data, function (key, val) {
                $('#cb_dstram_tlnc').append($('<option>', { value: val.code, text: val.tram }));
            });
            $('#cb_dstram_tlnc').multiselect('rebuild');
        }
    } catch (e) {
        console.log(e);
    }
}
var countData = 0;
function nhapvaoky_chot() {
    try {
        $('#sokychot').change(function () {
            var k = $('#sokychot').val();
            if (k == 1) {
                $("#ngaychot").attr("placeholder", "1");
            }
            else if (k == 2) {
                $("#ngaychot").attr("placeholder", "1,2");
                $("#ngaychot").attr("maxlength", "5");
         
            }
            else if (k == 3) {
                $("#ngaychot").attr("placeholder", "1,2,3");
                $("#ngaychot").attr("maxlength", "8");
           
            }

        });
    } catch (e) {
        console.log(e);
    }
}


function replacePha(pha) {
    if (pha == "1")
        return "1 Pha";
    else if (pha == "3")
        return "3 Pha";
    else if (pha == "31")
        return "3 Pha 1 biểu";
    else {
        return;
    }
}
function f_loadThietlap(code, page) {
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var v_From = "";
        var v_To = "";
        if (p.dt_thang.length > 9) {
            v_From = "01/" + p.dt_thang.substr(3, 7);
            v_To = "01/" + p.dt_thang.substr(3, 7);
        } else {
            v_From = "01/" + p.dt_thang;
            v_To = "01/" + p.dt_thang;
        };
        var config = { connstr: "ConnectOracle233", namesql: "AMDISS_THIETLAPNGAYCHOTNT.THONGTINNGAYCHOT", callback: "f_result_load_thietlap" };
        var para = {
            v_Value: meterIDTram,
            v_From: v_From,
            v_To: v_To,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e);
    }
}

function f_result_load_thietlap(config, para, lst) {
    try {
        var data = lst.data;
     
        var strData = '';
        countData = data.length;
        $.each(data, function (i, val) {
            strData += "<tr class='bang'><td>"
                            + val.rnum + "</td><td class='cl'>"
                            + val.madiemdo + "</td><td class='cl'>"
                            + val.tendiemdo + "</td><td class='cl'>"
                            + val.socongto + "</td><td>"
                            + val.ngaychotdl + "</td><td>"
                            + val.giochotdl + "</td>";
        });
        $("#tlnct_data tbody").empty();
        $("#tlnct_data tbody").append(strData);
        LoadPhanTrang("pageLst_thncnt", "pageCurent_thncnt", data, function () {
            f_loadThietlap(meterIDTram, $("#pagenumber").val());
        });
        $(".sobanghi").html("Thiết lập thành công <b>" + count_diemdo + "</b> điểm đo");
        selectlang();
        stopLoad();
    }
    catch (e) {
        console.log(e)
    }
}


function f_thietlapnt() {
    meterIDTram = "";
    count_diemdo = 0;
    countTram = 0;
    var v_tram = $("#cb_dstram_tlnc").val();
    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var p = getAllIdMod();
    var v_type = 1;
    var v_madiemdo = "";
    var v_timeday = p.txtgiochot_nt
    var v_fixday = p.ngaychot;
    var v_circle = p.sokychot;
    var v_fixmonth = "";
    if (p.dt_thang.length > 9) {
        v_fixmonth = "01/" + p.dt_thang.substr(3, 7);
    } else {
        v_fixmonth = "01/" + p.dt_thang;
    };
  
    var v_userId = 1; //objUser.userid
   // callLoad();
    $.each(v_tram, function (key, value) {
        var config = { connstr: "ConnectOracle233", namesql: "AMDISS_THIETLAPNGAYCHOTNT.UPDATE_FIX_DAY", callback: "f_result_thietlap_nhieutram" };
        var para = {
            v_type: v_type,
            v_MeterId: value,
            v_madiemdo: v_madiemdo,
            v_fixday: v_fixday,
            v_timeday:v_timeday,
            v_circle: v_circle,
            v_fixmonth: v_fixmonth,
            v_userId: v_userId,
        }
        meterIDTram += value + ",";
        callLoad();
        ExecuteServiceSyns(config, para);
    });
   
   
}

function f_result_thietlap_nhieutram(config, para, lst) {
    try {
      
        var v_tram = $("#cb_dstram_tlnc").val().length;
        countTram++;
        var data = lst.data;
        if (data[0].count > 0) {
            $(".panel-tlncnt").show();
            count_diemdo = count_diemdo + data[0].count;
           
           
        }
        if (v_tram == countTram) {
            f_loadThietlap(meterIDTram, 1);

        }
        stopLoad();
    }
    catch (e) {
        console.log(e)
    }
}


function validate() {
    try {
        var k = $("#sokychot").val();
        var t = $("#ngaychot").val();
        var tram = $("#cb_dstram_tlnc").val();
        if (tram == null) return "Vui lòng chọn trạm";
        if (t == "") return "Không được để ngày chốt trống";
        var test = t.split(',');
        var NgayChot_l = test.length;
        if (k != NgayChot_l) return "Vui lòng nhập đủ số ngày chốt";
        for (var i = 0; i < NgayChot_l; i++) {
            var NgayChot_v = test[i];
            if (NgayChot_v > 28) {
                return "Ngày chốt không được lớn hơn 28 ngày";
            }
        }
       
        return "";
    } catch (e) {
        console.log(e);
    }
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44) {
        return false;
    }
    return true;
}

function isNumber_time(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 58) && charCode != 44) {
        return false;
    }
    if (charCode == 58) {
        var val = $('#txtgiochot').val()
        if (val.length == 1) $('#txtgiochot').val("0" + val);
    }
    return true;
}

function handleChange(input) {
    var isOk = true;

    var val = input.value.split(",");
    for (var i = 0; i < val.length; i++) {
        if (val[i] < 1) {
            val[i] = 1;
            isOk = false;
        }
        if (val[i] > 28) {
            val[i] = 28;
            isOk = false;
        }
    }
    input.value = val.join(",");
}

function handleLostFocus_time(input) {
    var k = $('#cboCycle').val();
    var val = input.value.split(",");
    for (var i = 0; i < val.length; i++) {
        var sub_val = val[i].split(":");
        if (sub_val.length < 2) val[i] = "00:00";
        if (sub_val.length < 2 && sub_val > 0 && sub_val < 24) val[i] = "00:00";
        if (sub_val.length == 2) {
            if (sub_val[0] > 24 || sub_val[0] < 0 || sub_val[1] > 59 || sub_val[1] < 0) val[i] = "00:00";
        }
    }
    var s = '';
    s = val.join(",");
    if (val.length == 1 && k == 2) s = val[0] + ',' + val[0];
    if (val.length == 1 && k == 3) s = val[0] + ',' + val[0] + ',' + val[0];
    if (val.length == 2 && k == 3) s = val[0] + ',' + val[1] + ',' + val[1];
    input.value = s;
}

function xuatexcel_tlncnt() {

    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var p = getAllIdMod();
    var v_From = "";
    var v_To = "";
    if (p.dt_thang.length > 9) {
        v_From = "01/" + p.dt_thang.substr(3, 7);
        v_To = "01/" + p.dt_thang.substr(3, 7);
    } else {
        v_From = "01/" + p.dt_thang;
        v_To = "01/" + p.dt_thang;
    };
    var namef_l = 'thietlapchot' + v_From.replace("/", "-") + "_" + v_To.replace("/", "-");

    var config = { connstr: "ConnectOracle233", namesql: "AMDISS_THIETLAPNGAYCHOTNT.THONGTINNGAYCHOT", namefile: namef_l };
    var para = {
        v_Value: meterIDTram,
        v_From: v_From,
        v_To: v_To,
        v_pagenum: 1,
        v_numrecs: 1000000000000000
    };

    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "Text" },
        { field: "socongto", name: "Số công tơ", type: "Text" },
        { field: "ngaychotdl", name: "Ngày chốt", type: "Text" },
        { field: "giochotdl", name: "Giờ chốt", type: "Text" }
      ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}
