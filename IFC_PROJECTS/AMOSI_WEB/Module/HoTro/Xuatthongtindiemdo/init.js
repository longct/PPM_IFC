var countpage = 20;
var manggiatri = [];
$(document).ready(function () {
    try {
        setTitle("Xuất thông tin điểm đo");
        loadInitDate();
        LoadComboDonvi();
        LoadDuAn();

        $("#btn_laydulieu").click(function () {
            countpage = 20;
            laydulieu(1);
        });

        $('#btnExcel').click(function () {
            try {
                XuatExcel_ttdd();
            } catch (e) {
                console.log(e);
            }
        });
        //if (manggiatri.length > 0) {
        //    $('#btnXemThem').style.display = "block";
        //    $('#btnXemThem').click(function () {
        //        try {
        //            XuatExcel_ttdd();
        //        } catch (e) {
        //            console.log(e);
        //        }
        //    });
        //}
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
function LoadDuAn() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_BAOCAOHETHONG.LOADDUAN", callback: "result_loadduan", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadduan(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_duan", data, "maduan", "tenduan", "-1", "--Chọn dự án--");
    } catch (e) {
        console.log(e);
    }
}

function laydulieu(page) {
    try {
        var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
        if (item == '' || item == null || item == undefined) {
            messInfo("messinfo_bht", "Không có dữ liệu hiển thị", "error");
            return;
        }
        var code = item.value.split("_")[1];
        var maduan = item.value.split("_")[0];
        var p = getAllIdMod();
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DIEMDO.THONGTINDIEMDO", callback: "result_laydulieu" };
        var para = {
            v_donvi: '',
            v_duan: maduan,
            v_pagenum: page,
            v_numrecs: countpage,
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
            messInfo("messinfo_bht", "Không có dữ liệu hiển thị", "error");
            clearnull_ttddxl();
            return;
        }
        $("#messinfo_bht").hide();
        manggiatri = lst;
        $("#table_ttddxl").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tendiemdo) + "</td><td>"
                + setnull(val.madiemdo) + "</td><td>"
                + setnull(val.socongto) + "</td><td>"
                + setnull(val.maduan) + "</td><td>"
                + setnull(val.macot) + "</td><td>"
                + setnull(val.diachi) + "</td><td>"
                + setnull(val.matram) + "</td></tr>";

            $("#table_ttddxl").append(row);
        });
        $("#processing-modal").modal("hide");
        //LoadPhanTrang("pageLst_ttddxl", "pageCurent_ttddxl", data, function () {
        //    laydulieu($("#pagenumber").val());
        //});

        if (manggiatri.data.length > 0) {
            $('#btnXemThem').css('display', 'block');
            $('#btnXemThem').click(function () {
                try {
                    var page = manggiatri.data.length / 20;
                    page = page + 1;
                    countpage = page * 20;
                    laydulieu(1)
                } catch (e) {
                    console.log(e);
                }
            });
        }

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
            namefile: "Loc-va-xuat-thong-tin-diem-do_" + gettimenow().replace("/","-"),
            connstr: "Oracle_AmosiDefault",
            userid: "123"
        };
        //var para = JSON.parse(localStorage.getItem("data_bckhotong_chitiet"));
        //var dt = '{ "data": ' + JSON.stringify(para) + ' }';
        var dt = '{ "data": ' + JSON.stringify(manggiatri) + ' }';
        var colum = {
            kq: [
               { field: "stt", name: "STT", type: "TextAndBoldCenter" },
               { field: "meterid", name: "meterid", type: "Text" },
               { field: "socongto", name: "Số công tơ", type: "Text" },
               { field: "tendiemdo", name: "Tên điểm đo", type: "Text" },
               { field: "madiemdo", name: "Mã điểm đo", type: "Text" },
                { field: "maduan", name: "Mã dự án", type: "Text" },
                { field: "code", name: "Code", type: "Text" },
               { field: "maquyen", name: "Mã quyển", type: "Text" },
               { field: "matram", name: "Mã trạm", type: "Text" },
               { field: "macot", name: "Mã cột", type: "Text" },
               { field: "repeaterid", name: "repeaterid", type: "Text" },
                { field: "diachi", name: "Địa chỉ", type: "Text" }

            ]
        };
        excuteExcelHaveData(config, JSON.parse(dt), colum, true);
    } catch (e) {
        console.log(e);
    }
}