using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CalenderApp.Data
{
    public class UserEvents
    {
        [Key]
        public int EventId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public TimeSpan Created { get; set; }

        public UserEvents()
        {

        }
    }
}
