using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ExportXmlController : ApiController
    {
        // GET: api/ExportXml
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ExportXml/5
        public string Get(int id)
        {
            return "ok";
        }

        // POST: api/BulkCopySqlRenameCol
        public string Post(paraExportXml value)
        {
            try
            {
                general gn = new general();
                var json = "";
                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if (dicConfig == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                var table = JObject.Parse(value.para);
                if (table == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                gnSqlNomal gns = new gnSqlNomal();
                var para = gns.convertParaToDic(value.para);
                DataTable dt = new DataTable("dt");
                foreach (var val in table)
                {
                    dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);                 
                    break;
                }
                
                gn.ExportTable(dt, dicConfig);
                return json;
        }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/BulkCopySqlRenameCol/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BulkCopySqlRenameCol/5
        public void Delete(int id)
        {
        }

    }

    public class paraExportXml
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
