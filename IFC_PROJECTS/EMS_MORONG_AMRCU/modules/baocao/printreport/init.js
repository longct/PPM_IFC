
$(document).ready(function () {
    try {
        loadConetent();
        f_LoadDataGridView();

        $("#btninreport_result").click(function () {
           //var w = window.open();
           //w.document.write($('#tab_printreport').html());
           // w.print();
           // w.close();
            window.print();
        });
        $("#btnhuy_rp").click(function () {
            var data = localStorage.getItem("datareportxuat_Id");
            if (data == 1 || data == 2 || data == 3) {
                location.href = "/master.html#modules/baocao/baocaoxuat";
            }
            else if (data == 4 || data == 5 || data == 6) {
                location.href = "/master.html#modules/baocao/baocaothuhoi";
            }
            else if (data == 7) {
                location.href = "/master.html#modules/baocao/baocaovtbtdluc";
            }
        });

    } catch (e) {
        console.log(e);
    }
});
function f_LoadDataGridView() {
    try{
        var data = localStorage.getItem("datareportxuat_Id");
        // bao cao xuat
        if (data == 1) {
            f_veGrid_baocaoxuat_rp(dataReportXuat);
            $("#titleReport").html("BẢNG TỔNG HỢP BÁO CÁO XUẤT VTTB TỪ NGÀY " + tungay_rb + " Đến ngày " + dengay_rb);
            $("#titleReport").show();
        } else if (data == 2) {
            f_resultLayDuLieu_baocaoxuat_banmien_rp(dataReportXuat);
            $("#titleReport").html("BÁO CÁO XUẤT VTTB TỪ KHO TỔNG XUỐNG CÁC KHO BAN MIỀN TỪ NGÀY " + tungay_rb + " Đến ngày " + dengay_rb);
            $("#titleReport").show();
        }
        else if (data == 3) {
            f_resultLayDuLieu_baocaoxuat_lapdat_rp(dataReportXuat);
            $("#titleReport").html("BÁO CÁO XUẤT VTTB CÁC KHO MIỀN CẤP CHO NVLĐ TỪ NGÀY " + tungay_rb + " Đến ngày " + dengay_rb);
            $("#titleReport").show();
        }
        // bao cao thu hoi
        else if (data == 4) {
            f_veGrid_baocaoxuat_rp(dataReport_th);
            $("#titleReport").html("BẢNG TỔNG HỢP BÁO CÁO THU HỒI VTTB TỪ NGÀY " + tungay_rb_th + " Đến ngày " + denngay_rb_th);
            $("#titleReport").show();
        }
        else if (data == 5) {
            f_resultLayDuLieu_baocaoxuat_banmien_rp(dataReport_th);
            $("#titleReport").html("BÁO CÁO XUẤT VTTB KHO TỔNG THU HỒI TỪ CÁC KHO BAN MIỀN TỪ NGÀY " + tungay_rb_th + " Đến ngày " + denngay_rb_th);
            $("#titleReport").show();
        }
        else if (data == 6) {
            f_resultLayDuLieu_baocaoxuat_lapdat_rp(dataReport_th);
            $("#titleReport").html("BÁO CÁO XUẤT VTTB CÁC KHO MIỀN THU HỒI TỪ NVLĐ TỪ NGÀY " + tungay_rb_th + " Đến ngày " + denngay_rb_th);
            $("#titleReport").show();
        }
        //bao cao vttb tai dien luc
        else if (data == 7) {
            f_resultLayDuLieu_baocao_vttb_dl(dataReport_vttbdl);
            $("#titleReport").html("BÁO CÁO SỐ LƯỢNG VTTB TẠI CÁC KHO ĐIỆN LỰC");
            $("#titleReport").show();
        }
    } catch (e) {
        location.href = "/master.html#modules/baocao/baocaoxuat";
        console.log(e);
       
    }

}
function f_veGrid_baocaoxuat_rp(lst) {
    try {
        $("#grv_baocaoxuat thead").empty();
        $("#grv_baocaoxuat tbody").empty();

        // thead
        var str_head = "";
        var str_subhead = "";
        var header_code = new Array();

        str_head += "<th rowspan='2' class='v_m'>STT</th>";
        str_head += "<th rowspan='2' class='v_m'>MÃ VTTB</th>";
        var i = 0;
        $.each(lst.data[1].kq1, function (key, val) {
            if (header_code.indexOf(val.code) == -1) {
                i++;
                str_head += "<th class='headerx' data_id=" + i + ">" + val.banmien + "</th>";
            }

            header_code.push(val.code);
            str_subhead += "<th data_idd=" + i + " class='v_m c_m'>" + val.maduan + "</th>";
        });
        str_head += "<th rowspan='2'  class='v_m'>TỔNG CỘNG</th>";

        var tr1 = $("<tr/>").append(str_head);
        var tr2 = $("<tr/>").append(str_subhead);
        $("#grv_baocaoxuat thead").append(tr1).append(tr2);
        // thiết lập colspan
        var lengthx = $(".headerx").length;
        for (var i = 0; i < lengthx; i++) {
            var ii = $("th[data_idd=" + i + "]").length;
            $("th[data_id=" + i + "]").attr("colspan", ii);
        }
        // tbody
        var tbody = "";
        var stt = 0;
        if (lst.data[0].kq0.length > 0) {
            $.each(lst.data[0].kq0, function (key, val) {

                stt++;
                tbody += "<tr><td>";
                tbody += stt + "</td><td>";
                tbody += val.mavattu + "</td><td>";
                tbody += SetValnull(val.evnhanoi) + "</td><td>";
                tbody += SetValnull(val.evnquangninh) + "</td><td>";
                tbody += SetValnull(val.npc128k) + "</td><td>";
                tbody += SetValnull(val.rf_baichay_qn) + "</td><td>";
                tbody += SetValnull(val.npc70k) + "</td><td>";
                tbody += SetValnull(val.dnpcmr) + "</td><td>";
                tbody += SetValnull(val.dnpc2000) + "</td><td>";
                tbody += SetValnull(val.amrcpc2000) + "</td><td>";
                tbody += SetValnull(val.amrcpc5000mr) + "</td><td>";
                tbody += SetValnull(val.amrcpc5000_2) + "</td><td>";
                tbody += SetValnull(val.evnkhanhhoa) + "</td><td>";
                tbody += SetValnull(val.evnspc) + "</td><td>";
                tbody += SetValnull(val.evnspc_gd2) + "</td><td>";
                tbody += SetValnull(val.evnhcm) + "</td><td>";
                tbody += SetValnull(val.evndongnai) + "</td><td>";
                tbody += SetValnull(val.amrnmtd) + "</td><td>";
                tbody += SetValnull(val.tong) + "</td>";
                tbody += "</tr>";
            });
            $("#grv_baocaoxuat tbody").append(tbody);

        }
     
        var d = new Date();
        $(".ngay_rp").text(d.getDate());
        $(".thang_rp").text(d.getUTCMonth() + 1);
        $(".nam_rp").text(d.getFullYear());
    } catch (e) { console.log(e); }
}

function f_resultLayDuLieu_baocaoxuat_banmien_rp(lst) {
    try {
        var p = getAllIdMod();

        $("#grv_baocaoxuat thead").empty();
        $("#grv_baocaoxuat tbody").empty();
        // thead
        var str_head = "";
        str_head += "<th class='v_m'>STT</th>";
        str_head += "<th class='v_m'>MÃ VTTB</th>";
        str_head += "<th class='v_m'>NHÀ CUNG CẤP</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN BẮC</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN TRUNG</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN NAM</th>";
        str_head += "<th class='v_m'>TỔNG</th>";
        var tr = $("<tr/>").append(str_head);
        $("#grv_baocaoxuat thead").append(tr);

        // tbody
        var tbody = "";
        var stt = 0;
        if (lst.data.length > 0) {
            $.each(lst.data, function (key, val) {

                stt++;
                tbody += "<tr><td>";
                tbody += stt + "</td><td>";
                tbody += val.mavattu + "</td><td>";
                tbody += SetValnull(val.nhacungcap) + "</td><td>";
                tbody += SetValnull(val.mienbac) + "</td><td>";
                tbody += SetValnull(val.mientrung) + "</td><td>";
                tbody += SetValnull(val.miennam) + "</td><td>";
                tbody += SetValnull(val.tongcong) + "</td>";
                tbody += "</tr>";
            });
            $("#grv_baocaoxuat tbody").append(tbody);
        }
       
        var d = new Date();
        $(".ngay_rp").text(d.getDate());
        $(".thang_rp").text(d.getUTCMonth() + 1);
        $(".nam_rp").text(d.getFullYear());

    } catch (e) { console.log(e); }
}
  
function f_resultLayDuLieu_baocaoxuat_lapdat_rp(lst) {
    try {

        var p = getAllIdMod();

        $("#grv_baocaoxuat thead").empty();
        $("#grv_baocaoxuat tbody").empty();
        // thead
        var str_head = "";
        str_head += "<th class='v_m'>STT</th>";
        str_head += "<th class='v_m'>MÃ VTTB</th>";
        str_head += "<th class='v_m'>NHÀ CUNG CẤP</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN BẮC</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN TRUNG</th>";
        str_head += "<th class='v_m'>BAN TKDA MIỀN NAM</th>";
        str_head += "<th class='v_m'>TỔNG</th>";
        var tr = $("<tr/>").append(str_head);
        $("#grv_baocaoxuat thead").append(tr);

        // tbody
        var tbody = "";
        var stt = 0;
        if (lst.data.length > 0) {
            $.each(lst.data, function (key, val) {

                stt++;
                tbody += "<tr><td>";
                tbody += stt + "</td><td>";
                tbody += val.mavattu + "</td><td>";
                tbody += SetValnull(val.nhacungcap) + "</td><td>";
                tbody += SetValnull(val.mienbac) + "</td><td>";
                tbody += SetValnull(val.mientrung) + "</td><td>";
                tbody += SetValnull(val.miennam) + "</td><td>";
                tbody += SetValnull(val.tongcong) + "</td>";
                tbody += "</tr>";
            });
            $("#grv_baocaoxuat tbody").append(tbody);
        }
       
        var d = new Date();
        $(".ngay_rp").text(d.getDate());
        $(".thang_rp").text(d.getUTCMonth() + 1);
        $(".nam_rp").text(d.getFullYear());

    } catch (e) { console.log(e); }
}

function f_resultLayDuLieu_baocao_vttb_dl(data) {
  
       $("#grv_baocaoxuat").empty();
        $.makeTable = function (data) {

            var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
            var rowth = "<thead><tr>";
            rowth += "<th>STT</th>"
            for (var titile in data[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data, function (index, value) {

                var row = "<tr>";
                row += "<td>" + (index + 1) + "</td>";
                $.each(value, function (key, val) {
                    row += "<td class='c'>" + SetValnull(val) + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data);
        $(table).appendTo("#grv_baocaoxuat");
      
        var d = new Date();
        $(".ngay_rp").text(d.getDate());
        $(".thang_rp").text(d.getUTCMonth() + 1);
        $(".nam_rp").text(d.getFullYear());

}