var phantu;
var chungloai;
var sct_old;
var chukichotdl;
var cs_thao;
var heso_ti;
var heso_tu = 0;
var heso_nhan;
var heso_ti_v;
var heso_tu_v;
var flag = 0;
$(document).ready(function () {
    try {
            showhideTree();
            selectlang();
            initformelement();
           if (localStorage.getItem("tree_node")) {
               $(".panel-tsvh").show();
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto == "0" ) {
                $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho Sổ ghi hoặc Đơn vị");
                $(".ttct_info").slideUp();
                $("#tbl_ttct_data").slideUp();
                $(".tool-bar").empty();
                return;
            }
           } else {
               $("#mesMain").html("<i class='icon fa fa-ban'></i>Vui lòng chọn điểm đo");
               $(".panel-tsvh").hide();
               return;
           }
        get_TTCT();
        $("#ttct_edit").click(function () {
            
            disable_element();
            if (flag == 0)
                update_TTCT(phantu, chungloai, sct_old, chukichotdl, cs_thao, heso_ti, heso_tu, heso_nhan, heso_tu_v, heso_ti_v);
            else
                update_ThayCongto(phantu, chungloai, sct_old, chukichotdl, cs_thao, heso_ti, heso_tu, heso_nhan, heso_tu_v, heso_ti_v);
        });
        $("#btn_thaycongto").click(function () {
            $("#btn_thaycongto").hide();
            $("#ttct_sct").removeAttr("disabled");
            $("#ttct_ngaytreo").val(gettimenow());
            flag = 1;
        });
        $("#btn_huybo").click(function () {
            get_TTCT();
            flag = 0;
            disable_element();
            $("#ttct_edit").attr("disabled", "disabled");
            $("#btn_thaycongto").show();
            $("#ttct_sct").attr("disabled", "disabled");
        });
        $(".hsnttct").change(function () {
            
            var tu = getValueInt($("#ttct_tu").val());
            var ti = getValueInt($("#ttct_ti").val());
            $("#ttct_kp").val(ti*tu);
        });
    } catch (e) {
        console.log(e.message);
    }
});

function getValueInt(value) {
    
    var result = value;
    if (value.indexOf('/') != -1) {
        var i_v = value.split('/');
        if (i_v.length == 2) {
            result = parseInt(i_v[0] / i_v[1]);
        }
    }
    return parseInt(result);
}

function enable_element(opts) {
    var div = $("#tabct_info td");
    $(div).find('input:text, select, textarea,input:checkbox').each(function () {
        $(this).removeAttr('disabled');
        $("#btn_thaycongto").removeAttr('disabled');
        $('#ttct_edit').removeAttr('disabled');
    });
    $("#ttct_sct").attr("disabled", "disabled");
    $("#ttct_ngaytreo").attr("disabled", "disabled");
    if (opts) {
        $("#ttct_tu").attr("disabled", "disabled");
        $("#ttct_ti").attr("disabled", "disabled");
        $("#ttct_kp").attr("disabled", "disabled");
    }
    initformelement();
}
function disable_element() {
    var div = $("#tabct_info td");
    $(div).find('input:text, select, textarea,input:checkbox').each(function () {
        $(this).attr('disabled', 'disabled');
        $("#btn_thaycongto").attr('disabled', 'disabled');
    });

}

function get_TTCT() {
    try {
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THAYCONGTODIEMDO.GETLISTCONGTOBYID_PRO", callback: "result_Get_TTCT" };
        var para = {
            v_MeterId: meterid
        };
        ExecuteServiceSyns(config, para);
        callLoad();
    } catch (e) {
        console.log(e);
    }
}
function result_Get_TTCT(config, para, lst) {
    try{
        console.log(lst);
        var data = lst.data[0];
        phantu = data.phantu;
        chungloai = data.chungloai;
        sct_old = data.socongto;
       // chukichotdl = data.chukichotdl;
        cs_thao = data.cs_thao;
        heso_ti = data.heso_ti;
        heso_tu = data.heso_tu;
        heso_nhan = data.heso_nhan;
        var tr = "";
        $("#ttct_namsx").val(data.namsx);
        $("#ttct_cstreo").val(data.cs_treo);
        //$("#ttct_tu").val(data.heso_tu);
        //$("#ttct_ti").val(data.heso_ti);
        $("#ttct_tu").val(data.heso_tu_v);
        $("#ttct_ti").val(data.heso_ti_v);
        $("#ttct_kp").val(eval(data.heso_tu * data.heso_ti));
        $("#ttct_sct").val(data.socongto);
        $("#ttct_ngaytreo").val(data.ngaytreo);
        $("#ttct_chungloai option[value='" + data.chungloai + "']").attr("selected", "selected");
        if (data.loaiheso == "0") $("#c3").attr("checked", "checked");
        initformelement();
        var tb = lst.data;
        $.each(tb, function (key, val) {
            //    console.log(key);
           // var ckchot = val.ngaychotct;

            //if (ckchot == null || ckchot == undefined || ckchot == "") ckchot = "Chưa thiết lập";
            //else ckchot = ckchot;

            tr += '<tr class="bt_treothao" data-target="' + val.id_congto + '">' +
                        '<td>' + (key + 1) + '</td>' +
                        '<td>' + setnull(val.socongto) + '</td>' +
                        '<td>' + setnull(val.chungloai) + '</td>' +
                        '<td>' + setnull(val.phantu) + '</td>' +
                        '<td>' + setnull(val.ngaytreo) + '</td>' +
                        '<td>' + setnull(val.ngaythao) + '</td>' +
                        '<td class="a_c">';
            
            if (val.loaiheso == "1") {
                tr += '<input type="checkbox" disabled checked class="flat-red"/>';
            }
            else {
                tr += '<input type="checkbox" disabled  class="flat-red"/>';
            }
            tr += '</td>' +
                    //'<td>' +setnull(val.heso_tu) + '</td>' +
                    //'<td>' + setnull(val.heso_ti) + '</td>' +
                    '<td>' + setnull(val.heso_tu_v) + '</td>' +
                    '<td>' + setnull(val.heso_ti_v) + '</td>' +
                    //'<td class="a_c">' + ckchot + '</td>' +
                    '<td class="a_c">' + val.isthao + '</td>' +
                '</tr>';
        })
        $("#tbl_ttct_data tbody").empty();
        $("#tbl_ttct_data tbody").append(tr);

        $(".bt_treothao").click(function () {
            
            var id = $(this).data("target");
            loadthongtintable_cthay(id);
        });

        initformelement();
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}
function loadthongtintable_cthay(val) {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THAYCONGTODIEMDO.GETCONGTOTREOTHAO", callback: "result_loadthongtintable_cthay" };
        var para = {
            v_meterid: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtintable_cthay(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        setValToTxt('ttct_sct', data[0].socongto);
        setValToTxt('ttct_chungloai', data[0].chungloai);
        setValToTxt('ttct_ngaytreo', data[0].ngaytreo);
        setValToTxt('ttct_namsx', data[0].namsx);
        setValToTxt('ttct_cstreo', data[0].cs_treo);
        //setValToTxt('ttct_tu', data[0].heso_tu);
        //setValToTxt('ttct_ti', data[0].heso_ti);
        setValToTxt('ttct_tu', data[0].heso_tu_v);
        setValToTxt('ttct_ti', data[0].heso_ti_v);
        setValToTxt('ttct_kp', data[0].heso_nhan);
        $("#txt_sudunghesonhan_ct").removeAttr('disabled');
        if (data[0].isheso == "0") {
            $("#txt_sudunghesonhan_ct").prop("checked", false);
        } else {
            $("#txt_sudunghesonhan_ct").prop("checked", true);
        }
        enable_element();
    } catch (e) {
        console.log(e);
    }
}


function update_TTCT(phantu, chungloai, sct_old, chukichotdl, cs_thao, heso_ti, heso_tu, heso_nhan, heso_tu_v, heso_ti_v) {
    try {
        
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var v_Chungloai = $("#ttct_chungloai").val();
        var v_Socongto = $("#ttct_sct").val();
        var v_Cso_treo = $("#ttct_cstreo").val();
        var v_namsx = $("#ttct_namsx").val();
        var v_Ngaytreo = $("#ttct_ngaytreo").val();
        var v_LoaiHeso = 0;
        if ($("#txt_sudunghesonhan_ct").is(':checked')) {
            v_LoaiHeso = 1;
            heso_ti = getValueInt($("#ttct_ti").val());
            heso_tu = getValueInt($("#ttct_tu").val());
            heso_nhan = heso_tu * heso_ti;
            heso_ti_v = $("#ttct_ti").val();
            heso_tu_v = $("#ttct_tu").val();
        }
        if (cs_thao == null) cs_thao = "";
        if (chukichotdl == null) chukichotdl = 0;
        $("#ttct_kp").val(eval(heso_ti * heso_tu));
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THAYCONGTODIEMDO.CapNhatCongTo", callback: "result_update_ttct" };
        var para = {
            v_MeterId: parseInt(meterid),
            v_SctOld: sct_old,
            v_SctNew: v_Socongto,
            v_Phantu: parseInt(phantu),
            v_Chungloai: v_Chungloai,
            v_ChukichotDL: chukichotdl,
            v_Ngaytreo: v_Ngaytreo,
            v_LoaiHeso: v_LoaiHeso,
            v_Heso_TU: parseInt(heso_tu),
            v_Heso_TI: parseInt(heso_ti),
            v_Heso_Nhan: heso_nhan,
            v_namsx: v_namsx,
            v_UserId: 1,
            v_Cso_treo: v_Cso_treo,
            v_Cso_thao: cs_thao,
            v_IP: '',
            v_IPlocal: '',
            v_Heso_TU_v: heso_tu_v,
            v_Heso_TI_v: heso_ti_v,
        };
        if (heso_nhan == 0) {
            showToast("Cập nhật thông tin công tơ thất bại. Hệ số nhân KP không được bằng 0.", "error");
            return;
        }
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_update_ttct(config, para, lst) {
    
    if (lst.result == "OK") {
        showToast("Cập nhật thông tin công tơ thành công", "success");
        get_TTCT();
        flag = 0;
        disable_element();
    } else {
        showToast("Cập nhật thông tin công tơ thất bại", "error");
        get_TTCT();
        flag = 0;
        disable_element();
    }
    $("#ttct_edit").attr("disabled", "disabled");
}
function update_ThayCongto(phantu, chungloai, sct_old, chukichotdl, cs_thao, heso_ti, heso_tu, heso_nhan, heso_tu_v, heso_ti_v) {
    try {
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var v_Chungloai = $("#ttct_chungloai").val();
        var v_Socongto = $("#ttct_sct").val();
        var v_Cso_treo = $("#ttct_cstreo").val();
        var v_namsx = $("#ttct_namsx").val();
        var v_Ngaytreo = $("#ttct_ngaytreo").val();
        var v_LoaiHeso = 0;
        if ($("#txt_sudunghesonhan_ct").is(':checked')) {
            v_LoaiHeso = 1;
            heso_ti = getValueInt($("#ttct_ti").val());
            heso_tu = getValueInt($("#ttct_tu").val());
            heso_nhan = heso_tu * heso_ti;
            heso_ti_v = $("#ttct_ti").val();
            heso_tu_v = $("#ttct_tu").val();
        }
        if (cs_thao == null) cs_thao = "";
        if (chukichotdl == null) chukichotdl = 0;
        $("#ttct_kp").val(eval(heso_ti * heso_tu));
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THAYCONGTODIEMDO.THAYCONGTO", callback: "result_update_thaycongto" };
        var para = {
            v_MeterId: parseInt(meterid),
            v_SctOld: sct_old,
            v_SctNew: v_Socongto,
            v_Phantu: parseInt(phantu),
            v_Chungloai: v_Chungloai,
            v_ChukichotDL: chukichotdl,
            v_Ngaytreo: v_Ngaytreo,
            v_LoaiHeso: v_LoaiHeso,
            v_Heso_TU: parseInt(heso_tu),
            v_Heso_TI: parseInt(heso_ti),
            v_Heso_Nhan: heso_nhan,
            v_namsx: v_namsx,
            v_UserId: 1,
            v_Cso_treo: v_Cso_treo,
            v_Cso_thao: cs_thao,
            v_IP: '',
            v_IPlocal: '',
            v_Heso_TU_v: heso_tu_v,
            v_Heso_TI_v: heso_ti_v
        };
        console.log(para);
        if (heso_nhan == 0) {
            showToast("Cập nhật thông tin công tơ thất bại. Hệ số nhân KP không được bằng 0.", "error");
            return;
        }
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_update_thaycongto(config, para, lst) {
    if (lst.result == "OK") {
        var result = lst.data[0].count;
        if (result.indexOf("thành công"))
            showToast(result, "success");
        else
            showToast(result, "error");
        get_TTCT();
        flag = 0;
        disable_element();
        $("#btn_thaycongto").show();
        $("#ttct_sct").attr("disabled", "disabled");
    } else {
        showToast("Thay công tơ thất bại", "error");
        get_TTCT();
        flag = 0;
        disable_element();
    }
    $("#ttct_edit").attr("disabled", "disabled");
}


function isNumber(evt, opts) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (opts) {
        if (charCode > 31 && (charCode < 48 || charCode > 58) && charCode != 44 && charCode != 47) {
            return false;
        }
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 58) && charCode != 44) {
        return false;
    }
    return true;
}