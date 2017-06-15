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
    

    public class InportFileXmlToOracleController : Controller
    {
        public string InportXmlToOrcale()
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

                var insertTo = parr["insertto"];
                var connstr = parr["connstr"];
                parr.Remove("insertto");
                parr.Remove("connstr");

                // CHUYEN SANG DATASET
                var ds = new DataSet();
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(filePath);
                var xmlReader = new XmlNodeReader(xmlDoc);
                ds.ReadXml(xmlReader);
                var ds1 = gn.convertDatasetToLower(ds);

                var dt = new DataTable("dt");
                foreach (var val in parr)
                {
                    dt.Columns.Add(val.Key);
                }

                foreach(DataRow row in ds1.Tables[0].Rows)
                {
                   var dr = dt.NewRow();                   
                    foreach (var val in parr)
                    {
                        dr[val.Key] = row[val.Key];                        
                    }
                    dt.Rows.Add(dr);
                }

                // bulk copy to oracle
                gnOracle gnOr = new gnOracle();
                string connectOracle = ConfigurationManager.ConnectionStrings[connstr].ConnectionString;
                using (var connection = new OracleConnection(connectOracle))
                {
                    connection.Open();
                    using (var bulkCopy = new OracleBulkCopy(connection, OracleBulkCopyOptions.UseInternalTransaction))
                    {

                        bulkCopy.DestinationTableName = insertTo;
                        var table = gnOr.potentialFix(dt);
                        bulkCopy.WriteToServer(table);
                    }
                }


                return "{\"result\":\"OK\",\"data\":[{\"status\":\"OK\"}]}";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }

        }
        
    }
}