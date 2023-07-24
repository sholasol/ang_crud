import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from 'src/app/models/employees.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  editEmployeeForm!: FormGroup;

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
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
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


    //validate form
    // this.editEmployeeForm = this.fb.group({
    //   firstname: ['', Validators.required],
    //   lastname: ['', Validators.required],
    //   email: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   salary: ['', Validators.required],
    //   department: ['', Validators.required]
    // })
  }

  

}
