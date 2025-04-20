using CalenderApp.Server.Models;

namespace CalenderApp.Server.Interfaces
{
    public interface ICalendarEntryRepository
    {
        Task<List<CalendarEntry>> GetAllByUserIdAsync(string userId);
        Task<CalendarEntry?> GetByIdForUserAsync(int id);

        Task<CalendarEntry> CreateAsync(CalendarEntry calendarEntry);
        Task<CalendarEntry?> UpdateAsync(int id, string userId,CalendarEntry calendarEntry);

        Task<CalendarEntry?> DeleteAsync(int id, string userId);
    }
}
