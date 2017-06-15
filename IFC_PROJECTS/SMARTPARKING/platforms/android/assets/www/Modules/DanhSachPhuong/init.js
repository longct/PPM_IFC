var viewAllSearch_dd =1;
$(document).ready(function () {
    try {
        loadContent();
        $("#mod_name").html("Danh sách điểm đỗ xe");
        $('#viewAll_dsdd.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: true, // is the toggle ON on init
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
        getDanhSachDiemDoByCode("01010201");
        $('#timkiem_txt_dsdd').keyup(function (e) {
            if (e.keyCode == 13) {
                getDanhSachDiemDoByCode("01010201");
            }
        });
        $("#timkiem_txt_dsdd").on("change", function () {
            getDanhSachDiemDoByCode("01010201");
        });
       
    } catch (e) {
        console.log(e);
    }
});
function getDanhSachDiemDoByCode(code) {
    try{

        var p = getAllIdMod();

        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.CHITIETDANHSACHDIEMDO" };
        var para = {
            V_TUKHOA: p.timkiem_txt_dsdd,
            V_CODE: code,
            V_VIEWALDD: viewAllSearch_dd
        };
        var lst = ExecuteServiceSyns(config, para);
        result_loadChiTietDiemDo(lst);
    } catch (e) {
        console.log(e);
    }
}
function result_loadChiTietDiemDo(lst) {
    try {
        var p = getAllIdMod();
        var data = lst.data;
        $("#tbl_dsddx").empty();
        $("#mapNear_bds").empty();

        if (data.length > 0) {
            $.each(data, function (key, val) {
                var td1 = $("<td width='40px' style='padding:0px 5px;'/>").append("<img src='img/icon-car.png' /><span class='trong'>" + val.sochotrong + "</span><span class='diemdo'>/" + val.tong_ddx + "</span>");
                var td2 = $("<td/>").append("<label class='filter_tsvh'>" + val.tenduong + " - " + val.quan + "</label>");
                $("#tbl_dsddx").append($("<tr onclick='f_loadBanDoTuongUngDuong_ctdd(\"" + val.code + "\")' />").append(td1).append(td2));

            });
        } else {

            $("#tbl_dsddx").append($("<tr/>").append($("<td class='kttdl'/>").text(apiLstLang.lang_khongtimthaydulieu)));
          
        }

    } catch (e) {
        console.log(e);
    }

}
function f_loadBanDoTuongUngDuong_ctdd(code) {
    try {
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.DULIEUBANDO_TKT" };
        var para = {
            V_CODE: code
        };
        var lst = ExecuteServiceSyns(config, para);
        f_result_loadBanDoTuongUngDuong_dd(lst);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanDoTuongUngDuong_dd(lst) {
    console.log(lst);
    if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0)
        return;

    var config = { khoangcanh: 0, hienViTri: false, circle: false, zoom: 17 };
    f_hienThongTinBanDo_bds(config, lst.data);
}


