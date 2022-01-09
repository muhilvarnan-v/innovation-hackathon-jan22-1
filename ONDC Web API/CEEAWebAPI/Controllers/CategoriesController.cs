using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;
using CEEAWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CEEAWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CategoriesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Getcategory()
        {
            string query = @"select categoryid,categoryName,categoryDescription from restapi.categories;";
            //string query = @"select categoryName,categoryDescription,channel,ProductName,productModel,productAuthor,productCompany,productDescription,productManual,productSpecification,productWarranty,productFeatures,productPreview,productCreated from restapi.categories,restapi.products where categories.categoryid = products.categoryid;";
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
        [HttpGet("{categoryName}")]
        public JsonResult Getsinglerecord(string categoryName)
        {

            string query = @"select categoryName,categoryDescription,channel,ProductName,productModel,productAuthor,productCompany,productDescription,productManual,productSpecification,productWarranty,productFeatures,productPreview,productCreated
                            from restapi.categories, restapi.products where categories.categoryid = products.categoryid and categoryName=@categoryName";
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
        
        [Route("all")]
        [HttpGet]
        public JsonResult Getallcategory()
        {
            string query = @"select categoryid,categoryName,categoryDescription from restapi.categories;";
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
    }
}
