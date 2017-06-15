
var hasTimer = false;
var resendError = 0;
var infoParaDtt = null;
var thongTinKhac = {
    choPhepDocFile: false, // Chỉ cho phép đọc file khi đã gửi hết lệnh xuống COM
    danhSachIdDoc: "",
    guilaplai: 5, // Số lần tối đa được phép retry nếu đọc lỗi
    moilancachnhau: 3,
    dangdocloi: 0, // Biến đếm số lần đã retry
    hasTimer: false, // Xác định xem timer đang chạy hay ko
    timedatagannhat: getfulltimenow(), // Luôn cập nhật thời điểm gần nhất có 1 lệnh gửi DCU
    neufilekhongcodulieuphut: 1
};
$(document).ready(function () {
    
    showhideTree();
    loadContent();
    selectlang();
   
    $('#btnReadDtt').on('click', function () {
        try {
            if (hasTimer) {
                f_stopTimerDtt();
                return;
            }
        }
        catch (ex) { console.log(ex); }
        try {
            resendError = 0;
            var objFilter = localStorage.getItem("tree_node");
            if (objFilter == null || objFilter == "") {
                showToast("Vui lòng chọn một điểm đo", "error");
                return;
            }

            f_GetInfoFromTree();

        } catch (e) { }
    });
   
});


function f_GetInfoFromTree() {
    try {
        var objFilter = JSON.parse(localStorage.getItem("tree_node"));
        var objuser = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle_Amiss4", nameSql: "PKG_DOCTUTHOI.LAYTHONGTINTUTREE", callback: "f_resultGetInfoFromTree" }
        var para = {
            v_Value: objFilter[0].code,
            v_UserId: objuser.userid,         
            V_READTYPE: $("select#cbbLoaiReadDtt option:selected").val()
        }
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
  
    }
}

function f_resultGetInfoFromTree(config, para, lst) {
    try {
        console.log(lst);
        if (lst.data.length == 0) {
      
            showToast("Không có dữ liệu hiển thị", "error");
            f_stopTimerDtt();
            return;
        }
        if (lst.data[0].kq0 == null || lst.data[0].kq0 == undefined ) return;
        // Vẽ bảng danh sách KH
        f_gridView_dtt(lst.data[0].kq0);

        // Bật timer check dữ liệu trong DB xem có trả về chưa
        f_startTimerCheckDatabase_dtt();

        // Bắt đầu được phép đọc file ????
        thongTinKhac.choPhepDocFile = false;

        // Gọi service gửi lệnh xuống COM bằng TCP/IP
        f_sendTcpConnect(lst.data[1].kq1[0]);
        f_checkstopall();
       
    } catch (e) {
        console.log(e);
        f_checkstopall();
    }
}
// Bật timer check dữ liệu trong DB xem có trả về chưa
function f_startTimerCheckDatabase_dtt() {
    try {

        console.log("startTimer");
        try {
            $('.timer').timer('remove');
        }
        catch (e) { }
        statusProsessBar();
        $('.timer').timer({
            editable: true,
            duration: '10s',
            repeat: true,
            callback: function () {
                try {
                    // Lần lượt check từng công tơ trong DB xem đã có dữ liệu mới đọc về hay chưa
                    f_kiemTraKetQua_dtt();


                    // Kiểm tra điều kiện được phép gửi lại lệnh đọc với các công tơ đã đọc lỗi
                    // Nguyên tắc: sau khi đọc hết danh sách, chờ một khoảng thời gian = thongTinKhac.moilancachnhau
                    // rồi mới cho đọc lại tất cả danh sách công tơ lỗi
                   // f_checkGuiLai();


                    // Kiểm tra xem có file DCU gửi về chưa
                    // Có thì reset thời gian file gần nhất về hiện tại
                    // Nếu ko thì sau 3phut sẽ gửi lại lệnh
                  //  f_checkFileKhongCoDuLieuVe();

                    // Kiểm tra xem công tơ có đọc được hay ko dựa vào kết quả trong file gửi về
                    // , ko cần chờ trong DB
                  //  f_kiemTraFile();
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }

}
// load khách hàng ra girdview
function f_gridView_dtt(data) {
    $("#tblDataTsvhDocTucThoi tbody").empty();
    try {
        var i = 1;
        $.each(data, function (key, val) {
            try {
                var tr = "";
                tr += "<tr class='dtt_hidedata rowdata_dtt' id='tr" + val.id + "' value='" + val.id + "' socongto='" + val.socongtofm + "'>";
                tr += "<td class='cc stt_dtt' >" + i + "</td>";
                tr += "<td class='cc'>" + val.tendiemdo + "</td>";
                tr += "<td class='cc'>" + val.socongto + "</td>";
                tr += "<td class='cc uHide' id='u" + val.id + "'>-</td>";
                tr += "<td class='cc iHide' id='i" + val.id + "'>-</td>";
                tr += "<td class='cc cosHide' id='cos" + val.id + "'>-</td>";
                tr += "<td class='cc TtenHide' id='p" + val.id + "'>-</td>";
                tr += "<td class='cc EventHide' id='event" + val.id + "'>-</td>";
                tr += "<td class='cc' id='time" + val.id + "'>-</td>";

                tr += "<td class='cc " + "readwait" + " " + val.imei + "' id='trangthai" + val.id + "' ></td>";
                i++;
                tr += "</tr>";
                $("#tblDataTsvhDocTucThoi tbody").append(tr);
                f_anHienGrid_dtt();
            } catch (ex) { console.log(ex); }
        });
    } catch (e) {
        console.log(e);
    }
}
//load ẩn hiển dữ liệu trên gridview
function f_anHienGrid_dtt() {

    try {
        var type = $("select#cbbLoaiReadDtt option:selected").val();

        var hide;
        var show;
        if (type == "Tten") {
            show = ["TtenHide"];
            hide = ["uHide", "iHide", "cosHide", "EventHide", "ThongTinHide"];
            f_loadAnHienTuongUng(hide, show);
        }
        if (type == "TtenUi") {
            show = ["uHide", "iHide"];
            hide = ["TtenHide", "EventHide", "cosHide"];
            f_loadAnHienTuongUng(hide, show);
        }
        if (type == "Tsvh") {
            show = ["uHide", "iHide", "cosHide", "TtenHide"];
            hide = ["EventHide"];
            f_loadAnHienTuongUng(hide, show);
        }
        if (type == "Event") {
            show = ["EventHide"];
            hide = ["uHide", "iHide", "cosHide", "TtenHide"];
            f_loadAnHienTuongUng(hide, show);
        }
    }
    catch (e) { console.log(e); }

}

function f_loadAnHienTuongUng(hide, show) {
    try {
        $.each(hide, function (key, val) {
            $("." + val).hide();
        });
        $.each(show, function (key, val) {
            $("." + val).show();
        });
    } catch (e) { console.log(e); }
}

// Cập nhật % tiến trình đọc
// Thông báo số lượng đọc được / ko đọc được
function statusProsessBar() {
    try {
        var next = $('.readok').length;
        var loi = $('.readresend').length + $('.readerror').length;
        var sum = $("#tblDataTsvhDocTucThoi tbody tr").length;//$('.readerror').length + $('.readok').length + $('.readwait').length + $('.readresend').length;

        var phantram = Math.round((next * 100) / sum, 1);
        $(".load").css('width', phantram + '%');
        $(".loadtext").html("Thành công: <b>" + next + "</b> --- Không đọc được: <b>" + loi + "</b>" + " --- Tổng khách hàng: <b>" + sum + "</b>");

    } catch (e) { console.log(e); }
}
//stop loading
function f_checkstopall() {
    try {

        var sumok = $('.readerror').length + $('.readok').length + $('.readresend').length;
        var row = $("#tblDataTsvhDocTucThoi tbody tr").length;
        if (sumok >= row) {
            if ($('.readok').length >= row)
                f_stopTimerDtt();
            else
                f_resendAllError();
        }
    } catch (e) { console.log(e); }
}
// Lần lượt check từng công tơ trong DB xem đã có dữ liệu mới đọc về hay chưa
function f_kiemTraKetQua_dtt() {
    try {
        console.log("check kiểm tra");
        if (infoParaDtt != null && infoParaDtt != undefined && infoParaDtt.config != null && infoParaDtt.config != undefined) {
            if (thongTinKhac.danhSachIdDoc == "") {
                var lstId = "";
                $(".rowdata_dtt").each(function () {
                    var valuess = $(this).attr("value");
                    lstId += valuess != null && valuess != undefined && valuess != "undefined" ? (valuess + ",") : "";
                });
                thongTinKhac.danhSachIdDoc = lstId;
            }
            if (thongTinKhac.danhSachIdDoc != "") {
                var config = {
                    connstr: 'ConnectOracle_Amiss4',
                    namesql: "PKG_DOCTUTHOI.KIEMTRAKETQUA",
                    callback: "f_result_kiemTraKetQua_dtt"
                };

                var para = {
                    v_Id: thongTinKhac.danhSachIdDoc,
                    v_TypeCmd: $("select#cbbLoaiReadDtt option:selected").val(),
                    v_DateCheck: infoParaDtt.config.thoidiem
                }
                console.log(para);
                //ExecuteServiceSyns(config, para);

            }
        }
    } catch (e) {
        console.log(e);
    }
}

// Kết quả check dữ liệu mới đọc về có hay chưa
// Cập nhật kết quả:
// Có dữ liệu mới --> readok
// Không có --> resend
function f_result_kiemTraKetQua_dtt(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == '[]' || lst.data == '' || lst.data.length == 0)
            return;

        $.each(lst.data, function (key, val) {
            try {

                f_setValueToGrid_dtt(val.id, val.ua, val.ia, val.cosa, val.pgiaotong, val.event, val.timeread, val.soluong, "readok");

            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
// Cập nhật kết quả đọc cho từng công tơ
function f_setValueToGrid_dtt(id, ua, ia, cosa, pgiaotong, event, timeread, soluong, classtrangthai) {
    try {
        var trangthai = $("td#trangthai" + id).attr("class");
        if (soluong > 0 && trangthai.toLowerCase().indexOf("readok") < 0) {
            try {
                $("td#trangthai" + id).removeClass("readwait").addClass(classtrangthai);
                $("td#trangthai" + id).parent("tr").removeClass("dtt_hidedata");
            } catch (ee) { }
            try {
                $("td#trangthai" + id).removeClass("readresend").addClass(classtrangthai);
                $("td#trangthai" + id).parent("tr").removeClass("dtt_hidedata");
            } catch (ee) { }

            // $("a#view" + id).show();

            $("td#u" + id).html(ua);
            $("td#i" + id).html(ia);
            $("td#cos" + id).html(cosa);
            $("td#p" + id).html(pgiaotong);
            $("td#event" + id).html(event);

            // luu lai thoi gian cuoi cung ok
            thongTinKhac.timedatagannhat = getfulltimenow();
            $("td#time" + id).html(timeread);
            var i = 1;
            $("td.stt_dtt").each(function (key, val) {
                var check = $(this).parent("tr").hasClass("dtt_hidedata");
                if (!check) {
                    $(this).html(i);
                    i++;
                }
            })
            statusProsessBar();
        }
    }
    catch (e) { console.log(e) }
}
// Nhiệm vụ: Gửi lệnh tới ServiceTCP
function f_sendTcpConnect(val) {
    try {
        if (val == null || val == undefined || val.imei == null || val.imei == undefined)
            return;

        $("#thongbao_dtt").append(getfulltimenow() + ": DCU " + val.imei + " loại " + val.loaidcu + " bắt đầu kết nối <br/>");
        var config = {
            namefile: val.tenfile,
            imei: val.imei,
            istype: val.istype,
            thoidiem: val.thoidiem,
            callback: "f_trangThaiKetNoi_dtt",
            resulttcp: "receive",
            lenh: val.lenh,
            loaidcu: val.loaidcu
        };
        var para = {
            type: "connect",
            ip: val.ip,
            port: val.port
        };

        infoParaDtt = { config: config, para: para };
        console.log(para);
        api_ExecuteTcpString(config, para);

    } catch (e) { console.log(e); }
}
// Goi khi: Sau khi gửi lệnh CONNECT tới COM
// Nhiệm vụ: Gửi một chuỗi random(16) tới COM
function f_trangThaiKetNoi_dtt(config, para, lst) {
    try {
        setTimeout(function () {
            f_sendTcp_dtt(infoParaDtt.config.namefile, "f_result_Connect3ToComserver", "sendstring", "#" + f_random16SoImei() + "+CSQ:IFCMASTER#");
        }, 500);

    } catch (e) { }
}
// Dùng cho các lệnh kết nối COM (ko phải lệnh đọc)
function f_sendTcp_dtt(namefile, callback, type, data) {
    infoParaDtt.config.callback = callback;
    var config = {
        namefile: namefile,
        callback: callback
    };
    var para = {
        type: type,
        data: data
    };
    api_ExecuteTcpString(config, para);
}
// Goi khi: Sau khi gửi lệnh sendstring random(16) tới COM
// Nhiệm vụ: Gửi một lệnh @READ + IMEI tới COM (bắt buộc theo yêu cầu Phần cứng)
function f_result_Connect3ToComserver(config, para, lst) {
    try {
        setTimeout(function () {
            f_sendTcp_dtt(infoParaDtt.config.namefile, "f_result_ReadImei_dtt", "sendstring", "@READ" + infoParaDtt.config.imei);
        }, 500);

    } catch (e) { console.log(e); }
}

function f_result_ReadImei_dtt(config, para, lst) {
    try {
        // TIMER CHECK KET QUA
        setTimeout(function () {
            f_result_startTimerCheckTcp_dtt("f_result_FinishKetNoiDcu_dtt");
        }, 1000);

        // f_result_startTimerCheckTcp_dtt();

    } catch (e) { console.log(e); }
}

// Kiểm tra kết quả CONNECT của DCU
// Nếu có kết quả là NOTREAD1, NOTREAD2, READ thì xử lý theo từng case cụ thể 
// Còn không thì chờ thêm 1s để check lại
function f_result_FinishKetNoiDcu_dtt(config, para, lst) {
    try {
        if (lst.toLowerCase().indexOf("@notread1") >= 0 || lst.toLowerCase().indexOf("@notread2") >= 0 || lst.toLowerCase().indexOf("@read") >= 0) {
            f_NeuCoKetQuaTraRaTuFile_dtt(lst);
            return;
        }

        setTimeout(function () {
            f_result_startTimerCheckTcp_dtt("f_DoiThem1LuotTuFileTraRa_dtt")
        }, 1000);


    } catch (e) { console.log(e); }
}
function f_DoiThem1LuotTuFileTraRa_dtt(config, para, lst) {
    if (lst.toLowerCase().indexOf("@notread1") >= 0 || lst.toLowerCase().indexOf("@notread2") >= 0 || lst.toLowerCase().indexOf("@read") >= 0) {
        f_NeuCoKetQuaTraRaTuFile_dtt(lst);
        return;
    }

    $("#thongbao_dtt").append(getfulltimenow() + ": DCU " + infoParaDtt.config.imei + " loại " + infoParaDtt.config.loaidcu + " chưa kết nối được.<br/>");
    f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUILAI");
}
// Nhiệm vụ: Cập nhật trạng thái gửi lệnh xuống bảng temp danh sách lệnh
function f_GuiXong_Tcp_dtt(namefile, imei, type) {
    try {
        var config = {
            connstr: KetNoiToiOracle,
            namesql: "PKG_DOCTUTHOI.BAOLAIDCUNAODOCXONG",
            callback: "f_DocDcuXong_dtt"
        };

        var para = {
            V_TENFILE: namefile,
            V_IMEI: imei,
            V_TYPE: type
        }
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function f_DocDcuXong_dtt(config, para, lst) {
    f_ChoPhepNext_dtt();
}
// Gọi hàm khi: Gửi lệnh xong
// Mục đích: kiểm tra xem lệnh gửi thành công hay chưa
// Nếu gửi fail: Thì gửi lại luôn, được phép gửi lại 3 lần
// Nếu gửi thành công: Remove các bản tin lệnh đã tạo trong bảng tạm
function f_NeuCoKetQuaTraRaTuFile_dtt(lst) {
    if (lst.toLowerCase().indexOf("@notread1") >= 0) {
        $("#thongbao_dtt").append(getfulltimenow() + ": DCU " + infoParaDtt.config.imei + " loại " + infoParaDtt.config.loaidcu + " đang trong quá trình đọc dữ liệu, vui lòng đợi vài phút<br/>");
        f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUILAI");
        return;
    }
    if (lst.toLowerCase().indexOf("@notread2") >= 0) {
        $("#thongbao_dtt").append(getfulltimenow() + ": DCU " + infoParaDtt.config.imei + " loại " + infoParaDtt.config.loaidcu + " chưa kết nối được<br/>");
        f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUILAI");
        return;
    }
    if (lst.toLowerCase().indexOf("@read") >= 0) {
        $("#thongbao_dtt").append(getfulltimenow() + ": DCU " + infoParaDtt.config.imei + " loại " + infoParaDtt.config.loaidcu + " kết nối thành công<br/>");
        f_sendTcp_dtt(infoParaDtt.config.namefile, "f_result_guiLenhThanhCong_dtt", "sendbyte", f_forartHex(infoParaDtt.config.lenh));
        $("#thongbao_dtt").append(getfulltimenow() + ": DCU " + infoParaDtt.config.imei + " loại " + infoParaDtt.config.loaidcu + " gửi lệnh thành công<br/>");
        return;
    }
}

