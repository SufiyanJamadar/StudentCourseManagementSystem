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
            var finalresults = await _context.FinalResults
                  .Include(fr => fr.Student)
                  .Include(fr => fr.Course)
                  .Select(fr => new FinalResultResponseDto
                  {
                      Id = fr.Id,
                      StudentName = fr.Student.Name,
                      StudentId=fr.Student.Id,
                      CourseName = fr.Course.Name,
                      CourseId=fr.Course.Id,
                      Grade = fr.Grade,
                      Remarks = fr.Remarks
                  }).AsNoTracking().ToListAsync();

            return Ok(finalresults);
        }


        [HttpGet("getFinalResultById/{id}")]
        public async Task<ActionResult<FinalResultResponseDto>> GetFinalResultById(int id)
        {
            var getfinalresult = await _context.FinalResults
                .Include(gfr => gfr.Student)
                .Include(gfr => gfr.Course)
                .FirstOrDefaultAsync(gfr=> gfr.Id == id);

            if (getfinalresult == null)
            {
                return NotFound("There is not Result Available related to This");
            }

            var responseDto = new FinalResultResponseDto
            {
                Id = getfinalresult.Id,
                StudentName = getfinalresult.Student.Name,
                StudentId = getfinalresult.Student.Id,
                CourseName = getfinalresult.Course.Name,
                CourseId = getfinalresult.Course.Id,
                Grade = getfinalresult.Grade,
                Remarks = getfinalresult.Remarks

            };

            return Ok(responseDto);

        }



        //[HttpPost("create")]
        //public async Task<IActionResult> CreateFinalResult([FromBody] FinalResultDto model)
        //{
        //    var finalresult = new FinalResult
        //    {
        //        StudentId = model.StudentId,
        //        CourseId = model.CourseId,
        //        Grade = model.Grade,
        //        Remarks = model.Remarks
        //    };

        //    _context.FinalResults.Add(finalresult);
        //    await _context.SaveChangesAsync();
        //    return Ok(finalresult);
        //}

        [HttpPost("createfinalresult")]

        public async Task<ActionResult<FinalResultResponseDto>> CreateFinalResult([FromBody] FinalResultDto finalResultDto)
        {
            if (finalResultDto == null)
            {
                return BadRequest("Model is Null");
            }

            var student = await _context.Students.FirstOrDefaultAsync(x => x.Id == finalResultDto.StudentId);
            var course=await _context.Courses.FirstOrDefaultAsync(x=>x.Id== finalResultDto.CourseId);

            if(student==null  || course == null)
            {
                return NotFound("Student or Course not found");
            }

            var finalresult = new FinalResult
            {
                Id = finalResultDto.Id,
                StudentId = finalResultDto.StudentId,
                CourseId = finalResultDto.CourseId,
                Grade = finalResultDto.Grade,
                Remarks = finalResultDto.Remarks
            };

            _context.FinalResults.Add(finalresult);
            await _context.SaveChangesAsync();


            var responseDto = new FinalResultResponseDto
            {
                Id = finalresult.Id,
                StudentName = student.Name,
                CourseName = course.Name,
                Grade = finalresult.Grade,
                Remarks = finalresult.Remarks
            };


            return CreatedAtAction(nameof(GetFinalResultById), new { finalresult.Id }, responseDto);

        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateFinalResult(int id, [FromBody] FinalResultDto model)
        {

            var finalresult = await _context.FinalResults.FirstOrDefaultAsync(x => x.Id == id);

            if (finalresult == null)
            {
                return NotFound();
            }

            var student = await _context.Students.FindAsync(model.StudentId);
            var course = await _context.Courses.FindAsync(model.CourseId);

            if(student==null  || course == null)
            {
                return NotFound("Teacher or Course not found");
            }

            finalresult.StudentId = student.Id;
            finalresult.CourseId = course.Id;
            

            await _context.SaveChangesAsync();
            return Ok(new { message = "CourseTeacher Updated Successfully" });

            
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
