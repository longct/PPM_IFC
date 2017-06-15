$(document).ready(function () {
    console.log("vvvvvvv");
    $("#btn_Test").click(function () {
        
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.LSTKHACHHANG",namefile:"thu"};
        var para = [];
        var colum = {
            kq: [{ field: "makhachhang", name: "Mã khách hàng", type: "TextAndBoldCenter" },
               { field: "tenkhachhang", name: "Tên khách hàng", type: "TextAndBoldCenter" }
            ]};
        ExecuteExportExcelOracle(config, para, colum);


    });

    $("#btn_Test1").click(function () {
        f_removeValidateAll();
    });

});

