using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Cors;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Data;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        AppDbContext db;
        private readonly IConfiguration Configuration;
        string Server, UserData;
        public AuthController(IConfiguration configuration)
        {
            Configuration = configuration;
            Server = Configuration.GetSection("dbConn").GetSection("Server").Value;
            UserData = Configuration.GetSection("dbConn").GetSection("UserData").Value;
        }
        [HttpPost("Registration")]
        public async Task<object> Registration([FromBody] RegistrationVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (!createdb(model.CompanyName))
                    {
                        return Ok(new
                        {
                            success = false,
                            errorMessage = "Company Name is already exists!!!"
                        });
                    }
                    var user = new Member
                    {
                        Name = model.Name,
                        Age = model.Age,
                        Phone = model.Phone,
                        Password = model.Password,
                        CompanyName = model.CompanyName
                    };
                    // CREATE USER
                    db.MemberTable.InsertOnSubmit(user);
                    db.SubmitChanges();
                    //if (result.Succeeded)
                    {
                        var c = db.MemberTable.FirstOrDefault();
                        return Ok(new
                        {
                            success = true,
                            errorMessage = "Registration Succeeded"
                        });
                    }
                    //else
                    //{
                    //    return Ok(new
                    //    {
                    //        success = false,
                    //        errorMessage = result.Errors
                    //    });
                    //}

                }
                catch (Exception ex)
                {
                    // return error message if there was an exception
                    return BadRequest(new { message = ex.Message });
                }
            }

            // If we got this far, something failed, redisplay form
            var response = new
            {
                success = false,
                errorMessage = "Registration failed"
            };
            return Ok(response);
        }
        private bool createdb(string companyName)
        {
            db = new AppDbContext(@"Server=" + Server + ";Database=" + companyName + ";" + UserData);
            if (db.DatabaseExists())
            {
                return false;
            }
            db.CreateDatabase();
            return true;
        }
        private bool IsExistsdb(string companyName)
        {
            db = new AppDbContext(@"Server=" + Server + ";Database=" + companyName + ";" + UserData);
            if (!db.DatabaseExists())
            {
                return false;
            }
            return true;
        }
        /////////////////////////////////////////////////////////////////
        // POST: api/Auth
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<object> Login([FromBody] Login model)
        {
            if (!IsExistsdb(model.CompanyName))
            {
                return Ok(new
                {
                    success = false,
                    message = "Login failed"
                });
            }
            bool enableLockout = false;
            var user = db.MemberTable.Where(m => m.CompanyName == model.CompanyName && m.Name == model.Name && m.Password == model.Password).FirstOrDefault();
            if (user != null)
            {
                return generateJwtToken(model.Name, user);
            }
            else
            {
                return Ok(new
                {
                    success = false,
                    message = "Login failed"
                });
            }
        }

        [NonAction]
        private async Task<object> generateJwtToken(string Name, Member user)
        {
            var response = new object();

            var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, Name),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                   // new Claim(ClaimTypes.NameIdentifier, user.Id),
                     new Claim("UserId",user.Id.ToString()),
                     new Claim("CompanyName",user.CompanyName)
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddHours(Convert.ToDouble(Configuration["JwtExpireHours"]));
            var token = new JwtSecurityToken(Configuration["JwtIssuer"],
                                            Configuration["JwtAudience"],
                                            claims,
                                            expires: expires,
                                            signingCredentials: creds
                                            );
            response = new
            {
                UserId = user.Id,
                CompanyName = user.CompanyName,
                auth_token = new JwtSecurityTokenHandler().WriteToken(token),
                success = true
            };
            return Ok(response);
        }

        [HttpPost("Update")]
        public async Task<object> Update([FromBody] UpdateVM model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if(!this.IsExistsdb(model.CompanyName))
                    {
                        return new
                        {
                            success = false,
                            errorMessage = "Update failed"
                        };
                    }
                    var user = db.MemberTable.Where(
                        m => m.CompanyName == model.CompanyName &&
                        m.Name == model.Name && m.Id != model.Id).FirstOrDefault();
                    if (user != null)
                    {
                        //repeated User
                        return new
                        {
                            success = false,
                            errorMessage = "Repeated User Name"
                        };
                    }
                    user.Name = model.Name;
                    user.Age = model.Age;
                    user.Phone = model.Phone;
                    // Update USER
                    db.MemberTable.Attach(user);
                    db.SubmitChanges();
                    return Ok(new
                    {
                        success = true,
                        errorMessage = "Updated Succeeded"
                    });
                }
                catch (Exception ex)
                {
                    // return error message if there was an exception
                    return BadRequest(new { message = ex.Message });
                }
            }
            // If we got this far, something failed, redisplay form
            var response = new
            {
                success = false,
                errorMessage = "Update failed"
            };
            return Ok(response);
        }

       [HttpPost("GetUserProfile")]
        public object GetUserProfile([FromBody] UserVM model)
        {
            if(!IsExistsdb(model.CompanyName))
            {
                return Ok(new
                {
                    success = false,
                    message = "Not Found"
                });
            }
            var user = db.MemberTable.Where(m => m.CompanyName == model.CompanyName && m.Id ==model.UserId).FirstOrDefault();
            if (user != null)
            {
                return Ok(new
                {
                    success = true,
                    message = "Found",
                    currentUserData = new
                    {
                        user.CompanyName,
                        user.Name,
                        user.Age,
                        user.Phone
                    }
                });
            }
            else
            {
                return Ok(new
                {
                    success = false,
                    message = "Not Found"
                });
            }
        }
    }
}