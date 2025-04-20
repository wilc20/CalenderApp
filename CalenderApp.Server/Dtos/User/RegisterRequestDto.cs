using System.ComponentModel.DataAnnotations;

namespace CalenderApp.Server.Dtos.User
{
    public class RegisterRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Username cannot be less than 5 characters.")]
        [MaxLength(30, ErrorMessage = "Username cannot be more than 30 characters.")]
        public string Username { get; set; }
        [Required]
        [MinLength(10, ErrorMessage = "Password cannot be less than 10 characters.")]
        [MaxLength(30, ErrorMessage = "Password cannot be more than 40 characters.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$", ErrorMessage = "Password requires at least 1 uppercase character, 1 lowercase character, 1 number and a special character.")]
        public string Password { get; set; }
        [MinLength(4, ErrorMessage = "Email address cannot be less than 4 characters.")]
        [MaxLength(320, ErrorMessage ="Email address cannot be more than 320 characters.")]
        public string? Email { get; set; }
    }
}
