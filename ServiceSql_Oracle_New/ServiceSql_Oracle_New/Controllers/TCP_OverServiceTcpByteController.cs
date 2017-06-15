using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Threading;
using System.Text;

namespace ServiceSql_Oracle_New.Controllers
{
    public class TCP_OverServiceTcpByteController : ApiController
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
        public string Post(classTcpByte value)
        {
            try
            {
                gnSqlNomal gn = new gnSqlNomal();
                general gns = new general();
                var dicAppSet = gns.ReadAppseting();

                if (value == null || value.config == null) return null;

                var config = gn.convertConfigToDic(value.config);
                var para = gn.convertParaToDic(value.para);

                var str = "";
                foreach (var val in para)
                {
                    if(val.Key !="data" && para["type"]=="sendbyte")
                    str += val.Value + "\r\n";

                    if (val.Key == "data" && para["type"] == "sendbyte")
                    {
                        var arr = val.Value.Replace("\r\n", "").Replace(" ","").Replace("[","").Replace("]","").Replace("\"","").Split(',');
                        var lstss = new List<byte>();
                        foreach (var dataa in arr)
                        {
                            var bytes = gns.HexToByteArray(dataa);
                            lstss.AddRange(bytes);
                        }
                        //var thu = System.Text.ASCIIEncoding.ASCII.GetBytes("#0000000000000009+CSQ:IFCMASTER#");
                      //  var thu1 = BitConverter.to "#0000000000000009+CSQ:IFCMASTER#";
                        str += BitConverter.ToString(lstss.ToArray()) + "\r\n";
                    }
                }

                File.WriteAllText(dicAppSet["pathfoldertcpsend"] + config["namefile"], str);

                var result = "";
                if (para["type"].ToLower() == "checkconnect" || para["type"].ToLower() == "receive")
                {
                    var pathReceive = dicAppSet["pathfoldertcpreceive"] + config["namefile"];
                    if (File.Exists(pathReceive))
                    {
                        result = File.ReadAllText(pathReceive);
                        //var bytes = Array.ConvertAll<string, byte>(resultByte.Substring(0, resultByte.Length-1).Split('-'), s => Convert.ToByte(s, 16));

                        //StringBuilder sb = new StringBuilder(bytes.Length * 2);
                        //foreach (byte b in bytes)
                        //{
                        //    sb.AppendFormat("{0:x2}", b);
                        //}
                        //result = sb.ToString();
                        File.Delete(pathReceive);
                    }
                    else
                        return "";
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
    public class classTcpByte
    {
        public string config { get; set; }
        public string para { get; set; }
    }

}
