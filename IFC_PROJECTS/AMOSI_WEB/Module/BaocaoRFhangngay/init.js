$(document).ready(function () {
    try {

        setTitle("Báo cáo RF hàng ngày");
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


$(function () {
    var chat = $.connection.myChatHub;
    chat.client.addNewMessageToPage = function (name, message) {
        $("#discussion").append('<li><strong>' + htmlEncode(name) + '<strong>: ' + htmlEncode(message) + '</li>');
    }
    $("#userid").val(prompt('Enter your name', ''));
    $('#msg').focus();
    $.connection.hub.start().done(function () {
        $('#btnsendmessage').click(function () {
            chat.server.send($('#userid').val(), $('#msg').val());
            $('#msg').val('').focus();
        });
    });
});
function htmlEncode(value) {
    var encodevalue = $("<div/>").text(value).html();
    return encodevalue;
}


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
               { field: "codulieuhomqua", name: "Có dữ liệu quá khứ", type: "Text" },
               { field: "tongsohomqua", name: "Tổng số điểm đo ngày quá khứ", type: "Text" },
               { field: "tylehomqua", name: "Tỷ lệ ngày quá khứ", type: "Text" },
               { field: "tanggiam", name: "Tăng giảm", type: "Text" },
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
        if (v_time == 'now') {
            var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
            var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GET_BAOCAO_HETHONGRF_NOW", callback: "f_result_LoadBaoCao" };
            var para = {
                v_code: item.value.split("_")[1],
                v_maduan: item.value.split("_")[0],
            };
            $("#processing-modal").modal("show");
            ExecuteServiceSyns(config, para);
        }
        else {
            var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
            var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GET_BAOCAO_HETHONGRF_BYTIME", callback: "f_result_LoadBaoCao" };
            var para = {
                v_code: item.value.split("_")[1],
                v_maduan: item.value.split("_")[0],
                v_time: v_date + ' ' + v_time,
            };
            $("#processing-modal").modal("show");
            ExecuteServiceSyns(config, para);
        }
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
            var tr = "<tr id='" + value.code + "_" + value.maduan + "'><td>" + (idx + 1) + "</td>"
                    + "<td>" + value.tendanhmuc + "</td>"
                    + "<td class='text-right'>" + nvl(value.codulieu) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tongso) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tyle) + "</td>"
                    + "<td class='text-right'>" + nvl(value.codulieuhomqua) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tongsohomqua) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tylehomqua) + "</td>"
                    + "<td class='text-right'>" + nvl(value.tanggiam) + "</td>"
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