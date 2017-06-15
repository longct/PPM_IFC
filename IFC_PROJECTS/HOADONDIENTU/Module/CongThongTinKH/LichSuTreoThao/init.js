var dik="";
$(document).ready(function () {
    try {
        loadchecklog_master();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        console.log(userinfo);
        loadlichsutreothaoid_cttkh(userinfo.usercode);
    } catch (e) {
        console.log(e);
    }
});
function loadlichsutreothaoid_cttkh(id) {
    console.log(id);
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOTREOTHAO.LICHSUTHAOCONGTO", callback: "result_lichsutreothao_lstkh_cttkh" };
        var para = {
            v_IDKH: '',
            v_MaDiemDo: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lichsutreothao_lstkh_cttkh(config, para, lst) {
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




