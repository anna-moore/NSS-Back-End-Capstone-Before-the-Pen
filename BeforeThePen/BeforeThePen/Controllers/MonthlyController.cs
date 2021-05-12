using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BeforeThePen.Models;
using BeforeThePen.Repositories;
using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlyController : ControllerBase
    {
        private readonly IMonthlyRepository _monthlyRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IMonthlyLayoutRepository _monthlyLayoutRepository;
        public MonthlyController(IMonthlyRepository monthlyRepository,
            IUserProfileRepository userProfileRepository, IMonthlyLayoutRepository monthlyLayoutRepository)
        {
            _monthlyRepository = monthlyRepository;
            _userProfileRepository = userProfileRepository;
            _monthlyLayoutRepository = monthlyLayoutRepository;
        }

        //Question should I put the other get in this controller method??
        [HttpGet("GetMonthlyByUser/{userProfileId}")]
        public IActionResult GetMonthlyByUser(int userProfileId)
        {
            //UserProfile user = GetCurrentUserProfile();
            var monthly = _monthlyRepository.GetMonthlyByUser(userProfileId);
            if (monthly == null)
            {
                return NotFound();
            }
            return Ok(monthly);
        }

        //get monthly by id
        [HttpGet("{monthlyId}")]
        public IActionResult GetMonthlyById(int monthlyId)
        {
            var monthly = _monthlyRepository.GetMonthlyById(monthlyId);
            if (monthly == null)
            {
                return NotFound();
            }
            return Ok(monthly);
        }

        //what needs to go in this Httppost?      
        /*[HttpPost]
        public IActionResult AddMonthly(Monthly monthly)
        {
            var User = GetCurrentUserProfile();
            monthly.UserProfileId = User.Id;
            _monthlyRepository.AddMonthly(monthly);
            return CreatedAtAction(nameof(GetMonthlyById), new { id = monthly.Id }, monthly);
        }*/

        //combines both monthly and monthly layouts so they can exist on the same form 
        //
        [HttpPost]
        public IActionResult AddMonthlyAndLayouts([FromBody] TotalMonthlyAndLayout totalMonthly)
        {
            var monthly = totalMonthly.Monthly;
            var layouts = totalMonthly.MonthlyLayouts;

            var User = GetCurrentUserProfile();
            monthly.UserProfileId = User.Id;

            _monthlyRepository.AddMonthly(monthly);

            foreach (var layoutItem in layouts)
            {
                layoutItem.MonthlyId = monthly.Id;
                _monthlyLayoutRepository.AddMonthyLayout(layoutItem);
            }
            return CreatedAtAction(nameof(GetMonthlyById), new { monthlyId = monthly.Id }, monthly);
        }

        //combine monthly and monthlyLayout update form??

        //edit monthly
        [HttpPut("{id}")]
        public IActionResult UpdateMonthly(int id, Monthly monthly)
        {
            if (id != monthly.Id)
            {
                return BadRequest();
            }

            _monthlyRepository.UpdateMonthly(monthly);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMonthly(int id)
        {
            _monthlyRepository.DeleteMonthly(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
