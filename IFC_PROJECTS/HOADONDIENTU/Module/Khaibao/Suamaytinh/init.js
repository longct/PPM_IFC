var idhmtinh = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
 
        $("#btn_sua_kbmt").click(function () {
            var check = validate_smt();
            if (check != "") {
                messInfo("messinfos_kbmt", check, 'error')
                return;
            }
           
            f_confimYesNo("Cập nhật thông tin máy tính", "Bỏ qua", "Xác nhận", function () {
                capnhatmaytinh();
            });
        });

    } catch (e) {
        console.log(e);
    }
});
function thongtinidmaytinh(id) {
    try {
        idhmtinh = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.IDMAYTINH", callback: "resut_thongtinidmaytinh" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_thongtinidmaytinh(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfos_kbmt", 'Không có dữ liệu hiển thị', 'ok');
            clear_mt();
            return;
        }
   
        $("#txt_tens_kbmt").val(data[0].tenmaytinh);
        $("#txt_sanxuats_kbmt").val(data[0].sanxuat);
        $("#txt_mahieus_kbmt").val(data[0].mahieu);
        $("#txt_hedhs_kbmt").val(data[0].hedieuhanh);
        $("#txt_vixlys_kbmt").val(data[0].vixuly);
        $("#txt_rams_kbmt").val(data[0].ram);
        $("#txt_ghichus_kbmt").val(data[0].ghichu);
        $("#datefroms_kbmt").val(data[0].ngaya);
        if (data[0].hieuluc == '1') {
            $("#txt_shieuluc").prop("checked", true);
        } else {
            $("#txt_shieuluc").prop("checked", false);
        }

    } catch (e) {
        console.log(e);
    }
}
function clear_mt() {
    try{
        $("#txt_tens_kbmt").val('');
        $("#txt_sanxuats_kbmt").val('');
        $("#txt_mahieus_kbmt").val('');
        $("#txt_hedhs_kbmt").val('');
        $("#txt_vixlys_kbmt").val('');
        $("#txt_rams_kbmt").val('');
        $("#txt_ghichus_kbmt").val('');
     
    } catch (e) {
        console.log(e);
    }
}
function validate_smt() {
    try {
        var p = getAllIdMod();
        if (p.txt_tens_kbmt = "") return "Tên máy tính không được bỏ trống";
        if (p.txt_sanxuats_kbmt = "") return "Tên máy tính không được bỏ trống";
        if (p.txt_mahieus_kbmt = "") return "Mã hiệu không được bỏ trống";
        if (p.txt_vixlys_kbmt = "") return "Vi Xử lý không được bỏ trống";
        if (p.txt_hedhs_kbmt = "") return "Hệ điều hành không được bỏ trống";
        if (p.txt_rams_kbmt = "") return "Ram không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function capnhatmaytinh() {
    try {
        var p = getAllIdMod();
        var check = $("#txt_shieuluc").is(':checked') ? 1 : 0;
       
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_MAYMOC.SUAMOIMAYTINH", callback: "result_capnhatmaytinh" };
        var para = {
            v_ID:idhmtinh,
            v_TENMAYTINH: p.txt_tens_kbmt,
            v_MAHIEU: p.txt_mahieus_kbmt,
            v_HEDIEUHANH: p.txt_hedhs_kbmt,
            v_VIXULY: p.txt_vixlys_kbmt,
            v_RAM: p.txt_rams_kbmt,
            v_GHICHU: p.txt_ghichus_kbmt,
            v_NGAY:'',
            v_SANXUAT: p.txt_sanxuats_kbmt,
            v_HIEULUC: check,
            v_USERID:userinfo.userid
        };
    
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_capnhatmaytinh(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
  
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfos_kbmt", row, 'ok');
            setTimeout(function () { loadthongtinh(1); }, 500);
        } else {
            messInfo("messinfos_kbmt", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}