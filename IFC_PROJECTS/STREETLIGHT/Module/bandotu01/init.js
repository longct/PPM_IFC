//var lstBong;
//var lstTu;

$(document).ready(function () {
    try {
        //loadConetent();
        //loadchecklog_master();
        f_loaddata_tqtbds();
    } catch (e) {
        console.log(e);
    }
});


function f_loadChangeFilter() {
    try {

        f_loaddata_tqtbds();
        setTimeout(function () {
            location.reload();
        }, 500);

    } catch (e) {
        console.log(e);
    }
}

function f_loaddata_tqtbds() {

    var filter = localStorage.getItem("infofilter");
    var filterJson = null;
    if (filter != null || filter != undefined)
        filterJson = JSON.parse(filter);

    var config = { namesql: "PKG_BANDOSO.LOADTUBONG_NEW", callback: "f_result_loaddata_tqtbds", connstr: "ConnectOracleStreetLight" };
    var para = {
        V_IDTU: "-1",
        V_ID_NHOM: filter == null || filter == undefined ? "-1" : filterJson.nhom,
        V_TIMKIEM: filter == null || filter == undefined ? "" : filterJson.timkiem,
        V_TRANGTHAI: filter == null || filter == undefined ? "-1" : filterJson.trangthai,
        V_CANHBAO: filter == null || filter == undefined ? "-1" : filterJson.canhbao
    };

    ExecuteServiceSyns(config, para);
}

function f_result_loaddata_tqtbds(config, para, lst) {

    draw_Map(lst);
}

// vẽ bóng
function vebong(lstBong) {
    try {
        
        $.each(lstBong, function (i, marker) {
            if (marker.latitude != null && marker.longitude != null) {
               
                $('#map_canvas_tqtbds').gmap('addMarker', {
                    'position': new google.maps.LatLng(setnullnumber(marker.latitude), setnullnumber(marker.longitude)),
                    'icon': marker.status == "0" ? '/img/trangthai0.png' :
                        marker.status == "1" ? '/img/trangthai1.png' :
                        marker.status == "2" ? '/img/trangthai2.png' :
                        '/img/trangthai.png',
                }).click(function () {
                    $('#map_canvas_tqtbds').gmap('openInfoWindow', {
                        'content': "<font color='black'>"
                            + "Tên bóng  : " + marker.tenbong + "<br/>"
                            + "Ghi chú: " + marker.ghichu + "<br/>"
                            + "Điện áp: " + marker.dienap + "<br/>"
                            + "Độ cao cột đèn: " + marker.chieucaocotdien + "<br/>"
                            + "Chỉ số chiếu sáng: " + marker.chisochieusang + "<br/>"
                            + "Thuộc tủ điểu khiển: " + marker.thuoctu + "<br/>"
                            + "Vĩ độ: " + setnullnumber(marker.latitude) + "<br/>"
                            + "Kinh độ: " + setnullnumber(marker.longitude) + "<br/>"
                            + "</font>"
                    }, this);
                });
            }
        });
        $("#map_canvas_tqtbds").css("height", $(window).height() - 140);
        $("#map_canvas_tqtbds").css("min-height", $(window).height() - 140);
    } catch (e) {
        console.log(e);
    }
}
// vẽ tủ
function vetu(lstTu) {
    try {
        $.each(lstTu, function (i, marker) {
            
            if (marker.latitude != null && marker.longitude != null) {
                $('#map_canvas_tqtbds').gmap('addMarker', {
                    position: new google.maps.LatLng(marker.latitude, marker.longitude),
                    icon: '/img/gmap/Modem_kn.png'
                }).click(function () {
                    $("#act_home_bando").slideDown();

                    khoitaosukien_bds(marker.id);
                    $('#map_canvas_tqtbds').gmap('openInfoWindow', {
                        content: "<table>" +
                                "<tr>" +
                                "<td>Tên tủ: </td>" +
                                "<td>" + setnullnumber(marker.tenkhachhang) + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td>Địa chỉ: </td>" +
                                "<td>" + setnullnumber(marker.diachikhachhang) + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td>Ghi chú: </td>" +
                                "<td>" + setnullnumber(marker.ghichu) + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td>Vĩ độ: </td>" +
                                "<td>" + setnullnumber(marker.latitude) + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td>Kinh độ: </td>" +
                                "<td>" + setnullnumber(marker.longitude) + "</td>" +
                                "</tr>" +
                                "</table>"+
                                "<table class='table table-responsive  table-striped table-condensed'>" +
                                "<tr>" +
                                "<th></th><th>Pha A</th><th>Pha B</th><th>Pha C</th>"+
                                "</tr>" +
                                "<tr>" +
                                "<th>U(V)</th>" +
                                "<td>" + marker.ua + "</td>" +
                                "<td>" + marker.ub + "</td>" +
                                "<td>" + marker.uc + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<th>I(V)</th>" +
                                "<td>" + marker.ia + "</td>" +
                                "<td>" + marker.ib + "</td>" +
                                "<td>" + marker.ic + "</td>" +
                                "<tr>" +
                                "<th>Cos φ</th>" +
                                "<td>" + marker.cosa + "</td>" +
                                "<td>" + marker.cosb + "</td>" +
                                "<td>" + marker.cosc + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<th>P(Kwh)</th>" +
                                "<td colspan='3'>" +marker.p3pha+"</td>"+
                                "</tr>" +
                                "</table>"+
                                "<div><a href='#' class='clickXemBong' onclick=clickChangeTap(" + marker.id + ")  >Xem chi tiết bóng </a><br/></div>"
                        //'content': "<font color='black'>"
                        //    + "IMEI: " + marker.imei + "<br/>"
                        //    + "Tên tủ: " + marker.tenkhachhang + "<br/>"
                        //    + "Địa chỉ tủ: " + marker.diachikhachhang + "<br/>"
                        //    + "Ghi chú: " + marker.ghichu + "<br/>"
                        //    + "Vĩ độ: " + setnullnumber(marker.latitude) + "<br/>"
                        //    + "Kinh độ: " + setnullnumber(marker.longitude) + "<br/>"
                        //    + "</font>"
                        //    + "<table>" +
                        //    + "<tr><td>UA(V)</td><td>" + marker.ua + "</td></tr>" +
                        //    +"</table>" +
                        //    + "<div><a href='#' class='clickXemBong' onclick=clickChangeTap(" + marker.id + ")  >Xem chi tiết bóng </a><br/></div>"

                    }, this);

                });

            }
        });
    } catch (e) {
        console.log(e);
    }
}
function clickChangeTap(page) {
    try {

        var chitiettu = { id: page, userinfo: JSON.parse(localStorage.getItem("userinfo")) };
        localStorage.setItem("chitiettu", JSON.stringify(chitiettu));
        window.open('master.html#Module/tongquantu', '_blank');
    } catch (e) {
        console.log(e);
    }
}

function aba() {
    try {
        $(".chitiettu_home_1tu").click(function () {
            var id = $(this).attr("value");
            var chitiettu = { id: id, userinfo: JSON.parse(localStorage.getItem("userinfo")) };
            localStorage.setItem("chitiettu", JSON.stringify(chitiettu));
            window.open('master.html#Module/tongquantu', '_blank');
        });
    } catch (e) {
        console.log(e);
    }
}

function draw_Map(list) {

    try {
        console.log(list)
        var lstBong = list.data[0].kq0;
        var lstTu = list.data[1].kq1;
        if ((lstBong == null || lstBong.length == 0) && (lstTu == null || lstTu.length == 0)) {
            $('#bandoso_infomap_tu').html("Không có dữ liệu hiển thị");
            $('#bandoso_infomap_bong').html("Không có dữ liệu hiển thị");
            return;
        }
 
        var centerLat = 11.343485;
        var centerLog = 106.110173;
        $.each(lstTu, function (key, val) {
            if (val.latitude != null && val.latitude != undefined && val.longitude != null && val.longitude != undefined) {
                //centerLat = val.latitude;
                //centerLog = val.longitude;

            
            
                return false;
            }
        });
        $('#map_canvas_tqtbds').html("");
        $('#map_canvas_tqtbds').css('min-height', '550px');
        var center = centerLat + "," + centerLog;
        $('#map_canvas_tqtbds').gmap({ 'center': center });
        $('#map_canvas_tqtbds').gmap('option', 'zoom', 10);
        $('#bandoso_infomap_tu').html("Có " + (lstTu.length) + " bản ghi");
        $('#bandoso_infomap_bong').html("Có " + (lstBong.length) + " bản ghi");

        vebong(lstBong);
        vetu(lstTu);
    } catch (e) {
        //console.log("Loi");
        console.log(e);
    }
};


function showModalTu(thiss, id) {
    var item = { id: id };
    khaibao_uc_chinhsuatu_LoadDataToControl(item);
}

function showModalBong(thiss, id) {
    var item = {
        luminaid: id,
    };
    khaibao_uc_chinhsuabong_LoadDataToControl(item);
}

function showModalCheDoBong(thiss, id) {
    var item = { modeid: id };
    thietlap_uc_thietlapchedobong002_LoadDataToControl(item);
}
function showModalCheDoTu(thiss, id) {
    var item = { modeid: id };
    thietlap_uc_thietlapchedotu002_LoadDataToControl(item);
}


function ExecuteServiceMap(config, para) {
    var config2 = {
        nameServer: config.nameServer,
        nameSql: config.nameSql,
        commandType: config.commandType
    }
    try {
        var jsonpara = { config: config2, para: para };
        //console.log(jsonpara);
        $.ajax({
            dataType: "json",
            url: "http://" + $(location).attr('host') + "/sqlexecute",
            data: jsonpara,
            type: "POST",
            async: true,
            success: function (data) {
                //console.log("RESULT QUERY >> " + config.nameSql);
                //console.log(data);
                draw_Map(data);
            },
            complete: function () {
            },
            error: function (textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function showInfoClickMap(id, vido, kinhdo) {
    try {
        $('#map_canvas_tqtbds').gmap('closeInfoWindow');
        if (vido.toString() == "" || kinhdo.toString() == "") return;

        var mar = null;
        var markers = $('#map_canvas_tqtbds').gmap('get', 'markers');
        $.each(markers, function (key, val) {
            if (Math.round(parseFloat(val.position.H), 6) == Math.round(parseFloat(vido), 6) && Math.round(parseFloat(val.position.L), 6) == Math.round(parseFloat(kinhdo), 6)) {
                mar = val;
                google.maps.event.trigger(mar, 'click');
                return;
            }

            //if(val.position)
        });

    } catch (e) {
        console.log(e);
    }
}


function khoitaosukien_bds(id) {
    console.log(id);
    $(".dongcatpha_home_bando").click(function () {
        var lstId = [];
        var ID = { id: id, ten: "THIẾT LẬP ĐÓNG CẮT PHA CỦA TỦ TRONG NGÀY" };
        lstId.push(ID);

        f_loadInfoOne_Dkttd(lstId);

        var infoo = {
            loaidk: "PHA",
            loaithietbi: "TU",
            loaichedo: "TUDONG"
        }
        $(".chuyenloai").css("display", "block");
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });
    $(".tucthoi_home_bando").click(function () {
        var lstId = [];
        var ID = { id: id, ten: "THIẾT LẬP TỨC THỜI TỦ ĐIỆN" };
        lstId.push(ID);

        f_loadInfoOne_Dktptt(lstId);
        var infoo = {
            loaidk: "PHA",
            loaithietbi: "TU",
            loaichedo: "TUCTHOI"
        }

        localStorage.setItem("infodk", JSON.stringify(infoo));
    });

    $(".muccongsuat_home_bando").click(function () {
        var lstId = [];
        var ID = { id: id, ten: "THIẾT LẬP DIM TỰ ĐỘNG TOÀN BỘ BÓNG THUỘC TỦ" };
        lstId.push(ID);

        f_loadInfoOne_Dktdtd(lstId);
        var infoo = {
            loaidk: "DIM",
            loaithietbi: "TU",
            loaichedo: "TUDONG"
        }
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });

    $(".dimtucthoi_home_bando").click(function () {
        var lstId = [];
        var ID = { id: id, ten: "THIẾT LẬP DIM TỨC THỜI TOÀN BỘ BÓNG THUỘC TỦ" };
        lstId.push(ID);

        f_loadInfoOne_Dkdtt(lstId);
        var infoo = {
            loaidk: "DIM",
            loaithietbi: "TU",
            loaichedo: "TUCTHOI"
        }
        localStorage.setItem("infodk", JSON.stringify(infoo));
    });

    $(".doctoadotutucthoi_home_bando").click(function () {
        var lstId = [];
        var ID = { id: id, ten: "ĐỌC TỌA ĐỘ TỦ TỨC THỜI" };
        lstId.push(ID);
        f_confimYesNo("Bạn chắc chắn muốn đọc tọa độ tủ ?", "Bỏ qua", "Xác nhận", function () {
            f_init_doctoadotu_dtdt(lstId);
        });


    });

    $("#huychon_home_bando").click(function () {
        $("#act_home_bando").hide();
    });

}