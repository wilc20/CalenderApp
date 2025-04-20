namespace CalenderApp.Server.Models
{
    public class CalendarEntry
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateTimeOffset EventDateTime { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string? UserId { get; set; }
        public AppUser? User { get; set; }
    }
}
