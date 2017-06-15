var mapData;
var map;
var tba = [];
var checkDCU = true;
var kq = false;
var checkdelR = false;
var checkdelC = false;

$(document).ready(function () {
    try {
        setTitle("Bản đồ số");
        LoadComboDonvi();
        //Loadtoado();
        //initAutoComplete();
        //drawMapFull(arr);
        //$("#chkLine").change(function() {
        //    if (this.checked) {
        //        draw_cab(mapData);
        //    } else {
        //        draw_cab(mapData);
        //    }
        //});
        $('#timkiem').focus(function () {
            $(this).select();
        });
    } catch (e) {
        console.log(e);
    }

});

//function LoadDonVi() {
//    try {
//        var p = getAllIdMod();
//        var config = { namesql: "PKG_BAOCAOHETHONG.LoadDonVi", callback: "result_loaddonvi", connstr: "Oracle_AmosiDefault" };
//        var para = {};
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function result_loaddonvi(config, para, lst) {
//    try {
//        var data = lst.data;
//        dataToCob("cb_donvi", data, "maduan", "tendanhmuc", "-1", "--Chọn đơn vị--");
//    } catch (e) {
//        console.log(e);
//    }
//}

function LoadComboDonvi() {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_BAOCAO_HANGNGAY.GetComboDonvi", callback: "f_result_LoadComboDonvi" };
        var para = {
            v_Code: "",
            v_lenCode: 4
        };
        if (sessionStorage.getItem("combodonvi") != null && sessionStorage.getItem("combodonvi") != undefined) {
            f_result_LoadComboDonvi(config, para, JSON.parse(sessionStorage.getItem("combodonvi")))
        }
        else
            ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_LoadComboDonvi(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '30px'
            });
            $('#jqxDropDonvi').on('select', function (event) {
                f_ComboDonvi_selected(event);
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.id,
                    "parentid": value.parentid,
                    "text": value.text,
                    "value": value.id
                }
                //console.log(item);
                dt.push(item);

            });
            //console.log(dt);
            var source =
            {
                datatype: "json",
                datafields: [
                    { name: 'id' },
                    { name: 'parentid' },
                    { name: 'text' },
                    { name: 'value' }
                ],
                id: 'id',
                localdata: dt
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
            $('#jqxDropDonvi').jqxTree({ source: records, width: '500px', height: '200px', });
            $('#jqxDropDonvi').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        console.log(e.message);
    }

}

function f_ComboDonvi_selected() {
    //var args = event.args;
    var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
    //var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
    var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
    $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
    $('#dropDownButton').jqxDropDownButton('close');
    var code = item.value.split("_")[1];
    var maduan = item.value.split("_")[0];
    
    Loadtoado(maduan);
}
var map;
function Loadtoado(value) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_BANDO.LAYDULIEU", callback: "result_loadtoado", connstr: "Oracle_AmosiDefault" };
        var para = {
            v_maduan : value
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadtoado(config, para, lst) {
    try {
        $('#messinfo_bht').hide();
        var data = lst.data;
        if (data.length == 0) {
            $('#map_RD').hide();
            $('#timkiem').val('');
            
            messInfo("messinfo_bht", "Không có dữ liệu hiển thị", "error");
            $('#timkiem').autocomplete("destroy");
            return;
        }
        $('#map_RD').show();
        drawMapFull(data);
        var nameArr = [];
        nameArr.length = 0;
        $.each(data, function (key, val) {
            nameArr.push({
                label: val.description,
                value: val.coordinates,
            });

        });
        var availableTutorials = nameArr;
        $("#timkiem").autocomplete({
            minLength: 1,
            delay: 200,
            source: availableTutorials,
            select: function (event, ui) {
                var data = ui.item.value.split(',');
                //var mapOptions = {
                //    center: new google.maps.LatLng(data[1], data[0]),
                //    zoom: 10,
                //    mapTypeId: google.maps.MapTypeId.ROADMAP
                //};
                //var map = new google.maps.Map(document.getElementById("map_RD"), mapOptions);
                var infoWindow = new google.maps.InfoWindow();
                var latlngbounds = new google.maps.LatLngBounds();
                var myLatlng = new google.maps.LatLng(data[1], data[0]);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: ui.item.label
                });
                
                var str = ui.item.label.split(',');
                var html = "<p><b>Mã điểm đo:</b> " + str[0] + "<p>"
                + "<p><b>Tên điểm đo:</b> " + str[1] + "<p>"
                + "<p><b>Loại lỗi:</b> " + str[3] + "<p>"
                + "<p><b>Chi tiết lỗi:</b> " + str[4] + "<p>"
                + "<p><b>Ngày lỗi:</b> " + formatDate(str[5]) + "<p>";
                latlngbounds.extend(marker.position);
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}
function checkMap(code) {
    console.log(code);
    //check bảng IFCCOTCONGTO xem tồn tại mã trạm chưa
    var cmdService = "PKG_DOCCAUHINH.GetMapTram";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService,
        callback: "resultMap"
    }
    var para = {
        v_code: code,
    }
    ExecuteServiceSyns(config, para);
}
function resultMap(config, para, lst) {
    
    console.log(lst);
    var dataDCU = lst.kq1;
    var dataREP = lst.kq2;
    var dataCOT = lst.kq3;


    if (JSON.stringify(dataDCU[0]) == "{}" && JSON.stringify(dataREP[0]) == "{}" && JSON.stringify(dataCOT[0]) == "{}") {
        console.log("Chưa có thông tin bản đồ");
    }
    else {
        //console.log("Vẽ" + JSON.stringify(dataDCU[0]));
        drawMapFromDB(lst);
        if (JSON.stringify(dataCOT[0]) != "{}") {
            console.log("Vẽ COT");
            var cot_ar = [];
            $.each(dataCOT, function (key, val) {
                //console.log(val);
                if (val.vido != null && val.kinhdo != null)
                    cot_ar.push({ lat: parseFloat(val.vido.replace(",", ".")), lng: parseFloat(val.kinhdo.replace(",", ".")), name: val.tencot });
            })
            draw_Cot(cot_ar);
        }
        if (JSON.stringify(dataDCU[0]) != "{}") {
            //console.log("Vẽ DCU");
            var dcu_ar = [];
            $.each(dataDCU, function (key, val) {
                //console.log(val);
                if (val.vido != null && val.kinhdo != null)
                    dcu_ar.push({ lat: parseFloat(val.vido.replace(",", ".")), lng: parseFloat(val.kinhdo.replace(",", ".")), name: "DCU:" + val.imei });
            })
            draw_DCU(dcu_ar);
        }
        if (JSON.stringify(dataREP[0]) != "{}") {
            console.log("Vẽ REP");
            var rep_ar = [];
            $.each(dataREP, function (key, val) {
                //console.log(val);
                if (val.vido != null && val.kinhdo != null)
                    rep_ar.push({ lat: parseFloat(val.vido.replace(",", ".")), lng: parseFloat(val.kinhdo.replace(",", ".")), name: val.ten_rf });
            })
            draw_Repeater(rep_ar);
        }


    }
}
function api_uploadFileKmlAllToOracle(config, fd) {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: 'https://thainguyen.amiss.com.vn/ServiceChung/ReadFileKml/readKml',
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                if (config.callback != null && config.callback != '') {
                    funExeItem(config.callback, config, [], data);
                }
            }
        });
    } catch (e) { console.log(e); }
}
function drawMapFromDB(data) {
    console.log(data);
    var dataDCU = data.kq1;
    var dataREP = data.kq2;
    var dataCOT = data.kq3;
    var dataTram = [];
    $.each(dataCOT, function (key, val) {
        if (val.tencot.substring(0, 3) == "TBA") {
            dataTram.push();
        }
    })
    //var dataTBA = [];
    console.log(data);
    map = new google.maps.Map(document.getElementById('map_RD'), {
        zoom: 16
    });
    map = new google.maps.Map(document.getElementById('map_RD'), {
        zoom: 16
    });
    myLatLng = { lat: parseFloat(dataDCU[0].vido), lng: parseFloat(dataDCU[0].kinhdo) };
    map.setCenter(myLatLng);
    $.each(dataTram, function (key, val) {
        myLatLngTram = { lat: parseFloat(val.vido), lng: parseFloat(val.kinhdo) };
        var marker_tram = new google.maps.Marker({
            position: myLatLngTram,
            map: map,
            title: val.tencot,
            icon: 'images/tram.png'
        });
        marker_tram.addListener('click', function () {
            
            infowindow.open(map, marker_tram);
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h2 id="firstHeading" class="firstHeading">TRẠM ' + val.tencot + '</h2>' +
                '<div id="bodyContent">' +

                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

        })

        //var marker = cab.map(function (location, i) {
        //    return new google.maps.Marker({
        //        position: location,
        //        map: map,
        //        title: 'Hello World!'
        //    })
        //})   

        //var markerCluster = new MarkerClusterer(map, marker, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })
        ////cabLine.setMap(map);

    })
}

function initAutoComplete() {
    var map = new google.maps.Map(document.getElementById('map_RD'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('timkiem');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
function drawMapFull(data) {
    mapData = data;
    var inputData = data;
    var myLatLng;
    var dataDCU = [];
    var dataREP = [];
    var dataCOT = [];
    var dataTBA = [];
    //console.log(data);
    var item = $('#jqxDropDonvi').jqxTree('getSelectedItem');
    var code = item.value.split("_")[1];
    var maduan = item.value.split("_")[0];
    
    $.each(inputData, function (key, val) {
        if (val.name == "" || val.name == null || val.name == undefined) {
            //console.log(val.name);
            console.log("Ko noi day");
            //cab.push(val.coordinates.split(",0.0"));
        }
        //else if (val.name.substring(0, 3) == "TBA") {
        else if (val.name == maduan) {
            console.log(val);
            Tram_name = val.description;
            var tba_json = {
                tbaid: val.description,
                tbaname: val.description,
                lat: get_vd(val.coordinates),//vido
                lng: get_kd(val.coordinates)//kinhdo
            }
            dataTBA.push(tba_json);
        }
        else if (val.name.substring(0, 3) == "DCU") {
            dataDCU.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates), name: val.name });
        }
        else if (val.name.substring(0, 3) == "REP") {
            dataREP.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates), name: val.name });
        }
        else {
            dataCOT.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates), name: val.name });
        }
    })
    //initAutoComplete();
    var mapOptions = {
        center: new google.maps.LatLng(dataTBA[0].lat, dataTBA[0].lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_RD"), mapOptions);
    var infoWindow = new google.maps.InfoWindow();
    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    for (i = 0; i < dataTBA.length; i++) {
        var data = dataTBA[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        lat_lng.push(myLatlng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.tbaname
        });
        var str = data.tbaname.split(',');
        var html = "<p><b>Mã điểm đo:</b> " + str[0] + "<p>"
        + "<p><b>Tên điểm đo:</b> " + str[1] + "<p>"
        + "<p><b>Loại lỗi:</b> " + str[3] + "<p>"
        + "<p><b>Chi tiết lỗi:</b> " + str[4] + "<p>"
        + "<p><b>Ngày lỗi:</b> " + formatDate(str[5]) + "<p>";
        latlngbounds.extend(marker.position);
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);

    //***********ROUTING****************//

    //Intialize the Path Array
    var path = new google.maps.MVCArray();

    //Intialize the Direction Service
    var service = new google.maps.DirectionsService();

    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    //Loop and Draw Path Route between the Points on MAP
    //draw_cab(mapData);
    for (var i = 0; i < lat_lng.length; i++) {
        if ((i + 1) < lat_lng.length) {
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            service.route({
                origin: src,
                destination: des,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    //Initialize the Path Array
                    var path = new google.maps.MVCArray();

                    //Set the Path Stroke Color
                    var poly = new google.maps.Polyline({
                        map: map,
                        strokeColor: '#4986E7'
                    });
                    poly.setPath(path);

                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                        path.push(result.routes[0].overview_path[i]);
                    }
                }
            });
        }
    }
    //for (var i = 0; i < lat_lng.length; i++) {
    //    if ((i + 1) < lat_lng.length) {
    //        var src = lat_lng[i];
    //        var des = lat_lng[i + 1];
    //        //path.push(src);
    //        poly.setPath(path);
    //        service.route({
    //            origin: src,
    //            destination: des,
    //            travelMode: google.maps.DirectionsTravelMode.DRIVING
    //        }, function (result, status) {
    //            if (status == google.maps.DirectionsStatus.OK) {
    //                for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
    //                    path.push(result.routes[0].overview_path[i]);
    //                }
    //            }
    //        });
    //    }
    //}

    if (dataCOT.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là Cột</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else if (dataDCU.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là DCU</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else if (dataREP.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là Repeater</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else if (dataTBA.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là Trạm đầu nguồn</h2>");

        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else {
        draw_Cot(dataCOT);
        draw_DCU(dataDCU);
        draw_Repeater(dataREP);
        //draw_cab(cab);
        console.log("CỘT: " + dataCOT.length);
        console.log("DCU: " + dataDCU.length);
        console.log("Repeater: " + dataREP.length);
        console.log("TBA: " + dataTBA.length);

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h2 id="firstHeading" class="firstHeading">TRẠM ' + Tram_name + '</h2>' +
            '<div id="bodyContent">' +

            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

    }
    $.each(inputData, function (key, val) {
        if (val.name.substring(0, 3) == "REP") {
            var _REP = {
                "DCU": val.description,
                "id": getIMEI(val.name),
                "lat": get_vd(val.coordinates),
                "lng": get_kd(val.coordinates)
            }
            dataREP.push(_REP);
        }
        else if (val.name.substring(0, 3) == "TBA") {
            var tba_json = {
                "code": val.description,
                "id": val.name,
                "lat": get_vd(val.coordinates),
                "lng": get_kd(val.coordinates)
            }
            dataTBA.push(tba_json);
        }
        else if (val.name.substring(0, 3) == "DCU") {
            var _DCU = {
                "code": val.description,
                "id": getIMEI(val.name),
                "lat": get_vd(val.coordinates),
                "lng": get_kd(val.coordinates),
                "repeater": []
            }
            dataDCU.push(_DCU);
        }
        else {
            var _COT = {
                "code": val.description,
                "id": getIMEI(val.name),
                "lat": get_vd(val.coordinates),
                "lng": get_kd(val.coordinates)
            }
            dataCOT.push(_COT);
        }
    })
    //console.log(dataCOT);
    //console.log(dataDCU);
    //console.log(dataREP);
    //console.log(dataTBA);
    //save_dcuFull(dataDCU);
    //save_repeaterFull(dataREP);
    //save_tbaFull(dataTBA);
    //save_cotFull(dataCOT);
    //$.each(dataDCU, function (i, dcu) {
    //    $.each(dataREP, function (k, rep) {
    //        if (rep.DCU.indexOf(dcu.id) != -1) {
    //            dcu.repeater.push(rep);
    //        }
    //    })
    //})
    //console.log(dataDCU);
}

function getIMEI(str) {
    return str.substring(4, str.length);
}
function drawMap(data) {
    console.log(data);
    var myLatLng;
    var Tram_name;
    var DCU = [];
    var Repeater = [];
    var COT = [];
    var cab = [];
    map = new google.maps.Map(document.getElementById('map_RD'), {
        zoom: 16
    });
    $.each(data, function (key, val) {
        if (val.name == "" || val.name == null || val.name == undefined) {
            //console.log(val.name);
            console.log("Ko noi day");
            //cab.push(val.coordinates.split(",0.0"));
        }
        else if (val.name.substring(0, 3) == "TBA") {
            //var code;
            //if (JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong == "1")
            //    code = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].parentSelect;
            //else if (JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong == "5")
            //    code = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].value;


            console.log(val);
            Tram_name = val.name;
            var tba_json = {
                tbaid: "",
                tbaname: val.name,
                lat: get_vd(val.coordinates),//vido
                lng: get_kd(val.coordinates)//kinhdo
            }
            tba.push(tba_json);
        }
        else if (val.name.substring(0, 3) == "DCU") {
            DCU.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates), name: val.name });
        }
        else if (val.name.substring(0, 3) == "REP") {
            Repeater.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates), name: val.name });
        }
        else {
            COT.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates), name: val.name });
            ////cab.push({ lat: get_vd(val.coordinates), lng: get_kd(val.coordinates) });
        }
    })
    //myLatLng = { lat: 21.32975, lng: 103.940744 };
    $.each(tba, function (key, val) {
        myLatLng = { lat: val.lat, lng: val.lng };
        map.setCenter(myLatLng);
        var marker_tram = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: val.tbaname,
            icon: 'images/tram.png'
        });
        marker_tram.addListener('click', function () {
            
            infowindow.open(map, marker_tram);
        });
    })
    //console.log(tba);
    if (COT.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là Cột</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else if (DCU.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là DCU</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else if (Repeater.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là Repeater</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else if (tba.length < 1) {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không đúng định dạng. Không có điểm nào là Trạm đầu nguồn</h2>");

        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        return;
    }
    else {
        draw_Cot(COT);
        draw_DCU(DCU);
        draw_Repeater(Repeater);
        //draw_cab(cab);
        console.log("CỘT: " + COT.length);
        console.log("DCU: " + DCU.length);
        console.log("Repeater: " + Repeater.length);
        console.log("TBA: " + tba.length);

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h2 id="firstHeading" class="firstHeading">TRẠM ' + Tram_name + '</h2>' +
            '<div id="bodyContent">' +

            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //var marker = cab.map(function (location, i) {
        //    return new google.maps.Marker({
        //        position: location,
        //        map: map,
        //        title: 'Hello World!'
        //    })
        //})   

        //var markerCluster = new MarkerClusterer(map, marker, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' })
        ////cabLine.setMap(map);

    }

}

function f_insertCaFile_test() {
    try {
        // var p = getAllIdMod();
        var fdata = new FormData();
        var files = $('#txt_file')[0].files[0];
        fdata.append("file", files);

        var config = { callback: "f_result_insertCaFile_test" };
        api_uploadFileKmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}
function f_result_insertCaFile_test(config, para, lst) {
    //console.log(lst);
    mapData = lst.data;
}

function get_kd(str) {
    var arr = str.split(",");
    return parseFloat(arr[0]);
}

function get_vd(str) {
    var arr = str.split(",");
    return parseFloat(arr[1]);
}

function draw_DCU(data) {
    $.each(data, function (key, val) {
        var marker_dcu = new google.maps.Marker({
            position: { lat: val.lat, lng: val.lng },
            map: map,
            title: val.name,
            icon: 'images/dcu.png'
        });

        marker_dcu.addListener('click', function () {
            
            infowindow.open(map, marker_dcu);
        });
        var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">' + val.name + '</h2>' +
        '<div id="bodyContent">' +

        '</div>' +
        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var myLatLng = { lat: val.lat, lng: val.lng };
        map.setCenter(myLatLng);

    })

}

function draw_Repeater(data) {
    console.log(data);
    $.each(data, function (key, val) {
        var marker_re = new google.maps.Marker({
            position: { lat: val.lat, lng: val.lng },
            map: map,
            title: val.name,
            icon: 'images/repeater.png'
        });
        marker_re.addListener('click', function () {
            
            infowindow.open(map, marker_re);
        });
        var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">' + val.name + '</h2>' +
        '<div id="bodyContent">' +

        '</div>' +
        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
    })
}

function draw_Cot(data) {
    console.log(data);
    $.each(data, function (key, val) {
        if (val.name.indexOf("TBA") == 0) {
            var marker_cot = new google.maps.Marker({
                position: { lat: val.lat, lng: val.lng },
                map: map,
                title: val.name,
                icon: 'images/tram.png'
            });
        } else {
            var marker_cot = new google.maps.Marker({
                position: { lat: val.lat, lng: val.lng },
                map: map,
                title: val.name,
                icon: 'images/cot.png'
            });
        }
        marker_cot.addListener('click', function () {
            
            infowindow.open(map, marker_cot);
        });
        var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h2 id="firstHeading" class="firstHeading">' + val.name + '</h2>' +
        '<div id="bodyContent">' +

        '</div>' +
        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
    })
}

function draw_cab(data) {
    //console.log(data);
    $.each(data, function (key, val) {
        if (val.length > 2) {
            var cabdata = [];
            $.each(val, function (i, cord) {
                if (i < val.length - 1) {
                    var cor = { lat: get_vd(cord), lng: get_kd(cord) };
                    cabdata.push(cor);
                }
            })
            var cabLine = new google.maps.Polyline({
                path: cabdata,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 1
            });
            cabLine.setMap(map);
        }
    })
    //var cabLine = new google.maps.Polyline({
    //    path: data,
    //    geodesic: true,
    //    strokeColor: '#FF0000',
    //    strokeOpacity: 1.0,
    //    strokeWeight: 1
    //});
    //cabLine.setMap(map);
}

function undraw_cab(data) {
    //console.log(data);
    $.each(data, function (key, val) {
        if (val.length > 2) {
            var cabdata = [];
            $.each(val, function (i, cord) {
                if (i < val.length - 1) {
                    var cor = { lat: get_vd(cord), lng: get_kd(cord) };
                    cabdata.push(cor);
                }
            })
            var cabLine = new google.maps.Polyline({
                path: cabdata,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 1
            });
            cabLine.setMap(null);
        }
    })
    //var cabLine = new google.maps.Polyline({
    //    path: data,
    //    geodesic: true,
    //    strokeColor: '#FF0000',
    //    strokeOpacity: 1.0,
    //    strokeWeight: 1
    //});
    //cabLine.setMap(map);
}

function arrayToCSV(row) {
    for (let i in row) {
        row[i] = row[i].replace(/"/g, '""');
    }
    return '"' + row.join('","') + '"';
}

////////////////////////////////////////////////////////
function f_luudb(data) {
    //call_Loading();
    //var code;
    //if (JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong == "1")
    //    code = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].parentSelect;
    //else if (JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong == "5")
    //    code = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].value;
    //else
    //    return;
    var imei = [];
    var repeater = [];
    var cot = [];
    var strImei = '';
    var strRepeater = '';
    var strCot = '';
    var strTBA = '';

    var lstImei = [];
    var lstRepeater = [];
    var lstCot = [];
    var lstTBA = [];
    console.log(data);
    $.each(data, function (key, val) {
        if (val.name.indexOf("DCU") == 0) {
            var dcu_json = {
                dcuid: val.name.replace(/-/g, '').substring(4),
                dcuname: val.name,
                lat: get_vd(val.coordinates),//vido
                lng: get_kd(val.coordinates),//kinhdo
                imei: val.name.substring(4)

            }
            //console.log(val.name.replace(/\s+/g, '').substring(4));
            imei.push(dcu_json);
        }
        else if (val.name.indexOf("REP") == 0) {
            var rep_json = {
                id: renameRep(val.name.replace(/\s/g, "").replace("REP.", "")),
                repname: val.name,
                DCU: val.description,
                lat: get_vd(val.coordinates),//vido
                lng: get_kd(val.coordinates)//kinhdo

            }
            repeater.push(rep_json);
        }
        else if (val.name.indexOf("TBA") == 0) {
            //console.log(val);
            var tba_json = {
                id: val.description,
                tbaname: val.description,
                code: val.description,
                lat: get_vd(val.coordinates),//vido
                lng: get_kd(val.coordinates)//kinhdo

            }
            tba.push(tba_json);
        }
        else if (val.name.indexOf("TBA") < 0 && val.name.indexOf("REP") < 0 && val.name.indexOf("DCU") < 0 && val.name.length > 0) {
            var cot_json = {
                id: val.name,
                matram: val.description,
                cotname: val.name,
                lat: get_vd(val.coordinates),//vido
                lng: get_kd(val.coordinates)//kinhdo
            }
            cot.push(cot_json);
        }
    })
    call_Loading();
    var lenImei = imei.length;
    $.each(imei, function (key, val) {
        $("#contentMessage").html("<h2 class='mes-suc'>Đang lưu thông tin tọa độ DCU</h2>");
        //save_dcuFull(imei);
        //var str = val.code + ',' + val.imei + ',' + val.lng + ',' + val.lat + '@';
        var str = val.imei + ',' + val.lng + ',' + val.lat + '@';
        strImei += str;
        if (strImei.length > 3000) {
            lstImei.push(strImei);
            strImei = '';
        }
        if (key == (lenImei - 1)) {
            if (strImei.length < 3000) {
                lstImei.push(strImei);
                strImei = '';
            }
        }
    })
    for (var i = 0; i < lstImei.length; i++) {
        save_dcuFull(lstImei[i]);
        //console.log("DCU: " + lstImei[i]);
    }
    //v_macot: data.id,
    //v_matram: data.code,
    //v_tencot: data.id,
    //v_kinhdo: data.lng,
    //v_vido: data.lat
    var lenTBA = tba.length;
    $.each(tba, function (key, val) {
        $("#contentMessage").html("<h2 class='mes-suc'>Đang lưu thông tin tọa độ Trạm</h2>");
        //save_tbaFull(val);
        var str = val.id + ',' + val.code + ',' + val.id + ',' + val.lng + ',' + val.lat + '@';
        strTBA += str;
        if (strTBA.length > 3000) {
            lstTBA.push(strTBA);
            strTBA = '';
        }
        if (key == (lenTBA - 1)) {
            if (strTBA.length < 3000) {
                lstTBA.push(strTBA);
                strTBA = '';
            }
        }
    })
    for (var i = 0; i < lstTBA.length; i++) {
        save_tbaFull(lstTBA[i]);
        //console.log("Cot: " + lstTBA[i]);
    }

    //v_macot: data.id,
    //v_matram: data.matram,
    //v_tencot: data.cotname,
    //v_kinhdo: data.lng + "",
    //v_vido: data.lat + ""
    var lenCot = cot.length;
    $.each(cot, function (key, val) {
        $("#contentMessage").html("<h2 class='mes-suc'>Đang lưu thông tin tọa độ Cột</h2>");
        //save_cotFull(val);
        var str = val.id + ',' + val.matram + ',' + val.cotname + ',' + val.lng + ',' + val.lat + '@';
        strCot += str;
        if (strCot.length > 3000) {
            lstCot.push(strCot);
            strCot = '';
        }
        if (key == (lenCot - 1)) {
            if (strCot.length < 3000) {
                lstCot.push(strCot);
                strCot = '';
            }
        }
    })
    for (var i = 0; i < lstCot.length; i++) {
        save_cotFull(lstCot[i]);
        //console.log("Cot: " + lstCot[i]);
    }

    //v_code: "",
    //v_imei: data.DCU,
    //v_repID: data.id,
    //v_kenh: null,
    //v_kinhdo: data.lng + "",
    //v_vido: data.lat + "",
    //v_ten: data.repname
    var lenRepeater = repeater.length;
    $.each(repeater, function (key, val) {
        $("#contentMessage").html("<h2 class='mes-suc'>Đang lưu thông tin tọa độ Repeater</h2>");
        //save_repeaterFull(val);
        //var str = val.code + ',' + val.DCU + ',' + val.id + ',' + val.kenh + ',' + val.lng + ',' + val.lat + ',' + val.repname + '@';
        var str = val.DCU + ',' + val.id + ',' + val.lng + ',' + val.lat + ',' + val.repname + '@';
        strRepeater += str;
        if (strRepeater.length > 3000) {
            lstRepeater.push(strRepeater);
            strRepeater = '';
        }
        if (key == (lenRepeater - 1)) {
            if (strRepeater.length < 3000) {
                lstRepeater.push(strRepeater);
                strRepeater = '';
            }
        }
    })
    for (var i = 0; i < lstRepeater.length; i++) {
        save_repeaterFull(lstRepeater[i]);
        //console.log("Rep: " + lstRepeater[i]);
    }
    //save_repeaterFull(strRepeater);
    //if (checkDCU == true) {
    //    delete_rep_cot(code, "COT");
    //    delete_rep_cot(code, "REP");
    //    if (checkdelC == true) {
    //        $.each(tba, function (key, val) {
    //            save_tbaFull(val);
    //        })
    //        $.each(cot, function (key, val) {
    //            save_cotFull(val);
    //        })
    //    }

    //    if (checkdelR == true) {
    //        $.each(repeater, function (key, val) {
    //            save_repeaterFull(val);
    //        })
    //    }
    //}
    hide_Loading();
    $("#contentMessage").html("<h2 class='mes-suc'>Lưu thành công thông tin tọa độ.</h2>");
    setTimeout(function () { $("#contentMessage").html(""); }, 8000);
}

function isnull(value) {
    return "(null)";
}

var count_save_rep = 0;
var count_save_dcu = 0;
var count_save_cot = 0;
function checkkq(check) {
    if (check == true) {
        $("#contentMessage").html("<h2 class='mes-suc'>Lưu thành công thông tin tọa độ.</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 8000);
    }
    else {
        $("#contentMessage").html("<h2 class='mes-err'>Lưu không thành công thông tin tọa độ.</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 8000);
    }
}
function save_dcu(data, rows) {
    console.log(data);
    var code;
    var tentram;
    if (JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong == "1")
        code = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].parentSelect;
    else if (JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].hethong == "5") {
        code = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].value;
        tentram = JSON.parse(sessionStorage.getItem("SsFilterFromTree")).SsFilter[0].nameDl;
    }
    var cmdService = "PKG_DOCCAUHINH.LuuDCU";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    var para = {
        v_code: code,
        v_imei: data.imei.trim(),
        v_kinhdo: data.lng + "",
        v_vido: data.lat + "",
    }
    //console.log(para);
    var result = ExecuteServiceSyns(config, para);
    console.log(result);
    if (result[0].count == "0") {
        $("#contentMessage").html("<h2 class='mes-err'>Bản đồ không phải của trạm biến áp " + tentram + "</h2>");
        setTimeout(function () { $("#contentMessage").html(""); }, 5000);
        checkDCU = false;
        return;
    } else {
        checkDCU = true;
    }
    count_save_dcu++;
    if (count_save_dcu == rows) {
        count_save_dcu = 0;
    }

}
function save_repeater(data, code, rows) {
    var cmdService = "PKG_DOCCAUHINH.LuuRepeater";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    var para = {
        v_code: code,
        v_imei: null,
        v_repID: data.repid,
        v_kenh: null,
        v_kinhdo: data.lng + "",
        v_vido: data.lat + "",
        v_ten: data.repname
    }
    //console.log(para);
    var result = ExecuteServiceSyns(config, para);
    count_save_rep++;
    if (count_save_rep == rows) {
        count_save_rep = 0;
    }
    checkkq(true);

}

function save_cot(data, rows) {
    var cmdService = "PKG_DOCCAUHINH.LuuCot";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    var para = {
        v_macot: data.cotid,
        v_matram: data.matram,
        v_tencot: data.cotname,
        v_kinhdo: data.lng,
        v_vido: data.lat
    }
    //console.log(para);
    //console.log(data.cotname);
    var result = ExecuteServiceSyns(config, para);
    count_save_cot++;
    if (count_save_cot == rows) {
        count_save_cot = 0;
    }

}

function save_tba(data, rows) {
    var cmdService = "PKG_DOCCAUHINH.LuuCot";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    var para = {
        v_macot: data.tbaname,
        v_matram: data.tbaid,
        v_tencot: data.tbaname,
        v_kinhdo: data.lng,
        v_vido: data.lat
    }
    var result = ExecuteServiceSyns(config, para);
    count_save_cot++;
    if (count_save_cot == rows) {
        count_save_cot = 0;
    }

}
function delete_rep_cot(code, type) {
    var cmdService = "PKG_DOCCAUHINH.Delete_Rep_Cot";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    var para = {
        v_code: code,
        v_type: type
    }
    var result = ExecuteServiceSyns(config, para);
    console.log(result);
    if (type == "REP")
        checkdelR = true;
    else
        checkdelC = true;

}

function renameRep(rep) {
    if (rep.substring(0, 1) == '0') {
        return rep.substring(1);
    }
    else {
        return rep;
    }
}

function call_Loading() {
    $("#loading_over").show();
    $(".huyload").click(function () {
        hide_Loading();
    })
}
function hide_Loading() {
    $("#loading_over").fadeOut();
}
function save_cotFull(data) {
    console.log(data);
    var cmdService = "PKG_DOCCAUHINH.LuuCot";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    data = data.replace('@,', '@null,');
    data = data.replace(',,', ',null,');
    data = data.replace(',@', ',null@');
    //$.each(data, function (key, val) {
    var para = {
        //v_macot: data.id,
        //v_matram: data.matram,
        //v_tencot: data.cotname,
        //v_kinhdo: data.lng + "",
        //v_vido: data.lat + ""
        data_: data
    }
    console.log(para);
    ExecuteServiceSyns(config, para);
    //})

}
function save_repeaterFull(data) {
    //console.log(data);
    var cmdService = "PKG_DOCCAUHINH.LuuRepeater";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    //$.each(data, function (key, val) {
    data = data.replace('@,', '@null,');
    data = data.replace(',,', ',null,');
    data = data.replace(',@', ',null@');
    var para = {
        //v_code: "",
        //v_imei: data.DCU,
        //v_repID: data.id,
        //v_kenh: null,
        //v_kinhdo: data.lng + "",
        //v_vido: data.lat + "",
        //v_ten: data.repname
        data_: data
    }
    //console.log(para);
    ExecuteServiceSyns(config, para);
    //})

}

function save_dcuFull(data) {
    //console.log(data);
    var code;
    var tentram;
    var cmdService = "PKG_DOCCAUHINH.LuuDCU";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    data = data.replace('@,', '@null,');
    data = data.replace(',,', ',null,');
    data = data.replace(',@', ',null@');
    //$.each(data, function (key, val) {
    var para = {
        data_: data
    }
    //console.log(para);
    //var result = ExecuteServiceSyns(config, para);
    ExecuteServiceSyns(config, para);
    //})
}
function save_tbaFull(data) {
    var cmdService = "PKG_DOCCAUHINH.LuuCot";
    var config = {
        url: "/WebServices/TienIch/ExcuteStore.asmx/ExcuteStores",
        nameSql: cmdService
    }
    //$.each(data, function (key, val) {
    var para = {
        //v_macot: data.id,
        //v_matram: data.code,
        //v_tencot: data.id,
        //v_kinhdo: data.lng,
        //v_vido: data.lat
        data_: data
    }
    //console.log(para);
    ExecuteServiceSyns(config, para);
    //})
}
/*
[
  {
    "id": "DCU8765432189098765",
    "code": "010101",
    "imei": "8765432189098765",
    "lat": "105.3333",
    "lng": "21.23111",
    "repeater": [
      {
        "id": "7845",
        "lat": "105.4434",
        "lng": "21.423"
      },
      {
        "id": "7846",
        "lat": "105.4434",
        "lng": "21.423"
      },
      {
        "id": "7847",
        "lat": "105.4434",
        "lng": "21.423"
      }
    ]
  },
  {
    "id": "DCU3521456987458254",
    "code": "010102",
    "imei": "3521456987458254",
    "lat": "105.2222",
    "lng": "21.21111",
    "repeater": [
      {
        "id": "7848",
        "lat": "105.4434",
        "lng": "21.423"
      },
      {
        "id": "7849",
        "lat": "105.4434",
        "lng": "21.423"
      },
      {
        "id": "7850",
        "lat": "105.4434",
        "lng": "21.423"
      }
    ]
  }
]
*/

function formatDate(value) {
    var date = new Date(value);
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate();

    return day + "/" + month + "/" + year;
}