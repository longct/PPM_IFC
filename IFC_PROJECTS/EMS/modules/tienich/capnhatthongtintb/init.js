var paraTable_cnttttb = "";
$(document).ready(function () {
    try {
        loadConetent();

        $("#btnCapNhat_cnthongtintb").click(function () {
            var lenght_cntttb = $("#readExcel_cntttb").get(0).files.length;
            if (lenght_cntttb > 0) {
                var fname = $("#readExcel_cntttb").get(0).files[0].name;
                var fileExt = fname.split('.').pop();
                if (fileExt != 'xlsx' && fileExt != 'xls') {
                    messInfo("messinfo_cntttb", 'Vui lòng chọn file excel', "error");
                    return;
                }
                f_confimYesNo("Bạn có chắc chắn muốn cập nhật?", "Bỏ qua", "Đồng ý", function () { f_capNhat_cntttb(); });

            } else {
                messInfo("messinfo_cntttb", 'Vui lòng chọn file trước khi thực hiện', "error");
            }

        });

        $("#readExcel_cntttb").click(function () {
            $("#readExcel_cntttb").val("");
            messInfo("messinfo_cntttb", '', "error");
            messInfo("messinfo_cntttb", '', "ok");
        });

    } catch (e) { console.log(e); }
});

function f_UploadFile_cntttb() {
    var userInfo = JSON.parse(localStorage.getItem("userinfo"));
    var p = getAllIdMod();
    var fdata = new FormData();
    var file = document.getElementById("readExcel_cntttb").files[0];
    fdata.append("file", file);
    fdata.append("select", "select *");
    fdata.append("where", "");
    if (file == null || file == 'undefined' || file.length == 0) {
        messInfo("messinfo_cntttb", "Bạn chưa chọn file execl", "error");
        return;
    }
    var config = { callback: "f_resultImportExcel_cntttb" };
    f_importExcel(config, fdata);
}
function f_resultImportExcel_cntttb(config, para, lst) {
    $("#grv_cnttttb >tbody").empty();
    messInfo("messinfo_cntttb", "", "error");
    paraTable_cnttttb = [];
    console.log(lst.data);
    $.each(lst.data, function (key, val) {
       
        if (val.serial != "" && val.serial != undefined) {
            var temp = {
               
                Serial: val.serial,
                Sodienthoai: val.sodienthoai,
                Thoigiannhapkho: val.thoigiannhapkho,
                Thoigiankichhoat: val.thoigiankichhoat,
                Nhamang: val.nhamang,
                VersionModem: val.versionmodem,
                Chusohuu: val.chusohuu
            };
            paraTable_cnttttb.push(temp);
        }

    });
    if (paraTable_cnttttb.length > 0) {
        f_showGrid_cnttttb(paraTable_cnttttb);
    } else {
        messInfo("messinfo_cntttb", "Không có dữ liệu", "error");
    }

}
function f_showGrid_cnttttb(data) {
    $("#grv_cnttttb tbody").empty();
    $.each(data, function (key, val) {
        var tr = "<tr>";
        tr += "<td>" + (key + 1) + "</td>";
        tr += "<td>" + val.Serial + "</td>";
        tr += "<td>" + val.Sodienthoai + "</td>";
        tr += "<td>" + val.Thoigiannhapkho + "</td>";
        tr += "<td>" + val.Thoigiankichhoat + "</td>";
        tr += "<td>" + val.Nhamang + "</td>";
        tr += "<td>" + val.VersionModem + "</td>";
        tr += "<td>" + val.Chusohuu + "</td>";
        tr += "</tr>";
        $("#grv_cnttttb tbody").append(tr);
    });
}
function f_capNhat_cntttb() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var dt = '{ "table": ' + JSON.stringify(paraTable_cnttttb) + ' }';
        var p = getAllIdMod();
        var config = { namesql: "TB_CapNhatThongTinThietBi", callback: "f_resultCapNhat_cnttttb", connstr: "ConnectEMS" };
        var para = {
            UserId: userInfo.userid
        };
        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));

    } catch (e) {
        console.log(e);
    }
}
function f_resultCapNhat_cnttttb(config, para, lst)
{
    try {
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_cntttb", "Cập nhật trạng thái thiết bị lỗi", "error");
            return;
        }
        if (lst.data[0].result.toLowerCase().indexOf("thành công") >= 0) {
            messInfo("messinfo_cntttb", lst.data[0].result, "ok");
            $("#grv_cnttttb >tbody").empty();
        }
        else
            messInfo("messinfo_cntttb", lst.data[0].result, "error");
    } catch (e) { console.log(e); }
}


