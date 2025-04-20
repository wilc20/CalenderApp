using CalenderApp.Server.Dtos.Event;
using CalenderApp.Server.Interfaces;
using CalenderApp.Server.Mappers;
using CalenderApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace CalenderApp.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarEntryController : ControllerBase
    {

        
        private readonly ICalendarEntryRepository _repo;
        private readonly UserManager<AppUser> _userManager;

        public CalendarEntryController(ICalendarEntryRepository calenderEntryRepository, UserManager<AppUser> userManager)
        {
            _repo = calenderEntryRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) { return Unauthorized(); }

            var usersEntries = await _repo.GetAllByUserIdAsync(user.Id);
            var calenderEntryDto = usersEntries.Select(s => s.ToCalendarEntryDto());

            return Ok(calenderEntryDto);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var singleEvent = await _repo.GetByIdForUserAsync(id);

            if (singleEvent == null)
            {
                return NotFound();
            }

            return Ok(singleEvent.ToCalendarEntryDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCalendarEntryDto calenderEntryDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) { return Unauthorized(); }

            var newCalenderEntry = calenderEntryDto.ToCalendarEntryFromCreate(user.Id);

            await _repo.CreateAsync(newCalenderEntry);

            return CreatedAtAction(nameof(GetById), new { id = newCalenderEntry }, newCalenderEntry.ToCalendarEntryDto());
        }
    }
}
