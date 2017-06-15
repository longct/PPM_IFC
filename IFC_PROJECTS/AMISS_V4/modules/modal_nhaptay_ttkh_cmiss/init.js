$(document).ready(function () {
    selectlang();
    initformelement();
    loadContent();
    f_GetData_ComboDL_ntkh();
    $("#btnsave_nkhcmis").on("click", function () {
        try {
            var check = checknull();
            if (check != "") {
                showToast(check, "error");
                return;
            }
            save_nkhcmiss();
        } catch (e) {
            console.log(e);
        }
    });
});
function checknull() {
    try {
        var p = getAllIdMod();
        if (p.txtmakh_nkhcmis == "") return "Vui lòng nhập mã khách hàng";
        if (p.txtmadiemdo_nkhcmis == "") return "Vui lòng nhập mã điểm đo";
        if (p.txtsocongto == "") return "Vui lòng nhập số công tơ";
        if (p.txtimei_nkhcmis == "") return "Vui lòng nhập imei";
        if (p.txttenkh_nkhcmis == "") return "Vui lòng nhập tên khách hàng";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function save_nkhcmiss() {
    try {
        var p = getAllIdMod();
        var v_code = $('#jqxDropDL_nhapkh').jqxTree('getSelectedItem');//.attr('id')
        var v_maquyen= $("#txtmadiemdo_nkhcmis").attr("data-maq");
        var v_matram=  $("#txtmadiemdo_nkhcmis").attr("data-matram");
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var v_madvql = $("#hddonviquanly_nkhcmis").val();
        var v_soho = $("#hdsoho_nkhcmis").val();
        var v_mann = $("#hdmann_nkhcmis").val();
        var v_hdmanvgcs = $("#hdmanvgcs_nkhcmis").val();
        var v_chuoigia = $("#hdchuoigia_nkhcmis").val();
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_NHAPKHTUCMISS.INSERT_DIEMDO", callback: "f_result_insert_diemdo" };
        var para = {
            v_MA_KHANG:set_null(p.txtmakh_nkhcmis),
            v_MA_DDO:set_null(p.txtmadiemdo_nkhcmis),
            v_MA_DVIQLY: v_madvql,
            v_CODE: v_code != null ? v_code.id : $("#hdcode").val(),
            v_MA_QUYEN:set_null(v_maquyen),
            v_MA_TRAM:set_null(v_matram),
            v_TEN_KHANG:set_null(p.txttenkh_nkhcmis),
            v_DIA_CHI:set_null(p.txtdiachi_nkhcmis),
            v_MA_CTO:set_null(p.txtmacongto_nkhcmis),
            v_SERY_CTO:set_null(p.txtsocongto_nkhcmis),
            v_USERCODE:set_null(userinfo.usercode),
            v_MA_COT:set_null(p.txtmacot_nkhcmis),
            v_SO_HO: v_soho,
            v_MA_NN: v_mann,
            v_MA_NVGCS: v_hdmanvgcs,
            v_CHUOI_GIA: v_chuoigia,
            v_IMEI:set_null(p.txtimei_nkhcmis),
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_insert_diemdo(config, para, lst) {
    var result = lst.data;
   
    if (result[0].kq == '1') {
        clearform_nkhcmis();
        checkDataxml_nkhtcmis();
        $(".row_cnttkh_" + $("#txtmadiemdo_nkhcmis").attr("data-madd")).addClass("row_warning_case1");
        $(".row_cnttkh_" + $("#txtmadiemdo_nkhcmis").attr("data-madd")).removeClass("row_warning_case4");
        $(".cnth_" + $("#txtmadiemdo_nkhcmis").attr("data-madd")).html("Cập nhật thông tin điểm đo");
        if (count_kqtt_nkhtcmis > 0) {
            $(".row_cnttkh_" + $("#txtmadiemdo_nkhcmis").attr("data-madd")).find('td:last').html("Thành công");
        }
        $(".progress-bar-dtt").hide();
        showToast("Thêm mới điểm đo thành công", "success");

    } else if (result[0].kq == '2') {
        showToast("Mã điểm đo này đã tồn tại trên hệ thống", "error");
    } else if (result[0].kq == '3') {
        showToast("Số công tơ này đã tồn tại trên hệ thống", "error");
    }
    else if (result[0].kq == '4') {
        showToast("IMEI này đã tồn tại trên hệ thống", "error");
    }
    else
        showToast("Thêm mới điểm đo thất bại", "error");
}
function clearform_nkhcmis() {
    $("#modal_nhaptay_ttkh_cmiss").modal("hide");
    $("#txtmadiemdo_nkhcmis").val("");
    $("#txtmadiemdo_nkhcmis").attr("data-maq", "");
    $("#txtmadiemdo_nkhcmis").attr("data-matram","");
    $("#txtmakh_nkhcmis").val("");
    $("#txtsocongto_nkhcmis").val("");
    $("#txtmacongto_nkhcmis").val("");
    $("#txttenkh_nkhcmis").val("");
    $("#txtmacot_nkhcmis").val("");
    $("#txtdiachi_nkhcmis").val("");
    $("#txtimei_nkhcmis").val("");
    $("#hdchuoigia_nkhcmis").val("");
    $("#hdsoho_nkhcmis").val("");
    $("#hddonviquanly_nkhcmis").val("");
    $("#hdmann_nkhcmis").val("");
    $("#hdmanvgcs_nkhcmis").val("");
}
function f_GetData_ComboDL_ntkh() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetData_ComboDL_ntkh" };
        var para = {
            v_Code: "01",
            v_TypeTree: "01"
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_GetData_ComboDL_ntkh(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        //console.log(data);
        if (data != null) {
            $("#dropDownButton_nhapkh").jqxDropDownButton({
                width: '100px',
                height: '100px'
            });
            $('#jqxDropDL_nhapkh').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxDropDL_nhapkh').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                $("#dropDownButton_nhapkh").jqxDropDownButton('setContent', dropDownContent);
                $('#dropDownButton_nhapkh').jqxDropDownButton('close');
                var item = $('#jqxDropDL_nhapkh').jqxTree('getSelectedItem');
                var id = $(item).attr('id');
                f_loadchot(id);

            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.code
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
            $('#jqxDropDL_nhapkh').jqxTree({ source: records, width: '305px', height: '200px' });
            $('#jqxDropDL_nhapkh').jqxTree('selectItem', $("#" + $("#hdcode").val())[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_loadchot(id) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THONGTINDIEMDO.GETINFONODECMIS", callback: "f_result_GETINFONODECMIS" };
        var para = {
            v_Value: id,
            v_TypeNode: 1
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_GETINFONODECMIS(config, para, lst) {
    try {

    } catch (e) {
        console.log(e);
    }
}
function set_null(val) {
    try {
        if (val == "" || val == null || val == "null") {
            return ""
        }
        return val;
    } catch (e) {
        console.log(e);
    }
}