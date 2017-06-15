$(document).ready(function () {
    try{
        loadConetent();
    
        $('#txt_search_kh_master').on('keydown', function (e) {
            if (e.which == 13) {
                if (window.location.href.toString().indexOf("KhachHang/TimKiemKhachHang") == -1)
                    window.location.href = "#Module/KhachHang/TimKiemKhachHang";
                var p = getAllIdMod();
                f_lay_thong_tin_chi_tiet_kh_tkkh(p.txt_search_kh_master);
            }
        });

    } catch (e) {
        console.log(e);
    }
});

function f_lay_thong_tin_chi_tiet_kh_tkkh(id) {
    try {
        var config = { namesql: "HD_TIMKIEMKH.TIMKIEMKH", callback: "f_result_chitietdiemdo", connstr: "Oracle_HDDT" };
        var para = { v_ID: id };
        ExecuteServiceSyns(config, para);
     
    } catch (e) {
        console.log(e);
    }
}
function f_result_chitietdiemdo(config, para, lst) {
    try {
        var data = lst.data;
        $("#tb_danhsachkh").empty();
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_kh", 'Không có dữ liệu hiển thị', 'error');
            return;
        }

        messInfo("messinfo_kh", '', 'error');
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.makhachhang + "</td><td>"
                + val.socongto + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#lichsuhoadon'  id='btn_loachitiethoadon" + val.madiemdo + "'>Chi tiết hóa đơn</a> &nbsp</div></form></td> <td>"
                + loadhopdong(val.tenfilehd, val.idkh) + "</td><td>"
                + thanhly(val.thanhly_hd, val.idkh);
            $("#tb_danhsachkh").append(row);
            $("#btn_idkh_thanhlyhopdong" + val.idkh).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn thanh lý hợp đồng", "Bỏ qua", "Xác nhận", function () {
                capnhatthanhly(val.idkh);
                 });
            });
            $("#btn_idkh_taohd" + val.idkh).click(function () {
                window.location.href = "#Module/KhachHang/Khaibaohopdongkhachhang";
               
                setTimeout(function () { f_change(val.idkh); }, 300);
            });
            $("#btn_loachitiethoadon" + val.madiemdo).click(function () {
                setTimeout(function () { f_lay_lich_su_hoa_don_lshd(val.madiemdo); }, 300);
            });

        });
    } catch (e) {
        console.log(e);
    }
}
function loadhopdong(val,idkh) {
    try {
        if (val == "" || val == null) {

            return "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  value='" + idkh + "' id='btn_idkh_taohd" + idkh + "'><i class='fa fa-plus'></i> Tạo Hợp đồng</a></div></form>";

           // return "Không có mẫu hợp đồng";
        }
        var link = urli + "/home/DownloadFileSaveOnServer/" + val;
        return'<a href="' + link + '">Download hợp đồng</a>';

    } catch (e) {
        console.log(e);
    }
}
function thanhly(val,id) {
    try {
       
       if (val == 0) {
            return "Hợp đồng này đã thanh lý </td></tr>";
       } else if (val == "" || val == null) {
           return "Chưa có hợp đồng </td></tr>";
       }else {
            return "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  value='" + id + "' id='btn_idkh_thanhlyhopdong" + id + "'>Thanh lý</a></div></form></td></tr>";
        }
     } catch (e) {
        console.log(e);
    }
}
function capnhatthanhly(id) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THANKLYHOPDONG.THANHLYHD", callback: "result_capnhatthanhly" };
        var para = {
            v_ID: id,
            v_USERID: ''
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function loadchitiet(val) {
    try{

    } catch (e) {
        console.log(e);
    }
}

function result_capnhatthanhly(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kh", row, 'ok');
           
        } else {
            messInfo("messinfo_kh", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}



