using CalenderApp.Server.Data;
using CalenderApp.Server.Interfaces;
using CalenderApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CalenderApp.Server.Repository
{
    public class CalendarEntryRepository : ICalendarEntryRepository
    {
        private readonly ApplicationDbContext _context;
        public CalendarEntryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CalendarEntry> CreateAsync(CalendarEntry newEntry)
        {
            await _context.CalendarEntries.AddAsync(newEntry);
            await _context.SaveChangesAsync();
            return newEntry;
        }

        public async Task<CalendarEntry?> DeleteAsync(int id, string userId)
        {
            var existingEntry = await _context.CalendarEntries.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
            
            if (existingEntry == null)
            {
                return null;
            }

            _context.CalendarEntries.Remove(existingEntry);
            await _context.SaveChangesAsync();

            return existingEntry;

        }

        public async Task<List<CalendarEntry>> GetAllByUserIdAsync(string userId)
        {
            return await _context.CalendarEntries.Where(e => e.UserId == userId ).ToListAsync();
        }

        public async Task<CalendarEntry?> GetByIdForUserAsync(int id)
        {
            return await _context.CalendarEntries.FindAsync(id);
        }

        public async Task<CalendarEntry?> UpdateAsync(int id, string userId, CalendarEntry calendarEntry)
        {
            var existingEntry = await _context.CalendarEntries.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (existingEntry == null) { return null; }
            
            existingEntry.Title = calendarEntry.Title;
            existingEntry.Description = calendarEntry.Description;
            existingEntry.EventDateTime = calendarEntry.EventDateTime;

            System.Diagnostics.Debug.WriteLine($"Before Save existingEntry: {existingEntry.EventDateTime}");
            System.Diagnostics.Debug.WriteLine($"Before Save calendarEntry: {calendarEntry.EventDateTime}");

            await _context.SaveChangesAsync();

            return existingEntry;
        }
    }
}
