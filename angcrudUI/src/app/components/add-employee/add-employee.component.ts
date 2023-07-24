import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from 'src/app/models/employees.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeesService,
    private toast: NgToastService,
     ) {}

  ngOnInit(): void {
    //validate form
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    })
  }


  addEmployee()
  {
    
    console.log(this.employeeForm.value)
    if(this.employeeForm.valid){
      //send request
      //console.log(this.employeeForm.value)
      this.employeeService.addEmployee(this.employeeForm.value)
      .subscribe({
        next: (res => {
          //alert(res.message)
          this.toast.success({detail:"success",summary:res.message,duration:3000});
          this.employeeForm.reset();
          this.router.navigate(['employees'])
        }) 
      });
    }else{
      //throw error
      //alert("Oops! Errors on your form")
      this.toast.error({detail:"error",summary:'Oops! Something went wrong',duration:3000});
    }
  }

}
