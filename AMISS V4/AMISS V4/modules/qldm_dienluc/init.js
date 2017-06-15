
var delayedFn, blurredFrom; // phục vụ ctrl + A


$(document).ready(function () {
    showhideTree();
    initformelement();
    selectlang();
    loadProvincetoCombo_qldmdl("01");

    var width = $(window).width();  // tính toán fix với mọi màn hình
    var height = $(window).height();
    $('#left_pannel').css({ 'height': height - 160 });
    $('#tree_left_qldmdl').css({ 'height': height - 300 });
    $('#div_tbl_items').css({ 'height': height - 248 });

    //Save add
    $("#btnsave_qldm").on("click", function () {
        var check = validate_qldm();
        if (check != "") {
            showToast(check, 'error');
            return;
        }
        AddOREdit("ADD");
    });
    $("#btnsave_qldm_edit").on("click", function () {
        var check = validate_qldm();
        if (check != "") {
            showToast(check, 'error');
            return;
        }
        AddOREdit("EDIT");
    });
    $("#btnsaveedit_qldm").on("click", function () {
        SaveUpdate_QLDM();
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 65 && e.ctrlKey) {
            alert('ctrl A');
        }
    });


    $('#tbl_list_items').on('blur', 'tr', function (event) {
        blurredFrom = event.delegateTarget;
        delayedFn = setTimeout(function () {
            console.log('Blurred');
        }, 0);
    });
    $('#tbl_list_items').on('focus', 'tr', function (event) {
        if (blurredFrom === event.delegateTarget) {
            clearTimeout(delayedFn);
        }
    });

});
function loadProvincetoCombo_qldmdl(code) {
    try {
        var v_UserCode = JSON.parse(localStorage.getItem("userinfo")).code;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TREE.GetProvinceForCombo", callback: "result_loadProvince_qldmdl" };
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
        $('#tree_left_qldmdl').jstree("destroy");
        $("#help_tree_qldm").hide();
        GetTreeAll_qldmdl($(this).val());
    }

}
function GetTreeAll_qldmdl(code) {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TREE.GET_ALL_FOLDER", callback: "result_GetTreeAll_qldmdl" };
        var para = {
            V_CODE: code,
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
            jsdataqldm.push({ "id": val.code, "parent": val.parentcode, "text": val.name, "data": { loaithumuc: val.loaithumuc } });
        });
        console.log(jsdataqldm);
        initTree_qldm(jsdataqldm);
    }

}
function initTree_qldm(v) {
    //console.log(v);
    var treeDataqldm = v;
    $('#tree_left_qldmdl').jstree({
        "core": {
            "multiple": false,//false
            "animation": 0,
            "check_callback": true,
            'data': treeDataqldm
        },
        "search": {
            "case_insensitive": true,
            "show_only_matches": true
            //"show_only_matches": true,
            //"search_callback": function (str, node) {
            //    console.log(node);
            //    alert('2');
            //    if (node.data.socongto.indexOf(str) != -1) {
            //        //console.log(node);
            //        $('#tree_left_qldmdl').jstree('open_node', node.id);
            //        $("#tree_left_qldmdl").jstree('get_selected', true);
            //        $("#tree_left_qldmdl").jstree('select_node', node.id, function (e, d) {
            //            if (e.parents.length) {
            //                $("#tree_left_qldmdl").jstree('open_node', e.parent);
            //            };
            //        });
            //    }
            //    if (node.text.indexOf(str) != -1) {
            //        $('#tree_left_qldmdl').jstree('open_node', node.id);
            //        $("#tree_left_qldmdl").jstree('get_selected', true);
            //        $("#tree_left_qldmdl").jstree('select_node', node.id, function (e, d) {
            //            if (e.parents.length) {
            //                $("#tree_left_qldmdl").jstree('open_node', e.parent);
            //            };
            //        });
            //    }
            //}
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
    $('#tree_left_qldmdl').bind('ready.jstree', function (e, data) {
        if (localStorage.getItem("tree_node_qldm")) {
            var node = JSON.parse(localStorage.getItem("tree_node_qldm"))[0].id;
            $("#tree_left_qldmdl").jstree('select_node', node, function (e, d) {
                if (e.parents.length) {
                    $("#tree_left_qldmdl").jstree('open_node', e.parent);
                };
            });
        }
    })
    $('#tree_left_qldmdl').on('select_node.jstree', function (e, data) {
        console.log(data)
        $('#btnsave_qldm').hide();
        $('#btnsave_qldm_edit').show();
        var countSelected = data.selected.length;
        if (countSelected > 1) {
            data.instance.deselect_node([data.selected[0]]);
        }

        var tag = localStorage.getItem("breadcumb");
        var per = localStorage.getItem("per");
        var data_row = [];
        for (var i = 0; i < data.selected.length; i++) {
            data_row.push({ "id": data.instance.get_node(data.selected[i]).id, "tendiemdo": data.instance.get_node(data.selected[i]).text, "loaithumuc": data.instance.get_node(data.selected[0]).data.loaithumuc });
        }
        localStorage.setItem("tree_node_qldm", JSON.stringify(data_row));

        LoadDonVi();
    });


    $("#search_meter_qldmdl").keyup(function () {
        var searchString = $(this).val();
        console.log(searchString);
        $('#tree_left_qldmdl').jstree('search', searchString);
    });

}

function customMenu_qldm(node) {
    // The default set of all items
    var items = {
        addItem: { // The "rename" menu item
            label: "Thêm thư mục",
            action: function () {
                $("#tbl_list_items tbody").html("");
                clearform();
                $('#btnsave_qldm').show();
                $('#btnsave_qldm_edit').hide();
            }
        },
        //renameItem: { // The "rename" menu item
        //    label: "Sửa thư mục",
        //    action: function () {
        //        $("#btnsaveedit_qldm").attr("style", "display:block");
        //        $("#btnsaveadd_qldm").attr("style", "display:none");
        //        $(".panel-qldm").attr("style", "display:block");
        //        LoadDonVi();
        //        console.log(node);
        //        getDataEdit();
        //    }
        //},
        deleteItem: { // The "delete" menu item
            label: "Xóa",
            action: function () {
                //$(".panel-qldm").attr("style", "display:none");
                f_confimYesNo("Bạn chắc chắn muốn xóa?", "Hủy", "Đồng ý", function () {
                    f_xoa_dm(node.id);
                });
            }
        }
    };
    return items;
}
//-------------------------------------- Delete -------------------------------
function f_xoa_dm(v_code) {

    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_QUANLY_DANHMUC.DELETE_FOLDER", callback: "f_result_delete_folder" };
    var para = {
        v_Code: v_code,
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}
function f_result_delete_folder(config, para, lst) {
    if (lst.data[0].result > 0) {
        showToast('Xóa thư mục thành công', 'success');
        $("#tree_left_qldmdl").jstree("destroy");
        var code = $("#chondonvi_qldmdl option:selected").val();
        GetTreeAll_qldmdl(code);

    }
    else {
        showToast('Thư mục này vẫn còn điểm đo <br> vui lòng chuyển điểm đo ra thư mục khác trước khi xóa', 'error');
    }
}

//-------------------------------------------
function LoadDonVi() {
    objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
    var tendiemdo = objFilter[0].tendiemdo;
    var loaithumuc = objFilter[0].loaithumuc;
    var code = objFilter[0].id;
    $("#txt_tenthumuc").val(tendiemdo);
    $("#cbo_loaithumuc").val(loaithumuc);

    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_QUANLY_DANHMUC.GET_ALL_BY_CODE", callback: "f_result_GET_ALL_BY_CODE" };
    var para = {
        v_Code: code,
    };
    console.log(para);
    ExecuteServiceSyns(config, para);

}

function f_result_GET_ALL_BY_CODE(config, para, lst) {

    console.log(lst.data)
    $('#tbl_list_items tbody').html('');
    var data = lst.data;
    var sothumuccon = 0;
    var sodiemdocon = 0;
    $.each(data, function (key, val) {
        val.type == 'item' ? sodiemdocon++ : sothumuccon++;
        $('#tbl_list_items tbody').append(
            '<tr id="tr_' + val.id + '" tr_type="' + val.type + '"  >' +
            '<td><i class="' + val.type + '"></i><span >' + (
                    val.type == 'item' ? (val.name + " - " + val.makh + " - " + val.socongto) : val.name
                    ) + '<span></td>' +
            '</tr>'
            )
    });

    $('#sothumuccon').html(sothumuccon + ' Thư mục');
    $('#sodiemdocon').html(sodiemdocon + ' Điểm đo');

    $('#div_tbl_items').scrollTop(0);

    $('#tbl_list_items tbody tr').unbind('dblclick').dblclick(function () {
        var id = $(this).attr('id').split('_')[1];
        $('#tree_left_qldmdl').jstree('select_node', id);
        var container = $('#tree_left_qldmdl'), scrollTo = $('#' + id);

        container.scrollTop(
            scrollTo.offset().top - container.offset().top + container.scrollTop()
        );

    });

    $('#tbl_list_items tbody tr').unbind('click').click(function () {
        var new_class = 'tr_selected';
        if ($(this).hasClass("tr_selected")) {
            new_class = '';
        }
        RowClick(this, false, new_class);
    });

    $('#tbl_list_items tbody tr').unbind('contextmenu').bind("contextmenu", function (event) {

        // Avoid the real one
        event.preventDefault();
        event.stopPropagation();
        var new_class = 'tr_selected';
        if ($(this).hasClass("tr_selected")) {
            new_class = '';
        }
        RowClick(this, false, new_class);
        // Show contextmenu
        if (idArray.length == 0) {
            $('#li_paste_item').addClass("deactive");
        }
        else {
            $('#li_paste_item').removeClass("deactive");
        }
        $("#rightclick_menu").finish().toggle(100).

        // In the right position (the mouse)
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });

    $('#div_tbl_items').unbind('contextmenu').bind("contextmenu", function (event) {
        $('#li_paste_item').css('display', 'block');
        // Avoid the real one
        event.preventDefault();
        event.stopPropagation();
        // Show contextmenu
        $("#rightclick_menu").finish().toggle(100).
        // In the right position (the mouse)
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
        if (idArray.length == 0) {
            $('#li_paste_item').addClass("deactive")
        }
        else {
            $('#li_paste_item').removeClass("deactive");
        }
    });

    $(document).unbind('mousedown').bind("mousedown", function (e) {

        // If the clicked element is not the menu
        if (!$(e.target).parents("#rightclick_menu").length > 0) {
            // Hide it
            $("#rightclick_menu").hide(100);
        }
    });

    $("#rightclick_menu li").unbind('click').click(function () {
        if ($(this).hasClass("deactive"))
            return;
        // This is the triggered action name
        switch ($(this).attr("data-action")) {
            // A case for each action. Your actions here
            case "move_item": f_save_item_move(); break;
            case "paste_item": f_paste_bulk_item_move(); break;
        }

        // Hide it AFTER the action was triggered
        $("#rightclick_menu").hide(100);
    });

}

//----------------------------------- move -----------------------
var idArray = [];
function f_save_item_move() {
    idArray = [];
    $('tr.tr_selected').each(function () {
        //if (this.id.split('_')[1].indexOf('0') == 0) {
        //    showToast('Vui lòng không chọn thư mục để di chuyển', 'error');
        //    idArray = [];
        //    return false;
        //}
        //else {
            idArray.push(this.id.split('_')[1]);
        //}
    });

    for (var i = 0; i < idArray.length; i++) {
        $('#tr_' + idArray[i]).css('opacity', '0.6');
    }

    console.log(idArray);
}

function f_paste_bulk_item_move() {
    if (idArray.length == 0) {
        showToast('Không có thư mục hoặc điểm đo nào được chọn', 'error');
        return;
    }

    else {
        var lst_move_items = [];
        for (var i = 0; i < idArray.length; i++) {
            var item = {
                id: idArray[i]
            };
            lst_move_items.push(item);
        }
        var config = {
            connstr: "ConnectOracle_Amiss4",
            insertto: "TEMP_QLY_DMUC",
        }
        var table = {
            table: JSON.stringify(lst_move_items)
        };
        var lst = ExecuteBulkCopyOracle(config, table);
        console.log(lst);
        if (lst != null) {
            f_paste_item_move();
        }
    }
}

function f_paste_item_move() {
    var objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
    var v_Code = objFilter[0].id;
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_QUANLY_DANHMUC.MOVE_ITEM", callback: "f_result_MOVE" };
    var para = {
        v_Code: v_Code
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}

function f_result_MOVE(config, para, lst) {
    console.log(lst.data[0].result);
    if (lst.data[0].result > 0) {
        showToast('Di chuyển thành công', 'sussces');
        $("#tree_left_qldmdl").jstree("destroy");
        var code = $("#chondonvi_qldmdl option:selected").val();
        GetTreeAll_qldmdl(code);
        //LoadDonVi();
        idArray = [];
    }
    else {
        showToast('Sửa thư mục không thành công', 'error');
    }
}

//---------------------------------- edit -----------------------
function getDataEdit() {
    try {
        objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
        $("#txt_tenthumuc").val(objFilter[0].tendiemdo);
        $("#txt_ghichu").val(objFilter[0].description);
        $("#cbo_loaithumuc").val(objFilter[0].type);
    } catch (e) {
        console.log(e);
    }
}
function AddOREdit(action) {
    try {
        // console.log(localStorage.getItem("tree_node_qldm"));
        var p = getAllIdMod();
        var objFilter = JSON.parse(localStorage.getItem("tree_node_qldm"));
        var sto = "PKG_QUANLY_DANHMUC.ADD_FOLDER";
        var callback = "f_result_ADD_FOLDER";
        if (action == "EDIT") {
            sto = "PKG_QUANLY_DANHMUC.EDIT_FOLDER";
            callback = "f_result_EDIT_FOLDER";
        }
        var v_Code = objFilter[0].id;
        var v_Name = p.txt_tenthumuc;
        var v_Note = p.txt_ghichu;
        var v_loaithumuc = p.cbo_loaithumuc;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: sto, callback: callback };
        var para = {
            v_Code: v_Code,
            v_Name: v_Name,
            v_Note: v_Note,
            v_loaithumuc: v_loaithumuc
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_EDIT_FOLDER(config, para, lst) {
    console.log(lst.data[0].result);
    if (lst.data[0].result > 0) {
        clearform();
        $("#tree_left_qldmdl").jstree("destroy");
        showToast('Sửa thư mục thành công', 'success');
        var code = $("#chondonvi_qldmdl option:selected").val();
        GetTreeAll_qldmdl(code);
    }
    else {
        showToast('Sửa thư mục không thành công', 'error');
    }
}

//--------------------------------- add -------------------------
function f_new_folder() {
    $('#div_tbl_items').scrollTop(0);
    $('#tbl_list_items tbody').prepend(
            '<tr>' +
            '<td><input type="text" class="form-control " placeholder="Tên thư mục" id="txt_tenthumuc" style="width:30%; display:inline-block;margin-right:10px">' +
            '<select class="form-control" id="cbo_loaithumuc" style="width:20%; display:inline-block;margin-right:10px">' +
                            '<option value="0">Tất cả</option>         ' +
                            '<option value="5">Trạm</option>           ' +
                            '<option value="4">Sổ ghi</option>         ' +
                            '<option value="6">Cột</option>            ' +
                            '<option value="8">Đã lắp DCu</option>     ' +
                            '<option value="9">Chưa lắp DCu</option>   ' +
                        '</select>' +
            '<input type="text" class="form-control " placeholder="Ghi chú" id="txt_tenthumuc" style="width:30%; display:inline-block;margin-right:10px">'+
            '<button id="btnAdd_qldm" class="btn btn-success" style="width:10%;">Thêm</button></td>' +
            '</tr>'
            )
}
function f_result_ADD_FOLDER(config, para, lst) {
    console.log(lst.data[0].result);
    if (lst.data[0].result > 0) {
        clearform();
        $("#tree_left_qldmdl").jstree("destroy");
        showToast('Thêm mới thư mục thành công', 'success');
        var code = $("#chondonvi_qldmdl option:selected").val();
        GetTreeAll_qldmdl(code);
    }
    else {
        showToast('Thêm mới thư mục không thành công', 'error');
    }
}
function clearform() {
    $("#txt_tenthumuc").val("");
    $("#cbo_loaithumuc").val(0);
    $("#txt_ghichu").val("");
    $("#sothumuccon").html("0 Thư mục");
    $("#sodiemdocon").html("0 Điểm đo");
    $("#dangchon").html("");
    //$(".panel-qldm").attr("style", "display:none");
}
function validate_qldm() {
    try {
        var p = getAllIdMod();
        if (p.txt_tenthumuc == "") return "Vui lòng nhập tên thư mục";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

/////--------------------------- chọn dòng trong table ----------------------------
var lastSelectedRow; // phục vụ chọn tr
var trs = document.getElementById('tbl_list_items').tBodies[0].getElementsByTagName('tr');
var selected_count = 0;
//document.onselectstart = function () {
//    return false;
//}
function RowClick(currenttr, lock, new_class) {
    //alert(new_class);
    if (window.event.ctrlKey) {
        toggleRow(currenttr, new_class);
    }

    if (window.event.button === 0 || (window.event.button === 2 && new_class != '')) {
        if (!window.event.ctrlKey && !window.event.shiftKey) {
            clearAll();
            toggleRow(currenttr, new_class);
        }

        if (window.event.shiftKey) {
            selectRowsBetweenIndexes([lastSelectedRow.rowIndex, currenttr.rowIndex])
        }
    }
}

function toggleRow(row, new_class) {
    row.className = new_class;
    lastSelectedRow = row;
    $('#dangchon').html($("tr.tr_selected[tr_type='item']").length + ' Điểm đo và ' + $("tr.tr_selected[tr_type='folder']").length + ' Thư mục được chọn');
}

function selectRowsBetweenIndexes(indexes) {
    indexes.sort(function (a, b) {
        return a - b;
    });

    for (var i = indexes[0]; i <= indexes[1]; i++) {
        trs[i].className = 'tr_selected';
    }
    $('#dangchon').html($("tr.tr_selected[tr_type='item']").length + ' Điểm đo và ' + $("tr.tr_selected[tr_type='folder']").length + ' Thư mục được chọn');
    document.getSelection().removeAllRanges();
}

function clearAll() {
    for (var i = 0; i < trs.length; i++) {
        trs[i].className = '';
    }
}

/////---------------------------------------------------------------------------------