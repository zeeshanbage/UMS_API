namespace UMS.API.Endpoints
{
    using UMS.API.Contracts;
    using Microsoft.AspNetCore.Builder;

    public static class AdminEndpoints
    {
        public static void MapAdminEndpoints(this WebApplication app)
        {
            var adminGroup = app.MapGroup("/api"); // Group all admin endpoints under '/api'

            adminGroup.MapPost("/SaveCourse", async (CourseService courseService, CourseRequest course) =>
            {
                if (course.CourseId == 0)
                {
                    return await courseService.InsertCourse(course);
                }
                else
                {
                    return await courseService.UpdateCourse(course);
                }
            })
            .WithOpenApi()
            .WithTags("Admin");

            adminGroup.MapPost("/DeleteCourse", async (CourseService courseService, int courseId) =>
            {
                return await courseService.DeleteCourse(courseId);
            })
            .WithOpenApi()
            .WithTags("Admin");

            adminGroup.MapPost("/InsertApplication", async (CourseService courseService, Application application) =>
            {
                return await courseService.InsertApplication(application);
            })
            .WithOpenApi()
            .WithTags("Admin");

            adminGroup.MapPost("/UpdateApplication", async (CourseService courseService, Application application) =>
            {
                return await courseService.UpdateApplication(application);
            })
            .WithOpenApi()
            .WithTags("Admin");

            adminGroup.MapPost("/DeleteApplication", async (CourseService courseService, int applicationId) =>
            {
                return await courseService.DeleteApplication(applicationId);
            })
            .WithOpenApi()
            .WithTags("Admin");

            adminGroup.MapPost("/SaveFormData", async (CourseService courseService, SubmittedForm form) =>
            {
                return await courseService.InsertUserForm(form);
            })
            .WithOpenApi()
            .WithTags("Admin");
        }
    }
}
