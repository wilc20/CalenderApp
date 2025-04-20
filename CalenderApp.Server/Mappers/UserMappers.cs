using CalenderApp.Server.Dtos.User;
using CalenderApp.Server.Models;

namespace CalenderApp.Server.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this AppUser userModel)
        {
            return new UserDto
            {
                Name = userModel.UserName,
                Email = userModel.Email,
                CalendarEntries = userModel.CalendarEntries.Select(e => e.ToCalendarEntryDto()).ToList(),
            };
        }
    }
}
