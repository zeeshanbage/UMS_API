using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using UMS.API.Contracts;

namespace UMS.API.Endpoints;
public static class MobileEndpoints
{
    public static void MapMobileEndpoints(this WebApplication app)
    {
        #region EndPoints

        // Group all routes under the '/api' prefix
        var mobileGroup = app.MapGroup("/api");

        mobileGroup.MapGet("/generate-presigned-url", (string pathToFile) =>
        {
            var url = R2Connector.GetSignedUrl(pathToFile);
            return url;
        })
        .WithOpenApi()
        .WithTags("Mobile");

        mobileGroup.MapGet("/GetCourses", async (CourseService courseService) =>
        {
            var result = await courseService.GetCourses();
            return ConvertCoursesResult(result);
        })
        .WithOpenApi()
        .WithTags("Mobile");

        mobileGroup.MapGet("/GetApplications", async (CourseService courseService, int academicYearId = 0, int parentCourseId = 0) =>
        {
            return await courseService.GetApplicationsById(academicYearId, parentCourseId);
        })
        .WithOpenApi()
        .WithTags("Mobile");

        mobileGroup.MapGet("/GetSubmittedForms", async (CourseService courseService, string userId = "", int formId = 0) =>
        {
            return await courseService.GetSubmittedForms(userId, formId);
        })
        .WithOpenApi()
        .WithTags("Mobile");

        #endregion

        #region ConvertResults
        object ConvertCoursesResult(List<Course> result)
        {
            var courses = result.GroupBy(course => course.CourseId)
                            .Select(group => new
                            {
                                CourseId = group.Key,
                                Title = group.First().Title, // Explicitly cast Title to string
                                Subtitle = group.First().Subtitle,
                                ImageUrl = group.First().ImageUrl,
                                AcademicYears = group
                                .Where(row => row.AcademicYearId != null) // Exclude rows with null AcademicYearId
                                .Select(row => new AcademicYear
                                {
                                    AcademicYearId = (int)row.AcademicYearId, // Explicitly cast AcademicYearId to int
                                    Title = (string)row.AcademicYearTitle,
                                    CourseId = group.Key,
                                }).ToList()
                            });
            return courses;
        }
        #endregion
    }
}
