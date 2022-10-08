using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnigmaApp.Domain.Models
{
    public class EnigmaModel
    {
        public string PatchPanelText { get; set; }
        public Rotor Rotor1 { get; set; }
        public Rotor Rotor2 { get; set; }
        public Rotor Rotor3 { get; set; }
        public string ReflectorText { get; set; }
    }
}
