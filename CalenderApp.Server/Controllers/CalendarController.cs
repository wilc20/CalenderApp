using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace CalenderApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalendarController : ControllerBase
    {
        private readonly IConfiguration _config;
        public CalendarController(IConfiguration config) => _config = config;

        [HttpGet]
        public IActionResult Get()
        {
            using var conn = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            conn.Open();
            using var cmd = new SqlCommand("SELECT GETDATE()", conn);
            var result = cmd.ExecuteScalar();

            return Ok(new
            {
                message = "Hello!",
                serverTime = result?.ToString()
            });
        }

        /*[HttpPost]
        public IActionResult Create([FromBody] Create) { }*/
    }
}