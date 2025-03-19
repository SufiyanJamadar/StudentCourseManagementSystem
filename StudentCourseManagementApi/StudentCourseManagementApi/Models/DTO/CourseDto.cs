namespace StudentCourseManagementApi.Models.DTO
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DurationInDays { get; set; } // Example: 30, 60, 90 days
        public int DailyHours { get; set; }
    }
}
