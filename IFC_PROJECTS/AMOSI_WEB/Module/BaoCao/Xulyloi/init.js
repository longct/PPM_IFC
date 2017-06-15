var manggiatri = [];
var countpage = 1000;
$(document).ready(function () {
    try {
        //loadDoiSoat(1);
        setTitle("Báo cáo xử lý lỗi");
        $("#btn_laydulieu").click(function () {
            laydulieu(1)
        });
        $('#btnExcel').click(function () {
            try {
                XuatExcel_ttdd();
            } catch (e) {
                console.log(e);
            }
        });
        LoadComboDonvi();
    } catch (e) {
        console.log(e);
    }
});

//function LoadDonVi() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "PKG_BAOCAOHETHONG.LoadDonVi", callback: "result_loaddonvi", connstr: "Oracle_AmosiDefault" };
//        var para = {};
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function result_loaddonvi(config, para, lst) {
//    try {
//        var data = lst.data;
//        dataToCob("cb_donvi", data, "code", "tendanhmuc", "-1", "--Chọn đơn vị--");
//    } catch (e) {
//        console.log(e);
//    }
//}

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
    var code = item.value.split("_")[1];
    var maduan = item.value.split("_")[0];
    //Loadtoado(maduan);
}

function laydulieu(page) {
    try {
        var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
        var code = item.value.split("_")[1];
        var maduan = item.value.split("_")[0];
        //var p = getAllIdMod();
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAOHETHONG.XULYLOI", callback: "result_laydulieu" };
        var para = {
            v_maduan: maduan
            //v_pagenum: page,
            //v_numrecs: countpage,
        };
        if (config.connstr == '' || config.connstr == null || config.connstr == undefined) return;
        $("#processing-modal").modal("show");
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_laydulieu(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttddxl", "Không có dữ liệu hiển thị", "error");
            clearnull_ttddxl();
            return;
        }
        clearnull_ttddxl();

        manggiatri = lst;

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.maduan + "</td><td>"
                + val.pha3_t + "</td><td>"
                + val.pha1_t + "</td><td colspan='2'>"
                + val.tongnghiemthu + "</td><td>"
                + val.pha3_l + "</td><td>"
                + val.pha1_l + "</td><td>"
                + val.pha3_tc + "</td><td>"
                + val.pha1_tc + "</td><td>"
                + formattyle(val.tyle3) + "</td><td>"
                + formattyle(val.tyle1) + "</td>";
                //+ val.congtydienluc + "</td><td>"
                //+ val.trangthai + "</td></tr>";

            $("#table_ttddxl").append(row);
        });
        $("#processing-modal").modal("hide");
        LoadPhanTrang("pageLst_ttddxl", "pageCurent_ttddxl", data, function () { 
            timkiem($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }

}
function clearnull_ttddxl() {
    try {
        $("#table_ttddxl").empty();
        $("#pageCurent_ttddxl").empty();
        $("#pageLst_ttddxl").empty();
    } catch (e) {
        console.log(e);
    }
}

function XuatExcel_ttdd() {
    try {
        //var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namefile: "Tinh-hinh-loi-da-xu-ly_" + gettimenow().replace("/", "-"),
            connstr: "Oracle_AmosiDefault",
            userid: "123"
        };
        //var para = JSON.parse(localStorage.getItem("data_bckhotong_chitiet"));
        //var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var dt = '{ "data": ' + JSON.stringify(manggiatri) + ' }';
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "maduan", name: "Đơn vị", type: "Text" },
               { field: "pha3_t", name: "Tổng điểm đo - 3 pha GPRS", type: "Text" },
               { field: "pha1_t", name: "Tổng điểm đo - RF/PLC", type: "Text" },
               { field: "tongnghiemthu", name: "Tổng nghiệm thu", type: "Text" },
                { field: "pha3_l", name: "Tổng điểm đo cần xử lý - 3 pha GPRS", type: "Text" },
                { field: "pha1_l", name: "Tổng điểm đo cần xử lý - RF/PLC", type: "Text" },
               { field: "pha3_tc", name: "Tổng điểm đo đã xử lý - 3 pha GPRS", type: "Text" },
               { field: "pha1_tc", name: "Tổng điểm đo đã xử lý - RF/PLC", type: "Text" },
               { field: "tyle3", name: "Tỷ lệ - 3 pha GPRS", type: "Text" },
               { field: "tyle1", name: "Tỷ lệ - RF/PLC", type: "Text" }
            ]
        };
        
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }
}

function formattyle(value) {
    if (value.indexOf('.') == 0) {
        value = '0' + value;
    }
    return value;
}