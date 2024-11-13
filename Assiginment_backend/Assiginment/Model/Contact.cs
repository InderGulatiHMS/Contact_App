
using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "FirstName is required.")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required.")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email format.")]
        public string? Email { get; set; }
    }
}
