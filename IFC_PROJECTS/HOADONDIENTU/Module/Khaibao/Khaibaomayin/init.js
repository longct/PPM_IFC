var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        loadthong_mayin(1);
       
    } catch (e) {
        console.log(e);
    }
});

function loadthong_mayin(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.THONGTINMAYIN", callback: "result_loadthong_mayin" };
        var para = {
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthong_mayin(confg, para, lst) {
    try{
        var data = lst.data;
    
        if (data == "[]" || data == null || data.length == 0) {
            messInfo("messinfo_showkbmin", "Không có dữ liệu hiển thị từ", "error");
            clera_in();
             return;
        }
        messInfo("messinfo_showkbmin", "", "error");
        $("#table_lkbmin").empty();
        $.each(data, function (key, val) {
            var row = "";
             row += "<tr><td class='a_c'>"
                 + val.stt + "</td><td>"
                 + setnull(val.tenmayin) + "</td><td>"
                 + setnull(val.mahieuin) + "</td><td>"
                 + setnull(val.hang) + "</td><td class='c'>"
                 + setnull(val.ngay) + "</td><td class='mau" + val.mau + "'>"
                 + setnull(val.hieuluc) + "</td><td class='c'>"
                 + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_mayin' value='" + val.id_mayin + "' id='btn_suain" + val.id_mayin + "'><i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";
             $("#table_lkbmin").append(row);
             $("#btn_suain" + val.id_mayin).click(function () {

                 messInfo("messinfo_suain", '', 'ok');
                 setTimeout(function () { thongtinidmayin(val.id_mayin); }, 300);
             });
        });
        LoadPhanTrang("pageLst_lkbmin", "pageCurent_lkbmin", data, function () {
            loadthong_mayin($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function clera_in() {
    try{
        $("#pageCurent_lkbmin").empty();
        $("#pageLst_lkbmin").empty();
        $("#table_lkbmin").empty();
    } catch (e) {
        console.log(e);
    }
}