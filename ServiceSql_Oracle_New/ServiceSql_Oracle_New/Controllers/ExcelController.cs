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
    public class ExcelController : ApiController
    {
        Dictionary<string, string> dicAppSet;
        Dictionary<string, string> dicProce; 
        // GET api/excel
        public string Get()
        {
            return "ok";
        }

        // GET api/excel/5
        public string Get(string id)
        {
            try
            {
                if (id=="")
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại userid\"}]}";
                var user = id;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                var lst = JObject.Parse(_dicPara_exnom["StrColumnNames" + user]).SelectToken("kq").ToString();
                var LstColumnNames = JsonConvert.DeserializeObject<List<ListColumnExport>>(lst);
                if (dicAppSet == null || dicAppSet.Count == 0)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";

                var lstPara = gn.ParaConvertListPara(_dicPara_exnom["StrPara" + user]);
                var dicConfig = gn.ConfigConvertToDicConfig(_dicPara_exnom["StrConfig" + user]);
                if (lstPara == null && dicConfig == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                _dicPara_exnom.Remove("StrPara" + user);
                _dicPara_exnom.Remove("StrConfig" + user);
                _dicPara_exnom.Remove("StrColumnNames" + user);

                gnOracle orl = new gnOracle();
                gnExcel exx = new gnExcel();

               // var dtPara = orl.DecodeProceduePara(lstPara, dicConfigOk, dicAppSet);
                var dtPara = orl.DecodeProceduePara(lstPara, dicConfig, dicAppSet);
                var lstPrOrl = orl.dicParaToOraclePara(dtPara == null || dtPara.Tables.Count == 0 ? null : dtPara.Tables[0], lstPara);

                var ds = orl.ExcuteReturnDataSet(dicConfig["namesql"],(lstPrOrl ==null ?null: lstPrOrl), CommandType.StoredProcedure, dicAppSet[dicConfig["connstr"].ToLower()]);
                if (ds == null || ds.Tables.Count == 0) 
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Không có dữ liệu xuất excel\"}]}";
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

        public static Dictionary<string, string> _dicPara_exnom = new Dictionary<string, string>();
        public string Post(ValueExcel value)
        {

            try
            {
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                _dicPara_exnom.Add("StrPara" + value.userid, value.para);
                _dicPara_exnom.Add("StrConfig" + value.userid, value.config);
                _dicPara_exnom.Add("StrColumnNames" + value.userid, value.colum);
                
                return "";
            }
            catch (Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
           
        }
        // PUT api/excel/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/excel/5
        public void Delete(int id)
        {
        }
    }
    public class ValueExcel
    {
        public string config { get; set; }
        public string para { get; set; }
        public string colum { get; set; }
        public string userid { get; set; }
    }
   
}
