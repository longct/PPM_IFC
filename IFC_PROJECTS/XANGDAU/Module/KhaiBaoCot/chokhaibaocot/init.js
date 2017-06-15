var countPage = 5;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loaddanhsach_cot(1);
    } catch (e) {
        console.log(e);
    }

});
function f_loadChangeTree() {
    loaddanhsach_cot(1);
}

function loaddanhsach_cot(page) {
    try {
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var config = { namesql: "PKG_KHAIBAOCOT.LOADCOT", callback: "f_result_loaddanhsach_cot", connstr: "ConnOracleXangDau" };
        var para = {
            v_Code: infotree.code,
            v_pagenum: page,
            v_numrecs: countPage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_cot(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                messInfo("messinfo_cot", "Không có dữ liệu hiển thị ", "error");
                $("#table_khaibao_cot").empty();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_cot", "", "error");
        datakhachhang_cot(data);

    } catch (e) {
        console.log(e);
    }
}
function datakhachhang_cot(data) {
    try {
        $("#table_khaibao_cot").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tencot + "</td><td>"
                + setnull(val.sothutu) + "</td><td>"
                + setnull(val.ngaytao) + "</td><td>"  
                + val.tentram + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_cot' value='" + val.ma_cot + "' id='btn_suacot" + val.ma_cot + "'>Sửa</a> &nbsp;<a class='btn btn-danger btn-action' data-toggle='modal' href='#' value='" + val.ma_cot + "' id='btnxoa_cot" + val.ma_cot + "'>Xóa</a></div></form></td> </tr>";

            $("#table_khaibao_cot").append(row);

            $("#btn_suacot" + val.ma_cot).click(function () {
                loadmacot_sua(val.ma_cot);
            });
            $("#btnxoa_cot" + val.ma_cot).click(function () {
                f_confimYesNo("Bạn chắc muốn xóa", "Bỏ qua", "Xác nhận", function () {
                    xoa_cot(val.ma_cot);
                });
            });
        });
        LoadPhanTrang("pageLst_cot", "pageCurent_cot", data, function () {
            loaddanhsach_cot($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}
function xoa_cot(val) {
    try{
        var config = { namesql: "PKG_KHAIBAOCOT.XOACOT", callback: "f_result_xoa_cot", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDCOT:val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoa_cot(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_xoa", row, "ok");
            loaddanhsach_cot(1);
        } else {
            messInfo("messinfo_xoa", row, "error");
            setTimeout(function () { messInfo("messinfo_xoa", '', "error"); }, 2000);
        }

    } catch (e) {
        console.log(e);
    }
}