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
    public class StudentAssignmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentAssignmentController(ApplicationDbContext context)
        {
            this._context = context;
        }

        // GET All StudentAssignments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentAssignmentResponseDto>>> GetAllStudentsAssighments()
        {

            var studentAssighments = await _context.StudentAssignments
                .Include(sa => sa.Student)
                .Include(sa => sa.Assignment)
                .ToListAsync();

            var responseDtos = studentAssighments.Select(sa => new StudentAssignmentResponseDto
            {
                Id = sa.Id,
                StudentName = sa.Student.Name,
                AssignmentName = sa.Assignment.Description,
                SubmissionDate = sa.SubmissionDate,
                Status = sa.Status
            });

            return Ok(responseDtos);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<StudentAssignmentResponseDto>> GetStudentAssignment(int id)
        {
            var studentAssignment = await _context.StudentAssignments
                .Include(sa => sa.Student)
                .Include(sa => sa.Assignment)
                .FirstOrDefaultAsync(sa => sa.Id == id);
            if (studentAssignment == null)
            {
                return NotFound("StudentAssignment is Null ");
            }
            var responseDto = new StudentAssignmentResponseDto
            {
                Id = studentAssignment.Id,
                StudentName = studentAssignment.Student.Name,
                AssignmentName = studentAssignment.Assignment.Description,
                SubmissionDate = studentAssignment.SubmissionDate,
                Status = studentAssignment.Status
            };
            return Ok(responseDto);
        }

        [HttpPost]
        public async Task<ActionResult<StudentAssignmentResponseDto>> CreateStudentAssignment(StudentAssignmentDto studentAssignmentDto)
        {
            // check if the AssighmentId and StudentId are valid or not

            var student = await _context.Students.FindAsync(studentAssignmentDto.StudentId);
            var assighment = await _context.Assignments.FindAsync(studentAssignmentDto.AssignmentId);

            if (student == null || assighment == null)
            {
                return NotFound("Student or Assignment is not valid its not present in the System");
            }

            var studentAssignment = new StudentAssignment
            {
                StudentId = studentAssignmentDto.StudentId,
                AssignmentId = studentAssignmentDto.AssignmentId,
                SubmissionDate = studentAssignmentDto.SubmissionDate,
                Status = studentAssignmentDto.Status
            };

            _context.StudentAssignments.Add(studentAssignment);
            await _context.SaveChangesAsync();


            var responseDto = new StudentAssignmentResponseDto
            {
                Id = studentAssignment.Id,
                StudentName = student.Name,
                AssignmentName = assighment.Description,
                SubmissionDate = studentAssignmentDto.SubmissionDate,
                Status = studentAssignmentDto.Status
            };

            return Ok(responseDto);
        }



        [HttpPut("{id}")]
        public async Task<ActionResult<StudentAssignmentResponseDto>> UpdateStudentAssignment(int id, StudentAssignmentDto studentAssignmentDto)
        {
            var studentAssignment = await _context.StudentAssignments.FirstOrDefaultAsync(x => x.Id == id);
            if (studentAssignment == null)
            {
                return NotFound();
            }
            studentAssignment.SubmissionDate = studentAssignmentDto.SubmissionDate;
            studentAssignment.Status = studentAssignmentDto.Status;
            await _context.SaveChangesAsync();
            var responseDto = new StudentAssignmentResponseDto
            {
                Id = studentAssignment.Id,
                StudentName = studentAssignment.Student.Name,
                AssignmentName = studentAssignment.Assignment.Description,
                SubmissionDate = studentAssignment.SubmissionDate,
                Status = studentAssignment.Status
            };
            return Ok(responseDto);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentAssighment(int id)
        {
            var studentassighment = await _context.StudentAssignments.FindAsync(id);

            if (studentassighment == null)
            {
                return NotFound("StudentAssignment not found");
            }

            _context.StudentAssignments.Remove(studentassighment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "StudentAssighment deleted successfully!" });
        }

    }
}
