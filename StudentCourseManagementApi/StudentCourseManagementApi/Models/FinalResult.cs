namespace StudentCourseManagementApi.Models
{
    public class FinalResult
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public string Grade { get; set; } // eg: you can use A, B, C, D, F
        public string Remarks { get; set; }
    }
}
