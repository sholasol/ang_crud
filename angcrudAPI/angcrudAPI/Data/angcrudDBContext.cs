using System;
using angcrudAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace angcrudAPI.Data
{
	public class angcrudDBContext: DbContext
	{
		public angcrudDBContext(DbContextOptions options): base(options)
		{

		}

		public DbSet <Employee> Employees { get; set; } //communicate with the table
	}
}

