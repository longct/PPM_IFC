//var lstBong;
//var lstTu;
$(document).ready(function () {
    try {
        loadchecklog_master();
        f_loaddata_tqtbds();
    } catch (e) {
        console.log(e);
    }
});

function f_loaddata_tqtbds()
{
    try{
        var id = JSON.parse(localStorage.getItem("chitiettu")).id;
  
        var config = { namesql: "PKG_BANDOSO.LOADTUBONG", callback: "f_result_loaddata_tqtbds", connstr: "ConnectOracleStreetLight" };
        var para = { V_IDTU: id };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loaddata_tqtbds(config,para,lst)
{
    try{
        console.log(lst);
        draw_Map(lst);
    } catch (e) {
        console.log(e);
    }
}

// vẽ bóng
function vebong(lstBong) {
    try {
        $.each(lstBong, function (i, marker) {
            if (marker.latitude != "" && marker.longitude != "")
                $('#map_canvas_tqtbds').gmap('addMarker', {
                    'position': new google.maps.LatLng(marker.latitude, marker.longitude),
                    'icon': marker.status == "0" ? '/img/trangthai0.png' :
                        marker.status == "1" ? '/img/trangthai1.png' :
                        marker.status == "2" ? '/img/trangthai2.png' :
                        '/img/trangthai-.png',
                }).click(function () {
                    $('#map_canvas_tqtbds').gmap('openInfoWindow', {
                        'content': "<font color='black'>"
                            + "Tên bóng  : " + marker.tenbong + "<br/>"
                            + "Ghi chú: " + marker.ghichu + "<br/>"
                            + "Điện áp: " + marker.dienap + "<br/>"
                            + "Độ cao cột đèn: " + marker.chieucaocotdien + "<br/>"
                            + "Chỉ số chiếu sáng: " + marker.chisochieusang + "<br/>"
                            + "Thuộc tủ điểu khiển: " + marker.thuoctu + "<br/>"
                            + "Vĩ độ: " + marker.latitude + "<br/>"
                            + "Kinh độ: " + marker.longitude + "<br/>"
                            //+ "<div><a href='#' onclick=clickChangeTap('index.ifc') > Xem dữ liệu chi tiết </a><br/></div>"
                            //+ "<div><a href='#' onclick=showModalBong(this," + marker.id + ") data-modal='modal-chinhsuabong'> Chỉnh sửa thông tin bóng </a> <br/></div>"
                            //  + "<div><a href='#' onclick=showModalCheDoBong(this," + marker.id + ") data-modal='modal-thietlapchedobong'> Xem chế độ thiết lập bóng</a> </div>"
                            + "</font>"
                    }, this);
                });
        });
        $("#map_canvas_tqtbds").css("height", 280);
        $("#map_canvas_tqtbds").css("min-height", 280);
    } catch (e) {
        console.log(e);
    }
}
// vẽ tủ
function vetu(lstTu) {
    try {
        //console.log("bat dau ve tu");
        //console.log(lstTu);
        $.each(lstTu, function (i, marker) {
            if (marker.latitude != "" && marker.longitude != "")
                $('#map_canvas_tqtbds').gmap('addMarker', {
                    'position': new google.maps.LatLng(marker.latitude, marker.longitude),
                    'icon':  '/img/gmap/Modem_kn.png' 
                }).click(function () {
                    $('#map_canvas_tqtbds').gmap('openInfoWindow', {
                        'content': "<font color='black'>"
                            + "IMEI: " + marker.imei + "<br/>"
                            + "Tên tủ: " + marker.tenkhachhang + "<br/>"
                            + "Địa chỉ tủ: " + marker.diachikhachhang + "<br/>"
                            + "Ghi chú: " + marker.ghichu + "<br/>"
                            + "Vĩ độ: " + marker.latitude + "<br/>"
                            + "Kinh độ: " + marker.longitude + "<br/>"
                            + "<div><a href='#' class='clickXemBong' onclick=clickChangeTap('home_bongden.ifc?id=" + marker.id + "')  >Xem chi tiết bóng </a><br/></div>"
                    //+ "<div><a href='#' onclick=showModalTu(this," + marker.id + ") data-modal='modal-chinhsuatu'> Chỉnh sửa thông tin tủ </a> <br/></div>"
                    //  + "<div><a href='#' onclick=showModalCheDoTu(this," + marker.id + ") data-modal='modal-thietlapchedotu'> Xem chế độ thiết lập tủ</a> </div>"
                    + "</font>"
                    }, this);
                });
        });
    } catch (e) {
        console.log(e);
    }
}

function draw_Map(list) {

    try {
        var lstBong = list.data[0].kq0;
       var  lstTu = list.data[1].kq1;
       
        if ((lstBong == null || lstBong.length == 0) && (lstTu == null || lstTu.length == 0)) {
            $('#bandoso_infomap_tu').html("Không có dữ liệu hiển thị");
            $('#bandoso_infomap_bong').html("Không có dữ liệu hiển thị");
            return;
        }

        $('#map_canvas_tqtbds').html("");
        $('#map_canvas_tqtbds').css('min-height', '550px');
        var center = lstBong.length > 0 ? lstBong[0].latitude + "," + lstBong[0].longitude : lstTu[0].latitude + "," + lstTu[0].longitude;
       
        $('#map_canvas_tqtbds').gmap({ 'center': center });
        $('#map_canvas_tqtbds').gmap('option', 'zoom', 17);
        $('#bandoso_infomap_tu').html("Có " + (lstTu.length) + " bản ghi");
        $('#bandoso_infomap_bong').html("Có " + (lstBong.length) + " bản ghi");
      
        vebong(lstBong);
        vetu(lstTu);
    } catch (e) {
        //console.log("Loi");
        console.log(e);
    }
};

function clickChangeTap(page) {
    try{
        var link = "http://" + $(location).attr('host') + "/" + page;
        //console.log(link);
        window.open(link, "_parent");
    } catch (e) {
        console.log(e);
    }
}
function showModalTu(thiss, id) {
    try{
        var item = { id: id };
        khaibao_uc_chinhsuatu_LoadDataToControl(item);
    } catch (e) {
        console.log(e);
    }
}

function showModalBong(thiss, id) {
    try{
        var item = {
            luminaid: id,
        };
        khaibao_uc_chinhsuabong_LoadDataToControl(item);
    } catch (e) {
        console.log(e);
    }
}

function showModalCheDoBong(thiss, id) {
    try{
        var item = { modeid: id };
        thietlap_uc_thietlapchedobong002_LoadDataToControl(item);
    } catch (e) {
        console.log(e);
    }
}
function showModalCheDoTu(thiss, id) {
    try{
        var item = { modeid: id };
        thietlap_uc_thietlapchedotu002_LoadDataToControl(item);
    } catch (e) {
        console.log(e);
    }
}


function ExecuteServiceMap(config, para) {
    try {
        var config2 = {
            nameServer: config.nameServer,
            nameSql: config.nameSql,
            commandType: config.commandType
        }
        
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
          
        });
    } catch (e) {
        console.log(e);
    }
}
