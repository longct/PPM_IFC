$(document).ready(function () {
    try {
        var str = "Hello World!";
        var bytes = stringToAsciiByteArray(str);
        console.log(bytes);
        // f_convertByteToHex(bytes);
        var thu = f_convertHexToByte("434f4e4e45435433");
        console.log(thu);
    } catch (e) { console.log(e); }
});

//function stringToAsciiByteArray(str) {
//    try {
//        var bytes = [];
//        for (var i = 0; i < str.length; ++i) {
//            var charCode = str.charCodeAt(i);
//            if (charCode > 0xFF)  // char > 1 byte since charCodeAt returns the UTF-16 value
//            {
//                throw new Error('Character ' + String.fromCharCode(charCode) + ' can\'t be represented by a US-ASCII byte.');
//            }
//            bytes.push(charCode);
//        }
//        return bytes;
//    } catch (e) { console.log(e); }
//}




//// gui string nhan string
//function f_Connect() {
//    try {
//        var config = {
//            namefile: "thu.txt"
//        };
//        var para = {
//            type: "connect",
//            ip: "113.160.233.157",
//            port: "8015"
//        };
//        api_ExecuteTcpString(config, para);

//    } catch (e) { console.log(e); }
//}
//function f_CheckConnect() {
//    try {
//        var config = {
//            namefile: "thu.txt"
//        };
//        var para = {
//            type: "checkconnect"
//        };
//        api_ExecuteTcpString(config, para);
//    } catch (e) { console.log(e); }
//}

//function f_GuiLenh() {
//    try {
//        var config = {
//            namefile: "thu.txt"
//        };
//        var para = {
//            type: "sendstring",
//            data: "#0000000000000009+CSQ:IFCMASTER#"
//        };
//        api_ExecuteTcpString(config, para);
//    } catch (e) { console.log(e); }
//}

//function f_NhanKetQua() {
//    try {
//        var config = {
//            namefile: "thu.txt"
//        };
//        var para = {
//            type: "receive"
//        };
//        api_ExecuteTcpString(config, para);
//    } catch (e) { console.log(e); }
//}


// gui byte
function f_Connect() {
    try {
        var config = {
            namefile: "thu.txt"
        };
        var para = {
            type: "connect",
            ip: "113.160.233.157",
            port: "8015"
        };
        api_ExecuteTcpString(config, para);

    } catch (e) { console.log(e); }
}
function f_CheckConnect() {
    try {
        var config = {
            namefile: "thu.txt"
        };
        var para = {
            type: "checkconnect"
        };
        api_ExecuteTcpString(config, para);
    } catch (e) { console.log(e); }
}

function f_GuiLenh() {
    try {
        var config = {
            namefile: "thu.txt"
        };
        var para = {
            type: "sendbyte",
            data: stringToAsciiByteArray("#0000000000000009+CSQ:IFCMASTER#")
        };
        api_ExecuteTcpByte(config, para);
    } catch (e) { console.log(e); }
}

function f_NhanKetQua() {
    try {
        var config = {
            namefile: "thu.txt"
        };
        var para = {
            type: "receive"
        };
        api_ExecuteTcpByte(config, para);
    } catch (e) { console.log(e); }
}



function f_insertCaFile_test(thiss) {
    try {
        // var p = getAllIdMod();
        idram_nhacso = Math.random().toString(36).substr(2);

        var fdata = new FormData();
        var files = $('#txt_file_ncsxml')[0].files[0];
        fdata.append("file", files);

        var config = { callback: "f_result_insertCaFile_test" };
        api_uploadFileKmlAllToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}
function f_result_insertCaFile_test(config, para, lst) {
    console.log(lst);
}





//function Xuatexecl_bangvttb() {
//    try {
//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = {
//            namesql: "TB_BAOCAO_XUATDUANTOINGAY",
//            namefile: "Bao_Cao_vat_tu_thiet_bi",
//            connstr: "ConnectEMS",
//            userid: userInfo.userid
//        };
//        var para = JSON.parse(localStorage.getItem("loadbang_bangvttb"));
//        para.v_page = -1;
//        var colum = {
//            kq: [{ field: "rownum", name: "Stt", type: "TextAndBoldCenter" },
//               { field: "tenvattu", name: "Tên vật tư", type: "TextAndBoldCenter" },
//               { field: "mavattu", name: "Mã vật tư", type: "TextAndBoldCenter" },
//               { field: "sldaxuatdenngay", name: "Số lượng đã xuất", type: "TextAndBoldCenter" },
//               { field: "slnhapthuhoi", name: "Nhập thu hồi", type: "TextAndBoldCenter" },
//               { field: "slxuatduan", name: "Xuất dự án ", type: "TextAndBoldCenter" },
//               { field: "cong", name: "Cổng", type: "TextAndBoldCenter" }]
//        };
//        excuteExcel(config, para, colum, true);


//    } catch (e) {
//        console.log(e);
//    }
//}