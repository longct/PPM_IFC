var jsdata = [];
var jsTu = [];
$(document).ready(function () {
    try {
        get_cbDV();
        setTimeout(function () {
            var code = $('#cb_donvi option:selected').val();
            getTree(code, 'root');
        },1000)
      

        $('#cb_donvi').change(function () {
            var code = $('#cb_donvi option:selected').val();
            if (code == '-1') {
                $('#using_json_2').jstree("destroy");
                jsdata = [];
            } else {
                $('#using_json_2').jstree("destroy");
                jsdata = [];
                getTree(code, 'root');
            }
        })


    } catch (e) {
        console.log(e);
    }

});
function get_cbDV() {
    var config = { namesql: "PKG_CAYDULIEU.GetDonVi", callback: "f_result_get_cbDV", connstr: "ConnectOracleStreetLight" };
    var para = {};
    ExecuteServiceSyns(config, para, false);
}
function f_result_get_cbDV(config, para, lst) {
    var data = lst.data;
    $('#cb_donvi').empty();
    //$('#cb_donvi').append($('<option>', {
    //    value: '-1',
    //    text: '-- CHỌN ĐƠN VỊ --'
    //}));
    $.each(data, function (key, val) {
        $('#cb_donvi').append($('<option>', {
            value: val.madonvi,
            text: val.tendonvi
        }));
    })

}
//var refresh_tree = setInterval(function () {
//    //$('#using_json_2').jstree("destroy");
//    getTree('0101', 'root');
//    $('#using_json_2').jstree(true).refresh(true);
//}, 5000);
function getTree(code, type) {
    console.log(type);
    var config = { namesql: "PKG_CAYDULIEU.GetTreeAll", callback: "f_result_getTree", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_UserId: 1,
        v_Permission: 1,
        v_Code: code,
        v_KieuHienThi: type
    };
    //console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_getTree(config, para, lst) {

    var data = lst.data;
    if (data.length > 0) {
        $.each(data, function (key, val) {
            var parentid = val.parent;
            if (parentid.length == 4) {
                parentid = '#';
                jsdata.push(
                {
                    id: val.id,
                    parent: parentid,
                    text: val.text,
                    icon: val.icon,
                    data: {
                        type: val.type,
                        diachi: val.diachikhachhang,
                        canhbao: val.cocanhbao,
                        madiemdo: val.madiemdo,
                        socongto: val.socongto,
                        kinhdo: val.kinhdo,
                        vido: val.vido
                    },
                    state: { opened: true, selected: false }
                })
            }
            else {
                jsdata.push(
                {
                    id: val.id,
                    parent: parentid,
                    text: val.text,
                    icon: val.icon,
                    data: {
                        type: val.type,
                        diachi: val.diachikhachhang,
                        canhbao: val.cocanhbao,
                        madiemdo: val.madiemdo,
                        socongto: val.socongto,
                        kinhdo: val.kinhdo,
                        vido: val.vido
                    }
                })
            }
            getTu(val.id, 'sub');
        })
    }

}
function getTu(code, type) {
    var config = { namesql: "PKG_CAYDULIEU.GetTreeAll", callback: "f_result_getTu", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_UserId: 1,
        v_Permission: 1,
        v_Code: code,
        v_KieuHienThi: type
    };
    ExecuteServiceSyns(config, para, false);
}
function f_result_getTu(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    if (data.length > 0) {
        $.each(data, function (key, val) {
            var parentid = val.parent;
            jsdata.push(
                {
                    id: val.id,
                    parent: parentid,
                    text: val.text,
                    icon: val.icon,
                    data: {
                        type: val.type,
                        diachi: val.diachikhachhang,
                        canhbao: val.cocanhbao,
                        madiemdo: val.madiemdo,
                        socongto: val.socongto,
                        kinhdo: val.kinhdo,
                        vido: val.vido
                    }
                })

            //getBong(val.id, 'bong');
        })
        drawTree(jsdata);
    }

}

function drawTree(data) {
    localStorage.removeItem("tree_node");
    $('#using_json_2').jstree({
        'core': {
            "multiple": false,//false
            "animation": 0,
            "check_callback": true,
            'data': data
        },
        "checkbox": {
            "keep_selected_style": false
        },
        "plugins": [
            //"wholerow",
            //"checkbox"
        ]
    });

    $('#using_json_2')
      // listen for event
      .on('changed.jstree', function (e, data) {
          localStorage.removeItem("tu_ar");
          if (!$("#hienbong_map").is(':checked')) {
              $("#hienbong_map").click();
          }
          var i, j, r = [];
          var q = [];
          var t = [];
          var b = [];
          var tree_node;
          jsTu = [];
          for (i = 0, j = data.selected.length; i < j; i++) {
              //console.log(data.instance.get_node(data.selected[i]).data.type);
              if (data.instance.get_node(data.selected[i]).data.type == "quan") {
                  getListTu(data.instance.get_node(data.selected[i]).id);
                  localStorage.setItem("quan", JSON.stringify([data.instance.get_node(data.selected[i]).id]));
                  if (capLine && capLine.length > 0) {
                      $.each(capLine, function (key, val) {
                          capLine[key].setMap(null);
                      })
                      $("#hiencap_map").prop('checked', false);
                  }
                  showChitiet([]);
              }
              else if (data.instance.get_node(data.selected[i]).data.type == "tu") {
                  localStorage.setItem("quan", JSON.stringify([]));
                  //localStorage.setItem("tuSelected_bak", JSON.stringify([]));
                  getBong_1Tu(data.instance.get_node(data.selected[i]));
                  if (capLine && capLine.length > 0) {
                      $.each(capLine, function (key, val) {
                          capLine[key].setMap(null);
                      })
                      $("#hiencap_map").prop('checked', false);
                  }
                  //getBong_cap();
              }
              //console.log(data.instance.get_node(data.selected[i]).id);
          }


      })
// create the instance
.jstree();
}

function getListTu(code) {
    var config = { namesql: "PKG_CAYDULIEU.GetTu", callback: "f_result_getListTu", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_Code: code
    };
    ExecuteServiceSyns(config, para, false);
}
function f_result_getListTu(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    var bong_ar = [];
    var tu_ar = [];
    var mid;
    var json;
    var tuselect = [];
    $.each(data, function (key, val) {
        tu_ar.push(val);
    })
    localStorage.setItem("tu_ar", JSON.stringify(tu_ar));
    $.each(tu_ar, function (key, val) {
        tuselect.push(val.id + "");
    })
    console.log(tuselect);
    localStorage.setItem("tuSelected", JSON.stringify(tuselect));
    getBong(tu_ar);
}
function getBong(arr) {
    //console.log(arr);
    $.each(arr, function (key, val) {
        var config = { namesql: "PKG_CAYDULIEU.GetBong", callback: "f_result_getBong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_idtu: val.id
        };
        ExecuteServiceSyns(config, para, false);
    })
}
function f_result_getBong(config, para, lst) {
    //console.log(lst.data);
    var data = lst.data;
    var bong_ = []
    var mid;
    $.each(data, function (key, val) {
        bong_.push(val);
    })
    mid = para.v_idtu;
    var tu_ = { id: mid, bong: bong_ };
    jsTu.push(tu_);
    localStorage.setItem("datat_b", JSON.stringify(jsTu));

    bindMarker_tu(gPTM);
    bindMarker_bong(gPTM);

}

function getBong_1Tu(tid) {
    //console.log(tid);

    localStorage.setItem("tu_ar", JSON.stringify(
        [{
            id: tid.id,
            parent: tid.parent,
            text: tid.text,
            icon: tid.icon,
            type: tid.data.type,
            madiemdo: tid.data.madiemdo,
            socongto: tid.data.socongto,
            kinhdo: tid.data.kinhdo,
            vido: tid.data.vido,
            diachikhachhang: tid.data.diachi
        }]));

    gPTM.setCenter({ lat: parseFloat(tid.data.vido), lng: parseFloat(tid.data.kinhdo) });
    var tu_ar = [];
    var config = { namesql: "PKG_CAYDULIEU.GetBong", callback: "f_result_getBong_1Tu", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_idtu: tid.id
    }
    ExecuteServiceSyns(config, para, false);
}
function f_result_getBong_1Tu(config, para, lst) {
    var data = lst.data;
    var bong_ = []
    var mid;
    $.each(data, function (key, val) {
        bong_.push(val);
    })
    mid = para.v_idtu;
    var tu_ = { id: mid, bong: bong_ };
    jsTu.push(tu_);
    localStorage.setItem("datat_b", JSON.stringify(jsTu));
    bindMarker_tu(gPTM);
    bindMarker_bong(gPTM);
    localStorage.setItem("tuSelected", JSON.stringify([mid]));
    showChitiet([mid]);
}