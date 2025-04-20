using CalenderApp.Server.Models;

namespace CalenderApp.Server.Interfaces
{
    public interface ICalendarEntryRepository
    {
        Task<List<CalendarEntry>> GetAllByUserIdAsync(string userId);
        Task<CalendarEntry?> GetByIdForUserAsync(int id);

        Task<CalendarEntry> CreateAsync(CalendarEntry calendarEntry);
    }
}
