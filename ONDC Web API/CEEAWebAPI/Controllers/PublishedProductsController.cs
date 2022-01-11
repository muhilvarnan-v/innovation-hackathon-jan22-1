using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using CEEAWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace CEEAWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishedProductsController : Controller
    {
        private readonly IConfiguration _configuration;
        public PublishedProductsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult getAllPublishedProduct()
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.AllPublishedProducts", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;
                        //mycommond.Parameters.AddWithValue("@fProductId", id);
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
        // Get all published products with categories deatils
        [Route("categories")]
        [HttpGet]
        public JsonResult getPublishedproductwithcategories()
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.getPublishedproductwithcategories", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;
                        //mycommond.Parameters.AddWithValue("@fProductId", id);
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
        //Get all published products deatils with individual categories
        [Route("categories/{categoryName}")]
        //[HttpGet("{categoryName}")]
        [HttpGet]
        public JsonResult getPublishedprdwithindividualcategories(string categoryName)
        {
            string query = @"select categoryName,categoryDescription,channel,ProductId,ProductName,productModel,productAuthor,productCompany,productDescription,productManual,productSpecification,productWarranty,productFeatures,productPreview,productCreated
                            from restapi.categories, restapi.publishedproduct where categories.categoryid = publishedproduct.categoryid and categoryName=@categoryName;";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand mycommond = new MySqlCommand(query, mycon))
                {
                    mycommond.Parameters.AddWithValue("@categoryName", categoryName);
                    myReader = mycommond.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    mycon.Close();
                }

            }
            return new JsonResult(table);
        }
   
        // Get Published products from web api
        [HttpGet("{id}")]
        public JsonResult getpublishedproduct(int id)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.getpublishedproduct", mycon))
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

        // Get Published hotspots from web api
        [HttpGet("{id}/hotspots")]
        public JsonResult getpublishedhotspots(int id)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.getpublishedhotspots", mycon))
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
    }
}
