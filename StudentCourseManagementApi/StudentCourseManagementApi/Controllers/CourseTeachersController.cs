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
    public class CourseTeachersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseTeachersController(ApplicationDbContext context)
        {
            this._context = context;
        }

        // GET All CourseTeachers

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseTeacherResponseDto>>> GetAllCourseTeachers()
        {
            var courseteachers = await _context.CourseTeachers
                 .Include(ct => ct.Course)
                 .Include(ct => ct.Teacher)
                 .ToListAsync();

            var responseDtos = courseteachers.Select(ct => new CourseTeacherResponseDto
            {
                Id = ct.Id,
                CourseName = ct.Course.Name,
                TeacherName = ct.Teacher.Name

            });

            return Ok(responseDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseTeacherResponseDto>> GetCourseTeacher(int id)
        {
            var courseteacher = await _context.CourseTeachers
                 .Include(ct => ct.Course)
                 .Include(ct => ct.Teacher)
                 .FirstOrDefaultAsync(ct => ct.Id == id);

            if (courseteacher == null)
            {
                return NotFound("CourseTeacher is Null ");
            }

            var responseDto = new CourseTeacherResponseDto
            {
                Id = courseteacher.Id,
                CourseName = courseteacher.Course.Name,
                TeacherName = courseteacher.Teacher.Name
            };

            return Ok(responseDto);

        }

        [HttpPost("courseTeachersRegister")]
        public async Task<ActionResult<CourseTeacherResponseDto>> CreateCourseTeacher(CourseTeacherDto courseTeacherDto)
        {

            // chcek if tecaher or Course exists

            var teacher = await _context.Teachers.FindAsync(courseTeacherDto.TeacherId);
            var course = await _context.Courses.FindAsync(courseTeacherDto.CourseId);

            if (teacher == null || course == null)
            {
                return NotFound("Teacher or Course not found");
            }

            var courseteacher = new CourseTeacher
            {
                CourseId = course.Id,
                TeacherId = teacher.Id
            };

            _context.CourseTeachers.Add(courseteacher);
            await _context.SaveChangesAsync();


            var responseDto = new CourseTeacherResponseDto
            {
                Id = courseteacher.Id,
                CourseName = course.Name,
                TeacherName = teacher.Name
            };

            return CreatedAtAction(nameof(GetAllCourseTeachers), new { courseteacher.Id }, responseDto);
        }



        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCourseTeacher(int id, [FromBody] CourseTeacherDto model)
        {
            var courseteacher = await _context.CourseTeachers.FirstOrDefaultAsync(x => x.Id == id);
            if (courseteacher == null)
            {
                return NotFound();
            }
            var teacher = await _context.Teachers.FindAsync(model.TeacherId);
            var course = await _context.Courses.FindAsync(model.CourseId);
            if (teacher == null || course == null)
            {
                return NotFound("Teacher or Course not found");
            }
            courseteacher.CourseId = course.Id;
            courseteacher.TeacherId = teacher.Id;
            await _context.SaveChangesAsync();
            return Ok(new { message = "CourseTeacher Updated Successfully" });
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCourseTeacher(int id)
        {
            var courseteacher = await _context.CourseTeachers.FindAsync(id);
            if (courseteacher == null)
            {
                return NotFound("CourseTeacher not found");
            }

            _context.CourseTeachers.Remove(courseteacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "CourseTeacher deleted successfully!" });
        }
    }
}
