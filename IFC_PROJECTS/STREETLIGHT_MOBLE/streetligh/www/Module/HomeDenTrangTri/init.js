var group = [];
$(document).ready(function () {
    try {
      
        loadConetent();
        f_khoitaosukien_home_dtt();
        f_loadMultyTu_home_dtt();
        loadchecklog_master();
        $("#checktatca").click(function () {
            if ($(this).hasClass("checktu")) {
                $(this).removeClass("checktu");
                $("input:checkbox").attr('checked', false);
                $(".tu_panel").removeClass('tuseselect');
                $("input:checkbox").css('opacity', '0');
                $(this).html("Chọn tất cả");
                countcheck();
            }
            else {
                $(this).addClass("checktu");
                $("input:checkbox").attr('checked', true);
                $("input:checkbox").css('opacity', '1');
                $(".tu_panel").addClass('tuseselect');
                $(this).html("Bỏ chọn");
                countcheck();
            }
        });

        $("#thanhlydtt").click(function () {
            f_confimYesNo("Bạn chắc chắn muốn thanh lý", "Bỏ qua", "Xác nhận", function () {
                f_thanhlydtt();
            });
        });

    }
    catch (e) { console.log(e); }
});
function f_thanhlydtt() {
    try{
        var lstId = [];
        // var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        $(".tuseselect").each(function () {
            var ID = {
                cot1: $(this).attr("valueId"),
                cot2: "DKTHANHLYDENTT"
            };
            lstId.push(ID);
        });

        var config = {
            connstr: "ConnectOracleStreetLight",
            insertto: "TEMP_NHIEUCOT",
        }
        var table = {
            table: JSON.stringify(lstId)
        };
        var lst = ExecuteBulkCopyOracle(config, table);

        if (lst != null) {
            Capnhatthanhlydtt();
        }
        else
            messInfo("messinfo_homethanhlydtt", lst, "error");


    } catch (e) {
        console.log(e);
    }
}
function Capnhatthanhlydtt() {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));

        var config = { namesql: "PKG_QUANLYTU.THANHLYDENTRANGTRI", callback: "f_result_Capnhatthanhlydtt", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_Capnhatthanhlydtt(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_homethanhlydtt", row, "ok");
            setTimeout(function () {
                f_loadMultyTu_home_dtt();
                messInfo("messinfo_homethanhlydtt", '', "ok");
            }, 1000);
        } else {
            messInfo("messinfo_homethanhlydtt", row, "error");
            setTimeout(function () {
                messInfo("messinfo_homethanhlydtt", '', "ok");
            }, 1000);
        }

    } catch (e) {
        console.log(e);
    }
}



function f_loadChangeFilter() {
    try {
   
        f_loadMultyTu_home_dtt();
    } catch (e) {
        console.log(e);
    }
}

function f_khoitaosukien_home_dtt() {
    try {
        var wrapper_w = $(".wrapper").width();
        var wrapper_h = $(".wrapper").height();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $(".tu_panel").css("width", wrapper_w - 60);
            $(".tu_panel").css("height", wrapper_w - 40);
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
            var select = $(this).context.firstElementChild.id;
            $("#" + select).css("opacity", 1);
        }
        function handlerOut() {
            var select = $(this).context.firstElementChild.id;
            if (!$("input#" + select + ":checked").size() > 0) {
                $("#" + select).css("opacity", 0);
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
        $(".dongcatpha_home_dtt").click(function () {
            var lstId = [];
            $(".tuseselect").each(function () {
                var ID = { id: $(this).attr("valueId"), ten: "THIẾT LẬP ĐÓNG CẮT CHẾ ĐỘ CỦA ĐÈN TRANG TRÍ TRONG NGÀY", matthietlap: "", loaithietbi: "dentrangtri" };
                lstId.push(ID);
            });
            f_loadInfoOne_Dkttd(lstId);

            var infoo = {
                loaidk: "PHA",
                loaithietbi: "DENTRANGTRI",
                loaichedo: "TUDONG"
            }
            //$(".chuyenloai").hide();
            localStorage.setItem("infodk", JSON.stringify(infoo));
        });

        $(".bt_logout").click(function () {
            localStorage.removeItem("userinfo");
            loadchecklog_master();

        })

        $(".tucthoi_home_dtt").click(function () {
            var lstId = [];
            $(".tuseselect").each(function () {
                var ID = { id: $(this).attr("valueId"), ten: "THIẾT LẬP TỨC THỜI ĐÈN TRANG TRÍ ĐIỆN" };
                lstId.push(ID);
            });
            f_loadInfoOne_Dktptt(lstId);
            var infoo = {
                loaidk: "PHA",
                loaithietbi: "DENTRANGTRI",
                loaichedo: "TUCTHOI"
            }

            localStorage.setItem("infodk", JSON.stringify(infoo));
        });

        $("#huychon_home_dtt").click(function () {
            $("input:checkbox").attr('checked', false);
            $(".tu_panel").removeClass('tuseselect');
            countcheck();
        });


        $(".dongcatpha_home_dtt_1tu").click(function () {
            var lstId = [];
            var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP CHẾ ĐỘ CỦA ĐÈN TRANG TRÍ TRONG NGÀY", mathietlap: "", loaithietbi: "dentrangtri" };
            lstId.push(ID);
            //console.log(lstId);
            f_loadInfoOne_Dkttd(lstId);

            var infoo = {
                loaidk: "PHA",
                loaithietbi: "DENTRANGTRI",
                loaichedo: "TUDONG"
            }
            localStorage.setItem("infodk", JSON.stringify(infoo));
        });

        $(".tucthoi_home_dtt_1tu").click(function () {
            var lstId = [];
            var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP TỨC THỜI ĐÈN TRANG TRÍ" };
            lstId.push(ID);
            //console.log(lstId);
            f_loadInfoOne_Dktptt(lstId);
            var infoo = {
                loaidk: "PHA",
                loaithietbi: "DENTRANGTRI",
                loaichedo: "TUCTHOI"
            }

            localStorage.setItem("infodk", JSON.stringify(infoo));
        });
    } catch (e) {
        console.log(e);
    }
}
function f_loadMultyTu_home_dtt() {
    try {
        var filter = localStorage.getItem("infofilter");
        var filterJson = null;
        if (filter != null || filter != undefined)
            filterJson = JSON.parse(filter);
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_HOME_DTT.LOADMULTYTU",
            callback: "f_result_loadMultyTu_home_dtt"
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
function f_result_loadMultyTu_home_dtt(config, para, lst) {
    try {
        $("#list_tu_dtt").empty();
   
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.data.length == 0) {
            f_loadSum_HomeDtt();
            return;
        }
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

         $.each(group, function (key, val) {
             createGroup_dtt(JSON.parse(val).code, JSON.parse(val).tendonvi);
        });
       
         $.each(lst.data, function (key, val) {
             var row = f_addOneTu_home_dtt(val.id, val.time, val.tenden, val.trangthai);
             $("#nhom_dtt"+val.code).append(row);
         });

        f_khoitaosukien_home_dtt();
        f_loadSum_HomeDtt();

    } catch (e) { console.log(e); }
}

function f_loadSum_HomeDtt() {
    try{
        var numItems = $('.lightOn').length/2;
        var matketnoi = $('.lightOff').length/2;
        var tongsotu = $('.led').length;
        var canhbao = $('.warning1').length;


        localStorage.setItem('sum_dtt', '{ "tong": "' + tongsotu + '", "mkn": "' + matketnoi + '", "kn": "' + numItems + '", "cb": "' + canhbao + '" }');
        var sum = JSON.parse(localStorage.getItem("sum_dtt"));
        //Hiển thị thông tin số lượng tủ
        $(".ketnoi").text(sum.kn);
        $(".matketnoi").text(sum.mkn);
        $(".tongsotu").text(sum.tong);
        $(".canhbao").text(sum.cb);
      } catch (e) {
            console.log(e);
        }
}
function f_addOneTu_home_dtt(id, time, tentu, trangthai) {
    try {
     
        var str = ' <div class="tu_panel "  valueId="' + id + '">' +
            '<input type="checkbox"  name="checkbox" id="sl' + id + '" />' +
            '<table class="table tudien">' +
              '  <tr>' +
           '      <th colspan="4"><a href="#" data-toggle="tooltip" data-placement="bottom" title="' + tentu + '">' +
                   '     ' + tentu.substring(0, 23) + '...</a><div class="led ' + trangthai + ' "></div>' +
                    '    </th>' +
             '   </tr>' +
            '    <tr>' +                                                          
             '       <td>' +
              '          <div class="' + setnull(trangthai) + ' tudentrangtri"></div>' +
             '       </td>' +
              '  </tr>' +
             '   <tr>' +
             '       <td>' + setnull(time) + '</td>' +
            '    </tr>' +
          '  </table>' +
          '  <ul>' +
            '    <li class="tu_act" id="tu_cb">' +
            '        <img src="img/canhbao-icon0.png" />' +
            '    </li>' +
            '    <li class="tu_act " >' +
            '<a data-toggle="modal" href="#DieuKhien_Pha_TuDong">' +
            '        <img class="dongcatpha_home_dtt_1tu"  value="' + id + '"  src="img/setting-icon0.png" />' +
            '</a>' +
             '   </li>' +
             '   <li class="tu_act"  value=' + id + '>' +
             '<a data-toggle="modal" href="#DieuKhien_Pha_TucThoi">' +
              '      <img class="tucthoi_home_dtt_1tu"  value=' + id + ' src="img/tucthoi.png" />' +
              '</a>' +
              '  </li>' +
         '   </ul>' +
      '  </div>';
        $('.tudien tr th [data-toggle="tooltip"]').tooltip();
        return str;
    } catch (e) { console.log(e); }
}

function countcheck() {
    try {
        var count = $("[type='checkbox']:checked").length;
        $(".soluong").text(count);
        if (count > 0) {
            $("#act_home_dtt").slideDown();
        } else {
            $("#act_home_dtt").hide();
        }

    } catch (e) {
        console.log(e);
    }
}

function createGroup_dtt(code, name) {
    try {
        var str = "<div id='nhom_dtt" + code + "' class='grouptu'>" +
            "<div class='groupname'>" + name + "</div>" +
            "</div>";
        $("#list_tu_dtt").append(str);
    } catch (e) {
        console.log(e);
    }

}