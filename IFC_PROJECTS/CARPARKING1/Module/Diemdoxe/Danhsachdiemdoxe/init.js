var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loaddanhsach_ddxe(1);
    } catch (e) {
        console.log(e);
    }

});
function f_loadChangeTree() {
    try{
        loaddanhsach_ddxe(1);
    } catch (e) {
        console.log(e);
    }

}

function loaddanhsach_ddxe(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "CAR_DANHSACHDIEMDO.DANHSACH", callback: "f_result_loaddanhsach_ddxe", connstr: "Oracle_HDDT" };
        var para = {
            v_CODE: p.cbDonVi_master,
            v_pagenum: page,
            v_numrecs: countpage,
        };
        ExecuteServiceSyns(config, para);
        $("#btn_themxe").click(function () {
            messInfo("messinfo_themxe", '', "error");
        });
   

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_ddxe(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                messInfo("messinfo_diemdo", "Không có dữ liệu hiển thị ", "error");
                clear_txe();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        $("#table_khaibao_ddxe").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.ten_ddx + "</td><td>"
                + val.nguoiquanly + "</td><td>"
                + val.sodienthoai + "</td><td>"
                + val.tong_ddx + "</td><td>"
                + val.tendiachi + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success ' data-toggle='modal' href='#sua_diemdoxe' value='" + val.id_ddx + "' id='btn_diemdoxe" + val.id_ddx + "'>Sửa</a> </div></form></td> </tr>";
            $("#table_khaibao_ddxe").append(row);
            $("#btn_diemdoxe" + val.id_ddx).click(function () {
                messInfo("messinfo_suama", '', 'error');
                loadthongtin_dxe(val.id_ddx);

            });
        });
        LoadPhanTrang("pageLst_ddxe", "pageCurent_ddxe", data, function () {
            loaddanhsach_ddxe($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}
function clear_txe() {
    try{
        $("#table_khaibao_ddxe").empty();
        $("#pageCurent_ddxe").empty();
        $("#pageLst_ddxe").empty();
    } catch (e) {
        console.log(e);
    }
}