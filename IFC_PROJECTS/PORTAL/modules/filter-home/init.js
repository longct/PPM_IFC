$(document).ready(function () {

    var width = $(window).width();
    var height = $(window).height();
    selectlang();
    if (sessionStorage.getItem("tree")) {
        $("#tree_left_home").html(sessionStorage.getItem("tree"));
    }
    var tree = localStorage.getItem("tree");

    $("#ad-search").click(function () {
        if ($(this).hasClass("hide-ad")) {
            $(this).removeClass("hide-ad");
            $(".ad-content").slideDown();
        } else {
            $(this).addClass("hide-ad");
            $(".ad-content").slideUp();
        }
    })

    $("#chontram").change(selectChange);
});

function setTreeDL(data, type) {
    data_tree = data;
    var data_ = [];
    $.each(data, function (key, val) {
        if (val.socongto == null || val.socongto == "" || val.socongto == undefined) {
            data_.push(val);
        }
        else {
            meter_.push(val);
        }
    })
    var jsdata = [];
    if (data.length == 0) {
        jsdata.splice(0, jsdata.length);
        initTree(jsdata);
    } else {
        if (type == 1) {
            var data_tree_home = data_;
            $(".easy-tree").show();
        } else {
            var data_tree_home = data_tree;
            $(".easy-tree").hide();
        }
        console.log(data_tree_home);
        $.each(data_tree_home, function (key, val) {
            var p = val.parentid;
            var s = val.socongto;
            //var m = id;
            var t = val.loaithumuc;
            if (s == null) { s = "0"; }
            //if (p.length <= 4) { p = "#"; }
            if (s == "0") {
                jsdata.push({ "id": val.id, "parent": p, "text": val.label + '<span class="total">' + val.totalrows + '</span>', "icon": val.icon, "data": { code: val.parentid, socongto: s, type: t, meterid: val.id } });
            } else {
                jsdata.push({ "id": val.id, "parent": p, "text": val.label, "icon": val.icon,state : { hidden : true}, "data": { code: val.parentid, socongto: s, type: t, meterid: val.id } });
            }

        })
        initTree(jsdata);
    }

}
function selectChange(code) {
    localStorage.setItem("DL", code);
    $("#tree_left_home").slideDown();
    $("#ad-search").slideDown();
    $("#stree").slideDown();
    $("#help_tree").slideUp();
    $('.easy-tree').jstree("destroy");
    GetTreeAll(code, "sub");

}
function initTree(v) {
    $('.easy-tree').jstree("destroy");
    var treeData = v;
    $('.easy-tree').jstree({
        "core": {
            "multiple": false,//false
            "animation": 0,
            "check_callback": true,
            'data': treeData,
            "themes": {
                "icons": false
            }
        },
        "search": {
            "show_only_matches": true,
            "search_callback": function (str, node) {
                //console.log(node);

                if (node.data.socongto.indexOf(str) != -1) {
                    //console.log(node);
                    $('.easy-tree').jstree('open_node', node.id);
                    $(".easy-tree").jstree('get_selected', true);
                    $(".easy-tree").jstree('select_node', node.id, function (e, d) {
                        if (e.parents.length) {
                            $(".easy-tree").jstree('open_node', e.parent);
                        };
                    });
                }
                if (node.text.indexOf(str) != -1) {
                    $('.easy-tree').jstree('open_node', node.id);
                    $(".easy-tree").jstree('get_selected', true);
                    $(".easy-tree").jstree('select_node', node.id, function (e, d) {
                        if (e.parents.length) {
                            $(".easy-tree").jstree('open_node', e.parent);
                        };
                    });
                }
            }
        },
        "plugins": [
            "search",
            //"checkbox",
            "contextmenu"]
    });
    // 8 interact with the tree - either way is OK
    //$('.easy-tree').jstree(true).redraw(true);    
    $('.easy-tree').bind('ready.jstree', function (e, data) {
        if (localStorage.getItem("tree_node")) {
            var node = JSON.parse(localStorage.getItem("tree_node"))[0].id;
            //console.log(node);
            $(".easy-tree").jstree('select_node', node, function (e, d) {
                if (e.parents.length) {
                    $(".easy-tree").jstree('open_node', e.parent);
                };
            });
        }
    })
    $('.easy-tree').on('select_node.jstree', function (e, data) {
        var countSelected = data.selected.length;
        if (countSelected > 1) {
            data.instance.deselect_node([data.selected[0]]);
        }
    })
    $('button').on('click', function () {
        $('.easy-tree').jstree(true).select_node('child_node_1');
        $('.easy-tree').jstree('select_node', 'child_node_1');
        $.jstree.reference('.easy-tree').select_node('child_node_1');
    });
    $('#search_meter').keypress(function (e) {
        if (e.which == 13) {
            $(".easy-tree").jstree(true).search($("#search_meter").val());
        }
    });
    $("#stree span").click(function () {
        $(".easy-tree").jstree(true).search($("#search_meter").val());
    })
    $('.easy-tree').on("changed.jstree", function (e, data) {
        var tag = localStorage.getItem("breadcumb");
        var per = localStorage.getItem("per");
        var data_row = [];
        if (data.selected.length > 1) {
            for (var i = 0; i < data.selected.length; i++) {
                data_row.push({ "id": data.instance.get_node(data.selected[i]).id, "tendiemdo": data.instance.get_node(data.selected[i]).text, "socongto": data.instance.get_node(data.selected[i]).data.socongto, "code": data.instance.get_node(data.selected[i]).data.code, "meterid": data.instance.get_node(data.selected[i]).data.meterid, "type": data.instance.get_node(data.selected[i]).data.type });
            }
        } else {
            //console.log(data.instance.get_node(data.selected[0]).data.socongto);
            data_row = ([{ "id": data.instance.get_node(data.selected[0]).id, "tendiemdo": data.instance.get_node(data.selected[0]).text, "socongto": data.instance.get_node(data.selected[0]).data.socongto, "code": data.instance.get_node(data.selected[0]).data.code, "meterid": data.instance.get_node(data.selected[0]).data.meterid, "type": data.instance.get_node(data.selected[0]).data.type }]);
        }
        localStorage.setItem("tree_node", JSON.stringify(data_row));
        //menuClick(tag, per);

    });

}

function GetTreeAll(code, type) {
    try {
        console.log("Vào");
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TREE.GetTreeAll", callback: "result_GetTreeAll" };
        var para = {
            V_USERID: 1,
            V_CODE: code,
            V_KIEUHIENTHI: type,
            V_PAGENUM: 0,
            V_NUMRECS: 1000,
            V_LOAITHUMUC: 0
        }

        // console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_GetTreeAll(config, para, lst) {
    console.log(lst);
    var data = lst.data;
    setTreeDL(data, 1);
}
