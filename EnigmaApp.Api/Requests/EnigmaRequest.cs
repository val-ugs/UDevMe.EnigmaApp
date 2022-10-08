using EnigmaApp.Domain.Models;

namespace EnigmaApp.Api.Requests
{
    public class EnigmaRequest
    {
        public string Text { get; set; }
        public EnigmaModel EnigmaModel { get; set; }
    }
}
