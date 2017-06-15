//var lstBong;
//var lstTu;
$(document).ready(function () {
    try {
       
        f_loaddata_bdt();
    } catch (e) {
        console.log(e);
    }
});

function f_loaddata_bdt()
{
    try{
        //var id = JSON.parse(localStorage.getItem("chitiettu")).id;
  
        var config = { namesql: "PKG_BANDOSO.LOADTUBENNGOAI", callback: "f_result_loaddata_bdt", connstr: "ConnectOracleStreetLight" };
        var para = { V_IDTU: "-1" };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loaddata_bdt(config,para,lst)
{
    draw_Map(lst);
}

// vẽ tủ
function vetu(lstTu) {
    try {
       
        $.each(lstTu, function (i, marker) {
            if (marker.latitude != null && marker.longitude != null)
                $('#map_canvas_bdt').gmap('addMarker', {
                    'position': new google.maps.LatLng(setnullnumber(marker.latitude), setnullnumber(marker.longitude)),
                    'icon':  '/img/gmap/Modem_kn.png' 
                }).click(function () {
                    $('#map_canvas_bdt').gmap('openInfoWindow', {
                        'content': "<font color='black'>"
                            + "IMEI: " + marker.imei + "<br/>"
                            + "Tên tủ: " + marker.tenkhachhang + "<br/>"
                            + "Địa chỉ tủ: " + marker.diachikhachhang + "<br/>"
                            + "Ghi chú: " + marker.ghichu + "<br/>"
                            + "Vĩ độ: " +setnullnumber(marker.latitude) + "<br/>"
                            + "Kinh độ: " + setnullnumber(marker.longitude) + "<br/>"
                            //+ "<div><a href='#' class='clickXemBong' onclick=clickChangeTap('home_bongden.ifc?id=" + marker.id + "')  >Xem chi tiết bóng </a><br/></div>"
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
       var  lstTu = list.data;
        if (lstTu == null || lstTu.length == 0) {
            $('#bandoso_infomap_tu').html("Không có dữ liệu hiển thị");
            return;
        }

        $('#map_canvas_bdt').html("");
        $('#map_canvas_bdt').css('min-height', '550px');
        var center = lstTu[1].latitude + "," + lstTu[1].longitude;
        $('#map_canvas_bdt').gmap({ 'center': center });
        $('#map_canvas_bdt').gmap('option', 'zoom', 14);
        $('#bandoso_infomap_tu').html("Có " + (lstTu.length) + " bản ghi");
      
        vetu(lstTu);
    } catch (e) {
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
        $('#map_canvas_bdt').gmap('closeInfoWindow');
        if (vido.toString() == "" || kinhdo.toString() == "") return;

        var mar = null;
        var markers = $('#map_canvas_bdt').gmap('get', 'markers');
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
