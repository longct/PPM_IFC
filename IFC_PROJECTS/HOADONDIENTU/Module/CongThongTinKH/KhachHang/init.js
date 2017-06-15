var dik = "";
$(document).ready(function () {
    try {
        loadchecklog_master();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        loadkhachhangsuaid(userinfo.usercode);
    } catch (e) {
        console.log(e);
    }
});
function loadkhachhangsuaid(id) {
    try {
        dik = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_CONGTHONGTIN_KHACHHANG.KHHANGBYMADIEMDO", callback: "result_idkhachhang_lstkh" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_idkhachhang_lstkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_kbkh", "không tồn tại điểm do", 'error');
            return;
        }


        $("#txt_tenkhachang_skbkh").val(data[0].tenkhachhang);
        $("#txt_makhachang_skbkh").val(data[0].makhachhang);
        $("#txt_madiemdos_kbkh").val(data[0].madiemdo);
        $("#txt_socongto_skbkh").val(data[0].socongto);
        $("#txt_masothue_skbkh").val(data[0].masothue);
        $("#txt_hesonhan_skbkh").val(data[0].hesonhan);
        $("#cb_loaidiemdos_kbkh").val(data[0].tenloaidiemdo);
        $("#txt_madiachinhs_kbkh").val(data[0].madiachinh);
        $("#txt_diachis_kbkh").val(data[0].diachi);
        $("#cb_mahoms_kbkh").val(data[0].mahom);
        $("#cb_macots_kbkh").val(data[0].macot);
        $("#cb_masoghis_kbkh").val(data[0].masoghi);
        $("#cb_matrams_kbkh").val(data[0].matram);
        $("#cb_donvis_kbkh").val(data[0].tendonvi);
        $("#txt_malos_kbkh").val(data[0].malo);
        $("#txt_matos_kbkh").val(data[0].mato);
        $("#txt_makhuvuc_skbkh").val(data[0].makhuvuc);
        $("#txt_soho_skbkh").val(data[0].soho);
       
        if (data[0].ngaytaos == "" || data[0].ngaytaos == null) {
            $("#txt_sdate_kbkh").val(gettimenow());
        } else {
            $("#txt_sdate_kbkh").val(data[0].ngaytaos);
        }
        $("#txt_sominhthus_kbkh").val(data[0].scmt);
        if (data[0].ngay_cmts == "" || data[0].ngay_cmts == null) {

            $("#txt_ngaycapdates_kbkh").val(gettimenow());
        } else {
            $("#txt_ngaycapdates_kbkh").val(data[0].ngay_cmts);
        }

        $("#txt_noicaps_kbkh").val(data[0].noi_cmt);
        $("#txt_sotaikhoans_kbkh").val(data[0].stk_ngh);
        $("#cb_tenganhangs_kbkh").val(setnull(data[0].tennganhang));
        $("#txt_dienthoais_kbkh").val(data[0].dienthoai);
        $("#txt_emails_kbkh").val(data[0].email);
    } catch (e) {
        console.log(e);
    }
}










