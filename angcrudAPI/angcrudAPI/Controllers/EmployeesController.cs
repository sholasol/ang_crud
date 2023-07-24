using System;
using angcrudAPI.Data;
using angcrudAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace angcrudAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")] //api route

	public class EmployeesController: Controller
	{
		private readonly angcrudDBContext _angcrudDbContext; //local DbContext

		public EmployeesController(angcrudDBContext angcrudDbContext)
		{
			_angcrudDbContext = angcrudDbContext;

        }

		[HttpGet] //get all eployees

		public async Task<IActionResult> GetAllEmployees()
		{
			var employees = await _angcrudDbContext.Employees.ToListAsync();

			return Ok(employees); //return the employee list to frontend app
		}


        [HttpPost] //create employee route

        public async Task<IActionResult> AddEmployees([FromBody] Employee employeeRequest) //get input from users
        {
			await _angcrudDbContext.Employees.AddAsync(employeeRequest);

			await _angcrudDbContext.SaveChangesAsync();

            //return Ok(employeeRequest);

            return Ok(new {message = "Employee Registered Successfully"});
        }

		//edit employee
		[HttpGet]
		[Route("{id}")]

		public async Task<IActionResult> GetEmployee([FromRoute] int id)
		{
			var employee = await _angcrudDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

			if(employee == null)
			{
				return NotFound();
			}

			return Ok(employee);
		}
    }

	
}

