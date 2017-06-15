
var infoParaDtt = null;
var thongTinKhac = null;
var danhSachDCUDangDoc = [];
var count_gldcu = 0;

$(document).ready(function () {
    
    $("#chitietdoc").click(function () {
        if ($(this).hasClass("hide_chitietdoc")) {
            $("#thongbao_dtt").slideDown();
            $(this).removeClass("hide_chitietdoc");
            $(this).addClass("show_chitietdoc");
        } else {
            $("#thongbao_dtt").slideUp();
            $(this).removeClass("show_chitietdoc");
            $(this).addClass("hide_chitietdoc");
        }
    })

});

function f_CheckKetQuaDtt_gldd() {
    try {
            danhSachDCUDangDoc = [];
            $("#thongbao_dtt").empty();
            //try {
            //    if (thongTinKhac != null && thongTinKhac != undefined && thongTinKhac.hasTimer) {
            //        f_stopTimerDtt();
            //        return;
            //    }
            //}
        //catch (ex) { console.log(ex); }
        
            try {
                thongTinKhac = {
                    choPhepDocFile: false, danhSachIdDoc: "", guilaplai: 3,
                    moilancachnhau: 2, dangdocloi: 0, hasTimer: false, timedatagannhat: getfulltimenow01(), neufilekhongcodulieuphut: 1
                };

                thongTinKhac.hasTimer = true;
                f_GetInfoFromTree_dtt();
                $("#close_div_warning_msg").click();

            } catch (e) { console.log(e); }

    } catch (e) { console.log(e); }
}


function f_GetInfoFromTree_dtt() {
    try {
        $("#thongbao_dtt").append(getfulltimenow01() + ": Lấy thông tin từ database<br/>");
        var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.GUILENHDENMULTYDCU", callback: "f_resultGetInfoFromTree_dtt" };

        var para = { V_THOIDIEMRALENH: "" };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_resultGetInfoFromTree_dtt(config, para, lst) {
    try {
        $("#thongbao_dtt").append(getfulltimenow01() + ": Lấy thông tin database thành công<br/>");
        if (lst == null || lst == undefined || lst.data == '[]' || lst.data == ''
            || lst.data.length == 0 || lst.result == "ERROR") {
            messInfo("info_dtt", "Không có dữ liệu hiển thị", "error");
            return;
        }
        f_gridView_dtt(lst.data[0].kq0);
        f_startTimerCheckDatabase_dtt();

        //check tcp
        thongTinKhac.choPhepDocFile = false;
        f_sendTcpConnect(lst.data[1].kq1[0]);

    } catch (e) {
        console.log(e);
    }
}

function f_LayThongTinIpPort_dtt() {

    try {
        if (thongTinKhac.hasTimer) {
            var lstImei = "";
            if (danhSachDCUDangDoc.length > 0) {
                $.each(danhSachDCUDangDoc, function (key, val) {
                    lstImei += val.imei + ",";
                });
            }
           // var infodk = JSON.parse(localStorage.getItem("infodk"));

            var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.LAYLENHTUONGUNG", callback: "f_resutl_LayThongTinIpPort_dtt" };

            var para = {
                V_THOIDIEMRALENH: infoParaDtt.config.thoidiem
                , V_LSTIMEI:lstImei// infodk.loaithietbi=="TU"? lstImei:""
            };
            ExecuteServiceSyns(config, para);
        }
    } catch (e) { console.log(e); }
}

function f_resutl_LayThongTinIpPort_dtt(config, para, lst) {
    try {
        if (lst.data.length == 0 || lst.data == '[]' || lst.data == '' || lst.data.length == 0
            || lst.data[0].imei == null || lst.data[0].imei == undefined) {
            thongTinKhac.choPhepDocFile = true;
            return;
        }

        thongTinKhac.choPhepDocFile = false;
        f_sendTcpConnect(lst.data[0]);

    } catch (e) { console.log(e); }
}


function f_startTimerCheckDatabase_dtt() {
    try {
        try {
            $('.timer').timer('remove');
        }
        catch (e) { }
        statusProsessBar();
        $('.timer').timer({
            editable: true,
            duration: '2s',
            repeat: true,
            callback: function () {
                try {
                    f_kiemTraKetQua_dtt();
                    f_checkGuiLai();
                    f_checkFileKhongCoDuLieuVe();
                    f_kiemTraFile();
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }

}


function f_sendTcpConnect(val) {
    try {
        if (val == null || val == undefined || val.imei == null || val.imei == undefined)
            return;

        $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + val.imei + " bắt đầu kết nối <br/>");
        var config = {
            namefile: val.tenfile,
            imei: val.imei,
            thoidiem: val.thoidiem,
            callback: "f_trangThaiKetNoi_dtt",
            resulttcp: "receive",
            lenh: val.lenh
        };
        var para = {
            type: "connect",
            ip: val.ip,
            port: val.port
        };
        infoParaDtt = { config: config, para: para };
        api_ExecuteTcpString(config, para);

    } catch (e) { console.log(e); }
}

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

function f_trangThaiKetNoi_dtt(config, para, lst) {
    try {
        setTimeout(function () {
            f_sendTcp_dtt(infoParaDtt.config.namefile, "f_result_Connect3ToComserver", "sendstring", "#" + f_random16SoImei() + "+CSQ:IFCMASTER#");
        }, 400);

    } catch (e) { }
}

function f_result_Connect3ToComserver(config, para, lst) {
    try {
        setTimeout(function () {
            f_sendTcp_dtt(infoParaDtt.config.namefile, "f_result_ReadImei_dtt", "sendstring", "@READ" + infoParaDtt.config.imei);
        }, 400);

    } catch (e) { console.log(e); }
}

function f_result_ReadImei_dtt(config, para, lst) {
    try {
        // TIMER CHECK KET QUA
        setTimeout(function () {
            f_result_startTimerCheckTcp_dtt("f_result_FinishKetNoiDcu_dtt");
        }, 800);

        // f_result_startTimerCheckTcp_dtt();

    } catch (e) { console.log(e); }
}


function f_result_startTimerCheckTcp_dtt(callback) {
    try {
        var config = {
            namefile: infoParaDtt.config.namefile,
            callback: callback
        };
        var para = {
            type: "receive"
        };
        api_ExecuteTcpString(config, para);
    } catch (e) { console.log(e); }
}


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

    $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + infoParaDtt.config.imei + " chưa kết nối được.<br/>");
    f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUILAI");
}

function f_NeuCoKetQuaTraRaTuFile_dtt(lst) {
    if (lst.toLowerCase().indexOf("@notread1") >= 0) {
        $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + infoParaDtt.config.imei + " đang trong quá trình đọc dữ liệu, vui lòng đợi vài phút<br/>");
        f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUILAI");
        return;
    }
    if (lst.toLowerCase().indexOf("@notread2") >= 0) {
        $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + infoParaDtt.config.imei + " chưa kết nối được<br/>");
        f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUILAI");
        return;
    }
    if (lst.toLowerCase().indexOf("@read") >= 0) {
        $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + infoParaDtt.config.imei + " kết nối thành công<br/>");
        f_sendTcp_dtt(infoParaDtt.config.namefile, "f_result_guiLenhThanhCong_dtt", "sendbyte", f_forartHex(infoParaDtt.config.lenh));
        $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + infoParaDtt.config.imei + " gửi lệnh thành công<br/>");
        return;
    }
}

function f_result_guiLenhThanhCong_dtt(config, para, lst) {

    var checkExists = checkExists_dtt(infoParaDtt.config.imei, danhSachDCUDangDoc);
    if (!checkExists) {
        var info = { imei: infoParaDtt.config.imei, thoidiemfilevegannhat: getfulltimenow01(), namefile: infoParaDtt.config.namefile }
        danhSachDCUDangDoc.push(info);
    }
    f_GuiXong_Tcp_dtt(infoParaDtt.config.namefile, "", "GUIXONG");

}

function f_ChoPhepNext_dtt() {
    try {
        f_LayThongTinIpPort_dtt();
    } catch (e) { console.log(e); }
}

function f_gridView_dtt(data) {

    $("#tblDataTsvhDocTucThoi tbody").empty();
    try {
        var i = 1;
        $.each(data, function (key, val) {
            try {
                var tr = "";
                //tr += "<tr class='dtt_hidedata rowdata_dtt' id='tr" + val.id + "' value='" + val.id + "' sosanhtext='" + val.sosanhtext + "' imei ='"+val.imei+"'>";
                tr += "<tr class='rowdata_dtt' id='tr" + val.id + "' value='" + val.id + "' sosanhtext='" + val.sosanhtext + "' imei ='" + val.imei + "'>";
                tr += "<td class='cc stt_dtt' >" + i + "</td>";
                tr += "<td class='cc'>" + val.tenthietbi + "</td>";
                tr += "<td class='cc " + "readwait" + "' id='trangthai" + val.id + "' ></td>";
                i++;
                tr += "</tr>";
                $("#tblDataTsvhDocTucThoi tbody").append(tr);
            } catch (ex) { console.log(ex); }
        });
    } catch (e) {
        console.log(e);
    }
}

function f_kiemTraKetQua_dtt() {
    try {
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
                var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.KIEMTRAKETQUA", callback: "f_result_kiemTraKetQua_dtt" };

                var infodk = JSON.parse(localStorage.getItem("infodk"));
                var para = {
                    V_LISTID: thongTinKhac.danhSachIdDoc,
                    V_THOIDIEM: infoParaDtt.config.thoidiem,
                    V_LOAITHIETBI: infodk.loaithietbi,
                    V_LOAIDIEUKHIEN: infodk.loaidk,
                    V_CHEDO: infodk.loaichedo
                }
                ExecuteServiceSyns(config, para);
            }
            else
                f_stopTimerDtt();
        }
    } catch (e) {
        console.log(e);
    }
}

function f_result_kiemTraKetQua_dtt(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == '[]' || lst.data == '' || lst.data.length == 0)
            return;
        $.each(lst.data, function (key, val) {
            try {
                f_setValueToGrid_dtt(val.id, val.trangthai);

            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function f_setValueToGrid_dtt(id, classtrangthai) {
    try {
        var trangthai = $("td#trangthai" + id).attr("class");
        if (trangthai!=null && trangthai != undefined && trangthai.toLowerCase().indexOf("readok") < 0) {
            try {
                $("td#trangthai" + id).removeClass("readwait").addClass(classtrangthai);
               // $("td#trangthai" + id).parent("tr").removeClass("dtt_hidedata");
            } catch (ee) { }
            try {
                $("td#trangthai" + id).removeClass("readresend").addClass(classtrangthai);
              //  $("td#trangthai" + id).parent("tr").removeClass("dtt_hidedata");
            } catch (ee) { }


            // luu lai thoi gian cuoi cung ok
          //  thongTinKhac.timedatagannhat = getfulltimenow01();
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

function f_kiemTraFile() {
    try {
        if (!thongTinKhac.choPhepDocFile) return;

        $.each(danhSachDCUDangDoc, function (key, val) {
            var config = {
                namefile: val.namefile,
                callback: "f_result_kiemTraFile",
                imei: val.imei
            };
            var para = {
                type: "receive"
            };
            api_ExecuteTcpString(config, para);
        });

    } catch (e) { console.log(e); }
}

function f_result_kiemTraFile(config, para, lst) {
    try {
        
        if (lst != "") {
            for (var i = 0 ; i < danhSachDCUDangDoc.length ; i++) {
                if (danhSachDCUDangDoc[i].imei == config.imei) {
                    danhSachDCUDangDoc[i].thoidiemfilevegannhat = getfulltimenow01();
                }
            }
            var arr = lst.split("\r\n");
            $.each(arr, function (key, val) {
                f_checkFileTrucTiep_dtt(val);
                // NEU DOC SAI SHOW TRANG THAI SAI
                //if (val.toLowerCase().indexOf("readfail") >= 0) {
                //    var sp = val.replace("\t", " ").split(' ');
                //    console.log(sp);
                //    if (sp.length > 2) {
                //        var sosanhtext = sp[1];
                //        var thisss = $(".rowdata_dtt[sosanhtext='" + sosanhtext + "']");
                //        var id = $(thisss).attr("value");
                //        if (id != null && id != undefined)
                //            f_setValueToGrid_dtt(id, "readresend");
                //    }
                //}
                // NEU DCU NAO DO THUC HIEN XONG SE BAO XONG 
                if (val.toLowerCase().indexOf("read meter success") >= 0) {
                    f_GuiXong_Tcp_dtt(config.namefile, "", "GUIXONG");
                    $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + config.imei + " đọc xong<br/>");
                }
                if (val.toLowerCase().indexOf("receivecommandsuccess") >= 0) {
                    f_GuiXong_Tcp_dtt(config.namefile, "", "GUIXONG");
                    $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + config.imei + " nhận lệnh thành công, bắt đầu thực hiện lệnh<br/>");
                }
                if (val.toLowerCase().indexOf("dcu0") >= 0) {
                    $("#thongbao_dtt").append(getfulltimenow01() + ": DCU " + config.imei + " đang trong quá trình đọc tức thời<br/>");
                }
            });
        }
    } catch (e) { console.log(e); }
}

function f_checkFileTrucTiep_dtt(str)
{
    try
    {
        // neu la tu
        if (str.substr(15, 1) == "1" && str.substr(17, 1) == "1");
        {
            var thisss = $(".rowdata_dtt[sosanhtext='" + str.substr(0, 15) + "']");
            var id = $(thisss).attr("value");
            f_setValueToGrid_dtt(id, "readok");
        }
        if (str.substr(15, 1) == "1" && str.substr(17, 1) == "0");
        {
            var thisss = $(".rowdata_dtt[sosanhtext='" + str.substr(0, 15) + "']");
            var id = $(thisss).attr("value");
            f_setValueToGrid_dtt(id, "readresend");
        }

        // neu la DIEU KHIEN BONG
        if ((str.substr(15, 1) == "2" && str.substr(17, 1) == "1")||((str.substr(15, 1) == "3" && str.substr(17, 1) == "1")))
        {
            var thisss = $(".rowdata_dtt[sosanhtext='" + str.substr(18, 12) + "']");
            var id = $(thisss).attr("value");            
            f_setValueToGrid_dtt(id, "readok");
        }
        if ((str.substr(15, 1) == "2" && str.substr(17, 1) == "0")||((str.substr(15, 1) == "3" && str.substr(17, 1) == "0")))
        {
            var thisss = $(".rowdata_dtt[sosanhtext='" + str.substr(18, 12) + "']");
            var id = $(thisss).attr("value");
            f_setValueToGrid_dtt(id, "readresend");
        }
        // neu la TRUY VAN BONG 
        //console.log(infoParaDtt.config.lenh.substr(46, 2));
        //if (str.substr(15, 1) == "4" && infoParaDtt.config.lenh.substr(46, 2)=="34") {
        //    $('#GuiLenhDenDcu').modal('hide');
        //}
    } catch (e) { console.log(e);}
}


function f_GuiXong_Tcp_dtt(namefile, imei, type) {
    try {
        if (type == "GUILAI") {
            count_gldcu++;
            if(count_gldcu>=3)
            {
                if(danhSachDCUDangDoc.length>0)
                danhSachDCUDangDoc.splice(danhSachDCUDangDoc.length, 1);
                count_gldcu = 0;
            }
        }
        else 
            count_gldcu = 0;

        var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.BAOLAIDCUNAODOCXONG", callback: "f_DocDcuXong_dtt" };

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
function f_checkGuiLai() {
    if (thongTinKhac.dangdocloi >= thongTinKhac.guilaplai) {
        f_stopTimerDtt();
    }
    
    var comparTime = compareDates01(formartDateTime(thongTinKhac.timedatagannhat), formartDateTime(getfulltimenow01()));
    // sau may phut khong doc duoc thi gui lai nhung con loi
    
    if (comparTime.minutes > parseInt(thongTinKhac.moilancachnhau)) {        
        thongTinKhac.dangdocloi++;
        thongTinKhac.timedatagannhat = getfulltimenow01();
        f_resendAllError();
        return;
    }
}
function f_resendAllError() {
    try {
        // gui lai sau may lan
        var lstId = "";
        $(".readresend").each(function () {
            try {
                var id = $(this).attr("id").replace("trangthai", "");
                lstId += id + ",";
                try {
                    $("#trangthai" + id).removeClass("readresend").addClass("readwait");
                } catch (ec) { }
            } catch (ex) { console.log(ex); }
        });
        $(".readwait").each(function () {
            try {
                var id = $(this).attr("id").replace("trangthai", "");
                lstId += id + ",";
            } catch (ex) { console.log(ex); }

        });
        if (lstId != "") {
            $("#thongbao_dtt").append(getfulltimenow01() + ": Gửi lại lần " + thongTinKhac.dangdocloi + "<br/>");
            f_LoadResendInfoError(lstId);
        }
        else {
            f_stopTimerDtt();
        }
    } catch (e) { console.log(e); }

}
function f_LoadResendInfoError(lst) {
    try {
        var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_DIEUKHIEN_DCU.GUILAITHEODANHSACH", callback: "f_resultLoadResendInfoError" };

        var para = {
            V_LISTID: lst,
            V_THOIDIEM: infoParaDtt.config.thoidiem
        }
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}

function f_resultLoadResendInfoError(config, para, lst) {
    f_LayThongTinIpPort_dtt();
}

function f_stopTimerDtt() {
    try {
        thongTinKhac.hasTimer = false;
        try {
            $("#delayClock").removeClass("clock").addClass("clock1");
        } catch (ev) { }
        $('.timer').timer('pause');
        f_chuyendoisangdung();

    } catch (e) {
        console.log(e);
        $('.timer').timer('pause');
    }
}

function f_chuyendoisangdung() {
    try {
        $(".readwait").each(function () {
            try {
                $(this).removeClass("readwait").addClass("readerror");
            } catch (ex) { console.log(e); }
        });
        $(".readresend").each(function () {
            try {
                $(this).removeClass("readresend").addClass("readerror");
            } catch (ex) { console.log(e); }
        });
        $("#tblDataTsvhDocTucThoi tbody tr").each(function () {
            //var check = $(this).hasClass("dtt_hidedata");
            //if (check) {
            //    $(this).removeClass("dtt_hidedata");
            //}
        });
        //statusProsessBar();
    } catch (e) { console.log(e); }
}

function statusProsessBar() {
    try {
        var next = $('.readok').length;
        var loi = $('.readresend').length + $('.readerror').length;
        var sum = $("#tblDataTsvhDocTucThoi tbody tr").length;//$('.readerror').length + $('.readok').length + $('.readwait').length + $('.readresend').length;

        var phantram = Math.round((next * 100) / sum, 1);
        $(".load").css('width', phantram + '%');
        $(".loadtext").html("Thành công: <b>" + next + "</b> --- Thất bại: <b>" + loi + "</b>" + " --- Tổng thiết bị: <b>" + sum + "</b>");

        if ((next + $('.readerror').length) >= sum)
        {
            f_stopTimerDtt();
        }
    } catch (e) { console.log(e); }
}

function checkExists_dtt(value, myArray) {
    $.each(myArray, function (i, obj) {
        if (obj.imei == value)
            return true;
    });
    return false;
}

function f_checkFileKhongCoDuLieuVe() {
    try {
        // sau may phut DCU nao khong phan hoi thi cho next
        if (danhSachDCUDangDoc.length == 0)
            return;
        var i = 0;
        var indexDelete = [];
        $.each(danhSachDCUDangDoc, function (key, val) {
            var comparTime = compareDates01(formartDateTime(val.thoidiemfilevegannhat), formartDateTime(getfulltimenow01()));
            
            if (comparTime.minutes > parseInt(thongTinKhac.neufilekhongcodulieuphut)) {
                f_GuiXong_Tcp_dtt(val.namefile, "", "GUIXONG");
                indexDelete.push(i);
            }
            i++;
        });
        if (indexDelete.length > 0)
            $.each(indexDelete, function (key, val) {
                danhSachDCUDangDoc.splice(val, 1);
            });
    } catch (e) { console.log(e); }
}