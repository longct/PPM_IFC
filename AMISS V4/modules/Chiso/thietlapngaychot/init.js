$(document).ready(function () {
    try {
        //showhideTree();
        loadContent();
        selectlang();
       
        $('.datepicker').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            minViewMode: 'months'
        });

        $('#txtgiochot').timepicker({
            showMeridian: false,
            minuteStep: 1,
            secondStep: 1,
            defaultTime: false
        });
     
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
      
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            
            if (istype != "0" && istype != "4" && socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(Số công tơ: " + socongto + "- Loại điểm đo: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("Sổ ghi: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("Đơn vị: " + tendiemdo);
            else {
                $("#tendiemdo_span").html(tendiemdo + "(Số công tơ: " + socongto + "- Loại điểm đo: " + replacePha(istype) + ")");
            }
        } else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo hoặc nhóm điểm đo");
            $("div.date-filter").hide();
            $("#box_table_data").hide();
        }
        f_loadThietlap(1);
        $('#btnThietlap').click(function () {
            var checknull = validate();
            if (checknull != "") {

                showToast(checknull, 'error');
                return;
            }
            var thangchot = $('#dt_thang').val().split("/");
            f_confimYesNo('<p>Danh sách khách hàng đã được thiết lập ngày chốt. Nếu người dùng thiết lập lại'
                        + " thì tất cả dữ liệu của tháng " + thangchot[0]
                        + ' sẽ bị thay đổi so với thiết lập mới. Người dùng đồng ý thiết lập hay không?</p>', "Hủy", "Đồng ý",
                        function () {
                            var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
                            if (tree_node.socongto == "0") {
                                f_thietlap_nhom();
                            } else {
                                f_thietlap_ddo();
                            }
                        });

        });

        nhapvaoky_chot();
        $("#btnxuatexcel_tlnc").on("click", function () {
          
            f_export_excel_tlnc();
        });
    } catch (e) {
        console.log(e.message);
    }
});
function get_danhsachtram() {
    try {
        try {
            var v_UserCode = JSON.parse(localStorage.getItem("userinfo")).code;
            var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAYDULIEU.GetProvinceForCombo", callback: "result_loadProvince_qldmdl" };
            var para = {
                v_Code: "01",
                v_UserCode: v_UserCode,
                v_isSub: 1
            };

            ExecuteServiceSyns(config, para);

        } catch (e) {
            console.log(e);
        }
        dataToCob("cb_danhsachtram", list, "code", "tram", "", "");

    } catch (e) {
        console.log(e);
    }
}
function result_loadProvince_qldmdl(config, para, lst) {

    var data = lst.data;
    $("#chondonvi_qldmdl").empty();
    $('#chondonvi_qldmdl').append($('<option>', {
        value: '-1',
        text: '-- CHỌN ĐƠN VỊ  --'
    }));
    $.each(data, function (key, val) {
        $('#chondonvi_qldmdl').append($('<option>', {
            value: val.code,
            text: val.name
        }));
    });
    $("#chondonvi_qldmdl").change(selectChange_qldmdl);
}
var countData = 0;
function nhapvaoky_chot() {
    try {
        $('#sokychot').change(function () {
            var k = $('#sokychot').val();
      
            if (k == 1) {
                $("#div-chot2").hide();
                $("#div-chot3").hide();
            } else if (k == 2) {
                $("#div-chot2").show();
                $("#div-chot3").hide();
            } else {
                $("#div-chot2").show();
                $("#div-chot3").show();
            }
            f_loadThietlap(1);
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
function f_loadThietlap(page) {
    try {
        if (localStorage.getItem("tree_node") == null) return;
        var objUser = JSON.parse(localStorage.getItem("userinfo"));
        var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
        
        var p = getAllIdMod();

        var v_Value = tree_node.id
        var v_From = "";
        var v_To = "";
        v_From = "01/" + p.dt_thang;
        var v_ChuKiChot = p.sokychot; //tree
        var v_UserId = objUser.userid;
        var v_TypeValue = tree_node.socongto == "0" ? 2 : 1;

        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THIETLAPCHOT.THONGTINNGAYCHOT",
            callback: "f_result_load_thietlap"
        };
        var para = {
            v_Value: v_Value,
            v_From: v_From,
            v_ChuKiChot: v_ChuKiChot,
            v_TypeValue: v_TypeValue,
            v_pagenum: page,
            v_numrecs: 10,
        };
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e);
    }
}

function f_call_job_tong_hop_csc_cmis() {
    try {
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_DONGBOCMIS.JOB_TinhCSC_Thietlap",
            callback: "f_result_call_job"
        };
        var para = {
        };
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e);
    }
}

function f_result_call_job(config, para, result) {
    try {
    
        if (!result && !result.data && result.data[0].kq == 1) {
            showToast('Đã tính xong chỉ số chốt, có thể xem dữ liệu chốt ngay.', 'success');
        }
    } catch (e) {
        console.log(e);
    }
}

function f_result_load_thietlap(config, para, lst) {

    try {
        $("#tlnc_data tbody").empty();
        if (lst == null || lst == undefined || lst == "[]") return;
       
        var data = lst.data;
        if (data == null || data == undefined || data.length == 0) return;
        var strData = '';
        countData = data[0].rowscount;
        $.each(data, function (i, val) {

            var giochotdl = (val.giochotdl != '' && val.giochotdl != '-') ? val.giochotdl : "00:00";
            strData += "<tr class='bang'><td class='center'>"
                            + val.rnum + "</td><td class='center'>"
                            + val.madiemdo + "</td><td class='cl'>"
                            + val.tendiemdo + "</td><td class='center'>"
                            + val.socongto + "</td><td class='center'>"
                            + val.ngaychotdl + "</td>";
        });
       
        $("#tlnc_data tbody").append(strData);
      
        $(".sobanghi").html("Tổng số " + countData + "<span tkey='banghi'></span>");
        selectlang();
        LoadPhanTrang("pageLst_tlnc", "pageCurent_tlnc", data, function () {
            f_loadThietlap($("#pagenumber").val() );
        });

    }
    catch (e) {
        console.log(e)
    }
}


function f_thietlap_nhom() {

    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
    var p = getAllIdMod();
    var v_Code = tree_node.id;
    var v_fixday = p.ngaychot;
    var v_fixday2 = p.ngaychot2;
    var v_fixday3 = p.ngaychot3;
    var v_circle = p.sokychot;
    var v_fixmonth = "";
    var v_timeday = p.txtgiochot
    if (p.dt_thang.length > 9) {
        v_fixmonth = "01/" + p.dt_thang.substr(3, 7);
    } else {
        v_fixmonth = "01/" + p.dt_thang;
    };
    var ngaychot = v_fixday;
    if (v_fixday2 != "")
        ngaychot = v_fixday + ',' + v_fixday2
    if (v_fixday3 != "" && v_fixday2 != "")
        ngaychot = v_fixday + ',' + v_fixday2 + ',' + v_fixday3
    var v_userId = objUser.userid

    var config = {
        connstr: "ConnectOracle_Amiss4",
        namesql: "PKG_THIETLAPCHOT.THIETLAPKYCHOT_NHOM",
        callback: "f_result_thietlap"
    };
    var para = {
        v_Code: v_Code,
        v_ngaychot: ngaychot,
        v_kychot: v_circle,
        v_thangchot: v_fixmonth,
        v_userId: v_userId,
        v_IP: G_IP,
        v_IPlocal: G_localIP
    }

    callLoad();

    ExecuteServiceSyns(config, para);
}

function f_thietlap_ddo() {
    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
    var p = getAllIdMod();

    var v_type = 1;
    var v_MeterId = tree_node.id;
    var v_madiemdo = "";
    var v_fixday = p.ngaychot;
    var v_fixday2 = p.ngaychot2;
    var v_fixday3 = p.ngaychot3;
    var v_circle = p.sokychot;
    var v_fixmonth = "";
    var v_timeday = p.txtgiochot
    if (p.dt_thang.length > 9) {
        v_fixmonth = "01/" + p.dt_thang.substr(3, 7);
    } else {
        v_fixmonth = "01/" + p.dt_thang;
    };
    var ngaychot = v_fixday;
    if (v_fixday2 != "")
        ngaychot = v_fixday + ',' + v_fixday2
    if (v_fixday3 != "" && v_fixday2 != "")
        ngaychot= v_fixday + ',' + v_fixday2 + ',' + v_fixday3
    var v_userId = objUser.userid

    var config = {
        connstr: "ConnectOracle_Amiss4",
        namesql: "PKG_THIETLAPCHOT.THIETLAPKYCHOT_DDO",
        callback: "f_result_thietlap"
    };
  
    var para = {
        v_MeterId: v_MeterId,
        v_ngaychot: ngaychot,
        v_kychot: v_circle,
        v_thangchot: v_fixmonth,
        v_userId: v_userId,
        v_IP: G_IP,
        v_IPlocal: G_localIP
    }
    callLoad();
    ExecuteServiceSyns(config, para);
}

function f_result_thietlap(config, para, lst) {
    try {
 
        stopLoad();
        var data = lst.data;
        if (data[0].count > 0) {
            showToast('Cập nhật thành công ' +data[0].count+ ' điểm đo', 'success');
            f_loadThietlap(1);
            f_call_job_tong_hop_csc_cmis();
        } else {
            showToast('Cập nhật thất bại', 'error');
        }
    }
    catch (e) {
        console.log(e)
    }
}


function validate() {
    try {
        var k = $("#sokychot").val();
        var t = $("#ngaychot").val();
        var t2= $("#ngaychot2").val();
        var t3= $("#ngaychot3").val();
        if ($("#dt_thang").val() == "") return "Vui lòng chọn tháng chốt";
        else if (k == "1" && t == "") return "Vui lòng nhập đủ số ngày chốt";
        else if (k == "2" && (t == "" || t2 == "")) return "Vui lòng nhập đủ số ngày chốt";
        else if (k == "3" && (t == "" || t2 == "" || t3 == "")) return "Vui lòng nhập đủ số ngày chốt";
        else if (k == "1" && parseInt(t) > 28) return "Ngày chốt không được lớn hơn 28 ngày";
        else if (k == "2" && (parseInt(t) > 28 || parseInt(t2)>28)) return "Ngày chốt không được lớn hơn 28 ngày";
        else if (k == "3" && (parseInt(t) > 28 || parseInt(t2) > 28 || parseInt(t3) > 28)) return "Ngày chốt không được lớn hơn 28 ngày";
        else if (k == "2" && ((t == t2) || (t == t3) || (t2 == t3))) return "Ngày chốt không được nhập trùng nhau";
        else if (k == "3" && ((t == t2) ||  (t == t3) || (t2 == t3))) return "Ngày chốt không được nhập trùng nhau";
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

function f_export_excel_tlnc() {
    if (localStorage.getItem("tree_node") == null) return;

    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];

    var p = getAllIdMod();

    var v_Value = tree_node.id
    var v_From = "01/" + p.dt_thang;

    var v_ChuKiChot = p.sokychot; //tree
    var v_UserId = objUser.userid;
    var v_TypeValue = tree_node.socongto == "0" ? 2 : 1;
    var namefile = 'thongtinngaychot' + p.dt_thang.replace("/", "_");
    var config = {
        connstr: "ConnectOracle_Amiss4",
        namesql: "PKG_THIETLAPCHOT.THONGTINNGAYCHOT",
        namefile: namefile
    };
    var para = {
        v_Value: v_Value,
        v_From: v_From,
        v_ChuKiChot: v_ChuKiChot,
        v_TypeValue: v_TypeValue,
        v_pagenum: 1,
        v_numrecs: 10000000000,
    };

    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "Text" },
        { field: "socongto", name: "Số công tơ", type: "Text" },
        { field: "ngaychotdl", name: "Ngày chốt", type: "Text" },
        ]
    };
    console.log(config);
    console.log(para);
    ExecuteExportExcelOracle(config, para, colum);

}
