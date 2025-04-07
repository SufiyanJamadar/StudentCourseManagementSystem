using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCourseManagementApi.Controllers;
using StudentCourseManagementApi.Data;
using StudentCourseManagementApi.Models;
using StudentCourseManagementApi.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentCourseManagementSystem.nUnitTests
{
    [TestFixture]
    public class TeacherControllerTest
    {
        private ApplicationDbContext _context;
        private TeacherController _controller;


        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);

            // Seed a teacher with Id=1
            _context.Teachers.Add(new Teacher
            {
                Id = 1,
                Name = "Original Teacher",
                ExperienceInYears = 5,
                Rating = 4.5
            });
            _context.SaveChanges();

            _controller = new TeacherController(_context);
        }


        [TearDown]
        public void SetUp()
        {
            _context?.Database.EnsureDeleted();
            _context?.Dispose();
        }

        [Test]
        public async Task GetAllTeacher_ReturnsAllTeacher()
        {
            // Act
            var result = await _controller.GetAllTeacher();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var teachers = okResult.Value as List<Teacher>;
            Assert.IsNotNull(teachers);
            Assert.AreEqual(1, teachers.Count);

        }

            
        [Test]
        public async Task CreateTeacher_ReturnsSuccessMessage()
        {
            //Arrange
            var controller = new TeacherController(_context);
            var newteacher = new TeacherDto
            {
                Id = 1,
                Name = "New Teacher",
                ExperienceInYears = 5,
                Rating = 4.5
            };

            //Act
            var result = await _controller.CreateTeacher(newteacher);

            //Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual("Teacher Created Successfully", okResult.Value.GetType().GetProperty("message")
                .GetValue(okResult.Value));
        }


        [Test]
        public async Task UpdateTeacher_ReturnsSuccessMessage()
        {
            // Arrange 
           // var controller = new TeacherController(_context);
            var updateTeacher = new TeacherDto
            {
                Id = 1,
                Name = "Updated Teacher",
                ExperienceInYears = 6,
                Rating = 4.8
            };

            // Act

            var result = await _controller.UpdateTeacher(1, updateTeacher);

            // Assert
            var okResult=result as OkObjectResult;
            Assert.IsNotNull(okResult, "Controller action returned null");


            var message = okResult.Value.GetType().GetProperty("message")?.GetValue(okResult.Value);
            Assert.AreEqual("Teacher Updated Successfully", message);




            //Assert.IsNotNull(okResult);
            //Assert.AreEqual("Teacher Updated SuccessFully", okResult.Value.GetType()
            //    .GetProperty("message").GetValue(okResult.Value));
        }


        [Test]
        public async Task Deleteteacher_ReturnsSuccessMessage()
        {
            var controller=new TeacherController(_context);

            // Act

            var result = await controller.DeleteTeacher(1);

            //Assert

            var okResult=result as OkObjectResult;
            Assert.IsNotNull(okResult);

            Assert.AreEqual("Teacher deleted successfully!", okResult.Value.GetType()
                .GetProperty("message").GetValue(okResult.Value));
        }

    }
}
