$(document).ready(function () {
    try {    
        f_getDataTree();
        f_loadInitTree1Pha();
        $("#btn_thuchien_tree").click(function () {
            f_getDataTree();
            setValToTxt("txt_search_tree", "");
        });

       
        $('#txt_search_tree').keydown(function (e) {
            if (e.keyCode == 13) {
                f_getDataTree();
                setValToTxt("txt_search_tree", "");
            }
        });
    }
    catch (e) { console.log(e); }
});


function f_loadInitTree1Pha() {
    try {
        var config = { namesql: "GetCongNghe", callback: "f_result_GetCbCongNgheTree", connstr: "Sql1Pha3Pha" };
        ExecuteServiceSyns(config, '[]', false);

        var config = { namesql: "GetNhaSanXuat", callback: "f_result_GetCbNsxTree", connstr: "Sql1Pha3Pha" };
        ExecuteServiceSyns(config, '[]', false);
    }
    catch (e) { console.log(e); }
}
function f_result_GetCbCongNgheTree(config, para, data) {
    dataToCob("cb_congnghe_tree", data.data, "code", "name", "-1", "--Tất cả--");
}

function f_result_GetCbNsxTree(config, para, data) {
    dataToCob("cb_nhasanxuat_tree", data.data, "code", "name", "-1", "--Tất cả--");
}

function f_getDataTree() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "Pha1_Tree_GetInfo", callback: "f_result_GetTree", connstr: "Sql1Pha3Pha" };
        var p = getAllIdMod();
        var para = {
            v_UserCode: userinfo.usercode,
            v_Code: userinfo.code,
            v_Type: "MAIN",
            V_SEARCH: p.txt_search_tree,
            V_FormDay: p.txt_dateform_tree,
            V_ToDay: p.txt_dateto_tree,
            V_Status: p.cb_trangthai_tree,
            V_CongNghe: p.cb_congnghe_tree,
            V_NSX: p.cb_nhasanxuat_tree,
            v_Page: "0",
            v_Pagecount: "20"
        };
        //////console.log(para);
        ExecuteServiceSyns(config, para, false);
    }
    catch (e) { console.log(e); }
}

function f_getDataSubTree(infoTree) {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "Pha1_Tree_GetInfo", callback: "f_result_GetSubTree", connstr: "Sql1Pha3Pha" };

        var para = {
            v_UserCode: userinfo.usercode,
            v_Code: infoTree.id,
            v_Type: "SUBMAIN",
            v_Page: "0",
            v_Pagecount: "20"
        };
        //////console.log(para);
        ExecuteServiceSyns(config, para, false);
    }
    catch (e) { console.log(e); }
}

function f_result_GetTree(config, para, data) {
    try {
        if (data.data == null || data.data == undefined || data.data == "[]") {
            return;
        }
        f_drowTree(data.data);
    }
    catch (e) { console.log(e); }
}

function f_result_GetSubTree(config, para, data) {
    try {
        if (data.data == null || data.data == undefined || data.data == "[]") {
            return;
        }
        addNode(data.data);
    }
    catch (e) { console.log(e); }
}

function f_drowTree(data) {
    try {
        $('#tree01').tree({
            data: data,
            formatter: function (node) {

                return node.text;
            },
            animate: true,
            onClick: function (node) {
                try {
                    localStorage.setItem("infotree", JSON.stringify(node));
                } catch (e) { console.log(e); }
                try {
                    f_loadInitFromTree();
                } catch (e) { }
                try {
                    
                    if (countClilden() == 0) {
                        f_getDataSubTree(node);
                        expand();
                    } else {
                        $(this).tree('toggle', node.target);
                    }
                    $("#tool-allpage").show();
                } catch (e) { }
                
            },
            onLoadSuccess: function (node, data) {
                expand();
              
            }
        });
    }
    catch (e) { console.log(e); }
}


// appent them
function addNode(data) {
    try {
        var node = $('#tree01').tree('getSelected');
        if (node) {
            $('#tree01').tree('append', {
                parent: node.target,
                data: data
            });
        }
    }
    catch (e) { console.log(e); }
}

function getSelected() {
    var node = $('#tree01').tree('getSelected');
}
function collapse() {
    try {
        var node = $('#tree01').tree('getSelected');
        if (node != null)
            $('#tree01').tree('collapse', node.target);
    }
    catch (e) { console.log(e); }
}
function expand() {
    try {
        var node = $('#tree01').tree('getSelected');
        if (node != null)
            $('#tree01').tree('expand', node.target);
    }
    catch (e) { console.log(e); }
}
function collapseAll() {
    try {
        var node = $('#tree01').tree('getSelected');
        if (node) {
            $('#tree01').tree('collapseAll', node.target);
        } else {
            $('#tree01').tree('collapseAll');
        }
    }
    catch (e) { console.log(e); }
}

function countClilden() {
    try {
        var count = 0;
        var node = $('#tree01').tree('getSelected');
        if (node != null) {
            {
                var children = $('#tree01').tree('getChildren', node.target);
                count = children.length;
            }
        }
        return count;
    }
    catch (e) { console.log(e); return 0; }
}

