using CalenderApp.Server.Data;
using CalenderApp.Server.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CalenderApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var Users = await _context.Users.Include(user => user.CalendarEntries).ToListAsync();

            var userDto = Users.Select(s => s.ToUserDto());

            return Ok(Users);
        }
        /*public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var User = await _context.Users.Include(user => user.CalendarEntries).FirstOrDefaultAsync(i => i.Id == id);

            if (User == null) 
            { 
                return NotFound();
            }

            return Ok(User.ToUserDto());    
        }
        /*
         *         public string Get(int id)
        {
            return "value";
        }
         */
        // POST api/<UserController>
        [HttpPost]
        /*public IActionResult Create([FromBody] CreateUserRequest userDto)
        {

        }*/
        public IActionResult Post([FromBody] string value)
        {
            return Ok(new { message = value });
        }

        

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
