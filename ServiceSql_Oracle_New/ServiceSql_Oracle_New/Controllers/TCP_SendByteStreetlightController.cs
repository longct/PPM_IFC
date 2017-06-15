using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Web.Http;
using System.IO;

namespace ServiceSql_Oracle_New.Controllers
{

    public class TCP_SendByteStreetlightController : ApiController
    {

        // GET: api/TCP_SendReceiveByte232
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/TCP_SendReceiveByte232/5
        public string Get(int id)
        {
            return "value";
        }


        // POST: api/TCP_SendReceiveByte232
        public string Post(classTcpConnect value)
        {
            try
            {
                Socket sender = null;
                gnSqlNomal gn = new gnSqlNomal();
                var config = gn.convertConfigToDic(value.config);
                var para = gn.convertParaToDic(value.para);

                // Data buffer for incoming data.
                byte[] bytes = new byte[1024];

                try
                {

                    IPAddress ipAddress = IPAddress.Parse(para["ip"]);
                    IPEndPoint remoteEP = new IPEndPoint(ipAddress, Convert.ToInt32(para["port"]));
                    // Create a TCP/IP  socket.
                    sender = new Socket(AddressFamily.InterNetwork,
                        SocketType.Stream, ProtocolType.Tcp);
                    // Connect the socket to the remote endpoint. Catch any errors.                
                    sender.Connect(remoteEP);

                }
                catch (Exception ex)
                {
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message + "\"}]}";
                }
                var v_lenh = config["lenh"];
                try
                {
                    // Send các lệnh connect mặc định
                    sender.Send(Encoding.ASCII.GetBytes("#0000000000000009+CSQ:IFCMASTER#"));
                    Thread.Sleep(500);
                    string imei = config["keysocket"];
                    sender.Send(Encoding.ASCII.GetBytes("@READ" + imei));
                    Thread.Sleep(500);


                    // Send the data through the socket.
                    general gns = new general();
                    var sendbyte = gns.HexToByteArray(config["lenh"]);
                    int bytesSent = sender.Send(sendbyte);

                    // Tao file log de view
                    try
                    {
                        var dicAppSet = gns.ReadAppseting();
                        string path = dicAppSet["pathlogcommandstreetlight"];
                        string filename = path + config["namefile"] + "_" + DateTime.Now.ToString("ddMMyyHHmmss") + ".txt";
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }

                        if (!File.Exists(filename))
                        {
                            // Create a file to write to.
                            using (StreamWriter sw = File.CreateText(filename))
                            {
                                //sw.WriteLine(para["ip"]);
                                //sw.WriteLine(para["port"]);
                                sw.WriteLine(BitConverter.ToString(sendbyte));
                            }
                        }
                    }
                    catch (Exception ex)
                    {

                    }
                }
                catch (Exception ex)
                {
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message + "\"}]}";
                }

                // Release the socket.
                try
                {
                    // Receive the response from the remote device.
                    var shutdown = Encoding.ASCII.GetBytes("shutdown");
                    int bytesSent = sender.Send(shutdown);

                    //_dicSocket[config["keysocket"]].Shutdown(SocketShutdown.Both);
                    //_dicSocket[config["keysocket"]].Close();
                    return "{\"result\":\"OK\",\"data\":" + v_lenh + "}";
                }
                catch (Exception ex)
                {
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message + "\"}]}";
                }
            }
            catch (Exception ex) { return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"" + ex.Message + "\"}]}"; }
        }

        // PUT: api/TCP_SendReceiveByte/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TCP_SendReceiveByte/5
        public void Delete(int id)
        {
        }
        public class classTcpConnect
        {
            public string config { get; set; }
            public string para { get; set; }
        }
    }

}
