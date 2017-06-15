var coutpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        loadlsthoadon(1);
    } catch (e) {
        console.log(e);
    }
});
function loadlsthoadon(page) {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOMAUHOADON.LOADLSTHOADON", callback: "result_loadlsthoadon" };
        var para = {
            v_pagenum: page,
            v_numrecs: coutpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_loadlsthoadon(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data == "[]" || data == null || data.length == 0) {
            try {

                messInfo("messinfo_hodon", "Không có dữ liệu hiển thị", "error");
                clearnull_hoadon();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_hodon", "", "error");
        $("#table_khhd_hoadon").empty();
    
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='a_c'>"
                + val.stt + "</td><td>"
                + setnull(val.tenhoadon) + "</td><td>"
                + setnull(val.mamauhoadon) + "</td><td>"
                + setnull(val.mauso) + "</td><td>"
                + setnull(val.kyhieu) + "</td><td class='a_c'>"
                + setnull(val.sohdhientai) + "</td><td class='a_c'>"
                + setnull(val.sohdmax) + "</td><td class='mau" + val.mau + "'>"
                + setnull(val.sudung1) + "</td><td class='c'>"
                + setnull(mauhd_hoadon(val.thumuc)) + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_hoadon' value='" + val.id + "' id='btn_hoadon" + val.id + "'><i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";
            $("#table_khhd_hoadon").append(row);
            $("#btn_hoadon" + val.id).click(function () {
                messInfo("messinfo_khhds_t", '', 'error');
                loadthongtinkhhoa_hd(val.id);
            });

        });
        LoadPhanTrang("pageCurent_lst_hoadon", "pageLst_lst_hoadon", data, function () {
            var p = getAllIdMod();
            loadlsthoadon($("#pagenumber").val());

        });

    } catch (e) {
        console.log(e);
    }
}
function mauhd_hoadon(file) {
    try {
         
        var link = urli + "/home/DownloadFileMau/" + file;
        return '<a href="' + link + '">Tải mẫu hóa đơn</a>';

    } catch (e) {
        console.log(e);
    }
}
function clearnull_hoadon() {
    try {
        $("#table_khhd_hoadon").empty();
        $("#pageLst_lst_hoadon").empty();
        $("#pageCurent_lst_hoadon").empty();
    } catch (e) {
        console.log(e);
    }
}