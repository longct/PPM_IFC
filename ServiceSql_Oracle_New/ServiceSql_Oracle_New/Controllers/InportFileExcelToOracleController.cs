using Newtonsoft.Json;
using Oracle.DataAccess.Client;
using SignLib;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace ServiceSql_Oracle_New.Controllers
{
    

    public class InportFileExcelToOracleController : Controller
    {
        public string InportExcelToOrcale()
        {
            try
            {
                general gn = new general();

                string fileName = "";
                
                    HttpPostedFileBase file = Request.Files[0]; //Uploaded file
                                                                //Use the following properties to get file's name, size and MIMEType
                    int fileSize = file.ContentLength;
                    fileName = file.FileName;
                    string mimeType = file.ContentType;
                    System.IO.Stream fileContent = file.InputStream;
                    if (!Directory.Exists(Server.MapPath("~/UploadFile/")))
                        Directory.CreateDirectory(Server.MapPath("~/UploadFile/"));

                    //To save file, use SaveAs method
                    string filePath = Server.MapPath("~/UploadFile/") + fileName;
                    file.SaveAs(filePath); //File will be saved in application root

                    var itemp = this.Request.Form;
                    var parr = new Dictionary<string, string>();
                    foreach (var key in itemp.AllKeys)
                    {
                        parr.Add(key.ToLower(), itemp[key]);
                    }
                    

                // CHUYEN SANG DATASET
                gnReadExcel ex = new gnReadExcel();
                var dt = ex.readfileExcel(filePath , parr["select"] + " ", " " + parr["where"]);

                // bulk copy to oracle
                if (dt == null)
                    return "{\"result\":\"OK\",\"data\":[{\"status\":\"Lỗi không đọc được file excel\"}]}";

                // add them 1 so cot
                DataColumn tenfile = new DataColumn("tenfile", typeof(System.String));
                tenfile.DefaultValue = fileName;
                DataColumn ngayup = new DataColumn("ngayup", typeof(System.String));
                ngayup.DefaultValue = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                DataColumn idrandom = new DataColumn("idrandom", typeof(System.String));
                idrandom.DefaultValue = parr["idrandom"];

                dt.Columns.Add(tenfile);
                dt.Columns.Add(ngayup);
                dt.Columns.Add(idrandom);

                // check bang neu chua ton tai thi tao bang
                gnOracle or = new gnOracle();
                general gns = new general();
                var dicAppSet = gns.ReadAppseting();

                var checkTonTai = "SELECT COUNT(1) TONTAI FROM USER_TABLES WHERE UPPER(TABLE_NAME) = UPPER('" + parr["insertto"] + "') ";
                var count = or.ExcuteReturnDataSet(checkTonTai, null, CommandType.Text, dicAppSet[parr["connstr"].ToLower()]);

                if (count != null && count.Tables.Count > 0 && count.Tables[0].Rows.Count > 0 && count.Tables[0].Rows[0]["TONTAI"].ToString() == "0")
                {
                    // TAO COT CHINH
                    var str = "CREATE TABLE " + parr["insertto"] + " ( ";
                    foreach (var col in dt.Columns)
                    {
                        str += " " + col.ToString().ToUpper() + " VARCHAR2(255),";
                    }

                    str = str.Substring(0, str.Length - 1) + " )  ";

                    or.ExcuteReturnDataSet(str, null, CommandType.Text, dicAppSet[parr["connstr"].ToLower()]);
                }

                // bulk copy to oracle
                gnOracle gnOr = new gnOracle();
                string connectOracle = dicAppSet[parr["connstr"].ToLower()];
                var dt2 = gnOr.forMartTable(dt, parr["insertto"], connectOracle);

                using (var connection = new OracleConnection(connectOracle))
                {
                    connection.Open();
                    using (var bulkCopy = new OracleBulkCopy(connection, OracleBulkCopyOptions.UseInternalTransaction))
                    {
                        bulkCopy.DestinationTableName = parr["insertto"];
                        var table = gnOr.potentialFix(dt2);
                        bulkCopy.WriteToServer(table);
                    }
                }


                return "{\"result\":\"OK\",\"data\":[{\"idrandom\":\"" + parr["idrandom"] + "\"}]}";

            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

        }
        
    }
}