$(document).ready(function () {
    showhideTree();
    initformelement();
    selectlang();
    loadProvincetoCombo_qldmdl("01");
    // chỉ cho mã điểm đo nhập số
    $("#txt_sodiemdo_qldm").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    //Save add
    $("#btnsaveadd_qldm").on("click", function () {
      
        var check = validate_qldm();
        if (check != "") {
            showToast(check, 'error');
            return;
        }
        SaveAdd_QLDM();
    });
    $("#btnsaveedit_qldm").on("click", function () {
        SaveUpdate_QLDM();
    });
});
function loadProvincetoCombo_qldmdl(code) {
    try {
        var v_UserCode = JSON.parse(localStorage.getItem("userinfo")).code;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetProvinceForCombo", callback: "result_loadProvince_qldmdl" };
        var para = {
            v_Code: code,
            v_UserCode: v_UserCode,
            v_isSub: 1
        };

        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadProvince_qldmdl(config, para, lst) {
   
    var data = lst.data;
    $("#chondonvi_qldmdl").empty();
    $('#chondonvi_qldmdl').append($('<option>', {
        value: '-1',
        text: '-- CHỌN ĐƠN VỊ  --'
    }));
    $.each(data, function (key, val) {
        $('#chondonvi_qldmdl').append($('<option>', {
            value: val.code,
            text: val.name
        }));
    })
    $("#chondonvi_qldmdl").change(selectChange_qldmdl);
}
function selectChange_qldmdl() {
    if ($("#chondonvi_qldmdl option:selected").val() != -1) {
        localStorage.setItem("DL", $(this).val());
        $("#tree_left_qldmdl").slideDown();
        $("#stree_qldm").slideDown();
        $('.easy-tree-qldm').jstree("destroy");
        $("#help_tree_qldm").hide();
        GetTreeAll_qldmdl($(this).val(), "sub");
    }
   
}
function GetTreeAll_qldmdl(code, type) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_DMDIENLUC.GetTreeAll", callback: "result_GetTreeAll_qldmdl" };
        var para = {
            V_USERID: 1,
            V_PERMISSION: 1,
            V_CODE: code,
            V_FROM: "",
            V_TO: "",
            V_TRANGTHAI: 0,
            V_CHUKICHOT: 0,
            V_SOGHI: "",
            V_CHUNGLOAI: "",
            V_LOAICONGTO: 0,
            V_KIEUHIENTHI: type,
            V_LOAIHIENTHI: 1,
            V_PAGENUM: 0,
            V_NUMRECS: 1000,
            V_LOAITHUMUC: 0,
            V_DCU: "",
        }
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_GetTreeAll_qldmdl(config, para, lst) {
   console.log(lst);
    var data = lst.data;
    setTreeDL_qldm(data);
}

function setTreeDL_qldm(data) {
    ////console.log(data);
    var jsdataqldm = [];
    if (data.length == 0) {
        jsdataqldm.splice(0, jsdataqldm.length);
        initTree_qldm(jsdataqldm);
    } else {
        $.each(data, function (key, val) {
            var p = val.parentid;
            var s = val.socongto;
            var sdd = val.countmeter != null ? val.countmeter : 0;
            var des = val.description != null ? val.description : "";
            //var m = id;
            var t = val.loaithumuc;
            if (s == null) { s = "0"; }
            if (p.length <= 4) { p = "#"; }
            if (s == "0") {
                 
                jsdataqldm.push({ "id": val.id, "parent": p, "text": val.label, "icon": val.icon, "data": { code: val.parentid, socongto: s, type: t, meterid: val.id, sodiemdo: sdd, description: des } });
            } else {
                jsdataqldm.push({ "id": val.id, "parent": p, "text": val.label, "icon": val.icon, "data": { code: val.parentid, socongto: s, type: t, meterid: val.id, sodiemdo: sdd, description: des } });
            }

        });
        initTree_qldm(jsdataqldm);
    }

}
function initTree_qldm(v) {
    //console.log(v);
    var treeDataqldm = v;
    $('.easy-tree-qldm').jstree({
        "core": {
            "multiple": false,//false
            "animation": 0,
            "check_callback": true,
            'data': treeDataqldm
        },
        "search": {
            //"ajax": {
            //    "data": v
            //},
            "show_only_matches": true,
            "search_callback": function (str, node) {
                //console.log(node);

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
    // 8 interact with the tree - either way is OK
    //$('.easy-tree').jstree(true).redraw(true);    
    $('.easy-tree-qldm').bind('ready.jstree', function (e, data) {
        if (localStorage.getItem("tree_node_qldm")) {
            var node = JSON.parse(localStorage.getItem("tree_node_qldm"))[0].id;
            $(".easy-tree-qldm").jstree('select_node', node, function (e, d) {
                if (e.parents.length) {
                    $(".easy-tree-qldm").jstree('open_node', e.parent);
                };
            });
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
        var tag = localStorage.getItem("breadcumb");
        var per = localStorage.getItem("per");
        var data_row = [];
        if (data.selected.length > 1) {
            for (var i = 0; i < data.selected.length; i++) {
                data_row.push({ "id": data.instance.get_node(data.selected[i]).id, "tendiemdo": data.instance.get_node(data.selected[i]).text, "socongto": data.instance.get_node(data.selected[i]).data.socongto, "sodiemdo": data.instance.get_node(data.selected[i]).data.sodiemdo, "code": data.instance.get_node(data.selected[i]).data.code, "meterid": data.instance.get_node(data.selected[i]).data.meterid, "type": data.instance.get_node(data.selected[i]).data.type, "description": data.instance.get_node(data.selected[i]).data.description });
            }
        } else {
            data_row = ([{ "id": data.instance.get_node(data.selected[0]).id, "tendiemdo": data.instance.get_node(data.selected[0]).text, "socongto": data.instance.get_node(data.selected[0]).data.socongto, "sodiemdo": data.instance.get_node(data.selected[0]).data.sodiemdo, "meterid": data.instance.get_node(data.selected[0]).data.meterid, "code": data.instance.get_node(data.selected[0]).data.code, "meterid": data.instance.get_node(data.selected[0]).data.meterid, "type": data.instance.get_node(data.selected[0]).data.type, "description": data.instance.get_node(data.selected[0]).data.description }]);
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
                $(".panel-qldm").attr("style", "display:block");
                $("#btnsaveedit_qldm").attr("style", "display:none");
                $("#btnsaveadd_qldm").attr("style", "display:block");
                LoadDonVi();
            }
        },
        renameItem: { // The "rename" menu item
            label: "Sửa thư mục",
            action: function () {
                $("#btnsaveedit_qldm").attr("style", "display:block");
                $("#btnsaveadd_qldm").attr("style", "display:none");
                $(".panel-qldm").attr("style", "display:block");
                LoadDonVi();
                console.log(node);
                getDataEdit();
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Xóa",
            action: function () {
                $(".panel-qldm").attr("style", "display:none");
                f_confimYesNo("Bạn chắc chắn muốn xóa?", "Hủy", "Đồng ý", function () {
                    f_xoa_dm(node.id);
                });
            }
        }
    };
    return items;
}
function f_xoa_dm(meterId) {
    var p = getAllIdMod();
    var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
    var v_Action = 'CREATE';
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.Create_Update_Delete_Province", callback: "f_result_delete_Province_qldm" };
    var para = {
        v_Code: meterId,
        v_Name: '',
        v_Description: '',
        v_CountMeter: '',
        v_UserId: v_UserId,
        v_Action: '',
        v_ListMeterId: '',
        v_loaithumuc: ''
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}
function f_result_delete_Province_qldm(config, para,lst) {
    if (lst.data[0].kq0[0]['result'] > 0) {
        showToast('Xóa thư mục thành công', 'success');
        $("#tree_left_qldmdl").jstree("destroy");
        GetTreeAll_qldmdl($("#chondonvi_qldmdl option:selected").val(), "sub");
       
    }
    else {
        showToast('Thư mục này vẫn còn điểm đo <br> vui lòng chuyển điểm đo ra thư mục khác trước khi xóa', 'error');
    }
}
function LoadDonVi() {
    objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
    var istype = objFilter[0].type;
    var socongto = objFilter[0].socongto;
    var tendiemdo = objFilter[0].tendiemdo;
    if (istype != "0" && istype != "4" && socongto != "0")
        $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + " - <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
    else if (istype == "4")
        $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
    else if (socongto == "0" && istype != "4")
        $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
    else if (istype >= "6")
        $("#tendiemdo_span").html("Trạm: " + tendiemdo);
    if (parseInt(socongto) > 0) {
        $(".lbmadiemdo").hide();
    } else {
        $(".lbmadiemdo").show();
    }
   
}
function getDataEdit() {
    try{
        objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
        $("#txt_sodiemdo_qldm").val(objFilter[0].sodiemdo);
        $("#txt_tenthumuc_qldm").val(objFilter[0].tendiemdo);
        $("#txt_ghichu_qldm").val(objFilter[0].description);
        $("#CboLoaidanhmuc_qldm").val(objFilter[0].type);
    } catch (e) {
        console.log(e);
    }
}
function SaveAdd_QLDM() {
    try {
       // console.log(localStorage.getItem("tree_node_qldm"));
        var p = getAllIdMod();
        var objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
       // console.log(objFilter);
        var v_Code = objFilter[0].meterid;
        var v_Name = p.txt_tenthumuc_qldm;
        var v_Description = p.txt_ghichu_qldm;
        var v_CountMeter = p.txt_sodiemdo_qldm;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Action = 'CREATE';
        var v_ListMeterId = '';
        var v_loaithumuc = p.CboLoaidanhmuc_qldm;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.Create_Update_Delete_Province", callback: "f_result_Create_Province_qldm" };
        var para = {
            v_Code: v_Code,
            v_Name: v_Name,
            v_Description: v_Description,
            v_CountMeter: v_CountMeter,
            v_UserId: v_UserId,
            v_Action: v_Action,
            v_ListMeterId: v_ListMeterId,
            v_loaithumuc: v_loaithumuc
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_Create_Province_qldm(config, para,lst) {   
    if (lst.data[0].kq0[0]['result'] > 0) {
        clearfrom();
        $("#tree_left_qldmdl").jstree("destroy");
        GetTreeAll_qldmdl($("#chondonvi_qldmdl option:selected").val(), "sub");
        showToast('Thêm mới thư mục thành công', 'success');
     
    }
    else {
        showToast('Thêm mới thư mục không thành công', 'error');
    }
}
function SaveUpdate_QLDM() {
    try {
        // console.log(localStorage.getItem("tree_node_qldm"));
        var p = getAllIdMod();
        var objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
        // console.log(objFilter);
        var v_Code = objFilter[0].meterid;
        var v_Name = p.txt_tenthumuc_qldm;
        var v_Description = p.txt_ghichu_qldm;
        var v_CountMeter = p.txt_sodiemdo_qldm;
        var v_UserId = JSON.parse(localStorage.getItem("userinfo")).userid;
        var v_Action = 'UPDATE';
        var v_ListMeterId = '';
        var v_loaithumuc = p.CboLoaidanhmuc_qldm;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.Create_Update_Delete_Province", callback: "f_result_Update_Province_qldm" };
        var para = {
            v_Code: v_Code,
            v_Name: v_Name,
            v_Description: v_Description,
            v_CountMeter: v_CountMeter,
            v_UserId: v_UserId,
            v_Action: v_Action,
            v_ListMeterId: v_ListMeterId,
            v_loaithumuc: v_loaithumuc
        };
        console.log('para');
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Update_Province_qldm(config, para, lst) {
    console.log(lst);
    if (lst.data[0].kq0[0]['result'] > 0) {
        $("#tree_left_qldmdl").jstree("destroy");
        GetTreeAll_qldmdl($("#chondonvi_qldmdl option:selected").val(), "sub");
        showToast('Cập nhật  thành công', 'success');
        $(".panel-qldm").attr("style", "display:none");
    }
    else {
        showToast('Cập nhật không thành công', 'error');
    }
}
function clearfrom() {
    $("#txt_sodiemdo_qldm").val("");
    $("#txt_tenthumuc_qldm").val("");
    $("#txt_ghichu_qldm").val("");
    $("#CboLoaidanhmuc_qldm").val("0");
    $(".panel-qldm").attr("style", "display:none");
}
function validate_qldm() {
    try {
        var p = getAllIdMod();
        if (p.txt_tenthumuc_qldm == "") return "Vui lòng nhập tên thư mục";
        if (p.txt_sodiemdo_qldm == "") return "Vui lòng nhập số điểm đo";
        if (isNumber(p.txt_sodiemdo_qldm) == false) return "Số điểm đo chỉ được nhập số"
        return "";

    } catch (e) {
        console.log(e);
    }
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }