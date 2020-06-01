using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation;
using Hahn.ApplicatonProcess.May2020.Domain.Models;
using Hahn.ApplicatonProcess.May2020.Domain.Business_Logic;
using Hahn.ApplicatonProcess.May2020.Data;
using Microsoft.EntityFrameworkCore;
using Hahn.ApplicatonProcess.May2020.Data.Interfaces;
using Hahn.ApplicatonProcess.May2020.Data.Repository;
using Microsoft.OpenApi.Models;
using Serilog;
using FluentValidation.AspNetCore;

namespace Hahn.ApplicatonProcess.May2020.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("mycors",
                builder =>
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
                );
            });
            services.AddControllers();
            services.AddScoped<AppDbContext>();
            services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("Hahn-Task"));
            services.AddScoped<IApplicantRepository, ApplicantRepository>();
            services.AddMvc().AddFluentValidation();
            services.AddTransient<IValidator<Applicant>, ApplicantValidator>();
            services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" }));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("mycors");
            app.UseSwagger();
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
