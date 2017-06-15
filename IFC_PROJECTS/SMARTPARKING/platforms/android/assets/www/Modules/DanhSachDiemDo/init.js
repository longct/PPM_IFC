$(document).ready(function () {
    try {
        $("#mod_name").html("Danh sách điểm đỗ xe");
        $('#viewAll.toggle').toggles({
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
        $('#viewAll.toggle').on('toggle', function (e, active) {
            if (active) {
                console.log('Hiện tất cả');
            } else {
                console.log('Hiện SmartPark');
            }
        });
        $('input[type=radio][name=radio_dis]').change(function () {
            if (this.value == 'quan') {
                alert("Quận");
            }
            else if (this.value == 'phuong') {
                alert("Phường");
            }
            else if (this.value == 'duong') {
                alert("Đường");
            }
        });
        console.log($(window).height() - $("#kq_table").height() * 2);
        var height_map = $(window).height() - $("#kq_table").height() * 3;
        $("#kq_map").css("height", height_map);
        console.log($("#kq_map").height());
        myMap()

        //console.log(deviceInfo);
    } catch (e) {
        console.log(e);
    }
});
function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 10
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
}


