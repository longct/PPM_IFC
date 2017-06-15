var Countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadcapnhatnhanvien(1);

    } catch (e) {
        console.log(e);
    }
});
function f_loadChangeTree() {
    loadcapnhatnhanvien(1);
}

function loadcapnhatnhanvien(page) {
    try{
        var config = { namesql: "PKG_CAKIP.LISTCHITIETNGUOICATRUCDD", callback: "f_result_loadcapnhatnhanvien", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = {
            v_madonvi: infotree.code,
            v_pagenum:page,
            v_numrecs:Countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcapnhatnhanvien(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data.length == 0 || data == null) {
            messInfo("messinfo_chitietcapnhat", "Không có dữ liệu hiển thị", "error");
            $("#table_chitietcapnhat").empty();
            return;
        }
        messInfo("messinfo_chitietcapnhat", "", "error");
        datasetcapnhatnhanvien(data);
    } catch (e) {
        console.log(e);
    }
}
function datasetcapnhatnhanvien(data) {
    try {
        $("#table_chitietcapnhat").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenca) + "</td><td>"
                + setnull(val.tennhanvien) + "</td><td>"
                + setnull(val.tencot) + "</td><td>"
                + val.tendonvi + "</td></tr>";
            $("#table_chitietcapnhat").append(row);
        });

    } catch (e) {
        console.log(e);
    }
}