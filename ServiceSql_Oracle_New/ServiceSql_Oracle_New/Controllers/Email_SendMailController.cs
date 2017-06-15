using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Mail;

namespace ServiceSql_Oracle_New.Controllers
{
    public class Email_SendMailController : ApiController
    {
        // GET: api/Email_SendMail
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Email_SendMail/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Email_SendMail
        public string Post(EmailValue value)
        {
            try
            {
                gnSqlNomal gn = new gnSqlNomal();
                general gns = new general();
                var dicAppSet = gns.ReadAppseting();

                if (value == null || value.config == null)
                    return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Kiểm tra lại dữ liệu đầu vào\"}]}";

                var config = gn.convertConfigToDic(value.config);

                var ToEmail = config["sendtomail"];
                var ToEmailCC = config["sendcctomail"];

                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(dicAppSet["email_guithuc"], config["tenthaythe"]);
                
                    String[] tmp = ToEmail.Split(',');
                 
                    foreach (string amail in tmp)
                    {
                        if (amail.Length > 0)
                        {
                             mail.To.Add(amail);
                        }
                    }
                foreach (string amail in ToEmailCC.Split(','))
                {
                    if (amail.Length > 0)
                    {
                        mail.CC.Add(amail);
                    }
                }

                mail.Subject = config["chude"].ToString();
                mail.Priority = MailPriority.High;
                mail.Body = config["noidung"].ToString();
                mail.ReplyTo = new MailAddress(dicAppSet["email_guithuc"]);
                mail.BodyEncoding = System.Text.Encoding.UTF8;
                mail.IsBodyHtml = true;
                SmtpClient mySmtpClient = new SmtpClient();
                mySmtpClient.Host = dicAppSet["email_smtp"];
                mySmtpClient.Credentials = new System.Net.NetworkCredential(dicAppSet["email_emailsend"], dicAppSet["email_passsend"]);
                mySmtpClient.EnableSsl = dicAppSet["email_ssl"]=="true" ? true : false;
                mySmtpClient.Port = Convert.ToInt32(dicAppSet["email_port"]);
                mySmtpClient.Send(mail);

                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\"Gửi mail thành công\"}]}";
            }
            catch(Exception ex)
            {
                return "{\"result\":\"ERROR\",\"data\":[{\"status\":\""+ex.Message+"\"}]}";
            }
        }

        // PUT: api/Email_SendMail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Email_SendMail/5
        public void Delete(int id)
        {
        }
    }
    public class EmailValue
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
