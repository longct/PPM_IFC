var group = [];
$(document).ready(function () {
    try
    {
        loadConetent();
        f_khoitaosukien_home();
        f_loadMultyTu_home();
        $("#refreshAll").click(function () {
            f_loadMultyTu_home();
        });
        $("#checktatca").click(function () {
            //console.log($(this).hasClass("checktu"));
            if ($(this).hasClass("checktu")) {
                $(this).removeClass("checktu");
                $("input:checkbox").prop('checked', false);
                $(".tu_panel").removeClass('tuseselect');
                $("input:checkbox").css('opacity', '0');
                $(this).html("<i class ='fa  fa-check-square'></i>Chọn tất cả");
                countcheck();
            }
            else {
                $(this).addClass("checktu");
                $("input:checkbox").prop('checked', true);
                $("input:checkbox").css('opacity', '1');
                $(".tu_panel").addClass('tuseselect');
                $(this).html("Bỏ chọn");
                countcheck();
            }
        });
        
    }
    catch (e) { console.log(e); }
});

function f_loadChangeFilter() {
    try {
      
        f_loadMultyTu_home();

    } catch (e) {
        console.log(e);
    }
}

function f_khoitaosukien_home() {
    try{
    var wrapper_w = $(".wrapper").width();
    var wrapper_h = $(".wrapper").height();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".tu_panel").css("width", wrapper_w - 60);
        $(".tu_panel").css("height", wrapper_w / 3.5);
        $(".tu_panel").css("font-size", 15);
        $(".panel").css("max-height", wrapper_h - 7);
        $(".tu_act img").css("width", 30);
        $(".tu_panel ul li img").css("margin-right", 10);
        $(".log_title").hide();
        $(".act_btn span").hide();
        $(".action_bar").css("bottom", 66);
        $(".soluong").css("padding-right", 9);
        $(".soluong").css("margin-left", 0);
        $("#nameTitle").hide();
        $('#thietlapcb a').text('Thiết lập');
        $('#lsthietlap a').text('lịch sử');
        $(".notify-row").css("margin-left", 15);
        $(".site-footer").css("position", "fixed");
        
        
        

    } else {
        $(".tu_panel").css("width", wrapper_w / 5.5);
        $(".tu_panel").css("height", wrapper_h / 4 + 120);
        $(".tu_panel").css("font-size", wrapper_w / 5.5 / 18);
        $(".panel").css("max-height", wrapper_h - 7);
        $(".tu_act img").css("width", 30);
    }

    

    $(".tu_panel").hover(handlerIn, handlerOut);
    function handlerIn() {
        try{
            var select = $(this).context.firstElementChild.id;
            $("#" + select).css("opacity", 1);
        } catch (e) {
            console.log(e);
        }
    }
    function handlerOut() {
        try{
            var select = $(this).context.firstElementChild.id;
            if (!$("input#" + select + ":checked").size() > 0) {
                $("#" + select).css("opacity", 0);
            }
        } catch (e) {
            console.log(e);
        }
    }

    $(".table").click(function () {
        
        var id = $(this).parent().attr("valueid");

        if ($("#sl" + id).is(":checked")) {
            $("#sl" + id).prop("checked", false);
            $(this).parent().removeClass("tuseselect");
        } else {
            $("#sl" + id).prop("checked", true);
            $(this).parent().addClass("tuseselect");
        }
        countcheck();

    });
    $(".tu_panel input").click(function () {
        var id = $(this).attr("id").replace("sl", "");
        if ($("#sl" + id).is(":checked")) {
            $("#sl" + id).parent().addClass("tuseselect");
        } else {
            $("#sl" + id).parent().removeClass("tuseselect");
        }
        countcheck();
    });
    $(".dongcatpha_home").click(function () {
        var lstId = [];
        $(".tuseselect").each(function () {
            var ID = { id: $(this).attr("valueId"), ten: "THIẾT LẬP ĐÓNG CẮT PHA CỦA TỦ TRONG NGÀY" };
            lstId.push(ID);
        });
       
        f_loadInfoOne_Dkttd(lstId);

        var infoo = {
            loaidk: "PHA",
            loaithietbi: "TU",
            loaichedo: "TUDONG"
        }
        $(".chuyenloai").css("display", "block");
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });
    $(".muccongsuat_home").click(function () {
        var lstId = [];
        $(".tuseselect").each(function () {
            var infoo = { id: $(this).attr("valueId"), ten: "THIẾT LẬP DIM TOÀN BỘ BÓNG THUỘC TỦ" };
            lstId.push(infoo);
        });
              
        f_loadInfoOne_Dktdtd(lstId);
        var infoo = {
            loaidk:"DIM",
            loaithietbi:"TU",
            loaichedo:"TUDONG"            
        }
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });

    $(".dimtucthoi_home").click(function () {
        var lstId = [];
        $(".tuseselect").each(function () {
            var infoo = { id: $(this).attr("valueId"), ten: "THIẾT LẬP DIM TỨC THỜI TOÀN BỘ BÓNG THUỘC TỦ" };
            lstId.push(infoo);
        });
     
        f_loadInfoOne_Dkdtt(lstId);
        var infoo = {
            loaidk: "DIM",
            loaithietbi: "TU",
            loaichedo: "TUCTHOI"
        }
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });


    $(".bt_logout").click(function () {
        localStorage.removeItem("userinfo");
        loadchecklog_master();

    })


    $(".chitietbong_home").click(function () {
        
        var id = $(this).attr("value");
        var chitiettu = { id: id, userinfo: JSON.parse(localStorage.getItem("userinfo")) };
        localStorage.setItem("chitiettu", JSON.stringify(chitiettu));
    });

    $(".tucthoi_home").click(function () {
        var lstId = [];
        $(".tuseselect").each(function () {
            var ID = { id: $(this).attr("valueId"), ten:  "THIẾT LẬP TỨC THỜI TỦ ĐIỆN"  };
            lstId.push(ID);
        });
        f_loadInfoOne_Dktptt(lstId);
        var infoo = {
            loaidk: "PHA",
            loaithietbi: "TU",
            loaichedo: "TUCTHOI"
        }
        
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });

    $("#huychon_home").click(function () {
        $("input:checkbox").attr('checked', false);
        $(".tu_panel").removeClass('tuseselect');
        countcheck();
    });

    } catch (e) {
        console.log(e);
    }
}


function f_loadMultyTu_home() {
    try {
        var filter = localStorage.getItem("infofilter");
        var filterJson= null;
        if (filter != null || filter != undefined)
         filterJson = JSON.parse(filter);
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_HOME.LOADMULTYTU",
            callback: "f_result_loadMultyTu_home"
        }
        var para = {
            V_ID_NHOM: filter == null || filter == undefined ? "-1" : filterJson.nhom,
            V_TIMKIEM: filter == null || filter == undefined ? "" : filterJson.timkiem,
            V_TRANGTHAI: filter == null || filter == undefined ? "-1" : filterJson.trangthai,
            V_CANHBAO: filter == null || filter == undefined ? "-1" : filterJson.canhbao
        }
     
        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }

}
function f_result_loadMultyTu_home(config, para, lst) {
    try {
        var data = lst.data;
        var i = 0;
        var stringA = [];
        group.length = 0;
        $.each(data, function (key, val) {
            if (jQuery.inArray(val.code, stringA) > -1) {
                //console.log("Dupp!");
            } else {
                stringA.push(val.code);
                var string = JSON.stringify({ code: val.code, tendonvi: val.tendonvi });
                group.push(string);
            }
      
            i++;
        });


        $("#list_tu").empty();
        $.each(group, function (key, val) {
            createGroup(JSON.parse(val).code, JSON.parse(val).tendonvi);
        });
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.data.length == 0) {
            f_loadSum_home();
            return;
        }

        $.each(lst.data, function (key, val) {
            var row = f_addOneTu_home(val.id, val.time, val.tenkhachhang, val.ua, val.ub, val.uc, val.ia, val.ib, val.ic, val.cos3pha, val.p3pha, val.trangthai, val.cosa, val.cosb, val.cosc,val.trangthai3pha);
            $("#nhom"+val.code).append(row);
        });

        $(".groupname").click(function () {
            var divId = $(this).parent()[0].id;
            $("#" + divId).toggleClass("mini");
            $("#" + divId + " .tu_panel").toggle();

        });

        //$("#checkAllGroup").click(function () {
        //    console.log($(this).parent().parent());
        //    var divId = $(this).parent().parent()[0].id;
        //    console.log('#' + divId + 'input:checkbox');
        //    $('#' + divId + ' input:checkbox').not(this).prop('checked', this.checked);

        //    countcheck();
        //});

        f_khoitaosukien_home();
        f_loadSum_home();
    } catch (e) { console.log(e); }
}

function f_loadSum_home()
{
    try{
    var numItems = $('.connect').length;
    var matketnoi = $('.disconnect').length;
    var tongsotu = $('.led').length;
    var canhbao = $('.warning1').length;

    localStorage.setItem('sum', '{ "tong": "' + tongsotu + '", "mkn": "' + matketnoi + '", "kn": "' + numItems + '", "cb": "' + canhbao + '" }');
    var sum = JSON.parse(localStorage.getItem("sum"));
    //Hiển thị thông tin số lượng tủ
    $(".ketnoi").text(sum.kn);
    $(".matketnoi").text(sum.mkn);
    $(".tongsotu").text(sum.tong);
    $(".canhbao").text(sum.cb);
    } catch (e) {
        console.log(e);
    }
}

function f_addOneTu_home(id, time, tentu, ua, ub, uc, ia, ib, ic, cos, p, trangthai, cosa, cosb, cosc, trangthai3pha) {
    try {
        var str = '<div class="tu_panel"  valueId="' + id + '" style="width: 270px; font-size: 15px;">' +
                '<input name="checkboxlist" type="checkbox"  id="sl' + id + '" style="opacity: 1;">' +
                '<table class="table tudien">'+
                    '<tbody>'+
                        '<tr>'+
                            '<th class="">'+
                                '<a class="linktomod chitietbong_home" href="#Module/chitietbong"  value ="' + id + '">' +
                                    '<i class="fa fa-info-circle"></i>'+
                                '</a>'+
                            '</th>'+
                            '<th class="">'+
                                '<a href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="' + tentu + '">' +
                                    '' + (tentu == null || tentu == undefined ? "Chưa khai báo" : tentu.substring(0, 23)) +
                                '</a>'+
                                '<div  class="led ' + trangthai + ' "></div>' +
                            '</th>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="2">'+
                                '<div id="phaA" class="' + (trangthai3pha == null || trangthai3pha.charAt(0) == "0" ? "phaOff" : "phaOn") + '"></div>' +
                                '<div id="phaB" class="' + (trangthai3pha == null || trangthai3pha.charAt(1) == "0" ? "phaOff" : "phaOn") + '"></div>' +
                                '<div id="phaC" class="' + (trangthai3pha == null || trangthai3pha.charAt(2) == "0" ? "phaOff" : "phaOn") + '"></div>' +
                            '</td>'+
                        '</tr>'+
                    '</tbody>'+
                '</table>'+
            '</div>';

                $('.tudien tr th [data-toggle="tooltip"]').tooltip();

                    return str;

        //var str = ' <div class="tu_panel" valueId="' + id + '">' +
        //        '<input name="checkboxlist" type="checkbox" id="sl' + id + '" />' +
        //        '<table class="table tudien">' +
        //         '   <tr>' +
        //          '      <th colspan="4"><a href="#" data-toggle="tooltip" data-placement="bottom" title="' + tentu + '">' +
        //           '     ' + (tentu == null || tentu == undefined ? "Chưa khai báo" : tentu.substring(0, 23)) + '</a>' +
        //           '<a class="linktomod chitietbong_home" href="#Module/chitietbong" value ="' + id + '"><i class="fa fa-info-circle"></i></a>' +
        //           '<div class="led ' + trangthai + ' "></div>' +
        //            '    </th>' +
        //            '</tr>' +
        //            '<tr>' +
        //             '   <td class="th"></td>' +
        //              '  <td class="th"><div id="phaA" class="' + (trangthai3pha ==null || trangthai3pha.charAt(0) == "0" ? "phaOff" : "phaOn") + '" /></td>' +
        //              '  <td class="th"><div id="phaB" class="' + (trangthai3pha ==null || trangthai3pha.charAt(1) == "0" ? "phaOff" : "phaOn") + '" /></td>' +
        //              '  <td class="th"><div id="phaC" class="' + (trangthai3pha ==null || trangthai3pha.charAt(2) == "0" ? "phaOff" : "phaOn") + '" /></td>' +
        //            '</tr>' +
        //        '</table>' +
        //    '</div>';
        //$('.tudien tr th [data-toggle="tooltip"]').tooltip();


        //return str;

    } catch (e) { console.log(e);}
}
function repa(val) {
    try {
        var tet = val.split('.')
        if (tet[0].length == 0) {
            return "0" + val;
        } else {
            return val;
        }
       

    } catch (e) {
        console.log(e);
    }
}

function countcheck() {
    try{
        var count = $("[type='checkbox']:checked").length;
        $(".soluong").text(count);
        if (count > 0) {
            $("#act_home").slideDown();
        } else {
            $("#act_home").hide();
        }
    } catch (e) {
        console.log(e);
    }
}

function createGroup(code, name) {
    try{
        var str = "<div id='nhom" + code + "' class='grouptu'>" +
            //"<div class='checkGroup'><input type='checkbox' id='checkAllGroup'/></div>" +
            "<div class='groupname'>"+name+"</div>" +
            "</div>";
        $("#list_tu").append(str);
    } catch (e) {
        console.log(e);
    }
    
}
