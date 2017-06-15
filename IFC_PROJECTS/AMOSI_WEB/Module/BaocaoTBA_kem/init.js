$(document).ready(function () {
    try {
        LoadComboDonvi();
        $('#dt_ngay').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            minViewMode: 'days',
            defaultDate: null,
            forceParse: false,
            clearBtn: true,
            endDate: '+0d'
        }).on('changeDate', function (e) {
            if ($(this).val() != gettimenow()) {
                if ($('#cbo_time').val() == 'now') {
                    $('#cbo_time').val("");
                    $('#cbo_time option[value="now"]').hide();
                }
            } else {
                $('#cbo_time option[value="now"]').show();
            }
        });

        $('#dt_ngay').datepicker('setDate', 'now');
        $('#dt_ngay').datepicker('update');

        $("#btn_xembaocao").click(function () {
            if ($('#jqxDropDonvi').jqxTree('getSelectedItem') == null) {
                messInfo("messinfo_bht", 'Vui lòng chọn đơn vị cần xem báo cáo', "error");
                return;
            }

            if ($('#dt_ngay').val() == "") {
                messInfo("messinfo_bht", 'Vui lòng chọn ngày cần xem báo cáo', "error");
                return;
            }

            if ($('#cbo_time').val() == null) {
                messInfo("messinfo_bht", 'Vui lòng chọn thời điểm cần xem báo cáo', "error");
                return;
            }
            LoadBaoCao();
        });

        $('#btn_excel').click(function () {
            XuatExcel()
        });
    } catch (e) {
        console.log(e);
    }

});


function XuatExcel() {
    try {
        //var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namefile: "Bao_cao_RF_hang_ngay" + gettimenow().replace("/", "-"),
            connstr: "Oracle_AmosiDefault",
            userid: "123"
        };
        //var para = JSON.parse(localStorage.getItem("data_bckhotong_chitiet"));
        //var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var dt = '{ "data": ' + JSON.stringify(data_excel) + ' }';       
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "maduan", name: "Đơn vị", type: "Text" },
               { field: "tendanhmuc", name: "Tên danh mục", type: "Text" },
               { field: "codulieu", name: "Có dữ liệu", type: "Text" },
               { field: "tongso", name: "Tổng số điểm đo", type: "Text" },
               { field: "tyle", name: "Tỷ lệ", type: "Text" },
               { field: "tyle_homqua", name: "Tỷ lệ quá khứ", type: "Text" },
               { field: "songayloi", name: "Số ngày lỗi", type: "Text" },
               { field: "ghichu", name: "Ghi chú", type: "Text" }
            ]
        };
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }
}

function LoadComboDonvi() {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GetComboDonvi", callback: "f_result_LoadComboDonvi" };
        var para = {
            v_Code: "",
            v_lenCode: 4
        };
        if (sessionStorage.getItem("combodonvi") != null && sessionStorage.getItem("combodonvi") != undefined) {
            f_result_LoadComboDonvi(config, para, JSON.parse(sessionStorage.getItem("combodonvi")))
        }
        else
            ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_LoadComboDonvi(config, para, lst) {
    try {
        var source = null;
        sessionStorage.setItem("combodonvi", JSON.stringify(lst))
        var data = lst.data;
        console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '30px'
            });
            $('#jqxDropDonvi').on('select', function (event) {
                f_ComboDonvi_selected(event);
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.id,
                    "parentid": value.parentid,
                    "text": value.text,
                    "value": value.id
                }
                //console.log(item);
                dt.push(item);

            });
            //console.log(dt);
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id' },
                    { name: 'parentid' },
                    { name: 'text' },
                    { name: 'value' }
                ],
                id: 'id',
                localdata: dt
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
            $('#jqxDropDonvi').jqxTree({ source: records, width: '500px', height: '200px', });
            $('#jqxDropDonvi').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_ComboDonvi_selected() {
    //var args = event.args;
    var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
    //var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
    $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
    $('#dropDownButton').jqxDropDownButton('close');
}

function LoadBaoCao() {
    try {
        var v_time = $('#cbo_time option:selected').val();
        var v_date = $('#dt_ngay').val();
        //if (v_time == 'now') {
        //    var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
        //    var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GET_BAOCAO_HETHONGRF_NOW", callback: "f_result_LoadBaoCao" };
        //    var para = {
        //        v_code: item.value.split("_")[1],
        //        v_maduan: item.value.split("_")[0],
        //    };
        //    $("#processing-modal").modal("show");
        //    ExecuteServiceSyns(config, para);
        //}
        //else {
        var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GET_BAOCAO_TBAKEM_BYTIME", callback: "f_result_LoadBaoCao" };
        var para = {
            v_code: item.value.split("_")[1],
            v_maduan: item.value.split("_")[0],
            v_time: v_date + ' ' + v_time,
        };
        $("#processing-modal").modal("show");
        ExecuteServiceSyns(config, para);
        //}
    }
    catch (e) {
        console.log(e.message);
    }
}

var data_excel;
function f_result_LoadBaoCao(config, para, lst) {
    var data = lst.data;
    console.log(data)
    data_excel = data;
    $('#table_baocao tbody').html("");
    if (data.length > 0) {
        $('#messinfo_bht').hide();
        $.each(data, function (idx, value) {
            var class_1 = "", class_2 = "";
            if (value.code == '01')
                class_1 = "cty_dl";
            if (value.tyle < 100)
                class_2 = "tyle_thap"
            var tr = "<tr class='" + class_1 + "' id='" + value.code + "_" + value.maduan + "'><td>" + (idx + 1) + "</td>"
                    + "<td>" + value.tendanhmuc + "</td>"
                    + "<td class='text-right'>" + nvl(value.codulieu) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tongso) + "</td>"
                    + "<td class='text-right " + class_2 + "'>" + nvl(value.tyle) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tyle_homqua) + "</td>"
                    + "<td class='text-right'>" + nvl(value.songayloi) + "</td>"
                    + "<td class='text-right'>" + nvl(value.ghichu) + "</td>"
            "</td></tr>"
            //console.log(item);
            $('#table_baocao tbody').append(tr);

        });

        $(".sticky-header").floatThead({ scrollingTop: 50 });
    }
    else {
        var v_time = $('#cbo_time option:selected').val();
        var v_date = $('#dt_ngay').val();
        messInfo("messinfo_bht", 'Không tìm thấy thông tin tổng hợp tại thời điểm : ' + v_date + ' ' + v_time, "error");
    }
    $("#processing-modal").modal("hide");
}