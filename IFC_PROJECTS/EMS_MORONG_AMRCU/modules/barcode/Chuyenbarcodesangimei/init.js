
$(document).ready(function () {
    try {
        loadConetent();

        $('#txt_timkiem_barimei').keypress(function (e) {
            var key = e.which;
            if (key == 13)  // the enter key code
            {
                loadchuyenbarsangimei();
                return false;
            }
        });
        $("#btxoa_barimei").click(function () {
            $("#txt_timkiem_barimei").val('');
        });
        $("#btnxuatexecl_barimei").click(function () {
            execl_barimei();
        });


    } catch (e) { console.log(e); }
});
function loadchuyenbarsangimei() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_BARCODE_DAUDOC", callback: "f_result_loadchuyenbarsangimei", connstr: "ConnectEMS" };
        var para = {
            MABARCODE: p.txt_timkiem_barimei,
      
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) { console.log(e);}
}
function f_result_loadchuyenbarsangimei(config, para, lst) {
    try {
        var data = lst.data;
        var p = getAllIdMod();
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_barimei", "Không có dữ liệu hiển thị từ " + p.txt_timkiem_barimei, "error");
                $("#grview_barimei").empty();
                setTimeout(function () { $("#txt_timkiem_barimei").val('') }, 300);
                return;
            } catch (e) {
                console.log(e);
            }
        }
        $("#grview_barimei").empty();
        messInfo("messinfo_barimei", "", "error");
        $.each(data, function (key, val) {
            var row = "";
                row += "<tr><td>"
                    + (key+1) + "</td><td>"
                    + SetValnull(val.mabarcode) + "</td><td>"
                    + SetValnull(val.detailbarcode) + "</td><td>"
                    + SetValnull(val.manhacungcap) + "</td><td>"
                    + SetValnull(val.vend_name) + "</td><td>"
                    + SetValnull(val.timeinput) + "</td></tr>";
            $("#grview_barimei").append(row);
        });

    } catch (e) { console.log(e); }
}
function execl_barimei() {
    try{
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = {
            namesql: "TB_BARCODE_DAUDOC",
            namefile: "Baocao_timkiembarcodechuyenimei",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            MABARCODE: p.txt_timkiem_barimei
        };

        var colum = {
            kq: [{ field: "mabarcode", name: "Mã barcode", type: "TextAndBoldCenter" },
               { field: "detailbarcode", name: "Chi tiết barcode", type: "TextAndBoldCenter" },
               { field: "manhacungcap", name: "Nhà cung cấp", type: "TextAndBoldCenter" },
               { field: "vend_name", name: "Loại thiết bị", type: "TextAndBoldCenter" },
               { field: "timeinput", name: "Thời điểm", type: "TextAndBoldCenter" }]
        };
        excuteExcel(config, para, colum, true);

    } catch (e) {
        console.log(e);
    }
}


