$(document).ready(function () {
    $('#btn_Close').click(function () {
        $('#csttd_3pha').modal('toggle');
    });

});
function f_trogiup() {
    f_get_mota();
    f_get_huongdan();
}



function f_get_mota() {
    var chiso = $('#cbLoaichiso option:selected').val();
    if (chiso == 0) {
        var Mota = "Chỉ số từng thời điểm là chỉ số tức thời theo từng biểu giá tại thời điểm ra lệnh đọc. Các thông số bao gồm: " + "<br/>" +
                                            "- P giao (kWh): Chỉ số điện năng theo chiều giao" + "<br/>" +
                                            "- P nhận (kWh): Chỉ số điện năng theo chiều nhận" + "<br/>" +
                                            "- Q giao (kVARh): Chỉ số Q theo chiều giao" + "<br/>" +
                                            "- Q nhận (kVARh): Chỉ số Q theo chiều nhận" + "<br/>" +
                                            "- P max: Công suất cực đại.";
    } else if (chiso == 1) {
        var Mota = "Chỉ số chốt là chỉ số điện được đọc tại 0h của ngày chốt được cài đặt trong công tơ. Các thông số bao gồm: " + "<br/>" +
                                            " Mã khách hàng " + "<br/>" +
                                            " Số công tơ " + "<br/>" +
                                            " Thời gian chốt công tơ  " + "<br/>" +
                                            " Chỉ số điện năng đơn vị kWh" + "<br/>" +
                                            " Sản lượng" + "<br/>";

    } else if (chiso == 2) {
        var Mota = "Chỉ số chốt là chỉ số điện được đọc tại 0h của ngày chốt được cài đặt trong công tơ. Các thông số bao gồm: " + "<br/>" +
                                            " Mã khách hàng " + "<br/>" +
                                            " Số công tơ " + "<br/>" +
                                            " Thời gian chốt công tơ  " + "<br/>" +
                                            " Chỉ số điện năng đơn vị kWh" + "<br/>";
    }
    $('#mota').html(Mota);

}
function f_get_huongdan() {
    var chiso = $('#cbLoaichiso').val();
    if (chiso == "0") {
        var Huongdan = "<span style='color:#6dcff6;'> 1. Xem chỉ số từng thời điểm của nhiều điểm đo </span>" + "<br/>" +
                                            "Bước 1: Chọn Menu Vận hành, chọn Thông số vận hành, chọn tab chỉ số từng thời điểm." + "<br/>" +
                                            "Bước 2: Chọn nhóm điểm đo muốn xem. Hiển thị dữ liệu chỉ số từng thời điểm mới nhất của tất cả các điểm đo thuộc nhóm đã chọn." + "<br/>" +
                                            "Bước 3: Để xem dữ liệu ngày trước đó, chọn ngày và thời điểm sau đó chọn Thực hiện để xem chỉ số từng thời điểm tại thời điểm đã chọn." + "<br/>" +
                                            "Bước 4: Để xem dữ liệu theo chế độ màn hình công tơ, trong combobox chọn màn hình công tơ, sau đó chọn Thực hiện" + "<br/>" +
                                            "<span style='color:#6dcff6;'> 2. Xem chỉ số từng thời điểm của 1 điểm đo </span>" + "<br/>" +
                                            "Bước 1: Chọn 1 điểm đo. Hiển thị dữ liệu của điểm đo trong ngày hiện tại." + "<br/>" +
                                            "Bước 2: Để xem dữ liệu ngày trước đó, chọn ngày sau đó chọn Thực hiện." + "<br/>" +
                                            "Bước 3: Để xuất dữ liệu chỉ số từng thời điểm, sát tiêu đề cột ở bên phải màn hình, chọn icon xuất excel" + "<br/>" +
                                            "<span style='color:#6dcff6;'> 3. Xem thông tin điểm đo </span>" + "<br/>" +
                                            "Tại Tên khách hàng, có icon màu xanh chữ i. Chọn để xem các thông số về điểm đo: IMEI, số công tơ, mã điểm đo, các thông số biến áp TU, biến dòng TI, hệ số nhân công tơ đọc về.";
    } else if (chiso == "1") {
        var Huongdan = "<span style='color:#6dcff6;'> 1. Xem chỉ số chốt của nhiều điểm đo </span>" + "<br/>" +
                                            "Bước 1: Chọn Menu Vận hành, chọn Thông số vận hành, chọn tab chỉ số chốt ." + "<br/>" +
                                            "Bước 2: Tại cây dữ liệu điện lực bên trái, chọn nhóm điểm đo muốn xem. Hiển thị dữ liệu chỉ số từng thời điểm mới nhất của tất cả các điểm đo thuộc nhóm đã chọn." + "<br/>" +
                                            "Bước 3: Để xem dữ liệu ngày trước đó, chọn ngày và thời điểm sau đó chọn Thực hiện để xem chỉ số từng thời điểm tại thời điểm đã chọn." + "<br/>" +
                                            "Bước 4: Để xem dữ liệu theo chế độ màn hình công tơ, trong combobox chọn màn hình công tơ, sau đó chọn Thực hiện" + "<br/>" +
                                            "<span style='color:#6dcff6;'> 2. Xem chỉ số chốt của 1 điểm đo </span>" + "<br/>" +
                                            "Bước 1: Chọn 1 điểm đo. Hiển thị dữ liệu của điểm đo trong ngày hiện tại." + "<br/>" +
                                            "Bước 2: Để xem dữ liệu ngày trước đó, chọn ngày sau đó chọn Thực hiện." + "<br/>" +
                                            "Bước 3: Để xuất dữ liệu chỉ số chốt, sát tiêu đề cột ở bên phải màn hình, chọn icon xuất excel" + "<br/>" +
                                            "<span style='color:#6dcff6;'> 3. Xem thông tin điểm đo </span>" + "<br/>" +
                                            "Tại Tên khách hàng, có icon màu xanh chữ i. Chọn để xem các thông số về điểm đo: IMEI, số công tơ, mã điểm đo, các thông số biến áp TU, biến dòng TI, hệ số nhân công tơ đọc về.";
    } else if (chiso == "2") {
        var Huongdan = "<span style='color:#6dcff6;'> 1. Xem chỉ số chốt của nhiều điểm đo </span>" + "<br/>" +
                                            "Bước 1: Chọn Menu Vận hành, chọn Thông số vận hành, chọn tab chỉ số chốt Tháng." + "<br/>" +
                                            "Bước 2: Chọn nhóm điểm đo muốn xem. Hiển thị dữ liệu chỉ số từng thời điểm mới nhất của tất cả các điểm đo thuộc nhóm đã chọn." + "<br/>" +
                                            "Bước 3: Để xem dữ liệu ngày trước đó, chọn ngày và thời điểm sau đó chọn Thực hiện để xem chỉ số từng thời điểm tại thời điểm đã chọn." + "<br/>" +
                                            "Bước 4: Để xem dữ liệu theo chế độ màn hình công tơ, trong combobox chọn màn hình công tơ, sau đó chọn Thực hiện" + "<br/>" +
                                            "<span style='color:#6dcff6;'> 2. Xem chỉ số chốt của 1 điểm đo </span>" + "<br/>" +
                                            "Bước 1: Chọn 1 điểm đo. Hiển thị dữ liệu của điểm đo trong ngày hiện tại." + "<br/>" +
                                            "Bước 2: Để xem dữ liệu ngày trước đó, chọn ngày sau đó chọn Thực hiện." + "<br/>" +
                                            "Bước 3: Để xuất dữ liệu chỉ số chốt, sát tiêu đề cột ở bên phải màn hình, chọn icon xuất excel" + "<br/>" +
                                            "<span style='color:#6dcff6;'> 3. Xem thông tin điểm đo </span>" + "<br/>" +
                                            "Tại Tên khách hàng, có icon màu xanh chữ i. Chọn để xem các thông số về điểm đo: IMEI, số công tơ, mã điểm đo, các thông số biến áp TU, biến dòng TI, hệ số nhân công tơ đọc về.";
    }
    $('#huongdan').html(Huongdan);
}