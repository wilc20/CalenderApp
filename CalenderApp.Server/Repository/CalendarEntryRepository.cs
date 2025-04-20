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

        public async Task<List<CalendarEntry>> GetAllByUserIdAsync(string userId)
        {
            return await _context.CalendarEntries.Where(e => e.UserId == userId ).ToListAsync();
        }

        public async Task<CalendarEntry?> GetByIdForUserAsync(int id)
        {
            return await _context.CalendarEntries.FindAsync(id);
        }


    }
}
