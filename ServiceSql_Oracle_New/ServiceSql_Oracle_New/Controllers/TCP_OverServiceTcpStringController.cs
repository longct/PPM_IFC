using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Threading;

namespace ServiceSql_Oracle_New.Controllers
{
    public class TCP_OverServiceTcpStringController : ApiController
    {
        // GET: api/TCP_OverServiceTcp
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/TCP_OverServiceTcp/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/TCP_OverServiceTcp
        public string Post(classTcp value)
        {
            try
            {
                gnSqlNomal gn = new gnSqlNomal();
                general gns = new general();
                var dicAppSet = gns.ReadAppseting();

                if (value == null || value.config == null) return null;

                var config = gn.convertConfigToDic(value.config);
                var para = gn.convertParaToDic(value.para);

               
                var result = "";

                if (para["type"].ToLower() == "checkconnect" || para["type"].ToLower() == "receive")
                {
                    var pathReceive = dicAppSet["pathfoldertcpreceive"] + config["namefile"];
                    if (File.Exists(pathReceive))
                    {
                        var resultByte = File.ReadAllText(pathReceive).Replace("\r\n", "-0D-0A-");
                        byte[] data = Array.ConvertAll<string, byte>(resultByte.Substring(0, resultByte.Length-1).Split('-'), s => Convert.ToByte(s, 16));
                        result = System.Text.ASCIIEncoding.ASCII.GetString(data);
                        File.Delete(pathReceive);
                    }
                    else
                        return "";
                }
                else
                {
                    var str = "";
                    foreach (var val in para)
                    {
                        str += val.Value + "\r\n";
                    }
                    File.WriteAllText(dicAppSet["pathfoldertcpsend"] + config["namefile"], str);
                }

                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        // PUT: api/TCP_OverServiceTcp/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TCP_OverServiceTcp/5
        public void Delete(int id)
        {
        }
    }
    public class classTcp
    {
        public string config { get; set; }
        public string para { get; set; }
    }

}
