var viewAllSearch_dd = setTogglesId;
$(document).ready(function () {
    try {
        getLangText();
        loadContent();
       
        $('#viewAll_dsdd.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: booleanToggles, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 50, // width used if not set in css
            height: 20, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
        $('#viewAll_dsdd.toggle').on('toggle', function (e, active) {
            if (active) {// hien tat ca
                viewAllSearch_dd=1;
            } else {// hien smart park
                viewAllSearch_dd=0; 
             
            }
        });
        getDanhSachQuan();
    } catch (e) {
        console.log(e);
    }
});
function getLangText() {
    $("#mod_name").html(apiLstLang.lang_modName);
    $("#httc_quan").text(apiLstLang.lang_hienthitatca);
}
function getDanhSachQuan() {
    try {
        localStorage.removeItem("IdQuan");
        var p = getAllIdMod();

        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.DANHSACHDIEMDO" };
        var para = {};
        var lst = ExecuteServiceSyns(config, para);
        result_danhsachquan(lst);
    } catch (e) {
        console.log(e);
    }
}
function result_danhsachquan(lst) {
    try {
        var p = getAllIdMod();
        var data = lst.data;
        $("#dsquan").empty();
        if (data.length > 0) {
            $.each(data, function (key, val) {
                var tongdiemdoxe = val.tongdiemdoxe != null ? val.tongdiemdoxe : "0";
                var dv1 = $("<div class='img_diemdo_quan' />").append("<span class='tongsocho'>" + tongdiemdoxe + "</span><br/>").append("<a href='javascript:void(0)' onclick=\"f_detailduong('" + val.code + "')\"><img src='img/icon-car.png'/></a><br />").append("<a class='tenquan' href='javascript:void(0)' onclick=\"f_detailduong('" + val.code + "')\">" + val.ten.charAt(0).toUpperCase() + val.ten.slice(1).toLowerCase() + "</a>");
                $("#dsquan").append(dv1);
            });
        } else {
            $("#dsquan").append($("<div class='img_diemdo_quan' />").append(apiLstLang.lang_khongtimthaydulieu));

        }

    } catch (e) {
        console.log(e);
    }
}
function f_detailduong(code) {
    localStorage.setItem("IdQuan", code);
    $(location).attr('href', 'index.html#Modules/DanhSachDiemDo');
  
}