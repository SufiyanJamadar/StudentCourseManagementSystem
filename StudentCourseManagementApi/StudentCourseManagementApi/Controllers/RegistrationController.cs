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
    public class RegistrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegistrationController(ApplicationDbContext context)
        {
            this._context = context;
        }


        // GET All Registrations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistrationResponseDto>>> GetRegistrations()
        {
            var registrations = await _context.Registrations
                .Include(r => r.Student)
                .Include(r => r.Teacher)
                .Include(r => r.Course)
                .ToListAsync();

            var responseDtos = registrations.Select(r => new RegistrationResponseDto
            {
                Id = r.Id,
                StudentName = r.Student.Name,
                CourseName = r.Course.Name,
                TeacherName = r.Teacher.Name,
                DateRegistered = r.DateRegistered
            }).ToList();

            return Ok(responseDtos);
        }


        // Get By ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Registration>> GetRegistration(int id)
        {
            var registration = await _context.Registrations
                .Include(r => r.Student)
                .Include(r => r.Teacher)
                .Include(r => r.Course)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (registration == null)
                return NotFound("Registration not found.");

            var responseDto = new RegistrationResponseDto
            {
                Id = registration.Id,
                StudentName = registration.Student.Name,
                CourseName = registration.Course.Name,
                TeacherName = registration.Teacher.Name,
                DateRegistered = registration.DateRegistered
            };

            return Ok(responseDto);
        }



        [HttpPost("register")]
        public async Task<ActionResult<RegistrationResponseDto>> CreateRegistration(RegistrationDto registrationDto)
        {
            // Check if Student, Teacher, and Course exist
            var student = await _context.Students.FindAsync(registrationDto.StudentId);
            var teacher = await _context.Teachers.FindAsync(registrationDto.TeacherId);
            var course = await _context.Courses.FindAsync(registrationDto.CourseId);

            if (student == null || teacher == null || course == null)
                return BadRequest("Invalid Student, Teacher, or Course ID.");

            // logic for the  Prevent duplicate registration
            bool exists = await _context.Registrations.AnyAsync(r =>
                r.StudentId == registrationDto.StudentId && r.CourseId == registrationDto.CourseId);

            if (exists)
            {
                return BadRequest("Student is all ready Registered for this Cpurse");
            }

            var registration = new Registration
            {
                StudentId = registrationDto.StudentId,
                TeacherId = registrationDto.TeacherId,
                CourseId = registrationDto.CourseId,
                DateRegistered = DateTime.UtcNow
            };

             _context.Registrations.Add(registration);
             await _context.SaveChangesAsync();


            var responseDto = new RegistrationResponseDto
            {
                Id = registration.Id,
                StudentName = student.Name,
                CourseName = course.Name,
                TeacherName = teacher.Name,
                DateRegistered = registration.DateRegistered
            };

            return CreatedAtAction(nameof(GetRegistration), new { id = registration.Id }, responseDto);
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRegistration(int id, [FromBody] RegistrationDto model)
        {
            var registration = await _context.Registrations.FirstOrDefaultAsync(r => r.Id == id);
            if (registration == null)
            {
                return NotFound("Registration not found.");
            }

            registration.StudentId = model.StudentId;
            registration.CourseId = model.CourseId;
            registration.TeacherId = model.TeacherId;
            registration.DateRegistered = model.DateRegistered;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Registration  Updated Successfully" });
        }

        // Delete
        [HttpDelete("delete/{id}")]
       public async Task<IActionResult> DeleteRegistration(int id)
       {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                return NotFound("Registration not found.");

            _context.Registrations.Remove(registration);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration deleted successfully!" });
       }
    }
}
