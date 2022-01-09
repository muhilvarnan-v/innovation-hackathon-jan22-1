using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using CEEAWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Table;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CEEAWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Get All products from mysql table
        //[Route("/guid")]
        [HttpGet]
        public JsonResult Getproducts()
        {
            string query = @"select * from restapi.categories,restapi.products where categories.categoryid = products.categoryid";
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
            return new JsonResult(table);
        }
        // get single record
        [HttpGet("{id}")]
        public JsonResult Getsinglerecord(int id)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.get_list_products", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;
                        mycommond.Parameters.AddWithValue("@fProductId", id);
                        mycon.Open();
                        myReader = mycommond.ExecuteReader();

                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }
                catch (Exception ex)
                {
                    string x = ex.Message.ToString();
                    string error = ex.StackTrace.ToString();
                }
                return new JsonResult(table);
            }
        }

        // To Insert New record
        [HttpPost]
        public JsonResult Post(Products prd)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.Add_categorie_products", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;

                        mycommond.Parameters.AddWithValue("@fcategoryid", prd.categoryId);

                        mycommond.Parameters.AddWithValue("@fproductname", prd.ProductName);
                        mycommond.Parameters.AddWithValue("@fproductDescription", prd.ProductDescription);
                        mycommond.Parameters.AddWithValue("@fproductManual", prd.ProductManual);
                        mycommond.Parameters.AddWithValue("@fproductSpecification", prd.ProductSpecification);
                        mycommond.Parameters.AddWithValue("@fproductWarranty", prd.ProductWarranty);
                        mycommond.Parameters.AddWithValue("@fproductFeatures", prd.ProductFeatures);
                        mycommond.Parameters.AddWithValue("@fproductModel", prd.ProductModel);
                        mycommond.Parameters.AddWithValue("@fproductCompany", prd.ProductCompany);
                        mycommond.Parameters.AddWithValue("@fproductPreview", prd.ProductPreview);
                        mycommond.Parameters.AddWithValue("@fproductAuthor", prd.ProductAuthor);


                        mycon.Open();

                        myReader = mycommond.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }
                catch (Exception ex)
                {
                    string x = ex.Message.ToString();
                    string error = ex.StackTrace.ToString();
                }

            }
            return new JsonResult(table);
        }
        // To Update the record
        [HttpPut("{id}")]
        public JsonResult Put(int id, Products prd)
        {
            string query = @"update restapi.products set 
                                ProductName = @ProductName,
                                ProductDescription = @ProductDescription,
                                productManual = @ProductManual,
                                ProductModel = @ProductModel,
                                ProductSpecification = @ProductSpecification,
                                ProductWarranty = @ProductWarranty,
                                productFeatures = @productFeatures,
                                productPreview =@productPreview,
                                ProductCompany = @ProductCompany,
                                ProductAuthor = @ProductAuthor
                                where ProductId =@ProductId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            try
            {
                using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
                {
                    mycon.Open();
                    using (MySqlCommand mycommond = new MySqlCommand(query, mycon))
                    {
                        //mycommond.Parameters.AddWithValue("@categoryid", prd.categoryId);
                        //mycommond.Parameters.AddWithValue("@categoryName", prd.categoryName);
                        //mycommond.Parameters.AddWithValue("@categoryDescription", prd.categoryDescription);
                        //mycommond.Parameters.AddWithValue("@channel", prd.channel);

                        mycommond.Parameters.AddWithValue("@ProductId", id);
                        mycommond.Parameters.AddWithValue("@ProductName", prd.ProductName);
                        mycommond.Parameters.AddWithValue("@ProductDescription", prd.ProductDescription);
                        mycommond.Parameters.AddWithValue("@ProductManual", prd.ProductManual);
                        mycommond.Parameters.AddWithValue("@ProductModel", prd.ProductModel);
                        mycommond.Parameters.AddWithValue("@ProductSpecification", prd.ProductSpecification);
                        mycommond.Parameters.AddWithValue("@ProductWarranty", prd.ProductWarranty);
                        mycommond.Parameters.AddWithValue("@productFeatures", prd.ProductFeatures);
                        mycommond.Parameters.AddWithValue("@productPreview", prd.ProductPreview);
                        mycommond.Parameters.AddWithValue("@ProductCompany", prd.ProductCompany);
                        mycommond.Parameters.AddWithValue("@ProductAuthor", prd.ProductAuthor);
                        //mycon.Open();
                        myReader = mycommond.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                string x = ex.Message.ToString();
                string error = ex.StackTrace.ToString();
            }
            return new JsonResult("Product Updated Sucessfully");
        }
        // To delete the record from MySql table
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query2 = @"delete from  restapi.hotspots
                            where ProductId =@ProductId;";
            string query = @"delete from  restapi.Products
                            where ProductId =@ProductId;";
            string query3 = @"delete from  restapi.categories
                            where categoryid=@categoryid;";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand mycommond = new MySqlCommand(query2, mycon))
                {
                    mycommond.Parameters.AddWithValue("@ProductId", id);
                    myReader = mycommond.ExecuteReader();
                    //table.Load(myReader);

                    myReader.Close();
                    //mycon.Close();
                }
                using (MySqlCommand mycommond2 = new MySqlCommand(query, mycon))
                {
                    mycommond2.Parameters.AddWithValue("@ProductId", id);
                    myReader = mycommond2.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    //mycon.Close();
                }
                using (MySqlCommand mycommond3 = new MySqlCommand(query3, mycon))
                {
                    mycommond3.Parameters.AddWithValue("@categoryid", id);
                    myReader = mycommond3.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }

            }
            return new JsonResult("Product Deleted Sucessfully");
        }
        // Post Hostpost details in MySqltable
        [Route("featuredproducts")]
        [HttpGet]
        public JsonResult featuredProducts()
        {
            string query = @"select categoryName,ProductName,productCompany,productPreview,productModel from restapi.categories,restapi.products where categories.categoryid = products.categoryid and productFeatures ='Yes'";
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
            return new JsonResult(table);
        }

        // Get all Hotsops Details from MySql Table
        [Route("{id}/hotspots")] 
        [HttpPost]
        public JsonResult hotpsots(int id, Products prd)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.Add_hotspot", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;

                        mycommond.Parameters.AddWithValue("@fProductId", id);
                        mycommond.Parameters.AddWithValue("@ftransform", prd.Transform);
                        mycommond.Parameters.AddWithValue("@fscale", prd.Scale);
                        mycommond.Parameters.AddWithValue("@frotation", prd.Rotation);
                        mycommond.Parameters.AddWithValue("@fhotspotText", prd.HotspotText);
                        mycommond.Parameters.AddWithValue("@fhotspotimage", prd.Hotspotimage);
                        mycommond.Parameters.AddWithValue("@fhotspotMedia", prd.hotspotMedia);
                        mycommond.Parameters.AddWithValue("@fcreatedBy", prd.createdBy);
                        mycon.Open();
                        myReader = mycommond.ExecuteReader();

                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }
                catch (Exception ex)
                {
                    string x = ex.Message.ToString();
                    string error = ex.StackTrace.ToString();
                }

            }
            return new JsonResult(table);

        }

        //[Route("{id}/hotpsots")]
        [HttpGet("{id}/hotspots")]
        public JsonResult gethotpsots(int id)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.Update_Gethotspot", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;

                        mycommond.Parameters.AddWithValue("@fProductId", id);
                        mycon.Open();
                        myReader = mycommond.ExecuteReader();

                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }
                catch (Exception ex)
                {
                    string x = ex.Message.ToString();
                    string error = ex.StackTrace.ToString();
                }

            }
            return new JsonResult(table);

        }

        //Publish Product
        [Route("{id}/publish")]
        [HttpPost]
        public JsonResult publish(int id, Publishing pbs)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.Publishproduct", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;

                        mycommond.Parameters.AddWithValue("@fProductId", id);
                        mycommond.Parameters.AddWithValue("@fpublishingStatus", pbs.publishingStatus);
                        mycommond.Parameters.AddWithValue("@fpublisherSource", pbs.publisherSource);
                        mycommond.Parameters.AddWithValue("@fSubmittedBy", pbs.SubmittedBy);
                        mycon.Open();
                        myReader = mycommond.ExecuteReader();

                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }
                catch (Exception ex)
                {
                    string x = ex.Message.ToString();
                    string error = ex.StackTrace.ToString();
                }

            }
            return new JsonResult("Product published sucessfully");

        }


    }
}
