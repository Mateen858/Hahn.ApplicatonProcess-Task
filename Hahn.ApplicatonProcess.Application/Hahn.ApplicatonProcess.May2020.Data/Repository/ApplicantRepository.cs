using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Repository
{
   public class ApplicantRepository : IApplicantRepository
    {
        private readonly AppDbContext _db;
        private readonly ILogger<ApplicantRepository> _logger;

        //public ApplicantRepository()
        //{
        //    _db = new AppDbContext(new DbContextOptions<AppDbContext>());
           
        //}

        public ApplicantRepository(AppDbContext db, ILogger<ApplicantRepository> logger)
        {
            _db = db;
            _logger = logger;
        }
        public async Task<int> CreateNew(Applicant applicant)
        {
            int result = 0;
            try
            {
                _db.Applicants.Add(applicant);
                await _db.SaveChangesAsync();
                result = applicant.Id;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = -1;
            }
            return result;

            
        }

        public async Task<bool> Delete(int id)
        {
            bool result = false;
            try
            {
                var applicant = await _db.Applicants.FirstOrDefaultAsync(a => a.Id == id);
                if (applicant != null)
                {
                     _db.Applicants.Remove(applicant);
                    await _db.SaveChangesAsync();
                    result = true;
                }
                else
                {

                    result = false;
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = false;
            }
            return result;
        }

        public async Task<List<Applicant>> GetAll()
        {
            List<Applicant> applicants;
            try
            {
                applicants = await _db.Applicants.ToListAsync();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                applicants = null;
            }
            return applicants;
        }

        public async Task<Applicant> GetOneById(int id)
        {
            Applicant applicant;
            try
            {
                applicant = await _db.Applicants.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                applicant = null;
            }
            return applicant;
        }

        public async Task<int> Update(Applicant applicant)
        {
            int result = 0;
            try
            {
                _db.Applicants.Update(applicant);
                await _db.SaveChangesAsync();
                result = applicant.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                result = -1;
            }
            return result;
        }
    }
}
