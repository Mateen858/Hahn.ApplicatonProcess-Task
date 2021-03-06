﻿using System;
using System.Threading.Tasks;
using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Hahn.ApplicatonProcess.May2020.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicantRepository _repository;
        private readonly ILogger<ApplicantController> _logger;
        

        public ApplicantController(IApplicantRepository repository, ILogger<ApplicantController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("GetOne")]
        public async Task<IActionResult> GetOne(int id)
        {
            var result = await _repository.GetOneById(id);
            //return Ok(await _adCategoryRepository.GetOneById(id));
            return new JsonResult(result);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _repository.GetAll();
            return new JsonResult(result);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save(Applicant applicant)
        {
            int id = 0;
            if (ModelState.IsValid)
            {
                id = await _repository.CreateNew(applicant);
                if (id > 0)
                    return CreatedAtAction(nameof(GetOne), new { id = applicant.Id }, applicant);
                else
                {
                    return BadRequest("Something Went Wrong");
                }
            }
            else
            {
                var a = ModelState;
                return BadRequest(ModelState);
            }
        }
        
        [HttpPut("Update")]
        public async Task<IActionResult> Update(Applicant applicant)
        {
            int id = 0;
            try
            {

            }
            catch (Exception ex)
            {

            }
            if (ModelState.IsValid)
            {
                id = await _repository.Update(applicant);
                if (id > 0)
                    return CreatedAtAction(nameof(GetOne), new { id = applicant.Id }, applicant);
                else
                {
                    return BadRequest("Something Went Wrong");
                }
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _repository.Delete(id);
            return new JsonResult(result);
        }

    }
}