
//// sql
//var config = { namesql: "sql_omc_jcbnm", connstr: "ConnectSql" };
//var para = ['010101', 1, 5];
//ExecuteServiceSyns_New(config, para, true);

//// oracle
//var config = { namesql: "oracle_omc_shls", connstr: "ConnectOracle" };
//var para = ['0101'];
//ExecuteServiceSyns_New(config, para, false);

// đẩy cả bảng lên database thì thêm table
// var table = {
//TABLE_TEST: [
//  { STT: "1", "IMEI": "1111111111111" },
//  { STT: "1", "IMEI": "2222222222222" }
//]
//}
function ExecuteServiceSyns(config, para,issql,table) {
    try {       
        var lst = null;
        // cập nhật datatable
        if (table != null && table != 'undefined') {
            lst= ExecuteBulkCopyDatatable(config, para, issql, table);
           
        } else {
            lst= ExcuteCommandProc(config, para, issql);
        }
        return lst;
    } catch (e) {
        console.log(e);

        return e;
    }
}

function ExecuteBulkCopyDatatable(config, para, issql, table) {
    try {
        var jsonpara = { config: JSON.stringify(config), table: JSON.stringify(table) };
      
        //console.log(jsonpara);
        var lst = null;
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;
        $.ajax({
            url: issql ? "" : "http://14.177.66.131:5566/ServiceSqlOracle/api/BulkcopyOracle",
            //url: issql ? "http://localhost:3479/api/values" : "http://localhost:3479/api/BulkcopyOracle",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                //console.log(data);
                lst = data == null || data == "" ? "[]" : JSON.parse(data);
                if (lst.data == "OK")
                    lst = ExcuteCommandProc(config, para, issql);
                else {
                   // console.log(lst);
                }
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

function ExcuteCommandProc(config, para, issql) {
    // <i class="fa fa-search"> </i> Thực hiện lệch bình thường
    var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
    //console.log(jsonpara);
    var syns = false;
    if (config.callback != null && config.callback != '')
        syns = true;
    var lstData = null;
    $.ajax({//
        url: issql ? "http://14.177.66.131:5566/ServiceSqlOracle/api/values" : "http://14.177.66.131:5566/ServiceSqlOracle/api/ExcuteOracle",
        // url: issql ? "http://localhost:3479/api/values" : "http://localhost:3479/api/ExcuteOracle",
        type: "POST",
        data: jsonpara,
        async: syns,
        success: function (data, textStatus, jqXHR) {
            lstData = data == null || data == "" ? "[]" : JSON.parse(data);
            //console.log(data);
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
            //console.log("da hoan thanh");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR);
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
    return lstData;
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
        console.log(e);
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


// get tất cả các id , value in html theo  thẻ input
function getAllIdMod() {
    try {
        var oArr = {};
        //$("*[id]").each(function () {
        //    try {
        //        var id = $(this).attr('id');
        //        var val = $(this).val() == null ? "" : $(this).val();
        //        // if (!oArr[id] && $(this)[0].className.indexOf("kitSelect") < 0)
        //        oArr[id] = val;
        //    } catch (e) {

        //    } 
        //});

        $("select option:selected").each(function () {
            try
            {
                var id1 = $(this).parent()[0].id;
                if (id1 != null && id1 != "") {
                    var val1 = $("#" + id1 + " option:selected").val();
                    oArr[id1] = val1;
                }
            }
            catch (e){}
          
        });

        $('input[type="text"]').each(function () {
            try {
                var id = $(this)[0].id;
                if (id != null && id != "") {
                    var val = $("#" + id).val();
                    oArr[id] = val;
                }
            }
            catch (ee) { }

        });

        return oArr;
    } catch (e) {
        console.log(e);
        return null;
    }
}



function  setValToTxt(id,val) {
        $('#' + id).val((val != null && val != "" && val != undefined) ?val :"");
}
function setValToComb(id, val) {
    $('#' + id).val((val != null && val !== "" && val != undefined) ? val : "");
}
var compareDates = function (from, to) {
    try {
        var dateResult = to.getTime() - from.getTime();
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
        console.log(e);
        return "";
    } 
    
}

//20150730 ==> 30/07/2015 (string)
function timetoddmmyyyy2(t) {
    try {
        return t.substring(6, 8) + "/" + t.substring(4, 6) + "/" + t.substring(0, 4);
    } catch (e) {
        console.log(e);
        return "";
    } 
    
}
//20150730 ==> 2015, 07,30 (time)
function timeyyyymmdd2(t) {
    try {
        return new Date(t.substring(0, 4), parseInt(t.substring(4, 6)) - 1, t.substring(6, 8));
    } catch (e) {
        console.log(e);
        return "";
    } 
    
}

//dd/MM/yyyy ==> 2015, 07,30 (time)
function timeyyyymmdd(t) {
    try {
        return new Date(t.substring(6, 10), parseInt(t.substring(3, 5)) - 1, t.substring(0, 2));
    } catch (e) {
        console.log(e);
        return "";
    } 
    
}
//dd/MM/yyyy ==> yyyyMMdd (time)
function timetoyyyyMMdd(t) {
    try {
        return t.substring(6, 10) + "" + t.substring(3, 5) + "" + t.substring(0, 2);
    } catch (e) {
        console.log(e);
        return "";
    } 
    
}

// dd/mm/yyyy ==> dd/MM/yyyy+day
function timeaddday1(time, add) {
    try {
        if (time == null || time == undefined || time=="")return "";
        var t = time.substring(3, 5) + "/" + time.substring(0, 2) + "/" + time.substring(6, 10);
        var date = new Date(t);

        var newdate = new Date(date);
        newdate.setDate(newdate.getDate() + add);

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = (dd.toString().length == 1 ? "0" + dd : dd) + "/" + (mm.toString().length == 1 ? "0" + mm : mm) + "/" + y ;
        //console.log(someFormattedDate);
        return someFormattedDate;
    } catch (e) {
        console.log(e);
        return "";
    }

}


// yyyymmdd ==> yyyyMMdd+day
function timeaddday2(time, add) {
    try {
        if (time == null || time == undefined || time=="")return "";
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
        console.log(e);
        return "";
    }

}

// format: dd/MM/yyyy
function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
}


function messInfo(id, noidung, type) {
    try {
        $("#" + id).removeClass();
        $("#" + id).empty();

        if (type.toLowerCase() == "error") {
            $("#" + id).addClass("alert alert-block alert-danger fade in");
            //$("#" + id).fadeOut(5000);

            //   $('#' + id).stop().fadeIn(400).delay(2000).fadeOut(400);
        } else {
            $("#" + id).addClass("alert alert-success alert-block fade in");
            $("#" + id).fadeOut(5000);
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
function f_exportExcelService(config, para, colum, issql,table) {
    try {
        var lst = null;
        // cập nhật datatable
        if (table != null && table != 'undefined') {
            lst = ExecuteBulkCopyDatatable_Excel(config, para,colum, issql, table);

        } else {
          //  lst = ExcuteCommandProc(config, para, issql);
            lst= excuteExcel(config, para, colum, issql);
        }
        return lst;
    } catch (e) {
        console.log(e);

        return e;
    }

  
}

function excuteExcel(config, para, colum, issql) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), colum: JSON.stringify(colum), userid: config.userid };
        $.ajax({
            url: "http://14.177.66.131:5566/ServiceSqlOracle/api/excel",
            // url: "http://localhost:3479/api/excel",
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                window.location = "http://14.177.66.131:5566/ServiceSqlOracle/api/excel/" + config.userid;
                // window.location = "http://localhost:3479/api/excel/" + config.userid;
            },
            complete: function (data) {
            },
            error: function (xhr) {
                //console.log(xhr);
            }
        });
    } catch (e) {
        console.log(e);
        return "";
    }
}


function excuteExcelHaveData(config, para, colum) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), colum: JSON.stringify(colum), userid: config.userid };
        $.ajax({
            url: "http://14.177.66.131:5566/ServiceSqlOracle/api/ExcelExportTable",
            // url: "http://localhost:3479/api/excel",
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                window.location = "http://14.177.66.131:5566/ServiceSqlOracle/api/ExcelExportTable/" + config.userid;
                // window.location = "http://localhost:3479/api/ExcelExportTable/" + config.userid;
            },
            complete: function (data) {
            },
            error: function (xhr) {
                //console.log(xhr);
            }
        });
    } catch (e) {
        console.log(e);
        return "";
    }
}


// inpot excel

function f_importExcel(config, fd) {
    var lstData = null;
    $.ajax({
        type: 'POST',
        url: 'http://14.177.66.131:5566/ServiceSqlOracle/home/ReadExcel',
       // url: 'http://localhost:3479/home/ReadExcel',
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
           // console.log(data);
            lstData = data == null || data == "" ? "[]" : JSON.parse(data);
            
            if (config.callback != null && config.callback != '') {
                //console.log("calllbackkk");
                //console.log(config.callback);
                if (config.callback.toString().indexOf('|') != -1) {
                    $.each(config.callback.split('|'), function (index, item) {
                        funExeItem(item, config, '[]', lstData);
                    });
                } else
                    funExeItem(config.callback, config,'[]', lstData);
            }
        }
    });
}



function ExecuteBulkCopyDatatable_Excel(config, para, colum, issql, table) {
    try {
        var jsonpara = { config: JSON.stringify(config), table: JSON.stringify(table) };
        //console.log(jsonpara);
        var lst = null;
        var syns = false;
        if (config.callback != null && config.callback != '')
            syns = true;
        $.ajax({
            url: issql ? "" : "http://14.177.66.131:5566/ServiceSqlOracle/api/BulkcopyOracle",
            //url: issql ? "http://localhost:3479/api/values" : "http://localhost:3479/api/BulkcopyOracle",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                lst = data == null || data == "" ? "[]" : JSON.parse(data);
                if (lst.data == "OK")
                //  lst = ExcuteCommandProc(config, para, issql);
                    lst = excuteExcel(config, para, colum, issql);
                else {
                   // console.log(lst);
                }
            },
            complete: function () {
                //console.log("da hoan thanh");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR);
                //console.log(textStatus);
                //lconsole.log(errorThrown);
            }
        });
        return lst;
    } catch (e) {
        console.log(e);

        return null;
    }
}