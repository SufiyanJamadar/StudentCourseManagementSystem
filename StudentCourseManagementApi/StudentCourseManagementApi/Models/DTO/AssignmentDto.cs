namespace StudentCourseManagementApi.Models.DTO
{
    public class AssignmentDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int CourseId { get; set; }


       
        public DateTime Deadline { get; set; }
    }
}
