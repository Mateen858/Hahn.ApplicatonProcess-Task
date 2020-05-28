using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using FluentValidation.AspNetCore;
using FluentValidation;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Business_Logic;
using Hahn.ApplicatonProcess.May2020.Data;
using Microsoft.EntityFrameworkCore;
using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Hahn.ApplicatonProcess.May2020.Data.Repository;
using Microsoft.OpenApi.Models;
using Serilog;

namespace Hahn.ApplicatonProcess.May2020.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<AppDbContext>();
            services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("Hahn-Task"));
            services.AddScoped<IApplicantRepository, ApplicantRepository>();
            services.AddMvc().AddFluentValidation();
            services.AddTransient<IValidator<Applicant>, ApplicantValidator>();
            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            // var context = app.ApplicationServices.GetService<AppDbContext>();
            //   AddTestData(context);
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSerilogRequestLogging();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private static void AddTestData(AppDbContext context)
        {
            var testApplicant1 = new Applicant
            {
                Id = 1,
                Name = "Rana Mateen",
                FamilyName = "Rana M",
                Address = "Lahore, Pakistan",
                CountryOfOrigin = "Pakistan",
                Email = "a.mateen858@hotmail.com",
                Age = 30,
                Hired = true
            };

            context.Applicants.Add(testApplicant1);

            var testApplicant2 = new Applicant
            {
                Id = 2,
                Name = "Abdullah Badshah",
                FamilyName = "Abdullah Boy",
                Address = "Lahore, Pakistan",
                CountryOfOrigin = "Pakistan",
                Email = "a.mateen858@hotmail.com",
                Age = 30,
                Hired = true
            };

            context.Applicants.Add(testApplicant1);

            context.SaveChanges();
        }
    }
}
