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
    public class AssignmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AssignmentController(ApplicationDbContext context)
        {
            this._context = context;
        }

        // GET All Assignments

        [HttpGet("all")]
        public async Task<IActionResult> GetAllAssignments()
        {
            var assignments = await _context.Assignments.AsNoTracking().ToListAsync();
            return Ok(assignments);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAssignment([FromBody] AssignmentDto model)
        {
            var assighments = new Assignment
            {
                Description = model.Description,
                CourseId = model.CourseId,
                Deadline = model.Deadline
            };

            _context.Assignments.Add(assighments);
            await _context.SaveChangesAsync();
            return Ok(assighments);
        }



        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateAssignment(int id, [FromBody] AssignmentDto model)
        {

            if (model == null)
            {
                return BadRequest("Model is Null");
            } 


            var assignment = await _context.Assignments.FirstOrDefaultAsync(x => x.Id == id);
            if (assignment == null)
            {
                return NotFound();
            }
            assignment.Description = model.Description;
            assignment.CourseId = model.CourseId;
            assignment.Deadline = model.Deadline;
            await _context.SaveChangesAsync();
            return Ok(assignment);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            var assignment = await _context.Assignments.FirstOrDefaultAsync(x => x.Id == id);
            if (assignment == null)
            {
                return NotFound();
            }
            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Assignment Deleted Successfully" });
        }


    }
}
