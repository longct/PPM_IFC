
var from_cdtgg = "";
var to_cdtgg = "";
var viewAllSearch_tkc = setTogglesId;

$(document).ready(function () {
    try {
        var p = getAllIdMod();
        getDanhSachDiaDiemAutoComplete_tkc();
        getLangText();
        loadContent();
        init_cdtgg();
        $('#viewAllSearch_tkc.toggle').toggles({
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
        $('#viewAllSearch_tkc.toggle').on('toggle', function (e, active) {
            if (active) {// hien thi tat ca
                viewAllSearch_tkc = 0;
            } else {// hien thi smart parking
                viewAllSearch_tkc = 1;
            }
            
            getDanhSachDiaDiem_tkc(p.timkiem_txt_tkc, viewAllSearch_tkc, "");
        });
      
        f_KhoiTaoTimer();
      
        stopLoad();
       

    } catch (e) {
        console.log(e);
    }
});
function getLangText() {
    $("#mod_name").html(apiLstLang.lang_modName);
    $("#httc_tkc").text(apiLstLang.lang_hienthitatca);
    $("#kc_tkc").text(apiLstLang.lang_khoangcach);
    $("#tk_tkc").text(apiLstLang.lang_timkiem);
    $("#timkiem_txt_tkc").attr('placeholder',apiLstLang.lang_placeholdersearch);
}
function f_KhoiTaoTimer() {
    try {
        var p = getAllIdMod();
        $('.timer').timer({
            editable: false,
            duration: '0.1s',
            repeat: false,
            callback: function () {
                try {
                    getDanhSachDiaDiem_tkc(p.timkiem_txt_tkc,viewAllSearch_tkc,"");
                    $('.timer').timer('remove');
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }
}
function getDanhSachDiaDiem_tkc(TUKHOA,VIEWALL,CODE) {
	var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.TIMKIEMCHUNG" };
	var para = {
	    V_TUKHOA: TUKHOA,
	    V_VIEWALL: VIEWALL,
	    V_CODE: CODE
	};
	console.log(para);
	var lst = ExecuteServiceSyns(config, para);
	result_timkiemchung(lst);
	
}
function init_cdtgg() {
    try {
        $("#sliderKhoangCach_tkc").ionRangeSlider({
            type: "single",
            grid: false,
            min: 0,
            max: 3000,
            from: 1000,
            step: 10,
            keyboard: true,
            postfix: "",
            onUpdate: function (data) {
                $("#rangeValue_tkc").val(data.from + " m");
            },
            onFinish: function (data) {
                $("#rangeValue_tkc").val(data.from + " m");
                f_thayDoiKhoangCach_tkc(data.from);
                stopLoad();
            }
        });


    } catch (e) {
        console.log(e);
    }
}
function result_timkiemchung(lst) {
    try {
		var p = getAllIdMod();
		var data = lst.data;
		$("#tbl_dstk").empty();
		$("#mapNear_bds").empty();

		if (data.length > 0) {
		   
			$.each(data, function (key, val) {
			    var td1 = $("<td width='40px' style='padding-left: 5px;cursor: pointer;'/>").append("<img src='img/icon-car.png' /><span class='trong'>" + val.sochotrong + "</span><span class='diemdo'>/" + val.tong_ddx + "</span>");
			    var td2 = $("<td/>").append("<label class='filter_tsvh' style='cursor: pointer;'>" + val.tenduong + " - " + val.quan + "</label>");
				$("#tbl_dstk").append($("<tr onclick='f_loadBanDoTuongUngDuong_tkc(\"" + val.code + "\"," + val.id_ddx + ")' />").append(td1).append(td2));
				f_loadBanDoTuongUngDuong_tkc(data[0].code,"");
			});
		} else {
		    $("#tbl_dstk").append($("<tr/>").append($("<td class='kttdl'/>").text(apiLstLang.lang_khongtimthaydulieu)));
			$("#kq_table").addClass("kqtable");
			$("#kq_map").attr("style", "background-color: transparent;");
		}
		stopLoad();
	} catch (e) {
		console.log(e);
	}
	
}

function f_loadBanDoTuongUngDuong_tkc(code, id_ddx)
{
    try{
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.DULIEUBANDO_TKT" };
        var para = {
            V_CODE: code,
            V_IDDDX: id_ddx
        };
        var lst = ExecuteServiceSyns(config, para);
        f_result_loadBanDoTuongUngDuong_tkc(lst);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanDoTuongUngDuong_tkc(lst)
{
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0)
            return;

        var khoangcach = $("#rangeValue_tkc").val().replace(/[^\d.]/g, '');
        var config = { khoangcanh: khoangcach, hienViTri: false, circle: false, zoom: 17 };
        f_hienThongTinBanDo_bds(config, lst.data);
    } catch (e) {
        console.log(e);
    }
}

function f_thayDoiKhoangCach_tkc(khoangcacha)
{
    try{
        var config = { khoangcanh: khoangcacha, hienViTri: true, circle: true, zoom: 17 };
        bindMapRange_bds(config);
    } catch (e) {
        console.log(e);
    }
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
        $("#timkiem_txt_tkc").typeahead({
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
              
                getDanhSachDiaDiem_tkc("", viewAllSearch_tkc, code);
                f_loadBanDoTuongUngDuong_tkc(code, "");
                return item;
            }
        }).on('keyup', this, function (event) {    
            if (event.keyCode == 13) {
                var p = getAllIdMod();             
                if (code11 != "") { // neu duoc chon tu dropdow
                    getDanhSachDiaDiem_tkc("", viewAllSearch_tkc, code11);
                } else { 

                    getDanhSachDiaDiem_tkc(p.timkiem_txt_tkc, viewAllSearch_tkc, code11);
                }
               
                f_loadBanDoTuongUngDuong_tkc(code11, "");
             }
        });
      
    } catch (e) {
        console.log(e);
    }
}
