var paraTable_cntttb = [];

$(document).ready(function () {
    try {

        loadConetent();
        f_loadBanDau_cntttb();
        $("#btnCapNhat_cntttb").click(function () {
            var check = f_check_cntttb();
            if (check != "") {
                messInfo("messinfo_cntttb", check, "error");
                return;
            }
            f_confimYesNo("Cập nhật trạng thái thiết bị?", "Bỏ qua", "Đồng ý", function () { f_capNhat_cntttb(); });


        });

    } catch (e) { console.log(e); }
});


function f_capNhat_cntttb() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var dt = '{ "table": ' + JSON.stringify(paraTable_cntttb) + ' }';
        var p = getAllIdMod();
        var config = { namesql: "TB_CapNhatTrangThaiThietBi", callback: "f_resultCapNhat_cntttb", connstr: "ConnectEMS" };
        var para = {
            UserId: userInfo.userid,
            STATUS: p.cbtrangthai_cntttb
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
function f_resultCapNhat_cntttb(config,para,lst)
{
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_cntttb", "Cập nhật trạng thái thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_cntttb", lst.data[0].result, "ok");
            paraTable_cntttb = [];
        }
        else
            messInfo("messinfo_cntttb", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}

// doc file excel
function f_UploadFile_cntttb() {
    try {
        var fdata = new FormData();
        var file = document.getElementById("readExcel_cntttb").files[0];
        //var file = p.btn_import_1pha_khachhang.files[0];
        fdata.append("file", file);
        fdata.append("select", "select *");
        fdata.append("where", "");
        if (file == null || file == 'undefined' || file.length == 0) {
            messInfo("messinfo_cntttb", "Bạn chưa chọn file execl", "error");
            return;
        }
        var config = { callback: "f_resultImportExcel_cntttb11111" };
        f_importExcel(config, fdata);
    } catch (e) { console.log(e); }
}

function f_resultImportExcel_cntttb11111(config, para, lst) {
    try {
      
        paraTable_cntttb = [];
        $.each(lst.data, function (key, val) {
            if (val.series != "" && val.series != undefined) {
                var temp = {
                    TypeDeviceId: "",
                    VendorId: "",
                    SeriesDivice: val.series,
                    Version: "",
                    BHTimeStart: "",
                    BHTimeEnd: "",
                    Sim_TimeActive: "",
                    Sim_Phone: "",
                    CountDivice: 1,
                    InfoAdd1: "",
                    InfoAdd2: "",
                    StatusDivice: "",
                    Stt: key
                };
                paraTable_cntttb.push(temp);
            }
        });
        if (paraTable_cntttb.length > 0) {
            f_showGrid_cntttb(paraTable_cntttb);
        } else {
            messInfo("messinfo_cntttb", "Không có dữ liệu", "error");
        }

    } catch (e) { console.log(e); }
}

function f_showGrid_cntttb(data) {
    try {

        $("#grv_cntttb tbody").empty();
        $.each(data, function (key, val) {
            var tr = "<tr>";
            tr += "<td>" + (key + 1) + "</td>";
            tr += "<td>" + val.SeriesDivice + "</td>";
            tr += "</tr>";
            $("#grv_cntttb tbody").append(tr);
        });
    } catch (e) { console.log(e); }
}

function f_loadBanDau_cntttb() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "f_result_loadBanDau_cntttb", connstr: "ConnectEMS" };
        var para = { Type: "Basic", Userid: userInfo.userid };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanDau_cntttb(config, para, lst) {
    try {
        dataToCob("cbtrangthai_cntttb", lst.data[7].kq7, "code", "name", "-1", "--Chọn trạng thái--");
    } catch (e) {
        console.log(e);
    }
}
function f_check_cntttb()
{
    if (paraTable_cntttb == null || paraTable_cntttb.length == 0)
        return "Không có dữ liệu";

    var p = getAllIdMod();
    if(p.cbtrangthai_cntttb==null || p.cbtrangthai_cntttb==undefined|| p.cbtrangthai_cntttb =="-1") 
        return "Chưa chọn trạng thái"
    return "";
}