using api.Data;
using api.Mappings;
using api.Middleware;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IHeroiService, HeroiService>();
builder.Services.AddScoped<ISuperpoderesService, SuperpoderesService>();

var config = new MapperConfiguration(cfg =>
{
    cfg.AddMaps(typeof(Program).Assembly);
});

builder.Services.AddSingleton(config.CreateMapper());

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Gerenciamento de Heróis", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gerenciamento de Heróis API v1"));
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseMiddleware<ErrorHandlingMiddleware>();

app.Run();
