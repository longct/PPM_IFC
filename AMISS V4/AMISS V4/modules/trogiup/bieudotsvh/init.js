$(document).ready(function () {
    $('#btn_Close').click(function(){
        $('#tsvh_3pha').modal('toggle');
    });
  
});
function f_trogiup_tsvh() {
    f_get_mota();
    f_get_huongdan();
}



function f_get_mota() {
   
    var Mota = "1. Thông số vận hành hiển thị tất cả các thông số vận hành theo từng pha tại thời điểm ra lệnh đọc. Các thông số bao gồm:"+"<br/>"+
    "- U (V) : điện áp của dòng điện, kí hiệu U, đơn vị V(Volt)" + "<br/>" +
    "- I (A): dòng điện, kí hiệu I, đơn vị A (Ampe)" + "<br/>" +
    "- Góc φ: góc giữa U và I, đơn vị độ (Degrees)" + "<br/>" +
    "- Cos φ: Hệ số góc<br/>" +
    "- P (kW): công suất hữu ích của từng pha, đơn vị kW" + "<br/>" +
    "- Q (kVAR): công suất phản kháng của từng pha, đơn vị kVAR" + "<br/>" +
    "- F (Hz): Tần số của từng pha, đơn vị Hz"+ "<br/>" +
    "2. Màu sắc theo từng pha:"+ "<br/>" +
    "- Pha A: Màu vàng"+ "<br/>" +
    "- Pha B: Màu xanh"+ "<br/>" +
    "- Pha C: Màu đỏ";
    $('#mota').html(Mota);

}
function f_get_huongdan() {
  
    var Huongdan = "<span style='color:#6dcff6;'> 1. Xem thông số vận hành của nhiều điểm đo </span>" + "<br/>" +
                                        "Bước 1: Chọn Menu Vận hành, chọn Thông số vận hành." + "<br/>" +
                                        "Bước 2: Chọn nhóm điểm đo muốn xem. Hiển thị dữ liệu thông số vận hành mới nhất của tất cả các điểm đo thuộc nhóm đã chọn." + "<br/>" +
                                        "Bước 3: Để xem dữ liệu ngày trước đó, chọn ngày và thời điểm sau đó chọn Thực hiện để xem thông số vận hành tại thời điểm đã chọn." + "<br/>" +
                                        "<span style='color:#6dcff6;'> 2. Xem thông số của 1 điểm đo </span>" + "<br/>" +
                                        "Bước 1: Chọn 1 điểm đo. Hiển thị dữ liệu của điểm đo trong ngày hiện tại." + "<br/>" +
                                        "Bước 2: Để xem dữ liệu ngày trước đó, chọn ngày sau đó chọn Thực hiện." + "<br/>" +
                                        "Bước 3: Để xuất dữ liệu thông số vận hành, sát tiêu đề cột ở bên phải màn hình, chọn icon xuất excel" + "<br/>" +
                                        "<span style='color:#6dcff6;'> 3. Xem thông tin điểm đo </span>" + "<br/>" +
                                        "Tại Tên khách hàng, có icon màu xanh chữ i. Chọn để xem các thông số về điểm đo: IMEI, số công tơ, mã điểm đo, các thông số biến áp TU, biến dòng TI, hệ số nhân công tơ đọc về." + "<br/>" +
                                        "<span style='color:#6dcff6;'> 4. Tìm kiếm nâng cao </span>" + "<br/>" +
                                        "Để xem dữ liệu vận hành dựa vào các điều kiện tìm kiếm nâng cao thực hiện như sau:" + "<br/>" +
                                        "Bước 1: Chọn Tìm kiếm nâng cao" + "<br/>" +
                                        "Bước 2: Nhập điều kiện tìm kiếm: U, I, Cos φ, Góc φ, P, Q, F " + "<br/>" +
                                        "Bước 3: Chọn Thực hiện";
  
    $('#huongdan').html(Huongdan);
}