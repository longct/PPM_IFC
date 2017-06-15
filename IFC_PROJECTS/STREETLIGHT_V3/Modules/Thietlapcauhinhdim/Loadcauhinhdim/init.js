
var countpage = 10;
$(document).ready(function () {
    try {
        $("#dkdim").click(function () {
            init_cstl();
            $("#khoang_cstl").val('');
        });
        $("#dkpha").click(function () {
            init_tlpha();
            $("#khoang_tlpha").val('');
        });
   

        loadcauhinhdim(1);
       
    } catch (e) {
        console.log(e);
    }

});
function loadcauhinhdim(page) {
    try{
        var config = { namesql: "PKG_CSTHIEPLAP.LOADLSTCAUHINH", callback: "f_result_loadcauhinh_dim", connstr: "ConnectOracleStreetLight" };
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var para = {
            v_pagenum: page,
            v_numrecs: countpage
        }
        ExecuteServiceSyns(config, para);


    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcauhinh_dim(config, para, lst) {
    try{
        var data = lst.data;

        if (data == [] || data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_loadcauhinh", "Không có dữ liệu hiển thị", "error");
            clearnull_chdim();
            return;
        }
        messInfo("messinfo_loadcauhinh", "", "ok");
        $("#table_loadcauhinh").empty();
            
        $.each(data, function (key, val) {
            var loai = "";
            if (val.loaidieukhien == "DIM") {
                loai = "<a class='btn btn-success btn-action' data-toggle='modal' href='#DieuKhien_dim' value='" + val.id_cauhinh + "' id='btn_dimtudongcl" + val.id_cauhinh + "'>Xem</a>";
            }
            if (val.loaidieukhien == "PHA") {
                loai = "<a class='btn btn-success btn-action' data-toggle='modal' href='#DieuKhien_pha' value='" + val.id_cauhinh + "' id='btn_phatudongcl" + val.id_cauhinh + "'>Xem</a>";
            }

            var d1 = " <form class='form-inline' role=''form'><div class='form-group'>" + loai + "</div> <a class='btn btn-danger btn-action' data-toggle='modal' href='#confimYesNo' value='" + val.id_cauhinh + "' id='btn_xoathongtl" + val.id_cauhinh + "'><i class='fa fa-trash-o'></i>Xóa</a></form></td></tr>";
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenthietlap + "</td><td>"
                + val.loaidieukhien + "</td><td>"
                + val.loaithietbi + "</td><td>"
                + val.chedo + "</td><td>"
                + val.thoigian + "</td><td>"
                + d1 + "</td></tr>";
            $("#table_loadcauhinh").append(row);
            $("#btn_phatudongcl" + val.id_cauhinh).click(function () {
                f_loadInfoOne_tlpha(val.id_cauhinh);
            });
            $("#btn_dimtudongcl" + val.id_cauhinh).click(function () {
                f_loadInfoOne_cstl(val.id_cauhinh);
            });

            $("#btn_xoathongtl" + val.id_cauhinh).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn cấu hình thiết lập", "Bỏ qua", "Xác nhận", function () {
                    load_xoathongtl(val.id_cauhinh);
                });
            });

        });

        LoadPhanTrang("pageLst_loadcauhinh", "pageCurent_loadcauhinh", data, function () {
            loadcauhinhdim($("#pagenumber").val());
        });
      
    } catch (e) {
        console.log(e);
    }
}
function clearnull_chdim() {
    try {
        $("#table_loadcauhinh").empty();
        $("#pageCurent_loadcauhinh").empty();
        $("#pageLst_loadcauhinh").empty();

    } catch (e) {
        console.log(e);
    }
}
function load_xoathongtl(val) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_CSTHIEPLAP.XOACAUHINH", callback: "f_result_xoathongtl", connstr: "ConnectOracleStreetLight" };
        var para = { v_ID: val};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoathongtl(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_loadcauhinh", row, "ok");
            loadcauhinhdim(1);
        } else {
            messInfo("messinfo_loadcauhinh", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}