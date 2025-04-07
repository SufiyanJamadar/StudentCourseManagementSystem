using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCourseManagementApi.Controllers;
using StudentCourseManagementApi.Data;
using StudentCourseManagementApi.Models;
using StudentCourseManagementApi.Models.DTO;

namespace StudentCourseManagementSystem.nUnitTests
{
    public class Tests
    {

        private  ApplicationDbContext _context;


        [TearDown]
        public void TearDown()
        {
            _context?.Dispose();
        }



        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context=new ApplicationDbContext(options);


            _context.Students.AddRange(new List<Student>
            {
                new Student { Id = 1, Name = "John Doe", Email = "john@example.com", Password = "password1" },
                new Student { Id = 2, Name = "Jane Doe", Email = "jane@example.com", Password = "password2" }
            });
            _context.SaveChanges();
        }

        [Test]
        public async Task GetAllStudent_ReturnsAllStudent()
        {
            var controller=new StudentController(_context);

            var result=await controller.GetAllStudent();

            //Assert here
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var students=okResult.Value as List<Student>;
            Assert.IsNotNull(students);
            Assert.AreEqual(2, students.Count);

        }


        [Test]
        public async Task CreateStudent_ReturnsSuccessMessage()
        {
            var controller=new StudentController(_context);
            var student = new StudentDto
            {
                Name = "New Student",
                Email = "new@example.com",
                Password = "newpassword"
            };

            var result=await controller.CreateStudent(student);

            // Assert

            var okResult=result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual("Students Created Successfully", okResult.Value.GetType()
                .GetProperty("message").GetValue(okResult.Value));
        }


        [Test]
        public async Task UpdateStudent_ReturnsSuccessMessage()
        {
            // Arrange
            var controller = new StudentController(_context);
            var updatedStudent = new StudentDto
            {
                Name = "Updated Name",
                Email = "updated@example.com",
                Password = "updatedpassword"

            };

            //Act
            var result = await controller.UpdateStudent(1, updatedStudent);

            // Assert

            var okResult=result as OkObjectResult;
            Assert.IsNotNull(okResult);

            Assert.AreEqual("Students Updated Successfully", okResult.Value.GetType()
                .GetProperty("message").GetValue(okResult.Value));
        }


        [Test]
        public async Task DeleteStudent_ReturnsSuccessMessage()
        {
            
            var controller = new StudentController(_context);

            // Act
            var result = await controller.DeleteStudent(1);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual("Students deleted successfully!", okResult.Value.GetType().GetProperty("message").GetValue(okResult.Value));
        }


        [Test]
        public async Task DeleteStudent_ReturnsNotFound_WhenStudentNotExist()
        {
            var controller = new StudentController(_context);
            
            var result=await controller.DeleteStudent(9991); // this id is does not Exist

            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }
    }
}