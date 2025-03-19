using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCourseManagementApi.Data;
using StudentCourseManagementApi.Models;
using StudentCourseManagementApi.Models.DTO;

namespace StudentCourseManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseController(ApplicationDbContext context)
        {
            this._context = context;
        }



        [HttpGet("all")]
        public async Task<IActionResult> GetAllCourses()
        {
            var course= await _context.Courses.ToListAsync();
            return Ok(course);
        }




        [HttpPost("create")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto model)
        {
            var course = new Course
            {
                Name = model.Name,
                DurationInDays = model.DurationInDays,
                DailyHours = model.DailyHours,
            };

             _context.Courses.Add(course);
             await _context.SaveChangesAsync();
             return Ok(new {message="Course Created Successfully"});
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] CourseDto model)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);
            if (course == null)
            {
                return NotFound();
            }
            course.Name = model.Name;
            course.DurationInDays = model.DurationInDays;
            course.DailyHours = model.DailyHours;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Course Updated Successfully" });
        }


        //[Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound("Course not found");

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Course deleted successfully!" });
        }

    }
}
