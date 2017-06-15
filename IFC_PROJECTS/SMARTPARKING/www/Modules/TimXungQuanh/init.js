var valTimeSl_cdtgg = [];
var from_cdtgg = "";
var to_cdtgg = "";
var map;
var maker2;
var cityCircle = new google.maps.Circle();
var myLatlng2 = new google.maps.LatLng();
var viewAllSearch_tkxq = setTogglesId;
var booleanToggles_tkxq = booleanToggles;
var curentLatfirst;
var curentLonsecond;

var marker_ar = [];
$(document).ready(function () {
    try {
        getLangText();
        init_xungquanh();
        console.log("b:" + booleanToggles);
        $('#viewAllNear.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: booleanToggles_tkxq,
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 50, // width used if not set in css
            height: 20, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
        $('#viewAllNear.toggle').on('toggle', function (e, active) {
            // console.log("b:" + booleanToggles);
            // booleanToggles_tkxq = booleanToggles;
            if (active !== undefined) {
                if (active) {
                    viewAllSearch_tkxq = 0;
                } else {
                    viewAllSearch_tkxq = 1;
                }
            } else {
                viewAllSearch_tkxq = setTogglesId;
            }


            rValue = $("#rangeValueXungquanh").val();
            if (rValue == null) rValue = 1000;
            myMapNear(rValue);
            var MapTimer = setInterval(function () { bindMap(map, rValue) }, 10000);
            intervals.push(MapTimer);
        });
        var height_map = $(window).height() / 1.5;
        $("#kq_map").css("height", height_map);
        rValue = $("#rangeValueXungquanh").val();
        if (rValue == null) rValue = 1000;
        myMapNear(rValue);
        var MapTimer = setInterval(function () { bindMap(map, rValue) }, 10000);
        intervals.push(MapTimer);

    } catch (e) {
        console.log(e);
    }
});

function getLangText() {
    $("#mod_name").html(apiLstLang.lang_modName);
    $("#httc_tkxq").text(apiLstLang.lang_hienthitatca);
    $("#kc_tkxq").text(apiLstLang.lang_khoangcach);
}
function CheckIndex_cdtgg(item) {
    var id = jQuery.inArray(item, valTimeSl_cdtgg);
    return id;
}
function init_xungquanh() {
    try {
        $("#sliderKhoangCachXungQuanh").ionRangeSlider({
            type: "single",
            grid: false,
            min: 0,
            max: 3000,
            from: 1000,
            step: 200,
            keyboard: true,
            postfix: "",
            onUpdate: function (data) {
                //  console.log(data.from);
                $("#rangeValue_xq").val(data.from);
            },
            onFinish: function (data) {

                console.log(data.from);
                $("#rangeValue_xq").val(data.from);
                rValue = $("#rangeValue_xq").val();
                if (rValue == null) rValue = 1000;
                //callLoad();
                bindMapRange(map, rValue);
                //myMapNear(rValue);

            }
        });


    } catch (e) {
        console.log(e);
    }
}
function myMapNear(range) {
    // console.log("Vẽ lại");
    callLoad();
    var curentLat;
    var curentLong;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
        curentLat = curentLatfirst = position.coords.latitude;
        curentLong = curentLonsecond = position.coords.longitude;
        drawMap(position.coords.latitude, position.coords.longitude, range);
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

}
function drawMap(lat, long, range) {
    //  console.log(range);
    myLatlng = new google.maps.LatLng(lat, long);
    var mapOptions = { zoom: 16, center: myLatlng }
    map = new google.maps.Map(document.getElementById('mapNear'), mapOptions);
    marker2 = new google.maps.Marker({ position: myLatlng, map: map, icon: 'img/maker.png' });
    marker2.setMap(null);
    getDanhSachDiaDiem_tkxq(map, lat, long);
    stopLoad();
}
function bindMap(map, range) {
    var curentLat;
    var curentLong;

    navigator.geolocation.getCurrentPosition(onSuccess);
    function onSuccess(position) {
        curentLat = position.coords.latitude;
        curentLong = position.coords.longitude;
        // console.log(curentLat);
        myLatlng2 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // console.log(myLatlng2);
        marker2.setMap(null);
        marker2 = new google.maps.Marker({ position: myLatlng2, map: map, icon: 'img/maker.png' });
        marker2.setMap(null);
        cityCircle.setMap(null);
        cityCircle = new google.maps.Circle({
            strokeColor: '#09f',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#09f',
            fillOpacity: 0.35,
            map: map,
            center: myLatlng,
            radius: parseInt(range)
        })
        marker2.setMap(map);
        cityCircle.bindTo('center', marker2, 'position');
        //stopLoad();
    };

}

function bindMapRange(map, range) {


    cityCircle.setMap(null);
    cityCircle = new google.maps.Circle({
        strokeColor: '#09f',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#09f',
        fillOpacity: 0.35,
        map: map,
        center: myLatlng,
        radius: parseInt(range)
    })
    marker2.setMap(map);
    cityCircle.bindTo('center', marker2, 'position');
    getDanhSachDiaDiem_tkxq(map, curentLatfirst, curentLonsecond);

}

function getDanhSachDiaDiem_tkxq(map, lat, long) {
    try {
        var p = getAllIdMod();
        console.log("load");
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_TIMKIEM.TIMKIEMXUNGQUANH" };
        var para = {
            V_VIEWALXQ: viewAllSearch_tkxq,
            v_lat: parseFloat(lat),
            v_long: parseFloat(long),
            v_kc: parseFloat($("#rangeValue_xq").val())
        };
        console.log(para);
        var lst_ = ExecuteServiceSyns(config, para);
        bind_DS(lst_, map);
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}



function bind_DS(data, map) {
    //var map_ = map;
    // console.log(map_);
    //  console.log(data);
    $.each(data, function (i, marker) {
        if (marker.vido != null && marker.vido != undefined && marker.kinhdo != null && marker.kinhdo != undefined)
            center = new google.maps.LatLng(marker.vido, marker.kinhdo);
        return false;
    });
    var lst = data.data;
    console.log(lst);
    setMapOnAll(null);
    marker_ar = [];
    $.each(lst, function (i, marker) {        
        addMarker(marker);
    });

}
function addMarker(marker) {
    var latlng = new google.maps.LatLng(marker.vido, marker.kinhdo);
    var icon = marker.lapthietbi == 1 ? "img/sp.png" : "img/p.png"
    var label = marker.sochotrong + "/" + marker.tong_ddx;
    var marker_ = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon,
        title: label,
        label: {
            color: 'red',
            fontWeight: 'bold',
            text: label,
            fontFamily: 'Verdana, Geneva, sans-serif',
        },

    });
    var contentString = '<div id="iw-container">' +
            '<div class="iw-title">' + marker.ten_ddx + '</div>' +
            '<div class="iw-content">' +
              '<div class="iw-subTitle">Thông tin</div>' +
              '<span>Địa chỉ: ' + marker.ten + ' - ' + marker.quan + '</span><br/>' +
              '<span>Tông số chỗ đỗ xe: ' + marker.tong_ddx + ' </span><br/>' +
              '<span>Còn trống: ' + marker.sochotrong + ' </span>' +
              '<div class="iw-subTitle">Liên hệ</div>' +

              '<br>Điện thoại: ' + marker.sodienthoai + '</p>' +
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
        infowindow.open(map, marker_);
    });
    marker_ar.push(marker_);
    setMapOnAll(map);
}
function setMapOnAll(map) {
    console.log(marker_ar);
    for (var i = 0; i < marker_ar.length; i++) {
        marker_ar[i].setMap(map);
    }
}