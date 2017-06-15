using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace ServiceSql_Oracle_New.Controllers
{
    public class LayDanhSachFileTrongThuMucController : ApiController
    {
        // GET: api/LayDanhSachFileTrongThuMuc
        public string Get()
        {
            try
            {
                general gns = new general();
                var dicAppSet = gns.ReadAppseting();

                var lst = new List<string>();
                var folders = gns.GetAllFolder(dicAppSet["hddt_path_downloadfilechuaky"]);
                foreach (var fol in folders)
                {
                    var files = Directory.GetFiles(fol);
                    foreach (var file in files)
                    {
                        var sp = file.Split('\\');
                        var name = sp[sp.Length - 1];
                        lst.Add(name);
                    }
                }
                var integers = Newtonsoft.Json.JsonConvert.SerializeObject(lst);
                return integers;
                //  return new string[] { "value1", "value2" };
            }catch(Exception ex) { return ex.Message; }
        }

        // GET: api/LayDanhSachFileTrongThuMuc/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/LayDanhSachFileTrongThuMuc
        public string Post(DanhSachFile value)
        {
            try
            { 
            general gns = new general();
            gnSqlNomal gn = new gnSqlNomal();
                var dicAppSet = gns.ReadAppseting();

            var lst = new List<string>();
            var folders = gns.GetAllFolder(dicAppSet["hddt_path_downloadfilechuaky_log"]);
            var para = gn.convertParaToDic(value.para);

                // neu la  thang nam
                var namthangky = "";
                var loai = "";
                if (para.ContainsKey("namthangky"))
                {
                    namthangky = para["namthangky"];
                }
                if (para.ContainsKey("loai"))
                {
                    loai = para["loai"];
                }
                foreach (var fol in folders)
                {
                    var files = Directory.GetFiles(fol);
                    foreach (var file in files)
                    {
                        if (namthangky != "" && file.ToLower().IndexOf(loai) >=0 
                            && file.ToLower().IndexOf(namthangky)>=0)
                        {
                            var sp = file.Split('\\');
                            var name = sp[sp.Length - 1];
                            lst.Add(name);
                        }
                        else
                        {
                            var sp = file.Split('\\');
                            var name = sp[sp.Length - 1];
                            lst.Add(name);
                        }
                    }
                }

            var integers = Newtonsoft.Json.JsonConvert.SerializeObject(lst);
            return integers;
            }
            catch (Exception ex) { return ex.Message; }
        }

        // PUT: api/LayDanhSachFileTrongThuMuc/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/LayDanhSachFileTrongThuMuc/5
        public void Delete(int id)
        {
        }
    }
    public class DanhSachFile
    {
        public string config { get; set; }
        public string para { get; set; }
    }
}
