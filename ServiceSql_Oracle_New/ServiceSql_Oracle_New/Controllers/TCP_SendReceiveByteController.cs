using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Runtime.Caching;
using System.Text;
using System.Threading;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    
    public class TCP_SendReceiveByteController : ApiController
    {
        
          

        // GET: api/TCP_SendReceiveByte
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/TCP_SendReceiveByte/5
        public string Get(int id)
        {
            return "value";
        }

        ObjectCache _cachSocket = MemoryCache.Default;
        // POST: api/TCP_SendReceiveByte
        public string Post(classTcpConnect value)
        {
            try
            {             
                gnSqlNomal gn = new gnSqlNomal();
                var config = gn.convertConfigToDic(value.config);
                var para = gn.convertParaToDic(value.para);


                // Data buffer for incoming data.
                byte[] bytes = new byte[1024];
                var item = _cachSocket.GetCacheItem(config["keysocket"]);
                Socket socketCa = null;
                if (item != null)
                    socketCa = item.Value as Socket;
                // Connect to a remote device.
                if (config["typecommand"] == "connect")
                {
                    try
                    {
                            IPAddress ipAddress = IPAddress.Parse(para["ip"]);
                            IPEndPoint remoteEP = new IPEndPoint(ipAddress, Convert.ToInt32(para["port"]));
                            // Create a TCP/IP  socket.
                            Socket sender = new Socket(AddressFamily.InterNetwork,
                                SocketType.Stream, ProtocolType.Tcp);
                            // Connect the socket to the remote endpoint. Catch any errors.      
                            sender.ReceiveTimeout = 10000;
                            sender.SendTimeout = 10000;
                                   
                            sender.Connect(remoteEP);

                        List<string> cacheKeys = MemoryCache.Default.Select(kvp => kvp.Key).ToList();
                        foreach (string cacheKey in cacheKeys)
                        {
                            if(cacheKey== config["keysocket"])
                            MemoryCache.Default.Remove(cacheKey);
                        }

                        _cachSocket.Add(config["keysocket"], sender,DateTime.Now.AddHours(2));
                            //  return "{\"result\":\"OK\",\"data\":[{\"status\":\"OK\"}]}";
                       // }
                        
                        return "OK";
                        }
                   
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }
                }

                if (config["typecommand"] == "sendbyte" && _cachSocket.Contains(config["keysocket"]))
                {
                    try
                    {
                        // Send the data through the socket.
                        general gns = new general();
                        var sendbyte = gns.HexToByteArray(para["lenh"]);
                        socketCa.Send(sendbyte);
                        return "OK";
                    }
                    catch (Exception ex)
                    {
                        return ex.Message;
                    }
                }
                if (config["typecommand"] == "receivebyte")
                {
                    try
                    {
                        socketCa.ReceiveTimeout = 50;

                        int bytesRec = socketCa.Receive(bytes);
                        var data = bytes.ToList().GetRange(0, bytesRec).ToArray();
                        return BitConverter.ToString(data);
                    }
                    catch (Exception ex)
                    {
                        return "";
                    }
                }

                //// Release the socket.
                if (config["typecommand"] == "disconnect")
                {
                    try
                    {
                        // Receive the response from the remote device.
                        
                        socketCa.Dispose();
                        socketCa.Close();
                        return "OK";
                    }
                    catch (Exception ex)
                    {
                        return "{\"result\":\"ERROR\",\"data\":[]}";
                    }
                }
                return "Kiểm tra lại lệnh không đúng định dạng";
            }
            catch(Exception ex) { return ex.Message; }
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
