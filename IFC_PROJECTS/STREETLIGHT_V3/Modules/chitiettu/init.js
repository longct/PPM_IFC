$(document).ready(function () {
    try {
        //$("#boxchitiettu .panel-refresh").on("click", function () {
        //    var panel = $(this).parents(".panel");
        //    panel_refresh(panel, "shown", showChitiet);

        //    setTimeout(function () {
        //        panel_refresh(panel);
        //    }, 2000);

        //    $(this).parents(".dropdown").removeClass("open");
        //    return false;
        //});
        $('[data-toggle="tooltip"]').hover(function () {
            $(".tooltip-inner").hide();
        })
    } catch (e) {
        console.log(e);
    }

});
var chedo = "";
function showChitiet(id_ar) {
    try {
        //console.log('id_ar');   
        //console.log(id_ar);

        if (id_ar.length == 0) {
            $("#chitiettu_slide").empty();
            $("#link_page").empty();
            $("#chitiettu_slide").html('<span class="text-bold">Chưa chọn tủ</span>');
            return;
        }
        else {
            $("#chitiettu_panel").attr("data-ride", "carousel");
            var data = JSON.parse(localStorage.getItem("datat_b"));
            data = unique(data);
            var div = "";
            var link_page = "";
            var i = 0;

            //console.log(id_ar);
            $.each(data, function (key, val) {
                //console.log($.inArray(val.id+"", id_ar));
                //console.log(val.id);
                if ($.inArray(val.id + "", id_ar) != -1) {
                    //console.log(val);
                    get_chedotu(val.id);
                    data_bong = val.bong;
                    var count = 0;
                    var bongtot = 0;
                    var bongchay = 0;
                    var bongmkn = 0;
                    var bongcxd = 0;
                    var bongdim = 0;
                    var bongtat = 0;
                    if (data_bong.length == 0) {
                        count = 0;
                        bongtot = 0;
                        bongchay = 0;
                        bongmkn = 0;
                        bongcxd = 0;
                        bongdim = 0;
                        bongtat = 0;

                    } else {
                        $.each(data_bong, function (bkey, bval) {
                            if (bval.parent == val.id) {
                                count++;
                                if (bval.icon == "bong_tree1") {
                                    bongtot++;
                                }
                                if (bval.icon == "bong_tree2") {
                                    bongmkn++;
                                }
                                if (bval.icon == "bong_tree3") {
                                    bongchay++;
                                }
                                if (bval.icon == "bong_tree5") {
                                    bongmkn++;
                                }
                                if (bval.icon == "dimming") {
                                    bongdim++;
                                }
                                if (bval.icon == "bong_off") {
                                    bongtat++;
                                }
                            }
                        })
                    }

                    if (i == 0) {
                        div += '<div class="item active">' +
                            '<div class="panel-body body-chitiettu">' +
                                '<span class="text-primary"><img src="img/' + getIconTu(val.id) + '.png"/><span class="text-bold"><span class="text-bold text-danger"> ' + getTenTu(val.id) + '  </span><button data-toggle="tooltip" data-placement="bottom" data-original-title="Chi tiết tủ" class="btn btn-info btn-condensed chitiettu_home_1tu" href="#" data-tuid="' + val.id + '" data-target="#Baocao_chitiettu"><i class="fa fa-info-circle"></i></button><br />' +
                                '<span class="text-primary"><i class="glyphicon glyphicon-tags"></i><span class="text-bold"> Tổng số bóng:</span><span class="text-bold text-danger"> ' + count + '  </span> </span><br />' +
                                '<table class="table table-responsive table-bordered" style="border-top:1px solid #ccc">' +
                                '<tr>' +
                                '<td style="text-align:center"><span title="Bóng sáng" class="text-danger text-bold"><img src="img/bong_tree1.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng đang Dim" class="text-danger text-bold"><img src="img/dimming.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng đang Tắt" class="text-danger text-bold"><img src="img/bong_off.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng hỏng" class="text-primary"><img src="img/bong_tree3.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng mất kết nối" class="text-primary"><img src="img/bong_tree2.png" /></span></td>' +
                                //'<td style="text-align:center"><span title="Chưa xác định" class="text-primary"><img src="img/bong_tree5.png" /></span></td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:center">' + bongtot + '</td>' +
                                '<td style="text-align:center">' + bongdim + '</td>' +
                                '<td style="text-align:center">' + bongtat + '</td>' +
                                '<td style="text-align:center">' + bongchay + '</td>' +
                                '<td style="text-align:center">' + bongmkn + '</td>' +
                                //'<td style="text-align:center">' + bongcxd + '</td>' +
                                '</tr>' +
                                '</table>';
                        if (getIconTu(val.id) == "tu_tree5") {
                            div += '<span id="md" class="text-danger">Tủ đang mất điện</span>';
                        }
                        else
                            div += '<span class="text-primary"><i class="fa fa-cogs"></i><span class="text-bold"> Chế độ:</span><br/><span class="text-danger chedotu_home_cb" id="chedotu' + val.id + '"></span></span><br />';
                        div += '</div>';
                        div += '</div>';
                        link_page += '<li data-target="#chitiettu_panel" data-slide-to="' + i + '" class="active"></li>';
                        i++;
                    } else {
                        div += '<div class="item">' +
                                '<div class="panel-body body-chitiettu">' +
                               '<span class="text-primary"><img src="img/' + getIconTu(val.id) + '.png"/><span class="text-bold"><span class="text-bold text-danger"> ' + getTenTu(val.id) + '  </span><button data-toggle="tooltip" data-placement="bottom" data-original-title="Chi tiết tủ" class="btn btn-info btn-condensed chitiettu_home_1tu" href="#" data-tuid="' + val.id + '" data-target="#Baocao_chitiettu"><i class="fa fa-info-circle"></i></button><br />' +
                                '<span class="text-primary"><i class="glyphicon glyphicon-tags"></i><span class="text-bold"> Tổng số bóng:</span><span class="text-bold text-danger"> ' + count + '  </span> </span><br />' +
                                '<table class="table table-responsive table-bordered" style="border-top:1px solid #ccc">' +
                                '<tr>' +
                                '<td style="text-align:center"><span title="Bóng sáng" class="text-danger text-bold"><img src="img/bong_tree1.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng đang Dim" class="text-danger text-bold"><img src="img/dimming.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng đang Tắt" class="text-danger text-bold"><img src="img/bong_off.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng hỏng" class="text-primary"><img src="img/bong_tree3.png" /></span> </td>' +
                                '<td style="text-align:center"><span title="Bóng mất kết nối" class="text-primary"><img src="img/bong_tree2.png" /></span></td>' +
                                //'<td style="text-align:center"><span title="Chưa xác định" class="text-primary"><img src="img/bong_tree5.png" /></span></td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:center">' + bongtot + '</td>' +
                                '<td style="text-align:center">' + bongdim + '</td>' +
                                '<td style="text-align:center">' + bongtat + '</td>' +
                                '<td style="text-align:center">' + bongchay + '</td>' +
                                '<td style="text-align:center">' + bongmkn + '</td>' +
                                //'<td style="text-align:center">' + bongcxd + '</td>' +
                                '</tr>' +
                                '</table>';
                        if (getIconTu(val.id) == "tu_tree5")
                            div += '<span id="md" class="text-danger">Tủ đang mất điện</span>';
                        else
                            div += '<span class="text-primary"><i class="fa fa-cogs"></i><span class="text-bold"> Chế độ:</span><br/><span class="text-danger chedotu_home_cb" id="chedotu' + val.id + '"></span></span><br />';
                        div += '</div>';
                        div += '</div>';
                        link_page += '<li data-target="#chitiettu_panel" data-slide-to="' + i + '"></li>';
                        i++;
                    }
                }
            })

            $("#link_page").empty();
            $("#link_page").append(link_page);
            $("#chitiettu_slide").empty();
            $("#chitiettu_slide").append(div);
            $(".chitiettu_home_1tu").click(function () {
                var ad = $(this).data("tuid");
                var chitiettu = { id: ad, userinfo: JSON.parse(localStorage.getItem("userinfo")) };
                localStorage.setItem("chitiettu", JSON.stringify(chitiettu));
                var id = $(this).data("target");
                $(id).modal("show");
                f_loadTongQuanTu(ad);
                f_loadChiTietBong_tqtctb(ad, '');
            });

        }

    } catch (e) {
        console.log(e);
    }
}


function get_chedotu(tuid) {
    var config = { namesql: "PKG_HOME.LOAD_TRANGTHAITU", callback: "f_result_get_chedotu", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_idtu: tuid
    };
    ////console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_get_chedotu(config, para, lst) {
    //console.log(lst);
    var tt = lst.data[0].tt;
    var countdown = lst.data[0].thoigianconlai;
    var trangthaitu = "";
    var setting = "";
    var ct = [];
    if (tt == null) {
        trangthaitu += '<div id="phaA" class="ctiettu_pha phaOff" ></div>';
        trangthaitu += '<div id="phaB" class="ctiettu_pha phaOff"></div>';
        trangthaitu += '<div id="phaC" class="ctiettu_pha phaOff"></div>';
        $("#chedotu" + para.v_idtu).html(trangthaitu + "<br/>Chưa xác định được chế độ.<br/>");
    } else {

        ct = tt.split(",");

        if (ct[1] == "TUDONG") setting = "Tự động";
            //if (ct[1] == "TUDONG") setting = "Tự động <small class='text-primary'>(Thời điểm bắt đầu: " + ct[2] + ")</small>";
        else if (ct[1] == "TUCTHOI") setting = "Tức thời <small class='text-primary'>(Thời điểm bắt đầu: " + ct[2] + ", còn lại " + f_checknull_ctt(countdown) + " phút.)</small>";
        else setting = "Chưa xác định";
        //setting += (tt.charAt(6) == "D" ? "Tự động" : "Tức thời");
        trangthaitu += '<div id="phaA" class="ctiettu_pha ' + (tt == null || tt.charAt(0) == "0" ? "phaOff" : "phaOn") + '" />';
        trangthaitu += '<div id="phaB" class="ctiettu_pha ' + (tt == null || tt.charAt(1) == "0" ? "phaOff" : "phaOn") + '" />';
        trangthaitu += '<div id="phaC" class="ctiettu_pha ' + (tt == null || tt.charAt(2) == "0" ? "phaOff" : "phaOn") + '" />';
        $("#chedotu" + para.v_idtu).html(trangthaitu + "<br/>" + setting);
    }
}

function f_checknull_ctt(value) {
    try {
        if (value == null || value == undefined)
            return "-"
        if (value == 0 || value == "0")
            return "1"
        return value;
    } catch (e) {
        return value;
    }
}

function getTenTu(id_tu) {
    var tu = JSON.parse(localStorage.getItem("tu_ar"));
    var ten = "";
    $.each(tu, function (key, val) {
        if (val.id == id_tu) {
            ten = val.text;
        }
    })
    return ten;
}

function getIconTu(id_tu) {
    var tu = JSON.parse(localStorage.getItem("tu_ar"));
    var icon = "";
    $.each(tu, function (key, val) {
        if (val.id == id_tu) {
            icon = val.icon;
        }
    })
    //console.log(icon);
    return icon;
}

function getIconBong(id_b) {
    var icon = "";
    var bong = JSON.parse(localStorage.getItem("datat_b"));
    $.each(bong, function (key, val) {
        var lst_b = val.bong;
        $.each(lst_b, function (i, value) {
            if (value.id == id_b)
                icon = value.icon;
        })
    })
    return icon;
}



function unique(obj) {// Hàm remove item trùng trong JSON Array
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function (a, b) { return a - b });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    return uniques;
}