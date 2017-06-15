$(document).ready(function () {
    var width = $(window).width();
    var height = $(window).height();
    selectlang();
    //$(".content-tree ").css("height", height);
    //$(".easy-tree ").css("max-height", height - 230);
    //$(".qlm_right").css("max-height", height - 170);
    loadProvincetoCombo("01");
    if (sessionStorage.getItem("tree")) {
        $("#tree_left").html(sessionStorage.getItem("tree"));
    }
    var tree = localStorage.getItem("tree");
    if (tree == "show") {
        $(".content").removeClass("hidetree");
        $(".content").addClass("showtree");
        $(".content-tree").addClass("hidetree");
        $(".content-tree").removeClass("showtree");
        $(".colslape_tree").addClass("showtree");
        $(".colslape_tree").removeClass("hidetree");
        $(".filter_main").show();
    }
    else {
        $(".content").removeClass("showtree");
        $(".content").addClass("hidetree");
        $(".content-tree").addClass("showtree");
        $(".content-tree").removeClass("hidetree");
        $(".colslape_tree").addClass("hidetree");
        $(".colslape_tree").removeClass("showtree");
        $(".filter_main").hide();
    }
    $(".colslape_tree").click(function () {
        if ($(".content").hasClass("showtree")) {
            $(".content").removeClass("showtree");
            $(".content").addClass("hidetree");
            $(".content-tree").addClass("showtree");
            $(".content-tree").removeClass("hidetree");
            $(".colslape_tree").addClass("hidetree");
            $(".colslape_tree").removeClass("showtree");
            $(".filter_main").hide();

            localStorage.setItem("tree", "hide");
        }
        else {
            $(".content").removeClass("hidetree");
            $(".content").addClass("showtree");
            $(".content-tree").addClass("hidetree");
            $(".content-tree").removeClass("showtree");
            $(".colslape_tree").addClass("showtree");
            $(".colslape_tree").removeClass("hidetree");
            $(".filter_main").show();

            localStorage.setItem("tree", "show");
        }


    })


    $("#ad-search").click(function () {
        if ($(this).hasClass("hide-ad")) {
            $(this).removeClass("hide-ad");
            $(".ad-content").slideDown();
        } else {
            $(this).addClass("hide-ad");
            $(".ad-content").slideUp();
        }
    })
    $("#chondonvi").change(function () {
        if ($("#chondonvi option:selected").val() == -1) {
            $("#tree_left").slideUp();
            $("#ad-search").slideUp();
            $("#stree").slideUp();
            $("#help_tree").slideDown();
            $("#chontram").attr("disabled", "disabled");
            $("#chontram").val("-1").change();
            localStorage.setItem("DL", "");
        } else {
            loadTramToCombo($("#chondonvi option:selected").val());
            $("#chontram").removeAttr("disabled");
            $('.easy-tree').jstree("destroy");
        }
    });
    $("#chontram").change(selectChange);
});
function getTreeForUser(usercode) {
    try {
        var usercode = usercode;
        var config = { namesql: "AMISS_CAYDULIEU.GetTreeAll", callback: "f_result_getTreeForUser", connstr: "ConnectOracle233" };
        var para = {
            v_Code: usercode,//IN VARCHAR2 DEFAULT '0101',
            v_TrangThai: '', //IN :1 DEFAULT 0 ,
            v_SoGhi: '', //IN VARCHAR2 DEFAULT '' , -- SoGhi -- lay tai bang Meter_Info
            v_LoaiCongTo: '', //IN :1 DEFAULT 0 ,--TypePha -- lay trong TreoThao
            v_KieuHienThi: 'root', //IN VARCHAR2 DEFAULT 'root' , -- root or childs
            v_LoaiHienThi: '', //IN :1 DEFAULT 1,-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
            v_pagenum: 0,   //IN :1 DEFAULT 0,
            v_numrecs: 1000   //IN :1 DEFAULT 1000,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_getTreeForUser(config, para, lst) {
    try {
        var tree_item = lst.data;
        var li_m = '<input type="search" id="search_tree" placeholder="Tìm kiếm" class="form-control"><ul>';
        var li_s = '';

        for (var i = 0; i < tree_item.length; i++) {
            console.log(tree_item[i].code.length);
            if (tree_item[i].code.length == 4) {
                li_m += '<li id="li' + tree_item[i].code + '">' + tree_item[i].name + '<ul></ul></li>';
            }
            else if (tree_item[i].code.length == 6) {
                console.log("#li" + tree_item[i].code + " ul");
                li_s += '<li id="li' + tree_item[i].code + '">' + tree_item[i].name + '<ul id="ul' + tree_item[i].code + '"></ul></li>';
                console.log(li_s);
                $("li#li" + tree_item[i].code + " ul").append(li_s);
            }

        }
        console.log(li_m);
        $("#tree_left.easy-tree").empty();
        $("#tree_left.easy-tree").append(li_m);
        $('#search_tree').keyup(function () {
            var searchText = $(this).val();
            $('#tree_left ul > li').each(function () {
                var currentLiText = $(this).text(),
                    showCurrentLi = currentLiText.indexOf(searchText) !== -1;
                $(this).toggle(showCurrentLi);
            });

        });
    } catch (e) {
        console.log(e);
    }
}
function loadTreeDL() {

    //var tree_ul = '<input type="search" id="search_tree" placeholder="Tìm kiếm" class="form-control">' +
    var tree_ul = '<ul>' +
            '<li>CÔNG TY ĐIỆN LỰC SƠN LA' +
                '<ul>' +
                    '<li data-value="ĐL THÀNH PHỐ SƠN LA">ĐL THÀNH PHỐ SƠN LA' +
                        '<ul>' +
                            '<li data-value="ĐÈN ĐƯỜNG T4">ĐÈN ĐƯỜNG T4' +
                                '<ul>' +
                                    '<li data-value="TXCQTDDT438">TXCQTDDT438' +
                                        '<ul>' +
                                            '<li class="text-green" data-value="201607023854">Nguyễn Thị Vĩnh Hà</li>' +
                                            '<li class="text-red" data-value="201607001225">Đậu Thị Bắc</li>' +
                                            '<li class="text-gray" data-value="201607027110">Nguyễn Quang Trung</li>' +
                                            '<li class="text-yellow" data-value="201607006339">Nguyễn Thị Nguyệt</li>' +
                                        '</ul>' +
                                    '</li>' +
                                '</ul>' +
                            '</li>' +
                        '</ul>' +
                    '</li>' +
                '</ul>' +
            '</li>' +
        '</ul>';

    $("#tree_left.easy-tree").empty();
    $("#tree_left.easy-tree").append(tree_ul);
    $('#search_tree').keyup(function () {
        var searchText = $(this).val();
        $('#tree_left ul > li').each(function () {
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;
            $(this).toggle(showCurrentLi);
        });

    });


}
function setTreeDL(data) {
    //////console.log(data);
    var jsdata = [];
    if (data.length == 0) {
        jsdata.splice(0, jsdata.length);
        initTree(jsdata);
    } else {
        $.each(data, function (key, val) {
            var p = val.parentid;
            var s = val.socongto;
            //var m = id;
            var t = val.loaithumuc;
            if (s == null) { s = "0"; }
            if (p.length <= 4) { p = "#"; }
            jsdata.push({ "id": val.id, "parent": p, "text": val.label, "icon": val.icon, "data": { code: val.parentid, socongto: s, type: t,meterid:val.id } });
        })

        //console.log(JSON.stringify(jsdata));
        initTree(jsdata);
    }
    
}
function selectChange() {
    if ($("#chontram option:selected").val() != -1) {
        //setTreeDL();
        localStorage.setItem("DL", $(this).val());
        $("#tree_left").slideDown();
        $("#ad-search").slideDown();
        $("#stree").slideDown();
        $("#help_tree").slideUp();
        $('.easy-tree').jstree("destroy");
        GetTreeAll($(this).val(), "sub");
    }
    else {
        localStorage.setItem("DL", $("#chondonvi").val());
        $("#tree_left").slideUp();
        $("#ad-search").slideUp();
        $("#stree").slideUp();
        $("#help_tree").slideDown();
    }
}
function initTree(v) {
    console.log(v);
    var treeData = v;
    $('.easy-tree').jstree({
        "core": {
            "multiple": true,
            "animation": 0,
            "check_callback": true,
            'data': treeData
        },
        //"search": {
        //    "case_insensitive": true,
        //    "ajax": {
        //        "data": v
        //    },
        //    "case_insensitive": true,
        //    "show_only_matches": true,
        //    "search_callback": function (str, node) {
        //        if (node.data.sct.indexOf(str) != -1) {
        //            $('.easy-tree').jstree('select_node', node.id);
        //            $(".easy-tree").jstree('get_selected', true);
        //        }
        //    }
        //},
        "contextmenu": {
            "items": customMenu
        },


        "plugins": [
            //"search",
            //"dnd", 
            "contextmenu"]
    });
    // 8 interact with the tree - either way is OK
    //$('.easy-tree').jstree(true).redraw(true);    
    $('button').on('click', function () {
        $('.easy-tree').jstree(true).select_node('child_node_1');
        $('.easy-tree').jstree('select_node', 'child_node_1');
        $.jstree.reference('.easy-tree').select_node('child_node_1');
    });
    $('#search_meter').keypress(function (e) {
        if (e.which == 13) {
            //$('.easy-tree').jstree("deselect_all");
            $(".easy-tree").jstree(true).search($("#search_meter").val());
        }
    });
    $("#stree span").click(function () {
        $(".easy-tree").jstree(true).search($("#search_meter").val());
    })
    $('.easy-tree').on("changed.jstree", function (e, data) {
        var tag = localStorage.getItem("breadcumb");
        var data_row = [];
        if (data.selected.length > 1) {
            for (var i = 0; i < data.selected.length; i++) {
                data_row.push({ "id": data.instance.get_node(data.selected[i]).id, "tendiemdo": data.instance.get_node(data.selected[i]).text, "socongto": data.instance.get_node(data.selected[i]).data.socongto, "code": data.instance.get_node(data.selected[i]).data.code, "meterid": data.instance.get_node(data.selected[i]).data.meterid, "type": data.instance.get_node(data.selected[i]).data.type });
            }
        } else {
            data_row = ([{ "id": data.instance.get_node(data.selected[0]).id, "tendiemdo": data.instance.get_node(data.selected[0]).text, "socongto": data.instance.get_node(data.selected[0]).data.socongto, "code": data.instance.get_node(data.selected[0]).data.code, "meterid": data.instance.get_node(data.selected[0]).data.meterid, "type": data.instance.get_node(data.selected[0]).data.type }]);
        }
        localStorage.setItem("tree_node", JSON.stringify(data_row));
        menuClick(tag);

    });

}
function customMenu(node) {
    // The default set of all items
    var items = {
        renameItem: { // The "rename" menu item
            label: "Thông số vận hành",
            action: function () {
                menuClick('tsvh_tab');
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Thông tin điểm đo",
            action: function () {
                menuClick('thongtindiemdo_tab');
            }
        }
    };

    if ($(node).hasClass("folder")) {
        // Delete the "delete" menu item
        delete items.deleteItem;
    }

    return items;
}

function loadProvincetoCombo(code) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetProvinceForCombo", callback: "result_loadProvince" };
        var para = {
            v_Code: code,
            v_UserCode: 1,
            v_isSub: 1
        };

        //////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadProvince(config, para, lst) {
  //  console.log(lst)
    var data = lst.data;
    $("#chondonvi").empty();
    $('#chondonvi').append($('<option>', {
        value: '-1',
        text: '-- CHỌN ĐƠN VỊ  --'
    }));
    $.each(data, function (key, val) {
        $('#chondonvi').append($('<option>', {
            value: val.code,
            text: val.name
        }));
    })

    //$("#chondonvi").change();
}

function loadTramToCombo(code) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetProvinceForCombo", callback: "result_loadTram" };
        var para = {
            v_Code: code,
            v_UserCode: 1,
            v_isSub: 1
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadTram(config, para, lst) {
    console.log(lst)
    var data = lst.data;
    $("#chontram").empty();
    $('#chontram').append($('<option>', {
        value: '-1',
        text: '-- CHỌN ĐƠN VỊ  --'
    }));
    $.each(data, function (key, val) {
        $('#chontram').append($('<option>', {
            value: val.code,
            text: val.name
        }));
    })

    //$("#chontram").change();
}
function GetTreeAll(code,type) {
    try {
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAYDULIEU.GetTreeAll", callback: "result_GetTreeAll" };
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