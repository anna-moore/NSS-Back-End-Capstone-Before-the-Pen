using BeforeThePen.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeforeThePen.Models;
using BeforeThePen.Repositories;
using Microsoft.AspNetCore.Authorization;


namespace BeforeThePen.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class HomepageController : ControllerBase
    {
        private readonly IHomepageRepository _homepageRepository;

        public HomepageController(IHomepageRepository homepageRepository)
        {
            _homepageRepository = homepageRepository;
        }

        [HttpGet("helpfulLinks")]
        public IActionResult GetHomepageResources()
        {
            var links = _homepageRepository.GetHomepageResources();
            if (links == null)
            {
                return NotFound();
            }
            return Ok(links);
        }

        [HttpGet("currentSpotlight")]
        public IActionResult GetCurrentSpotlight()
        {
            var spotlight = _homepageRepository.GetCurrentSpotlight();
            if (spotlight == null)
            {
                return NotFound();
            }
            return Ok(spotlight);
        }
    }
}
