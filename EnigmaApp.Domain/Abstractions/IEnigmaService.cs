using EnigmaApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnigmaApp.Domain.Abstractions
{
    public interface IEnigmaService
    {
        public OutputEnigmaModel Encrypt(string text, EnigmaModel enigmaModel);
    }
}
