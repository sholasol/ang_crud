using angcrudAPI.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//mysql connection
builder.Services.AddDbContext<angcrudDBContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("MySqlConnStr"),
        new MySqlServerVersion(new Version(10, 4, 28)),//phpmyadmin version 10.4.28
        mySqlOptions =>
        {
            mySqlOptions.EnableRetryOnFailure();
        });
});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();

