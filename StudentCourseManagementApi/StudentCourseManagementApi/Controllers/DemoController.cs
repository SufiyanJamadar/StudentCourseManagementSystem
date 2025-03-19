using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentCourseManagementApi.Data;

namespace StudentCourseManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemoController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public DemoController(ApplicationDbContext context)
        {
            this._context = context;
        }
    }
}
