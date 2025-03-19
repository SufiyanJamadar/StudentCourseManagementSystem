namespace StudentCourseManagementApi.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DurationInDays { get; set; } // Example: 30, 60, 90 days
        public int DailyHours { get; set; } // 2, 4, etc.
        public List<CourseTeacher> CourseTeachers { get; set; }  // one course can taught by multiple teachers
        public List<Assignment> Assignments { get; set; }   /// A course will have multiple assignments, but an assignment belongs to only one course.
    }
}
