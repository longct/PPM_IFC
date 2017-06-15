var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        hienthi_mauquyen(1);
      

    } catch (e) {
        console.log(e);
    }
});
function hienthi_mauquyen(page) {
    try {
        var config = { connstr: "ConnectEMS", namesql: "DANHSACHMAUQUYEN", callback: "resut_hienthi_mauquyen" };
        var para = {
            pagenum: page,
            numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_hienthi_mauquyen(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            messInfo("messinfo_ds_quyen", "Không có dữ liệu hiển thị từ", "error");
            clera_mauquyen();
            return;
        }
   
        $("#table_ds_capquyen").empty();
        messInfo("messinfo_ds_quyen", "", "error");
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td style='width:20px'>"
                + SetValnull(val.stt) + "</td><td>"
                + SetValnull(val.tenmau) + "</td><td>"
                + SetValnull(val.ngay) + "</td><td class='c' style='width:120px'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' alt='Chỉnh sửa' href='#sua_mauquyen' value='" + val.id_chung + "' id='btn_mauquyen" + val.id_chung + "'><i class='fa fa-edit'></i> Sửa</a></div></form></td> </tr>";
            $("#table_ds_capquyen").append(row);
            $("#btn_mauquyen" + val.id_chung).click(function () {
                loadmauquyen_suathem(val.id_chung);
            });
        });

    } catch (e) {
        console.log(e);
    }
}
function clera_mauquyen() {
    try{
        $("#table_ds_capquyen").empty();
        $("#pageCurent_ds_capquyen").empty();
        $("#pageLst_ds_capquyen").empty();

    } catch (e) {
        console.log(e);
    }
}



