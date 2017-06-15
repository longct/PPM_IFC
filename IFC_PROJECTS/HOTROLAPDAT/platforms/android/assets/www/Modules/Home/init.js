$(document).ready(function () {
    try {

        var device = JSON.parse(localStorage.getItem("SIM"));
        var info = '<span>Tên thiết bị: ' + deviceInfo.model + '</span><br/>' +
                   '<span>Hệ điều hành: ' + deviceInfo.platform + '</span><br/>'+
                   '<span>Nhà mạng: ' + device.carrierName + '</span><br/>'+
                   '<span>Số điện thoại: ' + device.phoneNumber + '</span><br/>'+
                   '<span>ID thiết bị: ' + deviceInfo.uuid + '</span><br/>'
                    ;
        $(".device_info").empty();
        $(".device_info").append(info);
    } catch (e) {
        console.log(e);

    }
});
