var coutpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        loadlsthopdong(1);
    } catch (e) {
        console.log(e);
    }
});
function loadlsthopdong(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOPDONG.LOADLSTHOPDONG", callback: "result_loadlsthopdong" };
        var para = {
        v_pagenum:page,
        v_numrecs:coutpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_loadlsthopdong(config, para, lst) {
    try {
        var data = lst.data;
      
        if (data == "[]" || data == null || data.length == 0) {
            try {
              
                messInfo("messinfo_lst", "Không có dữ liệu hiển thị", "error");
                clearnull_lst();
                return;
            } catch (e) {
                console.log(e);
            }
        }

        $("#table_khhd_lst").empty();

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='a_c'>"
                + val.stt + "</td><td>"
                + val.ten + "</td><td>"
                + val.mamauhopdong + "</td><td class='mau" + val.mau + "'>"
                + val.hieuluc + "</td><td class='c'>"
                + mauhd_hopdong(val.duongdanfile) + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_hopdong' value='" + val.id + "' id='btn_hopdong" + val.id + "'><i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";
            $("#table_khhd_lst").append(row);
                
            $("#btn_hopdong" + val.id).click(function () {
                loadthongtinkh_hd(val.id);
            });

        });
        LoadPhanTrang("pageCurent_lst_khhd", "pageLst_lst_khhd", data, function () {
            var p = getAllIdMod();
            loadlsthopdong($("#pagenumber").val());

        });

    } catch (e) {
        console.log(e);
    }
}
function mauhd_hopdong(file) {
    try {
        var link = urli + "/home/DownloadFileMau/" + file;
        return '<a href="' + link + '">Tải mẫu hợp đồng</a>';

    } catch (e) {
        console.log(e);
    }
}
function clearnull_lst() {
    try{
        $("#table_khhd_lst").empty();
        $("#pageCurent_lst_khhd").empty();
        $("#pageLst_lst_khhd").empty();
    } catch (e) {
        console.log(e);
    }
}