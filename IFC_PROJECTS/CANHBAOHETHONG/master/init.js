
$(document).ready(function () {
    try {
        //loadchecklog_master();
        //loadtaikhoan();
        //loadquyen();
        //f_lay_danh_sach_khach_hang_master();
        resize();
        loadConetent();
        //checkPermission();
        var wrapper_w = $(".wrapper").width();
        var wrapper_h = $(".wrapper").height();
      //  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //      $(".tu_panel").css("width", wrapper_w / 1.5);
      //      $(".tu_panel").css("height", wrapper_w / 1.4);
      //      $(".panel").css("max-height", wrapper_h - 50);
      //  } else {
      //      $(".tu_panel").css("width", wrapper_w / 5.2);
      //      $(".tu_panel").css("height", wrapper_w / 4.5);
      //      $(".panel").css("max-height", wrapper_h - 50);
      //  }
        

      //  $(".tu_panel").click(function () {
      //      $("#act_home").slideDown();
      //  })

      ////  $("span.uname").html(JSON.parse(localStorage.getItem("userinfo")).tennhanvien);

      //  $("#btn_dangxuat").click(function () {
      //      window.location.href = "login.html";
      //      localStorage.clear();
      //  });

        //$("#txt_search_kh_master").on("keydown", function () {
        //    if (event.which == 13) {
        //        $("#bt_tkiem_lstkh").click();
        //        return false;
        //    }
        //});
        
        

    } catch (e) { console.log(e); }
});

//function loadquyen() {
//    try {
//        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
//        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LOADQUYEN", callback: "result_loadquyen" };
//        var para = {v_USERID:userinfo.userid};
//        ExecuteServiceSyns(config, para);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function result_loadquyen(config, para, lst) {
//    try{
//        var data = lst.data;
//        arrPhanQuyen = data;

//    } catch (e) {
//        console.log(e);
//    }
//}

//function loadtaikhoan() {
//    try {
       
//        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
//        $("#txt_tenhienthi_nv").html(userinfo.ten);
//        $("#txt_tennv_nv").html(userinfo.ten);

//    } catch (e) { console.log(e); }
//}
//function loadchecklog_master() {
//    try {
//        var userinfo = localStorage.getItem('userinfo');
//        if (userinfo == null || userinfo == [] || userinfo == undefined) {
//            window.location.href = "login.html";
//            return;
//        }
//        var user = JSON.parse(localStorage.getItem("userinfo"));
//        if (user.userid == null || user.userid == [] || user.userid == undefined) {
//            window.location.href = "login.html";
//            return;
//        }
//    } catch (e) {
//        console.log(e);
//    }
//}

//function checkPermission() {
//    var permiss = JSON.parse(localStorage.getItem("userinfo")).quyen;
    
//    switch (permiss) {
//        case 2:
//            $("li#thietlapcb").hide();
//            $("li#chokb").hide();
//            $("li.u-qlnd").hide();
//            break;
//        case 3:
//            $("li#thietlapcb").hide();
//            break;
//    }
//}

//function f_lay_danh_sach_khach_hang_master() {
//    try {
//        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_danhsachkhachhang_master", connstr: "Oracle_HDDT" };
//        var para = { v_Makh: '' };
//        ExecuteServiceSyns(config, para);
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_result_danhsachkhachhang_master(config, para, data) {


//    dskh = data.data;

//    var nameArr = [];
//    nameArr.length = 0;
//    $.each(dskh, function (key, val) {
//        nameArr.push({
//            label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
//            value: val.makhachhang,
//            id: val.madiemdo,
//        });
//    });
//    $("#txt_search_kh_master").autocomplete({
//        minLength: 1,
//        delay: 200,
//        source: nameArr,
//        select: function (event, ui) {
//            if (window.location.href.toString().indexOf("KhachHang/TimKiemKhachHang") == -1)
//                window.location.href = "#Module/KhachHang/TimKiemKhachHang";
//            // Hàm này trong form timkiemkhachhang
           
//            setTimeout(function () {
             
//                f_lay_thong_tin_chi_tiet_kh_tkkh(ui.item.id);
//            }, 300);
//        }
//    });

//}