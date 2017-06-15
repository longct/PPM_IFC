$(document).ready(function () {
    try {
        loadConetent();
        loadThongTinCot_home();

        var Looper = setInterval(function () {
            //loadThongTinThayDoi_home();
        }, 5000);
    } catch (e) {
        console.log(e);
    }
});

function f_loadChangeTree() {
    loadThongTinCot_home();
}
var clickTab_home = "module/lichsuvoibom";
function f_reloadCss_home() {
    try {
        var height = $(window).height();
        $(".row1").css("max-height", height - 220);
        $(".voixang").css("height", $(".tab_chiso").height());

        var lineHeight = $(".voixang").height() / 3;
        //$(".tab_chiso").css("width", $(".col-lg-3").width() / 2 - 52);
        //$(".cotdon .voixang .tab_chiso").css("width", $(".col-lg-3").width() - 70);

        $("div").tooltip();
        console.log("load thong tin");
        $(".t_chiso").click(function () {
            console.log("chi so");
            try {
                var idvoi = $(this).attr("value");

                $('#Tab_Lichsu_home').modal('show');
                localStorage.setItem("idvoiclick", idvoi);
                if (clickTab_home == "module/lichsuvoibom") {
                    try {
                        f_load1VoiBom_lsvb();
                    } catch (e) { }
                }
                if (clickTab_home == "module/lichsuchottram") {
                    try {
                        f_loadchotbom1VoiBom_lsct();
                    } catch (e) { }
                }
                if (clickTab_home == "module/lichsusukien") {
                    var p = getAllIdMod();
                    try {
                        load_lichsuchottram(p, 1);
                    } catch (e) { }
                }
                if ($.isFunction(f_loadInfo_lhct))
                    f_loadInfo_lhct(idvoi);
            } catch (e) { console.log(e); }
        });
        $(".cb_voixang").click(function () {
            console.log("cock canh bao");
            $('#Tab_Lichsucanhbao_home').modal('show');
            var idvoi = $(this).attr("value");
            localStorage.setItem("idvoiclick", idvoi);
            var p = getAllIdMod();
            if ($.isFunction(load_lichsucanhbao_lscb))
                load_lichsucanhbao_lscb(p, 1);
            if ($.isFunction(f_loadInfo_tabcanhbao))
                f_loadInfo_tabcanhbao(idvoi);
        });
        $(".linktomod").click(function () {
            localStorage.removeItem("idvoiclick");
        });
    } catch (e) { console.log(e); }
}

function loadThongTinCot_home() {
    try {
        messInfo("messinfo_home", "", "error");
        $('#grv_home').empty();
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
        console.log(lst);
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
            messInfo("messinfo_home", "Không có dữ liệu hiển thị", "error");
            return;
        }

        var lstType = [];
        var type = "";
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
                var subType = arrayType.slice(i * 5, (i + 1) * 5);
                drowGrid_home(subType);
            }
        });
        f_reloadCss_home();
    } catch (e) {
        console.log(e);
    }
}
var nextCot = 0;
var tieuDeCot = "";
var cotChanLe = "";
var voiChan = "";
var voiLe = "";
var sum = "";
function drowGrid_home(data) {
    try {
        $.each(data, function (key, val) {

            var loaicot = parseInt(val.loaicot);
            if (nextCot == 0) {
                tieuDeCot = '<div class="col-lg-3">' +
                    '<div class="cot_header">' + removeNull_home(val.tencot) + '</div>';
            }
            if (loaicot > 1) // voi doi
            {
                if (nextCot % 2 == 0) {
                    voiChan += f_loadData1Voi_home(val);
                    // nextCot++;
                }
                else {
                    voiLe += f_loadData1Voi_home(val);
                    //
                }

                nextCot = nextCot + 1;
                if (nextCot >= loaicot) {
                    sum = tieuDeCot + '<div class="cotxang voitrai">' + voiLe + "</div>" + '<div class="cotxang voiphai">' + voiChan + "</div></div>";
                    $("#grv_home").append(sum);
                    nextCot = 0;
                    tieuDeCot = "";
                    chanLe = "";
                    voiChan = "";
                    voiLe = "";
                    
                }

            }
            else // voi don
            {
                tieuDeCot = '<div class="col-lg-3">' +
                   '<div class="cot_header">' + removeNull_home(val.tencot) + '</div>';

                voiChan = '<div class="cotxang cotdon">';
                voiChan += f_loadData1Voi_home(val);
                voiChan += ' </div>';
                $("#grv_home").append(tieuDeCot + voiChan + " </div>");
                nextCot = 0;
                tieuDeCot = "";
                chanLe = "";
                voiChan = "";
                voiLe = "";
               
            }

           
        });
    } catch (e) { console.log(e); }
}

function f_loadData1Voi_home(val) {
    try {
        var str = '  <div class="voixang_new " title="' + removeNull_home(val.tenvoibom)  + '" value="' + removeNull_home(val.id_mavoi) + '">'
            + '<table class=" table table-responsive tab_chiso"  >'
                + '<tr class="loaixang_head ' + removeNull_home(val.kyhieu) + '">'
                + '    <td>'
                + '        <div class="cb_voixang ' + removeNull_home(val.trangthai_online) + '" value="' + removeNull_home(val.id_mavoi) + '" title="' + (removeNull_home(val.trangthai_online) == "ketnoi" ? "Bình thường" : "Cảnh báo") + '"></div>'
                + '        <div class="loaixang_ "><span>' + subten(removeNull_home(val.tenvoibom)) + " - " + val.kyhieu + '</span></div>'
                + '    </td>'
                + ' </tr>'
                + ' <tr class="t_chiso" value="' + removeNull_home(val.id_mavoi) + '" >'
                + '      <td class="a_r"><span class="cs thanhtien thaythanhtien_' + removeNull_home(val.id_mavoi) + '>">' + removeNull_home(val.thanhtien) + '</span></td>'
                + '  </tr>'
                + '  <tr class="t_chiso" value="' + removeNull_home(val.id_mavoi) + '" >'
                + '     <td class="a_r"><span class="cs solit thaysolit_' + removeNull_home(val.id_mavoi) + '>">' + removeNull_home(val.solitban) + '</span></td>'
                + ' </tr>'
                + '  <tr class="t_chiso" value="' + removeNull_home(val.id_mavoi) + '" >'
                + '     <td class="a_r"><span class="cs dongia thaydongia_' + removeNull_home(val.id_mavoi) + '>">' + removeNull_home(val.dongia) + '</span></td>'
              + '  </tr>'
           + ' </table>'
      + '  </div>'


        //var str = '<div class="voixang_new" title="' + removeNull_home(val.tenvoibom) + '" value="' + removeNull_home(val.id_mavoi) + '">' +
        //                '<table class="table table-responsive"  value="' + removeNull_home(val.id_mavoi) + '" >' +
        //                '<tr class="loaixang_head ' + removeNull_home(val.kyhieu) + '">' +
        //                    '<td>' +
        //                        '<div class="cb_voixang ' + removeNull_home(val.trangthai_online) + '" title="' + (removeNull_home(val.trangthai_online) == "ketnoi" ? "Bình thường" : "Cảnh báo") + '"></div>' +
        //                        '<div class="loaixang_ "><span>' + removeNull_home(val.tenvoibom) + '</span></div>' +
        //                    '</td>' +
        //                '</tr>' +
        //                '<tr>' +
        //                    '<td class="a_r"><span class="cs thanhtien thaythanhtien_' + removeNull_home(val.id_mavoi) + '">' + removeNull_home(val.thanhtien) + '</span></td>' +
        //                '</tr>' +
        //                '<tr>' +
        //                    '<td class="a_r"><span class="cs solit thaysolit_' + removeNull_home(val.id_mavoi) + '">' + removeNull_home(val.solitban) + '</span></td>' +
        //                '</tr>' +
        //                '<tr>' +
        //                    '<td class="a_r"><span class="cs dongia thaydongia_' + removeNull_home(val.id_mavoi) + '">' + removeNull_home(val.dongia) + '</span></td>' +
        //                '</tr>' +
        //                '<div class="thanhtien chiso "><label class="labelchiso thaythanhtien_' + removeNull_home(val.id_mavoi) + '"</label>' + removeNull_home(val.thanhtien) + '</div>' +
        //                    '<div class="solit chiso "><label class="labelchiso thaysolit_' + removeNull_home(val.id_mavoi) + '"</label>' + removeNull_home(val.solitban) + '</div>' +
        //                    '<div class="dongia chiso "><label class="labelchiso thaydongia_' + removeNull_home(val.id_mavoi) + '"</label>' + removeNull_home(val.dongia) + '</div>' +
        //                '</table>' +
        //            '</div>';
        return str;
    } catch (e) { console.log(e); }
}


function removeNull_home(val) {
    try {
        if (val == null || val == undefined || val == "")
            return "-";
        else
            return val;
    } catch (e) { console.log(e); }
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
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined || lst.data.length == 0) {
            return;
        }
        $.each(lst.data, function (key, val) {
            $(".thaysolit_" + val.id_mavoi).text(removeNull_home(val.solitban));
            $(".thaydongia_" + val.id_mavoi).text(removeNull_home(val.dongia));
            $(".thaythanhtien_" + val.id_mavoi).text(removeNull_home(val.thanhtien));
        });
    } catch (e) { console.log(e); }
}
function subten(ten) {
    if (ten.length >= 12) {
        return ten.substring(0, 11) + "...";
    } else {
        return ten;
    }
    
}