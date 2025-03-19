namespace StudentCourseManagementApi.Models.DTO
{
    public class StudentAssignmentResponseDto
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string AssignmentName { get; set; }
        public DateTime SubmissionDate { get; set; }
        public string Status { get; set; }
    }
}
