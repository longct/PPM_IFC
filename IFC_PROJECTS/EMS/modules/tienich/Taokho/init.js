$(document).ready(function () {
    loadConetent();
    GetTreeAll_qldmdl();
     
});

function GetTreeAll_qldmdl() {

    $("#tree_left_qldmdl").show();
    $("#stree_qldm").show();
    $('.easy-tree-qldm').jstree("destroy");
    $("#help_tree_qldm").hide();
    try {
        var v_UserCode = JSON.parse(localStorage.getItem("userinfo")).code;
        var config = { connstr: "ConnectEMS", namesql: "TR_LSTKHO", callback: "result_GetTreeAll_qldmdl" };
        var para = {
            code: v_UserCode
        }
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_GetTreeAll_qldmdl(config, para, lst) {

    var data = lst.data;
     setTreeDL_qldm(data);
   
}

function setTreeDL_qldm(data) {

    var jsdataqldm = [];
    if (data.length == 0) {
        jsdataqldm.splice(0, jsdataqldm.length);
        initTree_qldm(jsdataqldm);
    } else {
        $.each(data, function (key, val) {
            var iskhotong = val.iskhotong == 1 ? true : false;
            jsdataqldm.push({
                "id": val.id, "parent": val.parentid, "text": val.label, "icon": val.icon, "data": {
                    id: val.id,
                    parent: val.parentid,
                    text: val.label,
                    iskhotong: iskhotong,
                    codevirtual: val.codevirtual,
                    codereal: val.codereal,
                    nameparent: val.nameparent
                }
            });

        });
        initTree_qldm(jsdataqldm);
    }

}
function initTree_qldm(data) {
    $('#tree_left_qldmdl').jstree({
        "core": {
            "multiple": false,//false
            "animation": 0,
            "check_callback": true,
            'data': data
        },
        "search": {
            "show_only_matches": true,
            "search_callback": function (str, node) {
                if (node.data.socongto.indexOf(str) != -1) {
                    //console.log(node);
                    $('.easy-tree-qldm').jstree('open_node', node.id);
                    $(".easy-tree-qldm").jstree('get_selected', true);
                    $(".easy-tree-qldm").jstree('select_node', node.id, function (e, d) {
                        if (e.parents.length) {
                            $(".easy-tree-qldm").jstree('open_node', e.parent);
                        };
                    });
                }
                if (node.text.indexOf(str) != -1) {
                    $('.easy-tree-qldm').jstree('open_node', node.id);
                    $(".easy-tree-qldm").jstree('get_selected', true);
                    $(".easy-tree-qldm").jstree('select_node', node.id, function (e, d) {
                        if (e.parents.length) {
                            $(".easy-tree-qldm").jstree('open_node', e.parent);
                        };
                    });
                }
            }
        },
        "contextmenu": {
            "items": customMenu_qldm
        },


        "plugins": [
            "search",
            //"checkbox",
            "contextmenu"]
    });
  
    $('.easy-tree-qldm').bind('ready.jstree', function (e, data) {
        if (localStorage.getItem("tree_node_qldm") !=null) {
            var node = JSON.parse(localStorage.getItem("tree_node_qldm"))[0].id;
            $(".easy-tree-qldm").jstree('select_node', node, function (e, d) {
                if (e.parents.length) {
                    $(".easy-tree-qldm").jstree('open_node', e.parent);
                };
            });
        } else {
            $(".easy-tree-qldm").jstree('open_node', "#01");
        }
    })
    $('.easy-tree-qldm').on('select_node.jstree', function (e, data) {
        var countSelected = data.selected.length;
        if (countSelected > 1) {
            data.instance.deselect_node([data.selected[0]]);
        }
    });

    $("#stree_qldm span").click(function () {
        $(".easy-tree-qldm").jstree(true).search($("#search_meter_qldmdl").val());
    });
    $('.easy-tree-qldm').on("changed.jstree", function (e, data) {
        localStorage.removeItem("tree_node_qldm");
        var data_row = [];
        if (data.selected.length > 1) {
            for (var i = 0; i < data.selected.length; i++) {
                data_row.push({ "id": data.instance.get_node(data.selected[i]).id, "name": data.instance.get_node(data.selected[i]).text, "iskhotong": data.instance.get_node(data.selected[i]).data.iskhotong, "codevirtual": data.instance.get_node(data.selected[i]).data.codevirtual, "codereal": data.instance.get_node(data.selected[i]).data.codereal, "nameparent": data.instance.get_node(data.selected[i]).data.nameparent });
            }
        } else {
            data_row = ([{ "id": data.instance.get_node(data.selected[0]).id, "name": data.instance.get_node(data.selected[0]).text, "iskhotong": data.instance.get_node(data.selected[0]).data.iskhotong, "codevirtual": data.instance.get_node(data.selected[0]).data.codevirtual, "codereal": data.instance.get_node(data.selected[0]).data.codereal, "nameparent": data.instance.get_node(data.selected[0]).data.nameparent }]);
        }
        localStorage.setItem("tree_node_qldm", JSON.stringify(data_row));

    });
   
}

function customMenu_qldm(node) {
    // The default set of all items
    var items = {
        addItem: { // The "rename" menu item
            label: "Thêm thư mục",
            action: function () {
                $("#modal_taokho").modal("show");
                LoadKho_tk();
            }
        },
        renameItem: { // The "rename" menu item
            label: "Sửa thư mục",
            action: function () {
                $("#modal_taokho").modal("show");
                LoadTrangThaiKho();
                getDataEdit_tk(node.id);
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Xóa",
            action: function () {
                f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () {
                    f_xoa_dm(node.id);
                });
            }
        }
    };
    return items;
}
function f_xoa_dm(code) {
    try{
        var config = { namesql: "TR_DELETEKHO", callback: "f_delete_tk", connstr: "ConnectEMS" };
        var para = { code: code };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_delete_tk(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") {
            messInfo("messinfo_tkho", "Không xóa được", 'error');
        }
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tkho", row, 'ok');
            setTimeout(function () {
                messInfo("messinfo_tkho", '', 'ok');
            }, 2000);
            localStorage.removeItem("tree_node_qldm");
            GetTreeAll_qldmdl();
   
        } else {
            messInfo("messinfo_tkho", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
   
}

