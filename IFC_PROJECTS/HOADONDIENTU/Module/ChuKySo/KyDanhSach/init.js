var timer_process_next = null;
var timer_process_countOld = 0;

function f_load_danhsachky_kds() {
    try {
        var config = { namesql: "HD_CHUKYSOS.LayThongTinTaoFileHoaDon_Web", callback: "f_result_load_danhsachky_kds", connstr: "Oracle_HDDT" };

        var para = [];

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_raLenhService() {
    try {
        var config = { pathfile: pathFileTxt, content: "" };
        ExecuteCreateFileTxt(config);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_danhsachky_kds(config, para, lst) {
    try {
        $("#tbl_View_kds tbody").empty();
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                //$('#btn_lichsuchot_execl').attr('disabled', 'disabled');
                var p = getAllIdMod();

                messInfo("messinfo_kds", "Không có hóa đơn chờ ký", "error");

                return;
            } catch (e) {
                console.log(e);
            }
        }
        $("#messinfo_Info_kds").html(data.length + " hóa đơn cần ký");
        messInfo("messinfo_kds", "", "error");

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + val.ten_khang + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.so_cto + "</td><td>"
                + val.thangxuathd + "</td>"
                + "<td class='cc unknowread' value='" + val.id_hdon + "' id='thaytrangthai" + val.id_hdon + "'>-</td>"
                + "<td class='a_c' id='download_" + val.id_hdon + "'>-</td></tr>";

            $("#tbl_View_kds tbody").append(row);
        });
    } catch (e) {
        console.log(e);
    }
}


// timer
function f_addClassWait() {
    try {
        $(".unknowread").each(function () {
            $(this).html("");
            $(this).removeAttr("class");
            $(this).addClass("cc readwait");
        });
    } catch (e) {
        console.log(e);
    }
}

function f_startTimerDtt_prcess() {
    // check 
   // f_raLenhService();
    if ($("#tbl_View_kds tbody tr").length <= 0) {
        messInfo("messinfo_kds", "Vui lòng lấy danh sách cần ký", "error");
        return;
    }
    var ok = $('.readok').length;
    var sum = $("#tbl_View_kds tbody tr").length;

    if ((sum - ok) == 0 && ok > 0) {
        messInfo("messinfo_kds", "Đã ký xong toàn bộ file, vui lòng chọn danh sách khác", "error");
        return;
    }

    if ($('.timer').data('state') == "running") {
        messInfo("messinfo_kds", "Đang trong quá trình ký vui lòng đợi", "error");
        return;
    }

    // start ky
    f_capNhatThongTinNguoiKy();
    try {
        $('.timer').timer('remove');
    }
    catch (e) { }

    f_addClassWait();
    timer_process_next = getfulltimenow();
    try {
        try {
            $("#delayClock_process").removeClass("clock1").addClass("clock");
        } catch (ev) { }
        $(".load").css('width', '0%');
        $(".loadtext").text("00:00");
        statusProsessBar();
        $('.timer').timer({
            editable: true,
            duration: '5s',
            repeat: true,
            callback: function () {
                try {
                    f_checkMultyId();
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }

}


function statusProsessBar() {
    try {
        var next = $('.readok').length;
        var sum = $("#tbl_View_kds tbody tr").length;

        var phantram = Math.round((next * 100) / sum, 1);
        $(".load").css('width', phantram + '%');
        $(".loadtext").text(next + ' / ' + sum);
    } catch (e) { console.log(e); }
}

function f_checkMultyId() {
    try {
        var arr = [];
        $(".readwait").each(function () {
            arr.push($(this).attr("value"));
        });
        var j = 0;
        var lst = "";
        for (var i = 0; i < arr.length ; i++) {
            if (j < 200) {
                lst += arr[i] + ",";
            }
            else {
                f_updateResultDtt_prcess(lst);
                lst = "";
                j = 0;
            }
        }
        if (lst != "") {
            f_updateResultDtt_prcess(lst);
            lst = "";
        }
    } catch (e) {
        console.log(e);
    }
}

function f_updateResultDtt_prcess(lst) {
    try {
        var config = {
            connstr: "Oracle_HDDT",
            namesql: "HD_CHUKYSOS.CheckKetQuaChuKySo_Web",
            callback: "f_result_updateResultDtt_prcess"
        }
        var para = {
            LST_ID: lst
        }
        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_updateResultDtt_prcess(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst.data == null || lst.data == undefined)
            return;

        $.each(lst.data, function (key, val) {
            $("#thaytrangthai" + val.id_hdon).removeAttr("class");
            $("#thaytrangthai" + val.id_hdon).addClass("cc readok");

            // DOWNLOAD
            var sp = val.file_daky.split('\\');
            var name = sp[sp.length - 1];
            var link = "<a href='" + urli + "/home/DownloadFileHoaDon/" + name + "'" + "> Tải hóa đơn</a>";
            $("#download_" + val.id_hdon).html(link);

        });
        checkFinish_process();
    } catch (e) { console.log(e); }
}

function checkFinish_process() {
    try {
        var ok = $('.readok').length;
        var sum = $("#tbl_View_kds tbody tr").length;

        var error = $('.readerror').length;
        $(".loadtext").text(ok + ' / ' + sum);
        $("#header_procs").text('Đang <i class="fa fa-search"> </i> Thực hiện ' + ok + ' / ' + sum);
        statusProsessBar();
        if ((ok + error) != timer_process_countOld) {
            timer_process_countOld = ok + error;
            timer_process_next = getfulltimenow();
        }

        var comparTime = compareDates(timer_process_next, getfulltimenow());
        if (comparTime.minutes >= 3) {
            f_stopTimerDtt();
        }

        if (ok + error >= sum)
            f_stopTimerDtt();
    } catch (e) { console.log(e); }
}
function f_stopTimerDtt() {
    try {
        try {
            var ok = $('.readok').length;
            var sum = $("#tbl_View_kds tbody tr").length;
            $("#delayClock_process").removeClass("clock").addClass("clock1");
            $("#header_procs").text('Thành công ' + ok + ' / ' + sum);
            $(".readwait").each(function (val) {
                $(this).removeAttr("class");
                $(this).addClass("readerror");
            });
            if ((sum - ok) > 0) {
                messInfo("messinfo_kds", (sum - ok) + " chưa được ký", "error");
            }
            if ((sum - ok) == 0) {
                messInfo("messinfo_kds", "Toàn bộ file đã được ký", "ok");
            }
        } catch (ev) { }
        $('.timer').timer('pause');

    } catch (e) { console.log(e); }
}


function f_capNhatThongTinNguoiKy() {
    try {
        var config = { namesql: "HD_CHUKYSOS.NGUOIKY_WEB", callback: "f_result_capNhatThongTinNguoiKy", connstr: "Oracle_HDDT" };
        var user = localStorage.getItem("userinfo");
        var userid = "";
        if (user == null || user == undefined)
            userid = "-1";
        else
            userid = JSON.parse(user).userid;

        var para = {
            V_USERID: userid
        };

        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capNhatThongTinNguoiKy(config, para, lst) {
    try {
        console.log(lst);

    } catch (e) { console.log(e); }
}