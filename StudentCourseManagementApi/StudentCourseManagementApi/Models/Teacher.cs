namespace StudentCourseManagementApi.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ExperienceInYears { get; set; }
        public double Rating { get; set; } // Example: 4.5
        public List<CourseTeacher> CourseTeachers { get; set; }  // one teacher can teach multiple courses
    }
}
