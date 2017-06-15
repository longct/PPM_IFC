using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Word = Microsoft.Office.Interop.Word;
using System.IO;
using Newtonsoft.Json.Linq;

namespace ServiceSql_Oracle_New.Controllers.General
{
    public class CreateFile_WordController : ApiController
    {
        // GET: api/CreateFile_Word
        public IEnumerable<string> Get()
        {
            

            return new string[] { "value1", "value2" };
        }

        // GET: api/CreateFile_Word/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CreateFile_Word
        public string Post(exportWord value)
        {
            try
            {
                Dictionary<string, string> dicAppSet;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                if (dicAppSet == null || dicAppSet.Count == 0)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";


                var dicPara = gn.ParaConvertDicPara(value.para);
                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if (dicPara == null && dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";


                var filemau = dicAppSet["hddt_path_filetemplate"] + dicConfig["filemau"];                
                WordUltil word = new WordUltil(filemau, false);
                word.WriteFields(dicPara);
                
                var pathcreat =  dicAppSet["path_saveonserver"];
                
                var filecreat = pathcreat +  dicConfig["filecreat"];

                //try
                //{
                //    if (value.dt1 != null)
                //    {
                //        var dt1 = JObject.Parse(value.dt1);
                //        if (dt1 != null)
                //            foreach (var val in dt1)
                //            {
                //                var dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                //                if (dt != null && dt.Rows.Count > 0)
                //                    word.WriteTable(dt, Convert.ToInt32(dicConfig["dt1index"]));
                //            }
                //    }
                //}
                //catch { }


                //try
                //{
                //    if (value.dt2 != null)
                //    {
                //        var dt1 = JObject.Parse(value.dt2);
                //        if (dt1 != null)
                //            foreach (var val in dt1)
                //            {
                //                var dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                //                if (dt != null && dt.Rows.Count > 0)
                //                    word.WriteTable(dt, Convert.ToInt32(dicConfig["dt2index"]));
                //            }
                //    }
                //}
                //catch { }

                //try
                //{
                //    if (value.dt3 != null)
                //    {
                //        var dt1 = JObject.Parse(value.dt3);
                //        if (dt1 != null)
                //            foreach (var val in dt1)
                //            {
                //                var dt = gn.ConvertJsonToDataTable(val.Value.ToString(), val.Key);
                //                if (dt != null && dt.Rows.Count > 0)
                //                    word.WriteTable(dt, Convert.ToInt32(dicConfig["dt3index"]));
                //            }
                //    }
                //}
                //catch { }
                word.SaveToFile(filecreat);
                return "{\"result\":\"ok\",\"data\":\""+ filecreat + "\"}";
            }
            catch(Exception ex) { return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}"; }
        }

        // PUT: api/CreateFile_Word/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CreateFile_Word/5
        public void Delete(int id)
        {
        }
    }
    public class exportWord
    {
        public string config { get; set; }
        public string para { get; set; }
        public string dt1 { get; set; }
        public string dt2 { get; set; }
        public string dt3 { get; set; }
    }
}
