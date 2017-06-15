var datasuasx = "";
$(document).ready(function () {
    try {

        $("#btn_checkluu_suaxuat").click(function () {
            if ($("#txt_nhasanxuat_suasxuat").val()=="") {
                messInfo("messinfo_sanxuat", "Tên nhà sản xuất ko đk bỏ trống", "error");
                return;
            }
           capnhatnhasanx();
           
        });
   
    } catch (e) {
        console.log(e);
    }

});

function loadsuanhasanxuat_sua(val) {
    try {
        datasuasx = val;
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
            ID: datasuasx,
            TEN: p.txt_nhasanxuat_suasxuat
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatnhasanx(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
     
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sanxuat", row, "ok");
            loaddatabase_nhasanxuat();
        } else {
            messInfo("messinfo_sanxuat", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}


