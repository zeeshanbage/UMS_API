using UMS.API.Endpoints;
using UMS.API.Services;

var options = new WebApplicationOptions
{
    ContentRootPath = AppContext.BaseDirectory,
    WebRootPath = "UMS_Client/dist" // Set your React app's build directory as the web root
};

var builder = WebApplication.CreateBuilder(options);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IConnectionProvider, NpgsqlConnectionProvider>();
builder.Services.AddSingleton<DbConnector>();
builder.Services.AddTransient<CourseService>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3001",
                        "https://umsbackend.azurewebsites.net") // React App's local development URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Use CORS middleware before other middleware like routing
app.UseCors("AllowReactApp");

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles(); // Enable serving static files (React app)

app.MapMobileEndpoints(); // Map your API endpoints
app.MapAdminEndpoints(); // Map your admin API endpoints

// Catch-all route to serve React frontend
app.MapFallbackToFile("index.html");

app.Run();