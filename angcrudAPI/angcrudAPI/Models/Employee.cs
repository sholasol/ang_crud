using System;
namespace angcrudAPI.Models
{
	public class Employee
	{
		public int Id { get; set; }

		public string? Firstname { get; set; }

		public string? Lastname { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public long? Salary { get; set; }

		public string?  Department { get; set; }
	}
}

