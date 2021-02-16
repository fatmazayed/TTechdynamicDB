using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string UserFName { get; set; }
        [Required]
        public string UserLName { get; set; }

    }
}
