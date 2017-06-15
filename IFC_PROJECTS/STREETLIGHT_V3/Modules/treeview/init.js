var jsdata = [];
var jsTu = [];
$(document).ready(function () {
    try {
        get_cbDV();
        setTimeout(function () {
            var code = $('#cb_donvi option:selected').val();
            getTree(code, 'root');
        }, 1000)



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
    var code = JSON.parse(localStorage.getItem("userinfo")).madonvi;
    var para = { v_code: code };
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
    var usercode = JSON.parse(localStorage.getItem("userinfo")).idnhanvien;
    var config = { namesql: "PKG_CAYDULIEU.GetTreeAll", callback: "f_result_getTree", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_UserId: usercode,
        v_Permission: 1,
        v_Code: code,
        v_KieuHienThi: type
    };
    //console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_getTree(config, para, lst) {
    //console.log(lst);
    var data = lst.data;
    if (data.length > 0) {
        $.each(data, function (key, val) {
            var parentid = val.parent;
            //alert(val.id);
            var state;
            if (localStorage.getItem("quan")) {
                if (JSON.parse(localStorage.getItem("quan")).length == 1 && val.id == JSON.parse(localStorage.getItem("quan"))[0]) {

                    state = {
                        "opened": true,
                        "disabled": false,
                        "selected": true
                    };
                }
                else {
                    state = {
                        "opened": false,
                        "disabled": false,
                        "selected": false
                    };
                }

            }
            else {
                state = {
                    "opened": false,
                    "disabled": false,
                    "selected": false
                };
            }

            //if (parentid.length == 2) {
            //    parentid = '#';
            //    jsdata.push(
            //    {
            //        id: val.id,
            //        parent: parentid,
            //        text: val.text,
            //        icon: val.icon,
            //        data: {
            //            type: val.type,
            //            diachi: val.diachikhachhang,
            //            canhbao: val.cocanhbao,
            //            madiemdo: val.madiemdo,
            //            socongto: val.socongto,
            //            kinhdo: val.kinhdo,
            //            vido: val.vido
            //        },
            //        state: state
            //    })
            //}
            //else {
                jsdata.push(
                {
                    id: val.id,
                    parent: parentid,
                    text: val.text,
                    icon: val.icon,
                    state: state,
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
            //}
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
    //console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_getTu(config, para, lst) {
    var data = lst.data;
   
    if (data.length > 0) {
        $.each(data, function (key, val) {
            var parentid = val.parent;
            var state;
            if (localStorage.getItem(("tuSelected")) && localStorage.getItem("quan")) {
                if (val.id == JSON.parse(localStorage.getItem("tuSelected"))[0] && JSON.parse(localStorage.getItem("quan")).length == 0) {
                    //alert(1);
                    state = {
                        "opened": true,
                        "disabled": false,
                        "selected": true
                    };
                }
            }
            else {
                //alert(3);
                state = {
                    "opened": false,
                    "disabled": false,
                    "selected": false
                };
            }
            jsdata.push(
                {
                    id: val.id,
                    parent: parentid,
                    text: val.text,
                    icon: val.icon,
                    state: state,
                    data: {
                        parent: parentid,
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
        console.log(JSON.stringify(jsdata));
        drawTree(jsdata);
    }

}

function drawTree(data) {
    localStorage.removeItem("tree_node");
    $('#using_json_2').jstree({
        "core": {
            "animation": 0,
            "multiple": false,
            "check_callback": true,
            "themes": { "stripes": false },
            'data': data
        },
        "contextmenu": {
            "items": function ($node) {
                var tree = $("#using_json_2").jstree(true);
                return {
                    "tsvh": {
                        "separator_before": false,
                        "separator_after": true,
                        "label": "Thông số vận hành",
                        "icon": "img/tsvh.png",
                        "action": function (obj) {
                            $('#thongso_vanhanh').modal("show");
                        }
                    },
                    "bdtsvh": {
                        "separator_before": false,
                        "separator_after": true,
                        "label": "Biểu đồ thông số vận hành",
                        "icon": "img/chart_bar.png",
                        "action": function (obj) {
                            $('#bieudo_vanhanh').modal("show");
                        }
                    },
                    "report": {
                        "separator_before": false,
                        "separator_after": true,
                        "label": "Báo cáo",
                        "icon": "img/report.jpeg",
                        "submenu": {
                            "report1": {
                                "separator_before": false,
                                "separator_after": true,
                                "label": "Báo cáo tình hình hoạt động",
                                "icon": "img/report.jpeg",
                                "action": function (obj) {
                                    $('#Baocao_tinhhinh_hoatdong').modal("show");
                                }

                            },
                            "report2": {
                                "separator_before": false,
                                "separator_after": true,
                                "label": "Báo cáo công suất",
                                "icon": "img/report.jpeg",
                                "action": function (obj) {
                                    $('#baocao_congsuat').modal("show");
                                }

                            },
                            "report3": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Báo cáo điện năng tiêu thụ",
                                "icon": "img/report.jpeg",
                                "action": function (obj) {
                                    $('#Baocao_diennang_tieuthu').modal("show");
                                }

                            }
                        },
                        "action": function (obj) {

                        }
                    }
                };
            }
        },
        "types": {
            "#": {
                "max_children": 1,
                "max_depth": 4,
                "valid_children": ["root"]
            },
            "root": {
                "icon": "/static/3.3.3/assets/images/tree_icon.png",
                "valid_children": ["default"]
            },
            "default": {
                "valid_children": ["default", "file"]
            },
            "file": {
                "icon": "glyphicon glyphicon-file",
                "valid_children": []
            }
        },
        "plugins": [
          "contextmenu",
          //"checkbox",
          //"dnd",
          //"search",
          //"state",
          "types"
        ]
    });

    $('#using_json_2')
      // listen for event
      .on('changed.jstree', function (e, data) {
          //if (JSON.parse(localStorage.getItem("tuSelected")).length == 1) {
          //    $("#using_json_2").jstree(true).select_node(JSON.parse(localStorage.getItem("tuSelected"))[0]);
          //    console.log(JSON.parse(localStorage.getItem("tuSelected"))[0]);
          //}
        
          //localStorage.removeItem("tu_ar");
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
              //console.log(data.instance.get_node(data.selected[i]).data.type);
              if (data.instance.get_node(data.selected[i]).data.type == "quan" || data.instance.get_node(data.selected[i]).data.type == "congty") {

                  getListTu(data.instance.get_node(data.selected[i]).id);
                  localStorage.setItem("quan", JSON.stringify([data.instance.get_node(data.selected[i]).id]));
                  if (capLine && capLine.length > 0) {
                      $.each(capLine, function (key, val) {
                          capLine[key].setMap(null);
                      })
                      $("#hiencap_map").prop('checked', false);
                  }
                  if ($("#gmap").hasClass("has-right")) {
                      showChitiet_map(JSON.parse(localStorage.getItem("tuSelected")));
                  } else {
                      $("#thongtintu_text").empty();

                  }
              }
              else if (data.instance.get_node(data.selected[i]).data.type == "nhanh") {
                  console.log(data.instance.get_node(data.selected[i]).data);
                  localStorage.setItem("nhanh", JSON.stringify([data.instance.get_node(data.selected[i]).id]));
                  //localStorage.setItem("tuSelected_bak", JSON.stringify([]));
                  //getBong_1Tu(data.instance.get_node(data.selected[i]));
                  //if (capLine && capLine.length > 0) {
                  //    $.each(capLine, function (key, val) {
                  //        capLine[key].setMap(null);
                  //    })
                  //    $("#hiencap_map").prop('checked', false);
                  //}
                  //getBong_cap();
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
                  if ($("#gmap").hasClass("has-right")) {
                      showChitiet_map(JSON.parse(localStorage.getItem("tuSelected")));
                  } else {
                      $("#thongtintu_text").empty();

                  }
                  //getBong_cap();
              }
              //console.log(data.instance.get_node(data.selected[i]).id);
          }

          // Duy add 
          //console.log(data.node);
          if (data.node != undefined) {
              var item_secected = {
                  id: data.node.id,
                  text: data.node.text,
                  parent: data.node.parent,
                  type: data.node.data.type
              }
              localStorage.setItem("item_selected", JSON.stringify(item_secected));
          }
      })
// create the instance
.jstree();


}
function customMenu(node) {
    // The default set of all items
    var items = {
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function () { }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function () { }
        }
    };

    if ($(node).hasClass("folder")) {
        // Delete the "delete" menu item
        delete items.deleteItem;
    }

    return items;
}
function getListTu(code) {
    var config = { namesql: "PKG_CAYDULIEU.GetTu", callback: "f_result_getListTu", connstr: "ConnectOracleStreetLight" };
    var para = {
        v_Code: code
    };
    //console.log(para);
    ExecuteServiceSyns(config, para, false);
}
function f_result_getListTu(config, para, lst) {
    var data = lst.data;
  
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
    //console.log(tuselect);
    localStorage.setItem("tuSelected", JSON.stringify(tuselect));
    countBong(JSON.parse(localStorage.getItem("tuSelected")) + "");
    gPTM.setCenter({ lat: parseFloat(tu_ar[0].vido), lng: parseFloat(tu_ar[0].kinhdo) });

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
    //console.log(tu_);
    localStorage.setItem("datat_b", JSON.stringify(jsTu));

    bindMarker_tu(gPTM);
    bindMarker_bong(gPTM);
    showChitiet(JSON.parse(localStorage.getItem("tuSelected")));
}

function getBong_1Tu(tid) {

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
    //console.log(tid.icon);
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
    localStorage.setItem("datat_b", JSON.stringify([tu_]));
    localStorage.setItem("tuSelected", JSON.stringify([mid]));
    countBong(JSON.parse(localStorage.getItem("tuSelected")) + "");
    bindMarker_tu(gPTM);
    bindMarker_bong(gPTM);
    showChitiet([mid]);
}
