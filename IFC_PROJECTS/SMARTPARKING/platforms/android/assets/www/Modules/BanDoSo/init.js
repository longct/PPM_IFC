$(document).ready(function () {
    try {
        var lst = [];
        var info = { vido: 15.1321321, kinhdo: 105.1313545, ten: "test nhe" };
        lst.push(info);
        draw_Map_bds(lst)
        //console.log(deviceInfo);
    } catch (e) {
        console.log(e);
    }
});
//function myMap() {
//    var mapCanvas = document.getElementById("map");
//    var mapOptions = {
//        center: new google.maps.LatLng(51.5, -0.2),
//        zoom: 10
//    }
//    var map = new google.maps.Map(mapCanvas, mapOptions);
//}


function draw_Map_bds(lst) {

    try {        
        console.log(lst);
        //if (lst == null || lst.length == 0) {
        //    $('#meseinfo_bds').html("Không có dữ liệu hiển thị");
        //    return;
        //}
        //var centerLat = 0;
        //var centerLog = 0;
        //$.each(lst, function (key, val) {
        //    if (val.vido != null && val.vido != undefined && val.kinhdo != null && val.kinhdo != undefined) {
        //        centerLat = val.vido;
        //        centerLog = val.kinhdo;
        //        return false;
        //    }
        //});
        //$('#map_bds').html("");
        //var center = centerLat + "," + centerLog;
        //console.log(center);
        $('#map_bds').gmap({ 'center': '105.1321321,15.1313545' });
        $('#map_bds').gmap('option', 'zoom', 20);

       // vediemdoxe_bds(lst);
    } catch (e) {
        //console.log("Loi");
        console.log(e);
    }
};

// vẽ diem do xe 

function vediemdoxe_bds(lst) {
    try {
        $.each(lst, function (i, marker) {
            if (marker.vido != null && marker.kinhdo != null) {
                $('#map_bds').gmap('addMarker', {
                    'position': new google.maps.LatLng(setnullnumber(marker.vido), setnullnumber(marker.kinhdo)),
                    'icon': '/img/icon-car.png'
                }).click(function () {
                    //$("#act_home_bando").slideDown();

                    //khoitaosukien_bds(marker.id);
                    $('#map_bds').gmap('openInfoWindow', {
                        content: "<table>" +
                                "<tr>" +
                                "<td>Tên tủ: </td>" +
                                "<td>" + setnullnumber(marker.ten) + "</td>" +
                                "</tr>" +                
                                "</table>" +
                                "<div><a href='#' class='clickXemBong' onclick=clickChangeTap(" + marker.id + ")  >Xem chi tiết bóng </a><br/></div>"
                        //'content': "<font color='black'>"
                        //    + "IMEI: " + marker.imei + "<br/>"
                        //    + "Tên tủ: " + marker.tenkhachhang + "<br/>"
                        //    + "Địa chỉ tủ: " + marker.diachikhachhang + "<br/>"
                        //    + "Ghi chú: " + marker.ghichu + "<br/>"
                        //    + "Vĩ độ: " + setnullnumber(marker.vido) + "<br/>"
                        //    + "Kinh độ: " + setnullnumber(marker.kinhdo) + "<br/>"
                        //    + "</font>"
                        //    + "<table>" +
                        //    + "<tr><td>UA(V)</td><td>" + marker.ua + "</td></tr>" +
                        //    +"</table>" +
                        //    + "<div><a href='#' class='clickXemBong' onclick=clickChangeTap(" + marker.id + ")  >Xem chi tiết bóng </a><br/></div>"

                    }, this);

                });

            }
        });
    } catch (e) {
        console.log(e);
    }
}
function clickChangeTap(page) {
    try {

        var chitiettu = { id: page, userinfo: JSON.parse(localStorage.getItem("userinfo")) };
        localStorage.setItem("chitiettu", JSON.stringify(chitiettu));
        window.open('master.html#Module/tongquantu', '_blank');
    } catch (e) {
        console.log(e);
    }
}

