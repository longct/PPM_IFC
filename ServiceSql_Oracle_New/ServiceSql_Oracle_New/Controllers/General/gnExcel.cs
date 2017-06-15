
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ServiceSql_Oracle_New.Controllers
{
    public class gnExcel
    {
        public ActionResult ExporttoExcel(IList<string> summary, DataTable table, IList<ListColumnExport> lstColumnName,
            string fileName, int soBanGhiTrenMotDong, bool cachDong, bool toMauPhanBiet)
        {
            try
            {
               // HttpContext.Current.Response.ContentType = "application/ms-excel;";
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.Buffer = true;
                HttpContext.Current.Response.ContentType = "application/force-download";
              //  HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
                HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
                HttpContext.Current.Response.Write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">");
                HttpContext.Current.Response.AddHeader("Content-Disposition",
                    string.Format("attachment;filename={0}.xls", fileName));

                HttpContext.Current.Response.Charset = "UTF-8";
                HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
               // HttpContext.Current.Response.BinaryWrite(System.Text.Encoding.UTF8.GetPreamble());
                //sets font
                HttpContext.Current.Response.Write("<font style='font-size:10.0pt; font-family:Times New Roman;'>");
                HttpContext.Current.Response.Write("<BR><BR>");

                //write Summary text
                foreach (var item in summary)
                {

                    HttpContext.Current.Response.Write("<B>");
                    HttpContext.Current.Response.Write(item);
                    HttpContext.Current.Response.Write("</B>");
                    HttpContext.Current.Response.Write("<BR>");
                }
                ForSingleTable(table, lstColumnName, soBanGhiTrenMotDong, cachDong, toMauPhanBiet);

                using (MemoryStream ms = new MemoryStream())
                {
                    StreamWriter sw = new StreamWriter(ms);
                    sw.Flush();
                    ms.Position = 0;
                    StreamReader sr = new StreamReader(ms);
                    string myStr = sr.ReadToEnd();
                }



                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.End();

                return new EmptyResult();
            }
            catch (Exception ex)
            {
                return null;
                //throw new Exception(ex.Message);
            }
        }

        public  void ForSingleTable(DataTable table, IList<ListColumnExport> lstColumnName, int soBanGhiTrenMotDong, bool cachDong, bool toMauPhanBiet)
        {
            var dicType = dicGetType();
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Times New Roman; background:white;'>");
            //am getting my grid's column headers
            HttpContext.Current.Response.Write("<Tr>");
            foreach (ListColumnExport t in lstColumnName)
            {
                //write in new column
                HttpContext.Current.Response.Write("<Td style='text-align: center;vertical-align: middle;white-space: normal;background-color:#0B9CFD;background-image: -moz-linear-gradient(center top , #0B9CFD, #058CE7);color: #FFFFFF;'>");
                //Get column headers  and make it as bold in excel columns
                HttpContext.Current.Response.Write("<B>");
                HttpContext.Current.Response.Write(t.name);
                HttpContext.Current.Response.Write("</B>");
                HttpContext.Current.Response.Write("</Td>");
            }
            HttpContext.Current.Response.Write("</Tr>");
            var indexRow = 0;
            var stt = 0;
            if (toMauPhanBiet)
            {
                foreach (DataRow row in table.Rows)
                {//write in new row
                    stt++;
                    if (indexRow > 0 && indexRow % soBanGhiTrenMotDong == 0 && cachDong)
                    {
                        HttpContext.Current.Response.Write("<Tr>");
                        HttpContext.Current.Response.Write("</Tr>");
                    }
                    HttpContext.Current.Response.Write(toMauPhanBiet && indexRow > 0 ? "<Tr style = 'background-color: #F2F4F5;'>" : "<Tr>");
                    foreach (var column in lstColumnName.Select(x => x.field).ToList())
                    {
                        var listColumnExport = lstColumnName.SingleOrDefault(x => x.field == column);
                        if (listColumnExport != null)
                            HttpContext.Current.Response.Write(dicType[listColumnExport.type]);

                        if (listColumnExport.name.ToUpper() == "STT".ToUpper())
                        {
                            HttpContext.Current.Response.Write(stt);
                        }
                        else
                        {
                            HttpContext.Current.Response.Write(row.Table.Columns.Contains(column) ? row[column] : "<FONT color = 'RED'>Lỗi tên FieldName liên hệ IFC </FONT>");
                        }
                        HttpContext.Current.Response.Write("</Td>");
                    }
                    HttpContext.Current.Response.Write("</Tr>");
                    indexRow++;
                    toMauPhanBiet = indexRow % 2 != 0;
                }
            }
            else
            {
                foreach (DataRow row in table.Rows)
                {//write in new row
                    stt++;
                    if (indexRow > 0 && indexRow % soBanGhiTrenMotDong == 0 && cachDong)
                    {
                        HttpContext.Current.Response.Write("<Tr>");
                        HttpContext.Current.Response.Write("</Tr>");
                    }
                    HttpContext.Current.Response.Write(toMauPhanBiet ? "<Tr style = 'background-color: #F2F4F5;'>" : "<Tr>");
                    foreach (var column in lstColumnName.Select(x => x.field).ToList())
                    {
                        var listColumnExport = lstColumnName.SingleOrDefault(x => x.field == column);
                        if (listColumnExport != null)
                            HttpContext.Current.Response.Write(listColumnExport.type);
                        if (listColumnExport.name.ToUpper() == "STT".ToUpper())
                        {
                            HttpContext.Current.Response.Write(stt);
                        }
                        else
                        {
                            HttpContext.Current.Response.Write(row.Table.Columns.Contains(column) ? row[column] : "<FONT color = 'RED'>Lỗi tên FieldName liên hệ IFC </FONT>");
                        }
                        HttpContext.Current.Response.Write("</Td>");
                    }
                    HttpContext.Current.Response.Write("</Tr>");
                    indexRow++;
                    toMauPhanBiet = indexRow % soBanGhiTrenMotDong == 0 ? !toMauPhanBiet : toMauPhanBiet;
                }
            }
            HttpContext.Current.Response.Write("</Table>");
        }
        //General,NoDecimal,ThreeDecimal,CommaAndTwoDecimal,DdMMyyyyHHmm,DdMMyyyyHHmmAndBold,Percent,NoPercent,Fractions,Text,Bold
        //TextAndBold,GeneralRight,GeneralLeft,GeneralCenter,BoldCenter,BoldCenter,DdMMyyyyHHmmCenter,TextLeft
        //TextCenter,TextRight,TextAndBoldLeft,TextAndBoldCenter,TextAndBoldRight
        public Dictionary<string, string> dicGetType()
        {
            var dic = new Dictionary<string, string>();
            dic.Add("General", "<Td>");
            dic.Add("NoDecimal", "<Td style = 'mso-number-format:0'> ");
            dic.Add("ThreeDecimal", "<Td style = 'mso-number-format:'0'\'.000''> ");
            dic.Add("CommaAndTwoDecimal", "<Td style = 'mso-number-format:''\'#'\','\'#'\'#0'\'.00''> ");
            dic.Add("DdMMyyyyHHmm", "<Td style = 'mso-number-format:'dd'\'/MM'\'/yyyy '\'/HH:mm'> ");
            dic.Add("DdMMyyyyHHmmAndBold", "<Td style = 'font-weight:bold; mso-number-format:'dd'\'/MM'\'/yyyy '\'/HH:mm';'> ");
            dic.Add("Percent", "<Td style = 'mso-number-format:Percent'> ");
            dic.Add("NoPercent", "<Td style = 'mso-number-format:0%'> ");
            dic.Add("Fractions", "<Td style = 'mso-number-format:'0'\'.E+00''> ");
            dic.Add("Text", "<Td style = 'mso-number-format:" + @"\@" + "'> ");
            dic.Add("Bold", "<Td style = 'font-weight:bold'> ");
            dic.Add("TextAndBold", "<Td style = 'font-weight:bold; mso-number-format:" + @"\@" + ";'> ");
            dic.Add("GeneralRight", "<Td style = 'text-align: right;vertical-align: middle;white-space: normal;'>");
            dic.Add("GeneralLeft", "<Td style = 'text-align: left;vertical-align: middle;white-space: normal;'>");
            dic.Add("GeneralCenter", "<Td style = 'text-align: center;vertical-align: middle;white-space: normal;'>");
            dic.Add("BoldCenter", "<Td style = 'text-align: center;vertical-align: middle;white-space: normal;font-weight:bold'> ");
            dic.Add("DdMMyyyyHHmmCenter", "<Td style = 'mso-number-format:'dd\\/MM\\/yyyy';'> ");
            dic.Add("TextLeft", "<Td style = 'text-align: left;vertical-align: middle;white-space: normal;background-image:-moz-linear-gradient(center top , #0B9CFD, #058CE7);mso-number-format:" +
            @"\@" + "'> ");
            dic.Add("TextCenter", "<Td style = 'text-align: center;vertical-align: middle;white-space: normal;background-image:-moz-linear-gradient(center top , #0B9CFD, #058CE7);mso-number-format:" +
            @"\@" + "'> ");
            dic.Add("TextRight", "<Td style = 'text-align: right;vertical-align: middle;white-space: normal;background-image:-moz-linear-gradient(center top , #0B9CFD, #058CE7);mso-number-format:" +
            @"\@" + "'> ");
            dic.Add("TextAndBoldLeft", "<Td style = 'text-align: left;vertical-align: middle;white-space: normal;background-image:-moz-linear-gradient(center top , #0B9CFD, #058CE7);font-weight:bold; mso-number-format:" +
            @"\@" + ";'> ");
            dic.Add("TextAndBoldCenter", "<Td style = 'text-align: center;vertical-align: middle;white-space: normal;background-image:-moz-linear-gradient(center top , #0B9CFD, #058CE7);font-weight:bold; mso-number-format:" +
            @"\@" + ";'> ");
            dic.Add("TextAndBoldRight", "<Td style = 'text-align: right;vertical-align: middle;white-space: normal;background-image:-moz-linear-gradient(center top , #0B9CFD, #058CE7);font-weight:bold; mso-number-format:" +
            @"\@" + ";'> ");
            return dic;
        }


    }
    public class ListColumnExport
    {
        public string field { get; set; }
        public string name { get; set; }
        public string type { get; set; }

        public string color { get; set; }
    }
}
