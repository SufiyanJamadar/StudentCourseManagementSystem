namespace StudentCourseManagementApi.Models.DTO
{
    public class StudentAssignmentDto
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int AssignmentId { get; set; }
        public DateTime SubmissionDate { get; set; }
        public string Status { get; set; }
    }
}
