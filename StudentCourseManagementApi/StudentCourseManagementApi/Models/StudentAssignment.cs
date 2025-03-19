namespace StudentCourseManagementApi.Models
{
    public class StudentAssignment
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int AssignmentId { get; set; }
        public Assignment Assignment { get; set; }

        public DateTime SubmissionDate { get; set; }
        public string Status { get; set; } // Pending, Submitted, Overdue
    }
}
