var cliked0 = true;
var cliked3 = true;
var gPTM;
var markerTu_ar = [];
var markerBong_ar = [];
var light_data = [];
var click1 = 0;
var click2 = 0;
var m_bong_cap = [];
var capLine = [];
var doimau = [];
var dumau = [];
var bong_ar = [];
var imageJobSelected = 'img/tu_select.png';
var imageBongSelected = 'img/bong_select.png';
var infowindow = new google.maps.InfoWindow();
var b_flag = false;
$(document).ready(function () {

    $("#btn_help").click(function () {
        var id = $(this).data("target");
        $(id).modal("show");
    });
    $(".panel-full-right").on("click", function () {
        var tree_bak = localStorage.getItem("datat_b");
        if ($(this).parents().parent().hasClass("has-right")) {
            $(this).parents().parent().removeClass("has-right");
            $(".page-content-right").show();
            //setMapOnAllTu(gPTM)
            createMap();
            localStorage.setItem("datat_b", tree_bak);
            bindMarker_tu(gPTM);
            bindMarker_bong(gPTM);
            $("#thongtintu_text").empty();

        } else {
            $(this).parents().parent().addClass("has-right");
            $(".page-content-right").hide();
            //setMapOnAllTu(gPTM)
            createMap();
            localStorage.setItem("datat_b", tree_bak);
            bindMarker_tu(gPTM);
            bindMarker_bong(gPTM);
            showChitiet_map(JSON.parse(localStorage.getItem("tuSelected")));
        }
    });

    $("#tentu_map").change(function () {
        if ($("#tentu_map").is(':checked')) {
            bindMarker_tu(gPTM);
            bindMarker_bong(gPTM);
        }
        else {
            bindMarker_tu(gPTM);
            bindMarker_bong(gPTM);
        }
    })
    $("#chonbong_map").change(function () {
        if (JSON.parse(localStorage.getItem("quan")).length == 0) {
            $("#using_json_2 li[id=" + JSON.parse(localStorage.getItem("tuSelected"))[0] + "] a").click();
        }
        else {
            $("#using_json_2 li[id=" + JSON.parse(localStorage.getItem("quan"))[0] + "] a").click();
        }
        localStorage.setItem("BongSelected", JSON.stringify([]));
        localStorage.setItem("BongSelected_bak", JSON.stringify([]));
        localStorage.setItem("tuSelected", JSON.stringify([]));
        localStorage.setItem("tuSelected_bak", JSON.stringify([]));
        if ($("#chonbong_map").is(':checked')) {
            $(".dimtucthoivaibongthuoctu_home").show();
            $(".dimchedovaibongthuoctu_home").show();
            $(".dimtucthoi_home_1tu").hide();
            $(".muccongsuat_home_1tu").hide();
            b_flag = true;
        }
        else {
            $(".dimtucthoivaibongthuoctu_home").hide();
            $(".dimchedovaibongthuoctu_home").hide();
            $(".dimtucthoi_home_1tu").show();
            $(".muccongsuat_home_1tu").show();
            b_flag = false;
        }
    })
    $("#hiencap_map").change(function () {
        if ($("#hiencap_map").is(':checked')) {
            line = [];
            capLine = [];
            var tid = [];
            var tuid = JSON.parse(localStorage.getItem("tuSelected"));
            getBong_cap();
        }
        else {
            removeLine();
        }
    })
    $("#hienbong_map").change(function () {
        var tree_bak = localStorage.getItem("datat_b");
        if ($("#hienbong_map").is(':checked')) {
            localStorage.setItem("datat_b", tree_bak);
            bindMarker_tu(gPTM);  // checked
            bindMarker_bong(gPTM);
        }
        else {
            bindMarker_tu_only();  // unchecked
            if ($("#hiencap_map").is(':checked')) {
                $("#hiencap_map").click();
            }
        }
    })

    createMap();


    /* Google maps */



});
function createMap() {
    /*TỦ*/
    localStorage.removeItem("datat_b");
    var vpW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var loguser = $(".loguser");
    $("#google_ptm_map").css("height", vpH - $("#row-bottom").height() - 170);

    //alert(($("#gmap").height() - $("#boxchitiettu").height())/3)
    //loguser.css("height", ($("#gmap").height() - $("#boxchitiettu").height()) / 3 - 40);
    loguser.css("max-height", ($("#gmap").height() - 353));
    //loguser.css("max-height", 390);
    //$(".body-chitiettu").css("height",)
    gPTMCords = new google.maps.LatLng(10.633913, 106.741170);
    gPTMOptions = {
        zoom: 15,
        center: gPTMCords,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //draggable: false
        fullscreenControl: true,
        panControl: true
    }
    gPTM = new google.maps.Map(document.getElementById("google_ptm_map"), gPTMOptions);
    gPTM.enableKeyDragZoom();

    google.maps.event.addListener(gPTM, 'click', function () {
        infowindow.close();
    });
    setMapOnAllTu(null);
    setMapOnAllBong(null);
    markerTu_ar = [];
    markerBong_ar = [];
    if (localStorage.getItem("datat_b")) {
        bindMarker_tu();
    }

    //var loadBong = setInterval(bindMarker_bong, 30000);


}

function reload() {
    createMap();
}

function bindMarker_tu(map) {
    var marker_bong;
    if (localStorage.getItem("tu_ar")) {
        var data_tu = JSON.parse(localStorage.getItem("tu_ar"));
        //console.log(data_tu);
        //if (data_tu.length > 1) {
        //    gPTM.setCenter({ lat: parseFloat(data_tu[0].vido), lng: parseFloat(data_tu[0].kinhdo) });
        //}
        var data_bong = JSON.parse(localStorage.getItem("datat_b"));
        //console.log(data_bong);
        setMapOnAllTu(null);
        setMapOnAllBong(null);
        markerTu_ar = [];
        markerBong_ar = [];
        $.each(data_tu, function (key, val) {
            //console.log(val);
            addMarkerTu(val);

        })
    }

}
function bindMarker_bong(map) {
    var marker_bong;
    if (localStorage.getItem("datat_b")) {
        var data_bong = JSON.parse(localStorage.getItem("datat_b"));
        //console.log(data_bong);
        markerBong_ar = [];
        $.each(data_bong, function (key, val) {

            //console.log("Cập nhật bóng");
            var listbong = val.bong;
            $.each(listbong, function (key, val) {
                //console.log(val);
                var icon_sync;
                addMarkerBong(val);
            })
        })
    }
}
function addMarkerTu(marker) {
    //console.log(marker);
    var latlng = new google.maps.LatLng(marker.vido, marker.kinhdo);
    var icon = 'img/' + marker.icon + '.png';
    //alert(icon);
    var idb = marker.id+"";
    var tsl = localStorage.getItem("tuSelected");   
    if (tsl != null || tsl != undefined || tsl != "") {
        if (tsl.indexOf(idb) != -1 && b_flag == false) {
            icon = 'img/' + marker.icon + '_select.png';
        }
    }
    if ($("#tentu_map").is(':checked')) {
        var label = marker.text;
    }
    else {
        var label = " ";
    }
   
    var marker_ = new google.maps.Marker({
        position: latlng,
        map: gPTM,
        icon: {
            labelOrigin: new google.maps.Point(11, 30),
            url: icon,
        },
        title: marker.text,
        label: {
            class:'title_label',
            color: 'blue',
            fontWeight: 'bold',
            text: label,
        },

    });
    var tl = '';

    marker_.addListener(infowindow, 'domready', function () {
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
        iwBackground.children(':nth-child(4)').css({ 'display': 'none' });
        iwOuter.parent().parent().css({ left: '115px' });
        iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });
        iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });
        iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({ opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' });
        if ($('.iw-content').height() < 140) {
            $('.iw-bottom-gradient').css({ display: 'none' });
        }

        iwCloseBtn.mouseout(function () {
            $(this).css({ opacity: '1' });
        });
    });

    marker_.addListener('click', function () {
        bindMarker_tu();
        bindMarker_bong();
        if (!$("#hienbong_map").is(':checked')) {
            $("#hienbong_map").click();
        }


        //console.log(infowindow);
        showChitiet([getTuID(marker_.title)]);
        var tl = loadThietlap(getTuID(marker_.title));
        var tu_id_ = getTuID(marker_.title);
        var contentString = '<div id="iw-container">' +
        //'<div class="iw-title text-bold">' + marker_.title + '<a class="chitiettu_map_1tu" href="#" data-toggle="modal" data-tuid="' + tu_id_ + '" data-target="#Baocao_chitiettu">Chi tiết</a></div>' +
        '<div class="iw-title text-bold">' + marker_.title + '</div>' +
        '<div class="iw-content">' +
          '<div class="iw-subTitle">' +
            'Thiết lập trong ngày<br/>' +
            tl + '<br/>' +
          '</div>' +
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
      '</div>';
        infowindow.setContent(contentString);
        infowindow.open(gPTM, this);
        doimaubong(marker_);
    });
    //marker_.addListener('mouseover', function () {
    ////    bindMarker_tu_only();
    ////    bindMarker_tu();
    //});
    //marker_.addListener('mouseout', function () {
    //    bindMarker_tu();
    //});
    //marker_.addListener('rightclick', function (mouseEvent) {
    //    var tusingle = getTuID(marker_.title) + "";
    //    var tu_a = JSON.parse(localStorage.getItem("tuSelected_bak"));
    //    console.log(tu_a);
    //    if ($.inArray(tusingle, tu_a)) {
    //        this.setIcon('img/' + getIconTu(tusingle) + '.png');
    //        var index = $.inArray(tusingle, tu_a);
    //        tu_a.splice(index, 1);
    //        localStorage.setItem("tuSelected_bak", JSON.stringify(tu_a));
    //    } else {
    //        this.setIcon(imageJobSelected);
    //        tu_a.push(tusingle);
    //        console.log(tu_a);
    //        localStorage.setItem("tuSelected_bak", JSON.stringify(tu_a));
    //    }
    //});
    markerTu_ar.push(marker_);
    setMapOnAllTu(gPTM);
    //getBong_cap(marker.id);
}
function setMapOnAllTu(gPTM) {
    //console.log(markerTu_ar);
    for (var i = 0; i < markerTu_ar.length; i++) {
        markerTu_ar[i].setMap(gPTM);
    }
    $("#tongsotu").html(markerTu_ar.length);
}


function addMarkerBong(marker) {
    var latlng = new google.maps.LatLng(marker.vido, marker.kinhdo);
    var icon = 'img/' + marker.icon + '.png';
    if (marker.icon == 'loading_bong')
        icon = 'img/' + marker.icon + '.gif';
    //alert(icon);
    var idb = marker.id;
    var bsl = localStorage.getItem("BongSelected");
    
    if (bsl != null || bsl != undefined || bsl != "") {
        if (bsl.indexOf(idb) != -1 && $("#hienbong_map").is(':checked')) {
            icon = 'img/' + marker.icon + '_select.png';
            if (marker.icon == 'loading_bong')
                icon = 'img/' + marker.icon + '.gif';
        }
    }
    var label = marker.text;
    var marker_b = new google.maps.Marker({
        position: latlng,
        map: gPTM,
        icon: icon,
        optimized: false, // <-- required for animated gif
        //animation: google.maps.Animation.DROP,
        title: label,
        //label: {
        //    color: 'red',
        //    fontWeight: 'bold',
        //    text: label,
        //    fontFamily: 'Verdana, Geneva, sans-serif',
        //},

    });
    marker_b.addListener('click', function () {
        //alert(2);
        var bongSelected = [];
        var tenbong = this.title;
        if ($("#chonbong_map").is(':checked')) {
            for (var i = 0; i < markerBong_ar.length; i++) {
                marker = markerBong_ar[i];
                if (marker.title == tenbong) {
                    marker.setIcon("img/" + getIconBong(getBongID(marker.title)) + "_select.png");
                    bongSelected.push(getBongID(marker.title));
                }
                else {
                    marker.setIcon("img/" + getIconBong(getBongID(marker.title)) + ".png");
                    //bongSelected = [];
                }


            }
            //console.log(tuSelected);
            localStorage.setItem("BongSelected", JSON.stringify(bongSelected));
            localStorage.setItem("BongSelected_bak", JSON.stringify(bongSelected));
            //showChitiet(tuSelected);
        }
    })
    markerBong_ar.push(marker_b);
    //light_data.push({ tuid: marker.parent, lat: parseFloat(marker.vido), lng: parseFloat(marker.kinhdo) });
    setMapOnAllBong(gPTM);
}
function setMapOnAllBong(gPTM) {
    for (var i = 0; i < markerBong_ar.length; i++) {
        markerBong_ar[i].setMap(gPTM);
    }
}


function bindMarker_tu_only() {
    //console.log("ve");
    var marker_bong;
    //console.log(tree_node);
    if (localStorage.getItem("tu_ar")) {
        var data_tu = JSON.parse(localStorage.getItem("tu_ar"));
        var data_bong = JSON.parse(localStorage.getItem("bong_ar"));
        setMapOnAllTu(null);
        setMapOnAllBong(null);
        markerTu_ar = [];
        markerBong_ar = [];
        $.each(data_tu, function (key, val) {
            addMarkerTu(val);
        })


    } else {
        return;
    }
}

//function getBong_cap(mid) {
//    var config = { namesql: "PKG_CAYDULIEU.GetBong", callback: "f_result_getBong_cap", connstr: "ConnectOracleStreetLight" };
//    var para = {
//        v_idtu: mid
//    };
//    //console.log(para);
//    ExecuteServiceSyns(config, para, false);
//}
//function f_result_getBong_cap(config, para, lst) {
function getBong_cap() {
    var data = JSON.parse(localStorage.getItem("datat_b"));
    var line_ = [];
    $.each(data, function (key, val) {
        var line = val.bong;
        line_ = [];
        $.each(line, function (key2, val2) {
            line_.push({ lat: parseFloat(val2.vido), lng: parseFloat(val2.kinhdo) });
            console.log(val2.text);
        })

        capLine.push(new google.maps.Polyline({
            path: line_,
            geodesic: true,
            strokeColor: '#b64' + Math.floor((Math.random() * 1000) + 1),
            strokeOpacity: 1.0,
            strokeWeight: 1
        })
            );

    })


    $.each(capLine, function (key, val) {
        capLine[key].setMap(gPTM);
    })
}
function removeLine() {
    $.each(capLine, function (key, val) {
        capLine[key].setMap(null);
    })
}

function doimaubong(tuid) {
    //console.log("vào");
    //console.log(dumau);
    doimau = [];
    dumau = [];
    //doimaubong_map(null);
    var tu_id = "";
    bong_ar1 = [];
    var tu = JSON.parse(localStorage.getItem("tu_ar"));
    var bong = JSON.parse(localStorage.getItem("datat_b"));
    $.each(tu, function (key, val) {
        if (val.text == tuid.title) {
            tu_id = val.id;
        }
    })
    //console.log(bong);
    $.each(bong, function (key, val) {
        if (val.id == tu_id) {
            $.each(val.bong, function (key2, val2) {
                bong_ar1.push(val2.text);
            })
        }
    })
    var markerBong_ar2 = markerBong_ar;
    //console.log(markerBong_ar2);
    $.each(markerBong_ar2, function (key, val) {
        var or_icon = val.icon;
        if ($.inArray(val.title, bong_ar1) != -1) {
            //console.log(val);
            val.icon = "img/light_on1.png";
            doimau.push(val);
        } else {
            //console.log(or_icon);
            val.icon = or_icon;
            dumau.push(val);
        }
    })
    setMapOnAllBong(null);
    doimaubong_map(gPTM);
}
function doimaubong_map(gPTM) {
    //console.log(doimau);
    //console.log(dumau);
    for (var i = 0; i < doimau.length; i++) {
        doimau[i].setMap(gPTM);
    }
    for (var i = 0; i < dumau.length; i++) {
        dumau[i].setMap(gPTM);
    }
}

function loadThietlap(idtu) {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_THONGTINTU.THONGTINTU_PHA_TUDONG"
        }
        var para = {
            v_id: idtu,
            V_MATHIETLAP: "-1",
            V_LOAITHIETBI: "-1",
            V_TCGANNHAT: "ACCEPT"
        };
        var ls = ExecuteServiceSyns(config, para, false);
        var data = ls.data;
        var str = '<table class="table">';
        $.each(data, function (key, val) {
            str += '<tr><td>' + val.thoidiembatdau + '~' + val.thoidiemketthuc + '</td>';
            str += '<td><div id="phaA" class="ctiettu_pha ' + (val.lenh == null || val.lenh.charAt(0) == "0" ? "phaOff" : "phaOn") + '"></div>';
            str += '<div id="phaB" class="ctiettu_pha ' + (val.lenh == null || val.lenh.charAt(1) == "0" ? "phaOff" : "phaOn") + '"></div>';
            str += '<div id="phaC" class="ctiettu_pha ' + (val.lenh == null || val.lenh.charAt(2) == "0" ? "phaOff" : "phaOn") + '"></div></td></tr>';
        })
        str += '</table>';
        return str;
        console.log(str);
    } catch (e) { console.log(e); }
}

function SelectMarkers(Bounds) {
    var tuSelected = [];
    var bongSelected = [];

    if ($("#chonbong_map").is(':checked')) {
        for (var i = 0; i < markerBong_ar.length; i++) {
            marker = markerBong_ar[i];
            if (Bounds.contains(marker.getPosition()) == true) {
                marker.setIcon("img/" + getIconBong(getBongID(marker.title)) + "_select.png");
                bongSelected.push(getBongID(marker.title));
            }
            else {
                marker.setIcon("img/" + getIconBong(getBongID(marker.title)) + ".png");
                //bongSelected = [];
            }


        }
        //console.log(tuSelected);
        localStorage.setItem("BongSelected", JSON.stringify(bongSelected));
        localStorage.setItem("BongSelected_bak", JSON.stringify(bongSelected));
        //showChitiet(tuSelected);
    } else {
        for (var i = 0; i < markerTu_ar.length; i++) {
            marker = markerTu_ar[i];
            if (Bounds.contains(marker.getPosition()) == true) {
                marker.setIcon("img/" + getIconTu(getTuID(marker.title)) + "_select.png");
                tuSelected.push(getTuID(marker.title));
            }
            else {
                marker.setIcon("img/" + getIconTu(getTuID(marker.title)) + ".png");
            }


        }
        //console.log(tuSelected);
        localStorage.setItem("tuSelected", JSON.stringify(tuSelected));
        countBong(JSON.parse(localStorage.getItem("tuSelected")) + "");
        localStorage.setItem("tuSelected_bak", JSON.stringify(tuSelected));
        //$('#using_json_2').jstree('deselect_all');
        //$.each(tuSelected, function (k, v) {
        //    $('#using_json_2').jstree('select_node', v);
        //})
        showChitiet(tuSelected);
    }
}
function getTuID(title) {
    var id = "";
    var tu = JSON.parse(localStorage.getItem("tu_ar"));
    $.each(tu, function (key, val) {
        if (val.text == title) {
            id = val.id + "";
        }
    })
    return id;
}
function showChitiet_map(id_ar) {
    try {
        f_get_cb();

    } catch (e) {
        console.log(e);
    }
}

function f_get_cb() {
    try {
        console.log('aaaaa');
        var config = { namesql: "PKG_CANHBAOVANHANH.LOGVANHANH", callback: "f_result_f_get_cb", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_tungay: getLastWeek(),
            v_denngay: gettimenow(),
            ismap:1
        };
        //console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_f_get_cb(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        var count_loi = 0;
        var row = "";
        $.each(data, function (key, val) {
            if (val.loi == "0") {
                row = '<span class="text-green2"><i class="fa fa-exclamation-triangle text-green2"></i>'
                    //+ setnull(val.ten) + ' : '
                    + setnull(val.noidung)
                    + '</span><span class="text-primary"> ('
                    + setnull(val.thoidiem) + ')</span><br/>';
                //$('#log_canhbao_vanhanh').append(row);
            }
            else {
                count_loi++;
                console.log(val);
                var txt = setnull(val.noidung);
                row += '<span class="text-danger">'
                    + txt + '<span class="text-info text-bold">&#09; | &#09;</span></span>';

            }
            console.log(row);
            $('#thongtintu_text').html(row);

        });
        if (count_loi == 0) {
            $('#thongtintu_text').html("Hiện không có cảnh báo trên hệ thống.");
        }
    }
    catch (e) {
        console.log(e.message)
    }

}
function getBongID(title) {
    var id = "";
    var bong = JSON.parse(localStorage.getItem("datat_b"));
    $.each(bong, function (key, val) {
        console.log(val);
        var lst_b = val.bong;
        $.each(lst_b, function (i, value) {
            if (value.text == title)
                id = value.id;
        })
    })
    return id;
}

function countBong(dstu) {
    try {
        var config = { namesql: "PKG_CAYDULIEU.CountBong", callback: "f_result_countBong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_dstu: dstu
        };
        //console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_countBong(config, para, lst) {
  
    $("#tongsobong").html(lst.data[0].ds);
}