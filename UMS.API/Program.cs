using UMS.API.Endpoints;
using UMS.API.Services;

var options = new WebApplicationOptions
{
    ContentRootPath = AppContext.BaseDirectory,
    WebRootPath = "UMS_Client/dist" // Set your custom web root path here
};

var builder = WebApplication.CreateBuilder(options);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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
        policy.WithOrigins("http://localhost:3001") // React App URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


// Use CORS middleware before other middleware like routing
var app = builder.Build();

app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Register routes from separate files
app.MapMobileEndpoints();
app.MapAdminEndpoints();


app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();