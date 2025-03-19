namespace StudentCourseManagementApi.Models.DTO
{
    public class RegistrationResponseDto
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string CourseName { get; set; }
        public string TeacherName { get; set; }
        public DateTime DateRegistered { get; set; }
    }
}
