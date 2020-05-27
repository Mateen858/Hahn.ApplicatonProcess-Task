using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using Hahn.ApplicatonProcess.May2020.Domain.Models;

namespace Hahn.ApplicatonProcess.May2020.Domain.Business_Logic
{
   public class ApplicantValidator : AbstractValidator<Applicant>
    {
        public ApplicantValidator()
        {
            RuleFor(applicant => applicant.Name).MinimumLength(5);
            RuleFor(applicant => applicant.FamilyName).MinimumLength(5);
            RuleFor(applicant => applicant.Address).MinimumLength(10);
            RuleFor(applicant => applicant.Email).EmailAddress();
            RuleFor(applicant => applicant.Age).InclusiveBetween(20, 60); ;
            RuleFor(applicant => applicant.Hired).NotNull();

        }
    }
}
