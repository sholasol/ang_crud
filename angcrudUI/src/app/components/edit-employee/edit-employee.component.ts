import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from 'src/app/models/employees.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeDetails: Employees ={
    id:0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    salary: 0,
    department:''
  }

  constructor(
    private router: Router,
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
    private toast: NgToastService,
  ){

  }

  ngOnInit(): void {
    //get employee with the url paramente
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          //call api
          this.employeeService.getEmployee(id)
          .subscribe({
            next: (response) => {
              this.employeeDetails = response;
            }
          })
        }

      }
    })

  }

  updateEmployee(){
     this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
     .subscribe({
      next: (response) =>{
        this.toast.success({detail:"success",summary:'Record updated successfully',duration:3000});
        this.router.navigate(['employees'])
      }
     })
  }


  deleteEmployee(id: any){
    this.employeeService.deleteEmployee(id)
    .subscribe({ 
      next: (response) =>{
        this.toast.success({detail:"success",summary:'Record deleted successfully',duration:3000});
        this.router.navigate(['employees']);
      }
    })
  }

  

}
