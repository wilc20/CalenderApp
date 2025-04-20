using CalenderApp.Server.Dtos.Event;
using CalenderApp.Server.Models;

namespace CalenderApp.Server.Dtos.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public List<CalendarEntryDto> CalendarEntries { get; set; }
    }
}
