using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BeforeThePen.Models;
using BeforeThePen.Repositories;
using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace BeforeThePen.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TypeOfMediaController : ControllerBase
    {
        private readonly ITypeOfMediaRepository _typeOfMediaRepository;

        public TypeOfMediaController(ITypeOfMediaRepository typeOfMediaRepository)
        {
            _typeOfMediaRepository = typeOfMediaRepository;
        }

        [HttpGet]
        public IActionResult GetAllTypeOfMedia()
        {
            var typeOfMedia = _typeOfMediaRepository.GetAllTypeOfMedia();
            if (typeOfMedia ==null)
            {
                return NotFound();
            }
            return Ok(typeOfMedia);
        }
    }
}
