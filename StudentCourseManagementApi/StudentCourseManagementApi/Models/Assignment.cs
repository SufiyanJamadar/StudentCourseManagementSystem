namespace StudentCourseManagementApi.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public DateTime Deadline { get; set; }
    }
}
