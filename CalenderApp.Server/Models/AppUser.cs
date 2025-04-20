using Microsoft.AspNetCore.Identity;

namespace CalenderApp.Server.Models
{
    public class AppUser : IdentityUser
    {
        public List<CalendarEntry> CalendarEntries { get; set; } = new List<CalendarEntry>();
    }
}
