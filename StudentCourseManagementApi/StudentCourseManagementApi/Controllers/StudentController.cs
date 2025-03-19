using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCourseManagementApi.Data;
using StudentCourseManagementApi.Models.DTO;
using StudentCourseManagementApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace StudentCourseManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllStudent()
        {
            Console.WriteLine("GetAll Student Endpoint Hit");
            var student = await _context.Students.ToListAsync();
            return Ok(student);
        }




        [HttpPost("create")]
        public async Task<IActionResult> CreateStudent([FromBody] StudentDto model)
        {
            var student = new Student
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Students Created Successfully" });
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentDto model)
        {
            var student = await _context.Students.FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            student.Name = model.Name;
            student.Email = model.Email;
            student.Password = model.Password;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Students Updated Successfully" });
        }


        //[Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound("Teacher not found");

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Students deleted successfully!" });
        }
    }
}
