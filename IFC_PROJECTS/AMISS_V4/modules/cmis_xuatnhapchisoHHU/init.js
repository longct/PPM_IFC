$(document).ready(function () {
    try {
        showhideTree()
        selectlang();
        f_GetData_ComboDL();
        loadContent();
        $('#cmis_input').change(function () {
            uploadFile();
        });

        $("input[name=usingfile]").change(function () {
            var type = $(this).val();
            if (type == "xml") {
                $("#cmis_input").attr('accept', '.xml');
            } else {
                $("#cmis_input").attr('accept', '.xls,.xlsx');
            }
        });
    } catch (e) {
        console.log(e);
    }

});

function uploadFile() {
    try {
        var p = getAllIdMod();
        var fdata = new FormData();
        var files = $('#cmis_input')[0].files[0];
        fdata.append("file", files);
        var config = { callback: "f_resultImportXML", namefile: files.name };
        f_importFileXml(config, fdata);
    } catch (e) {
        console.log(e);
    }
}


function f_resultImportXML(config, para, lst) {
    try {
        var data = lst.data[0];
        ////console.log(data.kq0);
        if (data.kq0.length == 0) {
            showToast('Không tìm thấy bản ghi nào, vui lòng kiểm tra file CMIS', 'error');
            return;
        }
        $.each(data.kq0, function (inx, item) {
            var tr = "";
            tr = "<tr>"
            + "<td>" + item.MA_KHANG + "</td>"
            + "<td>" + item.MA_DDO + "</td>"
            + "<td>" + item.SERY_CTO + "</td>"
            + "<td>" + item.MA_QUYEN + "</td>"
            + "<td>" + item.MA_TRAM + "</td>"
            + "<td>" + item.TEN_KHANG + "</td>"
            + "<td>" + item.MA_COT + "</td>"
            + "<td></td>"
            + "<td></td>"
            + "</tr>";
            $("#tbl_cmiss_nhapkh tbody").append(tr);
        })
    }
    catch (e) {
        //console.log(e.message);
    }
}

function f_GetData_ComboDL() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetParentNodeAllTree" };
        var para = {
            v_Code: "01",
            v_TypeTree: "01"
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_GetParentNodeAllTree(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        ////console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '100px'
            });
            $('#jqxDropDL_home').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
                $('#dropDownButton').jqxDropDownButton('close');
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.code
                }
                ////console.log(item);
                dt.push(item);

            });
            ////console.log(dt);
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
            $('#jqxDropDL_home').jqxTree({ source: records, width: '305px', height: '200px', });
            $('#jqxDropDL_home').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        //console.log(e.message);
    }

}