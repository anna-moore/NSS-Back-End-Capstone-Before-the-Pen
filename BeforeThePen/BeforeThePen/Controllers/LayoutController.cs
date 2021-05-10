using BeforeThePen.Repositories;
using BeforeThePen.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LayoutController : ControllerBase
    {
        private readonly ILayoutRepository _layoutRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public LayoutController(ILayoutRepository layoutRepository, IUserProfileRepository userProfileRepository)
        {
            _layoutRepository = layoutRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("GetLayoutByUser/{userProfileId}")]

        public IActionResult GetLayoutByUser(int userProfileId)
        {
            var layouts = _layoutRepository.GetLayoutsByUser(userProfileId);
            if (layouts == null)
            {
                return NotFound();
            }
            return Ok(layouts);
        }

        //get layout by id
        [HttpGet("{id}")]
        public IActionResult GetLayoutById(int layoutId)
        {
            var layout = _layoutRepository.GetLayoutById(layoutId);
            if (layout == null)
            {
                return NotFound();
            }
            return Ok(layout);
        }

        [HttpPost]
        public IActionResult AddLayout(Layout layout)
        {
            var User = GetCurrentUserProfile();
            layout.UserProfileId = User.Id;
            _layoutRepository.AddLayout(layout);
            return CreatedAtAction(nameof(GetLayoutById), new { id = layout.Id }, layout);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateLayout(int id, Layout layout)
        {
            if (id != layout.Id)
            {
                return BadRequest();
            }

            _layoutRepository.UpdateLayout(layout);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLayout(int id)
        {
            _layoutRepository.DeleteLayout(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
