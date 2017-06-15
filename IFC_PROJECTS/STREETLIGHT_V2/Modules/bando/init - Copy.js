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

$(document).ready(function () {
    if (!localStorage.getItem("tree_node") || JSON.parse(localStorage.getItem("tree_node"))[0].bong.length == 0) {
        $("#hienbong_map").attr("disabled", "disabled");
        $("#hiencap_map").attr("disabled", "disabled");
    } else {
        $("#hienbong_map").removeAttr("disabled");
        $("#hiencap_map").removeAttr("disabled");
    }
    $(".panel-full-right").on("click", function () {
        var tree_bak = localStorage.getItem("tree_bak");
        if ($(this).parents().parent().hasClass("has-right")) {
            $(this).parents().parent().removeClass("has-right");
            $(".page-content-right").show();
            //setMapOnAllTu(gPTM)
            createMap();
            localStorage.setItem("tree_node", tree_bak);
            bindMarker_tu();
        } else {
            $(this).parents().parent().addClass("has-right");
            $(".page-content-right").hide();
            //setMapOnAllTu(gPTM)
            createMap();
            localStorage.setItem("tree_node", tree_bak);
            bindMarker_tu();
        }
    });

    $("#hiencap_map").change(function () {
        if ($("#hiencap_map").is(':checked')) {

            line = [];
            capLine = [];
            var tid = [];
            var tuid = JSON.parse(localStorage.getItem("tree_node"))[0].tu;
            $.each(tuid, function (key, val) {
                console.log(tuid[key]);
                tid.push(tuid[key].id);
            })
            getBong_cap(tid.toString());
        }
        else {
            removeLine();
        }
    })
    $("#hienbong_map").change(function () {
        if ($("#hienbong_map").is(':checked')) {
            bindMarker_tu();  // checked
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
    localStorage.removeItem("tree_node");
    var vpW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var loguser = $(".loguser");
    $("#google_ptm_map").css("height", vpH - $("#row-bottom").height() - 170);

    //alert(($("#gmap").height() - $("#boxchitiettu").height())/3)
    //loguser.css("height", ($("#gmap").height() - $("#boxchitiettu").height()) / 3 - 40);
    loguser.css("max-height", ($("#gmap").height() - $("#boxchitiettu").height()) / 3 - 45);
    //$(".body-chitiettu").css("height",)
    gPTMCords = new google.maps.LatLng(10.633913, 106.741170);
    gPTMOptions = { zoom: 14, center: gPTMCords, mapTypeId: google.maps.MapTypeId.ROADMAP }
    gPTM = new google.maps.Map(document.getElementById("google_ptm_map"), gPTMOptions);
    setMapOnAllTu(null);
    setMapOnAllBong(null);
    markerTu_ar = [];
    markerBong_ar = [];
    if (localStorage.getItem("tree_node")) {
        bindMarker_tu();
    }

}

function reload() {
    createMap();
}

function bindMarker_tu() {
    var marker_bong;
    if (JSON.parse(localStorage.getItem("tree_node"))[0] != null || JSON.parse(localStorage.getItem("tree_node"))[0] != undefined) {

        var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
        var tu_data = tree_node.tu;
        var bong_data = tree_node.bong;
        setMapOnAllTu(null);
        setMapOnAllBong(null);
        markerTu_ar = [];
        markerBong_ar = [];
        $.each(tu_data, function (key, val) {
            addMarkerTu(val);
        })
        $.each(bong_data, function (key, val) {
            addMarkerBong(val);
        })
    } else {
        console.log("cache");
        setMapOnAllTu(null);
        setMapOnAllBong(null);
        markerTu_ar = [];
        markerBong_ar = [];
        return;
    }
}

function addMarkerTu(marker) {
    var latlng = new google.maps.LatLng(marker.vido, marker.kinhdo);
    var icon = 'img/' + marker.icon + '.png';
    var label = marker.ten
    var marker_ = new google.maps.Marker({
        position: latlng,
        map: gPTM,
        icon: icon,
        title: label,
        //label: {
        //    color: 'red',
        //    fontWeight: 'bold',
        //    text: label,
        //    fontFamily: 'Verdana, Geneva, sans-serif',
        //},

    });
    /*MENU CHUỘT PHẢI*/

    /*INFOWINDOW */
    var tl = loadThietlap(marker.id);
    var contentString = '<div id="iw-container">' +
            '<div class="iw-title">' + marker.ten + '</div>' +
            '<div class="iw-content">' +
              '<div class="iw-subTitle">' +
                'Thiết lập trong ngày<br/>' +
                tl + '<br/>' +
              '</div>' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
          '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
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
        //console.log(infowindow);
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
    marker_.addListener('rightclick', function (mouseEvent) {

        infowindow.close();
    });
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
    //console.log(marker);
    var latlng = new google.maps.LatLng(marker.vido, marker.kinhdo);
    var icon = 'img/' + marker.icon + '.png';
    var label = marker.ten
    var marker_b = new google.maps.Marker({
        position: latlng,
        map: gPTM,
        icon: icon,
        title: label,
        //label: {
        //    color: 'red',
        //    fontWeight: 'bold',
        //    text: label,
        //    fontFamily: 'Verdana, Geneva, sans-serif',
        //},

    });

    markerBong_ar.push(marker_b);
    //light_data.push({ tuid: marker.parent, lat: parseFloat(marker.vido), lng: parseFloat(marker.kinhdo) });
    setMapOnAllBong(gPTM);
}
function setMapOnAllBong(gPTM) {
    for (var i = 0; i < markerBong_ar.length; i++) {
        markerBong_ar[i].setMap(gPTM);
    }
    $("#tongsobong").html(markerBong_ar.length);
}


function bindMarker_tu_only() {
    //console.log("ve");
    var marker_bong;
    //console.log(tree_node);
    if (JSON.parse(localStorage.getItem("tree_node"))[0] != null || JSON.parse(localStorage.getItem("tree_node"))[0] != undefined) {
        var tree_node = JSON.parse(localStorage.getItem("tree_node"))[0];
        var tu_data = tree_node.tu;
        var bong_data = tree_node.bong;
        setMapOnAllTu(null);
        setMapOnAllBong(null);
        markerTu_ar = [];
        markerBong_ar = [];
        $.each(tu_data, function (key, val) {
            addMarkerTu(val);
        })
        //$.each(bong_data, function (key, val) {
        //    addMarkerBong(val);
        //})
    } else {
        return;
    }
}

function getBong_cap(mid) {
    var config = { namesql: "PKG_CAYDULIEU.GetBong", callback: "f_result_getBong_cap", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_idtu: mid
    };
    console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_getBong_cap(config, para, lst) {
    //console.log(lst);
    var data = lst.data;

    var mid = data[0].meterid;
    var tu_a = [];
    var bong_a = [];
    $.each(data, function (key, val) {
        if (mid == val.meterid) {
            bong_a.push({ lat: parseFloat(val.vido), lng: parseFloat(val.kinhdo) });

        }
        else {
            tu_a.push({ tu: val.meterid, bong: bong_a });
            bong_a = [];
        }
        mid = val.meterid;
        line.push({ lat: parseFloat(val.vido), lng: parseFloat(val.kinhdo) });
    })
    tu_a.push({ tu: mid, bong: bong_a });
    bong_a = [];
    //console.clear();
    //console.log(tu_a);
    $.each(tu_a, function (key, val) {
        var line = val.bong;
        capLine.push(new google.maps.Polyline({
            path: line,
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
    console.log(line);
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
    var tu_id;
    bong_ar = [];
    var tu = JSON.parse(localStorage.getItem("tree_node"))[0].tu;
    var bong = JSON.parse(localStorage.getItem("tree_node"))[0].bong;
    $.each(tu, function (key, val) {
        if (val.ten == tuid.title) {
            tu_id = val.id;
        }
    })
    $.each(bong, function (key, val) {
        if (val.parent == tu_id) {
            bong_ar.push(val.ten);
        }
    })
    var markerBong_ar2 = markerBong_ar;
    $.each(markerBong_ar2, function (key, val) {
        //console.log($.inArray(val.title, bong_ar));
        //console.log(key);
        var or_icon = val.icon;
        if ($.inArray(val.title, bong_ar) != -1) {
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
        //console.log(str);
    } catch (e) { console.log(e); }
}
