var countPage = 10;
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
        
        load_list_vitri();

        $("#btn_locdulieu").click(function () {
            f_loc_du_lieu();
        });
    } catch (e) {
        console.log(e);
    }

});

function load_list_vitri() {
    try {
        var config = { namesql: "CAR_LOAD_LST.LST_VITRI", callback: "f_result_load_list_vitri", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_load_list_vitri(config, para, result) {
    try {
        var data = result.data;
        if (!data || data === '[]') {
            return;
        }
        var ls_vitri = [];

        for (i = 0; i < data.length; i++) {
            var item = {
                "id": data[i].mavitri,
                "text": data[i].mavitri
            }
            ls_vitri.push(item);
        }

        $('#cbVitri').combobox({
            panelHeight: 'auto',
            selectOnNavigation: false,
            valueField: 'id',
            textField: 'text',
            editable: true,
            onLoadSuccess: function () { },
            filter: function (q, row) {
                return row.text.toLowerCase().indexOf(q.toLowerCase()) >= 0;
            },
            data: ls_vitri
        });
    } catch (e) {
        console.log(e);
    }
}

function f_loc_du_lieu() {
    try {
        messInfo('messinfo_bcdoanhthu', '', 'error');
        var config = { namesql: "CAR_BAOCAO_DOANHTHU.BC_Sosanh_DoanhThu", callback: "f_result_loc_du_lieu", connstr: "Oracle_HDDT" };
        var para = {
            v_Mavitri: $('#cbVitri').combobox('getValue'),
            v_Tungay: $("#txt_tungay").val(),
            v_Denngay: $("#txt_denngay").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu(config, para, result) {
    try {
        var data0 = result.data[0].kq0;
        var data1 = result.data[1].kq1;
        $("#tb_hethongghitay tbody").empty();
        $("#tb_hethongtudong tbody").empty();
        console.log(result);
        if ((!data0 || data0 === '[]' || data0.length === 0)
            && (!data1 || data1 === '[]' || data1.length === 0)) {
            messInfo('messinfo_bcdoanhthu', 'Không có hóa đơn nào tìm thấy', 'error');
            return;
        }
        $(data0).each(function (i, item) {
            var tr = '<tr>'
            + '<td>' + item.mavitri + '</td>'
            + '<td>' + item.thoidiemvao + '</td>'
            + '<td>' + item.thoidiemra + '</td>'
            + '<td>' + item.thoigian + '</td>'
            + '<td class="text-right">' + item.sotien + '</td>'
            + '</tr>';
            $("#tb_hethongghitay tbody").append(tr);
        });

        $(data1).each(function (i, item) {
            var tr = '<tr>'
            + '<td>' + item.mavitri + '</td>'
            + '<td>' + item.thoidiemvao + '</td>'
            + '<td>' + item.thoidiemra + '</td>'
            + '<td>' + item.thoigian + '</td>'
            + '<td class="text-right">' + item.sotien + '</td>'
            + '</tr>';
            $("#tb_hethongtudong tbody").append(tr);
        });
        
    } catch (e) {
        console.log(e);
    }
}
