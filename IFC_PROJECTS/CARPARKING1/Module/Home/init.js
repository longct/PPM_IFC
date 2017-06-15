$(document).ready(function () {
    try {
        loadConetent();
        var height = $(window).height();
        $(".row1").css("max-height", height - 220);
        var Looper = setInterval(function () {
            loadThongTinThayDoi_home();
        }, 5000);
        $("div").tooltip();

      
    } catch (e) {
        console.log(e);
    }
});





function loadThongTinCot_home() {
    try {
        messInfo("messinfo_home", "", "error");
        $('#tbl_cotxang_home').empty();
        var config = { namesql: "PKG_HOME.GETINFOCOT_NEW", callback: "f_result_loadThongTinCot_home", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var code = infotree == null || infotree == undefined ? userinfo.madonvi : infotree.code
        var para = { V_DONVI: code };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadThongTinCot_home(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
            messInfo("messinfo_home", "Không có dữ liệu hiển thị", "error");
            return;
        }

        var lstType = [];
        var type ="";
        $.each(lst.data, function (key, val) {
            if (type != val.matram) {
                var add = { type: val.matram };
                lstType.push(add);
                type = val.matram;
            }
          
        });      

        $.each(lstType, function (key, val) {
            var arrayType = $.grep(lst.data, function (e) { return e.matram == val.type; });
            for (var i = 0 ; i < arrayType.length / 5; i++) {
                var subType = arrayType.slice(i*5, (i+1)*5);
                drowGrid_home(subType);

            }
        });

    } catch (e) {
        console.log(e);
    }
}


function drowGrid_home(data)
{
    var col = data.length + 1;
    var tenTramHead = '<tr> <td colSpan='+col+' class="rowDonVi"> ' + removeNull_home(data[0].tendonvi ) + '</td></tr>';
    var header = "<tr><th class='tencot'>Cột Xăng</th>";
    var timeTucThoi = '<tr><td class="tencot2 thoigiandoc">Lần bơm gần nhất</td>';
    var solist = '<tr><th>Số lít</th>';
    var dongia = '<tr><th>Đơn giá</th>';
    var thanhtien = '<tr><th>Thành tiền</th>';
    var timechot = '<tr><td class="tencot2 thoigiandoc">Số lít xăng theo ca</td>';
    var tongsolit = '<tr><th>Số lít</th>';
    var tongsotien = '<tr><th>Số tiền</th>';

    var tong_time = '<tr><td class="tencot2 thoigiandoc">Số lít xăng tổng</td>';
    var tong_solittichluy = '<tr><th>Số lít</th>';

    var sum = "";
    $.each(data, function (key, val) {
        header += '<th class="tencot ">' +
                    '<label for="checkbox1">' + removeNull_home(val.tencot) + '</label>' +
                    '<div  class="status thaytrangthai_' + removeNull_home(val.macot) + ' ' + removeNull_home(val.trangthai) + ' tooltips" data-placement="right" data-original-title="Kết nối"></div>' +
                    //'<div class="history tooltips " data-placement="right" data-original-title="Lịch sử hoạt động">' +
                    //    '<a href="#lstram" data-toggle="modal"><i class="fa fa-book viewLichSuChot_home" macot=' + removeNull_home(val.macot) + ' style="color:#fff"></i></a>' +
                    //'</div>' +
                '</th>';

        timeTucThoi += '<td class="thoigiandoc "><a macot=' + removeNull_home(val.macot) + ' class="viewLichSuChot_home thaythoidiemdoc_' + removeNull_home(val.macot) + '" href="#lstram" data-toggle="modal">' + removeNull_home(val.thoidiemcuoi) + '</a></td>';
        solist += '<td><label class="count thaysolit_' + removeNull_home(val.macot) + '">' + removeNull_home(val.solitban) + '</label></td>';
        dongia += '<td class="thaydongia_' + removeNull_home(val.macot) + '">' + removeNull_home(val.dongia) + '</td>';
        thanhtien += '<td><label class="thaythanhtien_' + removeNull_home(val.macot) + '">' + removeNull_home(val.thanhtien) + '</label></td>';
        timechot += '<td class="thoigiandoctl "><a macot=' + removeNull_home(val.macot) + ' class="viewLichSuChot_home thaythoidiemchot_' + removeNull_home(val.macot) + '" href="#lscot_chot" data-toggle="modal">' + removeNull_home(val.thoidiem_chot) + '</a></td>';
        tongsolit += '<td><label class="thaytongsolitchot_' + removeNull_home(val.macot) + '">' + removeNull_home(val.tonglit_chot) + '</label></td>';
        tongsotien += '<td class="thaytongtienchot_' + removeNull_home(val.macot) + '">' + removeNull_home(val.tongtien_chot) + '</td>';

        tong_time += '<td class="thoigiandoctl "><a macot=' + removeNull_home(val.macot) + ' class ="viewLichSuChot_home thaythoidiemtongtichluy_' + removeNull_home(val.macot) + '" href="#lstongtichluy" data-toggle="modal">' + removeNull_home(val.thoidiem_tonglittichluy) + '</a></td>';
        tong_solittichluy += '<td><label class="thaytongsolittongtichluy_' + removeNull_home(val.macot) + '">' + removeNull_home(val.tong_littichluy) + '</label></td>';

        sum += "<tr>" + header + timeTucThoi + solist + dongia + thanhtien + timechot + tongsolit +  tong_time + tong_solittichluy;

    });
    header += "</tr>";
    timeTucThoi += "</tr>";
    solist += "</tr>";
    dongia += "</tr>";
    thanhtien += "</tr>";
    timechot += "</tr>";
    tongsolit += "</tr>";
    tongsotien += "</tr>";

    tong_time += "</tr>";
    tong_solittichluy+="</tr>"
    sum = tenTramHead + header + timeTucThoi + solist + dongia + thanhtien + timechot + tongsolit +   tong_time + tong_solittichluy;

    $('#tbl_cotxang_home').append(sum);

    $(".viewLichSuChot_home").each(function () {
        $(this).click(function () {
            var macot = $(this).attr("macot");
            f_ChuyenTrangLoadLichSuCot(macot);
            f_ChuyenTrangLoadtly(macot);
            f_Chuyentranglichsuchot(macot);
        });

    });
}

function removeNull_home(val)
{
    if (val==null ||  val == undefined || val == "null" )
        return "-";
    else
        return val;
}

function loadThongTinThayDoi_home() {
    try {
        var config = { namesql: "PKG_HOME.GETINFOCOT", callback: "f_result_loadThongTinThayDoi_home", connstr: "ConnOracleXangDau" };
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var para = { V_DONVI: infotree.code };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loadThongTinThayDoi_home(config, para, lst) {
    
    if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
        return;
    }
    $.each(lst.data, function (key, val) {
        //$(".thaytrangthai_"+ val.macot).removeClass()
        $(".thaythoidiemdoc_" + val.macot).text(removeNull_home(val.thoidiemcuoi));
        $(".thaysolit_" + val.macot).text(removeNull_home(val.solitban));
        $(".thaydongia_" + val.macot).text(removeNull_home(val.dongia));
        $(".thaythanhtien_" + val.macot).text(removeNull_home(val.thanhtien));
        $(".thaythoidiemchot_" + val.macot).text(removeNull_home(val.thoidiem_chot));
        $(".thaytongsolitchot_" + val.macot).text(removeNull_home(val.tonglit_chot));
        $(".thaytongtienchot_" + val.macot).text(removeNull_home(val.tongtien_chot));

        $(".thaythoidiemtongtichluy_" + val.macot).text(removeNull_home(val.thoidiem_tonglittichluy));
        $(".thaytongsolittongtichluy_" + val.macot).text(removeNull_home(val.tong_littichluy));
    });
}


//function numbereffect() {
//    $('.count').each(function () {
//        var i = 1;
//        var num = get_chiso(i);
//        var new_num = parseInt(num,0)+15;
//        $(this).prop('Counter', num).animate({
//            Counter: new_num
//        }, {
//            duration: 2000,
//            easing: 'swing',
//            step: function (now) {
//                $(this).text(Math.ceil(now));
//            }
//        });
//        i++;
//    });

//    $('.count_tl').each(function () {
//        var i = 1;
//        var num = $(this).text();
//        var new_num = (parseInt($('#cot_'+i).text(), 0) + 15) * 17480;
//        $(this).prop('Counter', num).animate({
//            Counter: new_num
//        }, {
//            duration: 2000,
//            easing: 'swing',
//            step: function (now) {
//                $(this).text(Math.ceil(now));
//            }
//        });
//        i++;
//    });
//}

//function get_chiso(id) {
//    var chiso = $('#cot_' + id).text();
//    return chiso;
//}

