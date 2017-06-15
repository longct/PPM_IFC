var jsdata = [];
$(document).ready(function () {
    try {
        get_cbDV();
        //var code = $('#cb_donvi option:selected').val();
        //getTree(code, 'root');
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
    $('#cb_donvi').append($('<option>', {
        value: '-1',
        text: '-- CHỌN ĐƠN VỊ --'
    }));
    $.each(data, function (key, val) {
        $('#cb_donvi').append($('<option>', {
            value: val.madonvi,
            text: val.tendonvi
        }));
    })

}
function getTree(code, type) {
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
    //console.log(lst);
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
            //console.log(val.type);

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
            "multiple": true,//false
            "animation": 0,
            "check_callback": true,
            'data': data
        },
        "checkbox": {
            "keep_selected_style": false
        },
        "plugins": [
            "wholerow",
            "checkbox"
        ]
    });

    $('#using_json_2')
      // listen for event
      .on('changed.jstree', function (e, data) {
          localStorage.removeItem("tree_node");
          var i, j, r = [];
          var q = [];
          var t = [];
          var b = [];
          var tree_node;
          for (i = 0, j = data.selected.length; i < j; i++) {
              //console.log(data.instance.get_node(data.selected[i]).data.type);

              if (data.instance.get_node(data.selected[i]).data.type == "quan")
                  q.push({
                      id: data.instance.get_node(data.selected[i]).id,
                      kinhdo: data.instance.get_node(data.selected[i]).data.kinhdo,
                      vido: data.instance.get_node(data.selected[i]).data.vido,
                      ten: data.instance.get_node(data.selected[i]).text,
                      icon: data.instance.get_node(data.selected[i]).icon,
                      parent: data.instance.get_node(data.selected[i]).parent
                  });
              if (data.instance.get_node(data.selected[i]).data.type == "tu")
                  t.push({
                      id: data.instance.get_node(data.selected[i]).id,
                      kinhdo: data.instance.get_node(data.selected[i]).data.kinhdo,
                      vido: data.instance.get_node(data.selected[i]).data.vido,
                      ten: data.instance.get_node(data.selected[i]).text,
                      icon: data.instance.get_node(data.selected[i]).icon,
                      parent: data.instance.get_node(data.selected[i]).parent
                  });
              if (data.instance.get_node(data.selected[i]).data.type == "BONG")
                  b.push({
                      id: data.instance.get_node(data.selected[i]).id,
                      kinhdo: data.instance.get_node(data.selected[i]).data.kinhdo,
                      vido: data.instance.get_node(data.selected[i]).data.vido,
                      ten: data.instance.get_node(data.selected[i]).text,
                      icon: data.instance.get_node(data.selected[i]).icon,
                      parent: data.instance.get_node(data.selected[i]).parent
                  });
              r.push(data.instance.get_node(data.selected[i]).id);
          }
          tree_node = [{ quan: q, tu: t, bong: b }];
          localStorage.setItem("tree_node", JSON.stringify(tree_node));
          localStorage.setItem("tree_bak", JSON.stringify(tree_node));
          if (!localStorage.getItem("tree_node") || JSON.parse(localStorage.getItem("tree_node"))[0].bong.length == 0) {
              $("#hienbong_map").attr("disabled", "disabled");
              $("#hiencap_map").attr("disabled", "disabled");
          } else {
              $("#hienbong_map").removeAttr("disabled");
              $("#hiencap_map").removeAttr("disabled");
          }
          var idtu = tree_node[0].tu;
        
          if (idtu.length != 0) {
              var chitiettu = { id: idtu[0].id, userinfo: JSON.parse(localStorage.getItem("userinfo")) };
              localStorage.setItem("chitiettu", JSON.stringify(chitiettu));
          }
          bindMarker_tu(gPTM);
          showChitiet();

          //uiOwlCarousel();
      })
      // create the instance
      .jstree();
}