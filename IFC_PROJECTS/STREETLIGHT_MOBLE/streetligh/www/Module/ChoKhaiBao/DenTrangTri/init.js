var Countpage = 10
$(document).ready(function () {
    try {
        loadConetent();
        loadchecklog_master();
        loadthongtin_ttden(1);
    } catch (e) {
        console.log(e);
    }
});



function loadthongtin_ttden(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_QUANLYDENTT.DANHSACHDENTRANGTRI", callback: "f_result_loadthongtinbong_ttden", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code: '0120',
            v_pagenum: page,
            v_numrecs: Countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinbong_ttden(config, para, lst) {
    try {

        var data = lst.data;
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttden", "Không có dữ liệu hiển thị", "error");
            clearnull_ttden();
            return;
        }
        messInfo("messinfo_ttden", "", "ok");
        hienthi_ttden(data);

    } catch (e) {
        console.log(e);
    }
}
function hienthi_ttden(data) {
    try {

        $("#table_ttden").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenden) + "</td><td>"
                + setnull(val.imei) + "</td><td>"
                + setnull(val.ngaytaoa) + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_thongtinden' value='" + val.id + "' id='btn_suattden" + val.id + "'>Sửa</a></div> <div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#confimYesNoXoa' value='" + val.id + "' id='btn_xoattden" + val.id + "'>Xóa</a></div> </form></td></tr>";

            $("#table_ttden").append(row);
            $("#btn_suattden" + val.id).click(function () {
                messInfo("messinfo_suattden", "", "ok");
                loadthongtinidbong_suattden(val.id);
            });
            $("#btn_xoattden" + val.id).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn xóa bỏ đèn này ", "Bỏ qua", "Xác nhận", function () {
                    xoa_ttden(val.id);
                });
            })

        });

        LoadPhanTrang("pageLst_ttden", "pageCurent_ttden", data, function () {
            loadthongtin_ttden($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}

function clearnull_ttden() {
    try {
        $("#table_ttden").empty();
        $("#pageCurent_ttden").empty();
        $("#pageLst_ttden").empty();
    } catch (e) {
        console.log(e);
    }
}
function xoa_ttden(val) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_QUANLYDENTT.XOATHONGTINDEN", callback: "f_result_xoa_ttden", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_ID: val
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_xoa_ttden(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ttden", row, "ok");
            loadthongtin_ttden(1);
        } else {
            messInfo("messinfo_ttden", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}












