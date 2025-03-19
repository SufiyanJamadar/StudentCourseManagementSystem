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
    public class FinalResultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FinalResultController(ApplicationDbContext context)
        {
            this._context = context;
        }


        // GET All FinalResults

        [HttpGet("all")]
        public async Task<IActionResult> GetAllFinalResult()
        {
            var finalresults = await _context.FinalResults.AsNoTracking().ToListAsync();
            return Ok(finalresults);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFinalResult([FromBody] FinalResultDto model)
        {
            var finalresult = new FinalResult
            {
                StudentId = model.StudentId,
                CourseId = model.CourseId,
                Grade = model.Grade,
                Remarks = model.Remarks
            };

            _context.FinalResults.Add(finalresult);
            await _context.SaveChangesAsync();
            return Ok(finalresult);
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateFinalResult(int id, [FromBody] FinalResultDto model)
        {
            if (model == null)
            {
                return BadRequest("Model is Null");
            }

            var finalresult = await _context.FinalResults.FirstOrDefaultAsync(x => x.Id == id);

            if (finalresult == null)
            {
                return NotFound();
            }

            finalresult.StudentId = model.StudentId;
            finalresult.CourseId = model.CourseId;
            finalresult.Grade = model.Grade;
            finalresult.Remarks = model.Remarks;

            await _context.SaveChangesAsync();
            return Ok(finalresult);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteFinalResult(int id)
        {
            var finalresult = await _context.FinalResults.FirstOrDefaultAsync(x => x.Id == id);
            if (finalresult == null)
            {
                return NotFound();
            }
            _context.FinalResults.Remove(finalresult);
            await _context.SaveChangesAsync();
            return Ok(new { message = "FinalResult deleted successfully!" });
        }
    }
}
