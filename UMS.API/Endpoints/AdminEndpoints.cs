namespace UMS.API.Endpoints
{
    using UMS.API.Contracts;
    using Microsoft.AspNetCore.Builder;

    public static class AdminEndpoints
    {
        public static void MapAdminEndpoints(this WebApplication app)
        {
            app.MapPost("/InsertCourse", async (CourseService courseService, CourseRequest course) =>
            {
                return await courseService.InsertCourse(course);
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

            //app.MapPost("/InsertDynamicForm", async (CourseService courseService, DynamicForm dynamicForm) =>
            //{
            //    return await courseService.InsertDynamicForm(dynamicForm);
            //})
            //.WithOpenApi()
            //.WithTags("Admin");

            //app.MapPost("/DeleteDynamicForm", async (CourseService courseService, int formId) =>
            //{
            //    return await courseService.DeleteDynamicForm(formId);
            //})
            //.WithOpenApi()
            //.WithTags("Admin");
        }
    }
}
