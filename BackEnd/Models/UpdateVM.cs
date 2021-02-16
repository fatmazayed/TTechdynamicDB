using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class UpdateVM
    {
        public int Id { get; set; }
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Name")]
        [StringLength(150, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 2)]
        public string Name { get; set; }
        public int Age { get; set; }
        [StringLength(30, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 7)]
        public string Phone { get; set; }
        public string CompanyName { get; set; }
    }
}
