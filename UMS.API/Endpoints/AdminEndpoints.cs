namespace UMS.API.Endpoints
{
    using UMS.API.Contracts;
    using Microsoft.AspNetCore.Builder;

    public static class AdminEndpoints
    {
        public static void MapAdminEndpoints(this WebApplication app)
        {
            app.MapPost("/SaveCourse", async (CourseService courseService, CourseRequest course) =>
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

            app.MapPost("/DeleteCourse", async (CourseService courseService,int courseId) =>
            {
                return await courseService.DeleteCourse(courseId);
            })
            .WithOpenApi()
            .WithTags("Admin");

            app.MapPost("/InsertApplication", async (CourseService courseService, Application application) =>
            {
                return await courseService.InsertApplication(application);
            })
            .WithOpenApi()
            .WithTags("Admin");

            app.MapPost("/UpdateApplication", async (CourseService courseService, Application application) =>
            {
                return await courseService.UpdateApplication(application);
            })
            .WithOpenApi()
            .WithTags("Admin");

            app.MapPost("/DeleteApplication", async (CourseService courseService, int applicationId) =>
            {
                return await courseService.DeleteApplication(applicationId);
            })
            .WithOpenApi()
            .WithTags("Admin");
        }
    }
}
