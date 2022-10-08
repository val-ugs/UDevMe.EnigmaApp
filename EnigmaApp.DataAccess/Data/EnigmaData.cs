using EnigmaApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnigmaApp.DataAccess.Data
{
    public class EnigmaData
    {
        private static readonly Lazy<EnigmaData> instance = new Lazy<EnigmaData>(() => new EnigmaData());
        public static EnigmaData Instance { get { return instance.Value; } }

        public List<Rotor> Rotors = new List<Rotor>()
        {
            new Rotor
            {
                Id = 1,
                Text = "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
                Turnover = "Q",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 2,
                Text = "AJDKSIRUXBLHWTMCQGZNPYFVOE",
                Turnover = "E",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 3,
                Text = "BDFHJLCPRTXVZNYEIWGAKMUSQO",
                Turnover = "V",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 4,
                Text = "ESOVPZJAYQUIRHXLNFTGKDCMWB",
                Turnover = "J",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 5,
                Text = "VZBRGITYUPSDNHLXAWMJQOFECK",
                Turnover = "Z",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 6,
                Text = "JPGVOUMFYQBENHZRDKASXLICTW",
                Turnover = "ZM",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 7,
                Text = "NZJHGRCXMYSWBOUFAIVLPEKQDT",
                Turnover = "ZM",
                InnerShift = 0
            },
            new Rotor
            {
                Id = 8,
                Text = "FKQHTLXOCBJSPDZRAMEWNIUYGV",
                Turnover = "ZM",
                InnerShift = 0
            },
        };

        public Dictionary<string, string> Reflectors = new Dictionary<string, string>()
        {
            { "B", "YRUHQSLDPXNGOKMIEBFZCWVJAT" },
            { "C", "FVPJIAOYEDRZXWGCTKUQSBNMHL" },
            { "B Dunn", "ENKQAUYWJICOPBLMDXZVFTHRGS" },
            { "C Dunn", "RDOBJNTKVEHMLFCWZAXGYIPSUQ" },
        };
    }
}
