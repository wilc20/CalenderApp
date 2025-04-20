namespace CalenderApp.Server.Dtos.Event
{
    public class CreateCalendarEntryDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTimeOffset EventDateTime { get; set; }
    }
}
