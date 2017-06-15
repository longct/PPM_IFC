$(document).ready(function () {
    try {
        showhideTree();
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
        $("#btnxuatexcel_tlnc").on("click", function () {
            f_export_excel_tlnc();
        });
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
        $("#ngaychot").on("change", function () {
            var checknull = validate();
            if (checknull != "") {
                showToast(checknull, 'error');
                return;
            }
        });
        if (localStorage.getItem("tree_node") && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == 0) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (istype != "0" && istype != "4" && socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + "- <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            $("#btnThietlap").removeAttr("disabled");
            f_loadThietlap();
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị");
            $("#tab_content").empty();
            $("#btnThietlap").attr("disabled");
        }

        $('#btnThietlap').click(function () {
            var checknull = validate();
            if (checknull != "") {

                showToast(checknull, 'error');
                return;
            }
            var thangchot = $('#dt_thang').val().split("/");
            f_confimYesNo('<p>Danh sách khách hàng đã được thiết lập ngày chốt. Nếu người dùng thiết lập lại'
                        + " thì tất cả dữ liệu của tháng " + thangchot[0]
                        + ' sẽ bị thay đổi so với thiết lập mới. Người dùng đồng ý thiết lập hay không?</p>', "Hủy", "Đồng ý", f_thietlap)

        });
        nhapvaoky_chot();



    } catch (e) {
        console.log(e.message);
    }
});
function get_danhsachtram() {
    try {
        try {
            var v_UserCode = JSON.parse(localStorage.getItem("userinfo")).code;
            var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetProvinceForCombo", callback: "result_loadProvince_qldmdl" };
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
function f_loadThietlap() {
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));
        var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];

        var p = getAllIdMod();

        var v_Type = 1;
        var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id
        var v_From = "";
        var v_To = "";
        if (p.dt_thang.length > 9) {
            v_From = "01/" + p.dt_thang.substr(3, 7);
            v_To = "01/" + p.dt_thang.substr(3, 7);
        } else {
            v_From = "01/" + p.dt_thang;
            v_To = "01/" + p.dt_thang;
        };

        var v_SoGhi = ""; // tree vào
        var v_ChungLoai = ""; // tree
        var v_LoaiCongTo = "0"; //tree
        var v_TrangThai = "0"; //tree
        var v_ChuKiChot = "0"; //tree
        var v_UserId = "1"; //objUser.userid
        var v_Permission = "1"; //objUser.permission
        var v_TypeValue = "2"; //tree
        var v_HeThong = "4"; //tree
        var v_Socongto = ""; // kg cần
        var v_dFrom = ""; //tree
        var v_dTo = ""; //tree

        var config = { connstr: "ConnectOracle233", namesql: "amdiss_thietlapngaychot.THONGTINNGAYCHOT", callback: "f_result_load_thietlap" };
        var para = {
            v_Type: v_Type,
            v_Value: v_Value,
            v_From: v_From,
            v_To: v_To,
            v_SoGhi: v_SoGhi,
            v_ChungLoai: v_ChungLoai,
            v_LoaiCongTo: v_LoaiCongTo,
            v_TrangThai: v_TrangThai,
            v_ChuKiChot: v_ChuKiChot,
            v_UserId: v_UserId,
            v_Permission: v_Permission,
            v_TypeValue: v_TypeValue,
            v_HeThong: v_HeThong,
            v_Socongto: v_Socongto,
            v_dFrom: v_dFrom,
            v_dTo: v_dTo,
            v_pagenum: 0,
            v_numrecs: 100000,
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
            var giochotdl = (val.giochotdl != '' && val.giochotdl != '-') ? val.giochotdl : "00:00";
            strData += "<tr class='bang'><td class='center'>"
                            + val.rnum + "</td><td class='center'>"
                            + val.madiemdo + "</td><td class='cl'>"
                            + val.tendiemdo + "</td><td class='center'>"
                            + val.socongto + "</td><td class='center'>"
                            + val.ngaychotdl + "</td><td  class='center'>"
                            + giochotdl + "</td>";
        });
        $("#tlnc_data tbody").empty();
        $("#tlnc_data tbody").append(strData);
        $(".sobanghi").html("Tổng số " + data.length + "<span tkey='banghi'></span>");
        selectlang();
    }
    catch (e) {
        console.log(e)
    }
}


function f_thietlap() {

    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
    var p = getAllIdMod();

    var v_type = 1;
    var v_MeterId = tree_node.id;
    var v_madiemdo = "";
    var v_fixday = p.ngaychot;
    var v_circle = p.sokychot;
    var v_fixmonth = "";
    var v_timeday = p.txtgiochot
    if (p.dt_thang.length > 9) {
        v_fixmonth = "01/" + p.dt_thang.substr(3, 7);
    } else {
        v_fixmonth = "01/" + p.dt_thang;
    };

    var v_userId = 1; //objUser.userid

    var config = { connstr: "ConnectOracle233", namesql: "amdiss_thietlapngaychot.UPDATE_FIX_DAY", callback: "f_result_thietlap" };
    var para = {
        v_type: v_type,
        v_MeterId: v_MeterId,
        v_madiemdo: v_madiemdo,
        v_fixday: v_fixday,
        v_timeday: v_timeday,
        v_circle: v_circle,
        v_fixmonth: v_fixmonth,
        v_userId: v_userId,
    }
    callLoad();
    ExecuteServiceSyns(config, para);
}

function f_result_thietlap(config, para, lst) {
    try {
        stopLoad();
        var data = lst.data;
        if (data[0].count > 0) {
            showToast('Cập nhật thành công', 'success');
            f_loadThietlap();
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
        if (t == "") return "Vui lòng nhập ngày chốt";
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

function f_export_excel_tlnc() {
    var objUser = JSON.parse(localStorage.getItem("userinfo"));
    var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];

    var p = getAllIdMod();

    var v_Type = 1;
    var v_Value = JSON.parse(localStorage.getItem("tree_node"))[0].id
    var v_From = "";
    var v_To = "";
    if (p.dt_thang.length > 9) {
        v_From = "01/" + p.dt_thang.substr(3, 7);
        v_To = "01/" + p.dt_thang.substr(3, 7);
    } else {
        v_From = "01/" + p.dt_thang;
        v_To = "01/" + p.dt_thang;
    };

    var v_SoGhi = ""; // tree vào
    var v_ChungLoai = ""; // tree
    var v_LoaiCongTo = "0"; //tree
    var v_TrangThai = "0"; //tree
    var v_ChuKiChot = "0"; //tree
    var v_UserId = "1"; //objUser.userid
    var v_Permission = "1"; //objUser.permission
    var v_TypeValue = "2"; //tree
    var v_HeThong = "4"; //tree
    var v_Socongto = ""; // kg cần
    var v_dFrom = ""; //tree
    var v_dTo = ""; //tree
    var namef_l = 'thongtinngaychot' + v_From.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "amdiss_thietlapngaychot.THONGTINNGAYCHOT", namefile: namef_l };
    var para = {
        v_Type: v_Type,
        v_Value: v_Value,
        v_From: v_From,
        v_To: v_To,
        v_SoGhi: v_SoGhi,
        v_ChungLoai: v_ChungLoai,
        v_LoaiCongTo: v_LoaiCongTo,
        v_TrangThai: v_TrangThai,
        v_ChuKiChot: v_ChuKiChot,
        v_UserId: v_UserId,
        v_Permission: v_Permission,
        v_TypeValue: v_TypeValue,
        v_HeThong: v_HeThong,
        v_Socongto: v_Socongto,
        v_dFrom: v_dFrom,
        v_dTo: v_dTo,
        v_pagenum: 0,
        v_numrecs: 100000,
    };

    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "Text" },
        { field: "socongto", name: "Số công tơ", type: "Text" },
        { field: "ngaychotdl", name: "Ngày chốt", type: "Text" },
        { field: "giochotdl", name: "giờ chốt", type: "Text" },
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}
