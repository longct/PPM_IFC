$(document).ready(function () {
    try {
        setTitle("Thiết lập báo cáo hệ thống");
        LoadComboDonvi();
        Loadgiaiphap();
        load_loailoi();
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            minViewMode: 'days'
        });

        $("#cb_donvi_bcht").change(function () {
            LoadTram();
        });
    } catch (e) {
        console.log(e);
    }

});
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
    if (item.value != 0)
        f_load_TBA(item.value);

}

function f_load_TBA(v_code) {
    try {
        console.log(v_code);
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.Load_DS_TBA", callback: "f_result_Load_DS_TBA" };
        var para = {
            v_Code: v_code.split("_")[1],
            v_maduan: v_code.split("_")[0]
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Load_DS_TBA(config, para, lst) {
    var data = lst.data;
    console.log(lst.data);
    $('#lst_tba tbody').html("");
    $.each(data, function (idx, value) {
        var tr = "<tr id='" + value.code + "_" + value.maduan + "'><td>" + (idx + 1) + "</td>"
                + "<td>" + value.tendanhmuc + "</td>"
                + "<td>" + value.system_type + "</td>"
                + "<td>" + gen_select(select_toiuu, value.toi_uu, "toiuu_" + value.code) + "</td>"
                + "<td>" + '<input type="text" style="width:100px;" class="form-control form-control-inline input-medium txt_tyle" id="tyle_' + value.code + '" value="' + value.tyle_canhbao + '"/>' + "</td>"
                + "<td>" + gen_select(select_giaiphap, value.giaiphap_thunghiem, "giaiphap_" + value.code) + "</td>"
                + "<td>" + '<input type="text" style="width:100px;" class="form-control form-control-inline input-medium datepicker2" id="ngayquakhu_' + value.code + '" value="' + value.ngayquakhu + '"/>' + "</td>"
                + "<td style='display:none'>" + gen_select(select_loailoi, value.loailoi, "loailoi_" + value.code) + "</td>"
                + "<td>" + '<input type="text" style="width:100px;" class="form-control form-control-inline input-medium txt_ghichu" id="ghichu_' + value.code + '" value="' + value.ghichu + '"/>' + "</td>"
                + "<td><button class='btn btn-success btn_luu_cfg' type='button' id='btnluu_" + value.code + "_" + value.maduan + "' disabled>Lưu</button></td>"
        "</td></tr>"
        //console.log(item);
        $('#lst_tba tbody').append(tr);

    });
    $('.datepicker2').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        minViewMode: 'days',
        defaultDate: null,
        forceParse: false,
        autoUpdateInput: false,
        clearBtn: true
    }).on('changeDate', function (e) {
        if ($(this).val() == "") {
            $(this).val("Hôm qua")
        }
        $('#btnluu_' + $(this).parent().parent().attr("id")).prop('disabled', false);
        $('#btnluu_all').prop('disabled', false);
    });

    $('.cbo_giaiphap').change(function () {
        $('#btnluu_' + $(this).parent().parent().attr("id")).prop('disabled', false);
        $('#btnluu_all').prop('disabled', false);
    });
    $('.cbo_toiuu').change(function () {
        $('#btnluu_' + $(this).parent().parent().attr("id")).prop('disabled', false);
        $('#btnluu_all').prop('disabled', false);
    });

    $('.cbo_loailoi').change(function () {
        $('#btnluu_' + $(this).parent().parent().attr("id")).prop('disabled', false);
        $('#btnluu_all').prop('disabled', false);
    });

    $('.txt_tyle').on('input', function () {
        $('#btnluu_' + $(this).parent().parent().attr("id")).prop('disabled', false);
        $('#btnluu_all').prop('disabled', false);
    });
    $('.txt_ghichu').on('input', function () {
        $('#btnluu_' + $(this).parent().parent().attr("id")).prop('disabled', false);
        $('#btnluu_all').prop('disabled', false);
    });
    $('.btn_luu_cfg').click(function () {
        var code = $(this).attr("id").split("_")[1];
        var maduan = $(this).attr("id").split("_")[2];
        var toiuu = $('#toiuu_' + code + ' option:selected').val();
        var tyle = $('#tyle_' + code).val();
        var thunghiem = $('#giaiphap_' + code + ' option:selected').val();
        var ngayquakhu = $('#ngayquakhu_' + code).val();
        var loailoi = $('#loailoi_' + code + ' option:selected').val();
        var ghichu = $('#ghichu_' + code).val();

        f_save_cfg(code, maduan, toiuu, tyle, thunghiem, ngayquakhu, loailoi, ghichu);
    });
    $('#btnluu_all').click(function () {
        $("#processing-modal").modal("show");
        setTimeout(function () {
            $('#lst_tba > tbody  > tr').each(function () {

                var code = $(this).attr("id").split("_")[0];
                var maduan = $(this).attr("id").split("_")[1];
                var toiuu = $('#toiuu_' + code + ' option:selected').val();
                var tyle = $('#tyle_' + code).val();
                var thunghiem = $('#giaiphap_' + code + ' option:selected').val();
                var ngayquakhu = $('#ngayquakhu_' + code).val();
                var loailoi = $('#loailoi_' + code + ' option:selected').val();
                var ghichu = $('#ghichu_' + code).val();

                var changed = $('#btnluu_' + code + '_' + maduan).is(':enabled');

                if (changed) {
                    if (code != 'all')
                        f_save_cfg(code, maduan, toiuu, tyle, thunghiem, ngayquakhu, loailoi, ghichu);
                }
            });

            $("#processing-modal").modal("hide");
            $('.btn_luu_cfg').prop('disabled', true);
        }, 1000);
    });
}
var select_giaiphap = '';
var select_loailoi = '';
var select_toiuu = '<select class="cbo_toiuu form-control form-control-inline input-medium"><option value="">-</option><option value="0">Chờ cấu hình RF</option><option value="1">Đã tối ưu</option></select>';
var date_ng = '<input type="text" style="width:100px;" class="form-control form-control-inline input-medium datepicker" id="dt_ngaysosanh" />';
function Loadgiaiphap() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_DANHMUCLOI.LoadGiaiPhap", callback: "result_loadgiaiphap", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadgiaiphap(config, para, lst) {
    try {
        var data = lst.data;
        select_giaiphap = "<select class='cbo_giaiphap form-control form-control-inline input-medium'><option value=''>-</option>";
        $.each(data, function (idx, value) {
            select_giaiphap += "<option value='" + value.matudien + "'>" + value.tentudien + "</option>";
        });
        select_giaiphap += "</select>";

    } catch (e) {
        console.log(e);
    }
}


function load_loailoi(v_LoaiLoi) {
    try {
        console.log(v_LoaiLoi);
        var p = getAllIdMod();
        var config = { namesql: "PKG_DANHMUCLOI.LoadChiTietLoi", callback: "result_load_chitiet", connstr: "Oracle_AmosiDefault" };
        var para = {
            v_LoaiLoi: -1
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_load_chitiet(config, para, lst) {
    try {
        var data = lst.data;
        select_loailoi = "<select class='cbo_loailoi form-control form-control-inline input-medium'><option value=''>-</option>";
        $.each(data, function (idx, value) {
            select_loailoi += "<option value='" + value.matudien + "'>" + value.tentudien + "</option>";
        });
        select_loailoi += "</select>";

    } catch (e) {
        console.log(e);
    }
}

function gen_select(select, selected_value, id) {
    var html_select = $(select);
    html_select.attr("id", id)
    html_select.find('option[value="' + selected_value + '"]').attr('selected', 'selected');
    return html_select.get(0).outerHTML;
}

function f_save_cfg(code, maduan, toiuu, tyle, thunghiem, ngayquakhu, loailoi, ghichu) {
    var p = getAllIdMod();
    var config = { namesql: "PKG_BAOCAO_HANGNGAY.luu_thietlap", callback: "", connstr: "Oracle_AmosiDefault" };
    var para = {
        v_code: code,
        v_maduan: maduan,
        v_toiuu: toiuu,
        v_tyle: tyle,
        v_thunghiem: thunghiem,
        v_ngayquakhu: ngayquakhu,
        v_loailoi: loailoi,
        v_ghichu: ghichu
    };
    //console.log(para);
    var lst = ExecuteServiceSyns(config, para);
    result_luu_thietlap(config, para, lst);
}

function result_luu_thietlap(config, para, lst) {
    console.log(lst);
    var data = lst.data;
    //console.log(data);
    if (data != null && data[0].result == "ok") {
        messInfo("messinfo", 'Lưu thiêt lập thành công', "ok");
        //f_load_again(para.v_loaitudien);
    }
    else {
        messInfo("messinfo", 'Lưu thiêt lập không thành công :' + data[0].result, "error");
    }
}