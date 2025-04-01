namespace UMS.API.Contracts
{
    public class Course
    {
        public int CourseId { get; set; }
        public required string Title { get; set; }
        public string? Subtitle { get; set; }
        public int AcademicYearId { get; set; }
        public string? AcademicYearTitle { get; set; }

        public string? ImageUrl { get; set; }
    }

    public class CourseRequest
    {
        public int CourseId { get; set; }
        public required string Title { get; set; }
        public string? Subtitle { get; set; }
        public string? ImageUrl { get; set; }
        public List<AcademicYear>? AcademicYears { get; set;}
    }

    public class AcademicYear
    {
        public int AcademicYearId { get; set; }
        public string? Title { get; set; }
        public int CourseId { get; set; }

    }

    public class Application
    {
        public int ApplicationId { get; set; }
        public required string Name { get; set; }
        public string? CourseTitle { get; set; }
        public string? academicYearTitle { get; set; }
        public string? Subtitle { get; set; }
        public string? ImageUrl { get; set; }
        public int CourseId { get; set; }
        public int AcademicYearId { get; set; }
        public string? Documents { get; set; }
        public string? TextInputFields { get; set; }
        public string? DropDownFields { get; set; }
    }

    public class DynamicForm
    {
        public int FormId { get; set; }
        public required string Name { get; set; }
        public string? Documents { get; set; }
        public string? TextInputFields { get; set; }
        public string? DropDownFields { get; set; }
        public int ApplicationId { get; set; }

    }

    public class SubmittedForm
    {
        public int SubmittedFormId { get; set; }
        public required string UserId { get; set; }
        public int FormId { get; set; }
        public required string Name { get; set; }
        public string? DocumentsData { get; set; }
        public string? TextInputFieldsData { get; set; }
        public string? Status {  get; set; }
        public string? CourseTitle { get; set; }
        public string? academicYearTitle { get; set; }
        public DateTime? Submitted_Date { get; set;}
    }
}
