namespace StudentCourseManagementApi.Models.DTO
{
    public class FinalResultResponseDto
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public string Grade { get; set; } // eg: you can use A, B, C, D, F
        public string Remarks { get; set; }
    }
}
