var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        loaddanhcoquanthue(1);

    } catch (e) {
        console.log(e);
    }
});

function loaddanhcoquanthue(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCQTHUE.LOADDANHCOQUANTHUE", callback: "result_loaddanhcoquanthue" };
        var para = {
            v_pagenum: page,
            v_numrecs:countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loaddanhcoquanthue(config, para, lst) {
    try{
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_cqthue", "Không có dữ liệu hiển thị", 'error');
            clear_cqt();
            return;
        }
        messInfo("messinfo_cqthue", "", 'error');
        $("#table_cqthue").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='a_c'>"
                + setnull(val.stt) + "</td><td>"
                + setnull(val.tencqt) + "</td><td>"
                + setnull(val.ma_cqt) + "</td><td>"
                + setnull(val.dienthoai) + "</td><td class='c'>"
                + setnull(val.ngaytao) + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#capnhat_coquanthue' value='" + val.id_auto + "' id='btn_suacqthue" + val.id_auto + "'> <i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";
            $("#table_cqthue").append(row);
            $("#btn_suacqthue" + val.id_auto).click(function () {
                loadthongtinid(val.id_auto);
              
            });
        });
        LoadPhanTrang("pageLst_dienluc", "pageCurent_dienluc", data, function () {
            loaddanhcoquanthue($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}

function clear_cqt() {
    try {
        $("#table_cqthue").empty();
        $("#pageCurent_cqthue").empty();
        $("#pageLst_cqthue").empty();
    } catch (e) {
        console.log(e);
    }
}
