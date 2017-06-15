using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Net.Sockets;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace ServiceSql_Oracle_New.Controllers
{
    

    public class HomeTESTController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public static Dictionary<string, Socket> _dicSocket = new Dictionary<string, Socket>();
        public JsonResult ReadExcel()
        {
            try
            {
                IPAddress ipAddress = IPAddress.Parse("127.0.0.1");
                IPEndPoint remoteEP = new IPEndPoint(ipAddress, Convert.ToInt32("1007"));
                // Create a TCP/IP  socket.
                Socket sender = new Socket(AddressFamily.InterNetwork,
                    SocketType.Stream, ProtocolType.Tcp);
                // Connect the socket to the remote endpoint. Catch any errors.                
                sender.Connect(remoteEP);
                _dicSocket.Add("111111111111", sender);
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }

        }


    }
}