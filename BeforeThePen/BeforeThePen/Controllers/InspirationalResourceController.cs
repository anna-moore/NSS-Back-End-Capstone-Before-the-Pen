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
    public class InspirationalResourceController : ControllerBase
    {
        private readonly IInspirationalResourceRepository _inspirationalResourceRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public InspirationalResourceController(IInspirationalResourceRepository inspirationalResourceRepository, IUserProfileRepository userProfileRepository)
        {
            _inspirationalResourceRepository = inspirationalResourceRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("GetByUser/{userProfileId}")]
        public IActionResult GetResourcesByUserId(int userProfileId)
        {
            //UserProfile user = GetCurrentUserProfile();
            var resources = _inspirationalResourceRepository.GetResourcesByUserId(userProfileId);
            if (resources == null)
            {
                return NotFound();
            }
            return Ok(resources);
        }

        [HttpGet("{id}")]
        public IActionResult GetResourcesById(int resourceId)
        {
            var resource = _inspirationalResourceRepository.GetResourcesById(resourceId);
            if (resource == null)
            {
                return NotFound();
            }
            return Ok(resource);
        }

        [HttpPost]
        public IActionResult AddResource(Resource resource)
        {
            var currentUser = GetCurrentUserProfile();
            resource.UserProfileId = currentUser.Id;
            _inspirationalResourceRepository.AddResource(resource);
            return CreatedAtAction(nameof(GetResourcesById), new { id = resource.Id }, resource);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateResource(int id, Resource resource)
        {
            var currentUser = GetCurrentUserProfile();
            resource.UserProfileId = currentUser.Id;
            if (id != resource.Id)
            {
                return BadRequest();
            }

            _inspirationalResourceRepository.UpdateResource(resource);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteResource(int id)
        {
            _inspirationalResourceRepository.DeleteResource(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
