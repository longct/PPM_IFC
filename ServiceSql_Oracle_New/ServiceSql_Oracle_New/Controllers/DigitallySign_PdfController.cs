//using SignLib.Certificates;
//using SignLib.Pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServiceSql_Oracle_New.Controllers
{
    public class DigitallySign_PdfController : ApiController
    {
        // GET: api/DigitallySign_Pdf
        public IEnumerable<string> Get()
        {
            try
            {
                ////PFX file path
                //DigitallySign sn = new DigitallySign();
                //string PFXFile = sn.GeneratePFX();

                ////PDF upload
                //string PDFFile = "H:\\chuky\\cuongdq@infras.com.vn\\uploadedPDF.pdf";
                ////File.WriteAllBytes(PDFFile, FileUploadPDF.FileBytes);

                ////digitally sign the PDF document using the previously created PFX certificate
                //PdfSignature pdfSignature = new PdfSignature("YourSerialNumber");

                ////load the uploaded PDF document
                //pdfSignature.LoadPdfDocument(PDFFile);

                ////load the PFX certificte from file
                //pdfSignature.DigitalSignatureCertificate = DigitalCertificate.LoadCertificate(File.ReadAllBytes(PFXFile), "PfX_P@ssw0rd");

                ////signature reason and location
                //pdfSignature.SigningLocation = "công ty IFC nhé";
                //pdfSignature.SigningReason = "hello cuong 11";


                ////signature page

                //pdfSignature.SignatureAppearsOnAllPages = true;

                //pdfSignature.SignaturePosition = SignaturePosition.TopRight;


                ////timestamp the PDF Document
                ////here will be your TSA Serve Address
                //pdfSignature.TimeStamping.ServerUrl = new Uri("http://ca.signfiles.com/TSAServer.aspx");

                ////save the signed file name on a label to be downloaded later
                //var path = Path.GetDirectoryName(PFXFile) + "\\SignedPDF.pdf";

                ////the signed PDF file is returned as byte[]
                //File.WriteAllBytes(path, pdfSignature.ApplyDigitalSignature());

            }
            catch (Exception ex)
            {
                return new string[] { "value1", ex.Message};
            }

            return new string[] { "value1", "value2" };
        }

        // GET: api/DigitallySign_Pdf/5
        public string Get(int id)
        {
           
            return "value";
        }

        // POST: api/DigitallySign_Pdf
        public string Post(DigitallySignPdf value)
        {
            return "";
        }

        // PUT: api/DigitallySign_Pdf/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DigitallySign_Pdf/5
        public void Delete(int id)
        {
        }
    }
    public class DigitallySignPdf
    {
        public string config { get; set; }
        public string para { get; set; }
    }

}
