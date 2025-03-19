using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentCourseManagementApi.Models;

namespace StudentCourseManagementApi.Data
{
    public class ApplicationDbContext:IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Teacher> Teachers { get; set; }

        public DbSet<CourseTeacher> CourseTeachers { get; set; }

        public DbSet<Registration> Registrations { get; set; }
        public DbSet<Assignment> Assignments { get; set; }   
        public DbSet<StudentAssignment> StudentAssignments { get; set; }
        public DbSet<FinalResult> FinalResults { get; set; }


    }
}
