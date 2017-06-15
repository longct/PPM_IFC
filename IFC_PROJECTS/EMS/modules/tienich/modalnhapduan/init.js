var datasua_qlnda = 0;
var paraTable_DL = [];
var array_tt11 = [];
$(document).ready(function () {
    try {
        loadbamien_qlnda();
        loaddienluc_qlnda("-1");
        $("#btn_saveqlnda").click(function () {
            messInfo("messinfo_suasqlnda", "", "error");
            capnhatnhapduan();
           
        });
        $("#btnthoatqlnda").click(function () {
            datasua_qlnda = 0;
            ClearQLNDA();
            $("#sua_nhapduan").modal("hide");
        });
        $("#cbbanmien_qlnbamien").change(function () {
            loaddienluc_qlnda($("#cbbanmien_qlnbamien").val());
        });
    } catch (e) {
        console.log(e);
    }

});
function loadbamien_qlnda() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_loadbamien_qlnda", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_loadbamien_qlnda(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cbbanmien_qlnbamien", data[1].kq1, "code", "name", "-1", "--Tất cả--");


    } catch (e) {
        console.log(e);
    }
}

function loaddienluc_qlnda(code) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_loaddienluc_qlnda", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDienlucDuAn',
            Code:code
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_loaddienluc_qlnda(config, para,lst) {
    try {
       
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        $("#cbdienluc_qlnbamien").multiselect('destroy');
        dataToCob("cbdienluc_qlnbamien", data, "code", "name", "", "");
        $('#cbdienluc_qlnbamien').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            selectAllJustVisible: false,
            buttonWidth: '300px'
        });
        $('#cbdienluc_qlnbamien').multiselect('select', array_tt11);
    } catch (e) { console.log(e); }
}
function loadthongtin_qlnda(val) {
    try {

        datasua_qlnda = val;
        var config = { namesql: "TB_TienIch_Project_GetData", callback: "f_result_loadthongtin_qlnda", connstr: "ConnectEMS" };
        var para = {
            projectid : val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtin_qlnda(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
       
        var data = lst.data[0].kq0[0];

        if (data == null || data == undefined || data == "[]") return;
  
        $("#cbbanmien_qlnbamien").attr("data_id", data.code)
        loaddienluc_qlnda(data.code)
        $("#txt_maduan_qlnda").val(data.maduan);
        $("#txt_maduangop_qlnda").val(data.maduangop);
        $("#txt_tenduan_qlntda").val(data.projectname);

        var data1 = lst.data[1].kq1;
        if (data1 == null || data1 == undefined || data1 == "[]") return;
      
        $.each(data1, function (key, val) {
            array_tt11.push(val.codedl + "");
        });
        console.log(array_tt11);
      
        $("#cbbanmien_qlnbamien").val($("#cbbanmien_qlnbamien").attr("data_id"));
    } catch (e) {
        console.log(e);
    }
}
function capnhatnhapduan() {
    try {
        var p = getAllIdMod();
        var check = validate_qlnda();
        if (check != "") {
            messInfo("messinfo_suasqlnda", check, "error");
            return;
        }
        var tt = $("#cbdienluc_qlnbamien").val();
        if (tt == null || tt.length == 0) {
            messInfo("messinfo_suasqlnda", "Vui lòng chọn điện lực", "error");
            return;
        }

        $.each(tt, function (key, val) {
            paraTable_DL.push({"CodeDL": val });
        });
        var dt = '{ "table": ' + JSON.stringify(paraTable_DL) + ' }';
        var config = { namesql: "TB_TienIch_Project_Add", callback: "f_tb_tienich_add", connstr: "ConnectEMS" };
        var para = {
            projectId: datasua_qlnda,
            ProjectName: p.txt_tenduan_qlntda,
            MaDuAn: p.txt_maduan_qlnda,
            MaDuAnGop:p.txt_maduangop_qlnda,
            Code:p.cbbanmien_qlnbamien
        };

        ExecuteBulkCopyDatatable_Sql(config, para, JSON.parse(dt));
    } catch (e) {
        console.log(e);
    }
}
function validate_qlnda() {
    var p = getAllIdMod();
    if (p.cbbanmien_qlnbamien == '-1') return "Vui lòng chọn ban miền";
    else if (p.txt_maduan_qlnda == "") return "Vui lòng nhập mã dự án";
    else if (p.txt_tenduan_qlntda == "") return "Vui lòng nhập tên dự án";
    else if (p.txt_maduangop_qlnda=="") return "Vui lòng nhập tên viết tắt dự án"
    return "";
}
function f_tb_tienich_add(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
    
        var row = data[0].result;
        if (row.indexOf("thành công") > 0) {
            loadtable_chitiet_qlnda(1);
            messInfo("messinfo_suasqlnda", row, "ok");
            ClearQLNDA();
            if (datasua_qlnda>0) {
                $("#sua_nhapduan").modal("hide");

            }
            setTimeout(function () {
                messInfo("messinfo_suasqlnda", '', 'ok');
            }, 2000);
          
        } else {
            messInfo("messinfo_suasqlnda", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function ClearQLNDA() {
    paraTable_DL = [];
    array_tt11 = [];
    $("#txt_tenduan_qlntda").val("");
    $("#cbbanmien_qlnbamien").val("-1");
    $("#txt_maduan_qlnda").val("");
    $("#txt_maduangop_qlnda").val("");
    $("#cbdienluc_qlnbamien").multiselect('destroy');
    loaddienluc_qlnda("-1");
}


