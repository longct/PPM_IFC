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
using System.Web.Mvc;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Xml_ExportOracleController : ApiController
    {

        // GET api/Xml_ExportOracle
        public string Get()
        {
            return "";
        }
        

        
        // GET api/Xml_ExportOracle/5
        public HttpResponseMessage Get(string idrandom)
        {
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();
            var lst = JObject.Parse(_dicPara_xml["StrColumnNames" + idrandom]).SelectToken("kq").ToString();
            var LstColumnNames = JsonConvert.DeserializeObject<List<ListColumnExport>>(lst);
            
            // lay du lieu
            gnOracle or = new gnOracle();

            if (dicAppSet == null || dicAppSet.Count == 0)
                return null;

            var dicPara = gn.ParaConvertDicPara(_dicPara_xml["StrPara" + idrandom]);
            var dicConfig = gn.ConfigConvertToDicConfig(_dicPara_xml["StrConfig" + idrandom]);
            if (dicPara == null && dicConfig == null)
                return null;
            _dicPara_xml.Remove("StrPara" + idrandom);
            _dicPara_xml.Remove("StrConfig" + idrandom);
            _dicPara_xml.Remove("StrColumnNames" + idrandom);

            var dsParaOnSql = or.DecodeProceduePara_New(dicConfig, dicAppSet);
            var paraOk = or.dicParaToOraclePara_New(dsParaOnSql, dicPara);

            var ds = or.ExcuteReturnDataSet(dicConfig["namesql"], paraOk.ToList(), CommandType.StoredProcedure, dicAppSet[dicConfig["connstr"].ToLower()]);
            if (ds == null || ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0)
                return null;
            var ds1 = gn.convertDatasetToLower(ds);

            string filePath = dicAppSet["path_saveonserver"] + dicConfig["namefile"]  +".xml";
            System.IO.StreamWriter xmlSW = new System.IO.StreamWriter(filePath);
            ds1.WriteXml(xmlSW, XmlWriteMode.WriteSchema);
            xmlSW.Close();

            var response = new HttpResponseMessage();
            FileStream fileStream = File.Open(filePath,FileMode.Open);
            
            response.Content = new StreamContent(fileStream);
            response.Content.Headers.ContentDisposition
                              = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = dicConfig["namefile"] + ".xml";
            response.Content.Headers.ContentType
                             = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            
            response.Content.Headers.ContentLength
                             = fileStream.Length;
            return response;

            //return System.Web.Mvc.Controller.(filePath, MimeMapping.GetMimeMapping(filePath));

        }
        public static Dictionary<string, string> _dicPara_xml = new Dictionary<string, string>();
        public string Post(ValueExportXml value)
        {
            general gn = new general();
            var dicAppSet = gn.ReadAppseting();

            _dicPara_xml.Add("StrPara" + value.idrandom, value.para);
            _dicPara_xml.Add("StrConfig" + value.idrandom, value.config);
            _dicPara_xml.Add("StrColumnNames" + value.idrandom, value.colum);
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

    public class ValueExportXml
    {
        public string config { get; set; }
        public string para { get; set; }
        public string colum { get; set; }
        public string idrandom { get; set; }
    }

}
