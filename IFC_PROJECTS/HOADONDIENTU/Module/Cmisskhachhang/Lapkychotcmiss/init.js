var dataXML;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadConetent();
        if ($(".datepicker").val() == "") $(".datepicker").val(gettimenow_cscthang());
      
    } catch (e) {
        console.log(e);
    }
});
function validate_cmiss() {
    try{
        var p = getAllIdMod();
        if (p.date_thang_tlcmiss == "") return "Tháng chốt không được bỏ trống";
        if (p.sokychot_tlcmiss == "") return "Vui lòng chọn kỳ chốt";
        if (p.txtFixday_tlcmiss == "") return "Thiết lập ngày chốt không được bỏ trống";


        return "";

    } catch (e) {
        console.log(e);
    }
}