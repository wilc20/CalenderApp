using CalenderApp.Server.Dtos.Event;
using CalenderApp.Server.Models;

namespace CalenderApp.Server.Mappers
{
    public static class CalendarEntryMappers
    {
        public static CalendarEntryDto ToCalendarEntryDto(this CalendarEntry calendarEntry)
        {
            return new CalendarEntryDto
            {
                Id = calendarEntry.Id,
                Title = calendarEntry.Title,
                Description = calendarEntry.Description,
                EventDateTime = calendarEntry.EventDateTime,
                CreatedDate = calendarEntry.CreatedDate,
                UserId = calendarEntry.UserId,
            };
        }

        public static CalendarEntryDto ToUserFromGet(this CalendarEntry calendarEntryDto) 
        {
            return new CalendarEntryDto
            {
                Id = calendarEntryDto.Id,
                Title = calendarEntryDto.Title,
                Description = calendarEntryDto.Description,
                EventDateTime = calendarEntryDto.EventDateTime,
                CreatedDate = calendarEntryDto.CreatedDate,
            };
        }

        public static CalendarEntry ToCalendarEntryFromCreate(this CreateCalendarEntryDto calendarEntryDto, string userId)
        {
            return new CalendarEntry
            {
                Title = calendarEntryDto.Title,
                Description = calendarEntryDto.Description,
                EventDateTime = calendarEntryDto.EventDateTime,
                UserId = userId,
            };
        }

        public static CalendarEntry ToCalendarEntryFromUpdate(this UpdateCalendarEntryDto calendarEntryDto)
        {
            return new CalendarEntry
            {
                Title = calendarEntryDto.Title,
                Description = calendarEntryDto.Description,
                EventDateTime = calendarEntryDto.EventDateTime
            };
        }
    }
}
