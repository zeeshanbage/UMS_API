using UMS.API.Endpoints;
using UMS.API.Services;

var options = new WebApplicationOptions
{
    ContentRootPath = AppContext.BaseDirectory,
    WebRootPath = "wwwroot" // Changed to match the deployment folder
};

var builder = WebApplication.CreateBuilder(options);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IConnectionProvider, NpgsqlConnectionProvider>();
builder.Services.AddSingleton<DbConnector>();
builder.Services.AddTransient<CourseService>();

// Configure CORS for development and production
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// Serve static files first
app.UseStaticFiles(); // Serves files from wwwroot

// Enable CORS before routing
app.UseCors("AllowAll");

// API Endpoints
app.MapMobileEndpoints();
app.MapAdminEndpoints();

// Handle client-side routing for React
app.MapFallbackToFile("index.html");

app.Run();
