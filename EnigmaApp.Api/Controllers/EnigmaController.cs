using EnigmaApp.Api.Requests;
using EnigmaApp.DataAccess.Data;
using EnigmaApp.Domain.Abstractions;
using EnigmaApp.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace EnigmaApp.Api.Controllers
{
    [Route("api/enigma")]
    [ApiController]
    public class EnigmaController : ControllerBase
    {
        private readonly IEnigmaService _enigmaService;

        public EnigmaController (IEnigmaService enigmaService)
        {
            _enigmaService = enigmaService;
        }

        [HttpPost("encrypt")]
        public ActionResult<OutputEnigmaModel> Encrypt(EnigmaRequest enigmaRequest)
        {
            try
            {
                var result = _enigmaService.Encrypt(enigmaRequest.Text, enigmaRequest.EnigmaModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getRotors")]
        public ActionResult<List<Rotor>> GetRotors()
        {
            return EnigmaData.Instance.Rotors;
        }

        [HttpGet("getReflectors")]
        public ActionResult<Dictionary<string, string>> GetReflectors()
        {
            return EnigmaData.Instance.Reflectors;
        }
    }
}
