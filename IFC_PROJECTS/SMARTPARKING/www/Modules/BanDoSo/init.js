
var map;
var vitrixe;
var cityCircle = new google.maps.Circle();

$(document).ready(function () {
    try {
        callLoad();
       // console.log("ban do so");
        var type = window.location.hash.substr(1);
      //  console.log(type);
        if (type == "Modules/TimKiemChung")
            var height_map = $(window).height() / 1.75;
        else if (type == "Modules/TimXungQuanh")
            var height_map = $(window).height() / 1.5;
        else if (type == "Modules/DanhSachDiemDo")
            var height_map = $(window).height() / 1.8;
        else
            var height_map = $(window).height() / 1.5;
        $("#kq_map_bds").css("height", height_map);
        //console.log($("#kq_map_bds").height());


        //var config = { khoangcanh: 50, hienViTri: true, circle: true, zoom: 17 };
        //var info1 = { vido: "15.13123", kinhdo: "105.1345", ten: "texxt1", loaithietbi: 1 };
        //var info2 = { vido: "15.45435", kinhdo: "105.65464", ten: "texxt2", loaithietbi: 0 };
        //var lst = [];
        //lst.push(info1);
        //lst.push(info2);
        //f_hienThongTinBanDo_bds(config, lst);
        //console.log(deviceInfo);
    } catch (e) {
        console.log(e);
    }
});

function f_hienThongTinBanDo_bds(config, lst) {
    if (config.hienViTri) {
        f_hienViTriXe_bds(config, lst);

    }
    else
        f_veBanDoSo_bds(config, lst, false);

}

function f_hienViTriXe_bds(config, lst) {
    try {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        function onSuccess(position) {
            curentLat = position.coords.latitude;
            curentLong = position.coords.longitude;
            vitrixe = new google.maps.LatLng(curentLat, curentLong);
            // hien vi tri xe
            if (config.hienViTri) {
              //  console.log(config.khoangcanh);
                var mapOptions = { zoom: config.zoom, center: vitrixe }
                map = new google.maps.Map(document.getElementById('mapNear_bds'), mapOptions);
                new google.maps.Marker({ position: vitrixe, map: map, icon: "img/maker.png" });
                if (config.circle)
                    cityCircle = new google.maps.Circle({
                        strokeColor: '#09f',
                        strokeOpacity: 0.8,
                        strokeWeight: 1,
                        fillColor: '#09f',
                        fillOpacity: 0.35,
                        map: map,
                        center: vitrixe,
                        radius: config.khoangcanh
                    });
                f_veBanDoSo_bds(config, lst, true);
            }
            else
                f_veBanDoSo_bds(config, lst, false);

        };

        function onError(error) {
            alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
            f_veBanDoSo_bds(config, lst, false);
        }

        stopLoad();

    } catch (e) { console.log(e); }

}

function f_veBanDoSo_bds(config, lst, sucess) {
    try {
      //  console.log(sucess);
      //  console.log(config);
      //  console.log(lst);
        var center;
        if (lst == null || lst == undefined)
            return;
        // neu khong lay vi tri thi lay ra 1 vi tri ben
        if (!config.hienViTri) {
        //    console.log("111111");
            $.each(lst, function (i, marker) {
                if (marker.vido != null && marker.vido != undefined && marker.kinhdo != null && marker.kinhdo != undefined)
                    center = new google.maps.LatLng(marker.vido, marker.kinhdo);
                return false;
            });
        }

        //neu chua khoi tao ban do se them phan nay
        if (!sucess) {
          //  console.log("22222");
            var mapOptions = { zoom: config.zoom, center: center }
            map = new google.maps.Map(document.getElementById('mapNear_bds'), mapOptions);
        }

        $.each(lst, function (i, marker) {
         //   console.log(lst);
          //  console.log("33333");
          //  console.log(marker.vido);
            var latlng = new google.maps.LatLng(marker.vido, marker.kinhdo);
            var icon = marker.lapthietbi == 1 ? "img/sp.png" : "img/p.png"
            var label = marker.sochotrong + "/" + marker.tong_ddx;
            var quan = marker.quan != undefined ? " - " + marker.quan : "";
            var contentString = '<div id="iw-container">' +
                    '<div class="iw-title">' + marker.ten_ddx + '</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Thông tin</div>' +
                      '<span>Địa chỉ: ' + marker.ten + quan +'</span><br/>' +
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
            var marker_ = new google.maps.Marker(
                {
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

        });
    } catch (e) { console.log(e); }

}

function bindMapRange_bds(config) {

    f_hienViTriXe_bds(config);

}