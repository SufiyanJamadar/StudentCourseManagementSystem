namespace StudentCourseManagementApi.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }    // Store hashed password
        public List<Registration> Registrations { get; set; }
        public List<StudentAssignment> StudentAssignments { get; set; }  // One Student → Many StudentAssignment (Mappings)
    }
}
