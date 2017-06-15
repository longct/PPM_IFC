var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        var datenow = gettimenow();
        $('.default-date-picker').val(gettimenow());
        $('.default-date-picker').datepicker()
            .on('changeDate', function (e) {
                $('.default-date-picker').datepicker('hide');
            });

        loadcatruc();
        loadnhanvien();

        $("#btn_locdulieu").click(function () {
            f_loc_du_lieu(1);
        });
    } catch (e) {
        console.log(e);
    }

});

function f_loc_du_lieu(page) {
    try {
        messInfo('messinfo_bcdoanhthu', '', 'error');
        var config = { namesql: "CAR_BAOCAO_DOANHTHU.BC_DoanhThu_TheoCa", callback: "f_result_loc_du_lieu", connstr: "Oracle_HDDT" };
        var para = {
            v_Catruc: $('#cb_catruc_bctheoca').combobox('getValue'),
            v_Nhanvien: $('#cb_nhanvien_bctheoca').combobox('getValue'),
            v_Tungay: $("#txt_tungay").val(),
            v_Denngay: $("#txt_denngay").val(),
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu(config, para, result) {
    try {
        var data = result.data;
        $("#tb_hethongghitay tbody").empty();
        console.log(result);
        if (!data || data === '[]' || data.length === 0) {
            messInfo('messinfo_bcdoanhthu', 'Không có hóa đơn nào tìm thấy', 'error');
            return;
        }
        $(data).each(function (i, item) {
            var tr = '<tr>'
            + '<td>' + item.manhanvien + '</td>'
            + '<td>' + item.mavitri + '</td>'
            + '<td>' + item.thoidiemvao + '</td>'
            + '<td>' + item.thoidiemra + '</td>'
            + '<td>' + item.thoigian + '</td>'
            + '<td class="text-right">' + item.sotien + '</td>'
            + '</tr>';
            $("#tb_hethongghitay tbody").append(tr);
        });
        
        LoadPhanTrang("pageLst_bctheoca", "pageCurent_bctheoca", data, function () {
            f_loc_du_lieu($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}


function loadcatruc() {
    try {
        var config = { namesql: "CAR_PHANCA.LSTCA", callback: "f_result_loadcatruc", connstr: "Oracle_HDDT" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcatruc(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data == null || data == '[]' || data == undefined || data.length == 0) { return; }
        var ls_vitri = [];

        for (i = 0; i < data.length; i++) {
            var item = {
                "id": data[i].id,
                "text": data[i].ten
            }
            ls_vitri.push(item);
        }

        $('#cb_catruc_bctheoca').combobox({
            panelHeight: 'auto',
            selectOnNavigation: false,
            valueField: 'id',
            textField: 'text',
            editable: false,
            filter: function (q, row) {
                return row.text.toLowerCase().indexOf(q.toLowerCase()) >= 0;
            },
            data: ls_vitri
        });

        $('#cb_catruc_bctheoca').combobox('select', ls_vitri[0].id);
    } catch (e) {
        console.log(e);
    }
}


function loadnhanvien() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "CAR_PHANCA.LSTNHANVIEN", callback: "f_result_loadnhanvien", connstr: "Oracle_HDDT" };
        var para = {
            v_CODE: p.cbDonVi_master
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnhanvien(config, para, lst) {
    try {
        var data = lst.data
        if (data == null || data == '[]' || data == undefined || data.length == 0) { return; }
        var ls_vitri = [{ id: -1, text: "Tất cả" }];

        for (i = 0; i < data.length; i++) {
            var item = {
                "id": data[i].id,
                "text": data[i].ten
            }
            ls_vitri.push(item);
        }

        $('#cb_nhanvien_bctheoca').combobox({
            panelHeight: 'auto',
            selectOnNavigation: false,
            valueField: 'id',
            textField: 'text',
            editable: false,
            filter: function (q, row) {
                return row.text.toLowerCase().indexOf(q.toLowerCase()) >= 0;
            },
            data: ls_vitri
        });

        $('#cb_nhanvien_bctheoca').combobox('select', ls_vitri[0].id);
    } catch (e) {
        console.log(e);
    }
}