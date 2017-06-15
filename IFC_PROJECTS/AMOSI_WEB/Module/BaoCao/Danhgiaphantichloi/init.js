var manggiatri = [];
var countpage = 1000;
$(document).ready(function () {
    try {
        setTitle("Báo cáo đánh giá phân tích lỗi");
        LoadComboDonvi();
        $("#btn_laydulieu").click(function () {
            laydulieu(1);
        });

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
        if (item == '' || item == null || item == undefined) {
            messInfo("messinfo_ttddxl", "Không có dữ liệu hiển thị", "error");
            return;
        }
        var code = item.value.split("_")[1];
        var maduan = item.value.split("_")[0];
        
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAOHETHONG.DANHGIAPHANTICHLOI", callback: "result_laydulieu" };
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
            $("#processing-modal").modal("hide");
            clearnull_ttddxl();
            return;
        }
        clearnull_ttddxl();
        manggiatri = lst;
        $("#messinfo_ttddxl").hide();
        var uniqueNames = [];
        var loaisukien = [];
        var datatable = [];
        var _data = [];
        //var oObject = {};
        //return o;
        $.each(data, function (i, el) {
            if ($.inArray(el.maduan, uniqueNames) === -1) {
                uniqueNames.push(el.maduan);
                //oObject[i] = { "Name": el.maduan, "Count": el.tong };
            }
        });
        $.each(data, function (i, el) {
            if ($.inArray(el.loailoi + "," + el.chitietloi + "-" + el.tyle1, datatable) === -1) {
                datatable.push(el.loailoi + "," + el.chitietloi + "-" + el.tyle1);
            }
        });
        $.each(data, function (i, el) {
            if ($.inArray(el.loailoi + "," + el.chitietloi, loaisukien) === -1) {
                loaisukien.push(el.loailoi + "," + el.chitietloi);
            }
        });
        var str = "";
        for (var i = 0; i < loaisukien.length; i++) {
            for (var j = 0; j < datatable.length; j++) {
                if (datatable[j].split('-')[0] == loaisukien[i]) {
                    str = datatable[i].split('-')[0] + "," + datatable[i].split('-')[1] + "," + datatable[j].split('-')[1];
                } else {
                    str = datatable[i].split('-')[0] + "," + datatable[i].split('-')[1] + "," + 0 + "," + "0%";
                }
                if ($.inArray(str, _data) === -1) {
                    _data.push(str);
                }
                str = "";
            }
        }
        var col = drawTable(uniqueNames);
        $.makeTable = function (data) {
            var table = $('<table class="table table-responsive table-bordered" id="table_upketquaxuly">');
            var rowth = "<thead>" +
                    "<tr>" +
                        "<th rowspan='3'>STT</th>" +
                        "<th rowspan='3'>Loại sự kiện</th>" +
                        "<th rowspan='3'>Sự kiện</th>" +
                    col;
            rowth += "</thead>";
            $(rowth).appendTo(table);
            
            $.each(datatable, function (index, value) {
                var row = "<tr>";
                value = (index + 1) + "," + value;
                var item = value.replace("-", ",").split(",");
                $.each(item, function (key, val) {
                    row += "<td>" + setnull(val) + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data);
        $(table).appendTo("#table_upketquaxuly");

        $("#processing-modal").modal("hide");
        LoadPhanTrang("pageLst_ttddxl", "pageCurent_ttddxl", data, function () {
            timkiem($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }

}
function arrayMax(arr) {
    return arr.reduce(function (p, v) {
        return (p.length > v.length ? p : v);
    });
}

function arrayMin(arr) {
    return arr.reduce(function (p, v) {
        return (p.length < v.length ? p : v);
    });
}

function clearnull_ttddxl() {
    try {
        $("#table_upketquaxuly").empty();
        $("#pageCurent_ttddxl").empty();
        $("#pageLst_ttddxl").empty();
    } catch (e) {
        console.log(e);
    }
}

function drawTable(arrCol) {
    var arr = arrayMax(arrCol).split(",");
    var arrData = [];
    $.each(arr, function (i, el) {
        if ($.inArray(el, arrData) === -1) {
            arrData.push(el);
        }
    });
    var result = "";
    var _str1 = "", _str2 = "", _str3 = "";
    for (var i = 0; i < arrData.length; i++) {
        var item = arrData[i].split('-');
        _str1 += "<th rowspan='1' colspan='2'>" + item[0] + "</th>";
        _str2 += "<th>Tổng điểm đo cần đi xử lý</th>" +
                    "<th>" + item[1] + "</th>";
        _str3 += "<th>Số điểm đo</th>" +
                        "<th>Tỷ lệ</th>";;
    }
    result += _str1+"</tr>" +
                    "<tr>" + _str2 + "<tr>" + _str3 + "</tr>";
    return result;
}