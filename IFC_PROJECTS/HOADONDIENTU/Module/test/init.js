$(document).ready(function () {
    console.log("vvvvvvv");
    $("#btn_Test").click(function () {

        window.open("http://localhost:22660/home/DownloadFileSaveOnServer/tao file nhe.docx");
        return;

      //   vi du xuat file word
        var config = {
            filemau: "MAU_HOP_DONG.dotx",
            filecreat: "tao file nhe.docx"
        };
        var para = {
            ngay: "08",
            thang: "09",
            nam: "2016",
            daidienbena:"ĐINH QUỐC CƯỜNG"
        }
        ExecuteCreateFileWord(config, para);

        //============================================================================================
        // vi du convert pdf toi word

        //var config = { fromfile: "H:\\ChuKyDienTu\\tao file nhe.docx" };
        //var result = ExecuteConvert_WordToPdf(config);
        //console.log(result);

        ////============================================================================================
        //// vi du convert html toi word

        var config = {
            fromUrl: "http://xangdau.infras.com.vn:1003/OneDl.html",
            nameFile:"thu.docx"
        };
        var result = ExecuteConvert_HtmlToWord(config);
        console.log(result);


        //============================================================================================
        // vi du convert html toi xml

        var config = {
            fromUrl: "http://www.w3schools.com/xml/cd_catalog_with_css.xml",
            nameFile: "thu.xml"
        };
        var result = ExecuteConvert_HtmlToXml(config);
        console.log(result);

        //============================================================================================
        // vi du convert html toi pdf

        var config = {
            contentHtml: "<div>Cường thử nhé</div>",
            nameFile: "thu.pdf"
        };
        var result = ExecuteConvert_HtmlToPdf(config);
        console.log(result);

    });

});