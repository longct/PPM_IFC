using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WordToPDF;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Convert_WordToPdfController : ApiController
    {
        // GET: api/Convert_WordToPdf
        public IEnumerable<string> Get()
        {

            return new string[] { "value1", "value2" };
        }

        // GET: api/Convert_WordToPdf/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Convert_WordToPdf
        public string Post(WordToPdf value)
        {
            try
            {
                Dictionary<string, string> dicAppSet;
                general gn = new general();
                dicAppSet = gn.ReadAppseting();
                if (dicAppSet == null || dicAppSet.Count == 0)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Đọc appsetting lỗi\"}]}";

                var dicConfig = gn.ConfigConvertToDicConfig(value.config);
                if (dicConfig == null)
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";

                var pathFrom = dicConfig["fromfile"];
                if (pathFrom.EndsWith(".doc") || pathFrom.EndsWith(".docx"))
                {
                   
                    var pathTo = pathFrom.Replace(".docx", ".pdf").Replace(".doc", ".pdf");
                    Word2Pdf objWorPdf = new Word2Pdf();
                    objWorPdf.InputLocation = pathFrom;
                    objWorPdf.OutputLocation = pathTo;
                    objWorPdf.Word2PdfCOnversion();

                    return "{\"result\":\"OK\",\"data\":\"" + pathTo + "\"}";
                }
                else
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại định dạng json đầu vào\"}]}";
            }
            catch(Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message.Replace("\n", "") + "\"}]}";
            }
        }

        // PUT: api/Convert_WordToPdf/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Convert_WordToPdf/5
        public void Delete(int id)
        {
        }
    }
    public class WordToPdf{
        public string config { get; set; }
    }
}
