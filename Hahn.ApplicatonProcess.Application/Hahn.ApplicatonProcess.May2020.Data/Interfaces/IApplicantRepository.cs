using Hahn.ApplicatonProcess.May2020.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Data.Interfaces
{
    public interface IApplicantRepository
    {
        Task<List<Applicant>> GetAll();
        Task<Applicant> GetOneById(int id);
        Task<int> CreateNew(Applicant applicant);
        Task<int> Update(Applicant applicant);
        Task<bool> Delete(int id);
    }
}
