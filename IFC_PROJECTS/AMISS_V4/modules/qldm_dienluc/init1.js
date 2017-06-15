$(document).ready(function () {
    showhideTree();
    initformelement();
    f_GetData_Combo_DL();
    // chỉ cho nhập số vào mã điểm đo
    $("#txtCoutNumber").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#btnloc1').click(function () {
        var item = $('#jqxDropDL_qldm_1').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        f_getListDiemdo(id, 'f_result_ListDD1');
    });

    $('#btnMove1').click(function () {
        var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        if (id == undefined) {
            showToast('Vui lòng chọn thư mục đich', 'error');
            return;
        }
        var item1 = $('#jqxDropDL_qldm_1').jqxTree('getSelectedItem');
        var id1 = $(item1).attr('id')

        if (id == id1) {
            showToast('Vui lòng chọn 2 thư mục khác nhau để chuyển điểm đo', 'error');
            return;
        }

        var list_id = "";
        $('#tbl_dsdiemdo_nhan > tbody  > tr').each(function () {
            list_id += $(this).attr('id') + ',';
        });

        $('#tbl_dsdiemdo > tbody  > tr').each(function () {
            var ischeck = $(this).attr('checked');
            var id = $(this).attr('id')
            if (ischeck == 'checked' && list_id.indexOf(id) == -1) {
                $(this).css('background-color', '#fff');
                $('#tbl_dsdiemdo_nhan tbody').append($($(this)).clone().wrap('<tr>').parent().html());
                //$(this).css('background-color', '#d08c8c');
                $(this).remove();
            }
        });
        $("#tbl_dsdiemdo_nhan tr").click(function () {
            if (!$(this).attr('checked')) {
                $(this).addClass("selected");
                $(this).attr('checked', 'true');
            }
            else {
                $(this).removeClass("selected");
                $(this).removeAttr('checked');
            }
        });
    });
    $('#btnMoveAll').click(function () {
        var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        if (id == undefined) {
            showToast('Vui lòng chọn thư mục đich', 'error');
            return;
        }
        var list_id = "";
        $('#tbl_dsdiemdo_nhan > tbody  > tr').each(function () {
            list_id += $(this).attr('id') + ',';
        });

        $('#tbl_dsdiemdo > tbody  > tr').each(function () {
            var id = $(this).attr('id')
            if (list_id.indexOf(id) == -1) {
                //$(this).css('background-color', '#59f1ab');
                $('#tbl_dsdiemdo_nhan tbody').append($($(this)).clone().wrap('<tr>').parent().html());
                //$(this).css('background-color', '#d08c8c');
                $(this).remove();
            }
        });
    });
    $('#btnThemmoi').click(function () {
        var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        if (id == undefined) {
            showToast('Vui lòng chọn thư mục chứa thư mục mới', 'error');
            return;
        }
        $('#tbl_dsdiemdo_nhan tbody').html('');
        $('#txtNameFolder').val('');
        $('#txtDes').val('');
        $('#txtCoutNumber').val('');
        $('#CboLoaidanhmuc').val(-1);

        $('#divThemmoi').show();
        $('#btnCreate').show();
        $('#btnEdit').hide();
    });

    $('#btnXoa').click(function () {
        var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        if (id == undefined) {
            showToast('Vui lòng chọn thư mục muốn xóa', 'error');
            return;
        }
        f_confimYesNo('<p>Xóa thư mục này ?</p>', "Hủy", "Đồng ý", f_btnXoa)
    });
    $('#btnSua').click(function () {
        var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        if (id == undefined) {
            showToast('Vui lòng chọn thư mục cần sửa', 'error');
            return;
        }
        $('#txtNameFolder').val(name);
        $('#txtDes').val(ghichu);
        $('#CboLoaidanhmuc').val(loaithumuc);
        $('#txtCoutNumber').val(sodiemdo);

        $('#divThemmoi').show();
        $('#btnCreate').hide();
        $('#btnEdit').show();
    });
    $('#btnCreate').click(function () {
        var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        var code = id;
        var name = $('#txtNameFolder').val();
        var des = $('#txtDes').val();
        var count = $('#txtCoutNumber').val();
        var loaithumuc = $('#CboLoaidanhmuc').val();
        if (isNumber(count) == false) {
            showToast('Số điểm đo chỉ được nhập số', 'error');
            return;
        }
        f_themoithumuc(code, name, des, count, loaithumuc);
    });
    $('#btnEdit').click(function () {
        f_confimYesNo('<p>Lưu thay đổi ?</p>', "Hủy", "Đồng ý", f_btnSua)
    });



});
var name = "";
var ghichu = "";
var loaithumuc = "";
var sodiemdo = "";

function f_btnSua() {
    var listmeter = "";
    $('#tbl_dsdiemdo_nhan > tbody  > tr').each(function () {
        listmeter += $(this).attr('id') + '-' + $(this).index() + ',';
    });
    var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
    var id = $(item).attr('id')
    var code = id;
    var name = $('#txtNameFolder').val();
    var des = $('#txtDes').val();
    var count = $('#txtCoutNumber').val();
    var loaithumuc = $('#CboLoaidanhmuc').val();
    f_suathumuc(code, name, des, count, listmeter, loaithumuc);
}


function f_btnXoa() {
    var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
    var id = $(item).attr('id')
    if (id == undefined) {
        showToast('Vui lòng chọn thư mục cần xóa', 'error');
        return;
    }
    var list_id = "";
    $('#tbl_dsdiemdo_nhan > tbody  > tr').each(function () {
        list_id += $(this).attr('id') + ',';
    });


    var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetParentNodeAllTreedm" };
    var para = {
        v_Code: id,
        v_TypeTree: "01"
    };
    ExecuteServiceSyns(config, para);

    if (list_id != "") {
        showToast('Thư mục này vẫn còn điểm đo <br> vui lòng chuyển điểm đo ra thư mục khác trước khi xóa', 'error');
        return;
    }
    var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
    var id = $(item).attr('id')
    var code = id;
    var name = $('#txtNameFolder').val();
    var des = $('#txtDes').val();
    var count = $('#txtCoutNumber').val();
    var loaithumuc = $('#CboLoaidanhmuc').val();

    f_xoathumuc(code, name, des, count, loaithumuc)
}

function f_GetData_Combo_DL() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetParentNodeAllTreedm" };
        var para = {
            v_Code: "01",
            v_TypeTree: "01"
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_themoithumuc(code, name, des, count, loaithumuc) {
    try {
        var v_Code = code;
        var v_Name = name;
        var v_Description = des;
        var v_CountMeter = count;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Action = 'CREATE';
        var v_ListMeterId = '';
        var v_loaithumuc = loaithumuc;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.Create_Update_Delete_Province", callback: "f_result_Create_Province" };
        var para = {
            v_Code: v_Code,
            v_Name: v_Name,
            v_Description: v_Description,
            v_CountMeter: v_CountMeter,
            v_UserId: v_UserId,
            v_Action: v_Action,
            v_ListMeterId: v_ListMeterId,
            v_loaithumuc: v_loaithumuc
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_suathumuc(code, name, des, count, listmeter, loaithumuc) {
    try {
        var v_Code = code;
        var v_Name = name;
        var v_Description = des;
        var v_CountMeter = count;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Action = 'UPDATE';
        var v_ListMeterId = listmeter;
        var v_loaithumuc = loaithumuc;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.Create_Update_Delete_Province", callback: "f_result_Update_Province" };
        var para = {
            v_Code: v_Code,
            v_Name: v_Name,
            v_Description: v_Description,
            v_CountMeter: v_CountMeter,
            v_UserId: v_UserId,
            v_Action: v_Action,
            v_ListMeterId: v_ListMeterId,
            v_loaithumuc: v_loaithumuc
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_xoathumuc(code, name, des, count, loaithumuc) {
    try {
        var v_Code = code;
        var v_Name = name;
        var v_Description = des;
        var v_CountMeter = count;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Action = 'DELETE';
        var v_ListMeterId = '';
        var v_loaithumuc = loaithumuc;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.Create_Update_Delete_Province", callback: "f_result_Delete_Province" };
        var para = {
            v_Code: v_Code,
            v_Name: v_Name,
            v_Description: v_Description,
            v_CountMeter: v_CountMeter,
            v_UserId: v_UserId,
            v_Action: v_Action,
            v_ListMeterId: v_ListMeterId,
            v_loaithumuc: v_loaithumuc
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_Create_Province(config, para, lst) {
  //  console.log('-----------');
  //  console.log(lst);
    if (lst.data[0].kq0[0]['result'] > 0) {
        showToast('Thêm mới thư mục thành công', 'success');
        f_GetData_Combo_DL();
    }
    else {
        showToast('Thêm mới thư mục không thành công', 'error');
    }
}


function f_result_Update_Province(config, para, lst) {
  //  console.log('-----------');
  //  console.log(lst);
    if (lst.data[0].kq0[0]['result'] > 0) {
        showToast('Cập nhật thư mục thành công', 'success');
        f_GetData_Combo_DL();
        var item = $('#jqxDropDL_qldm_1').jqxTree('getSelectedItem');
        var id = $(item).attr('id')
        f_getListDiemdo(id, 'f_result_ListDD1');
    }
    else {
        showToast('Cập nhật thư mục không thành công', 'error');
    }
}

function f_result_Delete_Province(config, para, lst) {
    console.log('-----------');
    console.log(lst);
    if (lst.data[0].kq0[0]['result'] > 0) {
        showToast('Xóa thư mục thành công', 'success');
        f_GetData_Combo_DL();
        var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;"></div>';
        $("#dropDownButton2").jqxDropDownButton('setContent', "");
    
    }
    else {
        showToast('Xóa thư mục không thành công', 'error');
    }
}

function f_result_GetParentNodeAllTreedm(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
       // console.log(lst);
        //console.log(data);
        if (data != null) {
            $("#dropDownButton1").jqxDropDownButton({
                width: '100px',
                height: '100px'
            });
            $("#dropDownButton2").jqxDropDownButton({
                width: '100px',
                height: '100px'
            });
            $('#jqxDropDL_qldm_1').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxDropDL_qldm_1').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                $("#dropDownButton1").jqxDropDownButton('setContent', dropDownContent);
                $('#dropDownButton1').jqxDropDownButton('close');
            });
            $('#jqxDropDL_qldm_2').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxDropDL_qldm_2').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                $("#dropDownButton2").jqxDropDownButton('setContent', dropDownContent);
                $('#dropDownButton2').jqxDropDownButton('close');
                var item = $('#jqxDropDL_qldm_2').jqxTree('getSelectedItem');
                var id = $(item).attr('id');
                f_getListDiemdo(id, 'f_result_ListDD2');
                f_loadinfo_dm(id, 'f_result_GetInfoAllTree');
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.code
                }
                dt.push(item);

            });
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
            $('#jqxDropDL_qldm_1').jqxTree({ source: records, width: '528px', height: '200px', });
            //$('#jqxDropDL_qldm_1').jqxTree('selectItem', $("#01")[0]);
            $('#jqxDropDL_qldm_2').jqxTree({ source: records, width: '528px', height: '200px', });
            //$('#jqxDropDL_qldm_2').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_loadinfo_dm(Value, callback) {
    try {
        var v_TypeTree = 1;
        var v_Code = Value;

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetInfoAllTree", callback: callback };
        var para = {
            v_TypeTree: v_TypeTree,
            v_Code: v_Code,
        };
        callLoad();
        //console.log(para);
        ExecuteServiceSyns(config, para);
    }
    catch (e) {
        console.log(e.message);
    }
}


function f_result_GetInfoAllTree(config, para, lst) {
    name = "";
    ghichu = "";
    loaithumuc = "";
    sodiemdo = "";
    if (lst.data.length > 0) {
        name = lst.data[0].name;
        ghichu = lst.data[0].description;
        loaithumuc = lst.data[0].loaithumuc;
        sodiemdo = lst.data[0].countmeter;

        $('#txtNameFolder').val(name);
        $('#txtDes').val(ghichu);
        $('#CboLoaidanhmuc').val(loaithumuc);
        $('#txtCoutNumber').val(sodiemdo);
    }
}

function f_getListDiemdo(Value, callback) {
    try {
        var v_Type = 1;
        var v_Value = Value;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Permission = 1;
        var v_KeyWord = $('#dm_search').val();
        var v_DienAp = '';
        var v_TypeOutPut = '';
        var v_MonthFrom = '';
        var v_MonthTo = '';
        var v_OutPutFrom = '';
        var v_OutPutTo = '';
        var v_TypeExist = 1;
        var v_Exist = 1;

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetListDiemDo", callback: callback };
        var para = {
            v_Type: v_Type,
            v_Value: v_Value,
            v_UserId: v_UserId,
            v_Permission: v_Permission,
            v_KeyWord: v_KeyWord,
            v_DienAp: v_DienAp,
            v_TypeOutPut: v_TypeOutPut,
            v_MonthFrom: v_MonthFrom,
            v_MonthTo: v_MonthTo,
            v_OutPutFrom: v_OutPutFrom,
            v_OutPutTo: v_OutPutTo,
            v_TypeExist: v_TypeExist,
            v_Exist: v_Exist,
        };
        callLoad();
        console.log(para);
        ExecuteServiceSyns(config, para);

    }
    catch (e) {
        console.log(e.message);
    }
}

function f_result_ListDD1(config, para, lst) {
    try {
        console.log("điểm đo");
        console.log(lst);
      //  console.log(lst.data)
        stopLoad();
        if (lst.data.length == 0) {
            $('#count1').html('Thư mục không chứa điểm đo trực tiếp');
            $('#tbl_dsdiemdo tbody').html('');
            return;
        }

        $('#tbl_dsdiemdo tbody').html('');
        $('#count1').html('Tìm thấy ' + lst.data.length + ' điểm đo');
        $.each(lst.data, function (idx, item) {
            var tr = "<tr  class='click_row' id='" + item.meterid + "'>"
               + "<td>" + item.meterid + "</td>"
               + "<td class='a_c'>" + item.tendiemdo + "</td>"
               + "<td class='a_c'>" + item.socongto + "</td>"
               + "<td class='a_c'>" + item.makhachhang + "</td>"
               + "<td class='a_c'>" + item.madiemdo + "</td>"
               + "<td class='a_c'>" + item.imei + "</td>"
               + "</tr>";
            $('#tbl_dsdiemdo tbody').append(tr);
        });
        $("#tbl_dsdiemdo tr").click(function () {
            if (!$(this).attr('checked')) {
                $(this).addClass("selected");
                $(this).attr('checked', 'true');
            }
            else {
                $(this).removeClass("selected");
                $(this).removeAttr('checked');
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_result_ListDD2(config, para, lst) {
    try {
       // console.log(lst);
       // console.log(lst.data)
        stopLoad();
        if (lst.data.length == 0) {
            $('#tbl_dsdiemdo_nhan tbody').html('');
            $('#count2').html('Thư mục không chứa điểm đo trực tiếp');
            return;
        }
        $('#tbl_dsdiemdo_nhan tbody').html('');
        $('#count2').html('Tìm thấy ' + lst.data.length + ' điểm đo');
        $.each(lst.data, function (idx, item) {
            var tr = "<tr class='click_row' id='" + item.meterid + "'>"
               + "<td>" + item.meterid + "</td>"
               + "<td class='a_c'>" + item.tendiemdo + "</td>"
               + "<td class='a_c'>" + item.socongto + "</td>"
               + "<td class='a_c'>" + item.makhachhang + "</td>"
               + "<td class='a_c'>" + item.madiemdo + "</td>"
               + "<td class='a_c'>" + item.imei + "</td>"
               + "</tr>";
            $('#tbl_dsdiemdo_nhan tbody').append(tr);
        });
        $("#tbl_dsdiemdo_nhan tr").click(function () {
            if (!$(this).attr('checked')) {
                $(this).addClass("selected");
                $(this).attr('checked', 'true');
            }
            else {
                $(this).removeClass("selected");
                $(this).removeAttr('checked');
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }

}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }