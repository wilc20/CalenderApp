namespace CalenderApp.Server.Dtos.Event
{
    public class UpdateCalendarEntryDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTimeOffset EventDateTime { get; set; }
        public string? UserId { get; set; }
    }
}
