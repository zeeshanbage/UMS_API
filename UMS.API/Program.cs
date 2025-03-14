using UMS.API.Contracts;
using UMS.API.Endpoints;
using UMS.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IConnectionProvider, NpgsqlConnectionProvider>();
builder.Services.AddSingleton<DbConnector>();
builder.Services.AddTransient<CourseService>();

var app = builder.Build();

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

app.Run();