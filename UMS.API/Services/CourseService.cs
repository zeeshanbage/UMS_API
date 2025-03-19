using System.Data;
using System.Text.Json;
using System.Linq;
using UMS.API.Contracts;
using UMS.API.Services;
using System;

public class CourseService
{
    private readonly DbConnector _dbConnector;
    

    public CourseService(DbConnector dbConnector)
    {
        _dbConnector = dbConnector;
    }

    #region Course
    public async Task<List<Course>> GetCourses()
    {
        // Query to fetch all courses and academic years
        const string query = @"
        SELECT 
            c.CourseId AS CourseId,
            c.title AS Title,
            c.subtitle AS Subtitle,
            c.ImageUrl AS ImageUrl,
            ay.academicyearId AS AcademicYearId,
            ay.Title AS AcademicYearTitle
        FROM 
            public.Courses c
        LEFT JOIN 
            AcademicYear ay
        ON 
            c.CourseId = ay.CourseId
        ORDER BY c.CourseId DESC;";

        // Execute the query and fetch dynamic results
        var result = await _dbConnector.QueryMultipleRows<Course>(query);

        return result.ToList();
    }

    public async Task<int> InsertCourse(CourseRequest course)
    {
        const string courseQuery = @"
        INSERT INTO public.Courses (title, subtitle, imageurl)
        VALUES (@Title, @Subtitle, @ImageUrl)
        RETURNING CourseId";

        var courseParameters = new
        {
            course.Title,
            course.Subtitle,
            course.ImageUrl,
        };
        var courseId = await _dbConnector.ExecuteScalarAsync<int>(courseQuery, courseParameters);

        const string academicYearQuery = @"
        INSERT INTO public.AcademicYear (Title, CourseId)
        VALUES (@Title, @CourseId);";

        var academicYearParams = course.AcademicYears.Select(acadYear => new
        {
            Title = acadYear.Title,
            CourseId = courseId // Automatically links to the inserted CourseId
        }).ToList();

        await _dbConnector.ExecuteAsync(academicYearQuery, academicYearParams);
        return courseId;
    }


    public async Task<int> DeleteCourse(int courseId)
    {
        const string academicYearQuery = @"
        DELETE FROM public.AcademicYear
        WHERE CourseId=@CourseId";

        var academicYearParams = new
        {
            CourseId = courseId
        };

        var rowCount = await _dbConnector.ExecuteAsync(academicYearQuery, academicYearParams);

        const string courseQuery = @"
        DELETE FROM public.Courses
        WHERE CourseId=@CourseId";

        var courseParameters = new
        {
            CourseId = courseId
        };

        rowCount += await _dbConnector.ExecuteAsync(courseQuery, courseParameters);
        return rowCount;
    }

    internal async Task<int> UpdateCourse(CourseRequest course)
    {
        await DeleteCourse(course.CourseId);
        return await InsertCourse(course);
    }
    #endregion

    #region Application
    public async Task<int> InsertApplication(Application application)
    {
        const string query = @"
        INSERT INTO public.Applications (subtitle, name, academicYearId, courseId, imageUrl, Documents, textInputFields, dropDownFields)
        VALUES (@Subtitle, @Name, @AcademicYearId, @CourseId, @ImageUrl, @Documents, @TextInputFields, @DropDownFields)
        RETURNING ApplicationId";

        var parameters = new
        {
            application.Subtitle,
            application.Name,
            application.AcademicYearId,
            application.CourseId,
            application.ImageUrl,
            application.Documents,
            application.TextInputFields,
            application.DropDownFields
        };
        return await _dbConnector.ExecuteScalarAsync<int>(query, parameters);
    }

    public async Task<int> DeleteApplication(int applicationId)
    {
        const string query = @"
        DELETE FROM public.Applications
        WHERE ApplicationId=@ApplicationId";

        var parameters = new
        {
            ApplicationId = applicationId
        };
        return await _dbConnector.ExecuteAsync(query, parameters);
    }

    public async Task<List<Application>> GetApplications()
    {
        // Query to fetch all courses and academic years
        string query = @"
        SELECT a.*,
        c.Title AS CourseTitle,
        ay.Title AS AcademicYearTitle
        FROM public.applications a 
        LEFT JOIN public.Courses c
            ON c.CourseId = a.CourseId
        LEFT JOIN public.AcademicYear ay
            ON ay.academicyearId= a.academicyearId";

        // Execute the query and fetch dynamic results
        var result = await _dbConnector.QueryMultipleRows<Application>(query);

        return result.ToList();
    }

    public async Task<List<Application>> GetApplicationsById(int academicYearId, int courseId)
    {
        // Query to fetch all courses and academic years

        string query = @"
        SELECT a.*,
        c.Title AS CourseTitle,
        ay.Title AS AcademicYearTitle
        FROM public.applications a
        LEFT JOIN public.Courses c
            ON c.CourseId = a.CourseId
        LEFT JOIN public.AcademicYear ay
            ON ay.academicyearId= a.academicyearId
        WHERE (@CourseId=0 OR a.CourseId=@CourseId)
        AND (@AcademicYearId=0 OR a.AcademicYearId=@AcademicYearId)
        order by a.applicationId DESC";

        var parameters = new { AcademicYearId = academicYearId, CourseId = courseId };

        // Execute the query and fetch dynamic results
        var result = await _dbConnector.QueryMultipleRows<Application>(query, parameters);

        return result.ToList();
    }


    internal async Task<int> UpdateApplication(Application application)
    {
        const string query = @"
        UPDATE public.Applications
        SET subtitle = @Subtitle,
            name = @Name,
            academicYearId = @AcademicYearId,
            courseId = @CourseId,
            imageUrl = @ImageUrl,
            Documents = @Documents,
            textInputFields = @TextInputFields,
            dropDownFields = @DropDownFields
        WHERE applicationId = @ApplicationId;";

        var parameters = new
        {
            application.Subtitle,
            application.Name,
            application.AcademicYearId,
            application.CourseId,
            application.ImageUrl,
            application.ApplicationId,
            application.Documents,
            application.TextInputFields,
            application.DropDownFields
            // Assuming ApplicationId is a property in the Application class
        };

        return await _dbConnector.ExecuteAsync(query, parameters);
    } 
    #endregion


    #region NotRequired Now
    internal async Task<int> InsertDynamicForm(DynamicForm dynamicForm)
    {
        const string query = @"
        INSERT INTO public.DynamicForms (name, documents, textInputFields, dropDownFields, applicationId)
        VALUES (@Name, @Documents, @TextInputFields, @DropDownFields, @ApplicationId)
        RETURNING FormId;";

        var parameters = new
        {
            dynamicForm.Name,
            dynamicForm.Documents,
            dynamicForm.TextInputFields,
            dynamicForm.DropDownFields,
            dynamicForm.ApplicationId,
        };
        return await _dbConnector.ExecuteScalarAsync<int>(query, parameters);
    }

    internal async Task<int> DeleteDynamicForm(int formId)
    {
        const string query = @"
        DELETE FROM public.DynamicForms
        WHERE FormId=@FormId";

        var parameters = new
        {
            FormId = formId
        };
        return await _dbConnector.ExecuteAsync(query, parameters);
    }

    internal async Task<DynamicForm> GetDynamicForm(int applicationId)
    {
        string query = @"
        SELECT 
        FormId,
        Name,
        Documents,
        textInputFields,
        dropDownFields,
        applicationId
        FROM public.DynamicForms
        WHERE ApplicationId=@ApplicationId";

        var parameters = new
        {
            ApplicationId = applicationId
        };

        var result = await _dbConnector.QueryMultipleRows<DynamicForm>(query, parameters);
        return result.FirstOrDefault();
    }

    #endregion

}
