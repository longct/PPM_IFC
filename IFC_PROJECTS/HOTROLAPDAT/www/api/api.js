//var hethong = { lang:  "VI" , donvi: "KM" }
//localStorage.setItem("thietlap",JSON.stringify(hethong));

//var urli = "http://101.99.52.42/ServiceSqlOracle";
//var urli = "http://localhost:22660";
var urli = "http://htld.infras.com.vn/HTLD";
//Sql1Pha3Pha
//getMenuUser();

function ExecuteService(config, para) {
    var user = JSON.parse(localStorage.getItem("userinfo"));
    var lst;
    if (user.db_type == "sql") {
        lst =  ExecuteSQL(config, para);
    }
    else {
        lst = ExecuteServiceSyns(config, para);
    }
    return lst;
}

function ExecuteServiceSyns(config, para) {
    try {
    	
        if (config == null || config == undefined) {
            return "[]";
        }
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;
        var lst;
        $.ajax({
            url: urli + "/api/excuteoracle",
            type: "POST",
            data: jsonpara,
            async: false,
            success: function (data, textStatus, jqXHR) {
            	lst = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

        return lst;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function ExecuteSQL(config, para) {
    try {

        if (config == null || config == undefined) {
            //console.log("kiem tra lai config");
            return "[]";
        }
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;
        var lst;
        $.ajax({
            url: urli + "/api/SqlNomal",
            type: "POST",
            data: jsonpara,
            async: false,
            success: function (data, textStatus, jqXHR) {
                //console.log(data);
                lst = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                //lstData = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                //if (config.callback != null && config.callback != '') {
                //    if (config.callback.toString().indexOf('|') != -1) {
                //        $.each(config.callback.split('|'), function (index, item) {
                //            funExeItem(item, config, para, lstData);
                //        });
                //    } else
                //        funExeItem(config.callback, config, para, lstData);
                //}
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(JSON.stringify(jqXHR));
                ////console.log(jqXHR);
                ////console.log(textStatus);
                ////console.log(errorThrown);
            }
        });

        return lst;
    } catch (e) {
        ////console.log(e);

        return null;
    }
}

function loadchecklog_master() {
    try {
        var userinfo = localStorage.getItem('userinfo');
        if (userinfo == null || userinfo == [] || userinfo == undefined) {
            $(location).attr('href', 'index.html');
            return;
        }
        //var user = JSON.parse(localStorage.getItem("userinfo"));
        //if (user.manhanvien == null || user.manhanvien == [] || user.manhanvien == undefined) {
        //    $(location).attr('href', 'login.html');
        //    return;
        //}
    } catch (e) {
        console.log(e);
    }
}

function ExecuteServiceSynsNoLower(config, para) {
    try {

        if (config == null || config == undefined) {
            //console.log("kiem tra lai config");
            return "[]";
        }
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        ////console.log(jsonpara);
        if (config.callback != null && config.callback != '')
            syns = true;

        $.ajax({
            url: urli + "/api/SqlNomalNoLower",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                // ////console.log(data);
                lstData = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                if (config.callback != null && config.callback != '') {
                    if (config.callback.toString().indexOf('|') != -1) {
                        $.each(config.callback.split('|'), function (index, item) {
                            funExeItem(item, config, para, lstData);
                        });
                    } else
                        funExeItem(config.callback, config, para, lstData);
                }
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(JSON.stringify(jqXHR));
                ////console.log(jqXHR);
                ////console.log(textStatus);
                ////console.log(errorThrown);
            }
        });


    } catch (e) {
        ////console.log(e);

        return null;
    }
}


function funExeItem(fun_name, config, para, data) {
    try {
        if (fun_name != null && fun_name != '') {
            if (isFunction(fun_name)) {
                eval(fun_name)(config, para, data);
            } else;
        } else {;
        }
    } catch (e) {
        ////console.log(e);
    }
}


function setTree() {
    (function ($) {
        $.fn.EasyTree = function (options) {
            var defaults = {
                selectable: true,
                deletable: false,
                editable: false,
                addable: false,
                i18n: {
                    deleteNull: 'Select a node to delete',
                    deleteConfirmation: 'Delete this node?',
                    confirmButtonLabel: 'Okay',
                    editNull: 'Select a node to edit',
                    editMultiple: 'Only one node can be edited at one time',
                    addMultiple: 'Select a node to add a new node',
                    collapseTip: 'Thu nhỏ',
                    expandTip: 'Mở rộng',
                    selectTip: 'Chọn',
                    unselectTip: 'Hủy chọn',
                    editTip: 'edit',
                    addTip: 'add',
                    deleteTip: 'delete',
                    cancelButtonLabel: 'cancle'
                }
            };

            var warningAlert = $('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong></strong><span class="alert-content"></span> </div> ');
            var dangerAlert = $('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong></strong><span class="alert-content"></span> </div> ');

            var createInput = $('<div class="input-group"><input type="text" class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-default btn-success confirm"></button> </span><span class="input-group-btn"><button type="button" class="btn btn-default cancel"></button> </span> </div> ');

            options = $.extend(defaults, options);

            this.each(function () {
                var easyTree = $(this);
                $.each($(easyTree).find('ul > li'), function () {
                    var text;
                    if ($(this).is('li:has(ul)')) {
                        var children = $(this).find(' > ul');
                        $(children).remove();
                        text = $(this).text();
                        $(this).html('<span><span class="glyphicon"></span><a href="javascript: void(0);"></a> </span>');
                        $(this).find(' > span > span').addClass('glyphicon-folder-open');
                        $(this).find(' > span > a').text(text);
                        $(this).append(children);
                    }
                    else {
                        text = $(this).text();
                        $(this).html('<span><span class="fa"></span><a href="javascript: void(0);"></a> </span>');
                        $(this).find(' > span > span').addClass('fa-circle');
                        $(this).find(' > span > a').addClass("node");
                        $(this).find(' > span > a').text(text);
                    }
                });

                $(easyTree).find('li:has(ul)').addClass('parent_li').find(' > span').attr('title', options.i18n.collapseTip);
                if (options.checkbox) {
                    $(easyTree).find('.easy-tree-toolbar').append('<div class="edit"><button class="btn btn-default btn-sm btn-primary disabled"><span class="glyphicon glyphicon-edit"></span></button></div> ');
                    $(easyTree).find('.easy-tree-toolbar .edit > button').attr('title', options.i18n.editTip).click(function () {
                        $(easyTree).find('input.easy-tree-editor').remove();
                        $(easyTree).find('li > span > a:hidden').show();
                        var selected = getSelectedItems();
                        if (selected.length <= 0) {
                            $(easyTree).prepend(warningAlert);
                            $(easyTree).find('.alert .alert-content').html(options.i18n.editNull);
                        }
                        else if (selected.length > 1) {
                            $(easyTree).prepend(warningAlert);
                            $(easyTree).find('.alert .alert-content').html(options.i18n.editMultiple);
                        }
                        else {
                            var value = $(selected).find(' > span > a').text();
                            $(selected).find(' > span > a').hide();
                            $(selected).find(' > span').append('<input type="text" class="easy-tree-editor">');
                            var editor = $(selected).find(' > span > input.easy-tree-editor');
                            $(editor).val(value);
                            $(editor).focus();
                            $(editor).keydown(function (e) {
                                if (e.which == 13) {
                                    if ($(editor).val() !== '') {
                                        $(selected).find(' > span > a').text($(editor).val());
                                        $(editor).remove();
                                        $(selected).find(' > span > a').show();
                                    }
                                }
                            });
                        }
                    });
                }
                // add easy tree toolbar dom
                //if (options.deletable || options.editable || options.addable) {
                //    $(easyTree).prepend('<div class="easy-tree-toolbar"></div> ');
                //}
                /*
                // addable
                if (options.addable) {
                    $(easyTree).find('.easy-tree-toolbar').append('<div class="create"><button class="btn btn-default btn-sm btn-success"><span class="glyphicon glyphicon-plus"></span></button></div> ');
                    $(easyTree).find('.easy-tree-toolbar .create > button').attr('title', options.i18n.addTip).click(function () {
                        var createBlock = $(easyTree).find('.easy-tree-toolbar .create');
                        $(createBlock).append(createInput);
                        $(createInput).find('input').focus();
                        $(createInput).find('.confirm').text(options.i18n.confirmButtonLabel);
                        $(createInput).find('.confirm').click(function () {
                            if ($(createInput).find('input').val() === '')
                                return;
                            var selected = getSelectedItems();
                            var item = $('<li><span><span class="glyphicon glyphicon-file"></span><a href="javascript: void(0);">' + $(createInput).find('input').val() + '</a> </span></li>');
                            $(item).find(' > span > span').attr('title', options.i18n.collapseTip);
                            $(item).find(' > span > a').attr('title', options.i18n.selectTip);
                            if (selected.length <= 0) {
                                $(easyTree).find(' > ul').append($(item));
                            } else if (selected.length > 1) {
                                $(easyTree).prepend(warningAlert);
                                $(easyTree).find('.alert .alert-content').text(options.i18n.addMultiple);
                            } else {
                                if ($(selected).hasClass('parent_li')) {
                                    $(selected).find(' > ul').append(item);
                                } else {
                                    $(selected).addClass('parent_li').find(' > span > span').addClass('glyphicon-folder-open').removeClass('glyphicon-file');
                                    $(selected).append($('<ul></ul>')).find(' > ul').append(item);
                                }
                            }
                            $(createInput).find('input').val('');
                            if (options.selectable) {
                                $(item).find(' > span > a').attr('title', options.i18n.selectTip);
                                $(item).find(' > span > a').click(function (e) {
                                    var li = $(this).parent().parent();
                                    if (li.hasClass('li_selected')) {
                                        $(this).attr('title', options.i18n.selectTip);
                                        $(li).removeClass('li_selected');
                                    }
                                    else {
                                        $(easyTree).find('li.li_selected').removeClass('li_selected');
                                        $(this).attr('title', options.i18n.unselectTip);
                                        $(li).addClass('li_selected');
                                    }
    
                                    if (options.deletable || options.editable || options.addable) {
                                        var selected = getSelectedItems();
                                        if (options.editable) {
                                            if (selected.length <= 0 || selected.length > 1)
                                                $(easyTree).find('.easy-tree-toolbar .edit > button').addClass('disabled');
                                            else
                                                $(easyTree).find('.easy-tree-toolbar .edit > button').removeClass('disabled');
                                        }
    
                                        if (options.deletable) {
                                            if (selected.length <= 0 || selected.length > 1)
                                                $(easyTree).find('.easy-tree-toolbar .remove > button').addClass('disabled');
                                            else
                                                $(easyTree).find('.easy-tree-toolbar .remove > button').removeClass('disabled');
                                        }
    
                                    }
    
                                    e.stopPropagation();
    
                                });
                            }
                            $(createInput).remove();
                        });
                        $(createInput).find('.cancel').text(options.i18n.cancelButtonLabel);
                        $(createInput).find('.cancel').click(function () {
                            $(createInput).remove();
                        });
                    });
                }
    
                // editable
                if (options.editable) {
                    $(easyTree).find('.easy-tree-toolbar').append('<div class="edit"><button class="btn btn-default btn-sm btn-primary disabled"><span class="glyphicon glyphicon-edit"></span></button></div> ');
                    $(easyTree).find('.easy-tree-toolbar .edit > button').attr('title', options.i18n.editTip).click(function () {
                        $(easyTree).find('input.easy-tree-editor').remove();
                        $(easyTree).find('li > span > a:hidden').show();
                        var selected = getSelectedItems();
                        if (selected.length <= 0) {
                            $(easyTree).prepend(warningAlert);
                            $(easyTree).find('.alert .alert-content').html(options.i18n.editNull);
                        }
                        else if (selected.length > 1) {
                            $(easyTree).prepend(warningAlert);
                            $(easyTree).find('.alert .alert-content').html(options.i18n.editMultiple);
                        }
                        else {
                            var value = $(selected).find(' > span > a').text();
                            $(selected).find(' > span > a').hide();
                            $(selected).find(' > span').append('<input type="text" class="easy-tree-editor">');
                            var editor = $(selected).find(' > span > input.easy-tree-editor');
                            $(editor).val(value);
                            $(editor).focus();
                            $(editor).keydown(function (e) {
                                if (e.which == 13) {
                                    if ($(editor).val() !== '') {
                                        $(selected).find(' > span > a').text($(editor).val());
                                        $(editor).remove();
                                        $(selected).find(' > span > a').show();
                                    }
                                }
                            });
                        }
                    });
                }
    
                // deletable
                if (options.deletable) {
                    $(easyTree).find('.easy-tree-toolbar').append('<div class="remove"><button class="btn btn-default btn-sm btn-danger disabled"><span class="glyphicon glyphicon-remove"></span></button></div> ');
                    $(easyTree).find('.easy-tree-toolbar .remove > button').attr('title', options.i18n.deleteTip).click(function () {
                        var selected = getSelectedItems();
                        if (selected.length <= 0) {
                            $(easyTree).prepend(warningAlert);
                            $(easyTree).find('.alert .alert-content').html(options.i18n.deleteNull);
                        } else {
                            $(easyTree).prepend(dangerAlert);
                            $(easyTree).find('.alert .alert-content').html(options.i18n.deleteConfirmation)
                                .append('<a style="margin-left: 10px;" class="btn btn-default btn-danger confirm"></a>')
                                .find('.confirm').html(options.i18n.confirmButtonLabel);
                            $(easyTree).find('.alert .alert-content .confirm').on('click', function () {
                                $(selected).find(' ul ').remove();
                                if ($(selected).parent('ul').find(' > li').length <= 1) {
                                    $(selected).parents('li').removeClass('parent_li').find(' > span > span').removeClass('glyphicon-folder-open').addClass('glyphicon-file');
                                    $(selected).parent('ul').remove();
                                }
                                $(selected).remove();
                                $(dangerAlert).remove();
                            });
                        }
                    });
                }
                */
                // collapse or expand
                $(easyTree).delegate('li.parent_li > span', 'click', function (e) {
                    var children = $(this).parent('li.parent_li').find(' > ul > li');
                    if (children.is(':visible')) {
                        children.hide('fast');
                        $(this).attr('title', options.i18n.expandTip)
                            .find(' > span.glyphicon')
                            .addClass('glyphicon-folder-close')
                            .removeClass('glyphicon-folder-open');
                    } else {
                        children.show('fast');
                        $(this).attr('title', options.i18n.collapseTip)
                            .find(' > span.glyphicon')
                            .addClass('glyphicon-folder-open')
                            .removeClass('glyphicon-folder-close');
                    }
                    e.stopPropagation();
                });

                // selectable, only single select
                if (options.selectable) {
                    $(easyTree).find('li > span > a').attr('title', options.i18n.selectTip);
                    $(easyTree).find('li > span > a').click(function (e) {
                        var li = $(this).parent().parent();
                        if (li.hasClass('li_selected')) {
                            $(this).attr('title', options.i18n.selectTip);
                            $(li).removeClass('li_selected');
                        }
                        else {
                            $(easyTree).find('li.li_selected').removeClass('li_selected');
                            $(this).attr('title', options.i18n.unselectTip);
                            $(li).addClass('li_selected');
                        }

                        if (options.deletable || options.editable || options.addable) {
                            var selected = getSelectedItems();
                            //longct select event
                            console.log(selected.data("value"));
                            var content_t = $('#tree_left').html(); // orig
                            sessionStorage.setItem("tree", content_t);

                            if (options.editable) {
                                if (selected.length <= 0 || selected.length > 1) {
                                    $(easyTree).find('.easy-tree-toolbar .edit > button').addClass('disabled');
                                }
                                else
                                    $(easyTree).find('.easy-tree-toolbar .edit > button').removeClass('disabled');
                            }

                            if (options.deletable) {
                                if (selected.length <= 0 || selected.length > 1)
                                    $(easyTree).find('.easy-tree-toolbar .remove > button').addClass('disabled');
                                else
                                    $(easyTree).find('.easy-tree-toolbar .remove > button').removeClass('disabled');
                            }

                        }

                        e.stopPropagation();

                    });
                }

                // Get selected items
                var getSelectedItems = function () {
                    //console.log($(easyTree).find('li.li_selected'));
                    return $(easyTree).find('li.li_selected');
                };
            });
        };
    })(jQuery);

    (function ($) {
        function init_tree() {
            $('.easy-tree').EasyTree({
                addable: true,
                editable: true,
                deletable: true,
                checkbox:true
            });
        }

        window.onload = init_tree();
    })(jQuery);
}
// get tất cả các id , value in html theo  thẻ input
function getAllIdMod() {
    try {
        var oArr = {};
        $("*[id]").each(function () {
            try {
                var id = $(this).attr('id');
                var val = $(this).val() == null ? "" : $(this).val();
                // if (!oArr[id] && $(this)[0].className.indexOf("kitSelect") < 0)
                oArr[id] = val;
            } catch (e) {

            }
        });

        $("select option:selected").each(function () {
            try {
                var id1 = $(this).attr('id');
                var val1 = $(this).val() == null ? "" : $(this).val();
                oArr[id1] = val1;
            }
            catch (e) { }

        });

        return oArr;
    } catch (e) {
        ////console.log(e);
        return null;
    }
}

function isFunction(expr) {
    function sandboxTemplate() {
        try {
            return typeof $expr$ == "function";
        } catch (ex) {
            return false;
        }
    }

    try {
        var sandbox = new Function(
            sandboxTemplate.toString().replace("$expr$", expr)
            + "return sandboxTemplate()");
        return sandbox();
    } catch (e) {
        return false;
    }
}
// set null
function setnull(val) {
    try {
        if (val == "" || val == null) {
            return "-"
        }
        return val;
    } catch (e) {
        console.log(e);
    }
}

function setnullnumber(val) {
    try {
        if (val == null || val == undefined || val == "") {
            return 0
        }
        return val;
    } catch (e) {

        console.log(e);
        return 0;
    }
}
function setValToTxt(id, val) {
    try {
        $('#' + id).val((val != null && val != "" && val != undefined) ? val : "");
    } catch (e) { }
}
function setValToComb(id, val) {
    try {
        $('#' + id).val((val != null && val != "" && val != undefined) ? val : "");
        // $('#' + id + ' option[value=' + val + ']').prop("selected", true);
    } catch (e) { }
}

// set hai ngay voi nhau
var compareDates = function (from, to) {
    try {
        var dateResult = to - from;
        var dateObj = {};
        dateObj.weeks = Math.round(dateResult / (1000 * 60 * 60 * 24 * 7));
        dateObj.days = Math.ceil(dateResult / (1000 * 60 * 60 * 24));
        dateObj.hours = Math.ceil(dateResult / (1000 * 60 * 60));
        dateObj.minutes = Math.ceil(dateResult / (1000 * 60));
        dateObj.seconds = Math.ceil(dateResult / (1000));
        dateObj.milliseconds = dateResult;
        return dateObj;
    } catch (e) {
        console.log(e);
        return 0;
    }
}
//lay ngay hien tai
function gettimenow() {
    try {
        var t = new Date();
        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = d + "/" + m + "/" + y;
        return tt;
    } catch (e) {
        ////console.log(e);
        return "";
    }

}

function gettimenow_cscthang() {
    try {
        var t = new Date();
        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = m + "/" + y;
        return tt;
    } catch (e) {
        ////console.log(e);
        return "";
    }

}

//20150730 ==> 30/07/2015 (string)
function timetoddmmyyyy2(t) {
    try {
        return t.substring(6, 8) + "/" + t.substring(4, 6) + "/" + t.substring(0, 4);
    } catch (e) {
        ////console.log(e);
        return "";
    }

}
//20150730 ==> 2015, 07,30 (time)
function timeyyyymmdd2(t) {
    try {
        return new Date(t.substring(0, 4), parseInt(t.substring(4, 6)) - 1, t.substring(6, 8));
    } catch (e) {
        ////console.log(e);
        return "";
    }

}

//dd/MM/yyyy ==> 2015, 07,30 (time)
function timeyyyymmdd(t) {
    try {
        return new Date(t.substring(6, 10), parseInt(t.substring(3, 5)) - 1, t.substring(0, 2));
    } catch (e) {
        ////console.log(e);
        return "";
    }

}
//dd/MM/yyyy ==> yyyyMMdd (time)
function timetoyyyyMMdd(t) {
    try {
        return t.substring(6, 10) + "" + t.substring(3, 5) + "" + t.substring(0, 2);
    } catch (e) {
        ////console.log(e);
        return "";
    }

}
//dd/MM/yyyy ==> yyyy-MM-dd (time)
function timetoyyyyMMdd1(t) {
    try {
        return t.substring(6, 10) + "-" + t.substring(3, 5) + "-" + t.substring(0, 2);
    } catch (e) {
        //console.log(e);
        return "";
    }

}

// dd/mm/yyyy ==> dd/MM/yyyy+day
function timeaddday1(time, add) {
    try {
        if (time == null || time == undefined || time == "") return "";
        var t = time.substring(3, 5) + "/" + time.substring(0, 2) + "/" + time.substring(6, 10);
        var date = new Date(t);

        var newdate = new Date(date);
        newdate.setDate(newdate.getDate() + add);

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = (dd.toString().length == 1 ? "0" + dd : dd) + "/" + (mm.toString().length == 1 ? "0" + mm : mm) + "/" + y;
        //console.log(someFormattedDate);
        return someFormattedDate;
    } catch (e) {
        //console.log(e);
        return "";
    }

}


// yyyymmdd ==> yyyyMMdd+day
function timeaddday2(time, add) {
    try {
        if (time == null || time == undefined || time == "") return "";
        var t = time.substring(4, 6) + "/" + time.substring(6, 8) + "/" + time.substring(0, 4);
        var date = new Date(t);

        var newdate = new Date(date);
        newdate.setDate(newdate.getDate() + add);

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = y + "" + mm + "" + dd;
        return someFormattedDate;
    } catch (e) {
        //console.log(e);
        return "";
    }

}


function messInfo(id, noidung, type) {
    try {
        $("#" + id).removeClass();
        $("#" + id).empty();

        if (type.toLowerCase() == "error") {
            $("#" + id).addClass("alert alert-block alert-danger fade in");
            //$("#" + id).fadeOut(5000);
        } else {
            $("#" + id).addClass("alert alert-success alert-block fade in");
            //$("#" + id).fadeOut(5000);
        }

        if (noidung.length > 0) {
            $("#" + id).show();
            $("#" + id).append('<button data-dismiss="alert" class="close close-sm" type="button"></button>' + noidung);
        } else {
            $("#" + id).hide();
            $("#" + id).empty();
        }
    } catch (e) {
        //console.log(e);
    }


}
//dung xuất excel
function f_exportExcelService(config, para, colum, issql, table) {
    try {
        var lst = null;
        // cập nhật datatable
        if (table != null && table != 'undefined') {
            lst = ExecuteBulkCopyDatatable_Excel(config, para, colum, issql, table);

        } else {
            //  lst = ExcuteCommandProc(config, para, issql);
            lst = excuteExcel(config, para, colum, issql);
        }
        return lst;
    } catch (e) {
        //console.log(e);

        return e;
    }


}

function excuteExcel(config, para, colum, issql) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), colum: JSON.stringify(colum), userid: config.userid };
        //console.log(jsonpara);
        $.ajax({
            url: issql ? (urli + "/api/excelsqlexcute") : (urli + "/api/excel"),
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                window.location = issql ? (urli + "/api/excelsqlexcute/" + config.userid) : (urli + "/api/excel/" + config.userid);
            },
            complete: function (data) {
            },
            error: function (xhr) {
                //console.log(xhr);
            }
        });
    } catch (e) {
        //console.log(e);
        return "";
    }
}


function excuteExcelHaveData(config, para, colum) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), colum: JSON.stringify(colum), userid: config.userid };
        $.ajax({
            url: urli + "/api/ExcelExportTable",
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                window.location = urli + "/api/ExcelExportTable/" + config.userid;
            },
            complete: function (data) {
            },
            error: function (xhr) {
                //console.log(xhr);
            }
        });
    } catch (e) {
        //console.log(e);
        return "";
    }
}


function ExportXmlHaveData(config, para) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), userid: config.userid };
        $.ajax({
            url: urli + "/api/ExportXml",
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                //////console.log(data);
                window.location = urli + '/home/DownloadXml/' + config.namefile;
            },
            complete: function (data) {
            },
            error: function (xhr) {
                //console.log(xhr);
            }
        });
    } catch (e) {
        //console.log(e);
        return "";
    }
}

// inpot excel

function f_importExcel(config, fd) {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: urli + '/home/ReadExcel',
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                // //////console.log(data);
                lstData = data == null || data == "" ? "[]" : JSON.parse(data);

                if (config.callback != null && config.callback != '') {
                    ////console.log("calllbackkk");
                    ////console.log(config.callback);
                    if (config.callback.toString().indexOf('|') != -1) {
                        $.each(config.callback.split('|'), function (index, item) {
                            funExeItem(item, config, '[]', lstData);
                        });
                    } else
                        funExeItem(config.callback, config, '[]', lstData);
                }
            }
        });
    } catch (e) { console.log(e); }
}

// inpot excel

function f_importFileXml(config, fd) {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: urli + '/home/ReadFileXml',
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                // //////console.log(data);
                lstData = data == null || data == "" ? "[]" : JSON.parse(data);

                if (config.callback != null && config.callback != '') {
                    ////console.log("calllbackkk");
                    ////console.log(config.callback);
                    if (config.callback.toString().indexOf('|') != -1) {
                        $.each(config.callback.split('|'), function (index, item) {
                            funExeItem(item, config, '[]', lstData);
                        });
                    } else
                        funExeItem(config.callback, config, '[]', lstData);
                }
            }
        });
    } catch (e) { console.log(e); }
}

//function f_downloadFileXml(filename)
//{
//    window.location = urli + '/home/DownloadXml/' + filename;
//}
function ExecuteBulkCopyDatatable_Sql(config, para, table) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), table: JSON.stringify(table) };
        //console.log(jsonpara);
        var lst = null;
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;
        var lstData;
        $.ajax({
            url: urli + "/api/BulkCopySql",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                lstData = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                if (config.callback != null && config.callback != '') {
                    if (config.callback.toString().indexOf('|') != -1) {
                        $.each(config.callback.split('|'), function (index, item) {
                            funExeItem(item, config, para, lstData);
                        });
                    } else
                        funExeItem(config.callback, config, para, lstData);
                }
            },
            complete: function () {
                ////console.log("da hoan thanh");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR);
                //console.log(textStatus);
                //console.log(errorThrown);
            }
        });
        return lst;
    } catch (e) {
        //console.log(e);

        return null;
    }
}



function ExecuteBulkCopyDatatable_SqlRenameCol(config, para, table) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), table: JSON.stringify(table) };
        //console.log(jsonpara);
        var lst = null;
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;
        var lstData;
        $.ajax({
            url: urli + "/api/BulkCopySqlRenameCol",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                lstData = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                if (config.callback != null && config.callback != '') {
                    if (config.callback.toString().indexOf('|') != -1) {
                        $.each(config.callback.split('|'), function (index, item) {
                            funExeItem(item, config, para, lstData);
                        });
                    } else
                        funExeItem(config.callback, config, para, lstData);
                }
            },
            complete: function () {
                ////console.log("da hoan thanh");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR);
                //console.log(textStatus);
                //console.log(errorThrown);
            }
        });
        return lst;
    } catch (e) {
        //console.log(e);

        return null;
    }
}
// do du lieu vao combobox
//idCb la id combobox, data cua combo, 
//dataToCob("Type", jsonStatusArr, "value", "name","-1","Tất cả");
//dataToCob("Type", jsonStatusArr, "value", "name");
function dataToCob(idCb, data, value, name, addValue, addName) {
    try {
        $("#" + idCb).empty();
        if (addValue != null && addValue != undefined && addValue != "" && addName != null && addName != undefined && addName != "")
            $("#" + idCb).append('<option value="' + addValue + '">' + addName + '</option>');
        $.each(data, function (key, val) {
            $('#' + idCb).append($('<option>', {
                value: val[value],
                text: val[name]
            }));
        });
        if (addValue != null && addValue != undefined && addValue != "" && addName != null && addName != undefined && addName != "")
            $('#' + idCb + ' option[value=' + addValue + ']').prop("selected", true);
    } catch (e) { console.log(e); }
}

var oArr = [];
function f_getCacheForAll() {
    try {

        $("*[id]").each(function () {
            try {
                var id = $(this).attr('id');
                var cache = $(this).attr('cache');

                var val = $(this).val() == null ? "" : $(this).val();
                if (cache == "true") {
                    var pa = { id: id, cache: cache, value: val, url: window.location.href };
                    oArr.push(pa);
                }
            } catch (e) {

            }
        });

        $("select option:selected").each(function () {
            try {
                var id1 = $(this).attr('id');
                var val1 = $(this).val() == null ? "" : $(this).val();
                //oArr[id1] = val1;
                var cache = $(this).attr('cache');
                if (cache == "true") {
                    var pa = { id: id1, cache: cache, value: val1, url: window.location.href };
                    oArr.push(pa);
                }
            }
            catch (e) { }

        });
        var caches = remove_duplicates(oArr);
        localStorage.setItem("cacheColtrol", JSON.stringify(caches));
        return caches;
    } catch (e) {
        return null;
    }
}


function f_setCacheForAll() {
    try {
        var oArr = JSON.parse(localStorage.getItem("cacheColtrol"));
        if (oArr == null || oArr == undefined) return;

        var caches = remove_duplicates(oArr);
        var urli = window.location.href;
        var obj = caches.filter(function (a) { return a.url == urli });
        if (obj != null && obj != undefined && obj.length > 0) {

            $.each(obj, function (key, val) {
                setValToTxt(val.id, val.value);
            });
        }

    } catch (e) {
        console.log(e);
    }
}

function remove_duplicates(objectsArray) {
    try {
        var usedObjects = {};

        for (var i = objectsArray.length - 1; i >= 0; i--) {
            var so = JSON.stringify(objectsArray[i]);

            if (usedObjects[so]) {
                objectsArray.splice(i, 1);

            } else {
                usedObjects[so] = true;
            }
        }

        return objectsArray;
    }
    catch (e) { console.log(e); }
}

// dung check file cho van hanh
function ExecuteServiceCheckFile(config, para) {
    try {

        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;

        $.ajax({

            url: urlViewFile + "/api/CheckFile_Keyword",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                // ////console.log(data);
                lstData = data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                if (config.callback != null && config.callback != '') {
                    if (config.callback.toString().indexOf('|') != -1) {
                        $.each(config.callback.split('|'), function (index, item) {
                            funExeItem(item, config, para, lstData);
                        });
                    } else
                        funExeItem(config.callback, config, para, lstData);
                }
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(JSON.stringify(jqXHR));
                ////console.log(jqXHR);
                ////console.log(textStatus);
                ////console.log(errorThrown);
            }
        });


    } catch (e) {
        ////console.log(e);

        return null;
    }
}


function ExecuteBulkCopyOracle(config, table) {
    try {
        var jsonpara = { config: JSON.stringify(config), table: JSON.stringify(table) };

        var lst = null;
        var syns = false;
        $.ajax({
            url: urli + "/api/BulkcopyOracle",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                lst = data == null || data == "" ? "[]" : JSON.parse(data);
            },
            complete: function () {
                //console.log("da hoan thanh");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR);
                //console.log(textStatus);
                //console.log(errorThrown);
            }
        });
        return lst;
    } catch (e) {
        console.log(e);

        return null;
    }
}

function LoadPhanTrang(idPage, idCurentPage, data, func) {
    try {

        var tongtrang = 1;
        var tranghientai = 1;
        if (data == null || data == undefined || data[0].tongtrang == null || data[0].tongtrang == undefined || data[0].tranghientai == null || data[0].tranghientai == undefined)
            return;

        tongtrang = data[0].tongtrang.toString().indexOf(".") < 0 ? data[0].tongtrang : (data[0].tongtrang + 1).toString().substring(0, (data[0].tongtrang + 1).toString().indexOf("."));
        tranghientai = parseInt(data[0].tranghientai);
        $("#" + idCurentPage).html("Trang " + tranghientai + " / " + tongtrang);

        var html = '<ul>' +
                        '<li class="prev" valuePage ="1"><a>← Đầu</a></li>' +
                        '<li class="active" valuePage ="' + (tranghientai == 1 ? 1 : (tranghientai - 1)) + '"><a>←</a></li>' +
                        '<li><input type="text" value="' + tranghientai + '" class="form-control" id="pagenumber" size="2" valuePage="' + tranghientai + '"/></li>' +
                        '<li class="" valuePage="' + (tranghientai == tongtrang ? tongtrang : (tranghientai + 1)) + '"><a>→</a></li>' +
                        '<li class="next" valuePage="' + tongtrang + '"><a>Cuối → </a></li>' +
                    '</ul>';

        $("#" + idPage).empty();
        $("#" + idPage).append(html);

        $("#" + idPage + " ul li").click(function () {
            tranghientai = $(this).attr("valuePage");
            $("#pagenumber").val($(this).attr("valuePage"));
            func();
        });
    } catch (e) { console.log(e); }


}
function LoadPhanTrang_(idPage, idCurentPage, data, func) {
    try {
        var tongtrang = 1;
        var tranghientai = 1;
        var totalpages = data[0].rowscount / 20;
        if (data == null || data == undefined || data[0].rowscount == null || data[0].rowscount == undefined || data[0].tranghientai == null || data[0].tranghientai == undefined)
            return;

        tongtrang = totalpages.toString().indexOf(".") < 0 ? totalpages : (totalpages + 1).toString().substring(0, (totalpages + 1).toString().indexOf("."));
        tranghientai = parseInt(data[0].tranghientai) + 1;
        $("#" + idCurentPage).html("Trang " + tranghientai + " / " + tongtrang);

        var html =      '<span class="p_prev" valuePage ="1">← Đầu</span>' +
                        '<span class="p_active" valuePage ="' + (tranghientai == 1 ? 1 : (tranghientai - 1)) + '">←</span>' +
                        '<input type="number" value="' + tranghientai + '" class="" id="pagenumber" size="2" valuePage="' + tranghientai + '"/>' +
                        '<span class="p_active" valuePage="' + (tranghientai == tongtrang ? tongtrang : (tranghientai + 1)) + '">→</span>' +
                        '<span class="p_next" valuePage="' + tongtrang + '">Cuối → </span>';
                    

        $("#" + idPage).empty();
        $("#" + idPage).append(html);

        $("#" + idPage + " span").click(function () {
            tranghientai = $(this).attr("valuePage");
            //$("#pagenumber").attr("placeholder",$(this).attr("valuePage"));
            $("#pagenumber").val($(this).attr("valuePage"));
            func();
        });
        $("#pagenumber").keypress(function (e) {
            if (e.which == 13) {
                //$("#pagenumber").val($(this).attr("valuePage"));
                if ($(this).val() > totalpages +1 || $(this).val() <= 0) {
                    showToast("Số trang nhập vào không đúng", "error");
                } else {
                    func();
                }
            }
        });
    } catch (e) { console.log(e); }


}

function getfulltimenow() {
    try {
        var t = new Date();
        //var d = format_two_digits(t.getDate());
        //var m = format_two_digits((t.getMonth() + 1));
        //var y = format_two_digits(t.getFullYear());
        //var tt = d + "/" + m + "/" + y + " " +
        //    format_two_digits(t.getHours()) + ":" + format_two_digits(t.getMinutes()) + ":" + format_two_digits(t.getSeconds());

        return t;
    } catch (e) {
        ////console.log(e);
        return "";
    }

}


function getfulltimenow01() {
    try {
        var t = new Date();
        var d = format_two_digits(t.getDate());
        var m = format_two_digits((t.getMonth() + 1));
        var y = format_two_digits(t.getFullYear());
        var tt = d + "/" + m + "/" + y + " " +
            format_two_digits(t.getHours()) + ":" + format_two_digits(t.getMinutes()) + ":" + format_two_digits(t.getSeconds());

        return tt;
    } catch (e) {
        console.log(e);
        return "";
    }

}
// chuyen dd/mm/yyyy hh24:mi:ss ==> yyyy/mm/dd hh24:mi:ss
function formartDateTime(t) {
    try {
        return t.substring(6, 10) + "/" + t.substring(3, 5) + "/" + t.substring(0, 2) + " " + t.substring(10, t.length);
    } catch (e) {
        //console.log(e);
        return "";
    }

}
function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
}

function f_getNextTime() {
    try {
        var lst = [];
        for (var i = 0; i < 288; i++) {
            var t = new Date(2015, 1, 1, 00, 00, 00);
            var t1 = t.setMinutes(t.getMinutes() + (i * 5));
            var date = new Date(t1)
            var str = format_two_digits(date.getHours()) + ":" + format_two_digits(date.getMinutes());
            lst.push(str);

        }
        lst.push("24:00");
        return lst;
    } catch (e) {
        console.log(e);

    }
}
/******LONGCT*****/
function showToast(msg, type) {
    $("#toast").html(msg);
    $("#toast").removeAttr("class");
    $("#toast").addClass(type);
    $('#toast').fadeIn(400).delay(2000).fadeOut(400); //fade out after 3 seconds
}

function showToast2(msg, type) {
    $("#toast").html(msg);
    $("#toast").removeAttr("class");
    $("#toast").addClass(type);
    $('#toast').fadeIn(400).delay(2000).fadeOut(400); //fade out after 3 seconds
}

function format_number_map(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    //while (rgx.test(x1)) {
    //    x1 = x1.replace(rgx, '$1' + ',' + '$2');
    //}
    return x1;// + x2;
}

// kiểm tra số :$.isNumeric(p.txt_datefrom_baocaovattuthietbi)
//kiểm tra email  IsEmail(p.txt_dateto_baocaovattuthietbi);
// if ($.isNumeric(p.txt_datefrom_baocaovattuthietbi) == false) return "Khong phải là số";
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}


//General,NoDecimal,ThreeDecimal,CommaAndTwoDecimal,DdMMyyyyHHmm,DdMMyyyyHHmmAndBold,Percent,NoPercent,Fractions,Text,Bold
//TextAndBold,GeneralRight,GeneralLeft,GeneralCenter,BoldCenter,BoldCenter,DdMMyyyyHHmmCenter,TextLeft
//TextCenter,TextRight,TextAndBoldLeft,TextAndBoldCenter,TextAndBoldRight
function ExecuteExportExcelOracle(config, para, colum) {
    try {
        var idrandom = Math.random().toString(36).substr(2);
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), colum: JSON.stringify(colum), idrandom: idrandom };
        $.ajax({
            url: urli + "/api/ExcelExportOracle",
            type: "POST",
            data: jsonpara,
            async: true,
            success: function (data, textStatus, jqXHR) {
                window.location = urli + "/api/ExcelExportOracle?idrandom=" + idrandom;
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


    } catch (e) {
        console.log(e);

        return null;
    }
}

function api_uploadFileXmlToOracle(config, fd) {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: urli + '/InportFileXmlToOracle/InportXmlToOrcale',
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                if (config.callback != null && config.callback != '') {
                    funExeItem(config.callback, config, [], data);
                }
            }
        });
    } catch (e) { console.log(e); }
}

