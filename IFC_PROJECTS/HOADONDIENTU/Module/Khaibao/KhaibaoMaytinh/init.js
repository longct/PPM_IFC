var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        loadthongtinh(1);
       
    } catch (e) {
        console.log(e);
    }
});


function loadthongtinh(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.THONGTINMAYTINH", callback: "result_loadthongtinh" };
        var para = {
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtinh(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            messInfo("messinfo_showkbmt", "Không có dữ liệu hiển thị từ", "error");
            clera_mt();
             return;
        }
      
        messInfo("messinfo_showkbmin", "", "error");
        $("#table_kbmt").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='a_c'>"
                + val.stt + "</td><td>"
                + setnull(val.tenmaytinh) + "</td><td>"
                + setnull(val.mahieu) + "</td><td>"
                + setnull(val.ram) + "</td><td>"
                + setnull(val.hedieuhanh) + "</td><td class='c'>"
                + setnull(val.ngaya) + "</td><td class='mau"+val.mau+"'>"
                + setnull(val.hieuluc) + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_maytinh' value='" + val.id + "' id='btn_maytinh" + val.id + "'> <i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";
            $("#table_kbmt").append(row);
            $("#btn_maytinh" + val.id).click(function () {
                messInfo("messinfos_kbmt", '', 'ok');
                setTimeout(function () { thongtinidmaytinh(val.id); }, 300);
            });

        });

        LoadPhanTrang("pageLst_kbmt", "pageCurent_kbmt", data, function () {
            loadthongtinh($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}
function clera_mt() {
    try {
        $("#pageCurent_kbmt").empty();
        $("#pageLst_kbmt").empty();
        $("#table_kbmt").empty();
    } catch (e) {
        console.log(e);
    }
}