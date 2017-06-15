
var from_cdtgg = "";
var to_cdtgg = "";
var viewAllSearch_tx = setTogglesId;
$(document).ready(function () {
    try {
        getLangText();
        loadContent();
        $('#viewAllSearch_tx.toggle').toggles({
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
        $('#viewAllSearch_tx.toggle').on('toggle', function (e, active) {
            if (active) { // hien thi tat ca
                viewAllSearch_tx = 0;
            } else { // hien thi smart parking
                viewAllSearch_tx = 1;
            }
            f_KhoiTaoTimer_tx();
        });
        f_KhoiTaoTimer_tx();
    } catch (e) {
        console.log(e);
    }
});
function getLangText() {
    $("#mod_name").html(apiLstLang.lang_modName);
    $("#httc_tx").text(apiLstLang.lang_hienthitatca);
   
}
function f_KhoiTaoTimer_tx() {
    try {
        $('.timer').timer({
            editable: false,
            duration: '0.1s',
            repeat: false,
            callback: function () {
                try {
                    getDanhSachDiaDiem_tx();
                    $('.timer').timer('remove');
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }
}
function getDanhSachDiaDiem_tx() {
    var p = getAllIdMod();
    userID = 0;
	var user = localStorage.getItem("userinfo");     
	if (user != null) {
	    userID = JSON.parse(user).id_kh;
	}
	var config = { connstr: "Oracle_CarParking", namesql: "CAR_DOTHUONGXUYEN.DIEMDOTHUONGXUYEN" };
	var para = {
	    V_USERID: userID,
	    V_VIEWALL: viewAllSearch_tx
	};
	var lst = ExecuteServiceSyns(config, para);
	result_diemdoxethuongxuyen(lst);
	stopLoad();
}



function result_diemdoxethuongxuyen(lst) {
    try {
		var p = getAllIdMod();
		var data = lst.data;
		$("#dstx").empty();
		$("#mapNear_bds").empty();
		
		if (data.length > 0) {
		    $.each(data, function (key, val) {
		        var tenduong = val.ten;
		        var div1 = $("<div class='col-xs-2 col-sm-1 no-padding'/>").append("<img src='img/icon-car.png' /><span class='trong'>" + val.sochotrong + "</span><span class='diemdo'>/" + val.tong_ddx + "</span>");
		        var div2 = $("<div class='col-xs-10 col-sm-11' />").append("<a class='filter_tsvh' onclick='f_loadBanDoTuongUngDuong_tx(\"" + val.code + "\"," + val.id_ddx + ")' href='javascript:void(0)'>" + tenduong.charAt(0).toUpperCase() + tenduong.slice(1).toLowerCase() + "</a>");
		        $("#dstx").append($("<div class='col-xs-6 col-sm-6 no-padding' />").append(div1).append(div2));
				
		    });
		    f_loadBanDoTuongUngDuong_tx(data[0].code,"");

		} else {
		    $("#dstx").append($("<div class='col-xs-12 col-sm-12 no-padding' />").append(apiLstLang.lang_khongtimthaydulieu));
		    $("#kq_map_bds").hide();
		}
		
	} catch (e) {
		console.log(e);
	}
	
}

function f_loadBanDoTuongUngDuong_tx(code, id_ddx)
{
    var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.DULIEUBANDO_TKT" };
    var para = {
        V_CODE: code,
        V_IDDDX: id_ddx
    };
    var lst = ExecuteServiceSyns(config, para);
    f_result_loadBanDoTuongUngDuong_tx(lst);
}
function f_result_loadBanDoTuongUngDuong_tx(lst)
{
    if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0)
        return;

    var khoangcach ="0";
    var config = { khoangcanh: khoangcach, hienViTri: false, circle: false, zoom: 17 };
    f_hienThongTinBanDo_bds(config, lst.data);
}

