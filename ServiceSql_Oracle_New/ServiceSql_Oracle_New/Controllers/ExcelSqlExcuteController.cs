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
    public class ExcelSqlExcuteController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce;
        // GET api/excelsqlexcute
        public string Get()
        {
            return "ok";
        }

        // GET api/excelsqlexcute/5
        public string Get(string id)
        {
            try
            {
                if (id ==null || id=="undefind"|| id=="")
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại userid\"}]}";
               
                var user = id;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                var lst = JObject.Parse(_dicPara_exsql["StrColumnNames_SqlExcute" + user]).SelectToken("kq").ToString();
                var LstColumnNames = JsonConvert.DeserializeObject<List<ListColumnExport>>(lst);
                
                if (dicAppSet == null || dicAppSet.Count == 0)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";
                
                gnSqlNomal gns = new gnSqlNomal();
                var dicConfig = gns.convertConfigToDic(_dicPara_exsql["StrConfig_SqlExcute" + user]);
                var dicPara = gns.convertParaToDic(_dicPara_exsql["StrPara_SqlExcute" + user]);
                _dicPara_exsql.Remove("StrPara_SqlExcute" + user);
                _dicPara_exsql.Remove("StrConfig_SqlExcute" + user);
                _dicPara_exsql.Remove("StrColumnNames_SqlExcute" + user);

                gnSql sql = new gnSql();
                gnExcel exx = new gnExcel();

               var paraSql=  gn.ConvertDicToSqlPara(dicPara);
                
                var ds = sql.DynamicSelectDataset(dicConfig["namesql"],(paraSql == null ?null: paraSql), CommandType.StoredProcedure, dicAppSet[dicConfig["connstr"].ToLower()]);
                if (ds == null || ds.Tables.Count == 0)
                    return "{\"result\":\"OK\",\"data\":[{\"status\":\"Không có dữ liệu xuất excel\"}]}";
                for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
                {
                    ds.Tables[0].Columns[i].ColumnName = ds.Tables[0].Columns[i].ColumnName.ToLower();
                }
                exx.ExporttoExcel(new List<string>(), ds.Tables[0], LstColumnNames, dicConfig.ContainsKey("namefile") ? dicConfig["namefile"] : "" + DateTime.Now.ToString("dd-MM-yyyy"), 1, false, true);
                return "";

            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        public static Dictionary<string, string> _dicPara_exsql = new Dictionary<string, string>();
        public string Post(ValueExcelSqlXcute value)
        {

            try
            {
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                _dicPara_exsql.Clear();
                _dicPara_exsql.Add("StrPara_SqlExcute" + value.userid, value.para);
                _dicPara_exsql.Add("StrConfig_SqlExcute" + value.userid, value.config);
                _dicPara_exsql.Add("StrColumnNames_SqlExcute" + value.userid, value.colum);
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
    public class ValueExcelSqlXcute
    {
        public string config { get; set; }
        public string para { get; set; }
        public string colum { get; set; }
        public string userid { get; set; }
    }
   
}
