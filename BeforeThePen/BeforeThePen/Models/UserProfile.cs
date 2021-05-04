using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime DateCreated { get; set; }

        public string ImageURL { get; set; }
    }
}
