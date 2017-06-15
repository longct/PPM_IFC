
var timer_process_next = null;
var timer_process_countOld = 0;
$(document).ready(function () {
    try{
    var wrapper_w = $(".wrapper").width();
    var wrapper_h = $(".wrapper").height();

    //$("#process_modal").draggable({
    //    handle: ".modal-header"
    //});
    var $content, $modal, $apnData, $modalCon;
    $content = $(".min");
    

    $(".mdlFire").click(function (e) {
        e.preventDefault();
        var $id = $(this).attr("data-target");
        $($id).modal({ backdrop: false, keyboard: false });
    });

    $(".modalMinimize").on("click", function () {
        $modalCon = $(this).closest(".modal").attr("id");
        $apnData = $(this).closest(".modal");
        $modal = "#" + $modalCon;
        $(".modal-backdrop").addClass("display-none");
        $($modal).toggleClass("min");
        if ($($modal).hasClass("min")) {
            $(".minmaxCon").append($apnData);
            $(this).find("i").toggleClass('fa-minus').toggleClass('fa-external-link');
        }
        else {
            $(".container").append($apnData);
            $(this).find("i").toggleClass('fa-external-link').toggleClass('fa-minus');
        };
    });

    $("button[data-dismiss='modal']").click(function () {
        $(this).closest(".modal").removeClass("min");
        $(".container").removeClass($apnData);
        $(this).next('.modalMinimize').find("i").removeClass('fa fa-external-link').addClass('fa fa-minus');
    });
    } catch (e) { console.log(e); }
});


function f_startTimerDtt_prcess() {
    try {
        $('.timer').timer('remove');
    }
    catch (e) { }
    timer_process_next = getfulltimenow();
    try {
        try {
            $("#delayClock_process").removeClass("clock1").addClass("clock");
        } catch (ev) { }
        $(".load").css('width', '0%');
        $(".loadtext").text("00:00");
       
        f_drawHtml_prcess();
        $('.timer').timer({
            editable: true,
            duration: '3s',
            repeat: true,
            callback: function () {
                try {
                    f_updateResultDtt_prcess();
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }

}


function statusProsessBar() {
    try {
        var next = $('.readok').length;
        var sum = $("#tblDataDocTucThoi_process tbody tr").length;

        var phantram = Math.round((next * 100) / sum, 1);
        $(".load").css('width', phantram + '%');
        $(".loadtext").text(next + ' / ' + sum);
    } catch (e) { console.log(e); }
}

// ve 1 lan ket qua 
function f_drawHtml_prcess() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_KETQUA.CHECK_KETQUAOK",
            callback: "f_resutl_drawHtml_prcess"
        }
        var para = {
            V_MATHIETLAP: localStorage.getItem("dangguimathietlap")
        }
        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_resutl_drawHtml_prcess(config, para, lst)
{
    try
    {
        var sum = $("#tblDataDocTucThoi_process tbody tr").length;
        $("#header_procs").text('Đang thực hiện 0 / '+ sum);

        $("#tblDataDocTucThoi_process tbody").empty();
        $.each(lst.data, function (key, val) {
            var tr = "<tr id='"+val.meterid+"'>";
            tr += "<td>" + (key +1) + "</td>";
            tr += "<td>" + val.tenthietbi + "</td>";
            tr += "<td id='thaytrangthai"+val.meterid+"'  class='" + val.trangthai + "' ></td>";
            //tr += "<td id='"+val.meterid+"'>Xem</td>";
            tr += "</tr>";
            $("#tblDataDocTucThoi_process tbody").append(tr);
        });
        statusProsessBar();
    } catch (e) { console.log(e);}
}



function f_updateResultDtt_prcess() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_KETQUA.CHECK_KETQUAOK",
            callback: "f_result_updateResultDtt_prcess"
        }
        var para = {
            V_MATHIETLAP: localStorage.getItem("dangguimathietlap")
        }
        ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }
}

function f_result_updateResultDtt_prcess(config, para, lst) {
   try{
    $.each(lst.data, function (key, val) {
        $("#thaytrangthai" + val.meterid).removeAttr("class");
        $("#thaytrangthai" + val.meterid).addClass(val.trangthai);
    });
    checkFinish_process();
   } catch (e) { console.log(e); }
}

function checkFinish_process()
{
    try
    {
    var ok = $('.readok').length;
    var sum = $("#tblDataDocTucThoi_process tbody tr").length;

    var error = $('.readerror').length;
    $(".loadtext").text(ok + ' / ' + sum);
    $("#header_procs").text('Đang thực hiện ' + ok + ' / ' + sum);
    statusProsessBar();
    if ((ok + error) != timer_process_countOld)
    {
        timer_process_countOld = ok + error;
        timer_process_next = getfulltimenow();
    }

    var comparTime = compareDates(timer_process_next , getfulltimenow());
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
            var sum = $("#tblDataDocTucThoi_process tbody tr").length;
            $("#delayClock_process").removeClass("clock").addClass("clock1");
            $("#header_procs").text('Thành công ' + ok + ' / ' + sum);
            $(".readwait").each(function (val) {
                $(this).removeAttr("class");
                $(this).addClass("readerror");
            });
        } catch (ev) { }
        $('.timer').timer('pause');

    } catch (e) { console.log(e); }
}
