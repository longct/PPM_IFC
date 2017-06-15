
var Id_NSX = 0;
$(document).ready(function () {
    try {

        $("#btn_checkluu_suaxuat").click(function () {
            if ($("#txt_nhasanxuat_suasxuat").val()=="") {
                messInfo("messinfo_sanxuat", "Tên nhà sản xuất không được bỏ trống", "error");
                return;
            }
           capnhatnhasanx();
           
        });
        $("#btnthoat_nsx").click(function () {
            Id_NSX = 0;
            $("#sua_nhasaxuat").modal("hide");
        });
   
    } catch (e) {
        console.log(e);
    }

});

function loadsuanhasanxuat_sua(val) {
    try {
        Id_NSX =parseInt(val);
        var config = { namesql: "TB_IDNhaSanXuat", callback: "f_result_loadsuanhasanxuat", connstr: "ConnectEMS" };
        var para = {
            ID : val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadsuanhasanxuat(config, para, lst) {
    try {
        var data = lst.data;
     
        $("#txt_nhasanxuat_suasxuat").val(data[0].tennhasanxuat);
    } catch (e) {
        console.log(e);
    }
}
function capnhatnhasanx() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_IDUPDATENhaSanXuat", callback: "f_result_capnhatnhasanx", connstr: "ConnectEMS" };
        var para = {
            ID: Id_NSX,
            TEN: p.txt_nhasanxuat_suasxuat
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatnhasanx(config, para, lst) {
    try{
       
        if (lst == null || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]") {
            messInfo("messinfo_sanxuat", "Cập nhật tên nhà sản xuất lỗi", "error");
            return;
        }
    
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            if (Id_NSX == 0) {
                $("#txt_nhasanxuat_suasxuat").val("");
            }
            messInfo("messinfo_sanxuat", lst.data[0].result, "ok");
            loaddatabase_nhasanxuat(1);
        }
        else
            messInfo("messinfo_sanxuat", lst.data[0].result, "error");
       
    } catch (e) {
        console.log(e);
    }
}


