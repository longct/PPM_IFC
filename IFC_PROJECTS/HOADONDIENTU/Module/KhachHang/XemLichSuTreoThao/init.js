var dik="";
$(document).ready(function () {
    try {
        loadchecklog_master();
    } catch (e) {
        console.log(e);
    }
});
function loadlichsutreothaoid(id) {
    console.log(id);
    try{
        dik=id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOTREOTHAO.LICHSUTHAOCONGTO", callback: "result_lichsutreothao_lstkh" };
        var para = {
            v_IDKH: id,
            v_MaDiemDo: ''
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lichsutreothao_lstkh(config, para, lst) {
    try {
       
        var data = lst.data;
        console.log(data);
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_lstttskbkh", "Không có dữ liệu", 'error');
            $("#tbl_lstt").hide();
        } else {
            messInfo("messinfo_lstttskbkh", "", 'error');
            $("#tbl_lstt").show();

            $("#txt_tenkhachang_lstth").val(setnull(data[0].tenkhachhang));
            $("#txt_makhachang_lstth").val(setnull(data[0].makhachhang));
            $("#txt_madiemdos_lstth").val(setnull(data[0].madiemdo));
            $("#txt_socongto_lstth").val(setnull(data[0].socongto));
            $("#txt_ngaythao_lstth").val(setnull(data[0].ngaythaoct));
            $("#txt_ti_lstth").val(setnull(data[0].ti));
            $("#txt_tu_lstth").val(setnull(data[0].tu));
            $("#txt_hsn_lstth").val(setnull(data[0].hsn));
            $("#txt_solanlaptrinh_lstth").val(setnull(data[0].solanlaptrinh));
            $("#txt_sobienban_lstth").val(setnull(data[0].sobienban));
            $("#txt_lydotreothao_lstth").val(setnull(data[0].lydotreothao));
            $("#txt_nhanvientreothao_lstth").val(setnull(data[0].nhanvientreothao));
            $("#txt_nhanienkepchi_lstth").val(setnull(data[0].nhanvienkepchi));
            $("#txt_thoidiemcapnhat_lstth").val(setnull(data[0].thoidiemcapnhatct));
        }
    } catch (e) {
        console.log(e);
    }
}




