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
			//get the employee
			var employee = await _angcrudDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

			if(employee == null)
			{
				return NotFound();
			}

			return Ok(employee);
		}

		//update employee record

		[HttpPut]
        [Route("{id}")]

		public async Task<IActionResult> UpdateEmployee([FromRoute] int id, Employee updateEmployeeRequest)
		{
			//find the employee
			var employee = await _angcrudDbContext.Employees.FindAsync(id);

			if(employee ==null)
			{
				return NotFound();
			}

			employee.Firstname = updateEmployeeRequest.Firstname;
            employee.Lastname = updateEmployeeRequest.Lastname;
            employee.Email = updateEmployeeRequest.Email;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;


			await _angcrudDbContext.SaveChangesAsync();

			return Ok(employee);
        }

		[HttpDelete]
        [Route("{id}")]

		public async Task<IActionResult> deleteEmployee([FromRoute] int id)
		{
            //find the employee
            var employee = await _angcrudDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

			_angcrudDbContext.Employees.Remove(employee);
			await _angcrudDbContext.SaveChangesAsync();

            return Ok(new { message = "Employee Deleted Successfully" });
        }
    }

	
}

