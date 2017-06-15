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
    public class ExcelExportTableController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce;
        // GET api/ExcelExportTable
        public string Get()
        {
            return "ok1";
        }

        // GET api/ExcelExportTable/5
        public string Get(string id)
        {
            try
            {
                if (id=="")
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại userid\"}]}";
              
                var user = id;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                var lst = JObject.Parse(_dicPara_table["StrTableColumnNames" + user]).SelectToken("kq").ToString();
                var LstColumnNames = JsonConvert.DeserializeObject<List<ListColumnExport>>(lst);
                
                var dicConfig = gn.ConfigConvertToDicConfig(_dicPara_table["StrTableConfig" + user]);
                DataTable dt = null;
                foreach (var val in JObject.Parse(_dicPara_table["StrTableData" + user]))
                {
                    dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                }
                if (dt == null )
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
                _dicPara_table.Remove("StrTableColumnNames" + user);
                _dicPara_table.Remove("StrTableConfig" + user);
                _dicPara_table.Remove("StrTableData" + user);

                gnExcel exx = new gnExcel();

                exx.ExporttoExcel(new List<string>(), dt, LstColumnNames, dicConfig.ContainsKey("namefile") ? dicConfig["namefile"] : "" + DateTime.Now.ToString("dd-MM-yyyy"), 1, false, true);
                return "";

            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }
        public static Dictionary<string, string> _dicPara_table = new Dictionary<string, string>();
        public string Post(dataExcel value)
        {

            try
            {
                _dicPara_table= new Dictionary<string, string>(); 
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                _dicPara_table.Add("StrTableData" + value.userid, value.para);
                _dicPara_table.Add("StrTableConfig" + value.userid, value.config);
                _dicPara_table.Add("StrTableColumnNames" + value.userid, value.colum);
                return "";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
           
        }
        // PUT api/ExcelExportTable/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/ExcelExportTable/5
        public void Delete(int id)
        {
        }
    }
    public class dataExcel
    {
        public string config { get; set; }
        public string para { get; set; }
        public string colum { get; set; }
        public string userid { get; set; }
    }
   
}
