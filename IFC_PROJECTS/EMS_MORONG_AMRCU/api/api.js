//var urli = "http://tcpip.infras.com.vn/ServiceTcp";
//var urli = "http://localhost:22660";
var urli = "http://14.177.66.131:5566/ServiceSqlOracleNew";
//Sql1Pha3Pha

function ExecuteServiceSyns(config, para) {
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
            url: urli+"/api/SqlNomal",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                try
                {
                    lstData= data == null || data == undefined || data == "" ? "[]" : JSON.parse(data);
                    if (config.callback != null && config.callback != '') {
                        if (config.callback.toString().indexOf('|') != -1) {
                            $.each(config.callback.split('|'), function (index, item) {
                                funExeItem(item, config, para, lstData);
                            });
                        } else
                            funExeItem(config.callback, config, para, lstData);

                    }
                } catch (e) {
                    console.log(e);
                    funExeItem(config.callback, config, para, "[]");
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
                // console.log(data);
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
        console.log(e);
    }
}


function f_getParaFromUrl() {
    var match,
       pl = /\+/g,  // Regex for replacing addition symbol with a space
       search = /([^&=]+)=?([^&]*)/g,
       decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
       query = window.location.search.substring(1);

    var urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
}

// get tất cả các id , value in html theo  thẻ input
function getAllIdModText() {
    var oArr2 = {};
    try {
        $("select option:selected").each(function () {
            try {
                var id4 = $(this).parent().attr("id");
                var val4 = $(this).val() == null ? "" : $(this)[0].innerHTML;

                if (id4 != null && id4 != undefined && val4 != null && val4 != undefined)                    
                    oArr2[id4] = val4;              
              
            }
            catch (e) { console.log(e); }
        });
        $("*[id]").each(function () {
            try {
                var id3 = $(this).attr('id');
                var val3 = $(this).val() == null ? "" : $(this).val();
                if (id3 != null && id3 != undefined && val3 != null && val3 != undefined && oArr2.hasOwnProperty(id3)==false)
                oArr2[id3] = val3;
            } catch (e) {
                console.log(e);
            }
        });
        return oArr2;
    } catch (e) {
        console.log(e);
        return null;
    }
}
// get tất cả các id , value in html theo  thẻ input
function getAllIdMod() {
    try {
        var oArr = {};

        $("select option:selected").each(function () {
            try {
                var id1 = $(this).parent().attr("id");
                var val1 = $(this).val() == null ? "" : $(this).val();

                if (id1 != null && id1 != undefined && val1 != null && val1 != undefined)
                    oArr[id1] = val1;

            }
            catch (e) { console.log(e); }
        });


        $("*[id]").each(function () {
            try {
                var id = $(this).attr('id');
                var val = $(this).val() == null ? "" : $(this).val();
                if (id != null && id != undefined && val != null && val != undefined && oArr.hasOwnProperty(id) == false)
                oArr[id] = val;
            } catch (e) {

            }
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

function setValToTxt(id, val) {
    try{
        $('#' + id).val((val != null && val != "" && val != undefined) ?val :"");
    }catch(e){}
}
function setValToComb(id, val) {
    try {
        $('#' + id).val((val != null && val !="" && val != undefined) ? val : "");
       // $('#' + id + ' option[value=' + val + ']').prop("selected", true);
    } catch (e) { }
}
//chuyen gia null
function SetValnull(val) {
    try{
        if (val == null || val == 'null') {
            return '-';
        } else {
            return val;
        }
    } catch (e) {
        console.log(e);
    }
}
// set hai ngay voi nhau
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
        ////console.log(e);
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

//  lấy ngày hiện tại lùi 1 tuần
function gettimenowweek() {
    try {
        var myDate = new Date();
        var t = new Date(myDate.getTime() - (60 * 60 * 24 * 7 * 1000));
        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = d + "/" + m + "/" + y;
        return tt;

    } catch (e) {
        //console.log(e);
        return "";
    }
}

function gettimenow_cscthang() {
    try {
        var t = new Date();
        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt =  m + "/" + y;
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
        console.log(jsonpara);
        $.ajax({
            url: urli + "/api/excelsqlexcute" ,
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                window.location = urli + "/api/excelsqlexcute/" + config.userid;
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


function api_excuteExcel_New(config, para,table, colum) {
    try {
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para), table: JSON.stringify(table) ,colum: JSON.stringify(colum), userid: config.userid };
        console.log(jsonpara);
        $.ajax({
            url: urli + "/api/ExcelExport_DatabaseSql",
            type: 'POST',
            data: jsonpara,
            async: false,
            success: function (data) {
                window.location = urli + "/api/ExcelExport_DatabaseSql/" + config.userid;
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

// Xuất execl theo nhiều kết quả trả ra.
// Lấy ra dữ liệu theo từng kết quả riêng
// luu log
// localStorage.setItem("para_xemchitiet", JSON.stringify(lst.data[1].kq1));
//chuyendoilog
// var para = JSON.parse(localStorage.getItem("para_xemchitiet"));
// var dt = '{ "data": ' + JSON.stringify(para) + ' }';
// excuteExcelHaveData(config,JSON.parse(dt), colum, true);
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
                console.log(data);
                window.location = urli + '/home/DownloadXml/' + config.namefile;
            },
            complete: function (data) {
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    } catch (e) {
        //console.log(e);
        return "";
    }
}

// inpot excel

function f_importExcel(config, fd) {
    try
    {
    var lstData = null;
    $.ajax({
        type: 'POST',
        url: urli + '/home/ReadExcel',
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
            lstData = data == null || data == "" ? "[]" : JSON.parse(data);

            if (config.callback != null && config.callback != '') {
                ////console.log("calllbackkk");
                ////console.log(config.callback);
                funExeItem(config.callback, config, '[]', lstData);
            }
        }
    });
    } catch (e) { console.log(e);}
}

//up load file bất kỳ

function f_UploadFileAny(config, fd) {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: urli + '/home/UploadFile',
            data: fd,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
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
    try
    {
    var lstData = null;
    $.ajax({
        type: 'POST',
        url: urli + '/home/ReadFileXml',
        data: fd,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
            // //console.log(data);
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
function ExecuteBulkCopyDatatable_Sql(config, para,  table) {
    try {
        var jsonpara = { config: JSON.stringify(config),para :JSON.stringify(para), table: JSON.stringify(table) };
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
    try{
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
function f_getCacheForAll()
{
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
        if (obj != null && obj != undefined && obj.length>0) {
           
            $.each(obj, function (key, val) {
                setValToTxt(val.id, val.value);
            });
       }

    } catch (e) {
        console.log(e);
    }
}

function remove_duplicates(objectsArray) {
    try
    {
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
    catch (e) { console.log(e);}
}


function api_uploadFileKmlAllToOracle(config, fd) {
    try {
        var lstData = null;
        $.ajax({
            type: 'POST',
            url: urli + '/ReadFileKml/readKml',
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

function api_ExecuteTcpString(config, para) {
    try {

        if (config == null || config == undefined) {
            return "[]";
        }
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        ////console.log(jsonpara);
        if (config.callback != null && config.callback != '')
            syns = true;

        $.ajax({
            url: urli + "/api/TCP_OverServiceTcpString",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                try {
                    console.log(data);
                    if (config.callback != null && config.callback != '') {                       
                        funExeItem(config.callback, config, para, data);
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


    } catch (e) {
        ////console.log(e);

        return null;
    }
}


function api_ExecuteTcpByte(config, para) {
    try {

        if (config == null || config == undefined) {
            return "[]";
        }
        var jsonpara = { config: JSON.stringify(config), para: JSON.stringify(para) };
        var syns = false;
        ////console.log(jsonpara);
        if (config.callback != null && config.callback != '')
            syns = true;

        $.ajax({
            url: urli + "/api/TCP_OverServiceTcpByte",
            type: "POST",
            data: jsonpara,
            async: syns,
            success: function (data, textStatus, jqXHR) {
                try {
                    console.log(data);
                    var lst = f_convertHexToByte(data)
                    console.log(lst);
                    //if (config.callback != null && config.callback != '') {
                    //    funExeItem(config.callback, config, para, data);
                    //}
                } catch (e) {
                    console.log(e);
                }
            },
            complete: function () {
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


    } catch (e) {
        ////console.log(e);

        return null;
    }
}

function stringToAsciiByteArray(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i).toString(16));
    }
    return result;
}

function f_convertByteToHex(bytes)
{
    try {
        var hexx = [];
        $.each(bytes, function (key,val) {
            hexx.push(val.toString(16));
        })
    } catch (e) { console.log(e);}
}

function f_convertHexToByte(str) {
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
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