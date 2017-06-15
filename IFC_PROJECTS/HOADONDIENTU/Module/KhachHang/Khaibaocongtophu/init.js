var coutpage = 10;
$(document).ready(function () {
    try {
        $('.datepicker').datepicker({
            todayHighlight: true,
            format: 'dd/mm/yyyy',
            autoclose: true
        }).datepicker('setDate', new Date());
        loadConetent();
        load_ds_congtophu(1);
        f_lay_danhsachKH_autocomplete();

        $("#btn_luu").click(function () {
            f_them_cong_to_phu();
        });
    } catch (e) {
        console.log(e);
    }
});
function load_ds_congtophu(page) {
    try {
        var config = {
            connstr: "Oracle_HDDT", namesql: "HD_KHAIBAO_CONGTOPHU.DanhSachCtoPhu",
            callback: "result_load_ds_congtophu"
        };
        var para = {
            v_pagenum: page,
            v_numrecs: coutpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_load_ds_congtophu(config, para, lst) {
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

        $("#table_cto_phu").empty();

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='a_c'>"
                + val.stt + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.socongto_chinh + "</td><td>"
                + val.socongto_phu + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-danger btn-action' data-congtochinh='" + val.socongto_chinh + "' data-congtophu='" + val.socongto_phu + "' id='btn_delete" + val.socongto_chinh + "'><i class='fa fa-delete'></i> Xóa</a> &nbsp</div></form></td> </tr>";
            $("#table_cto_phu").append(row);

            $("#btn_delete" + val.socongto_chinh).click(function () {
                f_confimYesNo('Chắc chắn muốn xóa công tơ phụ này?', 'Xóa', 'Không', function () {
                    var congtochinh = $("#btn_delete" + val.socongto_chinh).data('congtochinh');
                    var congtophu = $("#btn_delete" + val.socongto_chinh).data('congtophu');
                    console.log(congtochinh);
                    f_delete_cong_to_phu(congtochinh, congtophu);
                });
            });
        });
        LoadPhanTrang("pageCurent_lst_khhd", "pageLst_lst_khhd", data, function () {
            load_ds_congtophu($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}

function f_delete_cong_to_phu(congtochinh, congtophu) {
    try {
        var config = { namesql: "HD_KHAIBAO_CONGTOPHU.XoaCongToPhu", callback: "f_result_delete_cong_to_phu", connstr: "Oracle_HDDT" };
        var para = {
            v_Congtochinh: congtochinh,
            v_Congtophu: congtophu
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_delete_cong_to_phu(config, para, result) {
    try {
        console.log(result);
        var data = result.data;
        if (!data || data == '[]' || data[0].kq == 0) {
            showToast(data[0].message, 'error');
            return;
        }
        showToast('Xóa thành công', 'success');
        load_ds_congtophu(1);
    } catch (e) {

    }
}

function f_them_cong_to_phu() {
    try {
        var config = { namesql: "HD_KHAIBAO_CONGTOPHU.KhaiBaoCongToPhu", callback: "f_result_them_cong_to_phu", connstr: "Oracle_HDDT" };
        var para = {
            v_Congtochinh: $("#txt_cto_chinh").val(),
            v_Congtophu: $("#txt_cto_phu").val(),
            v_Ngaylapctophu: $("#ngaylap_cotphu").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_them_cong_to_phu(config, para, result) {
    try {
        console.log(result);
        var data = result.data;
        if (!data || data == '[]' || data[0].kq == 0) {
            messInfo("messinfo_ctophu", data[0].message, "error");
            return;
        }
        showToast('Thêm mới thành công', 'success');
        $('button.close').click();
        load_ds_congtophu(1);
    } catch (e) {

    }
}

function f_lay_danhsachKH_autocomplete() {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_danhsachKH_autocomplete", connstr: "Oracle_HDDT" };
        var para = { v_Makh: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danhsachKH_autocomplete(config, para, data) {

    console.log(data);
    var dskh = data.data;

    var nameArr = [];
    $.each(dskh, function (key, val) {
        nameArr.push({
            label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
            value: val.socongto,
            id: val.madiemdo,
        });
    });
    $("#txt_cto_chinh").autocomplete({
        minLength: 1,
        delay: 200,
        source: nameArr,
    });
    $("#txt_cto_phu").autocomplete({
        minLength: 1,
        delay: 200,
        source: nameArr,
    });
}