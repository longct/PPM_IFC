var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        loadlstdienluc(1);
        $("#khaibaothemtn").click(function () {
            messInfo("messinfo_kbttdluc", '', 'error');
        });

    } catch (e) {
        console.log(e);
    }
});

function loadlstdienluc(page) {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCTY.LOADLSTCTY", callback: "result_loadlstdienluc" };
        var para = {
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_loadlstdienluc(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {

            messInfo("messinfo_dienluc", "Không có dữ liệu hiển thị", 'error');
            clear_dienluc();
            return;
        }
   
        messInfo("messinfo_dienluc", "", 'error');
        $("#table_dienluc").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.tencty + "</td><td>"
                + val.dienthoai_cty + "</td><td>"
                + val.diachi_cty + "</td><td class='c'>"
                + val.ngaytao + "</td><td class='mau" + val.mau + "'>"
                + val.hieuluc + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group '><a class='btn btn-success btn-action ' data-toggle='modal' href='#sua_ctydienluc' value='" + val.id + "' id='btn_suacty" + val.id + "'> <i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";

            $("#table_dienluc").append(row);

            $("#btn_suacty" + val.id).click(function () {
                messInfo("messinfo_skbttdluc", '', 'error');
                loathongtinidcty(val.id);
            });

        });
        api_phanquyenModule();
        LoadPhanTrang("pageLst_dienluc", "pageCurent_dienluc", data, function () {
            loadlstdienluc($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}

function clear_dienluc() {
    try{
        $("#table_dienluc").empty();
        $("#pageCurent_dienluc").empty();
        $("#pageLst_dienluc").empty();
    } catch (e) {
        console.log(e);
    }
}










