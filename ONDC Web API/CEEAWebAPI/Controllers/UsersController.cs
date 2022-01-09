using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using CEEAWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace CEEAWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private readonly IConfiguration _configuration;

        //private readonly IConfiguration _configuration;
        public UsersController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }
        //[AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userParam)
        {
            var user = await _userService.Authenticate(userParam.Username, userParam.Password);
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            
            var users = await _userService.GetAll();
            //var GetUser = Getproducts();
            return Ok(users);
        }

        //private JsonResult Getproducts()
        //{
        //    string query = @"select * from restapi.user;";
        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
        //    MySqlDataReader myReader;
        //    using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
        //    {
        //        mycon.Open();
        //        using (MySqlCommand mycommond = new MySqlCommand(query, mycon))
        //        {
        //            myReader = mycommond.ExecuteReader();
        //            table.Load(myReader);

        //            myReader.Close();
        //            mycon.Close();
        //        }
        //    }
        //    return new JsonResult(table);
        //}

        [HttpPost("{userName}/{password}/{fname}")]
        public JsonResult Post(string fname, string userName, string password)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppcon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                try
                {
                    using (MySqlCommand mycommond = new MySqlCommand("restapi.Addusers", mycon))
                    {
                        mycommond.CommandType = CommandType.StoredProcedure;

                        mycommond.Parameters.AddWithValue("@fname", fname);

                        mycommond.Parameters.AddWithValue("@fuserName", userName);
                        mycommond.Parameters.AddWithValue("@fpassword", password);


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
