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
    public class CourseControllerTest
    {
        private ApplicationDbContext _context;
        private CourseController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);

            // Seed a course with Id=1
            _context.Courses.Add(new Course
            {
                Id = 1,
                Name = "Original Course",
                DurationInDays = 30,
                DailyHours = 4,

            });
            _context.SaveChanges();

            _controller = new CourseController(_context);
        }


        [TearDown]
        public void TearDown()
        {
            _context?.Database.EnsureDeleted();
            _context?.Dispose();
        }


        [Test]
        public async Task GetAllCourses_ReturnsAllCourses()
        {
            // Act
            var controller = new CourseController(_context);
            var result = await controller.GetAllCourses();

            // Assert
            var okReult = result as OkObjectResult;
            Assert.IsNotNull(okReult);


            var courses = okReult.Value as List<Course>;
            Assert.IsNotNull(courses);
            Assert.AreEqual(1, courses.Count);
        }


        [Test]
        public async Task CreateCourse_ReturnsSuccessMessage()
        {
            var controller = new CourseController(_context);
            // Arrange
            var newCourse = new CourseDto
            {
                Id = 1,
                Name = "New Course",
                DurationInDays = 60,
                DailyHours = 4

            };

            //Act
            var result = await _controller.CreateCourse(newCourse);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            Assert.AreEqual("Course Created Successfully", okResult.Value
                .GetType().GetProperty("message").GetValue(okResult.Value));
        }

        [Test]
        public async Task UpdateCourse_ReturnsSuccessMessage()
        {
            // Arrange
            var controller = new CourseController(_context);
            var updatedCourse = new CourseDto
            {
                Id = 1,
                Name = "Updated Course",
                DurationInDays = 45,
                DailyHours = 5
            };
            // Act
            var result = await controller.UpdateCourse(1, updatedCourse);
            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual("Course Updated Successfully", okResult.Value
                .GetType().GetProperty("message").GetValue(okResult.Value));


        }

        [Test]
        public async Task DeleteCourse_ReturnsSuccessMessage()
        {
            // Arrange
            var controller = new CourseController(_context);

            // Act

            var result = await controller.DeleteCourse(1);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            Assert.AreEqual("Course deleted successfully!", okResult.Value.GetType()
                .GetProperty("message").GetValue(okResult.Value));
        }



        [Test]
        public async Task DeleteCourse_ReturnsNotFound_WhenCourseNotExist()
        {
            var controller = new CourseController(_context);

            var result = await controller.DeleteCourse(9991);

            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }


    }

}