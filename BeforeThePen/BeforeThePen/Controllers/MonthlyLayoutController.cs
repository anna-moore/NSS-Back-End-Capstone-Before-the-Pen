﻿using BeforeThePen.Models;
using BeforeThePen.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeforeThePen.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlyLayoutController : ControllerBase
    {
        private readonly IMonthlyLayoutRepository _monthlyLayoutRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public MonthlyLayoutController(IMonthlyLayoutRepository monthlyLayoutRepository, IUserProfileRepository userProfileRepository)
        {
            _monthlyLayoutRepository = monthlyLayoutRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("GetMonthlyLayoutsByUser/{monthlyId}")]
        public IActionResult GetMonthlyLayoutsByUser(int id, int monthlyId)
        {
            var monthlyLayouts = _monthlyLayoutRepository.GetMonthlyLayoutsByUser(id, monthlyId);
            if (monthlyLayouts == null)
            {
                return NotFound();
            }
            return Ok(monthlyLayouts);
        }

        [HttpGet("{id}")]
        public IActionResult GetMonthlyLayoutById(int monthlyId)
        {
            var monthlyLayout = _monthlyLayoutRepository.GetMonthlyLayoutById(monthlyId);
            if (monthlyLayout == null)
            {
                return NotFound();
            }
            return Ok(monthlyLayout);
        }

        //what needs to go in this Httppost?
        //firebase is not included here
        [HttpPost]
        public IActionResult AddMonthyLayout(MonthlyLayout monthlyLayout)
        {

            _monthlyLayoutRepository.AddMonthyLayout(monthlyLayout);
            return CreatedAtAction(nameof(GetMonthlyLayoutById), new { id = monthlyLayout.Id }, monthlyLayout);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMonthlyLayout(int id, MonthlyLayout monthlyLayout)
        {
            if (id != monthlyLayout.Id)
            {
                return BadRequest();
            }

            _monthlyLayoutRepository.UpdateMonthlyLayout(monthlyLayout);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMonthlyLayout(int id)
        {
            _monthlyLayoutRepository.DeleteMonthlyLayout(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
