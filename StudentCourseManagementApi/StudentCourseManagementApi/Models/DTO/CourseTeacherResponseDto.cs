﻿namespace StudentCourseManagementApi.Models.DTO
{
    public class CourseTeacherResponseDto
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string TeacherName { get; set; }

        public int CourseId { get; set; }

        public int TeacherId { get; set; }
    }
}
