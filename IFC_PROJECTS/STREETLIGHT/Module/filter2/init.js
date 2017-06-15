$(document).ready(function () {
    try {
        f_loadNhom();
        $("#cb_Nhom").change(function () {
            var mdv = $("#cb_Nhom option:selected").val();

            $('.easy-tree').jstree("destroy");
            GetTreeAll(mdv);
        })
    } catch (e) {
        console.log(e);
    }
});
function f_loadNhom() {
    try {
        var filter = localStorage.getItem("infofilter");
        var filterJson = null;
        if (filter != null || filter != undefined)
            filterJson = JSON.parse(filter);
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_HOME.LST_CODE",
            callback: "f_result_loadNhom"
        }
        var para = {
            v_code: "0101"
        }

        var ls = ExecuteServiceSyns(config, para);
    } catch (e) { console.log(e); }

}
function f_result_loadNhom(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        //setTreeDL(data);
        var opt = "";
        $.each(data, function (key, val) {
            opt += '<option value="' + val.value + '">' + val.name + '</option>';
        })
        $("#cb_Nhom").empty();
        $("#cb_Nhom").append(opt);
        $("#cb_Nhom").change();
    } catch (e) { console.log(e); }
}
function setTreeDL(data) {
    //console.log(data);
    var jsdata = [];
    if (data.length == 0) {
        jsdata.splice(0, jsdata.length);
        initTree(jsdata);
    } else {
        $.each(data, function (key, val) {
            var m_ = val.madonvi;
            //console.log(m_.length);
            var m = m_.substring(0, m_.length - 2);
            //console.log(m);
            var i = val.imei;
            //var m = id;
            //var t = val.loaithumuc;
            if (i == null) { i = "0"; }
            if (m.length <= 2) { m = "#"; }
            if (i == "0") {
                jsdata.push({ "id": val.madonvi, "parent": m, "icon": "fa fa-home", "text": val.tendonvi, "data": { code: val.madonvi, imei: i } });
            } else {
                jsdata.push({ "id": val.madonvi, "parent": m, "icon": "fa fa-circle", "text": val.tenkhachhang, "data": { code: val.madonvi, imei: i } });
            }

        }) 
        //console.log(JSON.stringify(jsdata));
        initTree(jsdata);
    }

}
function GetTreeAll(code) {
    try {

        var config = { connstr: "ConnectOracleStreetLight", namesql: "PKG_HOME.LST_ALL", callback: "result_GetTreeAll" };
        var para = {
            v_code: code
        }

        ////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_GetTreeAll(config, para, lst) {
    var data = lst.data;
    setTreeDL(data);
}
function initTree(v) {
    //console.log(v);
    var treeData = v;
    
    $('.easy-tree').jstree({
        "core": {
            "multiple": false,//false
            "animation": 0,
            "check_callback": true,
            'data': treeData
        },
        "plugins": [
            //"search",
            //"checkbox",
            //"contextmenu"
        ]
    });
    $('.easy-tree').on("changed.jstree", function (e, data) {
        //var tag = localStorage.getItem("breadcumb");
        //var per = localStorage.getItem("per");
        //var data_row = [];
        //if (data.selected.length > 1) {
        //    for (var i = 0; i < data.selected.length; i++) {
        //        data_row.push({ "id": data.instance.get_node(data.selected[i]).id, "tendiemdo": data.instance.get_node(data.selected[i]).text, "socongto": data.instance.get_node(data.selected[i]).data.socongto, "code": data.instance.get_node(data.selected[i]).data.code, "meterid": data.instance.get_node(data.selected[i]).data.meterid, "type": data.instance.get_node(data.selected[i]).data.type });
        //    }
        //} else {
        //    data_row = ([{ "id": data.instance.get_node(data.selected[0]).id, "tendiemdo": data.instance.get_node(data.selected[0]).text, "socongto": data.instance.get_node(data.selected[0]).data.socongto, "code": data.instance.get_node(data.selected[0]).data.code, "meterid": data.instance.get_node(data.selected[0]).data.meterid, "type": data.instance.get_node(data.selected[0]).data.type }]);
        //}
        //localStorage.setItem("tree_node", JSON.stringify(data_row));
    });

}
function customMenu(node) {
    // The default set of all items
    var per = localStorage.getItem("per");
    var items = {
        renameItem: { // The "rename" menu item
            label: "Thông số vận hành",
            action: function () {
                menuClick('tsvh_tab', per);
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Thông tin điểm đo",
            action: function () {
                menuClick('thongtindiemdo_tab', per);
            }
        }
    };

    if ($(node).hasClass("folder")) {
        // Delete the "delete" menu item
        delete items.deleteItem;
    }

    return items;
}
