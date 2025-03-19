namespace StudentCourseManagementApi.Models
{
    public class CourseTeacher
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
    }
}
