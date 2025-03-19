namespace StudentCourseManagementApi.Models.DTO
{
    public class RegistrationDto
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public int TeacherId { get; set; }

        public DateTime DateRegistered { get; set; }
        
    }
}
