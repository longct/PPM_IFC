var valTimeSl_cdtgg = [];
var from_cdtgg = "";
var to_cdtgg = "";
var map;
var maker2;
var cityCircle = new google.maps.Circle();
var myLatlng2 = new google.maps.LatLng();
$(document).ready(function () {
    try {
        init_xungquanh();
        $("#mod_name").html("Điểm đỗ xung quanh");
        $('#viewAllNear.toggle').toggles({
            drag: true, // allow dragging the toggle between positions
            click: true, // allow clicking on the toggle
            text: {
                on: 'ON', // text for the ON position
                off: 'OFF' // and off
            },
            on: true, // is the toggle ON on init
            animate: 250, // animation time (ms)
            easing: 'swing', // animation transition easing function
            checkbox: null, // the checkbox to toggle (for use in forms)
            clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
            width: 50, // width used if not set in css
            height: 20, // height if not set in css
            type: 'compact' // if this is set to 'select' then the select style toggle will be used
        });
        $('#viewAllNear.toggle').on('toggle', function (e, active) {
            if (active) {
                console.log('Hiện tất cả');
            } else {
                console.log('Hiện SmartPark');
            }
        });
        var height_map = $(window).height() / 1.5;
        $("#kq_map").css("height", height_map);
        rValue = $("#rangeValueXungquanh").val();
        if (rValue == null) rValue = 50;
        myMapNear(rValue);
        var MapTimer = setInterval(function () { bindMap(map, rValue) }, 10000);
        intervals.push(MapTimer);
        //
        //console.log(deviceInfo);
    } catch (e) {
        console.log(e);
    }
});


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
            max: 300,
            from: 0,
            step: 10,
            keyboard: true,
            postfix: "",
            onUpdate: function (data) {
                //  $('#ToHour_Dkdtt').val(data.from);
                console.log(data.from);
                $("#rangeValueXungquanh").val(data.from);
            },
            onFinish: function (data) {
                //  $('#ToHour_Dkdtt').val(data.from);
                console.log(data.from);
                $("#rangeValueXungquanh").val(data.from);
                rValue = $("#rangeValueXungquanh").val();
                if (rValue == null) rValue = 50;
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
    console.log("Vẽ lại");
    callLoad();
    var curentLat;
    var curentLong;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position) {
        curentLat = position.coords.latitude;
        curentLong = position.coords.longitude;
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
    console.log(range);
    myLatlng = new google.maps.LatLng(lat, long);
    var mapOptions = { zoom: 16, center: myLatlng }
    map = new google.maps.Map(document.getElementById('mapNear'), mapOptions);
    marker2 = new google.maps.Marker({ position: myLatlng, map: map, icon: 'img/maker.png' });
    //var infowindow = new google.maps.InfoWindow();
    //cityCircle = new google.maps.Circle({
    //    strokeColor: '#09f',
    //    strokeOpacity: 0.8,
    //    strokeWeight: 1,
    //    fillColor: '#09f',
    //    fillOpacity: 0.35,
    //    map: map,
    //    center: myLatlng,
    //    radius: parseInt(range)
    //})
    //bindMap(map, 50);
    stopLoad();
}
function bindMap(map, range) {
    var curentLat;
    var curentLong;

    navigator.geolocation.getCurrentPosition(onSuccess);
    function onSuccess(position) {
        curentLat = position.coords.latitude;
        curentLong = position.coords.longitude;
        console.log(curentLat);
        myLatlng2 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(myLatlng2);
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


}