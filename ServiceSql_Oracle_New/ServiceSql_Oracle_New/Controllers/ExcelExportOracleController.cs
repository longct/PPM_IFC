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
using System.Web;

namespace ServiceSql_Oracle_New.Controllers
{
    public class ExcelExportOracleController : ApiController
    {

        // GET api/ExcelExportOracle
        public string Get()
        {
          
            return "";
        }


        // GET api/ExcelExportOracle/5
        public string Get(string idrandom)
        {
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();
            var lst = JObject.Parse(_dicPara_exoracle["StrColumnNames" + idrandom ]).SelectToken("kq").ToString();
            var LstColumnNames = JsonConvert.DeserializeObject<List<ListColumnExport>>(lst);
            
            // lay du lieu
            gnOracle or = new gnOracle();

            if (dicAppSet == null || dicAppSet.Count == 0)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";

            var dicPara = gn.ParaConvertDicPara(_dicPara_exoracle["StrPara"+ idrandom]);
            var dicConfig = gn.ConfigConvertToDicConfig(_dicPara_exoracle["StrConfig" + idrandom]);
            _dicPara_exoracle.Remove("StrPara" + idrandom);
            _dicPara_exoracle.Remove("StrConfig" + idrandom);
            _dicPara_exoracle.Remove("StrColumnNames" + idrandom);

            if (dicPara == null && dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

            var dsParaOnSql = or.DecodeProceduePara_New(dicConfig, dicAppSet);
            var paraOk = or.dicParaToOraclePara_New(dsParaOnSql, dicPara);

            var ds = or.ExcuteReturnDataSet(dicConfig["namesql"], paraOk.ToList(), CommandType.StoredProcedure, dicAppSet[dicConfig["connstr"].ToLower()]);
            if (ds == null || ds.Tables.Count == 0 )
                return "";
            var ds1 = gn.convertDatasetToLower(ds);

            gnExcel exx = new gnExcel();

            var idtable = 0;
            if (dicConfig.ContainsKey("exporttable"))
                idtable = Convert.ToInt32(dicConfig["exporttable"]);

            exx.ExporttoExcel(new List<string>(), ds1.Tables[idtable], LstColumnNames, dicConfig.ContainsKey("namefile") ? dicConfig["namefile"] : "" + DateTime.Now.ToString("dd-MM-yyyy"), 1, false, true);
            return "";

        }

        public static Dictionary<string, string> _dicPara_exoracle = new Dictionary<string, string>();
        public string Post(ValueExportExcel value)
        {
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();
            _dicPara_exoracle.Add("StrPara" + value.idrandom , value.para);
            _dicPara_exoracle.Add("StrConfig" + value.idrandom , value.config);
            _dicPara_exoracle.Add("StrColumnNames" + value.idrandom, value.colum);
            return "";
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

    public class ValueExportExcel
    {
        public string config { get; set; }
        public string para { get; set; }
        public string colum { get; set; }
        public string idrandom { get; set; }
    }

}
