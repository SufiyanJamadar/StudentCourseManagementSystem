namespace StudentCourseManagementApi.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }

        public DateTime DateRegistered { get; set; }
    }
}
