using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCourseManagementApi.Data;
using StudentCourseManagementApi.Models.DTO;
using StudentCourseManagementApi.Models;

namespace StudentCourseManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeacherController(ApplicationDbContext context)
        {
            this._context = context;
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetAllTeacher()
        {
            var teacher = await _context.Teachers.ToListAsync();
            return Ok(teacher);
        }

        
        [HttpPost("create")]
        public async Task<IActionResult> CreateTeacher([FromBody] TeacherDto model)
        {
            var teacher = new Teacher
            {
                Name = model.Name,
                ExperienceInYears = model.ExperienceInYears,
                Rating = model.Rating
            };

            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Teacher Created Successfully" });
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateTeacher(int id, [FromBody] TeacherDto model)
        {
            var teacher = await _context.Teachers.FirstOrDefaultAsync(x => x.Id == id);
            if (teacher == null)
            {
                return NotFound();
            }
            teacher.Name = model.Name;
            teacher.ExperienceInYears = model.ExperienceInYears;
            teacher.Rating = model.Rating;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Teacher Updated Successfully" });
        }


        //[Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null) return NotFound("Teacher not found");

            _context.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Teacher deleted successfully!" });
        }
    }
}
