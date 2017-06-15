using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ExcelExport_DatabaseSqlController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce;
        // GET api/ExcelExport_DatabaseSql
        public string Get()
        {
            return "ok";
        }

        // GET api/ExcelExport_DatabaseSql/5
        public string Get(string id)
        {
            try
            {

                if (id ==null || id=="undefind"|| id=="")
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại userid\"}]}";
               
                var user = id;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                var table = _dicPara_exsql1["StrTable_SqlExcute" + user];
                var lst = JObject.Parse(_dicPara_exsql1["StrColumnNames_SqlExcute" + user]).SelectToken("kq").ToString();
                var LstColumnNames = JsonConvert.DeserializeObject<List<ListColumnExport>>(lst);
                
                if (dicAppSet == null || dicAppSet.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";

                gnSqlNomal gns = new gnSqlNomal();
                var dicConfig = gns.convertConfigToDic(_dicPara_exsql1["StrConfig_SqlExcute" + user]);
                var dicPara = gns.convertParaToDic(_dicPara_exsql1["StrPara_SqlExcute" + user]);
                _dicPara_exsql1.Remove("StrPara_SqlExcute" + user);
                _dicPara_exsql1.Remove("StrConfig_SqlExcute" + user);
                _dicPara_exsql1.Remove("StrColumnNames_SqlExcute" + user);
                _dicPara_exsql1.Remove("StrTable_SqlExcute" + user);

                gnExcel exx = new gnExcel();
                gnSql sql = new gnSql();

                DataSet ds = null;
                if (table != "")
                {
                    var tableJson = JObject.Parse(table);
                    if (tableJson == null)
                        return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                    foreach (var val in tableJson)
                    {
                        var dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                        ds = sql.BulkCopyToSqlDataset(dt, dicConfig, dicPara);

                        if (ds == null || ds.Tables.Count == 0)
                            return "{\"result\":\"OK\",\"data\":[{\"status\":\"Không có dữ liệu xuất excel\"}]}";
                        for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
                        {
                            ds.Tables[0].Columns[i].ColumnName = ds.Tables[0].Columns[i].ColumnName.ToLower();
                        }
                        exx.ExporttoExcel(new List<string>(), ds.Tables[0], LstColumnNames, dicConfig.ContainsKey("namefile") ? dicConfig["namefile"] : "" + DateTime.Now.ToString("dd-MM-yyyy"), 1, false, true);
                    }
                }
                else
                {
                    var paraSql = gn.ConvertDicToSqlPara(dicPara);

                    ds = sql.DynamicSelectDataset(dicConfig["namesql"], (paraSql == null ? null : paraSql), CommandType.StoredProcedure, dicAppSet[dicConfig["connstr"].ToLower()]);
                    if (ds == null || ds.Tables.Count == 0)
                        return "{\"result\":\"OK\",\"data\":[{\"status\":\"Không có dữ liệu xuất excel\"}]}";
                    for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
                    {
                        ds.Tables[0].Columns[i].ColumnName = ds.Tables[0].Columns[i].ColumnName.ToLower();
                    }
                    exx.ExporttoExcel(new List<string>(), ds.Tables[0], LstColumnNames, dicConfig.ContainsKey("namefile") ? dicConfig["namefile"] : "" + DateTime.Now.ToString("dd-MM-yyyy"), 1, false, true);
                }
                return "";

            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        public static Dictionary<string, string> _dicPara_exsql1 = new Dictionary<string, string>();
        public string Post(ValueExcelSqlXcuteTable value)
        {

            try
            {
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                _dicPara_exsql1.Add("StrPara_SqlExcute" + value.userid, value.para);
                _dicPara_exsql1.Add("StrConfig_SqlExcute" + value.userid, value.config);
                _dicPara_exsql1.Add("StrColumnNames_SqlExcute" + value.userid, value.colum);
                _dicPara_exsql1.Add("StrTable_SqlExcute" + value.userid, value.table == null ? "" : value.table);
                return "";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
           
        }
        // PUT api/excelsqlexcute/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/excelsqlexcute/5
        public void Delete(int id)
        {
        }
    }
    public class ValueExcelSqlXcuteTable
    {
        public string config { get; set; }
        public string para { get; set; }
        public string table { get; set; }
        public string colum { get; set; }
        public string userid { get; set; }
    }
   
}
