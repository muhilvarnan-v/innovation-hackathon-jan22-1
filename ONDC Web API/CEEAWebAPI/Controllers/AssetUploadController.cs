using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using CEEAWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;

using MySql.Data.MySqlClient;

namespace CEEAWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetUploadController : ControllerBase
    {
        private readonly string _azureConnectionString;
        private readonly string _azureConnectionStringsastoken;
        private readonly IConfiguration _configuration;

        //public object FBlobService { get; private set; }
        //public object Meta { get; private set; }

        //private readonly object _container;

        public AssetUploadController(IConfiguration configuration)
        {
            _azureConnectionString = configuration.GetConnectionString("AzureBlobStorage");
            _azureConnectionStringsastoken = configuration.GetConnectionString("SASToken");
            _configuration = configuration;
        }
        List<Products> _category = new List<Products>();
        [HttpPost("{id}")]
        public async Task<IActionResult> assetAsync(int id)
        {

            try
            {
                GetcategoryFriendlyame(id);
                string containersname = _category[0].categoryFriendlyame;
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                if (file.Length > 0)
                {
                   var container = new BlobContainerClient(_azureConnectionString, containersname);
                   //var newbloburi = 
                    var createResponse = await container.CreateIfNotExistsAsync();
                    if (createResponse != null && createResponse.GetRawResponse().Status == 201)
                        await container.SetAccessPolicyAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);
                    //CloudBlockBlob blockBlobImage = this._container.GetBlockBlobReference(filename);
                    var blob = container.GetBlobClient(file.FileName);
                    
                    await blob.DeleteIfExistsAsync((Azure.Storage.Blobs.Models.DeleteSnapshotsOption)Azure.Storage.Blobs.Models.DeleteSnapshotsOption.IncludeSnapshots);
                    using (var fileStream = file.OpenReadStream())
                    {
                        await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = file.ContentType });
                        blob.SetMetadata(new Dictionary<string, string>());
                        Dictionary<string, string> metadata = new Dictionary<string, string>(2);
                        metadata.Add("ProductId", id.ToString());
                        blob.SetMetadata(metadata);
                    }
                    if(blob.Uri.ToString() != null && blob.Uri.ToString() != "")
                    {
                        UpdateProductTable(id.ToString(), blob.Uri.ToString());
                    }
                    return Ok(blob.Uri.ToString());
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        private List<Products> GetcategoryFriendlyame(int id)
        {
            var @ProductId = id;
            string query = @"select categoryFriendlyame,ProductId from restapi.categories,restapi.products where categories.categoryid = products.categoryid AND products.ProductId=" + @ProductId + ";";
            //query = query.Replace("{id}", id);
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand mycommond = new MySqlCommand(query, mycon))
                {
                    //mycommond.Parameters.AddWithValue("@ProductId", id);
                    myReader = mycommond.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }

                for (int i = 0; i < table.Rows.Count; i++)
                {
                    Products prd = new Products();
                    prd.ProductId = Convert.ToInt32(table.Rows[i]["ProductId"]);
                    prd.categoryFriendlyame = table.Rows[i]["categoryFriendlyame"].ToString();

                    _category.Add(prd);
                }
                return (_category);
            }
        }

        private void UpdateProductTable(string v1, string v2)
        {
            string imageuri = v2;
            var splitVals = imageuri.Split('/');
            var URL4 = splitVals[3];
            var URL5 = splitVals[4];
            string subseturi = "https://ceeademocontent.azureedge.net";
            var sastoken = _azureConnectionStringsastoken;
            string finalurl = "" + subseturi + "/" + URL4 + "/" + URL5+sastoken;
            string imagetype = URL5.Substring(URL5.Length - 4);
            string query;
            if (imagetype.ToString() == "gltf" || imagetype.ToString() == ".glb")
            {
                query = @"update restapi.Products set productModel = '{finalurl}' where productId = {v1}";
                query = query.Replace("{finalurl}", finalurl);
                query = query.Replace("{v1}", v1);
            }
            else
            {

                query = @"update restapi.Products set productPreview = '{finalurl}' where productId = {v1}";
                query = query.Replace("{finalurl}", finalurl);
                query = query.Replace("{v1}", v1);
            }
            //string imagetype = v2.Substring(v2.Length - 4);
            //string query;
            //if (imagetype.ToString() == "gltf" || imagetype.ToString() == ".glb")
            //{
            //    query = @"update restapi.Products set productModel = '{v2}' where productId = {v1}";
            //    query = query.Replace("{v2}", v2);
            //    query = query.Replace("{v1}", v1);
            //}
            //else
            //{

            //    query = @"update restapi.Products set productPreview = '{v2}' where productId = {v1}";
            //    query = query.Replace("{v2}", v2);
            //    query = query.Replace("{v1}", v1);
            //}
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand mycommond = new MySqlCommand(query, mycon))
                {
                    myReader = mycommond.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }

            }
            //return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var blobs = new List<AssestInfo>();
            var container = new BlobContainerClient(_azureConnectionString, "electronics");
            await foreach (var blobItem in container.GetBlobsAsync())
            {
                var uri = container.Uri.AbsoluteUri;
                var name = blobItem.Name;
                var fullUri = uri + "/" + name;
                var data = "";
                Azure.Storage.Blobs.Models.BlobContainerProperties properties = container.GetProperties();
                foreach (var metadata in properties.Metadata)
                    {
                    data = (string.Format($"{metadata.Value}"));
                    }
                    blobs.Add(new AssestInfo { Name = name, Uri = fullUri, productid = data });
            }

            //    Azure.Storage.Blobs.Models.BlobContainerProperties properties = container.GetProperties();
            //foreach (var metadata in properties.Metadata)
            //{
            //    var uri = container.Uri.AbsoluteUri;
            //   //var name = blobItem.Name;
            //    //var data= (string.Format($"{metadata.Key}: {metadata.Value}"));
            //    var data = (string.Format($"{metadata.Value}"));
            //    blobs.Add(new AssestInfo {  Uri = uri, productid = data });
            //}
            ////var blob = container.GetPropertiesAsync();
            //await foreach (var blobItem in container.GetBlobsAsync())
            //{
            //    var uri = container.Uri.AbsoluteUri;
            //    var name = blobItem.Name;
            //   //blobItem.Properties.me
            //    var fullUri = uri + "/" + name;
            //   //blobItem.Metadata(name);
            //        blobs.Add(new AssestInfo { Name = name, Uri = fullUri, ContentType = blobItem.Properties.ContentType});
            //}

            return Ok(blobs);
        }
        [Route("download")]
        [HttpGet("")]
        public async Task<IActionResult> Download()
        {
            string name = "https://apilogsstorage1.blob.core.windows.net/electronics/Bag.gltf";
            var container = new BlobContainerClient(_azureConnectionString, "electronics");
            var blob = container.GetBlobClient(name);
            if (await blob.ExistsAsync())
            {
                var a = await blob.DownloadAsync();
                return File(a.Value.Content, a.Value.ContentType, name);
            }
            return BadRequest();
        }
    } 
    
}
