using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnigmaApp.Domain.Models
{
    public class Rotor
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Turnover { get; set; }
        public int InnerShift { get; set; }
    }
}
