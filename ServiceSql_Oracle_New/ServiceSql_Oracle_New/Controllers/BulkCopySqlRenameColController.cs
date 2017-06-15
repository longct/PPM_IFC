using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class BulkCopySqlRenameColController : ApiController
    {
        // GET: api/BulkCopySqlRenameCol
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BulkCopySqlRenameCol/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BulkCopySqlRenameCol
        public string Post(paraBulkTableSqlRename value)
        {
            try
            {
                general gn = new general();
                var json = "";
                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if (dicConfig == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                var table = JObject.Parse(value.table);
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

                // thay doi ten cot
                for (var c = 0; c < dt.Columns.Count; c++)
                {
                    dt.Columns[c].ColumnName = "Col" + c;
                }
                var nextCol = dt.Columns.Count;
                // ADD THEM COT RONG VAO BANG. CHO DU 30 COT
                for (var j = nextCol; j < 50; j++)
                {
                    try
                    {
                        DataColumn myColumn = new DataColumn();
                        myColumn.Caption = "Col" + j;
                        myColumn.ColumnName = "Col" + j;
                        myColumn.DefaultValue = "";
                        dt.Columns.Add(myColumn);
                    }
                    catch (Exception ex) { }
                }
                gnSql sql = new gnSql();
                json = sql.BulkCopyToSqlNoLower(dt, dicConfig, para);
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
    public class paraBulkTableSqlRename
    {
        public string table { get; set; }
        public string config { get; set; }
        public string para { get; set; }
    }
}
