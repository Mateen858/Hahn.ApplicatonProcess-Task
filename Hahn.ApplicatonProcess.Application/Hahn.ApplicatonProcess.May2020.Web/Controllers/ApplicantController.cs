using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation.AspNetCore;
using Hahn.ApplicatonProcess.May2020.Data;
using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Hahn.ApplicatonProcess.May2020.Domain.Business_Logic;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hahn.ApplicatonProcess.May2020.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly IApplicantRepository _repository;

        public ApplicantController(IApplicantRepository repository)
        {
            _repository = repository;
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
            //for manual validation
            //var applicant1 = new Applicant();
            //var validator = new ApplicantValidator();
            //var results = validator.Validate(applicant1);
            //results.AddToModelState(ModelState, null);
            int id = 0;


            if (ModelState.IsValid)
            {
                id = await _repository.CreateNew(applicant);
                if (id > 0)
                    return Ok(id);
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

        [HttpPut("Update")]
        public async Task<IActionResult> Update(Applicant applicant)
        {
            //for manual validation
            //var applicant1 = new Applicant();
            //var validator = new ApplicantValidator();
            //var results = validator.Validate(applicant1);
            //results.AddToModelState(ModelState, null);
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
                    return Ok(id);
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