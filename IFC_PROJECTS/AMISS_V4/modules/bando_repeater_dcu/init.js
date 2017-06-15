var mapData;
var map;
$(document).ready(function () {
    try {
        showhideTree()
        selectlang();
        f_GetData_ComboDL();
        loadContent();
        $('#txt_file').change(function () {
            f_insertCaFile_test();
        });

        $("#btnKiemTra").click(function () {
            drawMap(mapData);
        })
    } catch (e) {
        console.log(e);
    }

});

function f_GetData_ComboDL() {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetParentNodeAllTree", callback: "f_result_GetParentNodeAllTree" };
        var para = {
            v_Code: "01",
            v_TypeTree: 1
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_GetParentNodeAllTree(config, para, lst) {
    try {
        var source = null;
        var data = lst.data;
        //console.log(data);
        if (data != null) {
            $("#dropDownButton").jqxDropDownButton({
                width: '100px',
                height: '100px'
            });
            $('#jqxDropDL_home').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxDropDL_home').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' + item.label + '</div>';
                $("#dropDownButton").jqxDropDownButton('setContent', dropDownContent);
                $('#dropDownButton').jqxDropDownButton('close');
            });
            var dt = [];
            $.each(data, function (key, value) {
                var item = {
                    "id": value.code,
                    "parentid": value.parentcode,
                    "text": value.name,
                    "value": value.code
                }
                ////console.log(item);
                dt.push(item);

            });
            ////console.log(dt);
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
            $('#jqxDropDL_home').jqxTree({ source: records, width: '305px', height: '200px', });
            $('#jqxDropDL_home').jqxTree('selectItem', $("#01")[0]);
        }
    }
    catch (e) {
        //console.log(e.message);
    }

}

function drawMap(data) {
    ////console.log(data);
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
            ////console.log(val.name);
            ////console.log(val.coordinates.split(",0.0"));
            cab.push(val.coordinates.split(",0.0"));
        }
        else if (val.name.substring(0, 3) == "TBA") {
            myLatLng = { lat: get_vd(val.coordinates), lng: get_kd(val.coordinates) };
            Tram_name = val.name;
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
    map.setCenter(myLatLng);
    var marker_tram = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: Tram_name,
        icon: 'img/tram.png'
    });
    marker_tram.addListener('click', function () {
        infowindow.open(map, marker_tram);
    });


    draw_Cot(COT);
    draw_DCU(DCU);
    draw_Repeater(Repeater);
    draw_cab(cab);
    ////console.log(cab);

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
    ////console.log(lst);
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
    ////console.log(data);
    $.each(data, function (key, val) {
        var marker_dcu = new google.maps.Marker({
            position: { lat: val.lat, lng: val.lng },
            map: map,
            title: val.name,
            icon: 'img/dcu.png'
        });
    })
}

function draw_Repeater(data) {
    ////console.log(data);
    $.each(data, function (key, val) {
        var marker_re = new google.maps.Marker({
            position: { lat: val.lat, lng: val.lng },
            map: map,
            title: val.name,
            icon: 'img/repeater.png'
        });
    })
}

function draw_Cot(data) {
    ////console.log(data);
    $.each(data, function (key, val) {
        var marker_cot = new google.maps.Marker({
            position: { lat: val.lat, lng: val.lng },
            map: map,
            title: val.name,
            icon: 'img/cot.png'
        });

        google.maps.event.addListener(marker_cot, 'click', function () {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
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
                    //console.log(cor);
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