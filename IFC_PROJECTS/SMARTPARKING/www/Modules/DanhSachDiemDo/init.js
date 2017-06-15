var viewAllSearch_dd = setTogglesId;
var IdQuan = "0";
$(document).ready(function () {
    try {
        var p = getAllIdMod();
        getLangText();
        loadContent();
        getDanhSachDiaDiemAutoComplete_tkc();
        IdQuan = localStorage.getItem("IdQuan");
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
                viewAllSearch_dd=0;
            } else {// hien smart park
                viewAllSearch_dd=1; 

            }
            getDanhSachDiemDoByCode(IdQuan, p.timkiem_txt_dsdd);
        });
      
        f_KhoiTaoTimer_dsdd();
        stopLoad();
    } catch (e) {
        console.log(e);
    }
});
function getLangText() {
    $("#mod_name").html(apiLstLang.lang_modName);
    $("#httc_ctbdx").text(apiLstLang.lang_hienthitatca);;
    $("#tk_ctbdx").text(apiLstLang.lang_timkiem);
    $("#timkiem_txt_dsdd").attr('placeholder', apiLstLang.lang_placeholdersearch);
}
function f_KhoiTaoTimer_dsdd() {
    try {
        var p = getAllIdMod();
        $('.timer').timer({
            editable: false,
            duration: '0.1s',
            repeat: false,
            callback: function () {
                try {
                    IdQuan = localStorage.getItem("IdQuan");
                    if (IdQuan != null) {
                        getDanhSachDiemDoByCode(IdQuan, p.timkiem_txt_dsdd);
                    }
                    $('.timer').timer('remove');
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }
}

function getDanhSachDiemDoByCode(code, keyword) {
    try{
        
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.CHITIETDANHSACHDIEMDO" };
        var para = {
            V_TUKHOA: keyword,
            V_CODE: code,
            V_VIEWALDD: viewAllSearch_dd
        };
        var lst = ExecuteServiceSyns(config, para);
        result_loadChiTietDiemDo(lst);
        stopLoad();
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
                var td1 = $("<td width='40px' style='padding:0px 5px;cursor: pointer;' onclick='f_loadBanDoTuongUngDuong_ctdd(\"" + val.code + "\"," + val.id_ddx + ")'/>").append("<img src='img/icon-car.png' /><span class='trong'>" + val.sochotrong + "</span><span class='diemdo'>/" + val.tong_ddx + "</span>");
                var td2 = $("<td />").append("<a class='filter_tsvh' href='javascript:void(0)' onclick='f_loadBanDoTuongUngDuong_ctdd(\"" + val.code + "\"," + val.id_ddx + ")'>" + val.tenduong + " - " + val.quan + "</a>");
                $("#tbl_dsddx").append($("<tr/>").append(td1).append(td2));

            });
            f_loadBanDoTuongUngDuong_ctdd(data[0].code,"");
        } else {

            $("#tbl_dsddx").append($("<tr/>").append($("<td class='kttdl'/>").text(apiLstLang.lang_khongtimthaydulieu)));
          
        }

    } catch (e) {
        console.log(e);
    }

}
function f_loadBanDoTuongUngDuong_ctdd(code, id_ddx) {
    try {
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.DULIEUBANDO_TKT" };
        var para = {
            V_CODE: code,
            V_IDDDX: id_ddx
        };
        var lst = ExecuteServiceSyns(config, para);
        f_result_loadBanDoTuongUngDuong_dd(lst);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanDoTuongUngDuong_dd(lst) {
    if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0)
        return;

    var config = { khoangcanh: 0, hienViTri: false, circle: false, zoom: 17 };
    f_hienThongTinBanDo_bds(config, lst.data);
}

function getDanhSachDiaDiemAutoComplete_tkc() {
    try {
        var code11 = "";
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_DIACHIAUTOCOMPLETE.DIACHIAUTOCOMPLETE" };
        var para = {};
        var lst = ExecuteServiceSyns(config, para);
        var data = lst.data;
        var nameArr = new Array();

        nameArr.length = 0;
        if (data.length > 0) {
            $.each(data, function (key, val) {
                nameArr.push({
                    name: val.tenduong + ', ' + val.quan,
                    id: val.code
                });
            });
        }
        $("#timkiem_txt_dsdd").typeahead({
            highlighter: function (item) {
                var parts = item.split(','),
                    html = '<div class="typeahead">';
                html += '<div class="pull-left margin-small">';
                html += '<div class="text-left" style="text-transform: uppercase;"><strong>' + parts[0] + '</strong></div>';
                html += '<div class="text-left" style="text-transform: uppercase;">' + parts[1] + '</div>';
                html += '</div>';
                html += '<div class="clearfix"></div>';
                html += '</div>';
                return html;
            },
            hint: true,
            highlight: true,
            minLength: 1,
            source: nameArr,
            updater: function (item) {
                var code = code11 = item.id;

                getDanhSachDiemDoByCode(code, "");
                f_loadBanDoTuongUngDuong_ctdd(code, "");
                return item;
            }
        }).on('keyup', this, function (event) {
            if (event.keyCode == 13) {
                var p = getAllIdMod();
                               if (code11 != "") { // neu duoc chon tu dropdow
                    getDanhSachDiemDoByCode(code11, "");
                } else {

                    getDanhSachDiemDoByCode(code11,  p.timkiem_txt_dsdd);
                }
                f_loadBanDoTuongUngDuong_ctdd(code11, "");
            }
        });

    } catch (e) {
        console.log(e);
    }
}

