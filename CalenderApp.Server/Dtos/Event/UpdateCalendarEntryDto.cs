using System.ComponentModel.DataAnnotations;

namespace CalenderApp.Server.Dtos.Event
{
    public class UpdateCalendarEntryDto
    {
        [Required]
        [MinLength(1, ErrorMessage = "Title must be more than 1 character.")]
        [MaxLength(50, ErrorMessage = "Title cannot be more than 50 characters.")]
        public string Title { get; set; } = string.Empty;
        [MaxLength(300, ErrorMessage = "Description cannot be more than 300 characters.")]
        public string Description { get; set; } = string.Empty;
        [Required]
        public DateTimeOffset EventDateTime { get; set; }
    }
}
