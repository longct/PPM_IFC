var makh;
var imei;
var codedm;
var donvinhan;
var donvi;
$(document).ready(function () {
    try {
        showhideTree();
        loadContent();
        var per = localStorage.getItem("per");
        //per 11111 = xem them sua xoa in
        //<button class="btn btn-success _edit" id="ttdd_edit"><i class="fa fa-edit"></i>Chỉnh sửa</button>
        //<button class="btn btn-danger" id="ttdd_thanhly"><i class="fa fa-trash"></i>Thanh lý</button>
        //console.log(per);
        //console.log(per.substring(3, 4));
        if (per.substring(2, 3) == 1) {
            //$("#btn_div").empty();
            $("#btn_div").append('<button class="btn btn-success _edit" id="ttdd_edit"><i class="fa fa-edit"></i>Chỉnh sửa</button>');
        }
        if (per.substring(3, 4) == 1) {
            $("#btn_div").append('<button class="btn btn-danger" id="ttdd_thanhly"><i class="fa fa-trash"></i>Thanh lý</button>');
        }
        
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto == "0") {
                $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho Sổ ghi hoặc Đơn vị");
                $(".ttdd_info").slideUp();
                $(".tools").slideUp();
                $(".tool-bar").empty();
                return;
            }
        }
        get_TTKH();
        $(".tools").css("height", $(".ttdd_info").height() - 20);
        initformelement();
        $("#ttdd_edit").click(function () {
            if ($(this).hasClass("_edit")) {
                enable_element();
                $(this).html('<i class="fa fa-save"></i>Lưu');
                $(this).removeClass("_edit");
            } else {
                disable_element();
                $(this).html('<i class="fa fa-edit"></i>Chỉnh sửa');
                $(this).addClass("_edit");
                update_ttkh(makh, imei, codedm, donvinhan, donvi);
            }
        })
        
        $("#ttdd_thanhly").click(function () {
            f_confimYesNo("Bạn muốn xóa thanh lý điểm đo này ?", "Bỏ qua", "Xác nhận", function () {
                thanhlydiemdo();
            });
        })
    } catch (e) {
        console.log(e.message);
    }
});
function enable_element() {
    var div = $("#tab_info td");
    $(div).find('input:text, select, textarea').each(function () {
        $(this).removeAttr('disabled');
    });
    $("#ttdd_soghi").attr("disabled", "disabled");
    $("#ttkh_ngaylap").attr("disabled", "disabled");
    $("#ttkh_sct").attr("disabled", "disabled");
    $("#ttkh_imei").attr("disabled", "disabled");

}
function disable_element() {
    var div = $("#tab_info td");
    $(div).find('input:text, select, textarea').each(function () {
        $(this).attr('disabled', 'disabled');
    });

}


function get_TTKH() {
    try {
        //console.log("OK");
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THONGTINDIEMDO.GETTHONGTINBYID_PRO", callback: "result_Get_TTKH" };
        var para = {
            v_MeterId: meterid
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
    } catch (e) {
        console.log(e);
    }
}
function result_Get_TTKH(config, para, lst) {
    var data = lst.data[0];
    //console.log(data);
    makh = data.makhachhang;
    imei = data.imei;
    codedm = data.codedm;
    donvinhan = data.donvinhan;
    donvi = data.donvi;
    if (data.thanhly == "1") {
        $("#ttdd_thanhly").attr("disabled", "disabled");
        $("#ttdd_edit").attr("disabled", "disabled");
    }
    $("#ttdd_soghi").val(data.soghi);
    $("#ttkh_madiemdo").val(data.madiemdo);
    $("#ttkh_tenkh").val(data.tendiemdo);
    $("#ttkh_imei").val(data.imei);
    $("#ttkh_sct").val(data.socongto);
    $("#ttkh_stt").val(data.sothutu);
    $("#ttkh_ngaylap").val(data.ngaylap);
    $("#ttkh_diachi").val(data.diachikhachhang);
    $("#ttkh_ghichu").val(data.ghichu);
    $("#ttdd_nsx option[value='" + data.nsx_id + "']").attr("selected", "selected");
    $("#ttdd_congnghe option[value='" + data.cn_id + "']").attr("selected", "selected");
    if (data.iswarning == 1) $("#c3").attr("checked", "checked");
    //if (data.iswarning == 1) $("#c4").attr("checked", "checked");
    initformelement();
    stopLoad();
}


function update_ttkh(makh, imei, codedm, donvinhan, donvi) {
    try {
        //console.log("OK");
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var v_Madiemdo = $("#ttkh_madiemdo").val();
        var v_Socongto = $("#ttkh_sct").val();
        var v_Tendiemdo = $("#ttkh_tenkh").val();
        var v_Diachi = $("#ttkh_diachi").val();
        var v_Ghichu = $("#ttkh_ghichu").val();
        var v_Ngaylap = $("#ttkh_ngaylap").val();
        var v_Sothutu = $("#ttkh_stt").val();
        var v_Soghi = $("#ttdd_soghi").val();
        var v_Nhasanxuat = $("#ttdd_nsx option:selected").val();
        var v_Congnghe = $("#ttdd_congnghe option:selected").val();
        var v_IsWarning = 0;
        var v_MatDien = 0;
        if ($("#c3").is(':checked')) v_IsWarning = 1;
        if ($("#c4").is(':checked')) v_MatDien = 1;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_QUANLYTTKH.UPDATE_THONGTINDDOMATDIEN", callback: "result_update_ttkh" };
        var para = {
            v_MeterId: parseInt(meterid),
            v_Madiemdo: v_Madiemdo,
            v_MaKH: makh,
            v_Imei: imei,
            v_Socongto: v_Socongto,
            v_Tendiemdo: v_Tendiemdo,
            v_Ngaylap: v_Ngaylap,
            v_Soghi: v_Soghi,
            v_IsWarning: v_IsWarning,
            v_CodeDM: codedm,
            v_IsKhLe: 0,
            v_Donvinhan: donvinhan,
            v_Diachi: v_Diachi,
            v_Ghichu: v_Ghichu,
            v_Congnghe: parseInt(v_Congnghe),
            v_Nhasanxuat: parseInt(v_Nhasanxuat),
            v_Donvi: donvi,
            v_Sothutu: v_Sothutu,
            v_MatDien: parseInt(v_MatDien),
            v_userId: 1,
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_update_ttkh(config, para, lst) {
    var data = lst;
    ////console.log(data);
    if (data.result == "OK") {
        showToast(data.data[0].count, "success");
    } else {
        showToast("Cập nhật không thành công !", "error");
    }

}

function thanhlydiemdo() {
    try {
        //console.log("OK");
        var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
        var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var v_nguoithanhly = JSON.parse(localStorage.getItem("userinfo")).usercode;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_QUANLYTTKH.THANHLY", callback: "result_thanhlydiemdo" };
        var para = {
            v_MeterId: meterid,
            v_userId: 1,
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
    } catch (e) {
        console.log(e);
    }
}
function result_thanhlydiemdo(config, para, lst) {
    var data = lst.data;
    var row = data[0].count;
    if (row.indexOf("thành công") > 0) {
        showToast(row, 'success');

        $("#ttdd_thanhly").attr("disabled", "disabled");
        $("#ttdd_edit").attr("disabled", "disabled");
    } else {
        showToast(row, 'error');
    }
    initformelement();
    stopLoad();
}
